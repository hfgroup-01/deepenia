# Integração de Webhook - Sistema de Consultas

## 📋 Visão Geral

Este documento descreve como integrar o webhook do n8n com o sistema de consultas para atualizar o status e os dados do relatório quando o processamento for concluído.

## 🔄 Fluxo de Dados

### 1. Criação da Consulta (Frontend → n8n)

Quando o usuário submete o formulário, o sistema:

1. **Cria um registro no banco de dados** com `status = "PENDING"`
2. **Envia webhook para o n8n** com os seguintes dados:

```json
{
  "consultationId": "id-gerado-pelo-sistema",
  "userId": "user-id-from-auth",
  "userName": "Nome do Usuário",
  "name": "Nome preenchido no formulário",
  "phone": "+55 11 99999-9999",
  "address": "Rua Example, 123",
  "cep": "12345-678",
  "country": "Brasil",
  "city": "São Paulo",
  "neighborhood": "Centro",
  "timestamp": "2025-10-30T12:34:56.789Z"
}
```

3. **Mostra a tela do terminal** enquanto aguarda o processamento

---

### 2. Resposta do Webhook (n8n → Frontend)

Quando o n8n concluir o processamento (1-3 dias), ele deve fazer uma requisição **POST** para atualizar o status da consulta.

#### 🎯 Endpoint Necessário

O n8n precisa chamar um endpoint que atualize o registro no banco de dados. Você tem duas opções:

---

## ✅ **OPÇÃO 1: Usar ORM Diretamente (Recomendado)**

Se o n8n pode executar JavaScript/TypeScript, use o ORM gerado:

```typescript
import ConsultationORM, { ConsultationStatus } from "@/components/data/orm/orm_consultation";

// Quando o processamento terminar
const consultationORM = ConsultationORM.getInstance();

// Buscar a consulta pelo ID
const consultations = await consultationORM.getConsultationById("consultation-id-aqui");
const consultation = consultations[0];

// Atualizar com o relatório
const updatedConsultation = {
  ...consultation,
  status: ConsultationStatus.COMPLETED,
  report_data: "TEXTO DO RELATÓRIO COMPLETO AQUI"
};

// Salvar no banco
await consultationORM.setConsultationById(
  consultation.id,
  updatedConsultation
);
```

---

## ✅ **OPÇÃO 2: Criar um Endpoint HTTP no Frontend**

Se o n8n só pode fazer requisições HTTP, você precisa criar uma rota no backend:

### Criar o endpoint (você precisará criar isso):

**Arquivo:** `src/routes/api/webhook-response.tsx` (ou similar)

```typescript
// Pseudo-código do que você precisa criar
export async function POST(request: Request) {
  const body = await request.json();
  const { consultationId, output } = body;

  const consultationORM = ConsultationORM.getInstance();
  const consultations = await consultationORM.getConsultationById(consultationId);
  const consultation = consultations[0];

  const updatedConsultation = {
    ...consultation,
    status: ConsultationStatus.COMPLETED,
    report_data: output
  };

  await consultationORM.setConsultationById(consultationId, updatedConsultation);

  return Response.json({ success: true });
}
```

### O n8n deve enviar:

```json
POST /api/webhook-response
Content-Type: application/json

{
  "consultationId": "id-recebido-no-primeiro-webhook",
  "output": "TEXTO COMPLETO DO RELATÓRIO AQUI"
}
```

---

## 🎨 Comportamento no Frontend

### Estado PENDING (Consulta em Andamento)
- **Visualização:** Terminal animado
- **Mensagem:** "Consulta em andamento... pode levar de 1 a 3 dias"
- **Ações:** Usuário pode voltar para o dashboard, mas ao retornar verá o terminal novamente

### Estado COMPLETED (Relatório Pronto)
- **Visualização:** Componente `ConsultationReportView`
- **Conteúdo:** Exibe o texto do campo `report_data`
- **Atualização:** Automática a cada 10 segundos via polling

### Transição Automática
```
PENDING → (webhook responde) → COMPLETED → (usuário vê relatório)
```

---

## 🔍 Como Testar

### 1. Criar uma consulta
- Preencher formulário
- Verificar que foi salva com `status: PENDING`

### 2. Simular resposta do webhook
```typescript
// No console do navegador ou via script
const consultationORM = ConsultationORM.getInstance();
const consultations = await consultationORM.getConsultationByDataCreator("seu-user-id");
const consultation = consultations[0];

const updated = {
  ...consultation,
  status: 2, // ConsultationStatus.COMPLETED
  report_data: "RELATÓRIO DE TESTE\n\nAqui vai todo o conteúdo do relatório..."
};

await consultationORM.setConsultationById(consultation.id, updated);
```

### 3. Verificar atualização automática
- Aguardar até 10 segundos
- A tela deve mudar automaticamente de terminal para relatório

---

## 📊 Estrutura do Banco de Dados

### Modelo `ConsultationModel`

```typescript
interface ConsultationModel {
  id: string;                    // Gerado automaticamente
  data_creator: string;           // userId (quem criou)
  data_updater: string;           // userId (quem atualizou)
  create_time: string;            // Timestamp Unix
  update_time: string;            // Timestamp Unix
  user_name: string;              // Nome do usuário
  name: string;                   // Nome do alvo
  phone: string;                  // Telefone do alvo
  address?: string | null;        // Endereço
  cep?: string | null;            // CEP
  country?: string | null;        // País
  city?: string | null;           // Cidade
  neighborhood?: string | null;   // Bairro
  status: ConsultationStatus;     // PENDING | COMPLETED | VIEWED
  report_data?: string | null;    // Conteúdo do relatório
}
```

### Enum `ConsultationStatus`

```typescript
enum ConsultationStatus {
  Unspecified = 0,
  PENDING = 1,
  COMPLETED = 2,
  VIEWED = 3
}
```

---

## 🚀 URLs de Webhook

### Webhook de Envio (Frontend → n8n)
```
https://n8n-n8n.ck75vf.easypanel.host/webhook/9f0e0a4f-2035-4495-bda2-d07dee24b5af
```

### Webhook de Resposta (n8n → Frontend)
```
[VOCÊ PRECISA CRIAR ESTE ENDPOINT]
```

---

## ✅ Checklist de Implementação

- [x] Data layer criado com RAF CLI
- [x] Componente de terminal implementado
- [x] Componente de relatório criado
- [x] Lógica de persistência implementada
- [x] Auto-carregamento de estado ao abrir app
- [x] Polling a cada 10 segundos para atualização
- [ ] **TODO:** Criar endpoint HTTP para receber resposta do n8n
- [ ] **TODO:** Configurar n8n para chamar o endpoint quando concluir

---

## 📝 Notas Importantes

1. **Persistência Total:** O usuário pode fechar e abrir o app quantas vezes quiser - o estado será mantido
2. **Atualização Automática:** O sistema verifica o status a cada 10 segundos
3. **Consulta Única:** O sistema mostra apenas a consulta mais recente do usuário
4. **Dados Seguros:** Todos os dados são salvos no banco de dados com o ORM gerado

---

## 🎯 Próximos Passos

1. **Configurar n8n** para salvar o `consultationId` quando receber a requisição inicial
2. **Implementar lógica no n8n** para processar os dados (1-3 dias)
3. **Quando concluir**, usar uma das opções acima para atualizar o status para `COMPLETED`
4. **O frontend detectará automaticamente** e mostrará o relatório

---

**✨ Sistema pronto para uso!**
