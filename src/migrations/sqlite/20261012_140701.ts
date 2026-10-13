import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`ui_locales\` ADD \`form_invalid\` text;`)
  await db.run(sql`ALTER TABLE \`_ui_v_locales\` ADD \`version_form_invalid\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`ui_locales\` DROP COLUMN \`form_invalid\`;`)
  await db.run(sql`ALTER TABLE \`_ui_v_locales\` DROP COLUMN \`version_form_invalid\`;`)
}
