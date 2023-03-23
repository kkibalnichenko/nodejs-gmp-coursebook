import { CartEntity, CartFull, CartItemEntity, CartItemFull } from './cart.entity';
import { Cart } from './cart.model';
const toProductJSON = (item: CartItemFull) => {
  const {
    product: { id, title, description, price },
  } = item;

  return {
    product: {
      id,
      title,
      description,
      price,
    },
    count: item.count,
  };
};

const cartToCartEntity = (cart: CartFull): CartEntity => {
  const cartItems = <CartItemFull[]>(<unknown>cart.items.map(toProductJSON));
  const items = cartItemsToCartItemEntity(cartItems);

  return { ...cart, items };
};

const cartItemsToCartItemEntity = (items: CartItemFull[]): CartItemEntity[] => {
  return items.map((item) => ({ productId: item.product.id.toString(), count: item.count }));
};

const cartToCartFull = (cart: CartEntity): CartFull => {
  const cartItems = <CartItemFull[]>(<unknown>cart.items);
  const items = cartItemsToCartItemsFull(cartItems);

  return { ...cart, items };
};

const cartItemsToCartItemsFull = (items: CartItemFull[]): CartItemFull[] => {
  return items.map(toProductJSON);
};

export async function findByUserId(userId: string): Promise<CartFull | null> {
  const cart = await Cart.findOne({ userId: userId, isDeleted: false })
    .populate({
      path: 'items',
      populate: {
        path: 'product',
        model: 'Product',
      },
    })
    .lean();

  if (!cart) return null;

  return cart && cartToCartFull(Object.assign({}, cart, { id: cart._id.toString() }));
}

export async function createByUserId(userId: string): Promise<CartEntity> {
  const cart = new Cart({
    userId,
    isDeleted: false,
    items: [],
  });

  const saved = <CartFull>(<unknown>await cart.save());

  return cartToCartEntity(saved);
}

export async function updateByUserId(userId: string, cartData: Partial<CartEntity> | null): Promise<CartEntity | null> {
  const items = (cartData?.items || []).map((item) => ({ product: item.productId, count: item.count }));

  const currentCart = await Cart.findOne({ userId: userId, isDeleted: false });

  if (!currentCart) {
    return null;
  }

  await currentCart.updateOne({ items: [...currentCart.items, ...items], isDeleted: cartData?.isDeleted });

  const cart = <CartFull>await currentCart.populate({
    path: 'items',
    populate: {
      path: 'product',
      model: 'Product',
    },
  });

  return cartToCartEntity(cart);
}

export async function deleteByUserId(userId: string): Promise<CartEntity | null> {
  return updateByUserId(userId, { isDeleted: true });
}

export async function getCartItems(cartId: string): Promise<CartItemFull[] | []> {
  const cart = await Cart.findOne({ id: cartId }).populate({
    path: 'items',
    populate: {
      path: 'product',
      model: 'Product',
    },
  });

  if (!cart) {
    return [];
  }
  const cartItems = <CartItemFull[]>(<unknown>cart.items);

  return cartItemsToCartItemsFull(cartItems);
}
