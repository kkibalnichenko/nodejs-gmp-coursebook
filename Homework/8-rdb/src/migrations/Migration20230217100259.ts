import { Migration } from '@mikro-orm/migrations';

export class Migration20230217100259 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "order" ("id" uuid not null default uuid_generate_v4(), "user_id" uuid not null, "cart_id" uuid not null, "items" jsonb not null, "payment" jsonb not null, "delivery" jsonb not null, "comments" varchar(255) not null, "status" varchar(255) not null, "total" int not null, constraint "order_pkey" primary key ("id"));');
    this.addSql('alter table "order" add constraint "order_cart_id_unique" unique ("cart_id");');

    this.addSql('alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "order" add constraint "order_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "order" cascade;');
  }

}
