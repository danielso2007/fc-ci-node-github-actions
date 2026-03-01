# Node Web App

Aplicação Node.js com:
- Servidor HTTP via Express
- Porta 3000
- Página HTML com input + submit
- Testes unitários (Jest + Supertest)
- Coverage (LCOV)
- Análise SonarQube
- Containerização Docker com multi-stage build
- Scripts de controle do container

## Estrutura do Projeto
```shell
node-web-app/
├── src/
│   ├── app.js
│   └── server.js
├── views/
│   └── index.html
├── __tests__/
│   └── app.test.js
├── Dockerfile
├── start.sh
├── stop-remove.sh
├── package.json
└── sonar-project.properties
```

## Pré-requisitos

- Node 20+
- NPM 9+
- Docker 24+

Verificação:
```bash
node -v
npm -v
docker -v
```

## Executando Localmente (Node)
- Instalar dependências
```bash
npm install
```
- Iniciar servidor
```bash
npm start
```

Acessar:
```
http://localhost:3000
```

## Executando Testes
```bash
npm test
```

Coverage será gerado em:
```
coverage/lcov.info
coverage/index.html
```

Abrir relatório (Linux):
```bash
xdg-open coverage/index.html
```

## Executando com Docker

- Build manual
```bash
docker build -t node-web-app .
```
- Executar manualmente
```bash
docker run -d \
  --name node-web-app-container \
  -p 3000:3000 \
  node-web-app
```

Acessar:
```
http://localhost:3000
```

## Usando Scripts
#### Start (build + run idempotente)
```bash
./start.sh
```
O script:
- Executa build
- Remove container antigo (se existir)
- Sobe container em background
- Configura restart policy
- Expõe porta 3000

#### Stop + Remove
```bash
./stop-remove.sh
```

O script:
- Para o container
- Remove o container
- Evita erro se não existir

## Detalhes Técnicos do Dockerfile

- Multi-stage build
- npm ci para instalação determinística
- Execução com usuário não-root
- Porta 3000 exposta
- Healthcheck HTTP configurado
- Imagem baseada em node:20-alpine

## SonarQube

#### Gerar coverage
```bash
npm test -- --coverage
```
#### Executar scanner
```bash
sonar-scanner
```

#### Configuração relevante

Arquivo `sonar-project.properties`:
- `sonar.sources=src`
- `sonar.tests=__tests__`
- `sonar.javascript.lcov.reportPaths=coverage/lcov.info`

## Funcionamento Técnico
### Express
- `express.urlencoded()` → parse de formulário
- `express.static()` → serve `views/index.html`
- `POST /submit` → retorna HTML com valor digitado

### Testabilidade
- `app.js` exporta instância Express
- `server.js` apenas inicia `listen`
- Supertest executa requests sem subir servidor real
- Coverage integrado via Jest

### Docker
- Build determinístico (`npm ci`)
- Runtime isolado
- Execução segura (non-root)
- Healthcheck configurado
- Restart automático (`unless-stopped`)

## Fluxo Completo
```
npm install
     ↓
npm test (gera coverage)
     ↓
docker build
     ↓
./start.sh
```

## Acesso Final

Aplicação disponível em:
```
http://localhost:3000
```
