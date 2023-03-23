import * as cartRepository from './cart.repository';
import {CartEntity, CartFull, CartItemFull} from './cart.entity';
import {ValidationException} from '../../exceptions/ValidationException';
import {OrderEntity} from '../order/order.entity';
import * as orderService from '../order/order.service';
import * as productService from '../product/product.service';
import {toDtoCart, toFullCart} from './cart.mapper';

export function calculateCartTotalPrice(cart: CartFull) {
    return cart ? cart.items.reduce((acc, {product: {price}, count}) => {
        return acc + price * count;
    }, 0) : 0;
}


export async function findOrCreateByUserId(userId: string) {
    const userCart = await cartRepository.findByUserId(userId);
    if (!userCart) {
        const cart = await cartRepository.createByUserId(userId);
        const fullCart = await toFullCart(cart);

        return {
            cart: toDtoCart(fullCart),
            total: 0,
        };
    }
    return {cart: toDtoCart(userCart), total: calculateCartTotalPrice(userCart)};
}

export async function updateByUserId(userId: string, cart: Partial<CartEntity>) {
    const productIds = cart?.items?.map(item => item.productId);
    const allProductExist = await productService.areProductsExist(productIds);

    if (!allProductExist) {
        throw new ValidationException({message: 'Product was not found'});
    }
    const updatedCart = await cartRepository.updateByUserId(userId, cart);
    const cartFull = await toFullCart(updatedCart);
    return {
        cart: toDtoCart(cartFull),
        total: calculateCartTotalPrice(cartFull),
    };
}

export function deleteByUserId(userId: string) {
    return cartRepository.deleteByUserId(userId);
}

export async function checkout(userId: string, orderData: Pick<OrderEntity, 'delivery' | 'comments' | 'payment'>) {
    const cartFull = await cartRepository.findByUserId(userId);
    if (!cartFull || !cartFull.items.length) {
        throw new ValidationException({message: 'Cart is empty'})
    }

    const totalPrice = calculateCartTotalPrice(cartFull);
    const order = await orderService.createOrder({
        ...orderData,
        userId,
        cartId: cartFull.id,
        items: cartFull.items,
        total: totalPrice,
    });
    await cartRepository.deleteByUserId(userId);

    return order
}

export async function getCartItems(cartId: string): Promise<CartItemFull[]>{
    return cartRepository.getCartItems(cartId);
}
