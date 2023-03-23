import { Migration } from '@mikro-orm/migrations';

export class Migration20230217100260 extends Migration {

    async up(): Promise<void> {
        this.addSql('alter table "user" add column if not exists "email" text unique not null;');
        this.addSql('alter table "user" add column if not exists "password" varchar(64) unique not null;');
    }

    async down(): Promise<void> {
        this.addSql('alter table "user" drop column if exists "password";');
        this.addSql('alter table "user" drop column if exists "email";');
    }

}
