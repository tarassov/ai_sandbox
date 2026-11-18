---
name: Warm Recognition & Rewards
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#5a4139'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#8e7167'
  outline-variant: '#e2bfb4'
  surface-tint: '#a93700'
  primary: '#a53600'
  on-primary: '#ffffff'
  primary-container: '#ce4603'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59b'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#a33900'
  on-tertiary: '#ffffff'
  tertiary-container: '#cc4900'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59b'
  on-primary-fixed: '#380d00'
  on-primary-fixed-variant: '#812800'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb599'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#7f2b00'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The platform fosters a celebratory, authentic, and high-trust peer appreciation culture within modern workplaces. The emotional target is a blend of everyday delight and professional prestige—transforming routine acknowledgments into shared company-wide celebrations.

The visual direction merges **Minimalist Precision** with **Warm Tactile Vibrancy**. Clean, airy white-collar software structure is balanced with approachable organic warmth, radiant celebratory accents, and playful currency motifs (donuts and virtual coins). Micro-interactions should feel rewarding, springy, and tactile without drifting into childish novelty.

## Colors

The palette balances clean workplace utility with warm, appetizing energy:
- **Canvas & Backgrounds:** The base canvas uses `#FDFBF7` (warm ivory parchment) layered with `#FFFFFF` for primary cards and `#F8F9FA` for secondary nested surfaces. This avoids sterile monitor glare and evokes warm print collateral.
- **Primary Energy (`#F25F22` / `#EA580C`):** High-energy celebratory orange serves as the core action color, highlight mechanism, and primary appreciation button tone.
- **Secondary Prosperity (`#F59E0B`):** Warm golden amber is reserved for token counts, coin balances, reward badges, and achievement milestones.
- **Slate Neutrals (`#1E293B` to `#64748B`):** High-legibility deep slate anchors all body copy and metrics, avoiding harsh pure black to maintain cohesion with warm backgrounds.
- **Subtle Surface Lineage:** Borders and dividers leverage `#E2E8F0` at 60%–80% opacity, maintaining crisp structural containment without visual clutter.

## Typography

The type hierarchy relies entirely on **Plus Jakarta Sans**, utilizing its geometric yet friendly curves, wide counters, and open letterforms. It communicates technical competence while remaining personable and optimistic.

- **Headlines & Celebrations:** Set tight with subtle negative tracking (`-0.01em` to `-0.03em`) and heavy weights (`700` to `800`) to provide punchy emphasis for peer praise and leaderboard positions.
- **Editorial Recognition Feed:** Set at `body-lg` (16px) with an open `1.625` line height to ensure social praise notes read effortlessly.
- **Metric Badges & Denominations:** Set in `label-sm` and `label-md` with `600` or `700` weight to ensure numbers for bonuts, coins, and peer tags remain legible at small scale.

## Layout & Spacing

The layout operates on a standard 8pt spatial grid with an adaptable column structure:
- **Desktop (1024px+):** 12-column fluid grid inside a 1280px maximum content container. Standard layout splits into an asymmetric 8:4 proportion (main social celebration stream on the left, wallet/leaderboards/recognition widgets on the right). Gutters sit at `1.5rem` (24px) with `2rem` (32px) screen margins.
- **Tablet (768px – 1023px):** 8-column layout. Secondary widgets collapse into horizontal overflow carousels or stack below the primary feed. Gutters sit at `1rem` (16px).
- **Mobile (<768px):** 4-column layout with `1rem` (16px) margins. Sticky bottom utility bar anchors recognition quick-actions and the personal donut wallet balance.
- **Padding Principles:** Recognition post cards use generous internal padding (`space-lg` / 24px) to preserve breathing room between user avatars, praise messages, and attached coin/donut gifts.

## Elevation & Depth

Visual hierarchy uses **tonal layering with ambient amber-tinted drop shadows** rather than hard structural lines:
- **Base Level (Canvas):** Soft parchment tone (`#FDFBF7`).
- **Surface Level 1 (Cards & Feeds):** Pure `#FFFFFF` surfaces bounded by a hairline border (`rgba(226, 232, 240, 0.8)`). Casts an ambient, extra-diffused shadow: `0 4px 20px -2px rgba(242, 95, 34, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)`.
- **Surface Level 2 (Floating Popovers, Recognition Modals):** Crisp `#FFFFFF` elevated with `0 20px 35px -5px rgba(30, 41, 59, 0.08), 0 10px 15px -3px rgba(242, 95, 34, 0.04)`.
- **Coin & Donut Pill Elevation:** Badges and tokens utilize a subtle interior highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.6)`) to produce a light embossed, tangible feel.

## Shapes

The design uses a friendly, modern geometry. 

- **Primary Cards & Containers:** Styled with modern 1rem to 1.5rem radii (`rounded-2xl` / 16px–24px) to present soft, non-intimidating surfaces.
- **Interactive Buttons & Form Fields:** Default to `0.5rem` to `0.75rem` (8px–12px) for structured usability.
- **Pills, Currency Badges, and Tags:** Styled as full capsules (`9999px`) to emphasize their collectible, coin-like nature.

## Components

### 1. Buttons
- **Primary Action (Send Recognition / Give Bonuts):** Vibrant orange fill (`#F25F22`), active hover transition to `#EA580C`, white text (`label-lg`), pill or 10px rounded corners. Subdued warm glow on hover (`box-shadow: 0 4px 14px rgba(242, 95, 34, 0.35)`).
- **Secondary Action:** Pale warm peach tint (`#FFF7ED`), text `#EA580C`, zero border, subtle hover lightening.
- **Ghost Action:** Transparent background, slate text (`#475569`), hover background `rgba(242, 95, 34, 0.06)`.

### 2. Recognition Cards (Feed Item)
- **Container:** Pure `#FFFFFF` fill, 16px corner radius (`rounded-2xl`), subtle border `rgba(226, 232, 240, 0.7)`.
- **Header:** Sender and receiver avatar pair linked with a small arrow or celebratory icon, timestamps in `body-sm` (`#94A3B8`).
- **Content:** Large readable praise statement (`body-lg`) highlighted with company core-value tags.
- **Footer Interaction Bar:** Includes an emoji reaction tray, comment counter, and an attached gift badge displaying the transferred currency amount.

### 3. Currency & Reward Pills (Donuts & Coins)
- **Donut Pill:** Warm amber/peach surface (`#FEF3C7`), border `rgba(245, 158, 11, 0.3)`, text `#B45309`, rounded-full. Prefixed with a custom illustrated donut icon.
- **Coin Pill:** Subtle metallic warm gradient, bold value counter in `Plus Jakarta Sans` 700 weight, paired with an embossed coin graphic.

### 4. Input Fields & Recognition Composer
- **Input Surfaces:** Crisp white interior, border `#E2E8F0`, 12px corner radius.
- **Focus State:** Rings in primary orange (`outline: 2px solid #F25F22`, `outline-offset: 2px`), border color changes to `#F25F22`.
- **Textarea:** Deep minimum height for substantive recognition messages, built-in footer toolbar for quickly toggling company value tags, gif attachments, and coin increments (+5, +10, +50).

### 5. Checkboxes & Radio Buttons
- **Checkbox:** 6px radius, neutral border `#CBD5E1`. On check, fills with `#F25F22` showing a white checkmark.
- **Radio:** Pure circular with an inner animated dot in `#F25F22` surrounded by a soft amber ring on selection.

### 6. Value Chips & Tags
- Compact capsule containers with soft brand tints (e.g., Teamwork, Innovation, Customer Hero). Uses 11px uppercase bold labels with low-saturation backgrounds to keep the focus on the card's main narrative.