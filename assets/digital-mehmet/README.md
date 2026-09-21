# Digital Mehmet 3D asset contract

Digital Mehmet V2 works today with a procedural Three.js fallback.

To switch to a custom rigged avatar later, add a GLB file to this folder and set
`data-model-url="assets/digital-mehmet/avatar.glb"` on the root Digital Mehmet element.

Recommended animation clip names (case-insensitive matching is supported):

- `Idle` or `Breathing`
- `Thinking`
- `Talking`, `Speaking` or `Gesture`

Recommended facial morph target names:

- `mouthOpen`, `jawOpen`, `AA` or `viseme_aa`
- `blinkLeft` / `eyeBlinkLeft`
- `blinkRight` / `eyeBlinkRight`

If the GLB cannot be loaded, the site automatically falls back to the procedural
3D avatar and the existing static profile fallback remains available if WebGL is
not supported.

Performance target:

- Prefer one compressed GLB.
- Keep textures modest for mobile.
- Avoid autoplay audio.
- Preserve `prefers-reduced-motion`.
