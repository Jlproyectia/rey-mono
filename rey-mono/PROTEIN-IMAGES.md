# Protein photography

Generated with the built-in image generation tool. Final assets: `dist/assets/wok/black-{verduras,pollo,panko,ternera,langostino,pato,reymono,tofu,seitan}.webp`.

Native generation: 1536 × 1024 pixels with alpha. The `-3840.webp` exports are resized to 3840 × 2560; they are not native 4K generations. `prepare-protein-images.mjs` creates these responsive exports. Mobile hero generation is 1024 × 1536; its larger exports are also resized.

Master prompt: professional premium restaurant catalog photography; a complete matte black shallow ceramic plate centered in a landscape 3:2 composition, with wheat noodles, carrot julienne, zucchini, cabbage and a little scrambled egg. Restrained natural portions, lightly glazed food, subtle wok char, realistic warm colors. Elevated 45-degree camera and soft light from upper left. Whole plate visible, generous clear margins, transparent background, no props, no text.

Variant prompt: preserve the same plate, camera, lighting, base and framing. Add the indicated protein prominently: sliced grilled chicken; sliced crispy panko chicken cutlet; seared beef strips; peeled cooked prawns; roasted duck breast; chicken plus beef plus prawns; seared tofu cubes; or seitan strips. Vegetable variant has no added protein. Maintain natural textures and clean transparent edges.

The configurator changes photography by protein only. Base and sauce selections still update the summary and price. The photographs illustrate protein choices on noodles; they do not depict every base/sauce combination.
