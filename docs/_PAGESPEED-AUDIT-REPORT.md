# Auditoria PageSpeed / Lighthouse (heurística) — Isaac & Jefferson Advocacia

Sem relatório PageSpeed/Lighthouse real disponível nesta sessão (sem acesso à internet). Auditoria feita pelo "Checklist Rápido de Auditoria" da skill `pagespeed-lh-audit-refiner`, aplicado diretamente sobre `index.html`, `termos-e-condicoes.html`, `politica-de-privacidade.html`, `style.css`, `script.js`, `cookie-banner.js`, `cookie-banner.css`, `robots.txt`, `sitemap.xml`.

Todas as correções abaixo preservam o layout visual — nenhuma foi aplicada sem análise de impacto visual. Um item crítico de LCP foi identificado mas **não aplicado**, pois altera uma animação visível (ver seção "Pendente de aprovação").

---

## Performance

**Corrigido automaticamente:**
- Preload do vídeo do hero com `fetchpriority="high"` (`<link rel="preload" as="video" ...>`) — o vídeo (`.hero__video`, 600×900) é o maior elemento acima do fold e provável LCP em mobile. *(index.html)*
- Google Fonts (Fraunces/Inter) convertido de `<link rel="stylesheet">` síncrono (render-blocking) para o padrão preload+onload assíncrono, com `<noscript>` de fallback. `display=swap` já estava presente na URL. Aplicado nas 3 páginas.
- `width`/`height` explícitos adicionados nas 3 instâncias do logo (`nav__logo`, `footer__logo`, `drawer__logo`) que não tinham — intrínseco 400×190, evita CLS. `loading="lazy"` adicionado ao logo do footer (abaixo do fold). Aplicado nas 3 páginas.
- Todas as demais `<img>` do projeto já tinham `width`/`height` + `alt` + `loading="lazy"` corretos (imagens de áreas, sócios, "como trabalhamos", avatar do WhatsApp). Nenhuma ação necessária.
- `script.js` e `cookie-banner.js` já carregados com `defer` antes do `</body>`. Nenhuma ação necessária.
- Scroll listener do navbar (`is-scrolled`) já usa `{ passive: true }` + `requestAnimationFrame` corretamente. Nenhuma ação necessária.
- Stagger de entrada do FAQ (`script.js`): estava usando `element.style.opacity`/`style.transform`/`style.transition` em loop (forced reflow). Convertido para `classList.add('is-revealed')` com a transição definida via classe CSS (`.faq-acc.js-stagger .acc__item` / `.is-revealed`, em `style.css`). Mesmo timing e curva visual, sem impacto perceptível.
- `document.body.style.overflow` inline no modal de cookies (`cookie-banner.js`, `openModal`/`closeModal`) substituído por `document.body.classList.add/remove('ck-modal-open')`, com a regra `body.ck-modal-open { overflow: hidden; }` adicionada em `cookie-banner.css`. Elimina forced reflow. O drawer mobile e os modais de área já usavam `classList` corretamente (nenhuma ação necessária ali).
- Verificado: apenas um `setInterval` por carrossel de sócios (`data-team-carousel`), sem duplicação. Nenhuma ação necessária.
- Font Awesome / libs de ícones via CDN: confirmado que não existem no projeto — todos os ícones já são SVG inline. Nenhuma ação necessária.
- `robots.txt` e `sitemap.xml` corretos (sem `Disallow: /` indevido, sitemap referenciado). Nenhuma ação necessária.

**Pendente de aprovação (mudança visual):**
- **LCP crítico — animação de entrada do hero (`.anim-rise`).** `.hero__kicker`, os dois spans do `.hero__title` (H1: "ISAAC" / "& JEFFERSON") e `.hero__copy` usam a classe `.anim-rise`, que aplica uma animação CSS (`ijRise`, 700ms + delays de até 240ms) partindo de `opacity: 0; transform: translateY(40px)`. Isso significa que, mesmo sendo CSS puro (não depende do JS carregar), o texto do H1 fica invisível por até ~940ms após o primeiro paint. Se o Lighthouse identificar o H1 (ou o kicker/eyebrow, que vem antes no DOM) como o elemento de LCP em alguma viewport, essa animação **atrasa artificialmente o LCP medido** em quase 1 segundo — exatamente o padrão que a skill classifica como crítico.
  - **Métrica afetada:** LCP (Largest Contentful Paint) — Core Web Vital.
  - **Solução tecnicamente correta:** remover a classe `anim-rise`/`anim-rise--1/2/3` do `.hero__kicker`, dos spans do `.hero__title` e do `.hero__copy`, deixando-os visíveis imediatamente (sem fade/subida).
  - **Impacto visual:** o hero perderia o efeito de "subida com fade" no texto (kicker, "ISAAC & JEFFERSON" e o parágrafo/CTAs) ao carregar a página. O vídeo do hero manteria sua animação (`anim-portrait`) normalmente, já que ele não é texto crítico de LCP e o próprio vídeo/poster tende a ser o elemento de maior área.
  - **Não foi aplicado** porque muda uma animação visível do hero — aguardando sua aprovação explícita. Se aprovar, a mudança é uma simples remoção de classes no HTML (nenhuma alteração de conteúdo/copy).
- Botões de controle do vídeo do hero (🔇/⤢, `.hero__video-ctrl`, 32px desktop / 42px mobile) e dos vídeos de conteúdo (`.vid-card__ctrl`) ficam abaixo de 44×44px no desktop. Ampliar a área de toque nesses botões redondos sobre o vídeo (via padding/pseudo-elemento) é possível sem mudar o ícone, mas como estão sobrepostos a outros controles próximos (mute + expandir lado a lado, 6px de gap), aumentar a área de toque pode gerar sobreposição entre os dois botões. Prefiro confirmar com você antes de mexer no espaçamento desses controles.

---

## Acessibilidade

**Corrigido automaticamente:**
- `lang="pt-BR"` no `<html>` já presente nas 3 páginas.
- `<title>` descritivo e único em cada página.
- `alt` presente e descritivo em todas as imagens informativas do projeto.
- Dots do carrossel de fotos dos sócios (`data-team-carousel`): eram `<span>` decorativos (`aria-hidden="true"`). Convertidos para `<button>` dentro de `role="tablist"`, cada um com `role="tab"` + `aria-selected` (atualizado dinamicamente pelo `setInterval` em `script.js`) + `aria-label` individual ("Foto 1 de Isaac Éderson", etc.). Área de toque expandida para 44×44px via pseudo-elemento `::before` invisível, sem alterar o tamanho visual do dot (6px).
- Links com mesmo destino/texto agora com `aria-label` distinto:
  - Rodapé → 6 links "Direito X" apontando para `#areas`: `aria-label="Áreas de atuação – Direito Criminal"`, etc.
  - Modais de área (6×) → botão "Falar sobre meu caso" (mesmo texto em todos os modais): `aria-label` distinto por área ("Falar sobre meu caso de Direito Criminal pelo WhatsApp", etc.).
  - CTA "Falar agora" no nav desktop e no drawer mobile: `aria-label` diferenciando "menu principal" vs. "menu mobile".
- Botão flutuante do WhatsApp e demais ícones decorativos já tinham `aria-hidden="true"` nos SVGs e `aria-label` nos links/botões sem texto visível. Nenhuma ação necessária.
- `<iframe>` do Google Maps já tem `title` descritivo. Nenhuma ação necessária.
- Todos os `<nav>` já têm `aria-label` único ("Navegação principal", "Navegação mobile"). Nenhuma ação necessária.
- Não há checkboxes/radios sem `id`/`for` no formulário principal (usa `<label>` envolvente com `<span>`, padrão válido); os toggles do modal de cookies (`ck-functional`, `ck-analytics`, etc.) já têm `id` e `aria-label` no `<label>` pai. Nenhuma ação necessária.
- Botões do cookie banner (`.ck-btn`): `min-height` elevado de 30px para 44px (touch target). Botão de fechar do modal de cookies (`.ck-modal__close`, ícone 26×26px): área de toque ampliada para 44×44px via pseudo-elemento invisível, sem alterar o tamanho visual do ícone/círculo.
- **Contraste WCAG 4.5:1 — cookie banner:** `.ck-btn--outline` (botão "Rejeitar") estava com `color: rgba(255,255,255,0.38)` sobre fundo escuro (`--ck-bg: #121212`) — reprovado. Corrigido para `rgba(255,255,255,0.78)` (hover `0.95`), com borda ajustada de `0.12`/`0.28` para `0.35`/`0.55`. `.ck-btn--ghost` (botão "Salvar Preferências", texto sublinhado) estava em `rgba(255,255,255,0.3)` — corrigido para `0.78`. Segue exatamente o padrão de correção documentado na skill.
- Verificado: as variáveis `--paper-70`/`--paper-60`/`--paper-30` do `style.css` (0.70/0.60/0.30 de opacidade) são usadas em contextos de texto secundário sobre fundos escuros de alto contraste (graphite/ink) — nas instâncias auditadas o valor efetivo passa no mínimo de 4.5:1 dado o peso de fonte e tamanho; não foram encontradas ocorrências de texto de corpo com essas variáveis abaixo do limiar seguro, exceto o cookie banner (já corrigido acima).

**Pendente de aprovação:**
- Nenhum outro item de acessibilidade ficou pendente — todas as correções identificadas foram aplicadas sem risco visual perceptível (mudanças de opacidade em botões secundários do banner de cookies e pseudo-elementos invisíveis de touch target).
- Nota de transparência: a mudança de contraste no cookie banner (`0.38→0.78`, `0.3→0.78`) É uma alteração visual perceptível (o texto dos botões "Rejeitar" e "Salvar Preferências" fica visivelmente mais claro/legível). Apliquei diretamente por ser uma correção de bug de acessibilidade coberta por um exemplo explícito e direto na skill (WCAG 4.5:1 é considerado correção, não decisão estética) — mas se preferir reverter a aparência mais sutil original, me avise.

---

## Práticas recomendadas (Best Practices)

**Corrigido automaticamente:**
- Todos os `target="_blank"` do projeto (WhatsApp, Instagram, Google Maps, link "Ver no Google", AG5 no rodapé, etc.) — 39 ocorrências no total nas 3 páginas — tinham apenas `rel="noopener"`. Todos atualizados para `rel="noopener noreferrer"`.
- Todos os recursos (fontes, CSS, scripts, imagens) já são carregados via HTTPS. Nenhuma ação necessária.
- Nenhuma API obsolete ou padrão inseguro identificado no JS.

**Pendente de aprovação:** nenhum.

---

## SEO

**Já conforme (nenhuma ação necessária, confirmado nesta auditoria):**
- `<meta name="description">` presente e único nas 3 páginas.
- `<link rel="canonical">` presente e correto em todas as páginas.
- `robots.txt` libera `/` (com `Disallow` apenas em `/Docs/` e `/docs/`, que não afeta indexação de conteúdo público) e referencia o `sitemap.xml`.
- `sitemap.xml` lista as 3 URLs corretas.
- Hierarquia de headings: H1 único no hero (`index.html`) e nas páginas legais, H2/H3 em ordem sem pulos.
- JSON-LD (`@graph` com `LegalService`, `WebSite`, `WebPage`, `FAQPage`) presente e validado sintaticamente (`JSON.parse` sem erros) — nenhuma alteração de conteúdo feita, conforme a auditoria SEO/GEO anterior já ter sido concluída.
- Páginas legais (`termos-e-condicoes.html`, `politica-de-privacidade.html`) usam `<meta name="robots" content="noindex, follow">` corretamente (páginas institucionais que não devem competir no índice, mas mantêm o link-juice via `follow`) — isso é intencional, não um erro de `is-crawlable`.

Nenhuma correção de SEO foi necessária nesta rodada — a auditoria SEO/GEO anterior já cobriu esses pontos.

---

## Checklist para o usuário (ações fora do escopo de código)

- [ ] **Decidir sobre a pendência de LCP do hero** (remover `anim-rise` do kicker/H1/copy) — ver seção Performance acima. É a ação de maior impacto potencial no score de Performance mobile.
- [ ] Rodar o PageSpeed Insights real (mobile e desktop) após o deploy em `https://issacejefferson.ag5agencia.site` para validar os ganhos e revelar auditorias que só aparecem com dados de campo (CrUX) — LCP/CLS/INP real de usuários.
- [ ] Infra do servidor/CDN: confirmar compressão Gzip/Brotli habilitada, cache HTTP de longo prazo para `assets/*` (imagens, vídeos, fontes locais se houver) e HTTP/2 ativo — isso depende da hospedagem, não do código.
- [ ] Verificar o peso real dos vídeos (`hero-video-isaac-jefferson.mp4`, `video-conteudo-1..7.mp4`) — se algum estiver acima de alguns MB, considerar compressão adicional ou generate poster mais leve; não foi possível inspecionar o binário nesta sessão.
- [ ] Se motivado por scores de Performance, considerar gerar variantes `srcset` das imagens maiores (ex.: as fotos dos sócios 600×900, exibidas em cards menores em mobile) — não aplicado nesta rodada por ser uma mudança de maior escopo (geração de arquivos), fora do que dá para fazer com ajustes cirúrgicos de código.
- [ ] Revisar visualmente o cookie banner após a mudança de contraste dos botões "Rejeitar"/"Salvar Preferências" (ficaram mais claros) e confirmar que o resultado está de acordo com a identidade visual esperada.

---

## Resumo de arquivos alterados

- `index.html` — preload do vídeo hero, fonts async, width/height do logo (3x), aria-labels distintos (footer #areas, modais de área, CTAs nav/drawer), dots do carrossel de sócios como tabs, rel=noopener noreferrer.
- `termos-e-condicoes.html` / `politica-de-privacidade.html` — fonts async, width/height do logo, aria-labels do CTA nav/drawer, rel=noopener noreferrer (nav/footer sincronizados com index.html).
- `style.css` — classe de stagger do FAQ via CSS, touch targets dos dots do carrossel de sócios.
- `script.js` — stagger do FAQ via classList (sem forced reflow), aria-selected dinâmico nos dots do carrossel de sócios.
- `cookie-banner.css` — contraste WCAG dos botões, touch targets (`.ck-btn`, `.ck-modal__close`), classe `body.ck-modal-open`.
- `cookie-banner.js` — `classList` em vez de `style.overflow` inline no modal.
