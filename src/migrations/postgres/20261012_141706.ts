import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('monitor', 'timer', 'shield-check', 'map-trifold', 'globe', 'globe-hemisphere-east', 'trend-up', 'map-pin', 'handshake', 'users-three', 'bank', 'identification-card', 'identification-badge', 'wallet', 'user-check', 'buildings', 'briefcase', 'envelope-simple', 'phone', 'check', 'file-text', 'calendar');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_icon" AS ENUM('monitor', 'timer', 'shield-check', 'map-trifold', 'globe', 'globe-hemisphere-east', 'trend-up', 'map-pin', 'handshake', 'users-three', 'bank', 'identification-card', 'identification-badge', 'wallet', 'user-check', 'buildings', 'briefcase', 'envelope-simple', 'phone', 'check', 'file-text', 'calendar');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_group_entities_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__group_entities_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__group_entities_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_milestones_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__milestones_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__milestones_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_clients_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__clients_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__clients_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_posts_category" AS ENUM('regulatory-update', 'guide', 'company-news');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_category" AS ENUM('regulatory-update', 'guide', 'company-news');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_media_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__media_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__media_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_inquiries_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_inquiries_status" AS ENUM('new', 'contacted', 'closed');
  CREATE TYPE "public"."enum_inquiries_email_status" AS ENUM('pending', 'sent', 'failed');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_site_social_platform" AS ENUM('linkedin', 'instagram', 'facebook', 'youtube');
  CREATE TYPE "public"."enum_site_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_v_version_social_platform" AS ENUM('linkedin', 'instagram', 'facebook', 'youtube');
  CREATE TYPE "public"."enum__site_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_home_about_stats_icon" AS ENUM('monitor', 'timer', 'shield-check', 'map-trifold', 'globe', 'globe-hemisphere-east', 'trend-up', 'map-pin', 'handshake', 'users-three', 'bank', 'identification-card', 'identification-badge', 'wallet', 'user-check', 'buildings', 'briefcase', 'envelope-simple', 'phone', 'check', 'file-text', 'calendar');
  CREATE TYPE "public"."enum_home_why_pillars_icon" AS ENUM('monitor', 'timer', 'shield-check', 'map-trifold', 'globe', 'globe-hemisphere-east', 'trend-up', 'map-pin', 'handshake', 'users-three', 'bank', 'identification-card', 'identification-badge', 'wallet', 'user-check', 'buildings', 'briefcase', 'envelope-simple', 'phone', 'check', 'file-text', 'calendar');
  CREATE TYPE "public"."enum_home_network_pillars_icon" AS ENUM('monitor', 'timer', 'shield-check', 'map-trifold', 'globe', 'globe-hemisphere-east', 'trend-up', 'map-pin', 'handshake', 'users-three', 'bank', 'identification-card', 'identification-badge', 'wallet', 'user-check', 'buildings', 'briefcase', 'envelope-simple', 'phone', 'check', 'file-text', 'calendar');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_about_stats_icon" AS ENUM('monitor', 'timer', 'shield-check', 'map-trifold', 'globe', 'globe-hemisphere-east', 'trend-up', 'map-pin', 'handshake', 'users-three', 'bank', 'identification-card', 'identification-badge', 'wallet', 'user-check', 'buildings', 'briefcase', 'envelope-simple', 'phone', 'check', 'file-text', 'calendar');
  CREATE TYPE "public"."enum__home_v_version_why_pillars_icon" AS ENUM('monitor', 'timer', 'shield-check', 'map-trifold', 'globe', 'globe-hemisphere-east', 'trend-up', 'map-pin', 'handshake', 'users-three', 'bank', 'identification-card', 'identification-badge', 'wallet', 'user-check', 'buildings', 'briefcase', 'envelope-simple', 'phone', 'check', 'file-text', 'calendar');
  CREATE TYPE "public"."enum__home_v_version_network_pillars_icon" AS ENUM('monitor', 'timer', 'shield-check', 'map-trifold', 'globe', 'globe-hemisphere-east', 'trend-up', 'map-pin', 'handshake', 'users-three', 'bank', 'identification-card', 'identification-badge', 'wallet', 'user-check', 'buildings', 'briefcase', 'envelope-simple', 'phone', 'check', 'file-text', 'calendar');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_legal_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_ui_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ui_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ui_v_published_locale" AS ENUM('en', 'id');
  CREATE TABLE "services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"order" numeric DEFAULT 0,
  	"icon" "enum_services_icon" DEFAULT 'check',
  	"seo_og_image_id" integer,
  	"seed_key" varchar,
  	"needs_review" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"body" varchar,
  	"partner_note" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_version_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 0,
  	"version_icon" "enum__services_v_version_icon" DEFAULT 'check',
  	"version_seo_og_image_id" integer,
  	"version_seed_key" varchar,
  	"version_needs_review" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__services_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_services_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_body" varchar,
  	"version_partner_note" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "group_entities_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "group_entities_bullets_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "group_entities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"brand" varchar,
  	"logo_id" integer,
  	"url" varchar,
  	"is_self" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"seed_key" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_group_entities_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "group_entities_locales" (
  	"category" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_group_entities_v_version_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_group_entities_v_version_bullets_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_group_entities_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_brand" varchar,
  	"version_logo_id" integer,
  	"version_url" varchar,
  	"version_is_self" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 0,
  	"version_seed_key" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__group_entities_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__group_entities_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_group_entities_v_locales" (
  	"version_category" varchar,
  	"version_summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "milestones" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" numeric,
  	"order" numeric DEFAULT 0,
  	"seed_key" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_milestones_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "milestones_locales" (
  	"label" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_milestones_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_year" numeric,
  	"version_order" numeric DEFAULT 0,
  	"version_seed_key" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__milestones_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__milestones_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_milestones_v_locales" (
  	"version_label" varchar,
  	"version_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar,
  	"consent" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"seed_key" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_clients_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_clients_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_logo_id" integer,
  	"version_url" varchar,
  	"version_consent" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 0,
  	"version_seed_key" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__clients_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__clients_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "cities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"lat" numeric NOT NULL,
  	"lng" numeric NOT NULL,
  	"order" numeric DEFAULT 0,
  	"seed_key" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_posts_category" DEFAULT 'guide',
  	"cover_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"author" varchar,
  	"seo_og_image_id" integer,
  	"seed_key" varchar,
  	"needs_review" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category" "enum__posts_v_version_category" DEFAULT 'guide',
  	"version_cover_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_author" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seed_key" varchar,
  	"version_needs_review" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seed_key" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_media_status" DEFAULT 'draft',
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_media_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_seed_key" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__media_v_version_status" DEFAULT 'draft',
  	"version_url" varchar,
  	"version_thumbnail_u_r_l" varchar,
  	"version_filename" varchar,
  	"version_mime_type" varchar,
  	"version_filesize" numeric,
  	"version_width" numeric,
  	"version_height" numeric,
  	"version_focal_x" numeric,
  	"version_focal_y" numeric,
  	"version_sizes_thumb_url" varchar,
  	"version_sizes_thumb_width" numeric,
  	"version_sizes_thumb_height" numeric,
  	"version_sizes_thumb_mime_type" varchar,
  	"version_sizes_thumb_filesize" numeric,
  	"version_sizes_thumb_filename" varchar,
  	"version_sizes_card_url" varchar,
  	"version_sizes_card_width" numeric,
  	"version_sizes_card_height" numeric,
  	"version_sizes_card_mime_type" varchar,
  	"version_sizes_card_filesize" numeric,
  	"version_sizes_card_filename" varchar,
  	"version_sizes_hero_url" varchar,
  	"version_sizes_hero_width" numeric,
  	"version_sizes_hero_height" numeric,
  	"version_sizes_hero_mime_type" varchar,
  	"version_sizes_hero_filesize" numeric,
  	"version_sizes_hero_filename" varchar,
  	"version_sizes_og_url" varchar,
  	"version_sizes_og_width" numeric,
  	"version_sizes_og_height" numeric,
  	"version_sizes_og_mime_type" varchar,
  	"version_sizes_og_filesize" numeric,
  	"version_sizes_og_filename" varchar,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__media_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_media_v_locales" (
  	"version_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"company" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"country" varchar,
  	"message" varchar NOT NULL,
  	"consent" boolean DEFAULT false NOT NULL,
  	"locale" "enum_inquiries_locale" DEFAULT 'en' NOT NULL,
  	"status" "enum_inquiries_status" DEFAULT 'new' NOT NULL,
  	"email_status" "enum_inquiries_email_status" DEFAULT 'pending' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "inquiries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"group_entities_id" integer,
  	"milestones_id" integer,
  	"clients_id" integer,
  	"cities_id" integer,
  	"posts_id" integer,
  	"media_id" integer,
  	"inquiries_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_social_platform",
  	"url" varchar
  );
  
  CREATE TABLE "site_inquiry_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"legal_name" varchar DEFAULT 'PT Affirmate Tatakelola Nusantara',
  	"brand_name" varchar DEFAULT 'Affirmate Administrative',
  	"group_name" varchar DEFAULT 'Affirmate Group',
  	"logo_id" integer,
  	"logo_white_id" integer,
  	"phone" varchar,
  	"phone2" varchar,
  	"whatsapp" varchar,
  	"email" varchar,
  	"maps_url" varchar,
  	"group_url" varchar DEFAULT 'https://affirmate.co.id',
  	"seo_default_og_image_id" integer,
  	"_status" "enum_site_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_locales" (
  	"address" varchar,
  	"working_hours" varchar,
  	"group_blurb" varchar,
  	"seo_default_title" varchar,
  	"seo_default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_v_version_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__site_v_version_social_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v_version_inquiry_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_legal_name" varchar DEFAULT 'PT Affirmate Tatakelola Nusantara',
  	"version_brand_name" varchar DEFAULT 'Affirmate Administrative',
  	"version_group_name" varchar DEFAULT 'Affirmate Group',
  	"version_logo_id" integer,
  	"version_logo_white_id" integer,
  	"version_phone" varchar,
  	"version_phone2" varchar,
  	"version_whatsapp" varchar,
  	"version_email" varchar,
  	"version_maps_url" varchar,
  	"version_group_url" varchar DEFAULT 'https://affirmate.co.id',
  	"version_seo_default_og_image_id" integer,
  	"version__status" "enum__site_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_site_v_locales" (
  	"version_address" varchar,
  	"version_working_hours" varchar,
  	"version_group_blurb" varchar,
  	"version_seo_default_title" varchar,
  	"version_seo_default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_about_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_about_mission_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"icon" "enum_home_about_stats_icon" DEFAULT 'check'
  );
  
  CREATE TABLE "home_about_stats_locales" (
  	"label" varchar,
  	"sublabel" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_why_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_why_pillars_icon" DEFAULT 'check'
  );
  
  CREATE TABLE "home_why_pillars_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_services_platform_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_services_platform_pillars_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_services_platform_scope" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_services_platform_scope_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_network_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_network_pillars_icon" DEFAULT 'check'
  );
  
  CREATE TABLE "home_network_pillars_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_office_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_primary_cta_href" varchar DEFAULT '#contact',
  	"hero_secondary_cta_href" varchar DEFAULT '#contact',
  	"about_image_id" integer,
  	"about_show_vision_mission" boolean DEFAULT true,
  	"why_image_id" integer,
  	"services_image_id" integer,
  	"journey_image_id" integer,
  	"sections_visible_about" boolean DEFAULT true,
  	"sections_visible_vision_mission" boolean DEFAULT true,
  	"sections_visible_stats" boolean DEFAULT true,
  	"sections_visible_why" boolean DEFAULT true,
  	"sections_visible_group" boolean DEFAULT true,
  	"sections_visible_services" boolean DEFAULT true,
  	"sections_visible_journey" boolean DEFAULT true,
  	"sections_visible_clients" boolean DEFAULT true,
  	"sections_visible_network" boolean DEFAULT true,
  	"sections_visible_office" boolean DEFAULT true,
  	"sections_visible_insights" boolean DEFAULT true,
  	"sections_visible_contact" boolean DEFAULT true,
  	"needs_review" boolean DEFAULT false,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_locales" (
  	"hero_eyebrow" varchar,
  	"hero_headline" varchar,
  	"hero_highlight" varchar,
  	"hero_lead" varchar,
  	"hero_cover_label" varchar,
  	"hero_primary_cta_label" varchar,
  	"hero_secondary_cta_label" varchar,
  	"about_eyebrow" varchar,
  	"about_title" varchar,
  	"about_subtitle" varchar,
  	"about_body" varchar,
  	"about_vision" varchar,
  	"why_title" varchar,
  	"why_tagline" varchar,
  	"why_body" varchar,
  	"group_title" varchar,
  	"group_body" varchar,
  	"services_eyebrow" varchar,
  	"services_title" varchar,
  	"services_subtitle" varchar,
  	"services_intro" varchar,
  	"services_platform_title" varchar,
  	"journey_title" varchar,
  	"journey_subtitle" varchar,
  	"journey_body" varchar,
  	"clients_title" varchar,
  	"clients_subtitle" varchar,
  	"clients_body" varchar,
  	"network_title" varchar,
  	"network_subtitle" varchar,
  	"network_body" varchar,
  	"office_title" varchar,
  	"office_label" varchar,
  	"contact_title" varchar,
  	"contact_text" varchar,
  	"contact_consent_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_about_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_about_mission_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"icon" "enum__home_v_version_about_stats_icon" DEFAULT 'check',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_about_stats_locales" (
  	"label" varchar,
  	"sublabel" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_why_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__home_v_version_why_pillars_icon" DEFAULT 'check',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_why_pillars_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_services_platform_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_services_platform_pillars_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_services_platform_scope" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_services_platform_scope_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_network_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__home_v_version_network_pillars_icon" DEFAULT 'check',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_network_pillars_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_office_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_hero_primary_cta_href" varchar DEFAULT '#contact',
  	"version_hero_secondary_cta_href" varchar DEFAULT '#contact',
  	"version_about_image_id" integer,
  	"version_about_show_vision_mission" boolean DEFAULT true,
  	"version_why_image_id" integer,
  	"version_services_image_id" integer,
  	"version_journey_image_id" integer,
  	"version_sections_visible_about" boolean DEFAULT true,
  	"version_sections_visible_vision_mission" boolean DEFAULT true,
  	"version_sections_visible_stats" boolean DEFAULT true,
  	"version_sections_visible_why" boolean DEFAULT true,
  	"version_sections_visible_group" boolean DEFAULT true,
  	"version_sections_visible_services" boolean DEFAULT true,
  	"version_sections_visible_journey" boolean DEFAULT true,
  	"version_sections_visible_clients" boolean DEFAULT true,
  	"version_sections_visible_network" boolean DEFAULT true,
  	"version_sections_visible_office" boolean DEFAULT true,
  	"version_sections_visible_insights" boolean DEFAULT true,
  	"version_sections_visible_contact" boolean DEFAULT true,
  	"version_needs_review" boolean DEFAULT false,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__home_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_home_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_headline" varchar,
  	"version_hero_highlight" varchar,
  	"version_hero_lead" varchar,
  	"version_hero_cover_label" varchar,
  	"version_hero_primary_cta_label" varchar,
  	"version_hero_secondary_cta_label" varchar,
  	"version_about_eyebrow" varchar,
  	"version_about_title" varchar,
  	"version_about_subtitle" varchar,
  	"version_about_body" varchar,
  	"version_about_vision" varchar,
  	"version_why_title" varchar,
  	"version_why_tagline" varchar,
  	"version_why_body" varchar,
  	"version_group_title" varchar,
  	"version_group_body" varchar,
  	"version_services_eyebrow" varchar,
  	"version_services_title" varchar,
  	"version_services_subtitle" varchar,
  	"version_services_intro" varchar,
  	"version_services_platform_title" varchar,
  	"version_journey_title" varchar,
  	"version_journey_subtitle" varchar,
  	"version_journey_body" varchar,
  	"version_clients_title" varchar,
  	"version_clients_subtitle" varchar,
  	"version_clients_body" varchar,
  	"version_network_title" varchar,
  	"version_network_subtitle" varchar,
  	"version_network_body" varchar,
  	"version_office_title" varchar,
  	"version_office_label" varchar,
  	"version_contact_title" varchar,
  	"version_contact_text" varchar,
  	"version_contact_consent_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "legal" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"_status" "enum_legal_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "legal_locales" (
  	"privacy_title" varchar,
  	"privacy_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_legal_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version__status" "enum__legal_v_version_status" DEFAULT 'draft',
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__legal_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_legal_v_locales" (
  	"version_privacy_title" varchar,
  	"version_privacy_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "ui" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_ui_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ui_locales" (
  	"nav_about" varchar,
  	"nav_why" varchar,
  	"nav_group" varchar,
  	"nav_services" varchar,
  	"nav_journey" varchar,
  	"nav_clients" varchar,
  	"nav_network" varchar,
  	"nav_office" varchar,
  	"nav_insights" varchar,
  	"nav_contact" varchar,
  	"cta_contact" varchar,
  	"cta_services" varchar,
  	"cta_whatsapp" varchar,
  	"cta_read_more" varchar,
  	"cta_all_insights" varchar,
  	"cta_open_maps" varchar,
  	"cta_visit_group" varchar,
  	"form_name" varchar,
  	"form_company" varchar,
  	"form_email" varchar,
  	"form_phone" varchar,
  	"form_country" varchar,
  	"form_services" varchar,
  	"form_message" varchar,
  	"form_submit" varchar,
  	"form_sending" varchar,
  	"form_success" varchar,
  	"form_error" varchar,
  	"form_required" varchar,
  	"form_invalid" varchar,
  	"form_consent_required" varchar,
  	"form_rate_limited" varchar,
  	"sections_you_are_here" varchar,
  	"sections_member_of" varchar,
  	"sections_head_office" varchar,
  	"sections_phone" varchar,
  	"sections_email" varchar,
  	"sections_address" varchar,
  	"sections_latest_insights" varchar,
  	"sections_related_posts" varchar,
  	"sections_category_all" varchar,
  	"sections_category_regulatory_update" varchar,
  	"sections_category_guide" varchar,
  	"sections_category_company_news" varchar,
  	"footer_rights" varchar,
  	"footer_privacy" varchar,
  	"footer_map_credit" varchar,
  	"lang_switch_to" varchar,
  	"lang_label" varchar,
  	"not_found_title" varchar,
  	"not_found_text" varchar,
  	"not_found_home" varchar,
  	"a11y_skip_to_content" varchar,
  	"a11y_open_menu" varchar,
  	"a11y_close_menu" varchar,
  	"a11y_preview_on" varchar,
  	"a11y_preview_exit" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ui_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__ui_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__ui_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_ui_v_locales" (
  	"version_nav_about" varchar,
  	"version_nav_why" varchar,
  	"version_nav_group" varchar,
  	"version_nav_services" varchar,
  	"version_nav_journey" varchar,
  	"version_nav_clients" varchar,
  	"version_nav_network" varchar,
  	"version_nav_office" varchar,
  	"version_nav_insights" varchar,
  	"version_nav_contact" varchar,
  	"version_cta_contact" varchar,
  	"version_cta_services" varchar,
  	"version_cta_whatsapp" varchar,
  	"version_cta_read_more" varchar,
  	"version_cta_all_insights" varchar,
  	"version_cta_open_maps" varchar,
  	"version_cta_visit_group" varchar,
  	"version_form_name" varchar,
  	"version_form_company" varchar,
  	"version_form_email" varchar,
  	"version_form_phone" varchar,
  	"version_form_country" varchar,
  	"version_form_services" varchar,
  	"version_form_message" varchar,
  	"version_form_submit" varchar,
  	"version_form_sending" varchar,
  	"version_form_success" varchar,
  	"version_form_error" varchar,
  	"version_form_required" varchar,
  	"version_form_invalid" varchar,
  	"version_form_consent_required" varchar,
  	"version_form_rate_limited" varchar,
  	"version_sections_you_are_here" varchar,
  	"version_sections_member_of" varchar,
  	"version_sections_head_office" varchar,
  	"version_sections_phone" varchar,
  	"version_sections_email" varchar,
  	"version_sections_address" varchar,
  	"version_sections_latest_insights" varchar,
  	"version_sections_related_posts" varchar,
  	"version_sections_category_all" varchar,
  	"version_sections_category_regulatory_update" varchar,
  	"version_sections_category_guide" varchar,
  	"version_sections_category_company_news" varchar,
  	"version_footer_rights" varchar,
  	"version_footer_privacy" varchar,
  	"version_footer_map_credit" varchar,
  	"version_lang_switch_to" varchar,
  	"version_lang_label" varchar,
  	"version_not_found_title" varchar,
  	"version_not_found_text" varchar,
  	"version_not_found_home" varchar,
  	"version_a11y_skip_to_content" varchar,
  	"version_a11y_open_menu" varchar,
  	"version_a11y_close_menu" varchar,
  	"version_a11y_preview_on" varchar,
  	"version_a11y_preview_exit" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "services_items" ADD CONSTRAINT "services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_items_locales" ADD CONSTRAINT "services_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_items" ADD CONSTRAINT "_services_v_version_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_items_locales" ADD CONSTRAINT "_services_v_version_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_entities_bullets" ADD CONSTRAINT "group_entities_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."group_entities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_entities_bullets_locales" ADD CONSTRAINT "group_entities_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."group_entities_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_entities" ADD CONSTRAINT "group_entities_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "group_entities_locales" ADD CONSTRAINT "group_entities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."group_entities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_group_entities_v_version_bullets" ADD CONSTRAINT "_group_entities_v_version_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_group_entities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_group_entities_v_version_bullets_locales" ADD CONSTRAINT "_group_entities_v_version_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_group_entities_v_version_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_group_entities_v" ADD CONSTRAINT "_group_entities_v_parent_id_group_entities_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."group_entities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_group_entities_v" ADD CONSTRAINT "_group_entities_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_group_entities_v_locales" ADD CONSTRAINT "_group_entities_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_group_entities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "milestones_locales" ADD CONSTRAINT "milestones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."milestones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_milestones_v" ADD CONSTRAINT "_milestones_v_parent_id_milestones_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."milestones"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_milestones_v_locales" ADD CONSTRAINT "_milestones_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_milestones_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clients" ADD CONSTRAINT "clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_clients_v" ADD CONSTRAINT "_clients_v_parent_id_clients_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."clients"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_clients_v" ADD CONSTRAINT "_clients_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_media_v" ADD CONSTRAINT "_media_v_parent_id_media_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_media_v_locales" ADD CONSTRAINT "_media_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_media_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "inquiries_rels" ADD CONSTRAINT "inquiries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "inquiries_rels" ADD CONSTRAINT "inquiries_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_group_entities_fk" FOREIGN KEY ("group_entities_id") REFERENCES "public"."group_entities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_milestones_fk" FOREIGN KEY ("milestones_id") REFERENCES "public"."milestones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inquiries_fk" FOREIGN KEY ("inquiries_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_social" ADD CONSTRAINT "site_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_inquiry_recipients" ADD CONSTRAINT "site_inquiry_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_logo_white_id_media_id_fk" FOREIGN KEY ("logo_white_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_seo_default_og_image_id_media_id_fk" FOREIGN KEY ("seo_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_locales" ADD CONSTRAINT "site_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_social" ADD CONSTRAINT "_site_v_version_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_inquiry_recipients" ADD CONSTRAINT "_site_v_version_inquiry_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_logo_white_id_media_id_fk" FOREIGN KEY ("version_logo_white_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_seo_default_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_locales" ADD CONSTRAINT "_site_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_about_mission" ADD CONSTRAINT "home_about_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_about_mission_locales" ADD CONSTRAINT "home_about_mission_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_about_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_about_stats" ADD CONSTRAINT "home_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_about_stats_locales" ADD CONSTRAINT "home_about_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_about_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_why_pillars" ADD CONSTRAINT "home_why_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_why_pillars_locales" ADD CONSTRAINT "home_why_pillars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_why_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_services_platform_pillars" ADD CONSTRAINT "home_services_platform_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_services_platform_pillars_locales" ADD CONSTRAINT "home_services_platform_pillars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_services_platform_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_services_platform_scope" ADD CONSTRAINT "home_services_platform_scope_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_services_platform_scope_locales" ADD CONSTRAINT "home_services_platform_scope_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_services_platform_scope"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_network_pillars" ADD CONSTRAINT "home_network_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_network_pillars_locales" ADD CONSTRAINT "home_network_pillars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_network_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_office_gallery" ADD CONSTRAINT "home_office_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_office_gallery" ADD CONSTRAINT "home_office_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_why_image_id_media_id_fk" FOREIGN KEY ("why_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_services_image_id_media_id_fk" FOREIGN KEY ("services_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_journey_image_id_media_id_fk" FOREIGN KEY ("journey_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_locales" ADD CONSTRAINT "home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_about_mission" ADD CONSTRAINT "_home_v_version_about_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_about_mission_locales" ADD CONSTRAINT "_home_v_version_about_mission_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_about_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_about_stats" ADD CONSTRAINT "_home_v_version_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_about_stats_locales" ADD CONSTRAINT "_home_v_version_about_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_about_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_why_pillars" ADD CONSTRAINT "_home_v_version_why_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_why_pillars_locales" ADD CONSTRAINT "_home_v_version_why_pillars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_why_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_services_platform_pillars" ADD CONSTRAINT "_home_v_version_services_platform_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_services_platform_pillars_locales" ADD CONSTRAINT "_home_v_version_services_platform_pillars_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_services_platform_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_services_platform_scope" ADD CONSTRAINT "_home_v_version_services_platform_scope_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_services_platform_scope_locales" ADD CONSTRAINT "_home_v_version_services_platform_scope_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_services_platform_scope"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_network_pillars" ADD CONSTRAINT "_home_v_version_network_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_network_pillars_locales" ADD CONSTRAINT "_home_v_version_network_pillars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_network_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_office_gallery" ADD CONSTRAINT "_home_v_version_office_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_office_gallery" ADD CONSTRAINT "_home_v_version_office_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_about_image_id_media_id_fk" FOREIGN KEY ("version_about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_why_image_id_media_id_fk" FOREIGN KEY ("version_why_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_services_image_id_media_id_fk" FOREIGN KEY ("version_services_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_journey_image_id_media_id_fk" FOREIGN KEY ("version_journey_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_locales" ADD CONSTRAINT "_home_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_locales" ADD CONSTRAINT "legal_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_v_locales" ADD CONSTRAINT "_legal_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_legal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ui_locales" ADD CONSTRAINT "ui_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ui"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ui_v_locales" ADD CONSTRAINT "_ui_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ui_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_items_order_idx" ON "services_items" USING btree ("_order");
  CREATE INDEX "services_items_parent_id_idx" ON "services_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_items_locales_locale_parent_id_unique" ON "services_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_seo_seo_og_image_idx" ON "services" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "services_seed_key_idx" ON "services" USING btree ("seed_key");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_version_items_order_idx" ON "_services_v_version_items" USING btree ("_order");
  CREATE INDEX "_services_v_version_items_parent_id_idx" ON "_services_v_version_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_version_items_locales_locale_parent_id_unique" ON "_services_v_version_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_seo_version_seo_og_image_idx" ON "_services_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_services_v_version_version_seed_key_idx" ON "_services_v" USING btree ("version_seed_key");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_snapshot_idx" ON "_services_v" USING btree ("snapshot");
  CREATE INDEX "_services_v_published_locale_idx" ON "_services_v" USING btree ("published_locale");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_services_v_locales_locale_parent_id_unique" ON "_services_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "group_entities_bullets_order_idx" ON "group_entities_bullets" USING btree ("_order");
  CREATE INDEX "group_entities_bullets_parent_id_idx" ON "group_entities_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "group_entities_bullets_locales_locale_parent_id_unique" ON "group_entities_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "group_entities_logo_idx" ON "group_entities" USING btree ("logo_id");
  CREATE UNIQUE INDEX "group_entities_seed_key_idx" ON "group_entities" USING btree ("seed_key");
  CREATE INDEX "group_entities_updated_at_idx" ON "group_entities" USING btree ("updated_at");
  CREATE INDEX "group_entities_created_at_idx" ON "group_entities" USING btree ("created_at");
  CREATE INDEX "group_entities__status_idx" ON "group_entities" USING btree ("_status");
  CREATE UNIQUE INDEX "group_entities_locales_locale_parent_id_unique" ON "group_entities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_group_entities_v_version_bullets_order_idx" ON "_group_entities_v_version_bullets" USING btree ("_order");
  CREATE INDEX "_group_entities_v_version_bullets_parent_id_idx" ON "_group_entities_v_version_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_group_entities_v_version_bullets_locales_locale_parent_id_u" ON "_group_entities_v_version_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_group_entities_v_parent_idx" ON "_group_entities_v" USING btree ("parent_id");
  CREATE INDEX "_group_entities_v_version_version_logo_idx" ON "_group_entities_v" USING btree ("version_logo_id");
  CREATE INDEX "_group_entities_v_version_version_seed_key_idx" ON "_group_entities_v" USING btree ("version_seed_key");
  CREATE INDEX "_group_entities_v_version_version_updated_at_idx" ON "_group_entities_v" USING btree ("version_updated_at");
  CREATE INDEX "_group_entities_v_version_version_created_at_idx" ON "_group_entities_v" USING btree ("version_created_at");
  CREATE INDEX "_group_entities_v_version_version__status_idx" ON "_group_entities_v" USING btree ("version__status");
  CREATE INDEX "_group_entities_v_created_at_idx" ON "_group_entities_v" USING btree ("created_at");
  CREATE INDEX "_group_entities_v_updated_at_idx" ON "_group_entities_v" USING btree ("updated_at");
  CREATE INDEX "_group_entities_v_snapshot_idx" ON "_group_entities_v" USING btree ("snapshot");
  CREATE INDEX "_group_entities_v_published_locale_idx" ON "_group_entities_v" USING btree ("published_locale");
  CREATE INDEX "_group_entities_v_latest_idx" ON "_group_entities_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_group_entities_v_locales_locale_parent_id_unique" ON "_group_entities_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "milestones_seed_key_idx" ON "milestones" USING btree ("seed_key");
  CREATE INDEX "milestones_updated_at_idx" ON "milestones" USING btree ("updated_at");
  CREATE INDEX "milestones_created_at_idx" ON "milestones" USING btree ("created_at");
  CREATE INDEX "milestones__status_idx" ON "milestones" USING btree ("_status");
  CREATE UNIQUE INDEX "milestones_locales_locale_parent_id_unique" ON "milestones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_milestones_v_parent_idx" ON "_milestones_v" USING btree ("parent_id");
  CREATE INDEX "_milestones_v_version_version_seed_key_idx" ON "_milestones_v" USING btree ("version_seed_key");
  CREATE INDEX "_milestones_v_version_version_updated_at_idx" ON "_milestones_v" USING btree ("version_updated_at");
  CREATE INDEX "_milestones_v_version_version_created_at_idx" ON "_milestones_v" USING btree ("version_created_at");
  CREATE INDEX "_milestones_v_version_version__status_idx" ON "_milestones_v" USING btree ("version__status");
  CREATE INDEX "_milestones_v_created_at_idx" ON "_milestones_v" USING btree ("created_at");
  CREATE INDEX "_milestones_v_updated_at_idx" ON "_milestones_v" USING btree ("updated_at");
  CREATE INDEX "_milestones_v_snapshot_idx" ON "_milestones_v" USING btree ("snapshot");
  CREATE INDEX "_milestones_v_published_locale_idx" ON "_milestones_v" USING btree ("published_locale");
  CREATE INDEX "_milestones_v_latest_idx" ON "_milestones_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_milestones_v_locales_locale_parent_id_unique" ON "_milestones_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "clients_logo_idx" ON "clients" USING btree ("logo_id");
  CREATE UNIQUE INDEX "clients_seed_key_idx" ON "clients" USING btree ("seed_key");
  CREATE INDEX "clients_updated_at_idx" ON "clients" USING btree ("updated_at");
  CREATE INDEX "clients_created_at_idx" ON "clients" USING btree ("created_at");
  CREATE INDEX "clients__status_idx" ON "clients" USING btree ("_status");
  CREATE INDEX "_clients_v_parent_idx" ON "_clients_v" USING btree ("parent_id");
  CREATE INDEX "_clients_v_version_version_logo_idx" ON "_clients_v" USING btree ("version_logo_id");
  CREATE INDEX "_clients_v_version_version_seed_key_idx" ON "_clients_v" USING btree ("version_seed_key");
  CREATE INDEX "_clients_v_version_version_updated_at_idx" ON "_clients_v" USING btree ("version_updated_at");
  CREATE INDEX "_clients_v_version_version_created_at_idx" ON "_clients_v" USING btree ("version_created_at");
  CREATE INDEX "_clients_v_version_version__status_idx" ON "_clients_v" USING btree ("version__status");
  CREATE INDEX "_clients_v_created_at_idx" ON "_clients_v" USING btree ("created_at");
  CREATE INDEX "_clients_v_updated_at_idx" ON "_clients_v" USING btree ("updated_at");
  CREATE INDEX "_clients_v_snapshot_idx" ON "_clients_v" USING btree ("snapshot");
  CREATE INDEX "_clients_v_published_locale_idx" ON "_clients_v" USING btree ("published_locale");
  CREATE INDEX "_clients_v_latest_idx" ON "_clients_v" USING btree ("latest");
  CREATE UNIQUE INDEX "cities_seed_key_idx" ON "cities" USING btree ("seed_key");
  CREATE INDEX "cities_updated_at_idx" ON "cities" USING btree ("updated_at");
  CREATE INDEX "cities_created_at_idx" ON "cities" USING btree ("created_at");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_cover_idx" ON "posts" USING btree ("cover_id");
  CREATE INDEX "posts_seo_seo_og_image_idx" ON "posts" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "posts_seed_key_idx" ON "posts" USING btree ("seed_key");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_cover_idx" ON "_posts_v" USING btree ("version_cover_id");
  CREATE INDEX "_posts_v_version_seo_version_seo_og_image_idx" ON "_posts_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_posts_v_version_version_seed_key_idx" ON "_posts_v" USING btree ("version_seed_key");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "media_seed_key_idx" ON "media" USING btree ("seed_key");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE INDEX "media__status_idx" ON "media" USING btree ("_status");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_media_v_parent_idx" ON "_media_v" USING btree ("parent_id");
  CREATE INDEX "_media_v_version_version_seed_key_idx" ON "_media_v" USING btree ("version_seed_key");
  CREATE INDEX "_media_v_version_version_updated_at_idx" ON "_media_v" USING btree ("version_updated_at");
  CREATE INDEX "_media_v_version_version_created_at_idx" ON "_media_v" USING btree ("version_created_at");
  CREATE INDEX "_media_v_version_version__status_idx" ON "_media_v" USING btree ("version__status");
  CREATE INDEX "_media_v_version_version_filename_idx" ON "_media_v" USING btree ("version_filename");
  CREATE INDEX "_media_v_version_sizes_thumb_version_sizes_thumb_filenam_idx" ON "_media_v" USING btree ("version_sizes_thumb_filename");
  CREATE INDEX "_media_v_version_sizes_card_version_sizes_card_filename_idx" ON "_media_v" USING btree ("version_sizes_card_filename");
  CREATE INDEX "_media_v_version_sizes_hero_version_sizes_hero_filename_idx" ON "_media_v" USING btree ("version_sizes_hero_filename");
  CREATE INDEX "_media_v_version_sizes_og_version_sizes_og_filename_idx" ON "_media_v" USING btree ("version_sizes_og_filename");
  CREATE INDEX "_media_v_created_at_idx" ON "_media_v" USING btree ("created_at");
  CREATE INDEX "_media_v_updated_at_idx" ON "_media_v" USING btree ("updated_at");
  CREATE INDEX "_media_v_snapshot_idx" ON "_media_v" USING btree ("snapshot");
  CREATE INDEX "_media_v_published_locale_idx" ON "_media_v" USING btree ("published_locale");
  CREATE INDEX "_media_v_latest_idx" ON "_media_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_media_v_locales_locale_parent_id_unique" ON "_media_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "inquiries_updated_at_idx" ON "inquiries" USING btree ("updated_at");
  CREATE INDEX "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");
  CREATE INDEX "inquiries_rels_order_idx" ON "inquiries_rels" USING btree ("order");
  CREATE INDEX "inquiries_rels_parent_idx" ON "inquiries_rels" USING btree ("parent_id");
  CREATE INDEX "inquiries_rels_path_idx" ON "inquiries_rels" USING btree ("path");
  CREATE INDEX "inquiries_rels_services_id_idx" ON "inquiries_rels" USING btree ("services_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_group_entities_id_idx" ON "payload_locked_documents_rels" USING btree ("group_entities_id");
  CREATE INDEX "payload_locked_documents_rels_milestones_id_idx" ON "payload_locked_documents_rels" USING btree ("milestones_id");
  CREATE INDEX "payload_locked_documents_rels_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("clients_id");
  CREATE INDEX "payload_locked_documents_rels_cities_id_idx" ON "payload_locked_documents_rels" USING btree ("cities_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("inquiries_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_social_order_idx" ON "site_social" USING btree ("_order");
  CREATE INDEX "site_social_parent_id_idx" ON "site_social" USING btree ("_parent_id");
  CREATE INDEX "site_inquiry_recipients_order_idx" ON "site_inquiry_recipients" USING btree ("_order");
  CREATE INDEX "site_inquiry_recipients_parent_id_idx" ON "site_inquiry_recipients" USING btree ("_parent_id");
  CREATE INDEX "site_logo_idx" ON "site" USING btree ("logo_id");
  CREATE INDEX "site_logo_white_idx" ON "site" USING btree ("logo_white_id");
  CREATE INDEX "site_seo_default_seo_default_og_image_idx" ON "site" USING btree ("seo_default_og_image_id");
  CREATE INDEX "site__status_idx" ON "site" USING btree ("_status");
  CREATE UNIQUE INDEX "site_locales_locale_parent_id_unique" ON "site_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_v_version_social_order_idx" ON "_site_v_version_social" USING btree ("_order");
  CREATE INDEX "_site_v_version_social_parent_id_idx" ON "_site_v_version_social" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_inquiry_recipients_order_idx" ON "_site_v_version_inquiry_recipients" USING btree ("_order");
  CREATE INDEX "_site_v_version_inquiry_recipients_parent_id_idx" ON "_site_v_version_inquiry_recipients" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_version_logo_idx" ON "_site_v" USING btree ("version_logo_id");
  CREATE INDEX "_site_v_version_version_logo_white_idx" ON "_site_v" USING btree ("version_logo_white_id");
  CREATE INDEX "_site_v_version_seo_default_version_seo_default_og_image_idx" ON "_site_v" USING btree ("version_seo_default_og_image_id");
  CREATE INDEX "_site_v_version_version__status_idx" ON "_site_v" USING btree ("version__status");
  CREATE INDEX "_site_v_created_at_idx" ON "_site_v" USING btree ("created_at");
  CREATE INDEX "_site_v_updated_at_idx" ON "_site_v" USING btree ("updated_at");
  CREATE INDEX "_site_v_snapshot_idx" ON "_site_v" USING btree ("snapshot");
  CREATE INDEX "_site_v_published_locale_idx" ON "_site_v" USING btree ("published_locale");
  CREATE INDEX "_site_v_latest_idx" ON "_site_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_site_v_locales_locale_parent_id_unique" ON "_site_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_about_mission_order_idx" ON "home_about_mission" USING btree ("_order");
  CREATE INDEX "home_about_mission_parent_id_idx" ON "home_about_mission" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_about_mission_locales_locale_parent_id_unique" ON "home_about_mission_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_about_stats_order_idx" ON "home_about_stats" USING btree ("_order");
  CREATE INDEX "home_about_stats_parent_id_idx" ON "home_about_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_about_stats_locales_locale_parent_id_unique" ON "home_about_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_why_pillars_order_idx" ON "home_why_pillars" USING btree ("_order");
  CREATE INDEX "home_why_pillars_parent_id_idx" ON "home_why_pillars" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_why_pillars_locales_locale_parent_id_unique" ON "home_why_pillars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_services_platform_pillars_order_idx" ON "home_services_platform_pillars" USING btree ("_order");
  CREATE INDEX "home_services_platform_pillars_parent_id_idx" ON "home_services_platform_pillars" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_services_platform_pillars_locales_locale_parent_id_uniq" ON "home_services_platform_pillars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_services_platform_scope_order_idx" ON "home_services_platform_scope" USING btree ("_order");
  CREATE INDEX "home_services_platform_scope_parent_id_idx" ON "home_services_platform_scope" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_services_platform_scope_locales_locale_parent_id_unique" ON "home_services_platform_scope_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_network_pillars_order_idx" ON "home_network_pillars" USING btree ("_order");
  CREATE INDEX "home_network_pillars_parent_id_idx" ON "home_network_pillars" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_network_pillars_locales_locale_parent_id_unique" ON "home_network_pillars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_office_gallery_order_idx" ON "home_office_gallery" USING btree ("_order");
  CREATE INDEX "home_office_gallery_parent_id_idx" ON "home_office_gallery" USING btree ("_parent_id");
  CREATE INDEX "home_office_gallery_image_idx" ON "home_office_gallery" USING btree ("image_id");
  CREATE INDEX "home_hero_hero_image_idx" ON "home" USING btree ("hero_image_id");
  CREATE INDEX "home_about_about_image_idx" ON "home" USING btree ("about_image_id");
  CREATE INDEX "home_why_why_image_idx" ON "home" USING btree ("why_image_id");
  CREATE INDEX "home_services_services_image_idx" ON "home" USING btree ("services_image_id");
  CREATE INDEX "home_journey_journey_image_idx" ON "home" USING btree ("journey_image_id");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE UNIQUE INDEX "home_locales_locale_parent_id_unique" ON "home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_about_mission_order_idx" ON "_home_v_version_about_mission" USING btree ("_order");
  CREATE INDEX "_home_v_version_about_mission_parent_id_idx" ON "_home_v_version_about_mission" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_about_mission_locales_locale_parent_id_uniqu" ON "_home_v_version_about_mission_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_about_stats_order_idx" ON "_home_v_version_about_stats" USING btree ("_order");
  CREATE INDEX "_home_v_version_about_stats_parent_id_idx" ON "_home_v_version_about_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_about_stats_locales_locale_parent_id_unique" ON "_home_v_version_about_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_why_pillars_order_idx" ON "_home_v_version_why_pillars" USING btree ("_order");
  CREATE INDEX "_home_v_version_why_pillars_parent_id_idx" ON "_home_v_version_why_pillars" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_why_pillars_locales_locale_parent_id_unique" ON "_home_v_version_why_pillars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_services_platform_pillars_order_idx" ON "_home_v_version_services_platform_pillars" USING btree ("_order");
  CREATE INDEX "_home_v_version_services_platform_pillars_parent_id_idx" ON "_home_v_version_services_platform_pillars" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_services_platform_pillars_locales_locale_par" ON "_home_v_version_services_platform_pillars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_services_platform_scope_order_idx" ON "_home_v_version_services_platform_scope" USING btree ("_order");
  CREATE INDEX "_home_v_version_services_platform_scope_parent_id_idx" ON "_home_v_version_services_platform_scope" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_services_platform_scope_locales_locale_paren" ON "_home_v_version_services_platform_scope_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_network_pillars_order_idx" ON "_home_v_version_network_pillars" USING btree ("_order");
  CREATE INDEX "_home_v_version_network_pillars_parent_id_idx" ON "_home_v_version_network_pillars" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_network_pillars_locales_locale_parent_id_uni" ON "_home_v_version_network_pillars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_office_gallery_order_idx" ON "_home_v_version_office_gallery" USING btree ("_order");
  CREATE INDEX "_home_v_version_office_gallery_parent_id_idx" ON "_home_v_version_office_gallery" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_office_gallery_image_idx" ON "_home_v_version_office_gallery" USING btree ("image_id");
  CREATE INDEX "_home_v_version_hero_version_hero_image_idx" ON "_home_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_home_v_version_about_version_about_image_idx" ON "_home_v" USING btree ("version_about_image_id");
  CREATE INDEX "_home_v_version_why_version_why_image_idx" ON "_home_v" USING btree ("version_why_image_id");
  CREATE INDEX "_home_v_version_services_version_services_image_idx" ON "_home_v" USING btree ("version_services_image_id");
  CREATE INDEX "_home_v_version_journey_version_journey_image_idx" ON "_home_v" USING btree ("version_journey_image_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_snapshot_idx" ON "_home_v" USING btree ("snapshot");
  CREATE INDEX "_home_v_published_locale_idx" ON "_home_v" USING btree ("published_locale");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_home_v_locales_locale_parent_id_unique" ON "_home_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "legal__status_idx" ON "legal" USING btree ("_status");
  CREATE UNIQUE INDEX "legal_locales_locale_parent_id_unique" ON "legal_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_legal_v_version_version__status_idx" ON "_legal_v" USING btree ("version__status");
  CREATE INDEX "_legal_v_created_at_idx" ON "_legal_v" USING btree ("created_at");
  CREATE INDEX "_legal_v_updated_at_idx" ON "_legal_v" USING btree ("updated_at");
  CREATE INDEX "_legal_v_snapshot_idx" ON "_legal_v" USING btree ("snapshot");
  CREATE INDEX "_legal_v_published_locale_idx" ON "_legal_v" USING btree ("published_locale");
  CREATE INDEX "_legal_v_latest_idx" ON "_legal_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_legal_v_locales_locale_parent_id_unique" ON "_legal_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ui__status_idx" ON "ui" USING btree ("_status");
  CREATE UNIQUE INDEX "ui_locales_locale_parent_id_unique" ON "ui_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ui_v_version_version__status_idx" ON "_ui_v" USING btree ("version__status");
  CREATE INDEX "_ui_v_created_at_idx" ON "_ui_v" USING btree ("created_at");
  CREATE INDEX "_ui_v_updated_at_idx" ON "_ui_v" USING btree ("updated_at");
  CREATE INDEX "_ui_v_snapshot_idx" ON "_ui_v" USING btree ("snapshot");
  CREATE INDEX "_ui_v_published_locale_idx" ON "_ui_v" USING btree ("published_locale");
  CREATE INDEX "_ui_v_latest_idx" ON "_ui_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_ui_v_locales_locale_parent_id_unique" ON "_ui_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_items" CASCADE;
  DROP TABLE "services_items_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "_services_v_version_items" CASCADE;
  DROP TABLE "_services_v_version_items_locales" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_locales" CASCADE;
  DROP TABLE "group_entities_bullets" CASCADE;
  DROP TABLE "group_entities_bullets_locales" CASCADE;
  DROP TABLE "group_entities" CASCADE;
  DROP TABLE "group_entities_locales" CASCADE;
  DROP TABLE "_group_entities_v_version_bullets" CASCADE;
  DROP TABLE "_group_entities_v_version_bullets_locales" CASCADE;
  DROP TABLE "_group_entities_v" CASCADE;
  DROP TABLE "_group_entities_v_locales" CASCADE;
  DROP TABLE "milestones" CASCADE;
  DROP TABLE "milestones_locales" CASCADE;
  DROP TABLE "_milestones_v" CASCADE;
  DROP TABLE "_milestones_v_locales" CASCADE;
  DROP TABLE "clients" CASCADE;
  DROP TABLE "_clients_v" CASCADE;
  DROP TABLE "cities" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "_media_v" CASCADE;
  DROP TABLE "_media_v_locales" CASCADE;
  DROP TABLE "inquiries" CASCADE;
  DROP TABLE "inquiries_rels" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_social" CASCADE;
  DROP TABLE "site_inquiry_recipients" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "site_locales" CASCADE;
  DROP TABLE "_site_v_version_social" CASCADE;
  DROP TABLE "_site_v_version_inquiry_recipients" CASCADE;
  DROP TABLE "_site_v" CASCADE;
  DROP TABLE "_site_v_locales" CASCADE;
  DROP TABLE "home_about_mission" CASCADE;
  DROP TABLE "home_about_mission_locales" CASCADE;
  DROP TABLE "home_about_stats" CASCADE;
  DROP TABLE "home_about_stats_locales" CASCADE;
  DROP TABLE "home_why_pillars" CASCADE;
  DROP TABLE "home_why_pillars_locales" CASCADE;
  DROP TABLE "home_services_platform_pillars" CASCADE;
  DROP TABLE "home_services_platform_pillars_locales" CASCADE;
  DROP TABLE "home_services_platform_scope" CASCADE;
  DROP TABLE "home_services_platform_scope_locales" CASCADE;
  DROP TABLE "home_network_pillars" CASCADE;
  DROP TABLE "home_network_pillars_locales" CASCADE;
  DROP TABLE "home_office_gallery" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_locales" CASCADE;
  DROP TABLE "_home_v_version_about_mission" CASCADE;
  DROP TABLE "_home_v_version_about_mission_locales" CASCADE;
  DROP TABLE "_home_v_version_about_stats" CASCADE;
  DROP TABLE "_home_v_version_about_stats_locales" CASCADE;
  DROP TABLE "_home_v_version_why_pillars" CASCADE;
  DROP TABLE "_home_v_version_why_pillars_locales" CASCADE;
  DROP TABLE "_home_v_version_services_platform_pillars" CASCADE;
  DROP TABLE "_home_v_version_services_platform_pillars_locales" CASCADE;
  DROP TABLE "_home_v_version_services_platform_scope" CASCADE;
  DROP TABLE "_home_v_version_services_platform_scope_locales" CASCADE;
  DROP TABLE "_home_v_version_network_pillars" CASCADE;
  DROP TABLE "_home_v_version_network_pillars_locales" CASCADE;
  DROP TABLE "_home_v_version_office_gallery" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "_home_v_locales" CASCADE;
  DROP TABLE "legal" CASCADE;
  DROP TABLE "legal_locales" CASCADE;
  DROP TABLE "_legal_v" CASCADE;
  DROP TABLE "_legal_v_locales" CASCADE;
  DROP TABLE "ui" CASCADE;
  DROP TABLE "ui_locales" CASCADE;
  DROP TABLE "_ui_v" CASCADE;
  DROP TABLE "_ui_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_icon";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum__services_v_published_locale";
  DROP TYPE "public"."enum_group_entities_status";
  DROP TYPE "public"."enum__group_entities_v_version_status";
  DROP TYPE "public"."enum__group_entities_v_published_locale";
  DROP TYPE "public"."enum_milestones_status";
  DROP TYPE "public"."enum__milestones_v_version_status";
  DROP TYPE "public"."enum__milestones_v_published_locale";
  DROP TYPE "public"."enum_clients_status";
  DROP TYPE "public"."enum__clients_v_version_status";
  DROP TYPE "public"."enum__clients_v_published_locale";
  DROP TYPE "public"."enum_posts_category";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_category";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_media_status";
  DROP TYPE "public"."enum__media_v_version_status";
  DROP TYPE "public"."enum__media_v_published_locale";
  DROP TYPE "public"."enum_inquiries_locale";
  DROP TYPE "public"."enum_inquiries_status";
  DROP TYPE "public"."enum_inquiries_email_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_site_social_platform";
  DROP TYPE "public"."enum_site_status";
  DROP TYPE "public"."enum__site_v_version_social_platform";
  DROP TYPE "public"."enum__site_v_version_status";
  DROP TYPE "public"."enum__site_v_published_locale";
  DROP TYPE "public"."enum_home_about_stats_icon";
  DROP TYPE "public"."enum_home_why_pillars_icon";
  DROP TYPE "public"."enum_home_network_pillars_icon";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_about_stats_icon";
  DROP TYPE "public"."enum__home_v_version_why_pillars_icon";
  DROP TYPE "public"."enum__home_v_version_network_pillars_icon";
  DROP TYPE "public"."enum__home_v_version_status";
  DROP TYPE "public"."enum__home_v_published_locale";
  DROP TYPE "public"."enum_legal_status";
  DROP TYPE "public"."enum__legal_v_version_status";
  DROP TYPE "public"."enum__legal_v_published_locale";
  DROP TYPE "public"."enum_ui_status";
  DROP TYPE "public"."enum__ui_v_version_status";
  DROP TYPE "public"."enum__ui_v_published_locale";`)
}
