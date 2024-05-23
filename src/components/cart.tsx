import { useStore } from '@nanostores/solid';
import { $cart as cart, removeFromCart, subtotal } from '../stores/cart';
import styles from './cart.module.css';

import { For, Show, createMemo, createSignal } from 'solid-js';

function formatCurrency(amount: number) {
	return new Intl.NumberFormat('en-us', {
		currency: 'usd',
		style: 'currency',
	}).format(amount);
}

const EmptyState = () => (
	<>
		<p class={styles.icon}>
			<span role="img" aria-label="hot dog">
				🌭
			</span>
		</p>
		<p class={styles.empty}>
			Your cart is empty! Add a sandwitch kit or two and give flavour a chance.
		</p>
	</>
);

const CheckoutNotice = () => (
	<p class={styles.notice}>Checkout is not implemented yet.</p>
);

export const Cart = () => {
	const [showNotice, setShowNotice] = createSignal(false);
	const $subtotal = useStore(subtotal);
	const $cart = useStore(cart);
	const cartItems = createMemo(() => Object.values($cart()).filter((e) => !!e));

	return (
		<aside class={styles.card}>
			<h2>Your card</h2>
			<Show when={cartItems.length > 0} fallback={<EmptyState />}>
				<ul class={styles.items}>
					<For each={cartItems()}>
						{(entry) => (
							<li class={styles.item}>
								<span class={styles.quantity}>{entry.quantity}</span>
								<span class={styles.name}>{entry.item.title}</span>
								<span class={styles.remove}>
									<button
										title="remove item"
										onClick={() => removeFromCart(entry.item.id)}
									>
										&times;
									</button>
								</span>
								<span class={styles.price}>
									{formatCurrency(entry.item.price)}
								</span>
							</li>
						)}
					</For>
				</ul>
				<div class={styles.details}>
					<p class={styles.subtotal}>
						<span class={styles.label}>Subtotal:</span>{' '}
						{formatCurrency($subtotal())}
					</p>
					<p class={styles.shipping}>
						<span class={styles.label}>Shipping:</span> <del>$10.00</del>
						<ins>FREE</ins>
					</p>
					<p class={styles.total}>
						<span class={styles.label}>Total:</span>{' '}
						{formatCurrency($subtotal())}
					</p>
					<p class={styles.checkout}>
						<button class="big-link" onClick={() => setShowNotice(true)}>
							Check Out
						</button>
					</p>
				</div>
			</Show>
			<Show when={showNotice()}>
				<CheckoutNotice />
			</Show>
		</aside>
	);
};
