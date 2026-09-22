# Damyr — Centro de Estética Integral

Sitio web para Damyr, un atelier de bienestar / centro de estética integral.
Construido como sitio estático premium — sin build step, sin npm, listo para
arrastrar y soltar en Hostinger o cualquier hosting estático.

Dirección visual: **editorial cream con identidad Damyr** — fondo Marfil
(#F1EAE0), Carbón (#262320) para texto, Latón (#A97D3E) como acento cálido,
Vino Profundo (#6E2F2A) para énfasis, Taupe Cálido (#6B675F) como color
secundario. Tipografía Instrument Serif (titulares) + Public Sans (cuerpo).
El isotipo espiral de la marca (geometría abierta, sin cierres duros) se usa
como firma gráfica recurrente: en el logo, como decoración animada en el
hero y como elemento visual en la página "Nosotras" — evitando fotografía
de stock genérica mientras no haya fotografía real de la marca.

## Ver el sitio localmente

Sin dependencias ni build. Funciona incluso abriendo `index.html` con
doble clic (`file://`), o con cualquier servidor estático:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Estructura del proyecto

```
index.html        Home — hero, esencia de marca, promesa, tratamientos
                   (preview), proceso de trabajo, personalidad, testimonio, CTA
servicios.html     Tratamientos — menú completo por categoría (facial,
                   corporal, bienestar, estética avanzada)
nosotras.html      Historia de marca, valores, equipo y el espacio (atelier)
contacto.html      Información de contacto + formulario de solicitud de cita
styles.css         Hoja de estilos única, organizada por secciones
main.js            Punto de entrada (IIFE, sin ES modules) — nav, menú móvil,
                   scroll suave, reveals on-scroll, dibujo del isotipo espiral,
                   envío del formulario de contacto
lib/
  manifest.js         Datos de marca de referencia (window.__BRAND__)
  gsap.min.js          GSAP (motor de animación, reservado para uso futuro)
  ScrollTrigger.min.js Plugin de scroll de GSAP
.htaccess          Cabeceras de caché para Hostinger/Apache
```

## Datos pendientes por confirmar (placeholders)

Antes de publicar, reemplaza estos datos de ejemplo por los reales:

- **Dirección** del atelier (`contacto.html`, `lib/manifest.js`)
- **Teléfono / WhatsApp**: actualmente `+52 55 1234 5678` en todas las páginas
  y en `lib/manifest.js` (`contact.whatsapp`)
- **Correo**: actualmente `hola@damyr.mx` — usado también como destino del
  formulario de contacto (`contacto.html`, atributo `action` del `<form>` y
  `lib/manifest.js` → `contact.formEndpoint`, vía [FormSubmit](https://formsubmit.co))
- **Instagram**: enlace de ejemplo `instagram.com/damyr`
- **Horario**: confirmar días y horas reales
- **Menú de tratamientos** (`servicios.html`): las categorías y duraciones son
  una propuesta profesional razonable, no un catálogo confirmado por Damyr.
  Ajusta nombres, duraciones y agrega precios si decides mostrarlos.
- **Equipo** (`nosotras.html`): las tres tarjetas de equipo usan roles
  genéricos con inicial en vez de nombre real (no se contaba con fotos ni
  nombres del equipo). Reemplázalas por las expertas reales del centro.
- **Fotografía**: el sitio no usa fotografía de stock — se apoya en la
  paleta, tipografía y el isotipo espiral. Cuando haya fotografía real del
  espacio y del equipo (luz natural, materiales cálidos, retratos serenos,
  como pide el brand book), se puede añadir en `assets/img/` sustituyendo
  las secciones marcadas visualmente (hero, story-visual, team-avatar).

## Formulario de contacto

`contacto.html` envía por POST a [FormSubmit](https://formsubmit.co) sin
backend propio. Si el envío falla (por ejemplo, mientras el correo de
destino no esté verificado en FormSubmit), cae automáticamente a un
`mailto:` con los datos del formulario prellenados, así el formulario nunca
deja al visitante sin poder contactar.

**Importante:** la primera vez que alguien complete el formulario con la
dirección real, FormSubmit envía un correo de confirmación a esa dirección
que hay que aprobar una sola vez para activar el envío automático.

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
