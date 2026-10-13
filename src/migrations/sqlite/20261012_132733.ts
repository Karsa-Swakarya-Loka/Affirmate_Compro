import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_items_order_idx\` ON \`services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_items_parent_id_idx\` ON \`services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_items_locales_locale_parent_id_unique\` ON \`services_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`order\` numeric DEFAULT 0,
  	\`icon\` text DEFAULT 'check',
  	\`seo_og_image_id\` integer,
  	\`seed_key\` text,
  	\`needs_review\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_seo_seo_og_image_idx\` ON \`services\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`services_seed_key_idx\` ON \`services\` (\`seed_key\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`services__status_idx\` ON \`services\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`services_locales\` (
  	\`title\` text,
  	\`summary\` text,
  	\`body\` text,
  	\`partner_note\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_locales_locale_parent_id_unique\` ON \`services_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_items_order_idx\` ON \`_services_v_version_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_items_parent_id_idx\` ON \`_services_v_version_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_version_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_version_items_locales_locale_parent_id_unique\` ON \`_services_v_version_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_icon\` text DEFAULT 'check',
  	\`version_seo_og_image_id\` integer,
  	\`version_seed_key\` text,
  	\`version_needs_review\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_parent_idx\` ON \`_services_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_slug_idx\` ON \`_services_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_seo_version_seo_og_image_idx\` ON \`_services_v\` (\`version_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_seed_key_idx\` ON \`_services_v\` (\`version_seed_key\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_updated_at_idx\` ON \`_services_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_created_at_idx\` ON \`_services_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version__status_idx\` ON \`_services_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_created_at_idx\` ON \`_services_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_updated_at_idx\` ON \`_services_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_snapshot_idx\` ON \`_services_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_published_locale_idx\` ON \`_services_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_latest_idx\` ON \`_services_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_locales\` (
  	\`version_title\` text,
  	\`version_summary\` text,
  	\`version_body\` text,
  	\`version_partner_note\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_locales_locale_parent_id_unique\` ON \`_services_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`group_entities_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`group_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`group_entities_bullets_order_idx\` ON \`group_entities_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`group_entities_bullets_parent_id_idx\` ON \`group_entities_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`group_entities_bullets_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`group_entities_bullets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`group_entities_bullets_locales_locale_parent_id_unique\` ON \`group_entities_bullets_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`group_entities\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`brand\` text,
  	\`logo_id\` integer,
  	\`url\` text,
  	\`is_self\` integer DEFAULT false,
  	\`order\` numeric DEFAULT 0,
  	\`seed_key\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`group_entities_logo_idx\` ON \`group_entities\` (\`logo_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`group_entities_seed_key_idx\` ON \`group_entities\` (\`seed_key\`);`)
  await db.run(sql`CREATE INDEX \`group_entities_updated_at_idx\` ON \`group_entities\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`group_entities_created_at_idx\` ON \`group_entities\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`group_entities__status_idx\` ON \`group_entities\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`group_entities_locales\` (
  	\`category\` text,
  	\`summary\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`group_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`group_entities_locales_locale_parent_id_unique\` ON \`group_entities_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_group_entities_v_version_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_group_entities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_group_entities_v_version_bullets_order_idx\` ON \`_group_entities_v_version_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_group_entities_v_version_bullets_parent_id_idx\` ON \`_group_entities_v_version_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_group_entities_v_version_bullets_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_group_entities_v_version_bullets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_group_entities_v_version_bullets_locales_locale_parent_id_u\` ON \`_group_entities_v_version_bullets_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_group_entities_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_brand\` text,
  	\`version_logo_id\` integer,
  	\`version_url\` text,
  	\`version_is_self\` integer DEFAULT false,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_seed_key\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`group_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_group_entities_v_parent_idx\` ON \`_group_entities_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_group_entities_v_version_version_logo_idx\` ON \`_group_entities_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_group_entities_v_version_version_seed_key_idx\` ON \`_group_entities_v\` (\`version_seed_key\`);`)
  await db.run(sql`CREATE INDEX \`_group_entities_v_version_version_updated_at_idx\` ON \`_group_entities_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_group_entities_v_version_version_created_at_idx\` ON \`_group_entities_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_group_entities_v_version_version__status_idx\` ON \`_group_entities_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_group_entities_v_created_at_idx\` ON \`_group_entities_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_group_entities_v_updated_at_idx\` ON \`_group_entities_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_group_entities_v_snapshot_idx\` ON \`_group_entities_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_group_entities_v_published_locale_idx\` ON \`_group_entities_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_group_entities_v_latest_idx\` ON \`_group_entities_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_group_entities_v_locales\` (
  	\`version_category\` text,
  	\`version_summary\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_group_entities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_group_entities_v_locales_locale_parent_id_unique\` ON \`_group_entities_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`milestones\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`year\` numeric,
  	\`order\` numeric DEFAULT 0,
  	\`seed_key\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`milestones_seed_key_idx\` ON \`milestones\` (\`seed_key\`);`)
  await db.run(sql`CREATE INDEX \`milestones_updated_at_idx\` ON \`milestones\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`milestones_created_at_idx\` ON \`milestones\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`milestones__status_idx\` ON \`milestones\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`milestones_locales\` (
  	\`label\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`milestones\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`milestones_locales_locale_parent_id_unique\` ON \`milestones_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_milestones_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_year\` numeric,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_seed_key\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`milestones\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_milestones_v_parent_idx\` ON \`_milestones_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_milestones_v_version_version_seed_key_idx\` ON \`_milestones_v\` (\`version_seed_key\`);`)
  await db.run(sql`CREATE INDEX \`_milestones_v_version_version_updated_at_idx\` ON \`_milestones_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_milestones_v_version_version_created_at_idx\` ON \`_milestones_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_milestones_v_version_version__status_idx\` ON \`_milestones_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_milestones_v_created_at_idx\` ON \`_milestones_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_milestones_v_updated_at_idx\` ON \`_milestones_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_milestones_v_snapshot_idx\` ON \`_milestones_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_milestones_v_published_locale_idx\` ON \`_milestones_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_milestones_v_latest_idx\` ON \`_milestones_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_milestones_v_locales\` (
  	\`version_label\` text,
  	\`version_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_milestones_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_milestones_v_locales_locale_parent_id_unique\` ON \`_milestones_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`clients\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`logo_id\` integer,
  	\`url\` text,
  	\`consent\` integer DEFAULT false,
  	\`order\` numeric DEFAULT 0,
  	\`seed_key\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`clients_logo_idx\` ON \`clients\` (\`logo_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`clients_seed_key_idx\` ON \`clients\` (\`seed_key\`);`)
  await db.run(sql`CREATE INDEX \`clients_updated_at_idx\` ON \`clients\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`clients_created_at_idx\` ON \`clients\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`clients__status_idx\` ON \`clients\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_clients_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_logo_id\` integer,
  	\`version_url\` text,
  	\`version_consent\` integer DEFAULT false,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_seed_key\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`clients\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_clients_v_parent_idx\` ON \`_clients_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_version_version_logo_idx\` ON \`_clients_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_version_version_seed_key_idx\` ON \`_clients_v\` (\`version_seed_key\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_version_version_updated_at_idx\` ON \`_clients_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_version_version_created_at_idx\` ON \`_clients_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_version_version__status_idx\` ON \`_clients_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_created_at_idx\` ON \`_clients_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_updated_at_idx\` ON \`_clients_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_snapshot_idx\` ON \`_clients_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_published_locale_idx\` ON \`_clients_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_latest_idx\` ON \`_clients_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`cities\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`lat\` numeric NOT NULL,
  	\`lng\` numeric NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`seed_key\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`cities_seed_key_idx\` ON \`cities\` (\`seed_key\`);`)
  await db.run(sql`CREATE INDEX \`cities_updated_at_idx\` ON \`cities\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`cities_created_at_idx\` ON \`cities\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`category\` text DEFAULT 'guide',
  	\`cover_id\` integer,
  	\`published_at\` text,
  	\`author\` text,
  	\`seo_og_image_id\` integer,
  	\`seed_key\` text,
  	\`needs_review\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`cover_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_cover_idx\` ON \`posts\` (\`cover_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_seo_seo_og_image_idx\` ON \`posts\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_seed_key_idx\` ON \`posts\` (\`seed_key\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`posts_locales\` (
  	\`title\` text,
  	\`excerpt\` text,
  	\`body\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_category\` text DEFAULT 'guide',
  	\`version_cover_id\` integer,
  	\`version_published_at\` text,
  	\`version_author\` text,
  	\`version_seo_og_image_id\` integer,
  	\`version_seed_key\` text,
  	\`version_needs_review\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cover_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_cover_idx\` ON \`_posts_v\` (\`version_cover_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_seo_version_seo_og_image_idx\` ON \`_posts_v\` (\`version_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_seed_key_idx\` ON \`_posts_v\` (\`version_seed_key\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_published_locale_idx\` ON \`_posts_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_locales\` (
  	\`version_title\` text,
  	\`version_excerpt\` text,
  	\`version_body\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`seed_key\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumb_url\` text,
  	\`sizes_thumb_width\` numeric,
  	\`sizes_thumb_height\` numeric,
  	\`sizes_thumb_mime_type\` text,
  	\`sizes_thumb_filesize\` numeric,
  	\`sizes_thumb_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_hero_url\` text,
  	\`sizes_hero_width\` numeric,
  	\`sizes_hero_height\` numeric,
  	\`sizes_hero_mime_type\` text,
  	\`sizes_hero_filesize\` numeric,
  	\`sizes_hero_filename\` text,
  	\`sizes_og_url\` text,
  	\`sizes_og_width\` numeric,
  	\`sizes_og_height\` numeric,
  	\`sizes_og_mime_type\` text,
  	\`sizes_og_filesize\` numeric,
  	\`sizes_og_filename\` text
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_seed_key_idx\` ON \`media\` (\`seed_key\`);`)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`media__status_idx\` ON \`media\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumb_sizes_thumb_filename_idx\` ON \`media\` (\`sizes_thumb_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_hero_sizes_hero_filename_idx\` ON \`media\` (\`sizes_hero_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
  await db.run(sql`CREATE TABLE \`media_locales\` (
  	\`alt\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_locales_locale_parent_id_unique\` ON \`media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_media_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_seed_key\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_url\` text,
  	\`version_thumbnail_u_r_l\` text,
  	\`version_filename\` text,
  	\`version_mime_type\` text,
  	\`version_filesize\` numeric,
  	\`version_width\` numeric,
  	\`version_height\` numeric,
  	\`version_focal_x\` numeric,
  	\`version_focal_y\` numeric,
  	\`version_sizes_thumb_url\` text,
  	\`version_sizes_thumb_width\` numeric,
  	\`version_sizes_thumb_height\` numeric,
  	\`version_sizes_thumb_mime_type\` text,
  	\`version_sizes_thumb_filesize\` numeric,
  	\`version_sizes_thumb_filename\` text,
  	\`version_sizes_card_url\` text,
  	\`version_sizes_card_width\` numeric,
  	\`version_sizes_card_height\` numeric,
  	\`version_sizes_card_mime_type\` text,
  	\`version_sizes_card_filesize\` numeric,
  	\`version_sizes_card_filename\` text,
  	\`version_sizes_hero_url\` text,
  	\`version_sizes_hero_width\` numeric,
  	\`version_sizes_hero_height\` numeric,
  	\`version_sizes_hero_mime_type\` text,
  	\`version_sizes_hero_filesize\` numeric,
  	\`version_sizes_hero_filename\` text,
  	\`version_sizes_og_url\` text,
  	\`version_sizes_og_width\` numeric,
  	\`version_sizes_og_height\` numeric,
  	\`version_sizes_og_mime_type\` text,
  	\`version_sizes_og_filesize\` numeric,
  	\`version_sizes_og_filename\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_media_v_parent_idx\` ON \`_media_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_seed_key_idx\` ON \`_media_v\` (\`version_seed_key\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_updated_at_idx\` ON \`_media_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_created_at_idx\` ON \`_media_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version__status_idx\` ON \`_media_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_filename_idx\` ON \`_media_v\` (\`version_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_thumb_version_sizes_thumb_filenam_idx\` ON \`_media_v\` (\`version_sizes_thumb_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_card_version_sizes_card_filename_idx\` ON \`_media_v\` (\`version_sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_hero_version_sizes_hero_filename_idx\` ON \`_media_v\` (\`version_sizes_hero_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_og_version_sizes_og_filename_idx\` ON \`_media_v\` (\`version_sizes_og_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_created_at_idx\` ON \`_media_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_updated_at_idx\` ON \`_media_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_snapshot_idx\` ON \`_media_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_published_locale_idx\` ON \`_media_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_latest_idx\` ON \`_media_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_media_v_locales\` (
  	\`version_alt\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_media_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_media_v_locales_locale_parent_id_unique\` ON \`_media_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`inquiries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`company\` text,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`country\` text,
  	\`message\` text NOT NULL,
  	\`consent\` integer DEFAULT false NOT NULL,
  	\`locale\` text DEFAULT 'en' NOT NULL,
  	\`status\` text DEFAULT 'new' NOT NULL,
  	\`email_status\` text DEFAULT 'pending' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`inquiries_updated_at_idx\` ON \`inquiries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`inquiries_created_at_idx\` ON \`inquiries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`inquiries_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`inquiries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`inquiries_rels_order_idx\` ON \`inquiries_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`inquiries_rels_parent_idx\` ON \`inquiries_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`inquiries_rels_path_idx\` ON \`inquiries_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`inquiries_rels_services_id_idx\` ON \`inquiries_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`role\` text DEFAULT 'editor' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	\`group_entities_id\` integer,
  	\`milestones_id\` integer,
  	\`clients_id\` integer,
  	\`cities_id\` integer,
  	\`posts_id\` integer,
  	\`media_id\` integer,
  	\`inquiries_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`group_entities_id\`) REFERENCES \`group_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`milestones_id\`) REFERENCES \`milestones\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`clients_id\`) REFERENCES \`clients\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`cities_id\`) REFERENCES \`cities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`inquiries_id\`) REFERENCES \`inquiries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_group_entities_id_idx\` ON \`payload_locked_documents_rels\` (\`group_entities_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_milestones_id_idx\` ON \`payload_locked_documents_rels\` (\`milestones_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_clients_id_idx\` ON \`payload_locked_documents_rels\` (\`clients_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_cities_id_idx\` ON \`payload_locked_documents_rels\` (\`cities_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_inquiries_id_idx\` ON \`payload_locked_documents_rels\` (\`inquiries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_social_order_idx\` ON \`site_social\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_social_parent_id_idx\` ON \`site_social\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_inquiry_recipients\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_inquiry_recipients_order_idx\` ON \`site_inquiry_recipients\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_inquiry_recipients_parent_id_idx\` ON \`site_inquiry_recipients\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`legal_name\` text DEFAULT 'PT Affirmate Tatakelola Nusantara',
  	\`brand_name\` text DEFAULT 'Affirmate Administrative',
  	\`group_name\` text DEFAULT 'Affirmate Group',
  	\`logo_id\` integer,
  	\`logo_white_id\` integer,
  	\`phone\` text,
  	\`phone2\` text,
  	\`whatsapp\` text,
  	\`email\` text,
  	\`maps_url\` text,
  	\`group_url\` text DEFAULT 'https://affirmate.co.id',
  	\`seo_default_og_image_id\` integer,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`logo_white_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_default_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_logo_idx\` ON \`site\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_logo_white_idx\` ON \`site\` (\`logo_white_id\`);`)
  await db.run(sql`CREATE INDEX \`site_seo_default_seo_default_og_image_idx\` ON \`site\` (\`seo_default_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site__status_idx\` ON \`site\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`site_locales\` (
  	\`address\` text,
  	\`working_hours\` text,
  	\`group_blurb\` text,
  	\`seo_default_title\` text,
  	\`seo_default_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_locales_locale_parent_id_unique\` ON \`site_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_v_version_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_v_version_social_order_idx\` ON \`_site_v_version_social\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_version_social_parent_id_idx\` ON \`_site_v_version_social\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_v_version_inquiry_recipients\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`email\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_v_version_inquiry_recipients_order_idx\` ON \`_site_v_version_inquiry_recipients\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_version_inquiry_recipients_parent_id_idx\` ON \`_site_v_version_inquiry_recipients\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_legal_name\` text DEFAULT 'PT Affirmate Tatakelola Nusantara',
  	\`version_brand_name\` text DEFAULT 'Affirmate Administrative',
  	\`version_group_name\` text DEFAULT 'Affirmate Group',
  	\`version_logo_id\` integer,
  	\`version_logo_white_id\` integer,
  	\`version_phone\` text,
  	\`version_phone2\` text,
  	\`version_whatsapp\` text,
  	\`version_email\` text,
  	\`version_maps_url\` text,
  	\`version_group_url\` text DEFAULT 'https://affirmate.co.id',
  	\`version_seo_default_og_image_id\` integer,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_white_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_default_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_v_version_version_logo_idx\` ON \`_site_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_version_version_logo_white_idx\` ON \`_site_v\` (\`version_logo_white_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_version_seo_default_version_seo_default_og_image_idx\` ON \`_site_v\` (\`version_seo_default_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_version_version__status_idx\` ON \`_site_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_created_at_idx\` ON \`_site_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_updated_at_idx\` ON \`_site_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_snapshot_idx\` ON \`_site_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_published_locale_idx\` ON \`_site_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_latest_idx\` ON \`_site_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_site_v_locales\` (
  	\`version_address\` text,
  	\`version_working_hours\` text,
  	\`version_group_blurb\` text,
  	\`version_seo_default_title\` text,
  	\`version_seo_default_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_site_v_locales_locale_parent_id_unique\` ON \`_site_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_about_mission\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_about_mission_order_idx\` ON \`home_about_mission\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_about_mission_parent_id_idx\` ON \`home_about_mission\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_about_mission_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_about_mission\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_about_mission_locales_locale_parent_id_unique\` ON \`home_about_mission_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_about_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`icon\` text DEFAULT 'check',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_about_stats_order_idx\` ON \`home_about_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_about_stats_parent_id_idx\` ON \`home_about_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_about_stats_locales\` (
  	\`label\` text,
  	\`sublabel\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_about_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_about_stats_locales_locale_parent_id_unique\` ON \`home_about_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_why_pillars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text DEFAULT 'check',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_why_pillars_order_idx\` ON \`home_why_pillars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_why_pillars_parent_id_idx\` ON \`home_why_pillars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_why_pillars_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_why_pillars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_why_pillars_locales_locale_parent_id_unique\` ON \`home_why_pillars_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_services_platform_pillars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_services_platform_pillars_order_idx\` ON \`home_services_platform_pillars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_services_platform_pillars_parent_id_idx\` ON \`home_services_platform_pillars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_services_platform_pillars_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_services_platform_pillars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_services_platform_pillars_locales_locale_parent_id_uniq\` ON \`home_services_platform_pillars_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_services_platform_scope\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_services_platform_scope_order_idx\` ON \`home_services_platform_scope\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_services_platform_scope_parent_id_idx\` ON \`home_services_platform_scope\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_services_platform_scope_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_services_platform_scope\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_services_platform_scope_locales_locale_parent_id_unique\` ON \`home_services_platform_scope_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_network_pillars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text DEFAULT 'check',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_network_pillars_order_idx\` ON \`home_network_pillars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_network_pillars_parent_id_idx\` ON \`home_network_pillars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_network_pillars_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_network_pillars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_network_pillars_locales_locale_parent_id_unique\` ON \`home_network_pillars_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_office_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_office_gallery_order_idx\` ON \`home_office_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_office_gallery_parent_id_idx\` ON \`home_office_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_office_gallery_image_idx\` ON \`home_office_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_image_id\` integer,
  	\`hero_primary_cta_href\` text DEFAULT '#contact',
  	\`hero_secondary_cta_href\` text DEFAULT '#contact',
  	\`about_image_id\` integer,
  	\`about_show_vision_mission\` integer DEFAULT true,
  	\`why_image_id\` integer,
  	\`services_image_id\` integer,
  	\`journey_image_id\` integer,
  	\`sections_visible_about\` integer DEFAULT true,
  	\`sections_visible_vision_mission\` integer DEFAULT true,
  	\`sections_visible_stats\` integer DEFAULT true,
  	\`sections_visible_why\` integer DEFAULT true,
  	\`sections_visible_group\` integer DEFAULT true,
  	\`sections_visible_services\` integer DEFAULT true,
  	\`sections_visible_journey\` integer DEFAULT true,
  	\`sections_visible_clients\` integer DEFAULT true,
  	\`sections_visible_network\` integer DEFAULT true,
  	\`sections_visible_office\` integer DEFAULT true,
  	\`sections_visible_insights\` integer DEFAULT true,
  	\`sections_visible_contact\` integer DEFAULT true,
  	\`needs_review\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`why_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`services_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journey_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_hero_hero_image_idx\` ON \`home\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_about_about_image_idx\` ON \`home\` (\`about_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_why_why_image_idx\` ON \`home\` (\`why_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_services_services_image_idx\` ON \`home\` (\`services_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_journey_journey_image_idx\` ON \`home\` (\`journey_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home__status_idx\` ON \`home\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`home_locales\` (
  	\`hero_eyebrow\` text,
  	\`hero_headline\` text,
  	\`hero_highlight\` text,
  	\`hero_lead\` text,
  	\`hero_cover_label\` text,
  	\`hero_primary_cta_label\` text,
  	\`hero_secondary_cta_label\` text,
  	\`about_eyebrow\` text,
  	\`about_title\` text,
  	\`about_subtitle\` text,
  	\`about_body\` text,
  	\`about_vision\` text,
  	\`why_title\` text,
  	\`why_tagline\` text,
  	\`why_body\` text,
  	\`group_title\` text,
  	\`group_body\` text,
  	\`services_eyebrow\` text,
  	\`services_title\` text,
  	\`services_subtitle\` text,
  	\`services_intro\` text,
  	\`services_platform_title\` text,
  	\`journey_title\` text,
  	\`journey_subtitle\` text,
  	\`journey_body\` text,
  	\`clients_title\` text,
  	\`clients_subtitle\` text,
  	\`clients_body\` text,
  	\`network_title\` text,
  	\`network_subtitle\` text,
  	\`network_body\` text,
  	\`office_title\` text,
  	\`office_label\` text,
  	\`contact_title\` text,
  	\`contact_text\` text,
  	\`contact_consent_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_locales_locale_parent_id_unique\` ON \`home_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_about_mission\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_about_mission_order_idx\` ON \`_home_v_version_about_mission\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_about_mission_parent_id_idx\` ON \`_home_v_version_about_mission\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_about_mission_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v_version_about_mission\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_v_version_about_mission_locales_locale_parent_id_uniqu\` ON \`_home_v_version_about_mission_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_about_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`icon\` text DEFAULT 'check',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_about_stats_order_idx\` ON \`_home_v_version_about_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_about_stats_parent_id_idx\` ON \`_home_v_version_about_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_about_stats_locales\` (
  	\`label\` text,
  	\`sublabel\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v_version_about_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_v_version_about_stats_locales_locale_parent_id_unique\` ON \`_home_v_version_about_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_why_pillars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text DEFAULT 'check',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_why_pillars_order_idx\` ON \`_home_v_version_why_pillars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_why_pillars_parent_id_idx\` ON \`_home_v_version_why_pillars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_why_pillars_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v_version_why_pillars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_v_version_why_pillars_locales_locale_parent_id_unique\` ON \`_home_v_version_why_pillars_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_services_platform_pillars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_services_platform_pillars_order_idx\` ON \`_home_v_version_services_platform_pillars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_services_platform_pillars_parent_id_idx\` ON \`_home_v_version_services_platform_pillars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_services_platform_pillars_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v_version_services_platform_pillars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_v_version_services_platform_pillars_locales_locale_par\` ON \`_home_v_version_services_platform_pillars_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_services_platform_scope\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_services_platform_scope_order_idx\` ON \`_home_v_version_services_platform_scope\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_services_platform_scope_parent_id_idx\` ON \`_home_v_version_services_platform_scope\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_services_platform_scope_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v_version_services_platform_scope\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_v_version_services_platform_scope_locales_locale_paren\` ON \`_home_v_version_services_platform_scope_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_network_pillars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text DEFAULT 'check',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_network_pillars_order_idx\` ON \`_home_v_version_network_pillars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_network_pillars_parent_id_idx\` ON \`_home_v_version_network_pillars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_network_pillars_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v_version_network_pillars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_v_version_network_pillars_locales_locale_parent_id_uni\` ON \`_home_v_version_network_pillars_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_office_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_office_gallery_order_idx\` ON \`_home_v_version_office_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_office_gallery_parent_id_idx\` ON \`_home_v_version_office_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_office_gallery_image_idx\` ON \`_home_v_version_office_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_image_id\` integer,
  	\`version_hero_primary_cta_href\` text DEFAULT '#contact',
  	\`version_hero_secondary_cta_href\` text DEFAULT '#contact',
  	\`version_about_image_id\` integer,
  	\`version_about_show_vision_mission\` integer DEFAULT true,
  	\`version_why_image_id\` integer,
  	\`version_services_image_id\` integer,
  	\`version_journey_image_id\` integer,
  	\`version_sections_visible_about\` integer DEFAULT true,
  	\`version_sections_visible_vision_mission\` integer DEFAULT true,
  	\`version_sections_visible_stats\` integer DEFAULT true,
  	\`version_sections_visible_why\` integer DEFAULT true,
  	\`version_sections_visible_group\` integer DEFAULT true,
  	\`version_sections_visible_services\` integer DEFAULT true,
  	\`version_sections_visible_journey\` integer DEFAULT true,
  	\`version_sections_visible_clients\` integer DEFAULT true,
  	\`version_sections_visible_network\` integer DEFAULT true,
  	\`version_sections_visible_office\` integer DEFAULT true,
  	\`version_sections_visible_insights\` integer DEFAULT true,
  	\`version_sections_visible_contact\` integer DEFAULT true,
  	\`version_needs_review\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_about_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_why_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_services_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journey_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_hero_version_hero_image_idx\` ON \`_home_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_about_version_about_image_idx\` ON \`_home_v\` (\`version_about_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_why_version_why_image_idx\` ON \`_home_v\` (\`version_why_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_services_version_services_image_idx\` ON \`_home_v\` (\`version_services_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_journey_version_journey_image_idx\` ON \`_home_v\` (\`version_journey_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_version__status_idx\` ON \`_home_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_created_at_idx\` ON \`_home_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_updated_at_idx\` ON \`_home_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_snapshot_idx\` ON \`_home_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_published_locale_idx\` ON \`_home_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_latest_idx\` ON \`_home_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_locales\` (
  	\`version_hero_eyebrow\` text,
  	\`version_hero_headline\` text,
  	\`version_hero_highlight\` text,
  	\`version_hero_lead\` text,
  	\`version_hero_cover_label\` text,
  	\`version_hero_primary_cta_label\` text,
  	\`version_hero_secondary_cta_label\` text,
  	\`version_about_eyebrow\` text,
  	\`version_about_title\` text,
  	\`version_about_subtitle\` text,
  	\`version_about_body\` text,
  	\`version_about_vision\` text,
  	\`version_why_title\` text,
  	\`version_why_tagline\` text,
  	\`version_why_body\` text,
  	\`version_group_title\` text,
  	\`version_group_body\` text,
  	\`version_services_eyebrow\` text,
  	\`version_services_title\` text,
  	\`version_services_subtitle\` text,
  	\`version_services_intro\` text,
  	\`version_services_platform_title\` text,
  	\`version_journey_title\` text,
  	\`version_journey_subtitle\` text,
  	\`version_journey_body\` text,
  	\`version_clients_title\` text,
  	\`version_clients_subtitle\` text,
  	\`version_clients_body\` text,
  	\`version_network_title\` text,
  	\`version_network_subtitle\` text,
  	\`version_network_body\` text,
  	\`version_office_title\` text,
  	\`version_office_label\` text,
  	\`version_contact_title\` text,
  	\`version_contact_text\` text,
  	\`version_contact_consent_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_v_locales_locale_parent_id_unique\` ON \`_home_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`legal\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`legal__status_idx\` ON \`legal\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`legal_locales\` (
  	\`privacy_title\` text,
  	\`privacy_body\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`legal\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`legal_locales_locale_parent_id_unique\` ON \`legal_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_legal_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_updated_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_legal_v_version_version__status_idx\` ON \`_legal_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_legal_v_created_at_idx\` ON \`_legal_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_legal_v_updated_at_idx\` ON \`_legal_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_legal_v_snapshot_idx\` ON \`_legal_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_legal_v_published_locale_idx\` ON \`_legal_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_legal_v_latest_idx\` ON \`_legal_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_legal_v_locales\` (
  	\`version_privacy_title\` text,
  	\`version_privacy_body\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_legal_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_legal_v_locales_locale_parent_id_unique\` ON \`_legal_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ui\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`ui__status_idx\` ON \`ui\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`ui_locales\` (
  	\`nav_about\` text,
  	\`nav_why\` text,
  	\`nav_group\` text,
  	\`nav_services\` text,
  	\`nav_journey\` text,
  	\`nav_clients\` text,
  	\`nav_network\` text,
  	\`nav_office\` text,
  	\`nav_insights\` text,
  	\`nav_contact\` text,
  	\`cta_contact\` text,
  	\`cta_services\` text,
  	\`cta_whatsapp\` text,
  	\`cta_read_more\` text,
  	\`cta_all_insights\` text,
  	\`cta_open_maps\` text,
  	\`cta_visit_group\` text,
  	\`form_name\` text,
  	\`form_company\` text,
  	\`form_email\` text,
  	\`form_phone\` text,
  	\`form_country\` text,
  	\`form_services\` text,
  	\`form_message\` text,
  	\`form_submit\` text,
  	\`form_sending\` text,
  	\`form_success\` text,
  	\`form_error\` text,
  	\`form_required\` text,
  	\`form_consent_required\` text,
  	\`form_rate_limited\` text,
  	\`sections_you_are_here\` text,
  	\`sections_member_of\` text,
  	\`sections_head_office\` text,
  	\`sections_phone\` text,
  	\`sections_email\` text,
  	\`sections_address\` text,
  	\`sections_latest_insights\` text,
  	\`sections_related_posts\` text,
  	\`sections_category_all\` text,
  	\`sections_category_regulatory_update\` text,
  	\`sections_category_guide\` text,
  	\`sections_category_company_news\` text,
  	\`footer_rights\` text,
  	\`footer_privacy\` text,
  	\`footer_map_credit\` text,
  	\`lang_switch_to\` text,
  	\`lang_label\` text,
  	\`not_found_title\` text,
  	\`not_found_text\` text,
  	\`not_found_home\` text,
  	\`a11y_skip_to_content\` text,
  	\`a11y_open_menu\` text,
  	\`a11y_close_menu\` text,
  	\`a11y_preview_on\` text,
  	\`a11y_preview_exit\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ui\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ui_locales_locale_parent_id_unique\` ON \`ui_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ui_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_ui_v_version_version__status_idx\` ON \`_ui_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_created_at_idx\` ON \`_ui_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_updated_at_idx\` ON \`_ui_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_snapshot_idx\` ON \`_ui_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_published_locale_idx\` ON \`_ui_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_latest_idx\` ON \`_ui_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_ui_v_locales\` (
  	\`version_nav_about\` text,
  	\`version_nav_why\` text,
  	\`version_nav_group\` text,
  	\`version_nav_services\` text,
  	\`version_nav_journey\` text,
  	\`version_nav_clients\` text,
  	\`version_nav_network\` text,
  	\`version_nav_office\` text,
  	\`version_nav_insights\` text,
  	\`version_nav_contact\` text,
  	\`version_cta_contact\` text,
  	\`version_cta_services\` text,
  	\`version_cta_whatsapp\` text,
  	\`version_cta_read_more\` text,
  	\`version_cta_all_insights\` text,
  	\`version_cta_open_maps\` text,
  	\`version_cta_visit_group\` text,
  	\`version_form_name\` text,
  	\`version_form_company\` text,
  	\`version_form_email\` text,
  	\`version_form_phone\` text,
  	\`version_form_country\` text,
  	\`version_form_services\` text,
  	\`version_form_message\` text,
  	\`version_form_submit\` text,
  	\`version_form_sending\` text,
  	\`version_form_success\` text,
  	\`version_form_error\` text,
  	\`version_form_required\` text,
  	\`version_form_consent_required\` text,
  	\`version_form_rate_limited\` text,
  	\`version_sections_you_are_here\` text,
  	\`version_sections_member_of\` text,
  	\`version_sections_head_office\` text,
  	\`version_sections_phone\` text,
  	\`version_sections_email\` text,
  	\`version_sections_address\` text,
  	\`version_sections_latest_insights\` text,
  	\`version_sections_related_posts\` text,
  	\`version_sections_category_all\` text,
  	\`version_sections_category_regulatory_update\` text,
  	\`version_sections_category_guide\` text,
  	\`version_sections_category_company_news\` text,
  	\`version_footer_rights\` text,
  	\`version_footer_privacy\` text,
  	\`version_footer_map_credit\` text,
  	\`version_lang_switch_to\` text,
  	\`version_lang_label\` text,
  	\`version_not_found_title\` text,
  	\`version_not_found_text\` text,
  	\`version_not_found_home\` text,
  	\`version_a11y_skip_to_content\` text,
  	\`version_a11y_open_menu\` text,
  	\`version_a11y_close_menu\` text,
  	\`version_a11y_preview_on\` text,
  	\`version_a11y_preview_exit\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ui_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_ui_v_locales_locale_parent_id_unique\` ON \`_ui_v_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`services_items\`;`)
  await db.run(sql`DROP TABLE \`services_items_locales\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`services_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v\`;`)
  await db.run(sql`DROP TABLE \`_services_v_locales\`;`)
  await db.run(sql`DROP TABLE \`group_entities_bullets\`;`)
  await db.run(sql`DROP TABLE \`group_entities_bullets_locales\`;`)
  await db.run(sql`DROP TABLE \`group_entities\`;`)
  await db.run(sql`DROP TABLE \`group_entities_locales\`;`)
  await db.run(sql`DROP TABLE \`_group_entities_v_version_bullets\`;`)
  await db.run(sql`DROP TABLE \`_group_entities_v_version_bullets_locales\`;`)
  await db.run(sql`DROP TABLE \`_group_entities_v\`;`)
  await db.run(sql`DROP TABLE \`_group_entities_v_locales\`;`)
  await db.run(sql`DROP TABLE \`milestones\`;`)
  await db.run(sql`DROP TABLE \`milestones_locales\`;`)
  await db.run(sql`DROP TABLE \`_milestones_v\`;`)
  await db.run(sql`DROP TABLE \`_milestones_v_locales\`;`)
  await db.run(sql`DROP TABLE \`clients\`;`)
  await db.run(sql`DROP TABLE \`_clients_v\`;`)
  await db.run(sql`DROP TABLE \`cities\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`media_locales\`;`)
  await db.run(sql`DROP TABLE \`_media_v\`;`)
  await db.run(sql`DROP TABLE \`_media_v_locales\`;`)
  await db.run(sql`DROP TABLE \`inquiries\`;`)
  await db.run(sql`DROP TABLE \`inquiries_rels\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_social\`;`)
  await db.run(sql`DROP TABLE \`site_inquiry_recipients\`;`)
  await db.run(sql`DROP TABLE \`site\`;`)
  await db.run(sql`DROP TABLE \`site_locales\`;`)
  await db.run(sql`DROP TABLE \`_site_v_version_social\`;`)
  await db.run(sql`DROP TABLE \`_site_v_version_inquiry_recipients\`;`)
  await db.run(sql`DROP TABLE \`_site_v\`;`)
  await db.run(sql`DROP TABLE \`_site_v_locales\`;`)
  await db.run(sql`DROP TABLE \`home_about_mission\`;`)
  await db.run(sql`DROP TABLE \`home_about_mission_locales\`;`)
  await db.run(sql`DROP TABLE \`home_about_stats\`;`)
  await db.run(sql`DROP TABLE \`home_about_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`home_why_pillars\`;`)
  await db.run(sql`DROP TABLE \`home_why_pillars_locales\`;`)
  await db.run(sql`DROP TABLE \`home_services_platform_pillars\`;`)
  await db.run(sql`DROP TABLE \`home_services_platform_pillars_locales\`;`)
  await db.run(sql`DROP TABLE \`home_services_platform_scope\`;`)
  await db.run(sql`DROP TABLE \`home_services_platform_scope_locales\`;`)
  await db.run(sql`DROP TABLE \`home_network_pillars\`;`)
  await db.run(sql`DROP TABLE \`home_network_pillars_locales\`;`)
  await db.run(sql`DROP TABLE \`home_office_gallery\`;`)
  await db.run(sql`DROP TABLE \`home\`;`)
  await db.run(sql`DROP TABLE \`home_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_about_mission\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_about_mission_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_about_stats\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_about_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_why_pillars\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_why_pillars_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_services_platform_pillars\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_services_platform_pillars_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_services_platform_scope\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_services_platform_scope_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_network_pillars\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_network_pillars_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_office_gallery\`;`)
  await db.run(sql`DROP TABLE \`_home_v\`;`)
  await db.run(sql`DROP TABLE \`_home_v_locales\`;`)
  await db.run(sql`DROP TABLE \`legal\`;`)
  await db.run(sql`DROP TABLE \`legal_locales\`;`)
  await db.run(sql`DROP TABLE \`_legal_v\`;`)
  await db.run(sql`DROP TABLE \`_legal_v_locales\`;`)
  await db.run(sql`DROP TABLE \`ui\`;`)
  await db.run(sql`DROP TABLE \`ui_locales\`;`)
  await db.run(sql`DROP TABLE \`_ui_v\`;`)
  await db.run(sql`DROP TABLE \`_ui_v_locales\`;`)
}
