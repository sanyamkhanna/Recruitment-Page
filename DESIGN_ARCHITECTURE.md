# Modern 3D UI Redesign

## Design direction
The landing experience was rebuilt around a premium dark interface, layered aurora lighting, glass surfaces and a CSS-rendered 3D hero object. The visual goal is depth without requiring a heavy WebGL dependency.

## Why CSS 3D instead of Three.js?
For this page, the hero is decorative rather than data-driven. CSS gradients, perspective, transforms and Framer Motion provide the 3D impression with a smaller runtime footprint and fewer GPU/WebGL compatibility concerns.

## Performance decisions
- Removed the previous 50,000-iteration calculation from every render.
- Removed unnecessary text-statistics state and timer-driven navbar updates.
- Uses transform/opacity animation paths for smoother rendering.
- Respects `prefers-reduced-motion`.
- No new 3D rendering dependency was added.

## UX improvements
- Clear visual hierarchy and single primary CTA.
- Better responsive layout.
- Strong focus and hover affordances.
- Glass navigation remains readable while preserving context.
- Decorative animation is non-essential and reduced-motion friendly.
