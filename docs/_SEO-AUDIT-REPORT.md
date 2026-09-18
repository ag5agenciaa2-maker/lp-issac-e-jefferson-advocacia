# Auditoria SEO/GEO — Isaac & Jefferson Advocacia Estratégica

Data: 2026-09-17. Executado seguindo a Skill AG5 de SEO/GEO (`07-Skill-SEO/01-Skill-SEO.md`).

## 1. Discovery

Arquivos revisados: `index.html`, `termos-e-condicoes.html`, `politica-de-privacidade.html`, `style.css`,
`script.js`, `cookie-banner.js`, `cookie-banner.css`, `robots.txt`, `.assetsignore`, `.gitignore`,
`docs/Informações da Empresa Raiz.md` (fonte da verdade / dossiê Pleper), `docs/_README-ESTRUTURA.md`.
Não havia `sitemap.xml` nem `llms.txt` no projeto — ambos foram criados.

## 2. Technical Check — o que foi corrigido

### URL limpa (regra inviolável)
Todos os `href` internos, `canonical`, `og:url`, `url`/`mainEntityOfPage` do JSON-LD e `<loc>` do
sitemap foram convertidos para URL sem `.html`:
- `index.html` → `/`
- `termos-e-condicoes.html` → `/termos-e-condicoes`
- `politica-de-privacidade.html` → `/politica-de-privacidade`
- Âncoras de seção nas páginas legais: `index.html#hero` → `/#hero` (idem para `#areas`,
  `#como-trabalhamos`, `#depoimentos`, `#contato`).
- Corrigido também `cookie-banner.js` (`privacyPolicyUrl`) que apontava para `politica-de-privacidade.html`.
- Auditoria final (`grep -rn 'href="[^"]*\.html'` e `grep -n '\.html' sitemap.xml`) retornou vazio nas 3 páginas.

### Canonical, Open Graph, Twitter Cards
- Adicionado `<link rel="canonical">` nas 3 páginas.
- Adicionado `og:url`, `og:image`, `og:locale` na home (faltavam).
- Adicionado bloco completo de Twitter Cards (`summary_large_image`) na home (não existia).
- Adicionado `og:title`/`og:description`/`og:url` também nas páginas de termos e política (não existiam).

### Geo tags
Adicionado `geo.region`, `geo.placename`, `geo.position` e `ICBM` na home, usando as coordenadas
reais do Google Business Profile (dossiê Pleper): `-22.91917090, -43.67873550`.

### Schema JSON-LD
- Corrigido `LegalService`: `url` estava vazio → preenchido com o placeholder de domínio;
  adicionado `mainEntityOfPage` e `image`; adicionado horário de plantão 24h (segunda regra de
  `openingHoursSpecification`) para refletir o atendimento criminal urgente já descrito no FAQ e
  no hero; adicionado `sameAs` do perfil Google (já usado no botão "Ver no Google").
- **Adicionado schema `FAQPage`** (não existia) espelhando as 5 perguntas/respostas já publicadas
  na seção de FAQ da home — zero conteúdo novo, só estruturação.
- `aggregateRating` (5.0 / 22 avaliações) mantido no JSON-LD, pois os depoimentos com estrelas
  seguem visíveis na página (regra AG5 permite isso mesmo sem destaque visual da nota).

### Regra AG5 de destaque de avaliações
Auditado com `grep -n "5,0\|avalia" index.html`: **nenhuma ocorrência de destaque visual de nota
numérica + contagem** foi encontrada (22 avaliações está abaixo da régua de 30). O botão da seção
de depoimentos já usa apenas "Ver no Google" e o quote do CTA usa estrelas visuais sem número — ou
seja, o site já estava em conformidade com a régua. Nenhuma alteração necessária aqui.

### robots.txt
Reescrito para liberar explicitamente os crawlers de IA (`GPTBot`, `ChatGPT-User`, `Claude-Web`,
`ClaudeBot`, `PerplexityBot`, `Google-Extended`) com `Allow: /`, mantendo o bloqueio de `/docs/` e
`/Docs/`. Adicionada linha `Sitemap:` e comentário `# LLMs:` apontando para o `llms.txt`.

### sitemap.xml (novo arquivo)
Criado na raiz com as 3 páginas, URLs limpas (sem `.html`), `changefreq` e `priority` básicos.

### llms.txt (novo arquivo)
Criado na raiz seguindo a spec da skill (H1 + blockquote + NAP + Serviços + Diferenciais + Equipe +
Regiões atendidas + Dúvidas frequentes + Contato). Todo o conteúdo vem do dossiê
`docs/Informações da Empresa Raiz.md` e do HTML existente — nenhum dado inventado. Campos sem fonte
confirmada (e-mail, CNPJ, convênios) foram omitidos, conforme a regra da skill.

### Robô de analytics AG5
Adicionada a tag `<script src="https://control-blog.ag5agencia.site/r.js" data-c="isaac-e-jefferson-advocacia" defer></script>`
antes de `</body>` nas 3 páginas HTML.

**⚠️ Atenção:** o slug `isaac-e-jefferson-advocacia` foi **inferido** a partir do nome do cliente,
pois não há acesso ao painel AG5 Content Control neste momento. **Confirmar/corrigir esse slug no
painel antes do deploy em produção** — um slug incorreto faz o evento ser descartado silenciosamente,
sem erro visível.

## 3. Performance Check

- Todas as imagens abaixo da dobra já usavam `loading="lazy"` e `width`/`height` explícitos (bom
  para CLS). O hero usa vídeo (não imagem), então `fetchpriority` não se aplica a ele da mesma forma;
  o vídeo já usa `autoplay muted loop playsinline` com `width`/`height` fixos.
- Todos os `<script>` já usavam `defer` (incluindo o script AG5 recém-adicionado).
- Fontes carregadas via Google Fonts com `preconnect` e `display=swap` já configurado (`&display=swap`
  na URL do Google Fonts) — nenhuma mudança necessária.
- Alt texts de imagem revisados: 2 alts genéricos ("Retrato do advogado Isaac Éderson" / "...Jefferson")
  foram enriquecidos com keyword + localização:
  - "Isaac Éderson, advogado criminalista em Santa Cruz, Rio de Janeiro"
  - "Jefferson, advogado trabalhista e empresarial em Santa Cruz, Rio de Janeiro"
  Os demais alts já eram descritivos e específicos.

## 4. GEO & E-E-A-T Check

- FAQ já existia na home com 5 perguntas reais — agora também estruturado como `FAQPage` (JSON-LD).
- NAP (endereço, telefone, horário) já visível em texto (não só em imagem) na seção de localização
  e no footer.
- Credenciais dos sócios (OAB/RJ 244.818 e OAB/RJ 245.227) já visíveis na seção "Sócios".
- Depoimentos reais com nome e estrelas visíveis (E-E-A-T: trustworthiness/experience).
- HTTPS: depende do host final (ver pendências externas abaixo).

## 5. Content SEO — Title / Meta Description / H1

### H1 (reprovava antes da correção)
O H1 da home era apenas "ISAAC & JEFFERSON" (nome próprio, sem keyword nem localização) — **reprovava**
a regra da skill. Correção aplicada **sem alterar o design**: adicionado um `<span class="sr-only">`
dentro do próprio H1 com o texto "Advogado em Santa Cruz, Rio de Janeiro" (keyword + local, oculto
visualmente mas lido por buscadores/leitores de tela via `aria-hidden` nos spans visuais existentes).
O visual "ISAAC & JEFFERSON" permanece idêntico. O subtítulo abaixo do H1 foi ajustado de
"Advocacia Estratégica" para "Isaac & Jefferson Advocacia Estratégica" para reforçar a entidade/marca
como `<p>`, não como H1.

### Title tags (front-loading: keyword + local primeiro)
- Home: `Advogado em Santa Cruz, Rio de Janeiro | Isaac & Jefferson` (58 caracteres) — antes era
  `Isaac & Jefferson | Advocacia Estratégica em Santa Cruz, Rio de Janeiro` (marca primeiro, reprovava
  o front-loading da skill).
- Termos: mantido `Termos e Condições | Isaac & Jefferson Advocacia Estratégica` (página secundária,
  `noindex`, não compete por keyword).
- Política: mantido `Política de Privacidade | Isaac & Jefferson Advocacia Estratégica` (idem).

### Meta descriptions (150-160 caracteres, revisadas)
- Home: mantida e levemente ajustada (já estava boa e dentro da faixa).
- Termos: pequeno ajuste para incluir "advocacia em Santa Cruz, Rio de Janeiro".
- Política: mantida (já adequada).

### H2-H6
Verificados: hierarquia já correta (H2 por seção, H3 nos cards/steps/depoimentos), com termos
específicos ("Áreas de atuação", "Sócios", "Dúvidas frequentes", etc.) — sem headings genéricos tipo
"Saiba mais". Nenhuma mudança necessária.

## 6. Acessibilidade semântica

- `<main>`, `<nav>`, `<footer>` já estruturados corretamente na home e nas páginas legais.
- Todos os botões só-ícone já tinham `aria-label` (hamburger, fechar modal, mute/expandir vídeo,
  fechar drawer, fechar cookie banner, preferências de cookies) — nenhuma correção necessária aqui.

## 7. Zero em-dash

Nenhum travessão (—/–) foi introduzido em nenhum texto novo escrito nesta auditoria (llms.txt, meta
descriptions, alts, schema). Texto 100% direto, sem em-dash.

---

## Checklist External/Off-Page Dependencies (usuário precisa fazer manualmente)

- [ ] **Google Meu Negócio (GMB/GBP)**: perfil já existe e está verificado ("Isaac Ederson advocacia"),
      NAP já bate com o site. Vale revisar se o nome no GBP deveria ser atualizado para
      "Isaac & Jefferson Advocacia Estratégica" para casar 100% com a marca do site.
- [ ] **Google Search Console**: cadastrar a propriedade do domínio final, submeter o `sitemap.xml`
      e solicitar indexação da home.
- [ ] **Google Analytics / Tag Manager**: o robô próprio AG5 já foi instalado (ver seção acima), mas
      se o cliente quiser GA4/GTM adicional, precisa ser configurado à parte.
- [ ] **Link Building**: buscar backlinks de diretórios jurídicos (OAB/RJ, Jusbrasil, diretórios locais
      de Santa Cruz/Zona Oeste) e parcerias.
- [ ] **Redes sociais**: confirmar que o Instagram (@ij.advocacia) linka de volta para o site assim
      que o domínio final estiver no ar.
- [ ] **PageSpeed Insights**: rodar teste real após o deploy (Core Web Vitals em produção, especialmente
      LCP do vídeo de hero e dos vídeos de conteúdo).
- [ ] **HTTPS**: confirmar certificado SSL válido e forçado no host de produção.
- [ ] **Confirmar/corrigir o slug do AG5 Content Control** (`data-c="isaac-e-jefferson-advocacia"`)
      no painel antes do deploy — ver aviso na seção "Robô de analytics AG5" acima.
- [x] **Domínio de produção definido**: `https://issacejefferson.ag5agencia.site`, já aplicado em todo o código
      (`index.html`, `termos-e-condicoes.html`, `politica-de-privacidade.html`, `robots.txt`,
      `sitemap.xml`, `llms.txt`).
