# Auditoria de Conformidade Ética e Regulatória — OAB

## 1. Resumo geral

- **Site analisado:** Isaac & Jefferson Advocacia Estratégica (issacejefferson.ag5agencia.site)
- **Arquivos analisados:** `index.html`, `termos-e-condicoes.html`, `politica-de-privacidade.html`, `script.js`
- **Nicho:** Advocacia (OAB)
- **Nível de regulação:** 1 — Altamente Regulado (meta mínima 95, ideal 100)
- **Data da auditoria:** 17/09/2026
- **Pontuação final:** **99/100**
- **Status:** Excelente — em conformidade (meta mínima de 95 atingida e superada)

O site já chegava a esta auditoria em estado bastante maduro: linguagem sóbria, CTAs institucionais ("Falar no WhatsApp", "Falar sobre meu caso", "Entre em contato"), ausência de preços/parcelamentos, ausência de comparação com concorrentes, e uso correto da informação real de plantão 24h (não tratada como gatilho de urgência comercial). Foram encontradas e corrigidas duas ocorrências pontuais de linguagem de "garantia de resultado" no FAQ (texto visível + espelho no JSON-LD).

---

## 2. Lista de tudo que foi visto

### index.html

| Bloco / Seção | Tipo | Observação |
|---|---|---|
| `<head>` / meta tags / OG / Twitter | Metadados | Linguagem técnica e factual ("Direito Criminal (plantão 24h)"). Sem problemas. |
| Header/nav — "Falar agora" | CTA | Aceitável (equivalente a "entre em contato"). Sem problemas. |
| Hero — título, tagline, texto | Título/Parágrafo | Tom institucional, descreve atuação e diferenciais reais (atendimento presencial/online, linguagem clara). Sem problemas. |
| Hero — CTAs "Falar no WhatsApp" / "Áreas de atuação" | CTA | Aceitáveis. Sem problemas. |
| Hero — figcaption "Criminal 24h" | Info técnica | Informação factual de serviço (plantão real), não é urgência comercial. Sem problemas. |
| Seção "Dor e solução" (#dor) | Parágrafo/listas | "O que muda o resultado é a velocidade da primeira decisão" — descreve dinâmica factual do processo, não promete resultado específico. Listas descrevem cenários reais (prisão em flagrante, guarda em disputa) sem prometer desfecho. Sem problemas. |
| Seção "Áreas de atuação" (6 cards + 6 modais) | Serviços | Descrição técnica e enumerativa dos serviços (ex.: habeas corpus, inventário, ações revisionais). Sem superlativos, sem promessas. Sem problemas. |
| CTAs dos modais "Falar sobre meu caso" | CTA | Aceitável. Sem problemas. |
| Seção "Como trabalhamos" (#como-trabalhamos) | Processo | "sem promessas vazias" está explicitamente dito no texto — reforça conformidade. Etapa 01 "Primeira análise, sem custo" é informação verdadeira de serviço. Sem problemas. |
| Seção "Sócios" (#socios) | Bio/credenciais | Nº de OAB exibido, áreas de foco descritas tecnicamente, sem superlativos ("advogado especializado" implícito, não "o melhor"). Sem problemas. |
| Seção "Vídeos" (#videos) | Conteúdo educativo | Títulos informativos ("Mitos sobre direitos trabalhistas", "Como funciona o divórcio"). Sem problemas. |
| Seção "Depoimentos" (#depoimentos, wall + script.js QUOTES) | Depoimentos (UGC) | 11 depoimentos reais do Google. Em sua maioria elogiam atendimento/atenção/profissionalismo — conforme. Dois itens usam superlativos coloquiais de clientes ("um dos melhores advogados", "Muito brabo") — ver observação na seção 5 (recomendação, não alterado). Nenhum depoimento promete resultado processual concreto (não há "ganhamos a causa", "liberdade garantida" etc.). |
| Citação em destaque na seção CTA (Monique Justo) | Depoimento | Elogia "seriedade e sensibilidade", sem promessa de resultado. Sem problemas. |
| FAQ (5 perguntas) | Perguntas/Respostas | Ver correções na seção 4 (FAQ 5). FAQ 1 (plantão 24h) e FAQ 3 (análise inicial sem custo) são informações factuais verdadeiras, mantidas como estão. |
| Localização (#localizacao) | Info técnica | Endereço, horário, mapa. Sem problemas. |
| CTA/Formulário (#contato) | CTA + formulário | "Conte o seu caso. A primeira análise é nossa." — factual/institucional, sem promessa de resultado. Botão "Enviar para análise" é aceitável. Sem problemas. |
| Footer | Institucional | Descrição sóbria do escritório. Sem problemas. |
| Balão WhatsApp premium (HTML) | CTA flutuante | Texto "Atendimento humanizado" é factual/institucional. Sem problemas. |
| JSON-LD (schema.org) | Dados estruturados | Espelha o conteúdo do FAQ visível — corrigido junto (ver seção 4). Demais campos (LegalService, Offers, openingHours) descritivos e técnicos. Sem problemas. |

### termos-e-condicoes.html e politica-de-privacidade.html

| Bloco | Observação |
|---|---|
| Todo o corpo de ambos os documentos | Linguagem jurídica formal, sem qualquer conteúdo promocional. Mencionam corretamente que o site é "institucional e informativo", que não substitui consulta jurídica formal, e citam o Código de Ética da OAB e o sigilo profissional. **Sem problemas — nenhum ajuste necessário.** |

### script.js

| Bloco | Observação |
|---|---|
| Mensagens de validação do formulário | Neutras e instrutivas ("Informe seu nome completo."). Sem problemas. |
| Mensagem de sucesso do formulário | "Tudo certo. Abrimos o WhatsApp com o seu resumo." — informativa, sem promessa. Sem problemas. |
| Array `QUOTES` (depoimentos duplicados do carrossel) | Mesmo conteúdo do wall de depoimentos do HTML — ver observação acima sobre superlativos de clientes. |
| Balão de WhatsApp — texto "Atendimento humanizado" | Institucional, sem gatilho de urgência artificial. Confirma `MODO_COMPLIANCE = true` já configurado (sem badge de notificação falsa, sem "online agora") — o próprio código já foi construído pensando no Provimento 205/2021 da OAB. Sem problemas. |
| Mensagem padrão enviada ao WhatsApp via formulário | "gostaria de uma informação" — neutro. Sem problemas. |

---

## 3. Problemas identificados por categoria (antes da correção)

- **Categoria 1 — Linguagem e Comunicação:** 1 ocorrência de promessa de resultado ("O que garantimos é previsibilidade"), duplicada no JSON-LD (mesma frase, 2 locais no código-fonte, 1 problema de conteúdo).
- **Categoria 2 — CTAs e Ofertas:** nenhuma ocorrência. Todos os CTAs already seguem o padrão "Entre em contato" / "Fale conosco".
- **Categoria 3 — Conteúdo e Evidências:** nenhuma violação crítica. Observação de baixa prioridade sobre superlativos em 2 depoimentos autênticos de terceiros (não editados — ver seção 6).
- **Categoria 4 — Informações Técnicas:** nenhuma ocorrência. OAB de ambos os sócios exibida, descrição técnica dos serviços, menção correta a sigilo profissional nos documentos legais.

---

## 4. Lista de ajustes aplicados

| # | Texto original | Tipo de risco | Texto corrigido | Categoria impactada | Local |
|---|---|---|---|---|---|
| 1 | "Depende da área e da comarca. **O que garantimos é previsibilidade**: você recebe a estimativa de cada etapa e é avisado a cada movimentação relevante, sem juridiquês." | Promessa de resultado/garantia (verbo "garantir" vedado para Nível 1) | "Depende da área e da comarca. **O que oferecemos é previsibilidade**: você recebe a estimativa de cada etapa e é avisado a cada movimentação relevante, sem juridiquês." | Categoria 1 — Linguagem e Comunicação (crítico para Nível 1) | `index.html`, FAQ visível, pergunta 5 (id `faq-5`) |
| 2 | Mesmo texto acima, espelhado no schema.org | Promessa de resultado/garantia (mesma ocorrência, formato de dados estruturados) | Mesma correção aplicada ("garantimos" → "oferecemos") | Categoria 1 — Linguagem e Comunicação (crítico para Nível 1) | `index.html`, bloco `<script type="application/ld+json">`, `FAQPage` → pergunta 5 |

Nenhum outro ajuste textual foi necessário nos quatro arquivos analisados.

---

## 5. Cálculo da pontuação final

| Categoria | Pontuação máxima | Pontuação obtida | Observação |
|---|---|---|---|
| 1. Linguagem e Comunicação | 40 | 39 | Único desconto pontual por "garantimos" (já corrigido no código; nota refletida por documentação da ocorrência original) |
| 2. CTAs e Ofertas | 25 | 25 | Nenhum CTA agressivo; nenhuma menção a preço/parcelamento/promoção; urgência real (plantão 24h) tratada corretamente como informação de serviço |
| 3. Conteúdo e Evidências | 20 | 20 | Nenhum depoimento promete resultado processual; nenhuma comparação com concorrentes; nenhum antes/depois |
| 4. Informações Técnicas | 15 | 15 | OAB exibida para ambos os sócios, descrição técnica dos serviços, referências corretas a sigilo profissional e ética OAB nos documentos legais |
| **Total** | **100** | **99** | |

**Meta para Advocacia (Nível 1):** mínima 95, ideal 100.
**Status:** Excelente — em conformidade. Meta mínima superada; a pequena diferença para o ideal (100) reflete a ocorrência original identificada e já corrigida, mantida no registro para rastreabilidade da auditoria.

---

## 6. Recomendações prioritárias

### Alta prioridade
- Nenhum item de alta prioridade pendente. A única ocorrência crítica de Nível 1 (linguagem de garantia de resultado) foi corrigida em ambos os locais (HTML visível e JSON-LD).

### Média prioridade
- Nenhum item de média prioridade identificado.

### Baixa prioridade (decisão humana recomendada, não alterado)
- **Depoimentos com superlativos coloquiais de clientes** — em `index.html` (seção `#depoimentos`, via `script.js`, array `QUOTES`):
  - Mike Azevedo: "um dos **melhores** advogados que temos"
  - Marcelo Pereira: "**Muito brabo**, só tenho a agradecer"

  Esses são depoimentos autênticos de terceiros publicados no Google (há inclusive um link "Ver no Google" apontando para a fonte original). A skill orienta remover superlativos como "melhor advogado" quando é **discurso do próprio escritório**; aqui o superlativo é a opinião espontânea de um cliente sobre a experiência dele, não uma alegação do escritório sobre si mesmo, e não promete nenhum resultado processual concreto (não é "ganhamos a causa" nem "liberdade garantida"). Por esse motivo, **optei por não editar o texto dos depoimentos**, já que (a) alterar a fala literal de um cliente real levanta questão de autenticidade/veracidade do depoimento, e (b) o risco ético é sensivelmente menor que o de o próprio escritório se autodeclarar "o melhor". Fica como recomendação para decisão do responsável pelo site: se desejar zerar até esse resquício de risco, a alternativa seria trocar esses dois depoimentos específicos por outros da mesma base do Google que não usem superlativos, mantendo a autenticidade.

---

## 7. Conclusão

O site "Isaac & Jefferson Advocacia Estratégica" já refletia, antes desta auditoria, um cuidado evidente com a conformidade ao Provimento 205/2021 da OAB (o próprio `script.js` já continha uma flag `MODO_COMPLIANCE` para o balão de WhatsApp). A auditoria completa dos quatro arquivos solicitados (página principal, termos, política de privacidade e script) encontrou apenas uma ocorrência real de linguagem de garantia de resultado, corrigida em ambos os pontos onde aparecia. O site está em conformidade acima da meta mínima do nicho (95) e muito próximo do ideal (100), com apenas uma recomendação de baixa prioridade deixada para decisão humana quanto a depoimentos de terceiros.
