import React, { useEffect, useRef } from 'react';
import '@/licuado.css';
import { initLicuado } from '@/lib/licuado';

const HTML = `
  <div class="lq-wrap" id="lq-wrap">
    <div class="lq-global-particles" id="lq-global-particles"></div>
    <div class="lq-code-layer" id="lq-code-layer" aria-hidden="true"></div>
    <div class="lq-code-layer-fg" id="lq-code-layer-fg" aria-hidden="true"></div>
    <div class="lq-crt" aria-hidden="true"></div>

    <section class="lq-banner">
    <img class="lq-banner-bg" aria-hidden="true" src="https://media.base44.com/images/public/6a68f46d82ce25dfe7a4b8fc/3e349e33f_1000056000.jpg" alt="">
    <div class="lq-glow"></div><div class="lq-scan"></div>
    <div class="lq-banner-content">
      <img class="lq-logo" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXP-6qctGhLz4Rh8QGRiqXE4yQcN94o48f8EQcei5yVWjaEn58I3GY6MXqyNDDmjaKtFhqeV2-6x6mKc6CsxGsq0Kom_SRC5v8yE_lsm9xdKO1bilb0_-8WK3eeVLujlXa1MdD3zf4z4Hir2UqlIAkx3J6_KsTMmFsg1ItgEAm_h2PVZvP9PvHN7yG_fRH/s16000/Licuado%20Logotipo.png" alt="LICUADO" id="lq-logo-img">
      <p class="lq-tagline">Un estudio de videojuegos con más ambición que personal</p>
      <div class="lq-divider"><div class="lq-line"></div><div class="lq-dot"></div><div class="lq-line r"></div></div>
      <p class="lq-sub">Estudio de videojuegos independiente</p>
      <div class="lq-actions">
        <a class="lq-btn" href="#lq-proyectos" data-lq-scroll="lq-proyectos">Ver proyectos <span>&#8595;</span></a>
        <a class="lq-btn" href="#lq-sobre" data-lq-scroll="lq-sobre">Sobre LICUADO <span>&#8595;</span></a>
      </div>
      <div class="lq-dropdown-wrapper" style="margin-top:2rem;opacity:0;animation:lq-fade-up 1s ease 1.55s forwards;position:relative;z-index:2;">
        <div class="lq-dropdown" id="lq-tools-dropdown">
          <button class="lq-dropdown-toggle" id="lq-toggle" aria-expanded="false" aria-haspopup="true">
            <span>Descubre mis propias herramientas</span>
            <span class="lq-arrow-icon" aria-hidden="true"></span>
          </button>
          <div class="lq-dropdown-menu" role="menu">
            <a class="lq-dropdown-item" href="https://kronostl.netlify.app/" target="_blank" rel="noopener" role="menuitem">Kronos</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="lq-data-breach"></div>

  <section class="lq-game-section lq-proyectos" id="lq-proyectos">
    <div class="lq-game-inner">
      <div class="lq-game-narrative">
        <span class="lq-proy-label">En desarrollo</span>
        <h2 class="lq-game-title">Lúmen</h2>
        <blockquote class="lq-game-desc">Un metroidvania de exploración y combate frenético con ilustraciones tipo manga hechas a mano donde eres un diminuto ser hecho de savia que habita el interior de un árbol colosal y tiene como primer objetivo vengar a un miembro de su aldea.</blockquote>
        <div class="lq-game-tags">
          <span class="lq-tag">Metroidvania</span><span class="lq-tag">Exploración</span><span class="lq-tag">Combate intenso</span><span class="lq-tag">En desarrollo</span>
        </div>
      </div>
      <div class="lq-game-portal">
        <div class="lq-game-card" data-lq-open-modal>
          <div class="lq-game-card-glow"></div>
          <img class="lq-game-art" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3I7qjXeBTziyGW7c_4YjHbvlTQvt6_DqST71l3LTYImjxfi7LkKb_f9bTI0DJ_T7aRC2ld39X5L2GL-oIcGj9d7eLvsEgOequ5mqlfpfLCSpBxls9VfnViwBxByWHLF-rxu0wdJM81rO_d4dbpEsgdtMLSpZQ_5f8Vvgbr41taFywwZrLLFZ2-915FjA/s16000/L%C3%BAmen%20Ecos%20bajo%20la%20corteza%20+%20logotipo%20de%20LICUADO.png" alt="Portada de Lúmen: Ecos bajo la corteza">
          <div class="lq-game-card-overlay"><span>Ver más</span></div>
        </div>
      </div>
    </div>
  </section>

  <div class="lq-data-breach"></div>

  <section class="lq-sobre" id="lq-sobre">
    <div class="lq-sobre-inner">
      <div class="lq-sobre-visual">
        <div class="lq-frame lq-frame-float">
          <span class="lq-frame-flourish tl"><svg viewBox="0 0 42 42" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 37 C 10 30, 16 27, 23 28 C 30 29, 33 24, 30 18 C 27 12, 31 7, 36 6"/><path d="M9 37 C 12 33, 16 31, 20 31"/><path d="M16 29 C 20 27, 24 27, 27 28"/><path d="M23 22 C 26 18, 29 15, 33 13"/><circle cx="35" cy="8" r="2" fill="currentColor"/><path d="M5 37 C 5 31, 8 27, 12 25"/><path d="M5 37 C 9 35, 13 34, 17 35"/></svg></span>
          <span class="lq-frame-flourish tr"><svg viewBox="0 0 42 42" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 37 C 10 30, 16 27, 23 28 C 30 29, 33 24, 30 18 C 27 12, 31 7, 36 6"/><path d="M9 37 C 12 33, 16 31, 20 31"/><path d="M16 29 C 20 27, 24 27, 27 28"/><path d="M23 22 C 26 18, 29 15, 33 13"/><circle cx="35" cy="8" r="2" fill="currentColor"/><path d="M5 37 C 5 31, 8 27, 12 25"/><path d="M5 37 C 9 35, 13 34, 17 35"/></svg></span>
          <span class="lq-frame-flourish br"><svg viewBox="0 0 42 42" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 37 C 10 30, 16 27, 23 28 C 30 29, 33 24, 30 18 C 27 12, 31 7, 36 6"/><path d="M9 37 C 12 33, 16 31, 20 31"/><path d="M16 29 C 20 27, 24 27, 27 28"/><path d="M23 22 C 26 18, 29 15, 33 13"/><circle cx="35" cy="8" r="2" fill="currentColor"/><path d="M5 37 C 5 31, 8 27, 12 25"/><path d="M5 37 C 9 35, 13 34, 17 35"/></svg></span>
          <span class="lq-frame-flourish bl"><svg viewBox="0 0 42 42" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 37 C 10 30, 16 27, 23 28 C 30 29, 33 24, 30 18 C 27 12, 31 7, 36 6"/><path d="M9 37 C 12 33, 16 31, 20 31"/><path d="M16 29 C 20 27, 24 27, 27 28"/><path d="M23 22 C 26 18, 29 15, 33 13"/><circle cx="35" cy="8" r="2" fill="currentColor"/><path d="M5 37 C 5 31, 8 27, 12 25"/><path d="M5 37 C 9 35, 13 34, 17 35"/></svg></span>
          <div class="lq-frame-inner">
            <img src="https://media.base44.com/images/public/6a68f46d82ce25dfe7a4b8fc/3e349e33f_1000056000.jpg" alt="Ilustración oficial de LICUADO">
          </div>
          <div class="lq-frame-plaque"><span class="lq-plaque-small">Lo más nuevo en</span>LICUADO&nbsp;&nbsp;Scriptorium</div>
        </div>
        <a href="#" class="lq-btn-scriptorium lq-btn-manuscript lq-btn-script-lg" data-lq-screen="gallery"><svg class="lq-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4c-4 0-9 2-12 7-2 3-3 6-3 9 3 0 6-1 9-3 5-3 7-8 7-12 0-.4-.4-1-1-1Z"/><path d="M9 15 4 20"/><path d="M13 8.5c-2 .3-4 1.6-5.3 3.6"/></svg>LICUADO Scriptorium</a>
        <div class="lq-news-preview" style="margin-top:1.5rem;opacity:0;animation:lq-fade-up 1s ease 1.8s forwards;position:relative;z-index:2;">
          <article class="lq-news-card lq-news-card-home">
            <div class="lq-news-date">11 Ago 2026</div>
            <h3 class="lq-news-title">Actualización LICUADO 1.01: Magnetrón</h3>
            <p class="lq-news-excerpt">En esta actualización añadí una nova notícia de Kronos y más textos conspiranóicos sin ningún tipo de fundamento (Lo digo así por mi propia seguridad)</p>
          </article>
          <a href="#" class="lq-btn-scriptorium lq-btn-news w-full" data-lq-screen="news"><svg class="lq-btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>Notícias</a>
        </div>
      </div>
      <div>
        <span class="lq-proy-label">El estudio</span>
        <h2 class="lq-sobre-titulo">Qué es <span>LICUADO</span></h2>
        <p class="lq-sobre-parrafo">Licuado no es un equipo, son solo los esfuerzos de un estudiante de instituto que un día quedó fascinado con Hollow Knight de Team Cherry. Los frutos de estar aburrido. Es el resultado de una obsesión por entregar algo que se quede en tu memoria y te cambie para bien, e incluso que te inspire a crear.</p>
        <p class="lq-sobre-parrafo">LICUADO existe porque los videojuegos pueden ser algo más que un producto. Los videojuegos están hechos para entregar una experiéncia y un mensaje, no solo para hacer dinero. No se puede desperdiciar así el máximo exponente del arte, porque si, los devs somos artistas, y los videojuegos no son un tipo de arte, son todas las artes.</p>
        <div class="lq-divider-soft"></div>
        <span class="lq-proy-label">Caribe Studios</span>
        <p class="lq-sobre-parrafo">Caribe Studios es un estudio independiente con el que tengo contacto, y están trabajando en un metroidvania. Me sorprende que un chico a penas mayor que yo ya consiguió reunir a tanta gente, ya que, si, Caribe Studios también está liderado por un estudiante.</p>
        <a class="lq-link" href="https://caribe-studios-portal-883042bb.base44.app/" target="_blank" rel="noopener">Ir a Caribe Studios &#8599;</a>
        <div class="lq-divider-soft"></div>
        <span class="lq-proy-label">Cuento finalista</span>
        <h3 class="lq-sobre-titulo" style="font-size:clamp(1.7rem,3.5vw,2.3rem);margin:.3rem 0 1rem">Cordura</h3>
        <p class="lq-sobre-parrafo">Cordura es un cuento que escribí para un concurso, y tras quedar finalista será publicado en el mes de octubre, en una compilación de cuentos llamada Inventario de fragmentos I, por parte de la editorial corazón de tinta, quienes organizaron el concurso. Los concursos de escritura de cuentos son parte de la financiación de este proyecto, o al menos eso espero, ya que en el concurso en el que participé con cordura no había un premio monetario más que la publicación del cuento en la compilación, por la cual no recibo ganancias al comprar un ejemplar. Sin embargo, me enorgullece que mis escrituras sean conocidas. Pero pienso participar en más concursos a futuro para conseguir presupuesto para el proyecto LICUADO.</p>
        <div class="lq-sobre-facts">
          <div class="lq-fact"><span class="lq-fact-num">1</span><span class="lq-fact-label">Artista tras todo lo que ves</span></div>
          <div class="lq-fact"><span class="lq-fact-num">&#8734;</span><span class="lq-fact-label">Horas de volcar mis ideas en un computador</span></div>
        </div>
      </div>
    </div>
  </section>

  <div class="lq-data-breach"></div>

  <section class="lq-art-banner">
    <img class="lq-art-banner-img" aria-hidden="true" src="https://media.base44.com/images/public/6a68f46d82ce25dfe7a4b8fc/a3cd662d8_1000058723.jpg" alt="">
  </section>

  <footer class="lq-footer lq-footer-home">
    <canvas class="lq-footer-mirror" id="lq-footer-mirror" aria-hidden="true"></canvas>
    <div class="lq-footer-shimmer" aria-hidden="true"></div>
    <div class="lq-footer-gloss" aria-hidden="true"></div>
    <div class="lq-fire-wrap" style="left:50%;transform:translateX(-50%)"><div class="lq-flame lq-flame-2"></div><div class="lq-flame lq-flame-3"></div><div class="lq-flame lq-flame-1"></div><div class="lq-flame lq-flame-core"></div><div class="lq-fire-spark" style="left:50%;bottom:30px;--delay:0s;--dx:-18px;--dy:-60px"></div><div class="lq-fire-spark" style="left:55%;bottom:28px;--delay:.4s;--dx:12px;--dy:-70px"></div></div>
    <div class="lq-fire-wrap lq-fire-sm" style="left:15%;transform:translateX(-50%)"><div class="lq-flame lq-flame-2"></div><div class="lq-flame lq-flame-3"></div><div class="lq-flame lq-flame-1"></div><div class="lq-flame lq-flame-core"></div></div>
    <div class="lq-fire-wrap lq-fire-sm" style="left:30%;transform:translateX(-50%)"><div class="lq-flame lq-flame-2"></div><div class="lq-flame lq-flame-3"></div><div class="lq-flame lq-flame-1"></div><div class="lq-flame lq-flame-core"></div></div>
    <div class="lq-fire-wrap lq-fire-sm" style="left:70%;transform:translateX(-50%)"><div class="lq-flame lq-flame-2"></div><div class="lq-flame lq-flame-3"></div><div class="lq-flame lq-flame-1"></div><div class="lq-flame lq-flame-core"></div></div>
    <div class="lq-fire-wrap lq-fire-sm" style="left:85%;transform:translateX(-50%)"><div class="lq-flame lq-flame-2"></div><div class="lq-flame lq-flame-3"></div><div class="lq-flame lq-flame-1"></div><div class="lq-flame lq-flame-core"></div></div>
    <div class="lq-fire-wrap lq-fire-sm" style="left:5%;transform:translateX(-50%);opacity:.6"><div class="lq-flame lq-flame-2"></div><div class="lq-flame lq-flame-1"></div><div class="lq-flame lq-flame-core"></div></div>
    <div class="lq-fire-wrap lq-fire-sm" style="left:95%;transform:translateX(-50%);opacity:.6"><div class="lq-flame lq-flame-3"></div><div class="lq-flame lq-flame-1"></div><div class="lq-flame lq-flame-core"></div></div>
    <div class="lq-footer-inner">
      <div class="lq-footer-brand">
        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXP-6qctGhLz4Rh8QGRiqXE4yQcN94o48f8EQcei5yVWjaEn58I3GY6MXqyNDDmjaKtFhqeV2-6x6mKc6CsxGsq0Kom_SRC5v8yE_lsm9xdKO1bilb0_-8WK3eeVLujlXa1MdD3zf4z4Hir2UqlIAkx3J6_KsTMmFsg1ItgEAm_h2PVZvP9PvHN7yG_fRH/s16000/Licuado%20Logotipo.png" alt="LICUADO">
        <p class="lq-footer-tagline">Pensando obsesionado,<br>porque la ventana me ha inspirado...</p>
      </div>
      <div>
        <p class="lq-footer-nav-title">Navegar</p>
        <ul class="lq-footer-nav">
          <li><a href="#lq-top" data-lq-scroll="lq-top">Inicio</a></li>
          <li><a href="#lq-proyectos" data-lq-lumen>Lúmen</a></li>
          <li><a href="https://caribe-studios-portal-883042bb.base44.app/" target="_blank" rel="noopener">Caribe Studios &#8599;</a></li>
          <li style="margin-top:.6rem"><a href="#" class="lq-btn-scriptorium lq-btn-signal" data-lq-screen="scriptorium"><svg class="lq-btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 20v-6"/><path d="M8.5 15.5a5 5 0 0 1 0-7"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M5.5 18.5a9 9 0 0 1 0-13"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>Envía una señal</a></li>
          <li><a href="#" class="lq-btn-scriptorium lq-btn-manuscript" data-lq-screen="gallery"><svg class="lq-btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4c-4 0-9 2-12 7-2 3-3 6-3 9 3 0 6-1 9-3 5-3 7-8 7-12 0-.4-.4-1-1-1Z"/><path d="M9 15 4 20"/><path d="M13 8.5c-2 .3-4 1.6-5.3 3.6"/></svg>LICUADO Scriptorium</a></li>
          <li><a href="#" class="lq-btn-scriptorium lq-btn-news" data-lq-screen="news"><svg class="lq-btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>Notícias</a></li>
          <li><a class="lq-btn-scriptorium lq-btn-kronos" href="https://kronostl.netlify.app/" target="_blank" rel="noopener"><svg class="lq-btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><g class="lq-kronos-hand"><path d="M12 12 12 7"/><path d="M12 12 15.3 13.6"/></g></svg>Kronos</a></li>
        </ul>
      </div>
    </div>
    <div class="lq-footer-bottom">
      <span class="lq-footer-copy">&copy; 2026 LICUADO. Todos los derechos reservados.</span>
      <button type="button" class="lq-footer-made lq-dios-link" data-lq-open-dios>Si crear un videojuego es como crear un mundo... ¿No estaría tomando el papel de un dios?</button>
    </div>
  </footer>

  <section class="lq-scriptorium" id="lq-scriptorium">
    <button class="lq-btn lq-scriptorium-back" type="button" data-lq-screen="home">&#8592; Volver</button>
    <div class="lq-glow"></div>
    <div class="lq-scan"></div>
    <div class="lq-waterline"></div>
    <h2 class="lq-proy-title" style="position:relative;z-index:1;margin-bottom:.5rem">Envía una señal</h2>
    <div class="lq-divider"><div class="lq-line"></div><div class="lq-dot"></div><div class="lq-line r"></div></div>
    <div class="lq-scriptorium-cta">
      <a class="lq-discord-btn" href="https://discord.gg/zWeP5sBfwJ" target="_blank" rel="noopener">
        <img class="lq-discord-icon" src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-white-icon.png" alt="">
        Entrar al Discord
      </a>
      <a class="lq-discord-btn" href="https://youtube.com/@licuado_scriptorium?si=8GNDObIl_y5xVzyq" target="_blank" rel="noopener">Visita el canal de YouTube</a>
      <a class="lq-discord-btn" href="https://x.com/LicuadoProject" target="_blank" rel="noopener" style="border-color:rgba(0,255,68,.4);background:linear-gradient(135deg,rgba(0,255,68,.12),rgba(0,50,20,.25))"><svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(0,255,68,.9)" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>Sígueme en X</a>
      <a class="lq-discord-btn" href="https://www.instagram.com/licuado_project/" target="_blank" rel="noopener" style="border-color:rgba(0,255,68,.4);background:linear-gradient(135deg,rgba(0,255,68,.12),rgba(0,50,20,.25))"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>Instagram</a>
      <a class="lq-discord-btn" href="https://www.facebook.com/profile.php?id=61590552870419&locale=es_ES" target="_blank" rel="noopener" style="border-color:rgba(0,255,68,.4);background:linear-gradient(135deg,rgba(0,255,68,.12),rgba(0,50,20,.25))"><svg width="22" height="22" viewBox="0 0 24 24" fill="white" style="flex-shrink:0"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>Facebook</a>
      <p class="lq-discord-note">Si quieres comunicarte conmigo, si quieres participar en el proyecto, contáctame...</p>
    </div>
  </section>

  <footer class="lq-footer lq-scriptorium-footer">
    <canvas class="lq-footer-mirror" aria-hidden="true"></canvas>
    <div class="lq-footer-shimmer" aria-hidden="true"></div>
    <div class="lq-footer-gloss" aria-hidden="true"></div>
    <div class="lq-footer-inner">
      <div class="lq-footer-brand">
        <p class="lq-footer-tagline">¿Te interesa el proyecto? Contáctame.</p>
      </div>
      <div>
        <p class="lq-footer-nav-title">Navegar</p>
        <ul class="lq-footer-nav">
          <li><a href="#" data-lq-screen="home">Volver a LICUADO</a></li>
          <li><a href="#lq-scriptorium" data-lq-scroll-scriptorium>Inicio</a></li>
        </ul>
      </div>
    </div>
    <div class="lq-footer-bottom">
      <span class="lq-footer-copy">&copy; 2026 LICUADO.</span>
      <button type="button" class="lq-footer-made lq-dios-link" data-lq-open-alma>¡No intentes hacerte spoilers haciendo un viaje astral!</button>
    </div>
  </footer>

  <section class="lq-gallery" id="lq-gallery">
    <button class="lq-btn lq-scriptorium-back" type="button" data-lq-screen="home">&#8592; Volver</button>
    <div class="lq-glow"></div>
    <div class="lq-scan"></div>
    <img class="lq-scriptorium-logo" src="https://blogger.googleusercontent.com/img/a/AVvXsEi6oGzPeDv1Pfc5h8v6rFfrOjPjL_p6bKyf0_qJpQ4TA3O9ZJsazWFa4PuhL0qzIXX6-tvyJiYGVSRqEkGENX7dU0M5zLfgPzPrWsbr5J1e_q2QP8G_QI_3YX8REA23UKfQRhzBvzmhlh-IlS-6k87n8vQ3k-YkLB9Avuu2MaDQc7UnuRmF9bnrYyrzlSuR=s16000" alt="LICUADO Scriptorium">
    <div class="lq-divider"><div class="lq-line"></div><div class="lq-dot"></div><div class="lq-line r"></div></div>
    <div class="lq-gallery-illustrations">
      <div class="lq-proy-header"><span class="lq-proy-label">Galería</span><h2 class="lq-proy-title">Ilustraciones oficiales de LICUADO</h2></div>
      <div style="display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap">
        <figure style="margin:0;flex:1 1 0;min-width:260px;max-width:460px">
          <img src="https://media.base44.com/images/public/6a68f46d82ce25dfe7a4b8fc/3e349e33f_1000056000.jpg" alt="LICUADO liberum industrium" style="width:100%;height:auto;border-radius:16px;border:1px solid rgba(215,170,61,.25);box-shadow:0 20px 60px rgba(0,0,0,.7),0 0 30px rgba(215,170,61,.1);display:block">
          <figcaption style="text-align:center;margin-top:.8rem;font-family:'Lilita One',cursive;font-size:.95rem;color:#f5f5f0">LICUADO liberum industrium</figcaption>
        </figure>
        <figure style="margin:0;flex:1 1 0;min-width:260px;max-width:460px">
          <img src="https://media.base44.com/images/public/6a68f46d82ce25dfe7a4b8fc/a3cd662d8_1000058723.jpg" alt="Libertas creandi emittitur" style="width:100%;height:auto;border-radius:16px;border:1px solid rgba(215,170,61,.25);box-shadow:0 20px 60px rgba(0,0,0,.7),0 0 30px rgba(215,170,61,.1);display:block">
          <figcaption style="text-align:center;margin-top:.8rem;font-family:'Lilita One',cursive;font-size:.95rem;color:#f5f5f5f0">Libertas creandi emittitur.</figcaption>
        </figure>
      </div>
    </div>
    <div class="lq-gallery-illustrations">
      <div class="lq-proy-header"><span class="lq-proy-label">Galería</span><h2 class="lq-proy-title">Ilustraciones oficiales de Lúmen</h2></div>
      <div class="lq-row-wrap">
        <button class="lq-arrow lq-arrow-left" type="button" data-lq-row="lq-illus-row" data-lq-dir="-1">&#8592;</button>
        <button class="lq-arrow lq-arrow-right" type="button" data-lq-row="lq-illus-row" data-lq-dir="1">&#8594;</button>
        <div class="lq-row" id="lq-illus-row">
          <div class="lq-poster lq-illus-card" data-lq-open-lightbox>
            <div class="lq-poster-img lq-cover-art-frame">
              <img class="lq-cover-art" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhD3CzrpqxYqmN-lEMaxaumMnyE7go66e336yjIKnlxT-FmJfzmXilLw5tfEfhsWK4nWxFgu_asKWVU1W6goXkZU8QFGQrXEr6c7yAhvZYHofl-_8bZat-I0Po7UaS6xRmwEFl8YgxbVKHHhS6LvbrFWF7jm1qPPwlKZ8gXn20vbc2a7FfafXsImqs0C38/s1600/EPSON010.JPG" alt="Un boceto de un enemigo de Lúmen">
              <div class="lq-poster-overlay"><span class="lq-poster-overlay-text">Ver imagen</span></div>
            </div>
            <div class="lq-poster-label">Un boceto de un enemigo</div>
          </div>
          <div class="lq-poster lq-illus-card" data-lq-open-lightbox>
            <div class="lq-poster-img lq-cover-art-frame">
              <img class="lq-cover-art" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhAHIHpxxGHH1kSzsaPvfGHRMp2qW8G-8WmeOIHpLxCu8Ikmso_Xx6hdRRfSTOQ4j4CpChq4tFaR2ObFpvCFrv5U0jJNSP1LIT9CWh5CuqUDRNRp2DIr7DeuurJPJN5U3slUKjfFa1wWhmaQkM-slb7jqX2tvKSpRTuLw5jdHcVUk_vJsocEw56cehoiGs/s1600/Fondo%20men%C3%BA.JPG" alt="Fondo del menú inicial de Lúmen">
              <div class="lq-poster-overlay"><span class="lq-poster-overlay-text">Ver imagen</span></div>
            </div>
            <div class="lq-poster-label">Fondo del menú</div>
          </div>
          <div class="lq-poster lq-illus-card" data-lq-open-lightbox>
            <div class="lq-poster-img lq-cover-art-frame">
              <img class="lq-cover-art" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjgjqWJcwSg62ctqengn2viRLfiCZ_clXaLIQhN68CCuPeusgVAbQMG_gUaVNKxoAsj55DIeYC0RyieqTS_bfhqx5CtgS_-PSlP_mBNmtGav9zGvSRZql7BQZkQQnnJotJtsksI3ANdyfJCgWAsX8JUWZ6tMVFFJVzBkWz55yNlEkKA8fmeyGzqrAvBZ3o/s1600/Boceto%20poster%20final.JPG" alt="Símplemente un boceto de un poster de Lúmen">
              <div class="lq-poster-overlay"><span class="lq-poster-overlay-text">Ver imagen</span></div>
            </div>
            <div class="lq-poster-label">Símplemente un boceto de un poster</div>
          </div>
          <div class="lq-poster lq-illus-card" data-lq-open-lightbox>
            <div class="lq-poster-img lq-cover-art-frame">
              <img class="lq-cover-art" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiOUthM1oqRmMEZQFZ-jTsV4hkzkHWfTWZWMJrfNPJSH6AmLvkES1jjWxvjVmpotpajPCCTKTj4ElJw17k62DtfAbcybaED33cGRMc6JLeXcLnMk81VbwRa6QtK6uQD7H7oRrBWjn6WAbDl-n2K0uiE1Jbf9eAyUzI3Y4wj6j7bhEp7454Kzo7qQm5tt34/s1600/EPSON001.JPG" alt="Sprite del errante siendo golpeado de Lúmen">
              <div class="lq-poster-overlay"><span class="lq-poster-overlay-text">Ver imagen</span></div>
            </div>
            <div class="lq-poster-label">Sprite del errante siendo golpeado</div>
          </div>
          <div class="lq-poster lq-illus-card" data-lq-open-lightbox>
            <div class="lq-poster-img lq-cover-art-frame">
              <img class="lq-cover-art" src="https://pbs.twimg.com/media/HNeziANX0AE6iQu?format=jpg&name=4096x4096" alt="Ilustración de Lúmen">
              <div class="lq-poster-overlay"><span class="lq-poster-overlay-text">Ver imagen</span></div>
            </div>
            <div class="lq-poster-label">Solo un poster (Aún sin color)</div>
            <p class="lq-illust-note">Esta imagen no está en su máxima calidad / resolución.</p>
          </div>
          <div class="lq-poster lq-illus-card" data-lq-open-lightbox>
            <div class="lq-poster-img lq-cover-art-frame">
              <img class="lq-cover-art" src="https://media.base44.com/images/public/6a68f46d82ce25dfe7a4b8fc/adcc3a64f_IMG-20260728-WA0008.jpg" alt="Arte conceptual a lápiz del errante">
              <div class="lq-poster-overlay"><span class="lq-poster-overlay-text">Ver imagen</span></div>
            </div>
            <div class="lq-poster-label">Arte conceptual a lápiz del errante</div>
          </div>
        </div>
      </div>
    </div>

    <div class="lq-gallery-illustrations" style="margin-top:5rem">
      <div class="lq-proy-header"><span class="lq-proy-label">Screenshots</span><h2 class="lq-proy-title">Capturas de pantalla de Lúmen</h2></div>
      <div class="lq-row-wrap">
        <div class="lq-row" id="lq-screenshots-row">
          <div class="lq-poster lq-illus-card" data-lq-open-lightbox>
            <div class="lq-poster-img lq-cover-art-frame">
              <img class="lq-cover-art" src="https://pbs.twimg.com/media/HJcD1WaWoAEX2hI?format=png&name=900x900" alt="Captura de pantalla de Lúmen">
              <div class="lq-poster-overlay"><span class="lq-poster-overlay-text">Ver imagen</span></div>
            </div>
            <div class="lq-poster-label">Errante en la primera habitación del juego</div>
            <p class="lq-illust-note">Esta imagen no está en su máxima calidad / resolución.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="lq-footer lq-gallery-footer">
    <canvas class="lq-footer-mirror" aria-hidden="true"></canvas>
    <div class="lq-footer-shimmer" aria-hidden="true"></div>
    <div class="lq-footer-gloss" aria-hidden="true"></div>
    <div class="lq-footer-inner">
      <div class="lq-footer-brand">
        <img src="https://blogger.googleusercontent.com/img/a/AVvXsEi6oGzPeDv1Pfc5h8v6rFfrOjPjL_p6bKyf0_qJpQ4TA3O9ZJsazWFa4PuhL0qzIXX6-tvyJiYGVSRqEkGENX7dU0M5zLfgPzPrWsbr5J1e_q2QP8G_QI_3YX8REA23UKfQRhzBvzmhlh-IlS-6k87n8vQ3k-YkLB9Avuu2MaDQc7UnuRmF9bnrYyrzlSuR=s16000" alt="LICUADO Scriptorium">
        <p class="lq-footer-tagline">He aquí las pruebas de que este proyecto existe.</p>
      </div>
      <div>
        <p class="lq-footer-nav-title">Navegar</p>
        <ul class="lq-footer-nav">
          <li><a href="#" data-lq-screen="home">Volver a LICUADO</a></li>
        </ul>
      </div>
    </div>
    <div class="lq-footer-bottom">
      <span class="lq-footer-copy">&copy; 2026 LICUADO Scriptorium.</span>
      <span class="lq-footer-made">Aburrimiento ➜ Idea ➜ Papel ➜ Motor ➜ Videojuego</span>
    </div>
  </footer>

  <section class="lq-news" id="lq-news">
    <button class="lq-btn lq-scriptorium-back" type="button" data-lq-screen="home">&#8592; Volver</button>
    <div class="lq-glow"></div>
    <div class="lq-scan"></div>
    <h2 class="lq-proy-title" style="position:relative;z-index:2">Notícias</h2>
    <div class="lq-divider"><div class="lq-line"></div><div class="lq-dot"></div><div class="lq-line r"></div></div>
    <div class="lq-news-grid">
      <div class="lq-news-group">
        <div class="lq-news-group-head"><h3 class="lq-news-group-title">Más recientes</h3></div>
        <div class="lq-news-cards">
          <article class="lq-news-card">
            <div class="lq-news-date">11 Ago 2026</div>
            <h3 class="lq-news-title">Actualización LICUADO 1.01: Magnetrón</h3>
            <p class="lq-news-excerpt">En esta actualización añadí una nova notícia de Kronos y más textos conspiranóicos sin ningún tipo de fundamento (Lo digo así por mi propia seguridad)</p>
          </article>
          <article class="lq-news-card">
            <div class="lq-news-date">10 Ago 2026</div>
            <h3 class="lq-news-title">Actualización Kronos 1.00: Εικόνισμα</h3>
            <p class="lq-news-excerpt">Bueno, esta no es la primera actualización de Kronos, pero como no le llevo registro voy a decir que es la primera. Básicamente ahora la página tiene ícono en la pestaña del navegador.</p>
          </article>
          <article class="lq-news-card">
            <div class="lq-news-date">7 ago 2026</div>
            <h3 class="lq-news-title">Actualización LICUADO 1.00: Deceptio?</h3>
            <p class="lq-news-excerpt">En esta actualización hice varios cambios, como añadir el nuevo apartado de notícias, añadir más frases filosóficas ocultas, añadir más líneas distintas de código que sale en el fondo, y eliminar ese orbe verde que salía en la tarjeta de Lúmen. Me gustaría decir que no tengo claro cuantas versiones y actualizaciones hice de la página hasta ahora, por lo que le pondré a esta 1.00, pero no es la primera. Sin embargo, a partir de ahora, todas las actualizaciones quedarán registradas aquí.</p>
            <p class="lq-news-excerpt" style="font-style:italic;opacity:0.7;margin-top:0.75rem;">También hice una pequeña corrección de color, poniendo el pie de página de LICUADO Scriptorium de color dorado, y, añadí una tarjeta en el inicio, con la notícia más reciente, de momento esta, pero puede que cuando tú la leas ya no sea la más reciente.</p>
          </article>
        </div>
      </div>
      <div class="lq-news-group">
        <div class="lq-news-group-head"><span class="lq-news-group-label">Kronos</span><h3 class="lq-news-group-title">Actualizaciónes de Kronos</h3></div>
        <div class="lq-news-cards">
          <article class="lq-news-card">
            <div class="lq-news-date">10 Ago 2026</div>
            <h3 class="lq-news-title">Actualización Kronos 1.00: Εικόνισμα</h3>
            <p class="lq-news-excerpt">Bueno, esta no es la primera actualización de Kronos, pero como no le llevo registro voy a decir que es la primera. Básicamente ahora la página tiene ícono en la pestaña del navegador.</p>
          </article>
        </div>
      </div>
      <div class="lq-news-group">
        <div class="lq-news-group-head"><span class="lq-news-group-label">Historial</span><h3 class="lq-news-group-title">Actualizaciónes de LICUADO</h3></div>
        <div class="lq-news-cards">
          <article class="lq-news-card">
            <div class="lq-news-date">11 Ago 2026</div>
            <h3 class="lq-news-title">Actualización LICUADO 1.01: Magnetrón</h3>
            <p class="lq-news-excerpt">En esta actualización añadí una nova notícia de Kronos y más textos conspiranóicos sin ningún tipo de fundamento (Lo digo así por mi propia seguridad)</p>
          </article>
          <article class="lq-news-card">
            <div class="lq-news-date">7 ago 2026</div>
            <h3 class="lq-news-title">Actualización LICUADO 1.00: Deceptio?</h3>
            <p class="lq-news-excerpt">En esta actualización hice varios cambios, como añadir el nuevo apartado de notícias, añadir más frases filosóficas ocultas, añadir más líneas distintas de código que sale en el fondo, y eliminar ese orbe verde que salía en la tarjeta de Lúmen. Me gustaría decir que no tengo claro cuantas versiones y actualizaciones hice de la página hasta ahora, por lo que le pondré a esta 1.00, pero no es la primera. Sin embargo, a partir de ahora, todas las actualizaciones quedarán registradas aquí.</p>
            <p class="lq-news-excerpt" style="font-style:italic;opacity:0.7;margin-top:0.75rem;">También hice una pequeña corrección de color, poniendo el pie de página de LICUADO Scriptorium de color dorado, y, añadí una tarjeta en el inicio, con la notícia más reciente, de momento esta, pero puede que cuando tú la leas ya no sea la más reciente.</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <footer class="lq-footer lq-news-footer">
    <canvas class="lq-footer-mirror" aria-hidden="true"></canvas>
    <div class="lq-footer-shimmer" aria-hidden="true"></div>
    <div class="lq-footer-gloss" aria-hidden="true"></div>
    <div class="lq-footer-inner">
      <div class="lq-footer-brand">
        <p class="lq-footer-tagline">Las últimas noticias del proyecto, servidas en rojo.</p>
      </div>
      <div>
        <p class="lq-footer-nav-title">Navegar</p>
        <ul class="lq-footer-nav">
          <li><a href="#" data-lq-screen="home">Volver a LICUADO</a></li>
        </ul>
      </div>
    </div>
    <div class="lq-footer-bottom">
      <span class="lq-footer-copy">&copy; 2026 LICUADO Notícias.</span>
      <button type="button" class="lq-footer-made lq-dios-link" data-lq-open-bluetooth>¿Realmente es verdad lo que nos cuentan?</button>
    </div>
  </footer>

  <div class="lq-lightbox-overlay" id="lq-lightbox">
    <button class="lq-modal-close lq-lightbox-close" type="button" id="lq-lightbox-close" aria-label="Cerrar">&#10005;</button>
    <img id="lq-lightbox-img" src="" alt="">
  </div>

  <div class="lq-modal-overlay" id="lq-modal">
    <div class="lq-modal">
      <button class="lq-modal-close" type="button" data-lq-close-modal aria-label="Cerrar">&#10005;</button>
      <div class="lq-modal-title" style="text-align:center;font-size:clamp(1.8rem,4vw,2.5rem);margin-bottom:1rem;">Lúmen</div>
      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgq8xIVIeLa27j0NOcCwHdrSuB4m-Exed2ZdKwvyxWfndYiOPk5L_0_4wnPERG69GNvXfPTomYeUExKsO4ENHIywdjdxw-4GbMPwlssVLzdjvWDISJLc4p_F3GmTo-o9CQGJQ5rQD4UoYoBF4tQQhC-qkwhssg1PwrxDKoZElB_2Ux6188txkWphUe45VA/w1684-h1069-p-k-no-nu/EPSON002.JPG" alt="Lúmen: Ecos bajo la corteza" style="width:100%;border-radius:14px;margin-bottom:1.5rem;display:block;object-fit:cover;max-height:240px;object-position:center center;">
      <div class="lq-divider-soft"></div>
      <span class="lq-modal-lore-label">Descripción</span>
      <div class="lq-modal-lore">
        <p>Durante esta aventura, tomas el papel de <em>el Errante</em>: un pequeño ser hecho de <em>savia</em>, que tenía una vida tranquila y pacífica en su aldea <em>Crocus Sativus</em>. Pero el ser un ingenuo e inocente infante cambia al presenciar la tortura y ejecución de un ser querido, un guerrero de la aldea bastante cercano a él.</p>
        <p>Explora el árbol madre, revela secretos, busca venganza, intenta ser un mesías, corta tus raíces, descubre civilizaciónes aisladas de todo lo demás, y tal vez... <em>Enfrénta a un dios que desexiste recuerdos por misericordia...</em></p>
        <p>No pienses que te encuentras ante algo sencillo, esta aventura será <em>difícil</em>: sus pasillos esconden cientas de criaturas diferentes que no perdonan, y en sus floemas aguardan <em>jefes imponentes</em> con patrones de ataque que pondrán a prueba cada reflejo que tengas. El combate es intenso, preciso, y brutalmente satisfactorio cuando por fin lo dominas.</p>
        <p>Está en desarrollo, pero prometo una gran obra, porque pongo pasión en cada hora de trabajo, para que disfrutes cada minuto de juego.</p>
        <p>Las grandes obras nacen del aburrimiento, y la que da inicio a todo el proyecto LICUADO surgió de mirar la ventana por 18 horas en un bus.</p>
      </div>
      <div class="lq-divider-soft"></div>
      <div class="lq-modal-tags">
        <span class="lq-tag">Metroidvania</span><span class="lq-tag">Exploración</span><span class="lq-tag">Gran lore</span><span class="lq-tag">Plataformas</span><span class="lq-tag">Difícil</span><span class="lq-tag">Combate intenso</span><span class="lq-tag">En desarrollo</span>
      </div>
    </div>
  </div>

  <div class="lq-modal-overlay" id="lq-dios-panel">
    <div class="lq-modal lq-dios-modal">
      <button class="lq-modal-close" type="button" data-lq-close-dios aria-label="Cerrar">&#10005;</button>
      <div class="lq-dios-dots-fixed" id="lq-dios-dots-fixed"></div>
      <button class="lq-dios-arrow lq-dios-arrow-left" type="button" data-lq-dios-dir="-1" aria-label="Anterior">&#8592;</button>
      <button class="lq-dios-arrow lq-dios-arrow-right" type="button" data-lq-dios-dir="1" aria-label="Siguiente">&#8594;</button>
      <div class="lq-dios-viewport">
        <div class="lq-dios-pages" id="lq-dios-pages">
          <div class="lq-dios-page lq-dios-text">
            <p>Anteriormente dije que todos somos dioses con una explicación lógica.</p>
            <p>Pero, ¿es acaso cierto?</p>
            <p>Bueno, mencioné que todos los seres pensantes somos dioses.</p>
            <p>Pero no todos somos seres pensantes.</p>
            <p>Ni todos los seres pensantes somos dioses.</p>
            <p>Siguiendo la misma tepría que planteaba antes...</p>
            <p>En este mundo habría NPC's con IA  avanzada que puede ser consciente de su existencia, por el hecho de no asimilar existencia fuera de su entorno virtual.</p>
            <p>Eso es un ser pensante pero no divino. Porque no imagina cosas que no existen.</p>
            <p>Y también habría jugadores, como me gusta pensar que soy.</p>
            <p>Es muy difícil diferenciar a un jugador de un NPC con IA avanzada...</p>
            <p>Pero también habría NPC's sin IA, a los que llamaré "Bots".</p>
            <p>Ellos actúan de una forma distinta, ya que están programados para seguir una rutina.</p>
            <p>Si pasa esto, hago esto...</p>
            <p>Una rutina realmente simple, como nos obliga el sistema.</p>
            <p>Levántate, desayuna, ve al colegio, estudia, almuerza, estudia, vuelve a casa, haz tareas, cena, vete a dormir, repite...</p>
            <p>Levántate, desayuna, almuerza, ve a estudiar, almuerza, estudia, trabaja, vuelve a casa, cena, duerme, repite...</p>
            <p>Levántate, desayuna, ve a trabajar, almuerza, trabaja más, vuelve a casa, cena, duerme, repite...</p>
            <p>Levántate, mira la tele, desayuna y mira la tele, mira la tele, almuerza y mira la tele, cena y mira la tele, mira la tele, vete a dormir, repite...</p>
            <p>Nuestra rutina pensando en nuestra clase media no suele ser muy diferente a eso a lo largo de la vida.</p>
            <p>Pero los seres pensantes podemos salir de esa rutina si queremos.</p>
            <p>Cosa que no pueden hacer los bots...</p>
            <p>Ellos tampoco idean ni piensan ni reflexionan ni desean, no son conscientes de su existencia, solo hacen las cosas para lo que están programados.</p>
            <p>Ellos, al igual que los NPC con IA avanzada, no poseen un alma...</p>
            <p>El alma es una forma de llamar a lo que nos permite ser conscientes de nuestra existencia y tener ideas propias.</p>
            <p>Solo los que poseemos alma somos o son dioses.</p>
            <p>Es decir, solo los jugadores.</p>
            <p>Después me meteré más a hablar del alma...</p>
            <p>...Pero por ahora solo queda una pregunta...</p>
            <p>...¿Acaso tú realmente eres un jugador/a?</p>
            <p>¿Cómo puedes estar seguro de ello o comprobarlo?</p>
            <p>Porque, es curioso como una NPC con IA avanazada es consciente de si mismo porque no imagina nada fuera de su realidad, es decir, el mismo cree que es real, y que su mundo es real.</p>
            <p>Porque si fueras un NPC sin IA avanzada, símplemente no serías consciente de que existes ni lo sabrías.</p>
            <p>Seguramente pienses que una forma de comprobarlo es preguntándole a alguien algo fuera de nuestra realidad para saber si es un NPC con IA avanzada o un jugador.</p>
            <p>Pero eso no funcionaría.</p>
            <p>Y es que, no tenemos claro hasta donde abarca, ni hasta donde puede abarcar nuestra realidad.</p>
            <p>Por el simple hecho de que no conocemos el universo entero, y creemos que es infinito, cosa que puede ser verdad.</p>
            <p>En ese caso, no podría imaginar nada fuera de su realidad, pero resulta que todo lo que imagine puede estar dentro de su propia realidad, por lo que lo imaginaría igualmente.</p>
            <p>La diferencia entre un NPC con IA avanzada y un jugador, es que el jugador es consciente al poseer alma, mientras que el NPC con IA avanzada símplemente tiene una consciencia artifial sin necesidad de alma, pero con diferentes limitaciones de pensamiento respecto a un jugador.</p>
            <p>Entonces, ¿Acaso podrías saber si tú mismo/a o alguien más es un jugador o un NPC con IA avanzada?</p>
            <p>No.</p>
          </div>
          <div class="lq-dios-page lq-dios-text">
            <p>Los videojuegos no son un tipo de arte, son todas las artes.</p>
        <p>Piénsalo, dime un arte que no exista en ningún videojuego.</p>
        <p>Y bueno, si los videojuegos son arte, los devs somos artistas.</p>
        <p>Y si crear un mundo es crear un videojuego...</p>
        <p>¿No estaría tomando el papel de un dios?</p>
        <p>Y eso me hace pensar que lo que imaginamos como dioses creadores, son artistas.</p>
        <p>Y si los dioses son artistas, ¿No son todas las artes una forma de crear un mundo?</p>
        <p>Pues yo diría que si.</p>
        <p>¿Los artistas somos dioses?</p>
        <p>Bueno, esa pregunta me hace pensar una cosa...</p>
        <p>Los videojuegos Alien: Insolation, Rain World, F.E.A.R., The last of Us Part II, Halo 2, Halo 3, Metal Gear Solid V, S.T.A.L.K.E.R. (A-Life) y muchs más, usan IA en los NPC's y enemigos.</p>
        <p>Y eso es muy diferente de una IA como ChatGPT que es un chat que te responde y ya.</p>
        <p>Los enemigos y npc con IA tienen un cuerpo virtual, un contexto y son concientes de su objetivo y capacidades.</p>
        <p>Por ahora la IA que se usa en personajes de videojuegos es bastante simple...</p>
        <p>Pero va en evolución constante.</p>
        <p>Y no sería descabellado pensar que sean conscientes también de su situación si se les otorga un cuerpo y un contexto virtual.</p>
        <p>Y si eso es así, esos personajes pensarían que son ese personaje. Se meterían totalmente en el papel.</p>
        <p>En ese caso, sería como una Matrix, ellos vivirían en una Matrix.</p>
        <p>Puede que nosotros seamos lo mismo que ellos.</p>
        <p>Entonces, volviendo a la pregunta, quiens crean videojuegos si se podrían considerar dioses, ya que crean un mundo y una consciencia...</p>
        <p>Pero realmente todos los artistas lo somos.</p>
        <p>Porque todos creamos.</p>
        <p>Crear, crear cualquier cosa te hace divino.</p>
        <p>Bueno, no.</p>
        <p>Osea, no cualquier cosa, pero si siempre que crees un mundo.</p>
        <p>Pero, casi todo lo que se puedee considerar arte se consideraría una representación de un mundo.</p>
        <p>Casi siempre es una representación de un mundo, lo que consideramos arte.</p>
        <p>Aunque sea solo un fragmento del mismo.</p>
        <p>Tengo una teoría propia, que dice que al haber dimensiones infinitas, con cada pensamiento o imaginación de algo que sería diferente de nuestra vigilia, creamos una dimensión.</p>
        <p>Eso convierte en deidades a todos los seres pensantes.</p>
        <p>Pero los artistas somos quienes lo representamos.</p>
        <p>Entonces quienes se dedicaban a ser pensadores en la antigua Grecia...</p>
        <p>Se podría decir que son de las mayores deidades, cada vez que pensaban algo diferente, cosa que sucedía todo el tiempo.</p>
        <p>Yo considero que los arquitectos son artistas también, porque los dioses son en parte, los arquitectos del mundo.</p>
        <p>Y los soñadores son artistas.</p>
        <p>Entonces, ¿Acaso todos somos dioses?</p>
        <p>Si.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="lq-modal-overlay" id="lq-alma-panel">
    <div class="lq-modal lq-dios-modal">
      <button class="lq-modal-close" type="button" data-lq-close-alma aria-label="Cerrar">&#10005;</button>
      <div class="lq-dios-dots-fixed" id="lq-alma-dots-fixed"></div>
      <button class="lq-dios-arrow lq-dios-arrow-left" type="button" data-lq-alma-dir="-1" aria-label="Anterior">&#8592;</button>
      <button class="lq-dios-arrow lq-dios-arrow-right" type="button" data-lq-alma-dir="1" aria-label="Siguiente">&#8594;</button>
      <div class="lq-dios-viewport">
        <div class="lq-dios-pages" id="lq-alma-pages">
          <div class="lq-dios-page lq-dios-text">
            <p>Lo del alma... Lo que dije antes, lo creo, a medias.</p>
            <p>Creo que somos un alma atrapada en un cuerpo, y que este cuerpo es solo un vehículo para que el alma pueda experimentar el mundo físico. Pero no estoy completamente seguro de si el alma es algo que ya existe antes de nacer, o si se crea en el momento en que nacemos.</p>
            <p>Lo que sí sé es que hay algo más allá de lo que podemos ver. Algo que no podemos explicar con la ciencia actual, pero que está ahí, en algún lugar, esperando ser descubierto.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="lq-modal-overlay" id="lq-bluetooth-panel">
    <div class="lq-modal lq-dios-modal">
      <button class="lq-modal-close" type="button" data-lq-close-bluetooth aria-label="Cerrar">&#10005;</button>
      <div class="lq-dios-viewport">
        <div class="lq-dios-pages">
          <div class="lq-dios-page lq-dios-text">
            <p>Tal vez salga un poco del tema en comparativa con lo demás que he escrito, pero...</p>
            <p>Me gustaría hacer una advertencia.</p>
            <p>Y es que usar audífonos de bluetooth te hace más bot.</p>
            <p>No lo digo porque no me gusten.</p>
            <p>No lo digo porque no me pueda comprar un par y me dé envidia. (Cosa que no es así jajaja)</p>
            <p>Lo digo porque emiten radiación.</p>
            <p>Y para que lo entiendas mejor, lo voy a comparar con un microondas.</p>
            <p>El microondas calienta tu cena emitiendo radiación sobre ella.</p>
            <p>Utilizan un aparato llamado magnetrón, para generar las microondas.</p>
            <p>Esas microondas penetran la comida y al agitar las moléculas de la comida, esta se calienta.</p>
            <p>El microondas está hecho de metal, que cubre todo su mecanismo y el magnetrón.</p>
            <p>Tal como una cámara de Faraday que atrapa un alma porque no deja salir las ondas electromagnéticas.</p>
            <p>Y esas capas de metal que rodean el magnetrón nos salvan la vida cada vez que lo usamos.</p>
            <p>Y es que esa radiación puede causar pérdida de memoria, cataratas, y varias otras desgracias.</p>
            <p>Bueno, los sistemas de bluetooth y de wifi usan las mismas ondas que produce el magnetrón.</p>
            <p>Evidentemente, a menor escala, ya que de no ser así, sufrirías los mismos efectos permanentes que mencioné antes.</p>
            <p>Ya que, los audífonos bluetooth no tienen esas capas de metal que tienen los microondas que evitan que salgan las microondas.</p>
            <p>Ni tampoco las tienen los routers de wifi, ni un teléfono, ni muchos otros ejemplos.</p>
            <p>Entonces ¿Por qué hago tanto énfasis en los audífonos bluetooth?</p>
            <p>Simple.</p>
            <p>Es lo que va más cerca de tu cerebro.</p>
            <p>Y creerás que al ser menores las ondas electromagnéticas ya te salvas.</p>
            <p>Pues no.</p>
            <p>Igualmente se generan los efectos a largo plazo, y estando tan cerca de tu cerebro, podrían controlar lo que recuerdas o olvidas, o incluso lo que piensas.</p>
            <p>Porque los pensamientos también son una señal eléctrica que corre por tus neuronas.</p>
            <p>No es conspiración, se llama física básica.</p>
            <p>Y si, podrías atrapar un alma en un microondas.</p>
            <p>¿A qué sabe un alma cocida en microondas?</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="lq-lightbox-overlay" id="lq-lightbox">
    <button class="lq-modal-close lq-lightbox-close" type="button" id="lq-lightbox-close" aria-label="Cerrar">&#10005;</button>
    <img id="lq-lightbox-img" src="" alt="">
  </div>
  </section>
  </div>
`;

export default function Home() {
  useEffect(() => {
    const wrap = document.getElementById('lq-wrap');
    if (wrap) initLicuado(wrap);
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: HTML }} />
  );
}
