import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`services_groups_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_groups_items_order_idx\` ON \`services_groups_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_groups_items_parent_id_idx\` ON \`services_groups_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_groups_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_groups_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_groups_items_locales_locale_parent_id_unique\` ON \`services_groups_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_groups_order_idx\` ON \`services_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_groups_parent_id_idx\` ON \`services_groups\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_groups_locales\` (
  	\`title\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_groups_locales_locale_parent_id_unique\` ON \`services_groups_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_groups_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_version_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_groups_items_order_idx\` ON \`_services_v_version_groups_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_groups_items_parent_id_idx\` ON \`_services_v_version_groups_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_groups_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_version_groups_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_version_groups_items_locales_locale_parent_id_un\` ON \`_services_v_version_groups_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_groups_order_idx\` ON \`_services_v_version_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_groups_parent_id_idx\` ON \`_services_v_version_groups\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_groups_locales\` (
  	\`title\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_version_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_version_groups_locales_locale_parent_id_unique\` ON \`_services_v_version_groups_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_leadership_people\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_leadership_people_order_idx\` ON \`home_leadership_people\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_leadership_people_parent_id_idx\` ON \`home_leadership_people\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_leadership_people_photo_idx\` ON \`home_leadership_people\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`home_leadership_people_locales\` (
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_leadership_people\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_leadership_people_locales_locale_parent_id_unique\` ON \`home_leadership_people_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_leadership_people\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`photo_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_leadership_people_order_idx\` ON \`_home_v_version_leadership_people\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_leadership_people_parent_id_idx\` ON \`_home_v_version_leadership_people\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_leadership_people_photo_idx\` ON \`_home_v_version_leadership_people\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_leadership_people_locales\` (
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v_version_leadership_people\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_v_version_leadership_people_locales_locale_parent_id_u\` ON \`_home_v_version_leadership_people_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`sections_visible_leadership\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`leadership_title\` text;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`leadership_subtitle\` text;`)
  await db.run(sql`ALTER TABLE \`home_locales\` ADD \`leadership_body\` text;`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_sections_visible_leadership\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_home_v_locales\` ADD \`version_leadership_title\` text;`)
  await db.run(sql`ALTER TABLE \`_home_v_locales\` ADD \`version_leadership_subtitle\` text;`)
  await db.run(sql`ALTER TABLE \`_home_v_locales\` ADD \`version_leadership_body\` text;`)
  await db.run(sql`ALTER TABLE \`ui_locales\` ADD \`nav_leadership\` text;`)
  await db.run(sql`ALTER TABLE \`_ui_v_locales\` ADD \`version_nav_leadership\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`services_groups_items\`;`)
  await db.run(sql`DROP TABLE \`services_groups_items_locales\`;`)
  await db.run(sql`DROP TABLE \`services_groups\`;`)
  await db.run(sql`DROP TABLE \`services_groups_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_groups_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_groups_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_groups\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_groups_locales\`;`)
  await db.run(sql`DROP TABLE \`home_leadership_people\`;`)
  await db.run(sql`DROP TABLE \`home_leadership_people_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_leadership_people\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_leadership_people_locales\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`sections_visible_leadership\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`leadership_title\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`leadership_subtitle\`;`)
  await db.run(sql`ALTER TABLE \`home_locales\` DROP COLUMN \`leadership_body\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_sections_visible_leadership\`;`)
  await db.run(sql`ALTER TABLE \`_home_v_locales\` DROP COLUMN \`version_leadership_title\`;`)
  await db.run(sql`ALTER TABLE \`_home_v_locales\` DROP COLUMN \`version_leadership_subtitle\`;`)
  await db.run(sql`ALTER TABLE \`_home_v_locales\` DROP COLUMN \`version_leadership_body\`;`)
  await db.run(sql`ALTER TABLE \`ui_locales\` DROP COLUMN \`nav_leadership\`;`)
  await db.run(sql`ALTER TABLE \`_ui_v_locales\` DROP COLUMN \`version_nav_leadership\`;`)
}
