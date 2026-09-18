/* Isaac & Jefferson | Advocacia Estratégica — script.js (Vanilla ES6) */
(() => {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");
  const WA = "https://wa.me/5521993114685";

  /* ---------- 1. Navbar: transparente -> sólida após 80px ---------- */
  const nav = document.getElementById("navbar");
  if (nav) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        nav.classList.toggle("is-solid", window.scrollY > 80);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 1b. Drawer mobile (menu hambúrguer) ---------- */
  const burger = document.getElementById("navBurger");
  const drawer = document.getElementById("drawer");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const drawerClose = document.getElementById("drawerClose");

  if (burger && drawer && drawerOverlay) {
    const openDrawer = () => {
      drawer.classList.add("is-open");
      drawerOverlay.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
      document.body.classList.add("drawer-open");
    };

    const closeDrawer = () => {
      drawer.classList.remove("is-open");
      drawerOverlay.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("drawer-open");
    };

    burger.addEventListener("click", openDrawer);
    drawerClose?.addEventListener("click", closeDrawer);
    drawerOverlay.addEventListener("click", closeDrawer);
    drawer.querySelectorAll(".drawer__link, .drawer__cta").forEach((link) => {
      link.addEventListener("click", closeDrawer);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer();
    });
  }

  /* ---------- 2. Acordeões (áreas e FAQ) ---------- */
  document.querySelectorAll("[data-accordion]").forEach((acc) => {
    const items = Array.from(acc.querySelectorAll(".acc__item"));

    const close = (item) => {
      const btn = item.querySelector("button");
      const panel = item.querySelector(".acc__panel");
      item.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      panel.style.maxHeight = "0px";
    };

    const open = (item) => {
      const btn = item.querySelector("button");
      const panel = item.querySelector(".acc__panel");
      item.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = panel.scrollHeight + "px";
    };

    items.forEach((item) => {
      const btn = item.querySelector("button");
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        items.forEach(close);
        if (!isOpen) open(item);
      });
    });

    // recalcula a altura do item aberto ao redimensionar
    window.addEventListener("resize", () => {
      const openItem = acc.querySelector(".acc__item.is-open");
      if (openItem) openItem.querySelector(".acc__panel").style.maxHeight = openItem.querySelector(".acc__panel").scrollHeight + "px";
    });

    // primeira área já aberta (somente no acordeão de serviços)
    if (!acc.hasAttribute("data-stagger") && items[0]) open(items[0]);
  });

  /* ---------- 2a. Áreas de atuação: modais de serviços por card ---------- */
  const areaOverlay = document.getElementById("areaModalOverlay");
  const areaCards = document.querySelectorAll("[data-area-open]");
  const areaModals = document.querySelectorAll("[data-area-modal]");

  if (areaOverlay && areaCards.length && areaModals.length) {
    let activeModal = null;

    const closeAreaModal = () => {
      if (!activeModal) return;
      activeModal.classList.remove("is-open");
      activeModal.setAttribute("aria-hidden", "true");
      areaOverlay.classList.remove("is-open");
      document.body.classList.remove("area-modal-open");
      activeModal = null;
    };

    const openAreaModal = (id) => {
      const modal = document.getElementById(id);
      if (!modal) return;
      closeAreaModal();
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      areaOverlay.classList.add("is-open");
      document.body.classList.add("area-modal-open");
      activeModal = modal;
    };

    areaCards.forEach((card) => {
      card.addEventListener("click", () => openAreaModal(card.getAttribute("data-area-open")));
    });
    areaModals.forEach((modal) => {
      modal.querySelector("[data-area-close]")?.addEventListener("click", closeAreaModal);
    });
    areaOverlay.addEventListener("click", closeAreaModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && activeModal) closeAreaModal();
    });
  }

  /* ---------- 2b-1. Sócios: mini-carrossel automático de fotos por card ---------- */
  document.querySelectorAll("[data-team-carousel]").forEach((card) => {
    const slides = Array.from(card.querySelectorAll(".team__slides img"));
    const dots = Array.from(card.querySelectorAll(".team__dots button"));
    if (slides.length < 2) return;
    let index = 0;
    setInterval(() => {
      slides[index].classList.remove("is-active");
      dots[index]?.classList.remove("is-active");
      dots[index]?.setAttribute("aria-selected", "false");
      index = (index + 1) % slides.length;
      slides[index].classList.add("is-active");
      dots[index]?.classList.add("is-active");
      dots[index]?.setAttribute("aria-selected", "true");
    }, 6000);
  });

  /* ---------- 2c. Vídeos de conteúdo: play/pause, som e expandir por card ---------- */
  const vidCards = document.querySelectorAll("[data-vid-card]");
  if (vidCards.length) {
    let currentCard = null;

    const stopCard = (card, reset) => {
      const video = card.querySelector(".vid-card__video");
      video.pause();
      if (reset) video.currentTime = 0;
      card.classList.remove("is-playing");
      if (currentCard === card) currentCard = null;
    };

    vidCards.forEach((card) => {
      const video = card.querySelector(".vid-card__video");
      const playBtn = card.querySelector(".vid-card__play");
      const muteBtn = card.querySelector("[data-vid-mute]");
      const expandBtn = card.querySelector("[data-vid-expand]");

      playBtn.addEventListener("click", () => {
        if (currentCard && currentCard !== card) stopCard(currentCard, true);
        video.muted = false;
        video.play().catch(() => {});
        card.classList.add("is-playing");
        muteBtn.textContent = "🔊";
        currentCard = card;
      });

      muteBtn.addEventListener("click", () => {
        video.muted = !video.muted;
        muteBtn.textContent = video.muted ? "🔇" : "🔊";
      });

      expandBtn.addEventListener("click", () => {
        if (video.requestFullscreen) video.requestFullscreen();
        else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
      });

      video.addEventListener("ended", () => stopCard(card, true));
    });

    const videosSection = document.getElementById("videos");
    if (videosSection && "IntersectionObserver" in window) {
      const sectionIo = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && currentCard) stopCard(currentCard, true);
        });
      }, { threshold: 0 });
      sectionIo.observe(videosSection);
    }
  }

  /* ---------- 2b. Hero: glow dourado quando o vídeo começa a tocar ---------- */
  const heroVideo = document.querySelector(".hero__video");
  if (heroVideo) {
    const figure = heroVideo.closest(".hero__figure");
    heroVideo.addEventListener("playing", () => figure.classList.add("is-glowing"), { once: true });
    // fallback: se o vídeo não carregar (sem fonte ainda), mantém só o poster, sem glow
    heroVideo.addEventListener("error", () => figure.classList.remove("is-glowing"));

    const heroMuteBtn = document.querySelector("[data-hero-mute]");
    const heroExpandBtn = document.querySelector("[data-hero-expand]");
    heroMuteBtn?.addEventListener("click", () => {
      heroVideo.muted = !heroVideo.muted;
      heroMuteBtn.textContent = heroVideo.muted ? "🔇" : "🔊";
    });
    heroExpandBtn?.addEventListener("click", () => {
      if (heroVideo.requestFullscreen) heroVideo.requestFullscreen();
      else if (heroVideo.webkitRequestFullscreen) heroVideo.webkitRequestFullscreen();
    });
  }

  /* ---------- 3. Carrossel de depoimentos (fade + translateX) ---------- */
  const QUOTES = [
    { name: "Samuel André", when: "há um ano", text: "O Dr. Isaac Éderson é muito atencioso e atento aos mínimos detalhes, faz seu trabalho com muita competência e honestidade. Ele atua com excelência na área criminal e familiar." },
    { name: "Mike Azevedo", when: "há um ano", text: "Na região da zona oeste esse é um dos melhores advogados que temos, a hora que for, você precisou, ele vai te atender." },
    { name: "Monique Justo", when: "há um ano", text: "Precisei de suporte em um momento difícil, e a seriedade e sensibilidade deste advogado me fez ter suporte e orientação de maneira presente." },
    { name: "Bela Oyá", when: "há um ano", text: "Recomendo pelo profissionalismo, transparência e atenção, buscando sempre manter o cliente bem informado, além do excelente atendimento e dedicação." },
    { name: "Leandro Justo", when: "há um ano", text: "Experiência ótima, bom atendimento, esclarecimento de dúvidas de uma forma simples e homogênea. Satisfação nota 1.000, muito obrigado!" },
    { name: "Renato Fortes", when: "há 11 meses", text: "Um ótimo advogado, e um bom amigo. Parabéns e obrigado." },
    { name: "Marcelo Pereira", when: "há 11 meses", text: "Muito brabo, só tenho a agradecer. Excelente profissional." },
    { name: "Diogo Seconne", when: "há um ano", text: "Profissionais de qualidade, atendimento diferenciado, podem acionar: não irão se arrepender!" },
    { name: "Beatriz Oliveira", when: "há um ano", text: "Ótimo advogado! Excelente trabalho." },
    { name: "Luiz Thiago de Araújo Neves", when: "há um ano", text: "Ótimo trabalho, recomendo!" },
    { name: "Kim Felipe", when: "há um ano", text: "Ótimo profissional!" }
  ];

  const wall = document.querySelector("[data-wall]");
  if (wall) {
    const cardHTML = (q) => `
      <figure class="wall__card">
        <span class="wall__quote-mark" aria-hidden="true">“</span>
        <blockquote class="wall__text">${q.text}</blockquote>
        <figcaption class="wall__foot">
          <span class="wall__stars" aria-hidden="true">★★★★★</span>
          <span class="wall__name">${q.name}</span>
          <span class="wall__when">${q.when}</span>
        </figcaption>
      </figure>
    `;
    wall.innerHTML = `
      <div class="wall__seq">${QUOTES.map(cardHTML).join("")}</div>
      <div class="wall__seq" aria-hidden="true">${QUOTES.map(cardHTML).join("")}</div>
    `;
  }

  /* ---------- 4. Revelação no scroll (IntersectionObserver) ---------- */
  const revealables = Array.from(document.querySelectorAll(".reveal"));
  if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        obs.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    revealables.forEach((el) => io.observe(el));
    // fail-open: se o observer não disparar (iframes, contextos offscreen), mostra tudo
    setTimeout(() => {
      document.documentElement.classList.add("reveal-off");
      revealables.forEach((el) => el.classList.add("is-visible"));
    }, 1200);

    // stagger das perguntas do FAQ (60ms entre itens)
    // PageSpeed fix: usa classList em vez de style inline em loop (evita forced reflow)
    const faqAcc = document.querySelector("[data-stagger]");
    if (faqAcc) {
      const items = Array.from(faqAcc.querySelectorAll(".acc__item"));
      faqAcc.classList.add("js-stagger");
      const faqIo = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          obs.unobserve(e.target);
          items.forEach((el, idx) => {
            setTimeout(() => el.classList.add("is-revealed"), idx * 60);
          });
        });
      }, { threshold: 0.1 });
      faqIo.observe(faqAcc);
      // fail-open: garante visibilidade mesmo se o IO não disparar
      setTimeout(() => {
        faqAcc.classList.remove("js-stagger");
        items.forEach((el) => el.classList.add("is-revealed"));
      }, 1400);
    }
  }

  /* ---------- 5. Formulário: máscara de telefone + validação real ---------- */
  const form = document.getElementById("form-contato");
  if (form) {
    const success = form.querySelector("[data-form-success]");
    const tel = form.elements.telefone;

    tel.addEventListener("input", () => {
      const d = tel.value.replace(/\D/g, "").slice(0, 11);
      let out = d;
      if (d.length > 2) out = "(" + d.slice(0, 2) + ") " + d.slice(2);
      if (d.length > 7) out = "(" + d.slice(0, 2) + ") " + d.slice(2, d.length > 10 ? 7 : 6) + "-" + d.slice(d.length > 10 ? 7 : 6);
      tel.value = out;
    });

    const rules = {
      nome: (v) => (v.trim().length >= 3 ? "" : "Informe seu nome completo."),
      telefone: (v) => {
        const d = v.replace(/\D/g, "");
        return d.length >= 10 && d.length <= 11 ? "" : "Informe um WhatsApp com DDD.";
      },
      area: (v) => (v ? "" : "Selecione a área do seu caso."),
      mensagem: (v) => (v.trim().length >= 15 ? "" : "Descreva o caso em pelo menos uma frase.")
    };

    const showError = (name, msg) => {
      const field = form.elements[name];
      const box = form.querySelector('[data-error-for="' + name + '"]');
      box.textContent = msg;
      box.classList.toggle("is-shown", Boolean(msg));
      if (msg) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    };

    Object.keys(rules).forEach((name) => {
      form.elements[name].addEventListener("blur", () => showError(name, rules[name](form.elements[name].value)));
      form.elements[name].addEventListener("input", () => showError(name, ""));
      form.elements[name].addEventListener("change", () => showError(name, ""));
    });

    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      let first = null;
      Object.keys(rules).forEach((name) => {
        const msg = rules[name](form.elements[name].value);
        showError(name, msg);
        if (msg && !first) first = form.elements[name];
      });
      if (first) {
        success.classList.remove("is-shown");
        first.focus();
        return;
      }
      const f = form.elements;
      let msg = "Olá, me chamo " + f.nome.value.trim() + ", vim através do site e gostaria de uma informação.\n";
      msg += "\n- Telefone: " + f.telefone.value.trim();
      msg += "\n- Área Jurídica: " + f.area.value;
      if (f.mensagem.value.trim()) msg += "\n- Descrição do caso: " + f.mensagem.value.trim();
      window.open(WA + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
      success.textContent = "Tudo certo. Abrimos o WhatsApp com o seu resumo. Se não abrir, chame no (21) 99311-4685.";
      success.classList.add("is-shown");
      form.reset();
    });
  }
})();

/* ──────────────────────────────────────────────
   WHATSAPP PREMIUM — Balão flutuante (AG5 V4)

   Timeline:
     • t=0s  → usuário chega na 3ª seção (areas) → botão verde aparece imediatamente
     • t=25s → balão sobe ("digitando..." por 2.5s → mensagem real)
     • t=40s → balão some automaticamente (visível por 15s)

   Nicho rigoroso (advocacia — OAB Provimento 205/2021): MODO_COMPLIANCE = true,
   sem badge de notificação e sem "Online agora".
─────────────────────────────────────────────── */
(function initWaPremium() {
  const MODO_COMPLIANCE = true; // advocacia = nicho rigoroso → sem badge

  const bubble        = document.getElementById('wa-message-bubble');
  const typing        = document.getElementById('wa-typing');
  const realMessage   = document.getElementById('wa-real-message');
  const badge         = document.getElementById('wa-notification');
  const closeBtn      = document.getElementById('wa-close-btn');
  const mainBtn       = document.getElementById('wa-main-btn');
  const targetSection = document.getElementById('areas');

  if (!bubble || !typing || !realMessage || !closeBtn || !mainBtn || !targetSection) return;

  const DELAY_BALAO            = 25000;
  const DURATION_TYPING        = 2500;
  const DURATION_BALAO_VISIVEL = 15000;
  const DELAY_BADGE_APOS_SUMIR = 5000;

  let triggered = false;
  let autoHideTimer = null;
  let badgeTimer = null;
  let userClosed = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        mainBtn.classList.add('visible');

        setTimeout(() => {
          if (userClosed) return;
          bubble.classList.add('show');

          setTimeout(() => {
            if (userClosed) return;
            typing.classList.add('is-hidden');
            realMessage.classList.add('is-visible');
            requestAnimationFrame(() => realMessage.classList.add('is-in'));
          }, DURATION_TYPING);

          autoHideTimer = setTimeout(() => {
            if (userClosed) return;
            bubble.classList.remove('show');

            if (!MODO_COMPLIANCE && badge) {
              badgeTimer = setTimeout(() => {
                if (userClosed) return;
                badge.classList.add('show');
              }, DELAY_BADGE_APOS_SUMIR);
            }
          }, DURATION_BALAO_VISIVEL);
        }, DELAY_BALAO);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(targetSection);

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    userClosed = true;
    bubble.classList.remove('show');
    if (autoHideTimer) clearTimeout(autoHideTimer);
    if (badgeTimer) clearTimeout(badgeTimer);
    if (!MODO_COMPLIANCE && badge) {
      setTimeout(() => { badge.classList.add('show'); }, DELAY_BADGE_APOS_SUMIR);
    }
  });

  mainBtn.addEventListener('click', () => {
    bubble.classList.remove('show');
    if (badge) badge.classList.remove('show');
    if (autoHideTimer) clearTimeout(autoHideTimer);
    if (badgeTimer) clearTimeout(badgeTimer);
  });
})();
