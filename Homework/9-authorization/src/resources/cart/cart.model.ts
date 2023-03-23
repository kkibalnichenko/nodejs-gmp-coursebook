import {Collection, Entity, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import {CartItem} from "./cart-item.model";

@Entity()
export class Cart{

    @PrimaryKey({type: 'uuid', defaultRaw: 'uuid_generate_v4()'})
    id!: string;

    @Property()
    isDeleted!: boolean;

    @Property()
    userId!: string;

    @OneToMany(() => CartItem, item => item.cart, {orphanRemoval: true})
    items: Collection<CartItem> = new Collection<CartItem>(this);
}