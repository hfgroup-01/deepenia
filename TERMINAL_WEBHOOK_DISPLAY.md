# 📺 Exibição da Resposta do Webhook no Terminal

## ✅ IMPLEMENTAÇÃO COMPLETA

### **Problema Resolvido:**
Quando o webhook retorna com a resposta, o resultado agora é **exibido diretamente no terminal** com efeito de animação.

---

## 🎯 Como Funciona

### **Fluxo de Exibição:**

```
1. Usuário preenche formulário
   ↓
2. Sistema cria consulta no banco (status: PENDING)
   ↓
3. Tela do terminal aparece com animação de processamento
   ↓
4. Webhook é enviado para n8n
   ↓
5A. Se webhook retorna 'output' IMEDIATAMENTE:
    ✅ Terminal continua animando as linhas padrão
    ✅ Quando terminar, ADICIONA automaticamente:
       - "$ Consulta em andamento"
       - "> Resposta do servidor recebida!"
       - "[OK] Processamento concluído"
       - "=== RESULTADO DA CONSULTA ==="
       - [CONTEÚDO DO OUTPUT AQUI]
       - "=== FIM DO RESULTADO ==="
       - "[OK] Consulta finalizada com sucesso"
    ✅ Banner inferior muda de amarelo (aviso) para verde (sucesso)
    ↓
5B. Se webhook NÃO retorna 'output':
    📺 Terminal mostra apenas as linhas padrão
    ⏳ Banner amarelo: "Pode levar 1-3 dias"
    🔄 Polling a cada 10s
    ↓
6. Quando a consulta for concluída (via polling):
    ✅ Resultado aparece no terminal automaticamente
    ✅ Banner muda para verde
```

---

## 📤 Configuração do n8n

### **Para Resposta Imediata (Resultado no Terminal):**

No n8n, configure o nó "Respond to Webhook" para retornar:

```json
{
  "consultationId": "{{$json.consultationId}}",
  "output": "📊 RELATÓRIO DE CONSULTA\n\nNome: {{$json.name}}\nTelefone: {{$json.phone}}\nEndereço: {{$json.address}}\n\n✅ Status: Aprovado\n\nDetalhes:\n- Documento validado\n- Sem restrições\n- Score: 850/1000\n\n---\nGerado em: {{$now.format('DD/MM/YYYY HH:mm')}}"
}
```

**⚠️ IMPORTANTE:** Use `\n` para quebras de linha no texto do output!

---

## 🎨 Exemplo Visual da Tela do Terminal

### **ANTES da Resposta (Status: PENDING):**

```
┌────────────────────────────────────────────────────────────┐
│ ⚫ 🟡 🟢  terminal — consulta-spymate                      │
├────────────────────────────────────────────────────────────┤
│ $ Iniciando consulta...                                    │
│ > Conectando aos servidores...                             │
│ [OK] Conexão estabelecida                                  │
│ > Processando dados enviados...                            │
│ [INFO] Validando informações                               │
│ [INFO] Enviando dados para análise...                      │
│ [OK] Dados recebidos com sucesso                           │
│ > Criando requisição de consulta...                        │
│ [OK] Consulta registrada                                   │
│ [INFO] Processamento iniciado                              │
│ [INFO] Este processo pode levar de 1 a 3 dias             │
│ [INFO] Você será notificado quando a consulta estiver     │
│        pronta                                              │
│ > Sistema aguardando resposta... █                         │
├────────────────────────────────────────────────────────────┤
│ ⚠️  AVISO IMPORTANTE                                       │
│                                                            │
│ A consulta está em andamento e pode levar de 1 a 3 dias   │
│ para ser concluída. Por favor, aguarde. Você poderá       │
│ visualizar o resultado assim que o processamento for      │
│ finalizado.                                                │
└────────────────────────────────────────────────────────────┘
```

---

### **DEPOIS da Resposta (Webhook retornou output):**

```
┌────────────────────────────────────────────────────────────┐
│ ⚫ 🟡 🟢  terminal — consulta-spymate                      │
├────────────────────────────────────────────────────────────┤
│ $ Iniciando consulta...                                    │
│ > Conectando aos servidores...                             │
│ [OK] Conexão estabelecida                                  │
│ > Processando dados enviados...                            │
│ [INFO] Validando informações                               │
│ [INFO] Enviando dados para análise...                      │
│ [OK] Dados recebidos com sucesso                           │
│ > Criando requisição de consulta...                        │
│ [OK] Consulta registrada                                   │
│ [INFO] Processamento iniciado                              │
│ [INFO] Este processo pode levar de 1 a 3 dias             │
│ [INFO] Você será notificado quando a consulta estiver     │
│        pronta                                              │
│ > Sistema aguardando resposta...                           │
│ $ Consulta em andamento                                    │
│                                                            │
│ > Resposta do servidor recebida!                           │
│ [OK] Processamento concluído                               │
│                                                            │
│ === RESULTADO DA CONSULTA ===                              │
│                                                            │
│ 📊 RELATÓRIO DE CONSULTA                                   │
│                                                            │
│ Nome: João Silva                                           │
│ Telefone: +55 11 99999-9999                               │
│ Endereço: Rua Example, 123                                │
│                                                            │
│ ✅ Status: Aprovado                                       │
│                                                            │
│ Detalhes:                                                  │
│ - Documento validado                                       │
│ - Sem restrições                                           │
│ - Score: 850/1000                                          │
│                                                            │
│ ---                                                        │
│ Gerado em: 30/10/2025 14:30                               │
│                                                            │
│ === FIM DO RESULTADO ===                                   │
│                                                            │
│ [OK] Consulta finalizada com sucesso                       │
├────────────────────────────────────────────────────────────┤
│ ✅ CONSULTA CONCLUÍDA                                      │
│                                                            │
│ A consulta foi processada com sucesso! O resultado está   │
│ exibido acima.                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 🔄 Código das Cores no Terminal

As linhas são coloridas automaticamente:

- **Verde (`[OK]`)**: Operações concluídas com sucesso
- **Azul (`[INFO]`)**: Informações gerais
- **Vermelho (`[ERROR]`)**: Erros (se houver)
- **Amarelo (`>`)**: Ações em andamento
- **Branco (`$`)**: Comandos e texto padrão
- **Conteúdo do resultado**: Branco (texto normal)

---

## 🧪 Como Testar

### **Teste 1: Webhook com Resposta Imediata**

1. **Configure o n8n** para retornar o campo `output` imediatamente
2. **Preencha o formulário** no aplicativo
3. **Observe o terminal:**
   - Linhas padrão aparecem com animação (300-800ms por linha)
   - Após ~10 segundos, as linhas do resultado aparecem
   - Banner muda de amarelo para verde
4. **Resultado esperado:**
   - ✅ Terminal mostra todas as linhas de processamento
   - ✅ Resultado do webhook aparece no final
   - ✅ Banner verde confirmando sucesso

---

### **Teste 2: Webhook sem Output (Processamento Assíncrono)**

1. **Configure o n8n** para retornar SEM o campo `output`
2. **Preencha o formulário**
3. **Observe o terminal:**
   - Linhas padrão aparecem normalmente
   - Para em "Sistema aguardando resposta..."
   - Banner amarelo: "1-3 dias"
4. **Simule a conclusão** (console F12):
```javascript
await window.handleWebhookResponse(
  "COLE_O_ID_DA_CONSULTA_AQUI",
  "📊 RESULTADO SIMULADO\n\nNome: Teste\nStatus: ✅ Aprovado"
);
```
5. **Observe:**
   - Após 0-10 segundos (polling), resultado aparece no terminal
   - Banner muda para verde

---

### **Teste 3: Persistência da Resposta**

1. **Crie uma consulta** com webhook que retorna `output`
2. **Aguarde** o resultado aparecer no terminal
3. **FECHE o navegador** completamente
4. **ABRA o app novamente**
5. **Resultado esperado:**
   - ✅ Terminal reabre automaticamente
   - ✅ Resultado completo está visível
   - ✅ Banner verde mostrando sucesso
   - ✅ Todas as linhas já estão carregadas (sem animação)

---

## 📊 Estrutura de Dados

### **Estado no Frontend:**

```typescript
// Estado da última resposta do webhook (para exibição imediata)
const [lastWebhookResponse, setLastWebhookResponse] = useState<string | null>(null);

// Consulta ativa (do banco de dados)
const { data: activeConsultation } = useQuery({
  queryKey: ["activeConsultation", user?.id],
  queryFn: async () => { /* buscar última consulta */ },
  refetchInterval: 10000, // Polling a cada 10s
});
```

### **Props do Componente Terminal:**

```typescript
interface ConsultationTerminalScreenProps {
  t: Translation;
  onBack: () => void;
  webhookResponse?: string | null; // ⭐ Resposta do webhook
}
```

### **Lógica de Exibição:**

```typescript
// Passa a resposta para o terminal
<ConsultationTerminalScreen
  t={t}
  onBack={handleBackFromConsultation}
  webhookResponse={lastWebhookResponse || activeConsultation?.report_data}
/>
```

---

## 📝 Formato da Resposta do Webhook

### **Exemplo Completo:**

```json
{
  "consultationId": "102019a338d...",
  "output": "📊 RELATÓRIO DE CONSULTA\n\nDados da Pessoa:\n- Nome: João Silva\n- CPF: 123.456.789-00\n- Telefone: +55 11 99999-9999\n- Endereço: Rua Example, 123 - São Paulo/SP\n\n✅ SITUAÇÃO: APROVADO\n\nDetalhes da Análise:\n✓ Documento validado com sucesso\n✓ Sem restrições financeiras\n✓ Histórico de crédito limpo\n✓ Score: 850/1000\n\nObservações:\n- Cliente possui bom histórico\n- Recomendado para aprovação\n- Sem pendências judiciais\n\n---\nRelatório gerado em: 30/10/2025 às 14:30\nCódigo da consulta: {{consultationId}}"
}
```

### **Dicas de Formatação:**

- Use `\n` para quebras de linha
- Use emojis para destacar informações (✅, ❌, 📊, ⚠️)
- Use separadores (`---`) para organizar seções
- Use listas (`-` ou `✓`) para melhor visualização
- Mantenha linhas com no máximo 60-70 caracteres para boa legibilidade

---

## 🎯 Checklist de Implementação

- ✅ Componente `ConsultationTerminalScreen` atualizado
- ✅ Props `webhookResponse` adicionado
- ✅ Lógica de exibição implementada com useEffect
- ✅ Animação de linhas automática
- ✅ Banner dinâmico (amarelo → verde)
- ✅ Estado `lastWebhookResponse` criado
- ✅ Integração com polling (10s)
- ✅ Persistência ao reabrir o app
- ✅ Limpeza de estado ao voltar
- ✅ TypeScript sem erros
- ✅ ESLint sem erros

---

## 🚀 Resultado Final

**✅ SISTEMA 100% FUNCIONAL!**

- ✅ **Resposta no terminal:** Quando webhook retorna `output`, aparece no terminal
- ✅ **Animação suave:** Linhas aparecem com efeito de digitação
- ✅ **Formatação perfeita:** Quebras de linha e formatação preservadas
- ✅ **Feedback visual:** Banner muda de amarelo para verde
- ✅ **Persistência:** Resultado permanece ao fechar/abrir app
- ✅ **Polling automático:** Atualiza a cada 10s se não retornar imediatamente
- ✅ **Type-safe:** TypeScript e ESLint validados

---

## 📚 Arquivos Modificados

### **1. `src/components/ConsultationTerminalScreen.tsx`**
- ✅ Adicionado prop `webhookResponse`
- ✅ Implementado useEffect para exibir resposta
- ✅ Adicionado estado `showResponse`
- ✅ Banner dinâmico (amarelo/verde)

### **2. `src/routes/index.tsx`**
- ✅ Adicionado estado `lastWebhookResponse`
- ✅ Atualizado `handleConsultationSubmit` para armazenar resposta
- ✅ Passando `webhookResponse` para o componente terminal
- ✅ Limpeza de estado em `handleBackFromConsultation`

---

**🎯 Agora quando o webhook responder, o resultado aparece perfeitamente no terminal com animação suave!** 🚀✨
