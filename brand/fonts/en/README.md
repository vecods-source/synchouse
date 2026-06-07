# Brand fonts — English

Fonts used by `brand/company-profile-en.html`.

## Files

**Poppins** — open source (SIL Open Font License 1.1). Eight weights, ttf + woff2 (Latin subset):

| Weight | File | Role in the English profile |
| ------ | ---- | --------------------------- |
| 200 ExtraLight | `Poppins-ExtraLight.*` | display headlines, large stat numerals |
| 300 Light      | `Poppins-Light.*`      | **body text** (default) |
| 400 Regular    | `Poppins-Regular.*`    | eyebrows, captions, page-head labels |
| 500 Medium     | `Poppins-Medium.*`     | sub-titles, list labels |
| 600 SemiBold   | `Poppins-SemiBold.*`   | strong sub-titles / key callouts |
| 700 Bold       | `Poppins-Bold.*`       | **section titles**, emphasised words |
| 800 ExtraBold  | `Poppins-ExtraBold.*`  | stat numerals (`<strong>` inside `.num-big`) |
| 900 Black      | `Poppins-Black.*`      | display heavy (cover hero, `.heavy`) |

The `.ttf` files contain the full glyph set (~150 KB each, good for desktop install). The `.woff2` files are the Latin subset (~8 KB each, ideal for web).

## Usage

For web:

```html
<link rel="stylesheet" href="./fonts/en/fonts.css">
```

```css
font-family: 'Poppins', -apple-system, system-ui, sans-serif;
```

For desktop install: double-click any `.ttf`.

## Note on `brand-guidelines.html`

The brand guidelines document uses a different stack — **Inter** (300–900), **Instrument Serif** (regular + italic) for display, and **JetBrains Mono** (400, 500, 700) for code/labels. Those are not in this folder; if you need them self-hosted, ask and they can be added.
