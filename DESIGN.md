---
name: Cyber-Minimalist Portfolio
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#95d3ba'
  on-secondary: '#003829'
  secondary-container: '#0b513d'
  on-secondary-container: '#83c2a9'
  tertiary: '#45dfa4'
  on-tertiary: '#003825'
  tertiary-container: '#00b982'
  on-tertiary-container: '#00422c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#b0f0d6'
  secondary-fixed-dim: '#95d3ba'
  on-secondary-fixed: '#002117'
  on-secondary-fixed-variant: '#0b513d'
  tertiary-fixed: '#68fcbf'
  tertiary-fixed-dim: '#45dfa4'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  body-base:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.15em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  grid-unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  sidebar-width: 280px
---

## Brand & Style

This design system embodies a "Cyber-minimalist" aesthetic, blending the high-tech precision of a futuristic command center with the restrained elegance of modern minimalism. It is designed for high-fidelity personal portfolios that need to communicate technical mastery and forward-thinking vision.

The visual language is characterized by:
- **Futuristic Utility:** Every element feels like a functional part of a sophisticated machine.
- **Atmospheric Depth:** Deep obsidian backgrounds provide a "void-like" canvas, allowing neon highlights to pop with maximum impact.
- **Glassmorphism:** Layered, translucent surfaces with backdrop blurs create a sense of advanced hardware/software integration.
- **Technical Detail:** Subtle grid textures and monospaced typography evoke data-heavy environments while maintaining readability.
- **Interactive Depth:** Multi-layer interactivity with smooth transitions between dashboard, orbital view, and detailed modals.

## Colors

The palette is strictly dark and functional, utilizing high-contrast accents to guide the eye through complex data.

- **Primary (Neon Emerald #4edea3):** Used for active states, "pings," critical data points, and interactive pips. It should feel like it is emitting light.
- **Surface (Deep Obsidian #050505):** The base background. Pure black is avoided in favor of a very deep grey to maintain subtle texture visibility.
- **Secondary/Tertiary:** Variations of emerald used for low-priority highlights, borders, and glass effects.
- **Data Grids:** A semi-transparent white (5-8% opacity) is used for technical grid overlays and structural lines.

## Typography

The typography strategy relies on the contrast between a sharp, contemporary sans-serif and a high-precision monospace font.

- **Hanken Grotesk:** Used for UI headings and general body text. It provides a clean, professional "SaaS" feel that balances the sci-fi elements.
- **JetBrains Mono:** Used for all "technical" data, labels, timestamps, and secondary navigation. It reinforces the dashboard/coding aesthetic.
- **Stylistic Note:** Headings should frequently use uppercase with increased letter spacing to mimic digital readouts.

## Layout & Spacing

The system uses a **fixed-fluid hybrid grid** inspired by tactical displays.

- **Grid System:** A 12-column layout for the main content area. A subtle 32px background dot or line grid is visible behind the UI.
- **Sidebars:** Fixed-width (280px) multi-layered sidebars with backdrop blurs.
- **Safe Zones:** Generous internal padding (24px - 32px) within cards to prevent technical data from feeling cluttered.
- **Breakpoints:**
  - **Mobile (<768px):** Sidebars collapse into a bottom bar or hamburger menu. Grid shifts to 4 columns.
  - **Tablet (768px - 1280px):** 8-column grid, compact sidebars.
  - **Desktop (>1280px):** Full 12-column spread with persistent glassmorphic sidebars.

## Elevation & Depth

Hierarchy is achieved through **luminance and transparency** rather than traditional shadows.

- **Layer 0 (Background):** Solid Obsidian (#050505) with a subtle grid texture.
- **Layer 1 (Containers):** Semi-transparent obsidian (#0A0A0A at 60% opacity) with a `blur(12px)` effect.
- **Layer 2 (Interactive):** Elements that sit above the containers. These use "Outer Glow" (soft primary color shadows) to indicate state.
- **Borders:** Instead of heavy shadows, use 1px solid borders with 10-15% opacity of the primary emerald color to define edges.
- **Neon Pings:** Small circular elements (status indicators) utilize a multi-layered drop shadow (e.g., `0 0 10px #10B981, 0 0 20px #10B981`) to simulate a light-emitting diode.

## Shapes

The shape language is "Soft-Technical." Elements use small, precise radii to maintain a crisp, engineered look while avoiding the harshness of 0px corners.

- **Standard Elements:** 0.25rem (4px) corner radius.
- **Large Cards/Sidebars:** 0.75rem (12px) corner radius.
- **Specialty Shapes:** Occasional use of "chamfered" (clipped) corners for decorative display elements to reinforce the futuristic theme.

## Interactive Layers

### Dashboard View
Primary interface showing portfolio projects in a bento-grid layout. Displays key metrics and project highlights with hover effects.

### Orbital View
Interactive 3D globe built with Three.js. Users can:
- Drag to rotate the globe and explore global project distribution
- Scroll to zoom in and out
- Click POIs to reveal project summaries
- Select projects from info panels to view full details

### Project Detail Modal
Expanded view showing:
- Technical specifications and architecture
- Feature lists
- Technology stack breakdown
- Project status and metrics
- Repository links
