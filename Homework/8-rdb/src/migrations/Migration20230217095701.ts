import { Migration } from '@mikro-orm/migrations';

export class Migration20230217095701 extends Migration {

  async up(): Promise<void> {
    this.addSql('create extension if not exists "uuid-ossp";')

    this.addSql('create table "cart" ("id" uuid not null default uuid_generate_v4(), "is_deleted" boolean not null, "user_id" uuid not null, constraint "cart_pkey" primary key ("id"));');

    this.addSql('create table "product" ("id" uuid not null default uuid_generate_v4(), "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_pkey" primary key ("id"));');

    this.addSql('create table "cart_item" ("cart_id" uuid not null, "product_id" uuid not null, "count" int not null, constraint "cart_item_pkey" primary key ("cart_id", "product_id"));');

    this.addSql('create table "user" ("id" uuid not null default uuid_generate_v4(), constraint "user_pkey" primary key ("id"));');

    this.addSql('alter table "cart_item" add constraint "cart_item_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');
    this.addSql('alter table "cart_item" add constraint "cart_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
    this.addSql('alter table "cart" add constraint "cart_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cart_item" drop constraint "cart_item_cart_id_foreign";');

    this.addSql('alter table "cart_item" drop constraint "cart_item_product_id_foreign";');

    this.addSql('drop table if exists "cart" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "cart_item" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop extension if exists "uuid-ossp";');
  }

}
