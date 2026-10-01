(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ---------------- Nav ---------------- */
  function initNav() {
    var nav = $("[data-nav]");
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var burger = $("[data-burger]");
    var menu = $("[data-mobile-menu]");
    if (burger && menu) {
      burger.addEventListener("click", function () {
        var open = burger.getAttribute("aria-expanded") === "true";
        burger.setAttribute("aria-expanded", String(!open));
        menu.classList.toggle("is-open", !open);
        document.body.style.overflow = !open ? "hidden" : "";
      });
      $$("a", menu).forEach(function (a) {
        a.addEventListener("click", function () {
          burger.setAttribute("aria-expanded", "false");
          menu.classList.remove("is-open");
          document.body.style.overflow = "";
        });
      });
    }
  }

  /* ---------------- Smooth anchor scroll ---------------- */
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href*="#"]') : null;
      if (!a) return;
      var url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname) return;
      var id = url.hash;
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = 88;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navOffset,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveals() {
    var targets = $$(".reveal");
    if (!targets.length) return;

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });

    targets.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ---------------- Spiral draw-in ---------------- */
  function initSpiralDraw() {
    var spirals = $$("[data-spiral-draw]");
    if (!spirals.length) return;

    if (typeof IntersectionObserver === "undefined") {
      spirals.forEach(function (el) { el.classList.add("is-drawn"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-drawn");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    spirals.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Contact form (opens WhatsApp with the filled fields) ---------------- */
  function initContactForm() {
    var form = $("[data-contact-form]");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      if (!form.reportValidity()) return;
      e.preventDefault();

      var waNumber = ((data.contact && data.contact.whatsapp) || "https://wa.me/593986439950")
        .replace(/^https?:\/\/wa\.me\//, "");
      var text = "Hola Damyr, quisiera agendar una cita.\n\n" + summarizeForm(form);
      var url = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener");
    });
  }

  function summarizeForm(form) {
    var lines = [];
    $$("input, select, textarea", form).forEach(function (field) {
      if (!field.name || field.type === "submit" || field.type === "hidden" || !field.value) return;
      var label = form.querySelector('label[for="' + field.id + '"]');
      var text = label ? label.textContent.trim() : field.name;
      lines.push(text + ": " + field.value);
    });
    return lines.join("\n");
  }

  /* ---------------- Boot ---------------- */
  function boot() {
    safe(initNav, "initNav");
    safe(initSmoothScroll, "initSmoothScroll");
    safe(initReveals, "initReveals");
    safe(initSpiralDraw, "initSpiralDraw");
    safe(initContactForm, "initContactForm");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
