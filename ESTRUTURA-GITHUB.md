# 📁 Estrutura do Repositório GitHub

## 🎯 Estrutura Recomendada

```
sislot/
│
├── 📄 README.md                           # Documentação principal
├── 📄 LICENSE                             # Licença MIT
├── 📄 CONTRIBUTING.md                     # Guia para contribuidores
├── 📄 CHANGELOG.md                        # Histórico de versões
├── 📄 .gitignore                          # Arquivos ignorados pelo Git
│
├── 📂 docs/                               # Documentação completa
│   ├── INDEX-PACOTE.md
│   ├── README-CONFIGURACAO.md
│   ├── GUIA-RAPIDO-MODIFICACOES.md
│   └── CHECKLIST-IMPLEMENTACAO.md
│
├── 📂 src/                                # Código fonte
│   ├── 📂 pages/                          # Páginas HTML
│   │   ├── login.html
│   │   ├── viabrasil-tela1.html
│   │   ├── viabrasil-tela2.html
│   │   ├── viabrasil-tela3.html
│   │   └── viabrasil-tela4.html
│   │
│   ├── 📂 js/                             # JavaScript
│   │   ├── backend-auth.js
│   │   └── config-loterias.js
│   │
│   └── 📂 backend/                        # Backend (Apps Script)
│       └── Code-v2.gs
│
├── 📂 examples/                           # Exemplos
│   ├── viabrasil-tela1-exemplo-completo.html
│   └── config.example.js
│
└── 📂 assets/                             # Recursos (futuramente)
    ├── screenshots/
    └── logos/
```

## 🚀 Como Organizar Seus Arquivos

### Opção 1: Estrutura Organizada (Recomendado para Produção)

```bash
# Criar estrutura de pastas
mkdir -p sislot/{docs,src/{pages,js,backend},examples,assets/screenshots}

# Mover arquivos para as pastas corretas
mv README.md sislot/
mv LICENSE sislot/
mv CONTRIBUTING.md sislot/
mv CHANGELOG.md sislot/
mv .gitignore sislot/

# Documentação
mv INDEX-PACOTE.md sislot/docs/
mv README-CONFIGURACAO.md sislot/docs/
mv GUIA-RAPIDO-MODIFICACOES.md sislot/docs/
mv CHECKLIST-IMPLEMENTACAO.md sislot/docs/

# Páginas
mv login.html sislot/src/pages/
mv viabrasil-tela*.html sislot/src/pages/

# JavaScript
mv backend-auth.js sislot/src/js/
mv config-loterias.js sislot/src/js/

# Backend
mv Code-v2.gs sislot/src/backend/

# Exemplos
mv viabrasil-tela1-exemplo-completo.html sislot/examples/
mv config.example.js sislot/examples/
```

### Opção 2: Estrutura Simples (Mais Fácil para Iniciantes)

```
sislot/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CHANGELOG.md
├── .gitignore
├── login.html
├── backend-auth.js
├── config-loterias.js
├── config.example.js
├── Code-v2.gs
├── viabrasil-tela1.html
├── viabrasil-tela2.html
├── viabrasil-tela3.html
├── viabrasil-tela4.html
├── viabrasil-tela1-exemplo-completo.html
└── docs/
    ├── INDEX-PACOTE.md
    ├── README-CONFIGURACAO.md
    ├── GUIA-RAPIDO-MODIFICACOES.md
    └── CHECKLIST-IMPLEMENTACAO.md
```

## 📝 Ajustes Necessários por Estrutura

### Se Usar Estrutura Organizada (Opção 1):

Você precisará ajustar os caminhos nos arquivos HTML:

**Em todas as telas HTML** (`src/pages/viabrasil-tela*.html`):

```html
<!-- Antes -->
<script src="backend-auth.js"></script>
<script src="config-loterias.js"></script>

<!-- Depois -->
<script src="../js/backend-auth.js"></script>
<script src="../js/config-loterias.js"></script>
```

**No login.html** (`src/pages/login.html`):

```javascript
// Ajustar redirecionamento
window.location.href = 'viabrasil-tela1.html'; // Mantém igual (mesma pasta)
```

### Se Usar Estrutura Simples (Opção 2):

Não precisa ajustar nada! Os caminhos já estão corretos.

## 🎨 Adicionar Screenshots (Opcional)

Para tornar seu README mais atraente:

1. Tire screenshots das telas
2. Salve em `assets/screenshots/`
3. Adicione no README:

```markdown
## 📸 Screenshots

### Tela de Login
![Login](assets/screenshots/login.png)

### Tela 1 - Dados Externos
![Tela 1](assets/screenshots/tela1.png)

### Tela 4 - Resumo
![Tela 4](assets/screenshots/tela4.png)
```

## 🏷️ Tags e Releases

### Criar Primeira Release

```bash
# Fazer commit inicial
git add .
git commit -m "feat: lançamento inicial do SISLOT v1.0.0"

# Criar tag
git tag -a v1.0.0 -m "Versão 1.0.0 - Lançamento Inicial"

# Push com tags
git push origin main --tags
```

### Criar Release no GitHub

1. Vá para **Releases** no GitHub
2. Clique em **Create a new release**
3. Escolha a tag `v1.0.0`
4. Título: `v1.0.0 - Lançamento Inicial`
5. Descrição: Copie do CHANGELOG.md
6. Publique

## 📋 Checklist de Publicação

Antes de fazer o primeiro push:

- [ ] README.md completo e revisado
- [ ] LICENSE incluída
- [ ] .gitignore configurado
- [ ] Documentação na pasta docs/
- [ ] Remover informações sensíveis (IDs, senhas)
- [ ] Testar que todos os caminhos estão corretos
- [ ] Adicionar screenshots (opcional)
- [ ] Criar arquivo config.example.js
- [ ] Verificar que config.local.js está no .gitignore

## 🚫 O que NÃO commitar

Certifique-se de que estes arquivos/pastas estão no `.gitignore`:

```
config.local.js          # Suas configurações pessoais
.env                     # Variáveis de ambiente
*.bak                    # Backups
node_modules/            # Dependências (se usar)
.DS_Store                # Arquivo do macOS
Thumbs.db                # Arquivo do Windows
```

## 🔍 Verificação Final

Antes de publicar, execute:

```bash
# Verificar status do Git
git status

# Ver o que será commitado
git diff --staged

# Verificar se há arquivos sensíveis
grep -r "AKfycby" .  # Procurar por IDs do Apps Script
grep -r "1kJQaIHZ" . # Procurar por IDs de planilhas
```

Se encontrar IDs reais, remova e use variáveis de exemplo!

## 📦 Comandos Git Úteis

```bash
# Inicializar repositório
git init

# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "feat: lançamento inicial do SISLOT v1.0.0"

# Conectar com repositório remoto
git remote add origin https://github.com/seu-usuario/sislot.git

# Push inicial
git push -u origin main

# Criar e push tag
git tag -a v1.0.0 -m "Versão 1.0.0"
git push --tags
```

## ✨ Personalização

### Badges para o README

Adicione no topo do README.md:

```markdown
![GitHub release](https://img.shields.io/github/v/release/seu-usuario/sislot)
![GitHub](https://img.shields.io/github/license/seu-usuario/sislot)
![GitHub stars](https://img.shields.io/github/stars/seu-usuario/sislot)
![GitHub forks](https://img.shields.io/github/forks/seu-usuario/sislot)
```

### Topics no GitHub

Adicione estas topics no repositório:
- `loterica`
- `fechamento-caixa`
- `google-apps-script`
- `google-sheets`
- `javascript`
- `html5`
- `authentication`
- `business-tools`

## 🎉 Pronto!

Seu repositório está pronto para ser publicado no GitHub! 🚀
