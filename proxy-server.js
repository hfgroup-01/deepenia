/**
 * Proxy Server para resolver problemas de CORS
 *
 * Este servidor atua como intermediário entre o frontend e a API externa
 * da Creao.ai, resolvendo problemas de CORS ao fazer as requisições do lado
 * do servidor.
 */

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PROXY_PORT || 3001;
const CREAO_API_BASE = 'https://api-production.creao.ai';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Log de requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

/**
 * Função auxiliar para fazer proxy de requisições
 */
async function proxyRequest(req, res, endpoint) {
  const fullUrl = `${CREAO_API_BASE}${endpoint}`;

  try {
    // Copiar headers relevantes
    const headers = {
      'Content-Type': 'application/json',
    };

    // Adicionar token de autorização se existir
    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }

    // Fazer a requisição para a API externa
    const response = await fetch(fullUrl, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    // Obter resposta
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Retornar resposta com o mesmo status code
    res.status(response.status).json(data);
  } catch (error) {
    console.error(`Erro ao fazer proxy para ${fullUrl}:`, error);
    res.status(500).json({
      error: 'Erro interno do servidor proxy',
      message: error.message,
      endpoint: endpoint,
    });
  }
}

// ============================================
// ENDPOINTS DO DATA STORE
// ============================================

// GET /data/store/v1/all
app.post('/api/data/store/v1/all', async (req, res) => {
  await proxyRequest(req, res, '/data/store/v1/all');
});

// POST /data/store/v1/insert
app.post('/api/data/store/v1/insert', async (req, res) => {
  await proxyRequest(req, res, '/data/store/v1/insert');
});

// POST /data/store/v1/purge
app.post('/api/data/store/v1/purge', async (req, res) => {
  await proxyRequest(req, res, '/data/store/v1/purge');
});

// POST /data/store/v1/get
app.post('/api/data/store/v1/get', async (req, res) => {
  await proxyRequest(req, res, '/data/store/v1/get');
});

// POST /data/store/v1/set
app.post('/api/data/store/v1/set', async (req, res) => {
  await proxyRequest(req, res, '/data/store/v1/set');
});

// POST /data/store/v1/delete
app.post('/api/data/store/v1/delete', async (req, res) => {
  await proxyRequest(req, res, '/data/store/v1/delete');
});

// POST /data/store/v1/mget
app.post('/api/data/store/v1/mget', async (req, res) => {
  await proxyRequest(req, res, '/data/store/v1/mget');
});

// POST /data/store/v1/mset
app.post('/api/data/store/v1/mset', async (req, res) => {
  await proxyRequest(req, res, '/data/store/v1/mset');
});

// POST /data/store/v1/list
app.post('/api/data/store/v1/list', async (req, res) => {
  await proxyRequest(req, res, '/data/store/v1/list');
});

// POST /data/store/v1/increase_counter
app.post('/api/data/store/v1/increase_counter', async (req, res) => {
  await proxyRequest(req, res, '/data/store/v1/increase_counter');
});

// POST /data/store/v1/count_ranked_list
app.post('/api/data/store/v1/count_ranked_list', async (req, res) => {
  await proxyRequest(req, res, '/data/store/v1/count_ranked_list');
});

// ============================================
// ENDPOINTS DE AUTENTICAÇÃO
// ============================================

// GET /me - Validação de token
app.get('/api/me', async (req, res) => {
  await proxyRequest(req, res, '/me');
});

// ============================================
// ENDPOINTS DE EXECUTE APIS
// ============================================

// POST /execute-apis/v2/*
app.post('/api/execute-apis/v2/:apiId', async (req, res) => {
  const apiId = req.params.apiId;
  await proxyRequest(req, res, `/execute-apis/v2/${apiId}`);
});

// ============================================
// ROTA DE HEALTH CHECK
// ============================================

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Proxy server is running',
    timestamp: new Date().toISOString(),
    target: CREAO_API_BASE,
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════');
  console.log('   🚀 Proxy Server Iniciado com Sucesso!');
  console.log('═══════════════════════════════════════════════');
  console.log(`   Porta:          ${PORT}`);
  console.log(`   API Destino:    ${CREAO_API_BASE}`);
  console.log(`   Health Check:   http://localhost:${PORT}/health`);
  console.log('═══════════════════════════════════════════════');
  console.log('');
  console.log('Endpoints disponíveis:');
  console.log('  - POST /api/data/store/v1/*');
  console.log('  - GET  /api/me');
  console.log('  - POST /api/execute-apis/v2/:apiId');
  console.log('');
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
