# Brand fonts — Arabic

Fonts used by `brand/company-profile-ar.html`.

## Files

**IBM Plex Sans Arabic** — open source (SIL Open Font License 1.1). Seven weights, ttf + woff2:

| Weight | File | Role in the Arabic profile |
| ------ | ---- | -------------------------- |
| 100 Thin       | `IBMPlexSansArabic-Thin.*`       | reserved (not currently used) |
| 200 ExtraLight | `IBMPlexSansArabic-ExtraLight.*` | display headlines, large stat numerals |
| 300 Light      | `IBMPlexSansArabic-Light.*`      | **body text** (default) |
| 400 Regular    | `IBMPlexSansArabic-Regular.*`    | eyebrows, captions, page-head labels |
| 500 Medium     | `IBMPlexSansArabic-Medium.*`     | sub-titles, list labels |
| 600 SemiBold   | `IBMPlexSansArabic-SemiBold.*`   | strong sub-titles / key callouts |
| 700 Bold       | `IBMPlexSansArabic-Bold.*`       | **section titles**, emphasised words |

The HTML also references weights 800/900 in a few display-only spots — those render at 700 against this family.

## Usage

For web (small files, modern browsers):

```html
<link rel="stylesheet" href="./fonts/fonts.css">
```

```css
font-family: 'IBM Plex Sans Arabic', 'Noto Sans Arabic', 'Cairo', system-ui, sans-serif;
```

For desktop install: double-click any `.ttf`.

## Note on Ping AR (29LT Ping)

The Arabic profile lists `Ping AR` first in its font stack. That is **29LT Ping**, a paid commercial font. Its woff2 files are not stored in this repo. To self-host it, purchase a webfont licence from 29lt.com and drop `PingARLT-Regular.woff2`, `PingARLT-Light.woff2`, `PingARLT-Bold.woff2`, `PingARLT-ExtraLight.woff2` next to this file, then add the matching `@font-face` rules to `fonts.css`.

Without those files the browser falls back to IBM Plex Sans Arabic (which is what this folder ships).
