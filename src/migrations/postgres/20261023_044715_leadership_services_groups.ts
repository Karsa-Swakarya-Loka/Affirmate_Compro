import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "services_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_groups_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_groups_locales" (
  	"title" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_services_v_version_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_groups_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_version_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_groups_locales" (
  	"title" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_leadership_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "home_leadership_people_locales" (
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_home_v_version_leadership_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_leadership_people_locales" (
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "home" ADD COLUMN "sections_visible_leadership" boolean DEFAULT true;
  ALTER TABLE "home_locales" ADD COLUMN "leadership_title" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "leadership_subtitle" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "leadership_body" varchar;
  ALTER TABLE "_home_v" ADD COLUMN "version_sections_visible_leadership" boolean DEFAULT true;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_leadership_title" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_leadership_subtitle" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_leadership_body" varchar;
  ALTER TABLE "ui_locales" ADD COLUMN "nav_leadership" varchar;
  ALTER TABLE "_ui_v_locales" ADD COLUMN "version_nav_leadership" varchar;
  ALTER TABLE "services_groups_items" ADD CONSTRAINT "services_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_groups_items_locales" ADD CONSTRAINT "services_groups_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_groups_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_groups" ADD CONSTRAINT "services_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_groups_locales" ADD CONSTRAINT "services_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_groups_items" ADD CONSTRAINT "_services_v_version_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_groups_items_locales" ADD CONSTRAINT "_services_v_version_groups_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_groups_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_groups" ADD CONSTRAINT "_services_v_version_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_groups_locales" ADD CONSTRAINT "_services_v_version_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_leadership_people" ADD CONSTRAINT "home_leadership_people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_leadership_people" ADD CONSTRAINT "home_leadership_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_leadership_people_locales" ADD CONSTRAINT "home_leadership_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_leadership_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_leadership_people" ADD CONSTRAINT "_home_v_version_leadership_people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_leadership_people" ADD CONSTRAINT "_home_v_version_leadership_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_leadership_people_locales" ADD CONSTRAINT "_home_v_version_leadership_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_leadership_people"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_groups_items_order_idx" ON "services_groups_items" USING btree ("_order");
  CREATE INDEX "services_groups_items_parent_id_idx" ON "services_groups_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_groups_items_locales_locale_parent_id_unique" ON "services_groups_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_groups_order_idx" ON "services_groups" USING btree ("_order");
  CREATE INDEX "services_groups_parent_id_idx" ON "services_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_groups_locales_locale_parent_id_unique" ON "services_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_version_groups_items_order_idx" ON "_services_v_version_groups_items" USING btree ("_order");
  CREATE INDEX "_services_v_version_groups_items_parent_id_idx" ON "_services_v_version_groups_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_version_groups_items_locales_locale_parent_id_un" ON "_services_v_version_groups_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_version_groups_order_idx" ON "_services_v_version_groups" USING btree ("_order");
  CREATE INDEX "_services_v_version_groups_parent_id_idx" ON "_services_v_version_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_version_groups_locales_locale_parent_id_unique" ON "_services_v_version_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_leadership_people_order_idx" ON "home_leadership_people" USING btree ("_order");
  CREATE INDEX "home_leadership_people_parent_id_idx" ON "home_leadership_people" USING btree ("_parent_id");
  CREATE INDEX "home_leadership_people_photo_idx" ON "home_leadership_people" USING btree ("photo_id");
  CREATE UNIQUE INDEX "home_leadership_people_locales_locale_parent_id_unique" ON "home_leadership_people_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_leadership_people_order_idx" ON "_home_v_version_leadership_people" USING btree ("_order");
  CREATE INDEX "_home_v_version_leadership_people_parent_id_idx" ON "_home_v_version_leadership_people" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_leadership_people_photo_idx" ON "_home_v_version_leadership_people" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_home_v_version_leadership_people_locales_locale_parent_id_u" ON "_home_v_version_leadership_people_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_groups_items" CASCADE;
  DROP TABLE "services_groups_items_locales" CASCADE;
  DROP TABLE "services_groups" CASCADE;
  DROP TABLE "services_groups_locales" CASCADE;
  DROP TABLE "_services_v_version_groups_items" CASCADE;
  DROP TABLE "_services_v_version_groups_items_locales" CASCADE;
  DROP TABLE "_services_v_version_groups" CASCADE;
  DROP TABLE "_services_v_version_groups_locales" CASCADE;
  DROP TABLE "home_leadership_people" CASCADE;
  DROP TABLE "home_leadership_people_locales" CASCADE;
  DROP TABLE "_home_v_version_leadership_people" CASCADE;
  DROP TABLE "_home_v_version_leadership_people_locales" CASCADE;
  ALTER TABLE "home" DROP COLUMN "sections_visible_leadership";
  ALTER TABLE "home_locales" DROP COLUMN "leadership_title";
  ALTER TABLE "home_locales" DROP COLUMN "leadership_subtitle";
  ALTER TABLE "home_locales" DROP COLUMN "leadership_body";
  ALTER TABLE "_home_v" DROP COLUMN "version_sections_visible_leadership";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_leadership_title";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_leadership_subtitle";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_leadership_body";
  ALTER TABLE "ui_locales" DROP COLUMN "nav_leadership";
  ALTER TABLE "_ui_v_locales" DROP COLUMN "version_nav_leadership";`)
}
