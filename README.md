# AlertaGeo

## Descrição do problema
O município e a população sofrem com a falta de um sistema centralizado para identificar, registrar e acompanhar áreas de risco, como encostas instáveis, alagamentos, desmoronamentos, riscos de queimadas e pontos com infraestrutura vulnerável. Em muitos casos, as ocorrências são comunicadas de forma isolada por moradores, órgãos públicos e equipes de campo, o que dificulta a priorização das ações corretivas e a resposta rápida às emergências.

## Público afetado
- moradores de áreas vulneráveis;
- fiscais e operadores de infraestrutura urbana;
- secretarias municipais de mobilidade, meio ambiente e obras;
- equipes de resposta emergencial;
- gestores públicos.

## Proposta de solução
O AlertaGeo será uma plataforma web para registrar e monitorar áreas de risco, acompanhar alertas e permitir a comunicação entre administração pública e comunidade. A solução centraliza dados, organiza prioridades e apoia decisões com base em informações estruturadas, como localização, nível de risco, status da área, responsável e histórico de ocorrências.

## Funcionalidades previstas
- cadastro de usuários com perfis distintos;
- autenticação com JWT e controle de acesso;
- cadastro de áreas de risco;
- registro de alertas e incidentes;
- histórico de ocorrências e atualização de status;
- painel administrativo com indicadores e filtros;
- visualização de dados em interface web com HTML, CSS e JavaScript;
- integração com API REST do back-end em Node.js e Express.

## Perfis de usuário e ações previstas
### Administrador
- gerencia usuários;
- aprova ou altera situações críticas;
- visualiza todos os registros e indicadores;
- define prioridades e ações.

### Operador de campo
- cadastra áreas e incidentes;
- atualiza status das ocorrências;
- registra observações e evidências;
- consulta dados por região.

### Morador / Comunidade
- reporta problemas e observações;
- visualiza alertas relevantes da região;
- envia informações e confirma eventos.

## Fluxo básico do sistema
1. O usuário acessa a aplicação e realiza cadastro ou login.
2. A autenticação valida as credenciais e gera um token JWT.
3. O usuário cadastra uma área de risco ou registra uma ocorrência.
4. A API valida as regras de negócio e armazena as informações no banco de dados.
5. O sistema disponibiliza indicadores e alertas para usuários autorizados.
6. Gestores e operadores acompanham as ocorrências e tomam decisões.

## Estrutura inicial do projeto
```text
alertageo/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── database/
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── css/
│   ├── js/
│   └── index.html
├── sql/
│   └── schema.sql
├── .gitignore
├── .env.example
├── README.md
├── package.json
└── .git/
```

## Tecnologias previstas
- Node.js
- Express
- MySQL
- JWT
- HTML
- CSS
- JavaScript
- Fetch API

## Observações da entrega
Esta entrega inicial organiza o problema, a proposta de solução, os perfis de usuário, a arquitetura e a estrutura do repositório do projeto. A próxima etapa será o desenvolvimento do banco de dados e da autenticação com JWT.
