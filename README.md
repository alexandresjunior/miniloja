# MiniLoja — repositório de referência do workshop

Repositório de apoio do workshop **React JS com Desenvolvimento Assistido por IA** (6 horas).
O projeto construído ao longo do curso é a **MiniLoja**: uma loja virtual para pequenos negócios
(cliente fictício: *Casa Nativa*), com vitrine, carrinho, painel do lojista com CRUD de produtos,
rotas, validação de formulários, testes e deploy.

## Como este repositório funciona

Cada módulo possui uma **branch de referência** com o projeto exatamente como deve estar **ao final**
daquele módulo. Cada branch contém a anterior, então o histórico mostra a evolução do projeto.

| Branch     | Módulo                                              | Duração | O que o projeto tem ao final                                   |
| ---------- | --------------------------------------------------- | ------- | -------------------------------------------------------------- |
| `modulo-1` | Fundamentos, IA como parceira e setup               | 40 min  | App Vite rodando, dependências instaladas, primeiro commit      |
| `modulo-2` | Componentes, props e JSX                            | 60 min  | Vitrine com Header, ProductGrid e ProductCard (dados mockados)  |
| `modulo-3` | Estado e eventos: o carrinho                        | 60 min  | Carrinho completo em memória, com regras de estoque e totais    |
| `modulo-4` | Efeitos e API: CRUD de produtos                     | 75 min  | Catálogo via `json-server` e painel do lojista com CRUD         |
| `modulo-5` | Formulários, validação e rotas                      | 60 min  | 7 rotas, detalhe do produto, validação e checkout via WhatsApp  |
| `modulo-6` | Qualidade: refatoração, testes e revisão de IA      | 40 min  | Hooks `useProducts`/`useCart` e 3+ testes com Vitest            |
| `modulo-7` | Deploy, retrospectiva e próximos passos             | 25 min  | Modo demonstração (localStorage), configs de deploy, build final |

A branch `main` contém apenas este README. As branches `modulo-N` são lineares: `modulo-2` = `modulo-1` + o trabalho do módulo 2, e assim por diante.

## Usando as branches

```bash
git clone <url-do-repositorio> miniloja
cd miniloja
git checkout modulo-3     # vai para o ponto de chegada do módulo 3
npm install
npm run dev
```

Se um aluno travar, ele pode trazer os arquivos da branch de referência para a própria pasta:

```bash
git checkout modulo-N -- .
npm install
```

> Atenção: isso sobrescreve os arquivos atuais. Faça um commit antes, para poder desfazer.

## Requisitos

- Node.js 20 ou superior (testado com Node 22)
- Git
- Editor (VS Code) e uma ferramenta de IA gratuita

## Scripts (a partir do módulo 4)

| Comando             | O que faz                                                 |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento (Vite) em `http://localhost:5173` |
| `npm run api`       | API simulada (`json-server`) em `http://localhost:3001`   |
| `npm run api:slow`  | Mesma API com atraso de 1,5 s (para testar o loading)     |
| `npm run test:run`  | Executa os testes uma vez (a partir do módulo 6)          |
| `npm run build`     | Gera o build de produção em `dist/`                       |
| `npm run preview`   | Serve o build localmente                                  |

A API e o Vite rodam **ao mesmo tempo**, em dois terminais.

## Restaurar o catálogo

O `json-server` grava as alterações em `db.json`. Para voltar ao catálogo original:

```bash
git checkout db.json
```

## Segurança

Nunca versione chaves, tokens ou dados pessoais. Toda variável `VITE_*` é **pública**: ela é
embutida no JavaScript do build. Arquivos `.env*.local` já estão no `.gitignore`.
