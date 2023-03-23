import {CartEntity, CartFull} from './cart.entity';
import * as cartService from './cart.service';

export async function toFullCart(cart: CartEntity): Promise<CartFull> {
    const items = await cartService.getCartItems(cart.id);

    return {
        ...cart,
        items,
    }
}

export function toDtoCart(cart: CartFull) {
    return {
        id: cart.id,
        items: cart.items,
    }
}
