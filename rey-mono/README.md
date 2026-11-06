# Rey Mono Café

Sitio estático en `dist`. Ejecutar `npm install`, `npm run assets`, `npm start` para vista local en el puerto 4187. `npm run check` verifica la sintaxis.

## Diseño

Landing gastronómica editorial para clientes de Fuengirola, negro, blanco y rojo de la identidad original. Referencia: Takumi (fotografía dominante, fondo negro, navegación sobria); se añaden el cristal y las animaciones 3D solicitadas. DESIGN_VARIANCE 7 / MOTION_INTENSITY 8 / VISUAL_DENSITY 3. HTML/CSS nativo, GSAP y ScrollTrigger, fuentes locales Manrope y Bebas Neue. Botones 6px, paneles 12px. Mobile y movimiento reducido sin scroll fijado.

## Fuentes y límites

- Google Maps consultado directamente el 6 de noviembre de 2026: 4,8/5, 1.485 reseñas (1.258 de 5 estrellas, 156 de 4, 36 de 3, 14 de 2, 21 de 1), dirección, teléfono y horarios. Enlaces de reseñas a la ficha de opiniones; son una selección estática, no una integración API en vivo.
- https://reymonocafe.com/ ofrece la carta `wp-content/uploads/2026/09/IMG_6996.png`, horarios `wp-content/uploads/2026/07/IMG_6424.jpeg`, logo original y terraza. Precios transcritos de esa carta. Carta completa accesible en diálogo e imagen original.
- Reservas: https://reymonocafe.myrestoo.net/es/reservar . No hay pedido en línea ni reservas falsas: los botones abren Restoo y el configurador solo calcula el precio.
- Fotografías de gyozas y noodles: originales públicos de Luis Galiana Jaraba, ficha Google Maps. Ediciones con herramienta integrada image_gen para mejorar iluminación/fondo conservando el plato reconocible. Créditos visibles en el pie. Originales en `sources/` local, no publicados.
- La herramienta devolvió 1672 × 941 px. Las versiones 3840 se reescalan, no son detalle 4K nativo. Carta, terraza y logo conservan su resolución original; no se inventa detalle de marca. Imágenes adaptativas WebP.
- No se ha sustituido el dominio existente ni configurado actualización automática de Google; esta última requiere acceso a un servicio/API autorizado.

## Prompts de imagen

Gyozas: mejorar la fotografía real, conservar gyozas doradas y bandeja cerámica negra con salsa; retirar cubiertos, manos y papeles; luz lateral de estudio, fondo carbón, vapor discreto; plato a la derecha y espacio a la izquierda; sin ingredientes añadidos, texto ni logos; solicitar paisaje 3840×2160.

Noodles: conservar noodles, pollo, cebolla, zanahoria, calabacín y plato cerámico claro; retirar persona y papeles; plato entero centrado a tres cuartos, fondo carbón, iluminación gastronómica realista; sin ingredientes añadidos ni texto; solicitar paisaje 3840×2160.

