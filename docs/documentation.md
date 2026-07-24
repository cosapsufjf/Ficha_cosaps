# Documentação
## 1) Objetivo do sistema

O projeto segue o layout presente no arquivo da ficha de papel em pdf:
[Ficha de Avaliação COSAPS](<./Ficha de Avaliação COSAPS.pdf>)

O HTML e CSS implementado tenta replicar o visual dessa ficha.

A implementação prioriza:

- fidelidade visual ao documento físico.
- preenchimento interativo e reaproveitamento de dados.
- controle de acesso por sessão.
- persistência externa via APIs Google (sem banco local).

---

## 2) Stack e dependências principais

## 2.1 Stack base
- **Next.js** (front + rotas de API internas)
- **React**
- **TypeScript**
- **CSS**

## 2.2 Dependências funcionais citadas no projeto
- **react-hook-form**: controle de formulário, validações, reset e submissão.
- **XLSX**: suporte a leitura/transformação de dados em formato de planilha.
- **BestSheets**: integração complementar para manipulação em contexto de planilhas.
  - No futuro é ideal fazer uma implementação própria.
- **googleapis**: cliente oficial para Google Drive/Sheets.
- **crypto**: base para geração/verificação de sessão/token no backend.

## 2.3 Gestão de segredos
Credenciais ficam em `.env.local` (não versionado), incluindo:
- segredos de sessão/autenticação.
- credenciais Google APIs.
- variáveis de configuração do Next.

---

## 3) Estrutura de pastas e responsabilidades

> A estrutura da hierarquia de pastas do projeto foi separada como:

- `docs/`
  - documentação funcional/técnica.
  - referência do PDF usado como modelo visual da ficha.

- `app/`
  - camada de páginas do Next (App Router).
  - `app/api/`: endpoints HTTP internos da aplicação (auth + integrações).

- `src/`
  - componentes, tipos e lógica de domínio do formulário.
  - destaque para `src/types/inputs.tsx` como contrato de dados da ficha.

- `lib/`
  - utilitários de infraestrutura.
  - `lib/session.ts`: criação/verificação de sessão/token com `crypto`.

- `protected/`
  - agrupamento de conteúdo/páginas que exigem autenticação válida.
  
- `context/`
  - contextos React utilizados para compartilhamento de estado global.
  
- `hooks/`
  - Custom hooks utilizados ao longo do projeto, vinculados aos contexts.

- `utils/`
  - utilitários do projeto, e funções genéricas reutilizáveis.
  - No futuro, mudar algumas funções da API para uma seção própria.

---

## 4) Arquitetura de autenticação e navegação

## 4.1 Modelo de sessão
O sistema usa sessão baseada em **JWT** (ou estrutura equivalente assinada) em cookie.  
Fluxo típico:

1. Usuário autentica via endpoint (`app/api/login` ou equivalente).
2. Backend gera token/sessão assinada.
3. Cookie é gravado no navegador.
4. Rotas protegidas validam cookie/token antes de responder/renderizar.
5. Em caso de sessão inválida/expirada, usuário é redirecionado para login.

## 4.2 Navegação
A navegação entre páginas ocorre por rota/URL, com componentes de link e páginas protegidas agrupadas.  
Esse modelo favorece:
- deep-linking.
- histórico do navegador.
- separação de fluxo público vs autenticado.

---

## 5) Modelagem de dados do formulário

## 5.1 Contrato principal (`inputs`)
A interface em `src/types/inputs.tsx` define o shape dos dados do formulário e serve como contrato único entre:
- UI.
- validação.
- transformação para payload.
- persistência externa.

## 5.2 Benefícios da tipagem
- evita divergência de nomes/tipos de campos.
- melhora a manutenção do código.
- reduz risco de quebra em refatoramentos.

---

## 6) Implementação do formulário (react-hook-form)

## 6.1 Estratégia geral
Uso de `react-hook-form` para:
- registrar campos.
- validar.
- acompanhar erros.
- resetar formulário com dados carregados externamente (JSON/arquivo).

## 6.2 Fluxo de carregamento por arquivo
Lógica principal implementada nos hooks de arquivo `f_file.ts`
- `handleFile`, `handleDrop`, `load_file` processam upload/drag-and-drop.
- `FileReader` lê conteúdo do arquivo.
- resultado é convertido para JSON compatível com `inputs`.
- `reset()` do RHF repopula o formulário.

## 6.3 Efeito prático
- usuário reaproveita preenchimento anterior.
- recarregamento de ficha sem digitar tudo novamente.
- experiência mais próxima de “ficha interativa”.

## 6.4 Cuidados de robustez
- validar schema antes de `reset`.
- lidar com campos ausentes/extras.
- mostrar mensagens de erro por tipo (arquivo inválido, JSON malformado, incompatibilidade de versão).

---

## 7) Estado compartilhado com Context + custom hooks

## 7.1 Papel dos contexts
Contexts devem encapsular:
- estado global da ficha (dados atuais, etapa atual, status).
- operações de domínio (atualizar campo, limpar, salvar parcial, concluir envio).
- a ideia é evitar re-renders desnecessários e manter o site mais performático.

## 7.2 Papel dos custom hooks
Hooks customizados (ex.: `useFileActions`, `useListActions`) expõem API estável para componentes:
- evitam import direto de contexto em todo lugar.
- concentram validações e regras.
- reduzem repetição.

## 7.3 Resultado arquitetural
- componentes mais burrinhos (foco na UI).
- regras concentradas.
- melhor testabilidade.

---

## 8) Camada de API interna (`app/api`)

## 8.1 Objetivo
Servir como backend interno para:
- autenticação/sessão.
- operações de integração com Google APIs.
- proteção de segredos (nunca expor token/credencial no client).

## 8.2 Padrão recomendado de implementação
- handlers pequenos, com serviço separado (ex.: `services/googleDrive.ts`).
- validação de input na entrada.
- tratamento de erro padronizado (código + mensagem amigável + log técnico).

---

## 9) Integração Google Drive e Google Sheets

## 9.1 Estratégia de persistência
Sem banco local. Dados/arquivos vivem em serviços Google:
- **Drive**: armazenamento e gestão de arquivos.
- **Sheets**: persistência tabular dos campos da ficha.

## 9.2 Fluxo típico de submissão
1. Validar dados no front.
2. Enviar payload para endpoint interno.
3. Endpoint normaliza/valida novamente.
4. Grava dados no Sheets.
5. Salva/associa arquivos no Drive (quando aplicável).
6. Retorna status final para UI.

## 9.3 Riscos operacionais
- quotas/rate limits.
- latência externa.
- falhas transitórias de API.
- permissões/pastas incorretas no Drive.

---

## 10) Fidelidade ao PDF e estrutura visual

A UI foi construída para espelhar a ficha de papel.  
Isso traz ganho de usabilidade para quem já conhece o documento original, mas aumenta complexidade de:
- responsividade.
- manutenção de estilos.
- consistência entre campos visuais e modelo de dados.

---

## 11) Sugestão de manutenção

- Tratar `src/types/inputs.tsx` como contrato central.
- Evitar lógica de negócio em componentes de apresentação.
- Centralizar acesso às integrações em serviços.
- Padronizar retorno de erro da API.
- Cobrir ao menos:
  - parsing de arquivo.
  - normalização de payload.
  - autenticação/expiração.
  - caminho feliz de submissão.

---
