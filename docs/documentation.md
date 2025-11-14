# Projeto
O projeto segue o layout presente no arquivo da ficha de papel em pdf:
[text](<Ficha de Avaliação COSAPS.pdf>)

O HTML e CSS implementado tenta replicar o visual dessa ficha.

## Estrutura
- O projeto é buildado com next, para fazer deploy com o vercel
- A navegação é feita usando a biblioteca Link do react, que faz esse gerenciamento pela própria URL (sem props :/ )
- Depende do react-hook-form, XLSX, googleapis, e sabe deus mais lá oque

## implementação do formulário:
- A ideia de ter feito essa página era a de que ela poderia ser uma "ficha interativa" que permitiria a visualização dos dados,
o que eu entendi como a forma mais dinâmica de fazer o recarregamento dos dados era "arrastar um arquivo para a tela" e o resultado 
aparecer de forma responsiva
- Usa o react-hook-form para permitir o reset dos dados do formulário de maneira simples a partir de um JSON gerado
as funções handleFile, handleDrop e load_file fazem esse reset usando a classe fileReader
- para fazer a permanência dos dados do formulário ao longo das páginas, o formulário foi implementado usando a interface: [text](../src/types/inputs.tsx)
(que contém os campos do formulário, eles são chamados ao longo do HTML usando o register()), e o formulário foi colocado em um react context para evitar
que todo o conteúdo do formulário fosse carregado e alterado simultâneamente em todas as páginas


## Googleapis(Drive v3)
- O projeto não implementa qualquer tipo de BD local, em vez disso os arquivos são adicionado, coletados e removidos do drive do email do projeto cosaps
