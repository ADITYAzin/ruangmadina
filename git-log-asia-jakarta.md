# Git Commit Log — Timezone Asia/Jakarta (WIB / UTC+7)

Daftar riwayat commit repository **ruang-madina** yang telah dikonversi dari timezone awal (`-0500`) ke **Asia/Jakarta (`+0700` / WIB)**.

## Tabel Riwayat Commit

| Commit | Waktu Awal | Waktu Asia/Jakarta (`+0700`) | Pesan Commit |
| :--- | :--- | :--- | :--- |
| `312bafc` | `2026-11-19 14:29:48 +0700` | `2026-11-19 14:29:48 +0700` | `feat: price estimation calculator` |
| `f0316c1` | `2026-11-18 23:16:54 -0500` | `2026-11-19 11:16:54 +0700` | `feat: quick-consultation` |
| `acce1c2` | `2026-11-18 03:12:44 -0500` | `2026-11-18 15:12:44 +0700` | `feat: 3 space category` |
| `4f10abf` | `2026-11-16 21:12:02 -0500` | `2026-11-17 09:12:02 +0700` | `add: site-icon` |
| `d531049` | `2026-11-16 03:50:05 -0500` | `2026-11-16 15:50:05 +0700` | `fix: logo` |
| `b871c57` | `2026-11-16 02:38:49 -0500` | `2026-11-16 14:38:49 +0700` | `fix: name-brand-style` |
| `055ab08` | `2026-11-15 23:29:00 -0500` | `2026-11-16 11:29:00 +0700` | `fix: img` |
| `9d55d0a` | `2026-11-15 21:53:56 -0500` | `2026-11-16 09:53:56 +0700` | `fix: text` |
| `e50a5b8` | `2026-11-15 01:36:26 -0500` | `2026-11-15 13:36:26 +0700` | `fix: update pnpm-lock.yaml with i18next dependencies` |
| `c7108bf` | `2026-11-13 22:48:42 -0500` | `2026-11-14 10:48:42 +0700` | `feat: bilingual` |
| `b7e4ea6` | `2026-11-13 04:07:18 -0500` | `2026-11-13 16:07:18 +0700` | `feat: implement service and estimation cards based on price structure` |

---

## Cara Mengubah Langsung di Riwayat Git Lokal (Opsional)

Jika Anda ingin menulis ulang timestamp pada riwayat `.git` lokal secara permanen menjadi `+0700`, jalankan perintah berikut di terminal Anda:

```bash
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f --env-filter '
  author_ts=$(echo "$GIT_AUTHOR_DATE" | sed -E "s/^@([0-9]+).*/\1/")
  committer_ts=$(echo "$GIT_COMMITTER_DATE" | sed -E "s/^@([0-9]+).*/\1/")
  export GIT_AUTHOR_DATE=$(TZ=Asia/Jakarta date -d "@$author_ts" "+%Y-%m-%d %H:%M:%S %z")
  export GIT_COMMITTER_DATE=$(TZ=Asia/Jakarta date -d "@$committer_ts" "+%Y-%m-%d %H:%M:%S %z")
' -- --all
```

> **Catatan:** Jika branch `main` sudah di-push ke remote (`origin/main`), mengubah history commit akan membuat hash commit berubah, sehingga perlu `git push --force-with-lease origin main` bila ingin menyinkronkan ke remote.

