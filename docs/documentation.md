# Projeto
O projeto segue o layout presente no arquivo da ficha de papel em pdf:
[text](<./Ficha de Avaliação COSAPS.pdf>)

O HTML e CSS implementado tenta replicar o visual dessa ficha.

## Estrutura
- O projeto é buildado com next, para fazer deploy com o vercel
- A navegação é feita usando a biblioteca Link do react, que faz esse gerenciamento pela própria URL, com o conteúdo de todas as páginas armazenado a partir da pasta protected
- O gerenciamento das rotas é feito por sessões de tokens JWT gerados no arquivo lib/session.ts usando a biblioteca crypto, armazenados em cookies do navegador e verificados pelo api/login

## Dependências do projeto
É possível encontrar as dependências do projeto no package.json
- react-hook-form
- XLSX
- BestSheets
- googleapis
- crypto
- As credenciais do next, googleApis e secret, estão no env.local e devem ser coletadas com os responsáveis pelo projeto (não colocar no github, por favor)

## implementação do formulário:
- A ideia de ter feito essa página era a de que ela poderia ser uma "ficha interativa" que permitiria a visualização dos dados,
o que eu entendi como a forma mais dinâmica de fazer o recarregamento dos dados era "arrastar um arquivo para a tela" e o resultado 
aparecer de forma responsiva
- Usa o react-hook-form para permitir o reset dos dados do formulário de maneira simples a partir de um JSON gerado
as funções handleFile, handleDrop e load_file fazem esse reset usando a classe fileReader
- para fazer a permanência dos dados do formulário ao longo das páginas, o formulário foi implementado usando a interface: [text](../src/types/inputs.tsx) (que contém os campos do formulário, manipulados no HTML com register()), e o formulário foi colocado em um react context para otimizar evitando que todo o conteúdo do formulário fosse carregado e alterado simultâneamente em todas as páginas a cada render do react

# Apis do projeto

## app/api
A implementação de requisições HTTP entre as páginas do front-end está é feita pelas rotas a partir do /app/api/ as requisições são feitas de forma simples da mesma forma que em APIs REST mas funcionando dentro do próprio front-end
## Googleapis(Drive v3)
Implementação atual
- O projeto não implementa qualquer tipo de BD local, em vez disso os arquivos são adicionados, coletados e removidos do drive do email do projeto cosaps
- 
