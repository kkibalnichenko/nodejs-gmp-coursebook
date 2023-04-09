import {Entity, PrimaryKey} from "@mikro-orm/core";

@Entity()
export class User{
    @PrimaryKey({type: 'uuid', defaultRaw: 'uuid_generate_v4()'})
    id!: string;
}