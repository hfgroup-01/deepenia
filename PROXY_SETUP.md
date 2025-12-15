# 🚀 Configuração do Proxy API - Solução para CORS

## 📋 Visão Geral

Este projeto agora utiliza um **servidor proxy** para resolver problemas de CORS ao se comunicar com a API externa da Creao.ai (`https://api-production.creao.ai`).

### ✅ O que foi implementado:

1. **Servidor Proxy Express.js** (`proxy-server.js`)
   - Intercepta todas as chamadas do frontend
   - Faz requisições para a API externa
   - Adiciona headers CORS apropriados
   - Repassa as respostas para o frontend

2. **Configuração Automática por Ambiente**
   - **Desenvolvimento**: Usa `http://localhost:3001/api`
   - **Produção**: Usa `/api` (requer configuração de servidor)

3. **Scripts NPM Atualizados**
   - `npm run dev:proxy` - Inicia apenas o servidor proxy
   - `npm run dev` - Inicia apenas o frontend Vite
   - `npm run dev:all` - Inicia ambos simultaneamente
   - `npm start` - Alias para `dev:all`

## 🔧 Como Usar

### 1. Instalar Dependências

```bash
npm install
```

Isto irá instalar as novas dependências:
- `express` - Servidor HTTP
- `cors` - Middleware CORS
- `node-fetch` - Cliente HTTP para Node.js
- `concurrently` - Executar múltiplos comandos simultaneamente

### 2. Iniciar a Aplicação

**Opção 1: Iniciar tudo de uma vez (Recomendado)**
```bash
npm start
```
ou
```bash
npm run dev:all
```

**Opção 2: Iniciar separadamente**

Terminal 1 - Proxy Server:
```bash
npm run dev:proxy
```

Terminal 2 - Frontend Vite:
```bash
npm run dev
```

### 3. Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **Proxy Server**: http://localhost:3001
- **Health Check do Proxy**: http://localhost:3001/health

## 📁 Arquivos Modificados

### 1. `proxy-server.js` (NOVO)
Servidor Express.js que atua como intermediário entre o frontend e a API da Creao.ai.

**Endpoints disponíveis:**
- `POST /api/data/store/v1/*` - Operações do DataStore
- `GET /api/me` - Validação de autenticação
- `POST /api/execute-apis/v2/:apiId` - Execução de APIs
- `GET /health` - Status do servidor proxy

### 2. `src/components/data/orm/client.ts`
```typescript
// ANTES
const BASE_URL = "https://api-production.creao.ai";

// DEPOIS
const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3001/api"
  : "/api";
```

### 3. `src/lib/auth-integration.ts`
```typescript
// ANTES
const API_BASE_URL = import.meta.env.VITE_API_BASE_PATH;

// DEPOIS
const API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:3001/api"
  : "/api";
```

### 4. `src/components/api/schemas/OpenAIGPTChat/core/OpenAPI.ts`
```typescript
// ANTES
BASE: 'https://api-production.creao.ai/execute-apis/v2'

// DEPOIS
BASE: import.meta.env.DEV
  ? 'http://localhost:3001/api/execute-apis/v2'
  : '/api/execute-apis/v2'
```

### 5. `package.json`
Novos scripts e dependências adicionados.

## 🔄 Fluxo de Requisições

### Desenvolvimento (DEV)
```
Frontend (localhost:3000)
    ↓
Proxy Server (localhost:3001)
    ↓
API Creao.ai (https://api-production.creao.ai)
    ↓
Proxy Server (localhost:3001)
    ↓
Frontend (localhost:3000)
```

### Produção (PROD)
```
Frontend (/app)
    ↓
Mesmo servidor (/api)
    ↓
API Creao.ai (https://api-production.creao.ai)
    ↓
Mesmo servidor (/api)
    ↓
Frontend (/app)
```

## ⚙️ Configuração de Produção

Para produção, você precisa configurar seu servidor web (Nginx, Apache, etc.) para fazer proxy de `/api` para `https://api-production.creao.ai`.

### Exemplo com Nginx:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    # Servir arquivos estáticos do frontend
    location / {
        root /var/www/dist;
        try_files $uri $uri/ /index.html;
    }

    # Proxy para API Creao.ai
    location /api/ {
        proxy_pass https://api-production.creao.ai/;
        proxy_set_header Host api-production.creao.ai;
        proxy_set_header Authorization $http_authorization;
        proxy_set_header Content-Type application/json;
        proxy_ssl_server_name on;
    }
}
```

### Exemplo com Apache:

```apache
<VirtualHost *:80>
    ServerName seu-dominio.com
    DocumentRoot /var/www/dist

    # Proxy para API Creao.ai
    ProxyPass /api/ https://api-production.creao.ai/
    ProxyPassReverse /api/ https://api-production.creao.ai/

    # Configuração para o frontend
    <Directory /var/www/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        # Roteamento do SPA
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

## 🐛 Solução de Problemas

### Erro: "EADDRINUSE: address already in use"
A porta 3001 já está em uso. Altere a porta no `proxy-server.js`:
```javascript
const PORT = process.env.PROXY_PORT || 3002; // Mude para outra porta
```

### Erro: "Failed to fetch"
1. Verifique se o proxy server está rodando
2. Verifique se a porta 3001 está acessível
3. Verifique o console do proxy server para erros

### Erro CORS ainda aparece
1. Certifique-se de que o proxy server está rodando
2. Verifique se as URLs no código apontam para `localhost:3001` em dev
3. Limpe o cache do navegador

## 📊 Monitoramento

O proxy server registra todas as requisições no console:

```
[2025-11-10T12:00:00.000Z] POST /api/data/store/v1/get
[2025-11-10T12:00:01.000Z] GET /api/me
```

Para verificar o status do servidor:
```bash
curl http://localhost:3001/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "message": "Proxy server is running",
  "timestamp": "2025-11-10T12:00:00.000Z",
  "target": "https://api-production.creao.ai"
}
```

## ✅ Benefícios da Solução

1. ✅ **Resolve CORS completamente** - Todas as requisições passam pelo seu servidor
2. ✅ **Segurança** - Tokens não são expostos ao navegador
3. ✅ **Controle** - Você pode adicionar logging, rate limiting, etc.
4. ✅ **Flexibilidade** - Fácil adicionar novos endpoints
5. ✅ **Compatibilidade** - Funciona em qualquer ambiente

## 📝 Notas Importantes

- O servidor proxy **não deve** ser usado em produção diretamente
- Para produção, use um servidor web profissional (Nginx, Apache)
- Mantenha as dependências atualizadas
- Monitore os logs do proxy para identificar problemas

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs do console do proxy server
2. Verifique os logs do console do navegador
3. Teste o endpoint `/health` do proxy
4. Verifique se todas as dependências foram instaladas
