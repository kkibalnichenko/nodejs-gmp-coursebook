import {CartEntity, CartFull, CartItemEntity, CartItemFull} from './cart.entity';
import {EntityRepository, Loaded, LoadedCollection, wrap} from "@mikro-orm/core";
import {container} from "../../../init";
import {Cart} from "./cart.model";
import {CartItem} from "./cart-item.model";

let repository: EntityRepository<Cart>;

const getRepository = () => {
    if (!repository) {
        repository = container.em.getRepository(Cart);
    }

    return repository;
}

const cartToCartEntity = (cart: Loaded<Cart, "items">) : CartEntity => {
    const items = cartItemsToCartItemEntity(cart.items.getItems());

    return {...cart, items};
}

const cartItemsToCartItemEntity = (items: CartItem[]): CartItemEntity[] => {
    return items.map(item => ({productId: item.product.id, count: item.count}))
}

const cartToCartFull = (cart: Loaded<Cart, "items" | "items.product">) : CartFull => {
    const items = cartItemsToCartItemsFull(cart.items);

    return {...cart, items};
}

const cartItemsToCartItemsFull = (items:  LoadedCollection<Loaded<CartItem, "product">>): CartItemFull[] => {
    return items.getItems().map(item => ({product: item.product.getEntity(), count: item.count}))
}

export async function findByUserId(userId: string): Promise<CartFull | null> {
    const cart = await getRepository().findOne({userId: userId, isDeleted: false}, {populate: ['items', 'items.product']});

    return cart && cartToCartFull(cart);
}

export async function createByUserId(userId: string): Promise<CartEntity> {
    const cart = new Cart();

    wrap(cart).assign({
        userId,
        isDeleted: false,
        items: [],
    })

    await getRepository().persistAndFlush(cart);

    return cartToCartEntity(cart as Loaded<Cart, 'items'>);
}

export async function updateByUserId(userId: string, cartData: Partial<CartEntity>): Promise<CartEntity> {
    const currentCart = await getRepository().findOneOrFail({userId: userId, isDeleted: false}, {populate: ['items']});
    const newItems = (cartData?.items || []).map(item => new CartItem(item.productId, item.count));

    wrap(currentCart).assign({
        ...cartData,
        items: newItems,
    })

    await getRepository().flush();

    return cartToCartEntity(currentCart);
}

export function deleteByUserId(userId: string): Promise<CartEntity> {
    return updateByUserId(userId, {isDeleted: true});
}

export async function getCartItems(cartId: string): Promise<CartItemFull[]>{
    const cart = await getRepository().findOneOrFail({id: cartId}, {populate: ['items', 'items.product']});

    return cartItemsToCartItemsFull(cart.items);
}
