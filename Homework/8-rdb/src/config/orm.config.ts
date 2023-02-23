import * as dotenv from 'dotenv'

dotenv.config()

import {Options} from '@mikro-orm/core';
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import {User} from "../resources/user/user.model";
import {Cart} from "../resources/cart/cart.model";
import {CartItem} from "../resources/cart/cart-item.model";
import {Product} from "../resources/product/product.model";
import {Order} from "../resources/order/order.model";

const options: Options<PostgreSqlDriver> = {
    entities: [User,Cart, CartItem, Product,Order],
    migrations: {
        path: './src/migrations', // path to the folder with migrations
        pathTs: './src/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)

    },
    type: 'postgresql',
    seeder:{
        pathTs: './src/seeders',
    }
};

export default options;