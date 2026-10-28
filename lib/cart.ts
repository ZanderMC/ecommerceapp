export const CART_STORAGE_KEY = "zandev-cart";
export const CART_UPDATED_EVENT = "zandev-cart-updated";

export type CartProduct = {
  id: string | number;
  name: string;
  price: number;
  image_url?: string | null;
};

export type CartItem = CartProduct & {
  quantity: number;
  size?: string;
};

export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsedCart: unknown = storedCart ? JSON.parse(storedCart) : [];

    return Array.isArray(parsedCart) ? (parsedCart as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existingItem = cart.find(
    (cartItem) => cartItem.id === item.id && cartItem.size === item.size,
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
}

export function formatPrice(price: number) {
  return `${price.toFixed(2)} SOLES`;
}
