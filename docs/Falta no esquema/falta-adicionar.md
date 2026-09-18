# 📋 Falta Adicionar no Schema
**Empresa:** Advogado Santa Cruz RJ - Isaac & Jefferson Advocacia Estratégica | Direito Criminal | Direito Trabalhista
**Data de geração:** 17/09/2026

---

## 🔴 CRÍTICOS — Impactam SEO diretamente

- [x] **Domínio de produção** — definido: `https://issacejefferson.ag5agencia.site`. Já aplicado em `url`, `@id`, `mainEntityOfPage`, `hasMap`, `logo`, `image` do schema e em `index.html`, `termos-e-condicoes.html`, `politica-de-privacidade.html`, `robots.txt`, `sitemap.xml` e `llms.txt`.
- [ ] `email` — Não encontrado no site nem no arquivo de raiz. Omitido do JSON-LD.

## 🟡 IMPORTANTES

- [ ] `sameAs` Facebook — Não encontrado (nem no site, nem no arquivo de raiz).
- [ ] `sameAs` LinkedIn — Não encontrado, não parece aplicável a este negócio.
- [ ] `aggregateRating` — **Omitido de propósito.** O arquivo de raiz (Pleper) registra nota 5.0 com 22 avaliações, mas não há mais nenhum destaque numérico de nota/contagem visível no HTML (a auditoria SEO anterior confirmou isso e removeu esse destaque visual por estar abaixo da régua AG5 de 30 avaliações). Os depoimentos individuais com ★★★★★ seguem visíveis, mas sem nota agregada nem contagem impressos na página. Pela regra da própria skill ("aggregateRating: incluir somente se nota e número de avaliações estiverem visíveis no HTML"), a leitura mais segura é omitir o agregado agora — reintroduzir assim que a UI voltar a exibir "5,0 · 22 avaliações" (ou quando passar de 30 avaliações) publicamente.
- [ ] `founder.sameAs` — Não há Instagram pessoal de Isaac Éderson nem de Jefferson linkado no site (só o perfil institucional @ij.advocacia). Omitido dos objetos `Person`.

## 🔵 COMPLEMENTARES

- [ ] `legalName` — Razão social/CNPJ não exibidos no site nem no arquivo de raiz.
- [ ] `paymentAccepted` — Formas de pagamento não listadas no site.
- [ ] `datePublished` / `dateModified` do `WebPage` — Datas de publicação/atualização da LP não disponíveis no HTML; omitidas para não inventar valor.
- [ ] `contactPoint` — Não aplicável: há apenas 1 número (21) 99311-4685, usado tanto como telefone quanto WhatsApp. Um único `telephone` simples é suficiente (ETAPA 4.5 da skill não se aplica).

## 🟢 FAQ

- [x] FAQ já existente na home, com 5 perguntas reais — reaproveitado no `FAQPage` do `@graph`, sem alteração de conteúdo.

---

## ✅ Resolvidos Automaticamente

- [x] `identifier.Google CID` — `9802992332874979669` (extraído do dossiê Pleper em `docs/Informações da Empresa Raiz.md`)
- [x] `identifier.Google Place ID` — `ChIJu7fmCWz7mwARVRnkmJY5C4g` (confere com o `placeid=` usado no link "Avaliar no Google" do próprio index.html)
- [x] `hasMap` + `sameAs[0]` — URL canônica `https://maps.google.com/?cid=9802992332874979669` aplicada (prioridade máxima: CID decimal disponível, então o link opaco `share.google/...` foi substituído/removido do `sameAs`)
- [x] `geo.latitude` / `geo.longitude` — Usadas as coordenadas exatas do dossiê Pleper: `-22.91917090, -43.67873550` (mais precisas que geocodificação manual do endereço, conforme hierarquia da ETAPA 3/regras invioláveis)
- [x] `name` — "Isaac & Jefferson Advocacia Estratégica" (nome oficial já usado no site; nome verificado no GBP é "Isaac Ederson advocacia", mantido `name` = marca do site por já estar 100% alinhado ao NAP praticado na LP)
- [x] `alternateName` — `Advogado Santa Cruz RJ - Isaac & Jefferson Advocacia Estratégica | Direito Criminal | Direito Trabalhista` (ver decisão de categorias abaixo). Copiado também em `WebSite.name`.
- [x] `areaServed` — Bairro base Santa Cruz-RJ + 5 adjacentes gerados a partir da tabela de referência da própria skill (Paciência, Sepetiba, Guaratiba, Cosmos, Campo Grande), mais a cidade/estado (Rio de Janeiro - RJ).
- [x] `founder` — Isaac Éderson (OAB/RJ 244.818, Criminal/Família) e Jefferson (OAB/RJ 245.227, Trabalhista/Empresarial/Previdenciário), com foto de cada um extraída da seção "Sócios" do site.
- [x] `foundingDate` — "2025-06" (Junho 2025, conforme arquivo de raiz).
- [x] `hasOfferCatalog` — 6 serviços (um por área de atuação) extraídos das seções de serviço do site.
- [x] `openingHoursSpecification` — Mantida a estrutura já existente (seg-sex 9h-18h + plantão criminal 24h), conforme HTML e arquivo de raiz.

---

## 📌 Decisões que exigem revisão humana

1. **Escolha das 2 categorias do `alternateName`**: entre as 6 áreas de atuação (Criminal, Família, Trabalhista, Previdenciário, Empresarial, Bancário), escolhi **Direito Criminal** e **Direito Trabalhista** como categorias-pai porque: (a) Direito Criminal é o diferencial mais forte do hero/CTA/plantão 24h e a especialidade headline de Isaac; (b) Direito Trabalhista é a especialidade headline de Jefferson e aparece com peso equivalente no site. Família, Previdenciário, Empresarial e Bancário seguem representados no `hasOfferCatalog`, só não entraram no `alternateName` (a fórmula exige exatamente 2). **Peço revisão**: se a agência/cliente preferir Criminal + Família (por serem historicamente a dupla mais buscada localmente), é só trocar a 2ª categoria.
2. **`aggregateRating` omitido**: decisão documentada na seção 🟡 acima. Se o cliente reintroduzir o destaque "5,0 · X avaliações" na página (acima de 30 avaliações, conforme régua AG5), o campo deve voltar ao schema.
3. **`name` vs nome verificado no GBP**: mantive `name` = "Isaac & Jefferson Advocacia Estratégica" (a marca do site) em vez de "Isaac Ederson advocacia" (nome cadastrado no Google). Ambos os sócios estão em pé de igualdade no site atual; se o cliente decidir renomear o perfil do Google para casar 100% com a marca (pendência já listada no `_SEO-AUDIT-REPORT.md`), nenhuma mudança adicional será necessária aqui.

---

📌 **Após preencher cada item:** remover o `[ ]`, substituir o placeholder no Schema e revalidar em https://validator.schema.org/
📌 **NAP** deve ser idêntico ao Google Business Profile após edição
