# Damyr — Centro de Estética Integral

Sitio web para Damyr, un atelier de bienestar / centro de estética integral.
Construido como sitio estático premium — sin build step, sin npm, listo para
arrastrar y soltar en Hostinger o cualquier hosting estático.

Dirección visual: **editorial cream con identidad Damyr** — fondo Marfil
(#F1EAE0), Carbón (#262320) para texto, Latón (#A97D3E) como acento cálido,
Vino Profundo (#6E2F2A) para énfasis, Taupe Cálido (#6B675F) como color
secundario. Tipografía Instrument Serif (titulares) + Public Sans (cuerpo).
El isotipo espiral de la marca (el logo real, provisto por el cliente) se usa
en el nav, el footer y el favicon; una versión decorativa de fondo se anima
al entrar en el hero.

## Ver el sitio localmente

Sin dependencias ni build. Funciona incluso abriendo `index.html` con
doble clic (`file://`), o con cualquier servidor estático:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Estructura del proyecto

```
index.html        Home — hero, tratamientos (preview), proceso de trabajo,
                   5 testimonios, CTA final
servicios.html     Tratamientos — menú completo por categoría (facial,
                   corporal, bienestar, estética avanzada)
agenda.html        Reserva directa — un botón que abre WhatsApp con mensaje
                   prellenado, más horario y alternativa por el formulario
contacto.html      Información de contacto + formulario que abre WhatsApp
                   con los datos prellenados (sin backend ni correo)
styles.css         Hoja de estilos única, organizada por secciones
main.js            Punto de entrada (IIFE, sin ES modules) — nav, menú móvil,
                   scroll suave, reveals on-scroll, dibujo del isotipo espiral,
                   envío del formulario de contacto
lib/
  manifest.js         Datos de marca de referencia (window.__BRAND__)
  gsap.min.js          GSAP (motor de animación, reservado para uso futuro)
  ScrollTrigger.min.js Plugin de scroll de GSAP
assets/img/
  logo-mark.png        Isotipo espiral (logo real, fondo transparente, tono Latón)
  favicon.png           Favicon — isotipo en Latón sobre fondo Carbón
.htaccess          Cabeceras de caché para Hostinger/Apache
```

## Datos de contacto

- **Ubicación**: Urdesa, Víctor Emilio Estrada, Guayaquil (`contacto.html`,
  `lib/manifest.js` → `contact.address`)
- **Teléfono / WhatsApp**: `+593 98 643 9950` en todas las páginas y en
  `lib/manifest.js` (`contact.whatsapp`)
- **Instagram**: [@damyr.medicinaestetica](https://instagram.com/damyr.medicinaestetica)
- **Correo**: no se usa — el centro atiende por WhatsApp y teléfono
- **Horario**: confirmar días y horas reales (actualmente un horario de
  ejemplo: lun-vie 9:00–19:00, sáb 9:00–15:00, dom cerrado)
- **Menú de tratamientos** (`servicios.html`): las categorías y duraciones son
  una propuesta profesional razonable, no un catálogo confirmado por Damyr.
  Ajusta nombres, duraciones y agrega precios si decides mostrarlos.
- **Fotografía**: el sitio todavía no incluye fotografía — se apoya en la
  paleta, tipografía y el isotipo espiral mientras se consigue fotografía
  real del espacio y del equipo (luz natural, materiales cálidos, retratos
  serenos, como pide el brand book).

## Formulario de contacto

`contacto.html` no usa backend ni correo: al enviarlo, `main.js` arma un
mensaje de WhatsApp con los campos completados (nombre, teléfono, tratamiento
de interés, horario preferido y mensaje) y abre `wa.me` en una pestaña nueva
con ese texto prellenado, listo para enviar. Si el visitante tiene
JavaScript desactivado, el botón "Agendar por WhatsApp" de `agenda.html`
sigue disponible como enlace directo sin depender de JS.

## Desplegar / actualizar

1. Sube el `?v=YYYYMMDD` en cada `<link>`/`<script>` de los 4 archivos HTML
   cada vez que cambies `styles.css` o `main.js`.
2. Arrastra la carpeta completa al Administrador de archivos de Hostinger
   (o cualquier hosting estático). `.htaccess` ya está configurado para el
   caché correcto ahí.
3. Si un cambio no se refleja tras subirlo, casi siempre es caché —
   revisa primero el `?v=`.

## Accesibilidad y robustez

- Funciona con JavaScript desactivado (todo el contenido vive en el HTML).
- Funciona sobre `file://` (sin ES modules, solo scripts clásicos).
- Los efectos de scroll-reveal respetan `prefers-reduced-motion` solo para
  el movimiento decorativo del isotipo; el resto del contenido se muestra
  igual, solo sin la transición.
