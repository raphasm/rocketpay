--Como pegar o ano atual no js--

- new Date().getFullYear

-IMask-

blocks:

- define o que vc vai querer boquear

from:

- é de que numero vai começar

to:

- é até que numero que vai poder ir

        ---Espressoes Regulares---

- Tambem é conhecida como Regular Expressin ou Regex

- É usada para buscar padrões dentro de textos

- Funciona em varias linguagens

Dicas de como entender:

- Leitura da esquerda para direita
- Ler um caracter de cada vez, um após o outro
- Conhecer os caracteres reservados da tecnologia

sintaxe:
const re = /foo/;
entre as barras '/' sempre vai ter uma espressao regular

const re = new ReaExp(/foo/);

exemplos:

match:

- o match agrupa os padroes dentro de um Array

const matches = 'aBC'.match(/[A-Z]/g);
// Resultado: Array [B, C]

// O /g significa para buscar em todo texto
// Buscando padroes entre A e Z maiusculos

search:

- o search pesquisa se tem algum padrão ou não

const index = 'aBC'.search(/[A-Z]/);
// Resultado: 1

// Se ele encontrar ele retorna '1'

replace:

- substitue os padões por um novo valor

const next = 'aBC'.replace(/a/, 'A');
// Resultado: ABC
// ele esta procurando pelo /a/ e substituindo pelo 'A'
