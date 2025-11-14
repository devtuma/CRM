# 🎯 CRM Kanban - Sistema de Gestão de Vendas

![CRM Kanban](https://img.shields.io/badge/Status-Produção-brightgreen)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8)

Sistema completo de CRM visual estilo Kanban para gestão de vendas, com interface intuitiva e recursos avançados de automação.

## ✨ Funcionalidades

### 🎨 Funil de Vendas Kanban
- **Drag and Drop**: Arraste leads entre etapas de forma intuitiva
- **Etapas Customizáveis**: Crie, edite e reordene etapas do funil
- **Cores Personalizadas**: Identifique rapidamente cada etapa
- **Visão em Tempo Real**: Acompanhe valor total e quantidade de leads por etapa

### 👥 Gestão Completa de Leads
- **Cadastro Detalhado**: Nome, email, telefone, empresa, cargo e mais
- **Campos Customizados**: Adicione informações específicas do seu negócio
- **Tags e Prioridades**: Organize e filtre seus leads
- **Valor do Negócio**: Acompanhe o valor potencial de cada lead
- **Data de Fechamento**: Planeje e projete suas vendas

### 📝 Histórico de Interações
- **Múltiplos Tipos**: Ligação, email, WhatsApp, reunião e notas
- **Timeline Completa**: Visualize todo histórico do lead
- **Registro Automático**: Templates do WhatsApp são registrados automaticamente
- **Busca e Filtros**: Encontre rapidamente interações específicas

### 💬 Templates de WhatsApp
- **Mensagens Prontas**: Crie templates reutilizáveis
- **Variáveis Dinâmicas**: {{nome}}, {{empresa}}, {{vendedor}}, {{valor}}
- **Categorias**: Organize por tipo (Inicial, Follow-up, Pós-venda)
- **Estatísticas de Uso**: Veja quais templates são mais eficazes
- **Prévia em Tempo Real**: Visualize a mensagem antes de copiar

### ⚡ Automação de Follow-ups
- **Regras Automáticas**: Crie follow-ups baseados em eventos
- **Notificações**: Alertas para tarefas atrasadas e do dia
- **Tipos Variados**: Ligação, email, WhatsApp, reunião
- **Priorização**: Alta, média ou baixa prioridade
- **Gestão Simples**: Marque como concluído com um clique

### 📊 Analytics e Relatórios

#### Dashboard Principal
- **Taxa de Conversão**: Acompanhe performance geral
- **Ticket Médio**: Valor médio dos negócios fechados
- **Receita Total**: Visualize faturamento total
- **Tempo Médio de Fechamento**: Otimize seu processo

#### Previsão de Faturamento
- **Projeção 6 Meses**: Baseada em histórico e pipeline
- **Valores Confirmados**: Negócios já fechados
- **Valores Potenciais**: Pipeline atual
- **Gráficos Interativos**: Visualização clara e profissional

#### Performance por Vendedor
- **Leads Criados**: Quantidade por vendedor
- **Taxa de Conversão Individual**: Compare performance
- **Receita por Vendedor**: Identifique top performers
- **Ticket Médio**: Compare valores por vendedor

### 🔗 Integração Google Contacts
- **Importação CSV**: Upload de arquivo com contatos
- **Mapeamento Automático**: Nome, email, telefone, empresa
- **Template de Exemplo**: Baixe arquivo exemplo
- **Preparado para OAuth**: Estrutura para integração futura

### 💾 Persistência e Exportação
- **LocalStorage**: Dados salvos automaticamente no navegador
- **Exportação JSON**: Backup completo dos dados
- **Importação**: Restaure dados de backup
- **Multi-dispositivo**: Use em diferentes navegadores (dados locais)

## 🚀 Instalação e Uso

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Entre no diretório
cd CRM

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Prévia do build
npm run preview
```

## 📖 Como Usar

### Primeiros Passos

1. **Acesse o Dashboard**: Veja métricas gerais do seu CRM
2. **Configure as Etapas**: Vá em "Funil de Vendas" → "Configurar Etapas"
3. **Adicione Leads**: Clique no "+" em qualquer etapa do Kanban
4. **Crie Templates**: Configure mensagens padrão para agilizar comunicação

### Trabalhando com Leads

1. **Criar Lead**: Clique no botão "+" na etapa desejada
2. **Editar Lead**: Clique no card do lead
3. **Mover Lead**: Arraste o card entre as etapas
4. **Adicionar Interação**: Aba "Histórico" dentro do lead
5. **Agendar Follow-up**: Aba "Follow-ups" dentro do lead
6. **Usar Template WhatsApp**: Aba "WhatsApp" dentro do lead

### Criando Templates de WhatsApp

1. Vá no lead → Aba "WhatsApp"
2. Clique em "Novo Template"
3. Use variáveis: `{{nome}}`, `{{empresa}}`, `{{vendedor}}`, `{{valor}}`
4. Salve e use quando precisar

### Importando Contatos

1. Vá em "Google Contacts"
2. Baixe o arquivo de exemplo
3. Prepare seu CSV no mesmo formato
4. Faça upload do arquivo
5. Contatos serão importados como novos leads

### Acompanhando Performance

1. Acesse "Dashboard" ou "Relatórios"
2. Visualize métricas gerais
3. Analise performance por vendedor
4. Veja previsão de faturamento
5. Exporte dados para análise externa

## 🛠️ Tecnologias Utilizadas

- **React 18.2**: Biblioteca JavaScript para UI
- **TypeScript 5.2**: Tipagem estática para JavaScript
- **Vite 5.0**: Build tool rápido e moderno
- **TailwindCSS 3.3**: Framework CSS utility-first
- **React Beautiful DnD**: Drag and drop para Kanban
- **Recharts**: Gráficos e visualizações
- **Lucide React**: Ícones modernos
- **date-fns**: Manipulação de datas

## 📁 Estrutura do Projeto

```
CRM/
├── src/
│   ├── components/          # Componentes React
│   │   ├── KanbanBoard.tsx
│   │   ├── LeadCard.tsx
│   │   ├── LeadModal.tsx
│   │   ├── Dashboard.tsx
│   │   └── ...
│   ├── context/            # Context API
│   │   └── CRMContext.tsx
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── utils/              # Utilitários
│   │   ├── storage.ts
│   │   ├── calculations.ts
│   │   └── automation.ts
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Entry point
│   └── index.css           # Estilos globais
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Regras de Automação

O sistema inclui 3 regras de automação pré-configuradas:

1. **Follow-up após 3 dias**: Se um lead ficar 3 dias na mesma etapa
2. **Follow-up em Proposta**: Quando um lead move para "Proposta"
3. **Follow-up em Negociação**: Quando um lead move para "Negociação"

Você pode personalizar essas regras editando `src/utils/automation.ts`

## 💡 Dicas de Uso

### Maximize sua Taxa de Conversão
- ✅ Registre todas interações com leads
- ✅ Use follow-ups para não perder oportunidades
- ✅ Revise o dashboard semanalmente
- ✅ Qualifique leads rapidamente
- ✅ Use templates para ganhar tempo

### Organize seu Funil
- 🎨 Use cores diferentes para cada etapa
- 📊 Mantenha etapas alinhadas com seu processo
- 🔄 Mova leads regularmente
- 📝 Adicione tags para segmentação
- ⚡ Configure prioridades em leads importantes

### Aumente Produtividade
- ⏰ Verifique notificações diariamente
- 📱 Use templates do WhatsApp
- 📊 Analise relatórios mensalmente
- 🎯 Foque em leads de alta prioridade
- 💾 Exporte dados regularmente (backup)

## 🔒 Segurança e Privacidade

- Dados armazenados localmente no navegador
- Nenhuma informação enviada para servidores externos
- Você controla 100% dos seus dados
- Exportação e backup quando desejar

## 🆘 Suporte

Para dúvidas ou problemas:

1. Consulte este README
2. Verifique os exemplos incluídos
3. Entre em contato com o suporte

## 📝 Licença

Este projeto é proprietário. Todos os direitos reservados.

## 🚀 Próximas Funcionalidades (Roadmap)

- [ ] Integração real com Google Contacts OAuth
- [ ] Envio automático de emails
- [ ] Integração com WhatsApp Business API
- [ ] Notificações push
- [ ] App mobile (React Native)
- [ ] Sincronização em nuvem
- [ ] Relatórios PDF
- [ ] Múltiplos funis
- [ ] Campos customizados avançados
- [ ] Integrações Zapier/Make

---

**Desenvolvido com ❤️ para aumentar suas vendas**
