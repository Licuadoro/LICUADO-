import html2canvas from 'html2canvas';

/**
 * Inicializa toda la interactividad de la página LICUADO.
 * @param {HTMLElement} wrap elemento raíz .lq-wrap
 * @returns {() => void} cleanup
 */
export function initLicuado(wrap) {
  if (!wrap) return function () {};

  var listeners = [];
  var intervals = [];
  var observers = [];
  var cleanups = [];

  function on(el, type, fn, opts) {
    el.addEventListener(type, fn, opts);
    listeners.push({ el: el, type: type, fn: fn, opts: opts });
  }
  function crand(min, max) { return Math.random() * (max - min) + min; }

  var logo = wrap.querySelector('#lq-logo-img');
  if (logo) logo.onerror = function () { logo.style.display = 'none'; };

  /* ── Revelado suave al hacer scroll ── */
  wrap.querySelectorAll('.lq-row').forEach(function (row) {
    row.classList.add('lq-reveal-row');
    Array.prototype.forEach.call(row.children, function (child) { child.classList.add('lq-reveal'); });
  });
  wrap.querySelectorAll('.lq-proy-header, .lq-game-narrative, .lq-game-portal').forEach(function (el) { el.classList.add('lq-reveal'); });
  var sobreInner = wrap.querySelector('.lq-sobre-inner');
  if (sobreInner) Array.prototype.forEach.call(sobreInner.children, function (el) { el.classList.add('lq-reveal'); });
  wrap.querySelectorAll('.lq-footer-inner').forEach(function (inner) {
    Array.prototype.forEach.call(inner.children, function (el) { el.classList.add('lq-reveal'); });
  });
  wrap.querySelectorAll('.lq-scriptorium-cta').forEach(function (el) { el.classList.add('lq-reveal'); });

  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('lq-reveal-in'); revealIO.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    wrap.querySelectorAll('.lq-reveal').forEach(function (el) { revealIO.observe(el); });
    observers.push(revealIO);
  } else {
    wrap.querySelectorAll('.lq-reveal').forEach(function (el) { el.classList.add('lq-reveal-in'); });
  }

  /* ── Tilt parallax en la tarjeta de juego ── */
  wrap.querySelectorAll('.lq-game-card').forEach(function (card) {
    var portal = card.parentElement;
    on(portal, 'mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      var dx = (e.clientX - cx) / r.width, dy = (e.clientY - cy) / r.height;
      card.style.transform = 'rotateY(' + (dx * 8).toFixed(2) + 'deg) rotateX(' + (-dy * 8).toFixed(2) + 'deg) translateZ(0)';
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
    on(portal, 'mouseleave', function () { card.style.transform = ''; });
  });

  /* ── Scroll suave y cambio de pantalla ── */
  function animateScrollTo(target, duration) {
    var start = window.scrollY || document.documentElement.scrollTop || 0;
    var change = target - start; var startTime = null;
    function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function step(time) {
      if (!startTime) startTime = time;
      var p = Math.min((time - startTime) / duration, 1);
      window.scrollTo(0, start + (change * ease(p)));
      if (p < 1) requestAnimationFrame(step); else buildParticles();
    }
    requestAnimationFrame(step);
  }

  function switchScreen(next) {
    wrap.classList.add('lq-switching');
    wrap.classList.remove('lq-show-scriptorium', 'lq-show-gallery', 'lq-show-news');
    if (next === 'scriptorium') wrap.classList.add('lq-show-scriptorium');
    else if (next === 'gallery') wrap.classList.add('lq-show-gallery');
    else if (next === 'news') wrap.classList.add('lq-show-news');
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
    buildParticles();
    buildCodeLines();
    snapshotAllMirrors();
    setTimeout(function () { wrap.classList.remove('lq-switching'); }, 850);
  }

  function scrollToId(id) {
    if (wrap.classList.contains('lq-show-scriptorium') || wrap.classList.contains('lq-show-gallery')) {
      wrap.classList.remove('lq-show-scriptorium', 'lq-show-gallery');
      window.scrollTo(0, 0);
    }
    var el = document.getElementById(id);
    if (el) { var target = (window.scrollY || 0) + el.getBoundingClientRect().top; animateScrollTo(target, 1350); }
  }

  wrap.querySelectorAll('[data-lq-scroll]').forEach(function (a) {
    on(a, 'click', function (e) { e.preventDefault(); scrollToId(a.getAttribute('data-lq-scroll')); });
  });
  wrap.querySelectorAll('[data-lq-screen]').forEach(function (a) {
    on(a, 'click', function (e) {
      e.preventDefault();
      var target = a.getAttribute('data-lq-screen');
      if (target === 'scriptorium') switchScreen('scriptorium');
      else if (target === 'gallery') switchScreen('gallery');
      else if (target === 'news') switchScreen('news');
      else switchScreen('home');
    });
  });
  wrap.querySelectorAll('[data-lq-scroll-scriptorium]').forEach(function (a) {
    on(a, 'click', function (e) { e.preventDefault(); animateScrollTo(0, 900); });
  });
  wrap.querySelectorAll('[data-lq-row]').forEach(function (btn) {
    on(btn, 'click', function () {
      var row = document.getElementById(btn.getAttribute('data-lq-row'));
      if (row) row.scrollBy({ left: Number(btn.getAttribute('data-lq-dir')) * 440, behavior: 'smooth' });
    });
  });

  /* ── Modal + Lightbox ── */
  var modal = wrap.querySelector('#lq-modal');
  function openModal() { if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; } }
  function closeModal() { if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; } }
  wrap.querySelectorAll('[data-lq-open-modal]').forEach(function (el) { on(el, 'click', openModal); });
  wrap.querySelectorAll('[data-lq-close-modal]').forEach(function (el) { on(el, 'click', closeModal); });
  if (modal) on(modal, 'click', function (e) { if (e.target === modal) closeModal(); });

  var lightbox = wrap.querySelector('#lq-lightbox');
  var lightboxImg = wrap.querySelector('#lq-lightbox-img');
  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src; lightboxImg.alt = alt || '';
    lightbox.classList.add('open'); document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open'); document.body.style.overflow = ''; lightboxImg.src = '';
  }
  wrap.querySelectorAll('[data-lq-open-lightbox]').forEach(function (card) {
    on(card, 'click', function () {
      var img = card.querySelector('img.lq-cover-art');
      if (img) openLightbox(img.src, img.alt);
    });
  });
  var lightboxCloseBtn = wrap.querySelector('#lq-lightbox-close');
  if (lightboxCloseBtn) on(lightboxCloseBtn, 'click', closeLightbox);
  if (lightbox) on(lightbox, 'click', function (e) { if (e.target === lightbox) closeLightbox(); });

  wrap.querySelectorAll('.lq-illus-card').forEach(function (card) {
    var img = card.querySelector('img.lq-cover-art');
    if (!img) return;
    function applyOrientation() {
      var frame = card.querySelector('.lq-poster-img');
      var label = card.querySelector('.lq-poster-label');
      if (!frame || !img.naturalWidth || !img.naturalHeight) return;
      if (img.naturalWidth > img.naturalHeight) { frame.style.width = '280px'; frame.style.height = '190px'; }
      else { frame.style.width = '200px'; frame.style.height = '267px'; }
      if (label) label.style.maxWidth = frame.style.width;
    }
    if (img.complete && img.naturalWidth) applyOrientation();
    else on(img, 'load', applyOrientation);
  });

  var diosPanel = wrap.querySelector('#lq-dios-panel');
  var diosPages = wrap.querySelector('#lq-dios-pages');
  var diosPageIdx = 0;
  var diosTotal = 2;
  function diosShowPage(idx) {
    diosPageIdx = Math.max(0, Math.min(diosTotal - 1, idx));
    if (diosPages) diosPages.style.transform = 'translateX(-' + (diosPageIdx * 100) + '%)';
    var leftArrow = wrap.querySelector('.lq-dios-arrow-left');
    var rightArrow = wrap.querySelector('.lq-dios-arrow-right');
    if (leftArrow) leftArrow.style.display = diosPageIdx > 0 ? 'flex' : 'none';
    if (rightArrow) rightArrow.style.display = diosPageIdx < diosTotal - 1 ? 'flex' : 'none';
    var dotsFixed = wrap.querySelector('#lq-dios-dots-fixed');
    if (dotsFixed) {
      dotsFixed.innerHTML = '';
      var dotCount = diosTotal - diosPageIdx;
      for (var d = 0; d < dotCount; d++) {
        var dot = document.createElement('span');
        dot.className = 'lq-dios-dot';
        dotsFixed.appendChild(dot);
      }
    }
  }
  function openDios() {
    if (diosPanel) {
      diosPanel.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (diosPages) diosPages.querySelectorAll('.lq-dios-page').forEach(function (p) { p.scrollTop = 0; });
      diosShowPage(1);
    }
  }
  function closeDios() { if (diosPanel) { diosPanel.classList.remove('open'); document.body.style.overflow = ''; document.documentElement.style.overflow = ''; } }
  wrap.querySelectorAll('[data-lq-open-dios]').forEach(function (el) { on(el, 'click', function (e) { e.preventDefault(); openDios(); }); });
  wrap.querySelectorAll('[data-lq-close-dios]').forEach(function (el) { on(el, 'click', closeDios); });
  wrap.querySelectorAll('[data-lq-dios-dir]').forEach(function (btn) {
    on(btn, 'click', function (e) { e.stopPropagation(); diosShowPage(diosPageIdx + Number(btn.getAttribute('data-lq-dios-dir'))); });
  });
  if (diosPanel) on(diosPanel, 'click', function (e) { if (e.target === diosPanel) closeDios(); });
  diosShowPage(1);

  /* ── Panel "Alma / Viaje astral" (frase del footer de Envía una señal) ── */
  var almaPanel = wrap.querySelector('#lq-alma-panel');
  var almaPages = wrap.querySelector('#lq-alma-pages');
  var almaPageIdx = 0;
  var almaTotal = 2;
  function almaShowPage(idx) {
    almaPageIdx = Math.max(0, Math.min(almaTotal - 1, idx));
    if (almaPages) almaPages.style.transform = 'translateX(-' + (almaPageIdx * 100) + '%)';
    var aLeft = almaPanel ? almaPanel.querySelector('.lq-dios-arrow-left') : null;
    var aRight = almaPanel ? almaPanel.querySelector('.lq-dios-arrow-right') : null;
    if (aLeft) aLeft.style.display = almaPageIdx > 0 ? 'flex' : 'none';
    if (aRight) aRight.style.display = almaPageIdx < almaTotal - 1 ? 'flex' : 'none';
    var aDots = wrap.querySelector('#lq-alma-dots-fixed');
    if (aDots) {
      aDots.innerHTML = '';
      var dotCount = almaTotal - almaPageIdx;
      for (var ad = 0; ad < dotCount; ad++) {
        var adot = document.createElement('span');
        adot.className = 'lq-dios-dot';
        aDots.appendChild(adot);
      }
    }
  }
  function openAlma() {
    if (almaPanel) {
      almaPanel.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (almaPages) almaPages.querySelectorAll('.lq-dios-page').forEach(function (p) { p.scrollTop = 0; });
      almaShowPage(1);
    }
  }
  function closeAlma() { if (almaPanel) { almaPanel.classList.remove('open'); document.body.style.overflow = ''; document.documentElement.style.overflow = ''; } }
  wrap.querySelectorAll('[data-lq-open-alma]').forEach(function (el) { on(el, 'click', function (e) { e.preventDefault(); openAlma(); }); });
  wrap.querySelectorAll('[data-lq-close-alma]').forEach(function (el) { on(el, 'click', closeAlma); });
  wrap.querySelectorAll('[data-lq-alma-dir]').forEach(function (btn) {
    on(btn, 'click', function (e) { e.stopPropagation(); almaShowPage(almaPageIdx + Number(btn.getAttribute('data-lq-alma-dir'))); });
  });
  if (almaPanel) on(almaPanel, 'click', function (e) { if (e.target === almaPanel) closeAlma(); });
  almaShowPage(1);

  on(document, 'keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeLightbox(); closeDios(); closeAlma(); } });
  wrap.querySelectorAll('[data-lq-lumen]').forEach(function (a) {
    on(a, 'click', function (e) { e.preventDefault(); scrollToId('lq-proyectos'); setTimeout(openModal, 650); });
  });

  /* ── Dropdown herramientas ── */
  var dropdown = wrap.querySelector('#lq-tools-dropdown');
  var toggle = wrap.querySelector('#lq-toggle');
  if (dropdown && toggle) {
    on(toggle, 'click', function (e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    on(document, 'click', function (e) {
      if (!dropdown.contains(e.target)) { dropdown.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
    on(document, 'keydown', function (e) {
      if (e.key === 'Escape') { dropdown.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ── Partículas globales ── */
  var layer = wrap.querySelector('#lq-global-particles');
  function buildParticles() {
    if (!layer) return;
    layer.innerHTML = '';
    var viewportH = window.innerHeight || 800;
    var isAltScreen = wrap.classList.contains('lq-show-scriptorium') || wrap.classList.contains('lq-show-gallery');
    var visibleFooter = wrap.classList.contains('lq-show-scriptorium') ? wrap.querySelector('.lq-scriptorium-footer')
      : wrap.classList.contains('lq-show-gallery') ? wrap.querySelector('.lq-gallery-footer')
      : wrap.classList.contains('lq-show-news') ? wrap.querySelector('.lq-news-footer')
        : wrap.querySelector('.lq-footer-home');
    var footerTop = visibleFooter ? visibleFooter.getBoundingClientRect().top : viewportH;
    var h = Math.max(0, Math.min(viewportH, footerTop - 3));
    layer.style.height = h + 'px';
    layer.style.display = h < 24 ? 'none' : 'block';
    if (h < 24) return;

    if (isAltScreen) {
      if (wrap.classList.contains('lq-show-gallery')) {
        var iceCount = Math.round(42 + Math.min(34, h / 24));
        for (var ic = 0; ic < iceCount; ic++) {
          var ice = document.createElement('i'); ice.className = 'lq-ice';
          var iSize = Math.round(crand(3, 9));
          ice.style.cssText = 'width:' + iSize + 'px;height:' + iSize + 'px;left:' + crand(2, 98).toFixed(2) + '%;top:' + crand(0, h).toFixed(0) + 'px;--dur:' + crand(9, 20).toFixed(2) + 's;--delay:' + crand(-18, 3).toFixed(2) + 's;--op:' + crand(.45, .9).toFixed(2) + ';--fall:' + crand(60, 170).toFixed(0) + 'px;--drift:' + crand(-40, 40).toFixed(0) + 'px';
          layer.appendChild(ice);
        }
        return;
      }
      if (wrap.classList.contains('lq-show-news')) {
        return;
      }
      var bubbleCount = Math.round(34 + Math.min(26, h / 28));
      for (var b = 0; b < bubbleCount; b++) {
        var bubble = document.createElement('i'); bubble.className = 'lq-bubble';
        var size = Math.round(crand(8, 24));
        var baseTop = crand(Math.max(24, h - 190), Math.max(28, h - 10));
        bubble.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + crand(4, 96).toFixed(2) + '%;top:' + baseTop.toFixed(0) + 'px;--dur:' + crand(6.5, 14).toFixed(2) + 's;--delay:' + crand(-12, 1).toFixed(2) + 's;--op:' + crand(.32, .72).toFixed(2) + ';--rise:-' + crand(120, 330).toFixed(0) + 'px;--drift:' + crand(-34, 34).toFixed(0) + 'px';
        layer.appendChild(bubble);
      }
      for (var sb = 0; sb < 12; sb++) {
        var surface = document.createElement('i'); surface.className = 'lq-surface-bubble';
        var sSize = Math.round(crand(5, 13));
        surface.style.cssText = 'width:' + sSize + 'px;height:' + sSize + 'px;left:' + crand(3, 97).toFixed(2) + '%;top:' + crand(76, 100).toFixed(0) + 'px;--dur:' + crand(3.4, 6.8).toFixed(2) + 's;--delay:' + crand(-8, 2).toFixed(2) + 's';
        layer.appendChild(surface);
      }
      return;
    }

    var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    var heat = .35 + (progress * .95);
    var bands = [
      { from: .02, to: .18, s: Math.round(5 * heat), d: Math.round(2 * heat) },
      { from: .18, to: .36, s: Math.round(9 * heat), d: Math.round(3 * heat) },
      { from: .36, to: .55, s: Math.round(15 * heat), d: Math.round(5 * heat) },
      { from: .55, to: .74, s: Math.round(24 * heat), d: Math.round(8 * heat) },
      { from: .74, to: .98, s: Math.round(38 * heat), d: Math.round(12 * heat) }
    ];
    bands.forEach(function (b, i) {
      var depth = (i + 1) / bands.length;
      var intensity = Math.min(1, depth * .65 + progress * .55);
      for (var n = 0; n < b.s; n++) {
        var el = document.createElement('i'); el.className = 'lq-spark';
        var top = crand(b.from * h, b.to * h), left = crand(2, 98), dur = crand(3.2, 7.2 - intensity * 1.6), delay = crand(-7, 1), ang = crand(-64, -8), op = crand(.16 + intensity * .12, .34 + intensity * .28);
        el.style.cssText = 'left:' + left + '%;top:' + top + 'px;--dur:' + dur.toFixed(2) + 's;--delay:' + delay.toFixed(2) + 's;--ang:' + ang.toFixed(1) + 'deg;--op:' + op.toFixed(2) + ';--rise:-' + crand(70, 170 + intensity * 85).toFixed(0) + 'px;--drift:' + crand(-24, 24).toFixed(0) + 'px';
        layer.appendChild(el);
      }
      for (var m = 0; m < b.d; m++) {
        var dot = document.createElement('i'); dot.className = 'lq-p';
        var size = Math.round(crand(2, 4 + intensity * 2));
        dot.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + crand(2, 98).toFixed(2) + '%;top:' + crand(b.from * h, b.to * h).toFixed(0) + 'px;--dur:' + crand(5, 11 - intensity * 1.5).toFixed(2) + 's;--delay:' + crand(-7, 1).toFixed(2) + 's;--op:' + crand(.1 + intensity * .08, .24 + intensity * .18).toFixed(2) + ';--rise:-' + crand(60, 145 + intensity * 65).toFixed(0) + 'px;--drift:' + crand(-28, 28).toFixed(0) + 'px';
        layer.appendChild(dot);
      }
    });
  }

  buildParticles();
  var resizeTimer; on(window, 'resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      buildParticles();
      buildCodeLines();
      resizeAllMirrors();
    }, 250);
  });
  var scrollTimer, snapTimer; on(window, 'scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(buildParticles, 160);
    clearTimeout(snapTimer);
    snapTimer = setTimeout(snapshotAllMirrors, 600);
  }, { passive: true });

  /* ── Líneas de código flotantes (fondo + primer plano) ── */
  var codeLayer = wrap.querySelector('#lq-code-layer');
  var fgLayer = wrap.querySelector('#lq-code-layer-fg');
  var codeFuncional = [
    'public class Errante : MonoBehaviour',
    'if (savia <= 0f) Morir();',
    'IEnumerator DashCorteza(float fuerza)',
    'errante.raiz.Cortar(direccion);',
    'rb2d.velocity = new Vector2(x, saltoFuerza);',
    'if (jefe.patron == Patron.Embestida)',
    'animator.SetTrigger("Herido");',
    'SceneManager.LoadScene("ArbolMadre_Sala3");',
    'public float saviaMax = 100f;',
    'GetComponent<Health>().Damage(golpe);',
    '[SerializeField] private Bosque arbolMadre;',
    'void OnFloemaEnter(Collider2D zona)',
    'class Jefe_GuardianRaiz : Enemigo',
    'checkpoint.Guardar(errante.posicion);',
    'if (combo.ventana > 0) Parry();',
    'private Queue<Recuerdo> recuerdos;',
    '// TODO: pulir el combate del jefe final',
    'function calcularTiempo(evento) {',
    'const kronos = new Reloj(zonaHoraria);',
    'kronos.sincronizar(usuario.tz);',
    'export default function Temporizador() {',
    'if (kronos.tick % 60 === 0) notificar();',
    'const eventos = kronos.obtenerAgenda();',
    'useEffect(() => kronos.iniciar(), []);',
    'function switchScreen(next) {',
    "wrap.classList.add('lq-switching');",
    'function buildParticles() { /* ambiente */ }',
    "const heat = .35 + (progress * .95);",
    'new IntersectionObserver(revelarSuave);',
    "git commit -m 'otra madrugada mas'"
  ];
  var codeSlogan = [
    '// un estudio de videojuegos con mas ambicion que personal',
    'const pensamiento = "obsesionado"; // la ventana me inspiro',
    'function aburrimiento() { return grandesObras; }',
    'class Dios extends Creador {} // tomar el papel de un dios',
    'const pipeline = ["Aburrimiento","Idea","Papel","Motor","Videojuego"];',
    'class Dev extends Artista {}',
    '// los videojuegos no son un tipo de arte, son todas las artes',
    'while (aburrido) { CrearMundo(); }',
    '// hecho por un estudiante, no por un estudio',
    'assert(pasion > horasDeTrabajo);',
    'try { CrearJuego(); } catch { SeguirIntentando(); }',
    '// ¿entonces los dioses son artistas?',
    'const mundo = crearMundo(videojuego); // como crear un mundo',
    'if (crearMundo) tomarPapel("dios"); // tomar el papel de un dios',
    'assert(todosSomosDioses === true); // ¿acaso todos somos dioses?',
    'const alma = consciencia + ideasPropias; // lo que nos hace divinos',
    'function crear() { return "divino"; } // crear te hace divino',
    'class Sonador extends Artista {} // los sonadores son artistas',
    'class Arquitecto extends Artista {} // los arquitectos son artistas',
    'const aldea = "Crocus Sativus"; // hogar del errante',
    'const matrix = new Mundo({ virtual: true }); // vivirian en una matrix',
    'npcIA.consciencia = new Consciencia({ artificial: true });',
    'if (poseer === "alma") es("dios"); // solo con alma somos dioses',
    '// los enemigos con IA tienen cuerpo virtual y contexto',
    'const errante = new SerDeSavia(); // un pequeno ser hecho de savia',
    'const routine = ["levantarse","trabajar","dormir","repetir"]; // bots',
    'while (aburrido) { mundo = Crear(); } // la ventana me inspiro',
    'const tu = alma; // no eres tu cuerpo, eres tu alma',
    'class Cuerpo extends Parasito {} // parasito del alma',
    'while (cuerpo) { alma.esclava = true; } // prision del cuerpo',
    'if (!cuerpo) alma.eterna = true; // sin cuerpo somos eternos',
    'const dioses = eterno; // el alma es eterna como los dioses',
    'function alminar() { alma.mover(); } // palabra que invente yo mismo',
    'const alminar = caminar + alma; // raices sentidas, cama-caminar',
    'faraday.bloquear(alma); // las camaras impiden el paso del alma',
    'if (lugar === "vaticano" || lugar === "area51") noEntrar(); // peligroso',
    'const ojos = new Filtro(); // los ojos no son mas que un filtro',
    'sin(ojos).ver(etereo); // ver mas alla del filtro, cosas etereas',
    'if (!cuerpo) dolor = null; // no necesitas dolor sin cuerpo',
    'cuerpo.depende(oxigeno); // el cuerpo te hace dependiente',
    'bots.rutina = true; alma.libre = true; // el alma no sigue rutina',
    'class Cuerpo extends Prision {} // parasito y carcel del alma',
    'vaticano.pactar(); // dicen que no es buena idea aceptar',
    'const viajeAstral = new Viaje({ cuerpo: null }); // salir como alma',
    'viajeAstral.noAlejarse(); // al menos hasta la decima vez',
    'alma.divina = consciencia + ideasPropias; // lo que nos hace dioses',
    'function escapar() { return alma; } // sin que muera el cuerpo',
    '// el cuerpo es un filtro que impide ver a los libres'
  ];
  var codeSnippets = codeFuncional.concat(codeSlogan);
  var sloganStart = codeFuncional.length;

  function buildCodeLines() {
    if (codeLayer) {
      codeLayer.innerHTML = '';
      if (window.innerWidth <= 780) { codeLayer.style.height = '0px'; }
      else {
        var totalH = Math.max(wrap.scrollHeight, window.innerHeight);
        codeLayer.style.height = totalH + 'px';
        var count = Math.round(46 + totalH / 170);
        for (var i = 0; i < count; i++) {
          var idx = Math.floor(crand(0, codeSnippets.length));
          var isSlogan = idx >= sloganStart;
          var isTeal = Math.random() < 0.25;
          var span = document.createElement('span');
          span.className = 'lq-code-line' + (isSlogan && !isTeal ? ' lq-code-slogan' : '') + (isTeal ? ' lq-code-teal' : '');
          span.textContent = codeSnippets[idx];
          span.style.cssText = 'left:' + crand(2, 72).toFixed(2) + '%;top:' + crand(10, totalH - 60).toFixed(0) + 'px;font-size:' + crand(.7, .98).toFixed(2) + 'rem;--dur:' + crand(11, 19).toFixed(2) + 's;--delay:' + crand(-14, 3).toFixed(2) + 's;--dx:' + crand(-24, 24).toFixed(0) + 'px;--o:' + (isSlogan ? crand(.44, .64) : crand(.4, .58)).toFixed(2);
          codeLayer.appendChild(span);
        }
      }
    }
    if (fgLayer) {
      fgLayer.innerHTML = '';
      if (window.innerWidth <= 780) return;
      var vh = window.innerHeight;
      var fgCount = Math.round(8 + vh / 260);
      for (var f = 0; f < fgCount; f++) {
        var fidx = Math.floor(crand(0, codeSnippets.length));
        var fSlogan = fidx >= sloganStart;
        var fTeal = Math.random() < 0.25;
        var sp = document.createElement('span');
        sp.className = 'lq-code-line-fg' + (fSlogan && !fTeal ? ' lq-code-fg-slogan' : '') + (fTeal ? ' lq-code-fg-teal' : '');
        sp.textContent = codeSnippets[fidx];
        var fgTop = Math.random() < 0.5 ? crand(-8, 20) : crand(80, 106);
        sp.style.cssText = 'left:' + crand(3, 78).toFixed(2) + '%;top:' + fgTop.toFixed(0) + '%;font-size:' + crand(.68, .9).toFixed(2) + 'rem;--dur:' + crand(15, 26).toFixed(2) + 's;--delay:' + crand(-16, 4).toFixed(2) + 's;--dx:' + crand(-40, 40).toFixed(0) + 'px;--o:' + (fSlogan ? crand(.24, .38) : crand(.2, .32)).toFixed(2);
        fgLayer.appendChild(sp);
      }
    }
  }

  buildCodeLines();
  intervals.push(setInterval(buildCodeLines, 9000));

  /* ── Footer reflectante (espejo líquido, todos los footers) ── */
  var mirrors = [];

  function resizeAllMirrors() { mirrors.forEach(function (m) { try { m.resize(); } catch (e) {} }); }
  function snapshotAllMirrors() { mirrors.forEach(function (m) { try { m.snapshot(); } catch (e) {} }); }

  function buildMirrors() {
    var footerEls = wrap.querySelectorAll('.lq-footer');
    footerEls.forEach(function (footer) {
      var canvas = footer.querySelector('.lq-footer-mirror');
      if (!canvas || footer.dataset.lqMirror === '1') return;
      footer.dataset.lqMirror = '1';
      var isHome = footer.classList.contains('lq-footer-home');
      var isScriptoriumF = footer.classList.contains('lq-scriptorium-footer');
      var isGalleryF = footer.classList.contains('lq-gallery-footer');
      var isNewsF = footer.classList.contains('lq-news-footer');
      var themeColor = isNewsF ? '200,24,12' : isGalleryF ? '215,170,61' : isScriptoriumF ? '3,252,111' : '0,255,68';
      var darkColor = isNewsF ? '40,6,4' : isGalleryF ? '22,17,4' : isScriptoriumF ? '2,28,14' : '0,40,12';
      var ctx = canvas.getContext('2d');
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var gloss = footer.querySelector('.lq-footer-gloss');
      var lastSnap = null;
      var snapPending = false;
      var t = 0;
      var raf = null;
      var visible = false;
      var flameX = [5, 15, 30, 50, 70, 85, 95];
      var flameSparks = [];

      function resize() {
        var r = footer.getBoundingClientRect();
        canvas.width = Math.max(1, r.width * dpr);
        canvas.height = Math.max(1, r.height * dpr);
        canvas.style.width = r.width + 'px';
        canvas.style.height = r.height + 'px';
      }

      function findAbove() {
        if (isHome) {
          var facts = wrap.querySelector('.lq-sobre-facts');
          if (facts && facts.offsetHeight > 0) return facts;
        }
        var ftop = footer.getBoundingClientRect().top;
        var secs = wrap.querySelectorAll('section');
        var found = null;
        secs.forEach(function (s) {
          var sr = s.getBoundingClientRect();
          if (s.offsetHeight > 0 && sr.bottom <= ftop + 2) found = s;
        });
        return found;
      }

      function snapshot() {
        if (snapPending) return;
        var target = findAbove();
        if (!target) return;
        snapPending = true;
        html2canvas(target, { backgroundColor: null, useCORS: true, allowTaint: true, scale: 0.5, logging: false })
          .then(function (c) { lastSnap = c; snapPending = false; })
          .catch(function () { snapPending = false; });
      }

      function draw() {
        t += 0.016;
        var w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        // base mercurio (sin dorado)
        var g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, 'rgba(' + themeColor + ',0.10)');
        g.addColorStop(0.5, 'rgba(' + darkColor + ',0.5)');
        g.addColorStop(1, 'rgba(3,3,3,0.92)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

        // reflejo invertido de lo que está encima
        if (lastSnap) {
          ctx.save();
          ctx.globalAlpha = 0.3;
          ctx.filter = 'blur(' + (2 * dpr) + 'px)';
          var refH = h * 0.6;
          var scale = w / lastSnap.width;
          var drawH = lastSnap.height * scale;
          ctx.translate(0, refH);
          ctx.scale(1, -1);
          ctx.drawImage(lastSnap, 0, 0, w, drawH);
          ctx.restore();
          var mg = ctx.createLinearGradient(0, 0, 0, refH);
          mg.addColorStop(0, 'rgba(3,3,3,0)');
          mg.addColorStop(1, 'rgba(3,3,3,0.85)');
          ctx.fillStyle = mg; ctx.fillRect(0, 0, w, refH);
        }

        // reflejo de las llamitas animadas (solo en el footer principal)
        if (isHome) {
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          flameX.forEach(function (px, fi) {
            var cx = (px / 100) * w;
            var big = px === 50;
            var flick = 0.5 + 0.5 * Math.sin(t * (6 + fi * 1.7) + fi * 2.1);
            var rad = (big ? 95 : 58) * dpr * (0.8 + flick * 0.4);
            var baseA = (big ? 0.34 : 0.18) * (0.6 + flick * 0.4);
            var rg = ctx.createRadialGradient(cx, 0, 0, cx, 0, rad);
            rg.addColorStop(0, 'rgba(0,255,68,' + baseA.toFixed(3) + ')');
            rg.addColorStop(1, 'rgba(0,255,68,0)');
            ctx.fillStyle = rg;
            ctx.beginPath();
            ctx.arc(cx, 0, rad, 0, Math.PI * 2);
            ctx.fill();
            if (Math.random() < 0.16) {
              flameSparks.push({ x: cx + (Math.random() - 0.5) * 16 * dpr, y: 2 * dpr, vy: -(0.6 + Math.random() * 0.9) * dpr, vx: (Math.random() - 0.5) * 0.4 * dpr, life: 1, big: big });
            }
          });
          flameSparks.forEach(function (sp) { sp.x += sp.vx; sp.y += sp.vy; sp.vy *= 0.992; sp.life -= 0.012; });
          flameSparks = flameSparks.filter(function (sp) { return sp.life > 0; });
          flameSparks.forEach(function (sp) {
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, (sp.big ? 2 : 1.4) * dpr * sp.life, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0,255,68,' + (sp.life * 0.6).toFixed(3) + ')';
            ctx.fill();
          });
          ctx.restore();
        }

        // líneas líquidas onduladas
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        for (var l = 0; l < 3; l++) {
          ctx.beginPath();
          var amp = 4 * dpr + l * 2 * dpr;
          var yBase = h * (0.2 + l * 0.18);
          for (var x = 0; x <= w; x += 8) {
            var y = yBase + Math.sin((x / w) * Math.PI * 4 + t * (1 + l * 0.4)) * amp;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = 'rgba(' + themeColor + ',' + (0.08 - l * 0.02) + ')';
          ctx.lineWidth = 1.5 * dpr;
          ctx.stroke();
        }
        ctx.restore();

        raf = requestAnimationFrame(draw);
      }

      function start() { if (!raf && visible) raf = requestAnimationFrame(draw); }
      function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

      on(footer, 'mousemove', function (e) {
        var r = footer.getBoundingClientRect();
        var mx = ((e.clientX - r.left) / r.width * 100).toFixed(1);
        var my = ((e.clientY - r.top) / r.height * 100).toFixed(1);
        if (gloss) { gloss.style.setProperty('--mx', mx + '%'); gloss.style.setProperty('--my', my + '%'); }
      });

      resize();
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            visible = en.isIntersecting;
            if (visible) { resize(); start(); snapshot(); } else { stop(); }
          });
        }, { threshold: 0.05 });
        io.observe(footer);
        observers.push(io);
      } else {
        visible = true; start();
      }

      mirrors.push({ resize: resize, snapshot: snapshot, stop: stop });
    });
  }

  buildMirrors();
  cleanups.push(function () { mirrors.forEach(function (m) { try { m.stop(); } catch (e) {} }); });

  /* ── gtag (preservado) ── */
  if (!window.__lqGtagLoaded) {
    window.__lqGtagLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-5P566X0J9J');
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=G-5P566X0J9J';
    document.head.appendChild(s);
  }

  /* ── cleanup ── */
  return function () {
    listeners.forEach(function (l) { l.el.removeEventListener(l.type, l.fn, l.opts); });
    intervals.forEach(clearInterval);
    observers.forEach(function (o) { o.disconnect(); });
    cleanups.forEach(function (f) { try { f(); } catch (e) {} });
  };
}