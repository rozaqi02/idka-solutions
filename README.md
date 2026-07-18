# IDKA Solutions — Company Website

Website company profile **IDKA Solutions**: jasa pembuatan website profesional untuk UMKM, freelancer, kreator, dan startup di Indonesia.

**Live:** https://idkasolutions.netlify.app

## Stack

- React 19 + TypeScript
- Vite 8
- React Router 6
- Oxlint
- Deploy: Netlify (SPA)

## Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Dev server lokal |
| `npm run build` | Typecheck + production build ke `dist/` |
| `npm run preview` | Preview build production |
| `npm run lint` | Jalankan Oxlint |
| `npm run typecheck` | TypeScript project references check |
| `npm run images:screenshot` | Screenshot portofolio (butuh Puppeteer) |
| `npm run images:compress` | Konversi PNG → WebP (`--delete-png` opsional) |

## Struktur

```
src/
  components/   # Navbar, Footer, WA button, form helpers
  data/         # content.ts — copy, paket, portofolio, FAQ
  hooks/        # usePageTitle, useScrollReveal, useToast
  pages/        # Home, Layanan, Portofolio, Tentang, Kontak, 404
  styles/       # variables + global CSS
public/         # logo, robots.txt, sitemap, portfolio images
scripts/        # screenshot & image compress utilities
```

## Edit konten

Semua copywriting, paket harga, portofolio, dan kontak ada di:

```
src/data/content.ts
```

Update nomor WhatsApp, email, Instagram di objek `company`.

## SEO & domain

Canonical, Open Graph, Twitter, `robots.txt`, dan `sitemap.xml` saat ini mengarah ke:

`https://idkasolutions.netlify.app`

Saat pindah ke domain custom, update:

1. `index.html` (canonical, og:url, og:image, JSON-LD)
2. `src/hooks/usePageTitle.ts` → konstanta `SITE_URL`
3. `public/robots.txt`
4. `public/sitemap.xml`
5. Redirect 301 netlify.app → domain custom di Netlify

## Netlify Forms

Form brief klien (`name="brief-klien"`) terdaftar lewat form tersembunyi di `index.html` (agar terdeteksi di SPA). Submit utama tetap via WhatsApp; Netlify Forms sebagai backup.

## Deploy

Build command: `npm run build`  
Publish directory: `dist`  

Dikonfigurasi di `netlify.toml` (headers keamanan, cache assets, SPA fallback).
