import {
  addToCart,
  formatPrice,
  getCart,
  saveCart,
  type CartItem,
} from "@/lib/cart";

const product = {
  id: "sku-1",
  name: "Camisa básica",
  price: 49.9,
};

describe("cart utilities", () => {
  it("adds a new item to the cart", () => {
    addToCart({ ...product, quantity: 1 });
    expect(getCart()).toEqual([{ ...product, quantity: 1 }]);
  });

  it("combines equal products with the same size", () => {
    addToCart({ ...product, size: "M", quantity: 1 });
    addToCart({ ...product, size: "M", quantity: 2 });
    expect(getCart()).toEqual([{ ...product, size: "M", quantity: 3 }]);
  });

  it("keeps equal products with different sizes separate", () => {
    addToCart({ ...product, size: "M", quantity: 1 });
    addToCart({ ...product, size: "L", quantity: 1 });
    expect(getCart()).toHaveLength(2);
  });

  it("returns an empty cart when stored JSON is invalid", () => {
    window.localStorage.setItem("zandev-cart", "{invalid");
    expect(getCart()).toEqual([]);
  });

  it("persists an explicit cart and formats prices", () => {
    const cart: CartItem[] = [{ ...product, quantity: 2 }];
    saveCart(cart);
    expect(getCart()).toEqual(cart);
    expect(formatPrice(49.9)).toBe("49.90 SOLES");
  });
});
