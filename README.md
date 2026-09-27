# 🌌 Aurora Studio — Premium Single Page Website

> A modern, beautifully-crafted single-page website built with **pure HTML, CSS, and JavaScript** (no frameworks). Designed to be fast, accessible, and delightful.

---

## ✨ Fitur

- 🎨 **Custom Cursor** — Kursor interaktif yang mengikuti mouse dengan smooth lerp
- 🌊 **Scroll Animations** — Reveal animation menggunakan `IntersectionObserver`
- 🧲 **Magnetic Buttons** — Tombol CTA yang "menarik" kursor
- 📊 **Counter Animation** — Animasi angka saat stats section terlihat
- 💬 **Testimonial Slider** — Auto-play dengan pause on hover, touch swipe, keyboard support
- 🎯 **Marquee Infinite Loop** — Brand showcase berjalan
- 🪗 **FAQ Accordion** — Expandable dengan smooth height transition
- 📱 **Fully Responsive** — Mobile-first, dari 320px sampai 4K
- ⚡ **Preloader** — Animasi loading yang elegan
- 🎭 **Progress Bar** — Indikator scroll posisi halaman
- 🌑 **Dark Theme** — Palet warna aurora (ungu, cyan, pink)
- 🔘 **Smooth Scroll** — Navigasi antar section yang halus
- 📧 **Form Validation** — Validasi form kontak real-time
- 🪄 **Tilt Cards** — Efek 3D pada service cards saat hover
- 💫 **Mouse Glow** — Radial glow mengikuti kursor di service cards

---

## 🏗️ Struktur File

```
aurora-studio-website/
├── index.html         # Struktur HTML semantik + SEO meta
├── css/
│   └── style.css      # Semua styling (variabel, grid, animasi, responsive)
└── js/
    └── main.js        # Semua interaktivitas (modular IIFE)
```

---

## 🚀 Cara Menjalankan

Cukup buka `index.html` di browser — tidak perlu build tool atau server.

```bash
# Atau pakai live server lokal:
npx serve .
# Atau
python -m http.server 8000
```

---

## 🎨 Palet Warna (CSS Variables)

```css
--bg:        #0a0a0f
--bg-elev:   #13131c
--fg:        #f5f5f7
--muted:     #8b8b9a
--primary:   #7c3aed  (ungu)
--accent:    #22d3ee  (cyan)
--pink:      #ec4899
```

---

## 📚 Teknologi

- HTML5 (semantik + ARIA)
- CSS3 (Grid, Flexbox, Variables, `@keyframes`)
- Vanilla JavaScript ES2020+ (zero dependencies)
- Google Fonts (Space Grotesk + Inter)

---

## 🌐 Sections

1. **Hero** — Judul besar, orbs gradient animasi, badge, CTAs
2. **Marquee** — Brand partners infinite scroll
3. **Stats** — Counter animasi untuk 4 metrik
4. **Services** — 4 service cards dengan tilt + glow
5. **Works** — 4 project showcase grid
6. **Testimonials** — Slider dengan dots, nav, autoplay
7. **FAQ** — 5 pertanyaan accordion
8. **Contact CTA** — Form dengan floating labels + validasi
9. **Footer** — Multi-kolom + newsletter + social

---

## 📄 Lisensi

MIT — Bebas digunakan untuk project pribadi maupun komersial.

---

Dibuat dengan ❤️ oleh [Ari](https://github.com/SemaraStory)
