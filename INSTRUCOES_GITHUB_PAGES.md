# 🚀 Instruções Rápidas - GitHub Pages

## ⚡ Configuração Rápida (3 minutos)

### Passo 1: Fazer Merge para Main

Primeiro, você precisa fazer merge desta branch para a `main`:

1. **No GitHub**, vá para o repositório
2. Clique em **Pull Requests**
3. Crie um novo Pull Request da branch `claude/kanban-crm-sales-pipeline-01ATGvNbbgz6rPY81ahvYYJF` para `main`
4. Faça o **Merge** do Pull Request

**OU via terminal:**

```bash
# Se você ainda não tem a branch main localmente
git checkout -b main
git push origin main

# Depois faça o merge
git merge claude/kanban-crm-sales-pipeline-01ATGvNbbgz6rPY81ahvYYJF
git push origin main
```

### Passo 2: Habilitar GitHub Pages

1. Vá para **Settings** (Configurações) do repositório no GitHub
2. No menu lateral esquerdo, clique em **Pages**
3. Em **Source** (Build and deployment), selecione:
   - **Source**: GitHub Actions
4. Clique em **Save** (se houver botão)

### Passo 3: Aguardar Deploy

1. Vá para a aba **Actions** no GitHub
2. Você verá o workflow "Deploy to GitHub Pages" rodando
3. Aguarde 1-2 minutos até completar (ícone verde ✓)

### Passo 4: Acessar o CRM

Após o deploy completar, acesse:

```
https://devtuma.github.io/CRM/
```

---

## 🔧 Se Ainda Aparecer Página em Branco

### Opção A: Verificar Console

1. Abra o site
2. Pressione **F12** (ou clique direito > Inspecionar)
3. Vá na aba **Console**
4. Tire um print dos erros (se houver)

### Opção B: Forçar Rebuild

1. Vá em **Actions** no GitHub
2. Clique em **Deploy to GitHub Pages** (no menu lateral)
3. Clique no botão **Run workflow**
4. Clique em **Run workflow** novamente
5. Aguarde completar

### Opção C: Limpar Cache

1. No navegador, pressione **Ctrl + Shift + Delete** (ou Cmd + Shift + Delete no Mac)
2. Limpe **Cached images and files**
3. Recarregue a página com **Ctrl + Shift + R**

---

## 🎯 Resumo do Que Foi Configurado

✅ **Vite** configurado com base path `/CRM/`
✅ **GitHub Actions** para deploy automático
✅ **Build otimizado** para produção
✅ **Arquivo .nojekyll** para evitar Jekyll

---

## 🆘 Ainda Não Funcionou?

### Verifique se:

1. ✓ O repositório é **público**
2. ✓ GitHub Pages está **habilitado**
3. ✓ Source está em **GitHub Actions** (não "Deploy from a branch")
4. ✓ O workflow rodou **sem erros**
5. ✓ Você está acessando `https://devtuma.github.io/CRM/` (com /CRM/ no final)

### Configuração Alternativa - Deploy from Branch

Se o GitHub Actions não funcionar, use esta configuração:

1. No terminal, rode:
   ```bash
   npm install
   npm run build
   ```

2. Instale gh-pages:
   ```bash
   npm install -g gh-pages
   ```

3. Faça o deploy:
   ```bash
   gh-pages -d dist
   ```

4. No GitHub, vá em **Settings** → **Pages**
5. Em **Source**, selecione **Deploy from a branch**
6. Em **Branch**, selecione **gh-pages** / **(root)**
7. Aguarde 1 minuto e acesse a URL

---

## 📞 Precisa de Ajuda?

Se continuar com página em branco:

1. Tire um print do console (F12)
2. Tire um print das configurações do GitHub Pages
3. Tire um print dos logs do GitHub Actions
4. Me envie para análise

---

**URL do seu CRM:** https://devtuma.github.io/CRM/
