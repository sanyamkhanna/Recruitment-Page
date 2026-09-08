# Premium UI Upgrade — Departments, Authentication & Theme

## What was redesigned

### Departments
- Replaced the unstyled checkbox list with an animated responsive card grid.
- Added icon treatment, hover elevation, glow layers, selected/submitted states and staggered entrance animation.
- Added a live application-selection panel with animated progress and a clear primary action.
- Added a mobile sticky continue bar.
- Removed previous unnecessary state/effect chains, deep cloning, random React keys and the expensive 100,000-iteration computation executed during render.

### Authentication
- Sign-in now opens as a modal from the navigation instead of navigating users away from their current context.
- The background is blurred while the modal is open.
- The modal provides Sign in / Create account tabs, email authentication, password visibility toggle and a Google sign-in option.
- Added keyboard Escape handling and click-outside dismissal.
- The direct `/auth/signin` route also renders the same premium modal for compatibility with existing links.

### Theme
- Activated the existing `next-themes` provider (it was previously imported but not actually mounted).
- Added a persistent light/dark mode toggle in the navigation.
- Added theme-aware CSS variables and light-mode treatments for navigation, cards and page surfaces.

### Animation & performance
- Used Framer Motion only for meaningful UI transitions: modal entry/exit, department reveal, hover and selection feedback.
- Avoided adding a heavy WebGL scene; the portal keeps the existing CSS 3D aesthetic while reducing CPU/GPU overhead.
- Added reduced-motion support inherited from the global stylesheet.
