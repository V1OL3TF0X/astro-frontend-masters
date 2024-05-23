import { computed, map } from 'nanostores';

export const $cart = map<Record<number, CartItem>>({});

export function addToCart(item: ShopItem) {
  const cartItem = $cart.get()[item.id];
  const quantity = (cartItem?.quantity ?? 0) + 1;
  $cart.setKey(item.id, {
    item,
    quantity,
  });
}

export function removeFromCart(itemId: number) {
  // @ts-ignore
  $cart.setKey(itemId, undefined);
}

export const subtotal = computed($cart, (cart) =>
  Object.values(cart).reduce((sum, item) => (item ? item.quantity * item.item.price : 0) + sum, 0)
);
