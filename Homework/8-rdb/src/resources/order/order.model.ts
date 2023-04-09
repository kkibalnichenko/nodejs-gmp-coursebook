import {Entity, JsonType, ManyToOne, OneToOne, PrimaryKey, Property, Ref} from "@mikro-orm/core";
import {User} from "../user/user.model";
import {Cart} from "../cart/cart.model";
import {CartItemFull} from "../cart/cart.entity";
import {ORDER_STATUS} from "./order.entity";

@Entity()
export class Order {
    @PrimaryKey({type: 'uuid', defaultRaw: 'uuid_generate_v4()'})
    id!: string;

    @ManyToOne(() => User, {ref: true})
    user!: Ref<User>;

    @OneToOne(()=>Cart)
    cart!: Ref<Cart>;

    @Property({type: JsonType})
    items!: CartItemFull[]

    @Property({type: JsonType})
    payment!: {
        type: string,
        address?: any,
        creditCard?: any,
    };

    @Property({type: JsonType})
    delivery! : {
        type: string,
        address: any,
    };

    @Property()
    comments!: string

    @Property({type: "string" })
    status!: ORDER_STATUS;

    @Property()
    total!: number;

    @Property({ persist: false })
    get userId(): string {
        return this.user?.id;
    }

    @Property({ persist: false })
    get cartId(): string {
        return this.cart?.id;
    }
}