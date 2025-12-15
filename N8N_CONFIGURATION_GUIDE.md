# 🔧 Guia de Configuração do n8n - SpyMate

## 🎯 Objetivo

Configurar o webhook do n8n para processar consultas e retornar resultados para o frontend.

---

## 📋 Configuração Atual

### **URL do Webhook:**
```
https://n8n-n8n.ck75vf.easypanel.host/webhook/9f0e0a4f-2035-4495-bda2-d07dee24b5af
```

---

## ✅ OPÇÃO 1: Resposta Imediata (Para Testes)

### **Vantagem:**
- ✅ Resultado aparece INSTANTANEAMENTE na tela
- ✅ Usuário vê o relatório na hora
- ✅ Melhor UX para processamento rápido

### **Workflow no n8n:**

```
┌────────────────┐
│ 1. Webhook     │
│    Trigger     │  ← Recebe dados do frontend
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ 2. Function    │
│    Node        │  ← Processa os dados
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ 3. Respond to  │
│    Webhook     │  ← Retorna resultado
└────────────────┘
```

### **Configuração Detalhada:**

#### **Nó 1: Webhook Trigger**
```yaml
Method: POST
Path: /webhook/9f0e0a4f-2035-4495-bda2-d07dee24b5af
Authentication: None
Response Mode: "Respond to Webhook"
```

#### **Nó 2: Function Node (Exemplo de Processamento)**
```javascript
// Receber dados do webhook
const consultationId = $input.item.json.consultationId;
const name = $input.item.json.name;
const phone = $input.item.json.phone;
const address = $input.item.json.address;
const cep = $input.item.json.cep;
const city = $input.item.json.city;
const country = $input.item.json.country;

// AQUI: Coloque sua lógica de processamento
// Exemplo: consultar API externa, processar dados, etc.

// Gerar relatório (exemplo simples)
const report = `
📊 RELATÓRIO DE CONSULTA - SPYMATE
═══════════════════════════════════════

📋 DADOS DA CONSULTA
───────────────────────────────────────
Nome: ${name}
Telefone: ${phone}
Endereço: ${address}
CEP: ${cep}
Cidade: ${city}
País: ${country}

✅ STATUS DA CONSULTA
───────────────────────────────────────
Status: APROVADO
Score de Confiabilidade: 850/1000
Nível de Risco: BAIXO

📝 INFORMAÇÕES ADICIONAIS
───────────────────────────────────────
• Sem pendências financeiras
• Histórico de crédito: Excelente
• CPF: Regular
• Endereço confirmado: Sim
• Telefone ativo: Sim

⚠️ ALERTAS
───────────────────────────────────────
Nenhum alerta encontrado.

🔍 DETALHES TÉCNICOS
───────────────────────────────────────
ID da Consulta: ${consultationId}
Processado em: ${new Date().toLocaleString('pt-BR')}
Método: Análise Automática
Validade: 30 dias

═══════════════════════════════════════
📌 Relatório gerado por SpyMate
   www.spymate.com
`.trim();

// Retornar com o campo 'output'
return {
  consultationId: consultationId,
  output: report,
  status: "completed",
  timestamp: new Date().toISOString()
};
```

#### **Nó 3: Respond to Webhook**
```yaml
Response Mode: "Respond to Webhook"
Response Data: "Use $json from previous node"
Response Code: 200
```

### **Resultado:**
O frontend receberá automaticamente:
```json
{
  "consultationId": "102019a338d...",
  "output": "📊 RELATÓRIO DE CONSULTA...",
  "status": "completed",
  "timestamp": "2025-10-30T14:30:00.000Z"
}
```

E mostrará o relatório INSTANTANEAMENTE! ✨

---

## 🕐 OPÇÃO 2: Processamento Assíncrono (1-3 dias)

### **Vantagem:**
- ⏳ Para processamentos que levam muito tempo
- 📊 Para consultas que dependem de fontes externas
- 🔄 Para workflows complexos

### **Workflow no n8n:**

```
┌────────────────┐
│ 1. Webhook     │
│    Trigger     │  ← Recebe dados
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ 2. Respond to  │
│    Webhook     │  ← Responde "processing"
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ 3. Wait/Delay  │  ← Aguarda processamento
│    (1-3 dias)  │     (ou processa em background)
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ 4. HTTP Request│  ← Atualiza o banco
│    (Callback)  │     quando finalizar
└────────────────┘
```

### **Configuração Detalhada:**

#### **Nó 1: Webhook Trigger**
```yaml
Method: POST
Path: /webhook/9f0e0a4f-2035-4495-bda2-d07dee24b5af
Response Mode: "Respond to Webhook"
```

#### **Nó 2: Function (Salvar ID)**
```javascript
const consultationId = $input.item.json.consultationId;

// Salvar consultationId para usar depois
return {
  consultationId: consultationId,
  inputData: $input.item.json
};
```

#### **Nó 3: Respond to Webhook (Imediato)**
```javascript
return {
  consultationId: $input.item.json.consultationId,
  status: "processing",
  message: "Consulta recebida. Processamento iniciado."
};
```

#### **Nó 4: Wait/Delay (Opcional)**
```yaml
Mode: "Wait for Time"
Amount: 3 (exemplo)
Unit: days
```

#### **Nó 5: Function (Processar)**
```javascript
// AQUI: Sua lógica de processamento real
const consultationId = $input.item.json.consultationId;
const inputData = $input.item.json.inputData;

// Processar dados...
const report = `
📊 RELATÓRIO PROCESSADO APÓS 3 DIAS
...
`;

return {
  consultationId: consultationId,
  output: report
};
```

#### **Nó 6: HTTP Request (Atualizar Banco)**

**⚠️ PROBLEMA:** Como é um app frontend-only, você tem 3 opções:

##### **Opção A: Via Console do Navegador (Manual)**
Copie o script e execute no console do navegador:
```javascript
await window.handleWebhookResponse(
  "{{$json.consultationId}}",
  "{{$json.output}}"
);
```

##### **Opção B: Via Script Node.js (Se tiver acesso ao ORM)**
```javascript
import { handleWebhookResponse } from "./src/lib/webhook-handler.ts";

await handleWebhookResponse(
  "{{$json.consultationId}}",
  "{{$json.output}}"
);
```

##### **Opção C: Criar Endpoint HTTP (Precisa implementar)**
Se você criar um endpoint `/api/webhook-callback`:
```yaml
Method: POST
URL: https://seu-app.com/api/webhook-callback
Headers:
  Content-Type: application/json
Body:
  {
    "consultationId": "{{$json.consultationId}}",
    "output": "{{$json.output}}"
  }
```

---

## 🧪 Como Testar

### **Teste 1: Usando Postman/Insomnia**

```bash
POST https://n8n-n8n.ck75vf.easypanel.host/webhook/9f0e0a4f-2035-4495-bda2-d07dee24b5af
Content-Type: application/json

{
  "consultationId": "test-123",
  "userId": "user-test",
  "userName": "Teste",
  "name": "João Silva",
  "phone": "+55 11 99999-9999",
  "address": "Rua Teste, 123",
  "cep": "12345-678",
  "country": "Brasil",
  "city": "São Paulo",
  "neighborhood": "Centro",
  "timestamp": "2025-10-30T14:30:00.000Z"
}
```

**Resposta esperada (Opção 1):**
```json
{
  "consultationId": "test-123",
  "output": "📊 RELATÓRIO DE CONSULTA...",
  "status": "completed"
}
```

### **Teste 2: Pelo Frontend**

1. Abra o app
2. Clique em "Fazer Consulta" no WhatsApp
3. Preencha o formulário
4. Clique em "Enviar"
5. **Resultado esperado:**
   - Se output retornar → Mostra relatório
   - Se não retornar → Mostra terminal

---

## 📊 Exemplos de Relatórios

### **Exemplo 1: Relatório Simples**
```javascript
const report = `
Nome: ${name}
Telefone: ${phone}
Status: Aprovado

✅ Consulta finalizada com sucesso!
`.trim();
```

### **Exemplo 2: Relatório Detalhado**
```javascript
const report = `
📊 RELATÓRIO DE CONSULTA - SPYMATE
═══════════════════════════════════════

📋 DADOS PESSOAIS
───────────────────────────────────────
Nome Completo: ${name}
Telefone: ${phone}
Endereço: ${address}
CEP: ${cep}
Cidade: ${city} - ${country}

✅ ANÁLISE DE CRÉDITO
───────────────────────────────────────
Score: 850/1000 (Excelente)
Situação CPF: Regular
Histórico: Sem pendências

🔍 VERIFICAÇÕES REALIZADAS
───────────────────────────────────────
[✓] Consulta SPC/Serasa
[✓] Validação de documentos
[✓] Verificação de endereço
[✓] Análise comportamental

⚠️ ALERTAS
───────────────────────────────────────
Nenhum alerta encontrado.

═══════════════════════════════════════
Gerado em: ${new Date().toLocaleString('pt-BR')}
Válido por: 30 dias
`.trim();
```

### **Exemplo 3: Relatório com JSON**
```javascript
const reportData = {
  personal: {
    name: name,
    phone: phone,
    address: address
  },
  analysis: {
    score: 850,
    status: "approved",
    risk: "low"
  },
  alerts: []
};

const report = `
📊 RELATÓRIO DE CONSULTA

${JSON.stringify(reportData, null, 2)}
`.trim();
```

---

## 🎯 Recomendação

### **Para Desenvolvimento/Testes:**
✅ Use **OPÇÃO 1** (Resposta Imediata)
- Mais fácil de testar
- Feedback instantâneo
- Melhor UX

### **Para Produção:**
🔄 Use **OPÇÃO 2** (Assíncrono) se realmente precisar de 1-3 dias
- Para consultas em APIs externas lentas
- Para processamento complexo
- Para integração com sistemas externos

---

## 📝 Checklist de Configuração

### **n8n:**
- [ ] Webhook configurado para receber POST
- [ ] Nó "Respond to Webhook" adicionado
- [ ] Campo `output` incluído na resposta
- [ ] Workflow ativado
- [ ] Testado com Postman/Insomnia

### **Frontend:**
- [x] Sistema detecta campo `output` automaticamente
- [x] Atualiza banco quando `output` existe
- [x] Mostra relatório instantaneamente
- [x] Polling funcionando (10s)
- [x] Persistência funcionando

---

## 🚀 Próximos Passos

1. **Configure o n8n** usando a OPÇÃO 1
2. **Teste com dados de exemplo** via Postman
3. **Teste pelo frontend** criando uma consulta real
4. **Verifique se o relatório aparece** instantaneamente
5. **Ajuste o formato do relatório** conforme necessário

---

**✨ Com esta configuração, o sistema funcionará perfeitamente!** 🎉
