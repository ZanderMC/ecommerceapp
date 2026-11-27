import { expect, test } from "@playwright/test";

const email = `qa-${Date.now()}@example.com`;
const password = "QaPassword123!";

test.describe("authentication flow", () => {
  test.describe.configure({ mode: "serial" });

  test("registers a new account", async ({ page }) => {
    await page.goto("/Register");
    await page.getByLabel("Nombre").fill("QA Portfolio");
    await page.getByLabel("Correo electrónico").fill(email);
    await page.getByLabel("Contraseña").fill(password);
    await page.getByRole("button", { name: "Crear cuenta" }).click();

    await expect(page).toHaveURL(/\/(Login|$)/, { timeout: 15_000 });
  });

  test("logs in with the registered account", async ({ page }) => {
    await page.goto("/Login");
    await page.getByLabel("Correo electrónico").fill(email);
    await page.getByLabel("Contraseña").fill(password);
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
  });
});

test("browses the catalog and adds a product to the cart", async ({ page }) => {
  await page.goto("/");
  const productLink = page.locator('a[href^="/Product/"]').first();
  await expect(productLink).toBeVisible({ timeout: 15_000 });
  await productLink.click();

  await expect(page).toHaveURL(/\/Product\/[^/]+\/?$/, { timeout: 15_000 });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible({
    timeout: 15_000,
  });
  const addToCartButton = page.getByRole("button", {
    name: "Añadir al carrito",
  });
  await expect(addToCartButton).toBeVisible({ timeout: 15_000 });
  const productName = (await page.getByRole("heading", { level: 1 }).textContent())?.trim();
  if (!productName) {
    throw new Error("El producto no tiene nombre visible.");
  }
  await addToCartButton.click();
  await page.goto("/ShoppingCart");

  await expect(page.getByRole("heading", { name: "Tu carrito" })).toBeVisible();
  await expect(page.getByText("Resumen")).toBeVisible();
  await expect(page.getByRole("heading", { name: productName })).toBeVisible();
});

test("does not allow anonymous users to add a product to favorites", async ({ page }) => {
  await page.goto("/");

  const favoriteButton = page.locator('button[aria-label^="Agregar "]').first();
  await expect(favoriteButton).toBeVisible({ timeout: 15_000 });

  const favoritesResponsePromise = page.waitForResponse(
    (response) =>
      response.url().endsWith("/api/favorites") &&
      response.request().method() === "POST",
  );
  await favoriteButton.click();

  const favoritesResponse = await favoritesResponsePromise;
  expect(favoritesResponse.status()).toBe(401);
  await expect(
    page.getByText("Inicia sesión para agregar productos a favoritos."),
  ).toBeVisible();
  await expect(favoriteButton).toHaveAttribute("aria-label", /^Agregar /);
});

test("updates and removes an item from the cart", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "zandev-cart",
      JSON.stringify([
        { id: "qa-product", name: "Producto QA", price: 25, quantity: 1 },
      ]),
    );
  });
  await page.goto("/ShoppingCart");

  const quantity = page.getByRole("spinbutton", { name: /Cantidad/ });
  await quantity.fill("3");
  await expect(quantity).toHaveValue("3");
  await page.getByRole("button", { name: "Eliminar" }).click();

  await expect(page.getByText("Tu carrito está vacío.")).toBeVisible();
});
