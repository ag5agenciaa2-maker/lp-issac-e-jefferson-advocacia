# Estrutura do projeto — Isaac & Jefferson Advocacia Estratégica

> Leia este arquivo ANTES de criar ou editar qualquer página HTML deste projeto.
> Ele descreve a estrutura e as regras. O template pronto para colar está em
> `docs/_nav-footer-template.html`. Os dois arquivos moram em `docs/` e nunca vão pro ar
> (o `robots.txt` já bloqueia `/docs/`).

## 1. Mapa de páginas

| Página                        | Pasta | Profundidade | `{{BASE}}` |
|--------------------------------|-------|---------------|------------|
| `index.html`                   | raiz  | raiz          | `` (vazio) |
| `termos-e-condicoes.html`       | raiz  | raiz          | `` (vazio) |
| `politica-de-privacidade.html`  | raiz  | raiz          | `` (vazio) |

Hoje **todo o site vive na raiz** do projeto — não há subpastas (`blog/`, `servicos/`, etc.).
Se uma página nova for criada dentro de uma subpasta futuramente, `{{BASE}}` passa a ser `../`
(ou `../../` para dois níveis) em todos os caminhos relativos.

## 2. Template canônico

Ponto de partida obrigatório para qualquer página nova: `docs/_nav-footer-template.html`.
Ele contém, nesta ordem: `<header>`/nav completo, `<footer>` completo, drawer mobile, bloco de
cookies (banner + modal + botão flutuante) e o bloco de `<script>` final.

Todo caminho relativo no template usa o placeholder `{{BASE}}`. Ao copiar para uma página nova:
- Substitua `{{BASE}}` por `` (vazio) se a página estiver na raiz.
- Substitua `{{BASE}}` por `../` se a página estiver uma pasta abaixo da raiz.
- Links de âncora para seções que só existem na home (`#hero`, `#areas`, `#como-trabalhamos`,
  `#depoimentos`, `#contato`) devem virar `{{BASE}}index.html#secao` em qualquer página que não
  seja a própria `index.html`. Dentro da `index.html`, usam apenas `#secao`.

## 3. Regra de profundidade (tabela raiz vs subpasta)

| Recurso              | Página na raiz         | Página em subpasta (`blog/`) |
|-----------------------|-------------------------|-------------------------------|
| `index.html`          | `index.html`            | `../index.html`               |
| `style.css`           | `style.css`             | `../style.css`                |
| `cookie-banner.css`   | `cookie-banner.css`     | `../cookie-banner.css`        |
| `script.js`           | `script.js`             | `../script.js`                |
| `cookie-banner.js`    | `cookie-banner.js`      | `../cookie-banner.js`         |
| `assets/...`          | `assets/...`            | `../assets/...`               |
| `termos-e-condicoes.html` | `termos-e-condicoes.html` | `../termos-e-condicoes.html` |
| `politica-de-privacidade.html` | `politica-de-privacidade.html` | `../politica-de-privacidade.html` |

## 4. Itens obrigatórios em TODA página do site

- [ ] Nav/header **idêntico** ao da `index.html` (logo, 5 links + CTA WhatsApp, botão hamburger).
- [ ] Footer **idêntico** ao da `index.html` (grid de 4 colunas: sobre/social, navegar, áreas de
      atuação, contato — mais a barra de créditos com cookies/termos/política/AG5).
- [ ] Drawer mobile idêntico (overlay + aside + os mesmos 5 links + CTA).
- [ ] Banner de cookies LGPD + modal de preferências + botão flutuante `#ck-prefs-btn` + o script
      `cookie-banner.js`.
- [ ] `script.js` linkado no fim do `<body>`, sempre depois de `cookie-banner.js` e de qualquer
      biblioteca externa.
- [ ] Favicon: `<link rel="icon" href="assets/favicon-isaac-jefferson-advocacia.ico" />` (ajustar
      `{{BASE}}` se em subpasta).
- [ ] `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- [ ] `<link rel="stylesheet" href="style.css">` e `<link rel="stylesheet" href="cookie-banner.css">`.
- [ ] Páginas secundárias (termos, política) devem ter `<meta name="robots" content="noindex, follow">`
      — elas não competem por indexação com a home.

## 5. Armadilhas conhecidas deste projeto

- **Nav/footer divergentes por página**: antes desta sincronização (17/09/2026), as páginas
  `termos-e-condicoes.html` e `politica-de-privacidade.html` tinham um nav reduzido (só 3 links:
  Áreas/Sócios/Contato, sem Início/Sobre/Depoimento) e um footer minimalista (só a barra de
  créditos, sem o grid de 4 colunas nem o drawer com 5 links). Isso gerava inconsistência visual
  e de navegação em relação à home. **Sempre conferir se o nav e o footer têm o mesmo número de
  links e a mesma estrutura de colunas que a `index.html` atual**, não assumir que "já está
  parecido" é suficiente.
- **Links de âncora sem `index.html#`**: nas páginas secundárias, um link de nav/drawer/footer
  escrito só como `#areas` (sem `index.html#`) não funciona, porque a seção `#areas` só existe na
  `index.html`. Sempre usar `index.html#secao` fora da home.
- **Scripts duplicados**: ao colar o bloco de scripts do template, confirme que a página não já
  tinha um `<script src="script.js">` ou `<script src="cookie-banner.js">` antes de colar — este
  projeto usa apenas uma instância de cada, sempre nesta ordem: `cookie-banner.js` → `script.js`.
- **CSS de página legal (`<style>` inline no `<head>`)**: as páginas de termos/política têm um
  bloco `<style>` local para a classe `.legal` (título, corpo, largura de leitura). Isso é
  intencional e específico dessas páginas — não faz parte do template de nav/footer e não deve
  ser removido ao sincronizar.
- **`body.subpage`**: este projeto NÃO usa a classe `body.subpage` observada em outros projetos
  AG5. Não há indício do bug "footer escuro sobre fundo escuro" aqui, mas se essa classe for
  introduzida no futuro, qualquer seletor herdado (`body.subpage p, li, h2...`) deve ser escopado
  para `body.subpage main`, nunca aplicado global, para não pintar o texto do footer com a cor
  errada.

## 6. Como verificar depois de sincronizar

1. Abrir cada página e comparar visualmente o header e o footer com os da `index.html` (mesmo
   número de links, mesmas colunas, mesmo texto de créditos).
2. Testar o menu hamburger em viewport mobile: abre com animação, fecha ao clicar num link e ao
   clicar fora/no botão de fechar.
3. Testar o banner de cookies: aparece ao carregar (se não houver preferência salva), o botão
   "Cookies" no rodapé reabre o banner/modal, os toggles de categoria funcionam.
4. Conferir os `href` de cada link do nav/drawer/footer: em página secundária, links de seção da
   home devem ser `index.html#secao`; links para as próprias páginas legais usam o nome do arquivo
   direto.
5. Verificar no HTML final que não há duas tags `<script src="script.js">` nem duas
   `<script src="cookie-banner.js">` na mesma página, e que a ordem é sempre
   `cookie-banner.js` antes de `script.js`.
