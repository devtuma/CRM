#!/usr/bin/env sh

# Aborta em caso de erros
set -e

# Build
npm run build

# Navega para o diretório de build
cd dist

# Cria arquivo .nojekyll
echo > .nojekyll

# Inicializa git
git init
git checkout -B gh-pages
git add -A
git commit -m 'deploy'

# Push para gh-pages
git push -f git@github.com:devtuma/CRM.git gh-pages:gh-pages

cd -
