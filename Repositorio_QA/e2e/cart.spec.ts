import { expect, test } from "@playwright/test";

test("adds a catalog product to the cart", async ({ page }) => {
  await page.goto("/");
  await page.locator('a[href^="/Product/"]').first().click();

  const productName = (await page.getByRole("heading", { level: 1 }).textContent())?.trim();
  if (!productName) {
    throw new Error("El producto no tiene nombre visible.");
  }

  const addToCartButton = page.getByRole("button", { name: "Añadir al carrito" });
  await expect(addToCartButton).toBeEnabled();
  await addToCartButton.click();
  await expect(page.getByText("Producto añadido al carrito.")).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() => {
        const cart: unknown = JSON.parse(localStorage.getItem("zandev-cart") ?? "[]");
        return Array.isArray(cart) && cart.length > 0;
      }),
    )
    .toBe(true);

  await page.goto("/ShoppingCart");
  await expect(page.getByRole("heading", { name: "Tu carrito" })).toBeVisible();
  await expect(page.getByRole("heading", { name: productName })).toBeVisible();
  await expect(page.getByText("Resumen")).toBeVisible();
});
