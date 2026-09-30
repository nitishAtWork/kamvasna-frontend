const CART_ID_KEY = "guestCartId";

export function getGuestCartId() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(CART_ID_KEY);
}

export function setGuestCartId(cartId) {
  if (
    typeof window === "undefined" ||
    !cartId
  ) {
    return;
  }

  localStorage.setItem(
    CART_ID_KEY,
    cartId
  );
}

export function clearGuestCartId() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(CART_ID_KEY);
}