# Migrasi database

Dua folder, satu per adapter: `sqlite/` (dev lokal) dan `postgres/` (produksi). Payload membaca folder sesuai `DATABASE_ADAPTER` (lihat `src/lib/database.ts`). Schema push dimatikan, jadi setiap perubahan koleksi/global wajib dibuatkan migrasi:

```bash
# dev (sqlite)
npm run migrate:create -- --name <deskripsi>
npm run migrate
# produksi (postgres): jalankan migrate:create dengan DATABASE_ADAPTER=postgres dan DATABASE_URI Postgres, commit hasilnya
```

Jangan edit file migrasi yang sudah dijalankan di server.
