# Mayes Core

Shared frontend systems and reusable Webflow code for Mayes Digital projects.

## Purpose

Mayes Core contains project-independent functionality that can be reused across Mayes Digital websites.

Project-specific behavior, styling, ecommerce logic, and client implementations should remain in their individual project repositories.

## Architecture

Mayes Core
├── javascript/
│   ├── motion/
│   ├── components/
│   ├── privacy/
│   └── utilities/
├── css/
├── dist/
└── build.sh

## Core Motion

Core Motion is the reusable motion and interaction layer for Mayes Digital projects.

Webflow
→ HTML data attributes
→ Core Motion
→ GSAP / ScrollTrigger

Core Motion owns reusable behavior such as:

- reveal animations
- scroll states
- parallax
- stagger
- text animation
- reduced-motion handling

Core Motion does not contain project-specific selectors or visual styling.

Example:

data-scroll-state
→ Core Motion toggles `is-scrolled`
→ project CSS determines what `is-scrolled` looks like

## Development

Edit source files inside `javascript/` or `css/`.

Run:

    ./build.sh

Generated files are written to `dist/`.

Files in `dist/` are the production assets intended for CDN delivery.

## Versioning

Development may reference the `main` branch.

Production projects should use tagged releases so updates to Mayes Core do not unexpectedly change existing client websites.
