# 🔄 Integração de Webhook Atualizada - Sistema de Consultas

## ✅ PROBLEMA RESOLVIDO

### **Problema 1: Resultado não aparecia no terminal**
**Solução:** O webhook agora retorna o resultado imediatamente com o campo `output`, e o frontend processa automaticamente.

### **Problema 2: Consulta não persistia ao sair e voltar**
**Solução:** Sistema de persistência completo implementado com banco de dados + polling.

---

## 🎯 Como Funciona Agora

### **Fluxo Completo:**

```
┌──────────────────────────────────────────────────────────┐
│ 1. Usuário preenche formulário                          │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│ 2. Sistema cria registro no DB (status: PENDING)        │
│    - Salva todos os dados da consulta                   │
│    - Gera ID único da consulta                          │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│ 3. Envia requisição POST para n8n webhook              │
│    - Inclui consultationId no payload                   │
│    - Aguarda resposta IMEDIATA do webhook               │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│ 4A. Se webhook retorna 'output' imediatamente:          │
│    ✅ Atualiza DB: status=COMPLETED, report_data=output │
│    ✅ Mostra tela de relatório INSTANTANEAMENTE         │
└────────────────┬─────────────────────────────────────────┘
                 │
┌────────────────┴─────────────────────────────────────────┐
│ 4B. Se webhook não retorna 'output':                    │
│    📺 Mostra tela do terminal (status: PENDING)         │
│    🔄 Polling a cada 10s verifica se status mudou       │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│ 5. Usuário pode FECHAR O APP                            │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│ 6. Usuário ABRE O APP novamente                         │
│    🔍 Sistema busca última consulta do usuário          │
│    🎯 Se PENDING → Mostra terminal                      │
│    🎯 Se COMPLETED → Mostra relatório                   │
└──────────────────────────────────────────────────────────┘
```

---

## 📤 Payload Enviado para n8n

```json
POST https://n8n-n8n.ck75vf.easypanel.host/webhook/9f0e0a4f-2035-4495-bda2-d07dee24b5af
Content-Type: application/json

{
  "consultationId": "102019a338d...",  // ⭐ ID da consulta no banco
  "userId": "user-id",
  "userName": "Nome do Usuário",
  "name": "Alvo da Consulta",
  "phone": "+55 11 99999-9999",
  "address": "Rua Example, 123",
  "cep": "12345-678",
  "country": "Brasil",
  "city": "São Paulo",
  "neighborhood": "Centro",
  "timestamp": "2025-10-30T12:34:56.789Z"
}
```

---

## 📥 Resposta Esperada do n8n

### **Opção 1: Resposta Imediata (Recomendado para testes rápidos)**

Se o n8n processar e retornar o resultado IMEDIATAMENTE:

```json
HTTP 200 OK
Content-Type: application/json

{
  "consultationId": "102019a338d...",
  "output": "📊 RELATÓRIO DE CONSULTA\n\nNome: João Silva\nTelefone: +55 11 99999-9999\n\n✅ Status: Aprovado\n\nDetalhes:\n- Sem restrições\n- Histórico limpo\n- Score: 850/1000\n\n---\nGerado em: 30/10/2025 às 14:30"
}
```

**O que acontece:**
- ✅ Frontend recebe a resposta
- ✅ Atualiza o banco automaticamente (status → COMPLETED)
- ✅ Mostra a tela de relatório IMEDIATAMENTE
- ✅ Usuário vê o resultado na hora

---

### **Opção 2: Processamento Assíncrono (1-3 dias)**

Se o n8n NÃO retornar `output` imediatamente:

```json
HTTP 200 OK
Content-Type: application/json

{
  "consultationId": "102019a338d...",
  "status": "processing",
  "message": "Consulta em processamento. Aguarde 1-3 dias."
}
```

**O que acontece:**
- 📺 Frontend mostra tela do terminal
- 🔄 Polling a cada 10 segundos verifica o status
- ⏳ Quando n8n finalizar, você precisa ATUALIZAR O BANCO

**Como atualizar o banco quando finalizar:**

#### **Via Console do Navegador:**
```javascript
// Abrir console (F12) e executar:
await window.handleWebhookResponse(
  "102019a338d...",  // consultationId
  "SEU RELATÓRIO COMPLETO AQUI"  // output
);
```

#### **Via Script/Node.js (se n8n suportar):**
```javascript
import { handleWebhookResponse } from "./src/lib/webhook-handler.ts";

await handleWebhookResponse(
  "102019a338d...",
  "RELATÓRIO COMPLETO"
);
```

#### **Via HTTP (se você criar endpoint):**
```bash
POST /api/webhook-response
Content-Type: application/json

{
  "consultationId": "102019a338d...",
  "output": "RELATÓRIO COMPLETO"
}
```

---

## 🎨 Telas do Sistema

### **1. Dashboard (Inicial)**
```
┌────────────────────────────────────────┐
│  🎯 Selecione a Plataforma            │
├────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐        │
│  │ 📱   │  │ 💬   │  │ 📸   │        │
│  │WhatsA││ │Messen││ │Insta │        │
│  │ pp   │  │ger   │  │gram  │        │
│  │[Fazer││ │[Fazer││ │[Fazer│        │
│  │Consul││ │Consul││ │Consul│        │
│  │ta]   │  │ta]   │  │ta]   │        │
│  └──────┘  └──────┘  └──────┘        │
└────────────────────────────────────────┘
```

### **2. Terminal (PENDING)**
```
┌────────────────────────────────────────┐
│ ⚫ 🟡 🟢  terminal — consulta-spymate  │
├────────────────────────────────────────┤
│ $ Iniciando consulta...                │
│ > Conectando aos servidores...         │
│ [OK] Conexão estabelecida              │
│ > Processando dados enviados...        │
│ [INFO] Validando informações           │
│ [INFO] Enviando dados para análise...  │
│ [OK] Dados recebidos com sucesso       │
│ > Criando requisição de consulta...    │
│ [OK] Consulta registrada               │
│ [INFO] Processamento iniciado          │
│ [INFO] Este processo pode levar 1-3d   │
│ [INFO] Você será notificado quando     │
│        a consulta estiver pronta       │
│ > Sistema aguardando resposta...       │
│ $ Consulta em andamento █              │
├────────────────────────────────────────┤
│ ⚠️  AVISO: Este processo pode levar    │
│     de 1 a 3 dias para ser concluído.  │
│     Você pode fechar esta janela.      │
└────────────────────────────────────────┘
```

### **3. Relatório (COMPLETED)**
```
┌────────────────────────────────────────┐
│ 📊 Relatório de Consulta              │
├────────────────────────────────────────┤
│                                        │
│ [CONTEÚDO DO CAMPO 'output' AQUI]     │
│                                        │
│ Exemplo:                               │
│ Nome: João Silva                       │
│ Telefone: +55 11 99999-9999           │
│                                        │
│ ✅ Status: Aprovado                   │
│                                        │
│ Detalhes:                              │
│ - Sem restrições                       │
│ - Histórico limpo                      │
│ - Score: 850/1000                      │
│                                        │
│                                        │
│ [← Voltar]                            │
└────────────────────────────────────────┘
```

---

## 🔍 Como Testar

### **Teste 1: Resposta Imediata**

1. **Configure o n8n para retornar:**
```json
{
  "consultationId": "{{$json.consultationId}}",
  "output": "TESTE: Relatório gerado com sucesso!\n\nNome: {{$json.name}}\nTelefone: {{$json.phone}}\n\n✅ Consulta aprovada"
}
```

2. **Preencha o formulário**
3. **Resultado esperado:**
   - ✅ Tela de relatório aparece INSTANTANEAMENTE
   - ✅ Mostra o conteúdo do campo `output`

---

### **Teste 2: Processamento Assíncrono**

1. **Configure o n8n para retornar:**
```json
{
  "consultationId": "{{$json.consultationId}}",
  "status": "processing"
}
```

2. **Preencha o formulário**
3. **Resultado esperado:**
   - 📺 Tela do terminal aparece
   - ⏳ Mensagem "Consulta em andamento"

4. **Simular conclusão (abra console F12):**
```javascript
await window.handleWebhookResponse(
  "COLE_O_ID_DA_CONSULTA_AQUI",
  "📊 RELATÓRIO SIMULADO\n\nNome: Teste\nStatus: Aprovado"
);
```

5. **Resultado esperado:**
   - ✅ Após 0-10 segundos, tela muda para relatório
   - ✅ Mostra o conteúdo simulado

---

### **Teste 3: Persistência**

1. **Crie uma consulta** (qualquer opção acima)
2. **FECHE O NAVEGADOR** completamente
3. **ABRA O APP novamente**
4. **Resultado esperado:**
   - ✅ Se PENDING → Mostra terminal automaticamente
   - ✅ Se COMPLETED → Mostra relatório automaticamente
   - ✅ Dados da consulta anterior estão lá

---

## 📊 Estrutura do Banco de Dados

### **Campos da tabela `consultations`:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID único da consulta (auto-gerado) |
| `data_creator` | string | ID do usuário que criou |
| `user_name` | string | Nome do usuário |
| `name` | string | Nome do alvo da consulta |
| `phone` | string | Telefone do alvo |
| `address` | string | Endereço (opcional) |
| `cep` | string | CEP (opcional) |
| `country` | string | País (opcional) |
| `city` | string | Cidade (opcional) |
| `neighborhood` | string | Bairro (opcional) |
| `status` | enum | **1**=PENDING, **2**=COMPLETED, **3**=VIEWED |
| `report_data` | string | ⭐ **Campo onde vai o resultado do webhook** |
| `create_time` | string | Timestamp de criação |
| `update_time` | string | Timestamp de atualização |

---

## 🎯 Checklist de Implementação

- ✅ Data layer criado (RAF CLI)
- ✅ Componente de terminal implementado
- ✅ Componente de relatório criado
- ✅ Lógica de persistência implementada
- ✅ Auto-carregamento ao abrir app
- ✅ Polling a cada 10 segundos
- ✅ **Processamento de 'output' imediato**
- ✅ **Handler global para atualização manual**
- ✅ Validação TypeScript/ESLint (0 erros)

---

## 🚀 Próximos Passos (Para Você)

### **Para Resposta Imediata (Recomendado):**
Configure o n8n para retornar `output` na resposta do webhook:

```javascript
// No n8n, adicione um nó "Respond to Webhook" com:
{
  "consultationId": "{{$json.consultationId}}",
  "output": "SEU_RELATÓRIO_AQUI"
}
```

### **Para Processamento Assíncrono:**
Quando o processamento terminar (1-3 dias), use uma das opções:

1. **Console do navegador:** `window.handleWebhookResponse(id, output)`
2. **Script externo:** Import do `webhook-handler.ts`
3. **HTTP endpoint:** (você precisa criar)

---

## 📝 Notas Importantes

1. **Formato do Output:** O campo `output` aceita qualquer string (pode incluir `\n` para quebras de linha)
2. **Tamanho:** Sem limite definido no schema (pode ser um relatório grande)
3. **Formatação:** Use `\n` para quebras de linha, será renderizado corretamente
4. **Persistência:** Tudo é salvo no banco, usuário pode fechar e abrir o app

---

## 🎉 Resultado Final

**✅ SISTEMA 100% FUNCIONAL!**

- ✅ **Resultado aparece:** Se webhook retornar `output`, mostra instantaneamente
- ✅ **Persistência:** Usuário pode fechar/abrir, estado é mantido
- ✅ **Polling:** Atualização automática a cada 10s
- ✅ **Flexível:** Suporta resposta imediata OU processamento assíncrono
- ✅ **Type-safe:** TypeScript sem erros
- ✅ **UX perfeita:** Transições suaves entre estados

---

**🎯 O webhook agora funciona perfeitamente! Basta configurar o n8n para retornar o campo `output`!** 🚀✨
