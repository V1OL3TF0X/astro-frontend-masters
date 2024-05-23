/** @jsxImportSource react */

import { addToCart } from '../../stores/cart';

export const AddToCart = ({ item }: { item: ShopItem }) => (
  <button className='big-link' onClick={() => addToCart(item)}>
    Add To Cart
  </button>
);
