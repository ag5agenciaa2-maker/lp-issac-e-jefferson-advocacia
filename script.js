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

  const carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    const slide = carousel.querySelector("[data-slide]");
    const elText = carousel.querySelector("[data-quote-text]");
    const elName = carousel.querySelector("[data-quote-name]");
    const elMeta = carousel.querySelector("[data-quote-meta]");
    const elCount = carousel.querySelector("[data-quote-counter]");
    const pad = (n) => String(n).padStart(2, "0");
    let i = 0;
    let busy = false;
    let timer = null;

    const paint = () => {
      const q = QUOTES[i];
      elText.textContent = "“" + q.text + "”";
      elName.textContent = q.name;
      elMeta.textContent = q.when + " · Avaliação 5★ no Google";
      elCount.textContent = pad(i + 1) + " / " + pad(QUOTES.length);
    };

    const step = (dir) => {
      if (busy) return;
      i = (i + dir + QUOTES.length) % QUOTES.length;
      if (reduced) { paint(); return; }
      busy = true;
      slide.classList.add("is-out");
      setTimeout(() => {
        paint();
        slide.classList.remove("is-out");
        busy = false;
      }, 220);
    };

    const autoplay = () => {
      clearInterval(timer);
      timer = setInterval(() => step(1), 7000);
    };

    paint();
    carousel.querySelector("[data-prev]").addEventListener("click", () => { step(-1); autoplay(); });
    carousel.querySelector("[data-next]").addEventListener("click", () => { step(1); autoplay(); });
    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener("mouseleave", autoplay);

    // inicia o autoplay somente quando a seção entra na viewport
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => (e.isIntersecting ? autoplay() : clearInterval(timer)));
      }, { threshold: 0.3 });
      io.observe(carousel);
    } else {
      autoplay();
    }
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
    const faqAcc = document.querySelector("[data-stagger]");
    if (faqAcc) {
      const items = Array.from(faqAcc.querySelectorAll(".acc__item"));
      items.forEach((el) => { el.style.opacity = "0"; el.style.transform = "translateY(25px)"; });
      const faqIo = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          obs.unobserve(e.target);
          items.forEach((el, idx) => {
            el.style.transition = "opacity 450ms ease-out " + idx * 60 + "ms, transform 450ms ease-out " + idx * 60 + "ms";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          });
        });
      }, { threshold: 0.1 });
      faqIo.observe(faqAcc);
      setTimeout(() => items.forEach((el) => { el.style.transition = "none"; el.style.opacity = "1"; el.style.transform = "none"; }), 1400);
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
      const msg =
        "Olá! Sou " + f.nome.value.trim() + " (" + f.telefone.value + "). " +
        "Área: " + f.area.value + ". " + f.mensagem.value.trim();
      window.open(WA + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
      success.textContent = "Tudo certo — abrimos o WhatsApp com o seu resumo. Se não abrir, chame no (21) 99311-4685.";
      success.classList.add("is-shown");
      form.reset();
    });
  }
})();
