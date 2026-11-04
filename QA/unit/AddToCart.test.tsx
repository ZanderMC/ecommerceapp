import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddToCart } from "@/app/components/AddToCart";
import { getCart } from "@/lib/cart";

describe("AddToCart", () => {
  it("adds the selected size and quantity to the cart", async () => {
    const user = userEvent.setup();

    render(
      <AddToCart
        product={{ id: "sku-1", name: "Camisa básica", price: 49.9 }}
        sizes={["S", "M"]}
      />,
    );

    await user.selectOptions(screen.getByLabelText("Selecciona una talla:"), "M");
    await user.click(screen.getByRole("button", { name: "Aumentar cantidad" }));
    await user.click(screen.getByRole("button", { name: "Añadir al carrito" }));

    expect(getCart()).toEqual([
      { id: "sku-1", name: "Camisa básica", price: 49.9, size: "M", quantity: 2 },
    ]);
  });

  it("does not allow quantity below one", async () => {
    const user = userEvent.setup();

    render(
      <AddToCart
        product={{ id: "sku-1", name: "Camisa básica", price: 49.9 }}
        sizes={[]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Disminuir cantidad" }));
    expect(screen.getByRole("spinbutton", { name: "Cantidad" })).toHaveValue(1);
  });
});
