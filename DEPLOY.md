# 🚀 Guia de Deploy - GitHub Pages

## Configurações Realizadas

1. ✅ Vite configurado com `base: '/CRM/'`
2. ✅ Arquivo `.nojekyll` criado
3. ✅ GitHub Actions workflow configurado
4. ✅ Scripts de build e deploy prontos

## Opção 1: Deploy Automático via GitHub Actions (Recomendado)

### Passo 1: Habilitar GitHub Pages

1. Vá para o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione **GitHub Actions**
5. Salve as configurações

### Passo 2: Fazer Push para Main/Master

```bash
# Commit as mudanças
git add .
git commit -m "chore: Configurar deploy para GitHub Pages"

# Push para main (ou master)
git push origin main
```

O GitHub Actions irá automaticamente:
- Instalar dependências
- Fazer build do projeto
- Fazer deploy para GitHub Pages

### Passo 3: Acessar o Site

Após o deploy (1-2 minutos), acesse:
```
https://devtuma.github.io/CRM/
```

---

## Opção 2: Deploy Manual

### Passo 1: Fazer Build

```bash
npm install
npm run build
```

### Passo 2: Deploy para gh-pages

Você tem duas opções:

#### A) Usando o script deploy.sh

```bash
./deploy.sh
```

#### B) Manualmente

```bash
cd dist
git init
git checkout -B gh-pages
git add -A
git commit -m 'deploy'
git push -f git@github.com:devtuma/CRM.git gh-pages:gh-pages
cd ..
```

### Passo 3: Configurar GitHub Pages

1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione **Deploy from a branch**
3. Em **Branch**, selecione **gh-pages** e pasta **/ (root)**
4. Clique em **Save**

### Passo 4: Acessar

Aguarde 1-2 minutos e acesse:
```
https://devtuma.github.io/CRM/
```

---

## 🔍 Solução de Problemas

### Página em Branco

Se você ver uma página em branco:

1. **Verifique o Console do Navegador** (F12):
   - Procure por erros de carregamento de arquivos
   - Erros 404 indicam problema no `base` path

2. **Verifique o arquivo vite.config.ts**:
   ```typescript
   base: '/CRM/',  // Deve corresponder ao nome do repositório
   ```

3. **Limpe o cache do navegador**:
   - Ctrl + Shift + R (Windows/Linux)
   - Cmd + Shift + R (Mac)

### Build Falha

Se o build falhar:

```bash
# Limpe node_modules e reinstale
rm -rf node_modules package-lock.json
npm install

# Tente o build novamente
npm run build
```

### GitHub Actions Falha

1. Vá em **Actions** no repositório
2. Clique no workflow que falhou
3. Veja os logs para identificar o erro
4. Corrija e faça push novamente

---

## ✅ Checklist de Deploy

- [ ] Configurações do Vite atualizadas (`base: '/CRM/'`)
- [ ] Arquivo `.nojekyll` criado em `public/`
- [ ] GitHub Actions configurado (`.github/workflows/deploy.yml`)
- [ ] GitHub Pages habilitado nas configurações
- [ ] Source configurado como "GitHub Actions" ou "gh-pages branch"
- [ ] Build executado sem erros
- [ ] Site acessível em `https://devtuma.github.io/CRM/`

---

## 📝 Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Build de produção
npm run build

# Preview do build local
npm run preview

# Deploy (se usar gh-pages package)
npm run deploy
```

---

## 🌐 URLs

- **Desenvolvimento**: http://localhost:3000
- **Produção**: https://devtuma.github.io/CRM/
- **Repositório**: https://github.com/devtuma/CRM

---

## 💡 Dicas

1. **Sempre teste localmente** antes de fazer deploy:
   ```bash
   npm run build
   npm run preview
   ```

2. **Use o GitHub Actions** para deploy automático - é mais fácil!

3. **Verifique os logs** do GitHub Actions se algo der errado

4. **Cache do navegador** pode causar problemas - sempre limpe após deploy

---

## 🆘 Ajuda Adicional

Se continuar com problemas:

1. Verifique os logs do GitHub Actions
2. Veja o console do navegador (F12)
3. Certifique-se que o repositório é público
4. Verifique se GitHub Pages está habilitado
5. Aguarde alguns minutos - o deploy pode levar tempo
