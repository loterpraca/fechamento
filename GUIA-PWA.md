# 📱 Transformar SISLOT em PWA (Progressive Web App)

## 🎯 O que é PWA?

Um PWA permite que seu sistema:
- ✅ Seja instalado no celular/desktop como um app
- ✅ Funcione offline (com limitações)
- ✅ Apareça na tela inicial do dispositivo
- ✅ Tenha ícone próprio
- ✅ Abra em tela cheia (sem barra do navegador)
- ✅ Receba notificações push (se configurar)

---

## 📦 Arquivos Necessários

Você precisará criar 3 novos arquivos:

1. **manifest.json** - Configurações do PWA
2. **service-worker.js** - Cache e funcionalidade offline
3. **Ícones** - Logos do app em vários tamanhos

---

## 🚀 PASSO A PASSO

### PASSO 1: Criar o manifest.json

Crie um arquivo chamado `manifest.json` na raiz do projeto:

```json
{
  "name": "SISLOT - Sistema de Fechamento de Lotéricas",
  "short_name": "SISLOT",
  "description": "Sistema completo de fechamento de caixa para lotéricas",
  "start_url": "/login.html",
  "display": "standalone",
  "background_color": "#0a1628",
  "theme_color": "#00c896",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "icons/icon-72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icons/icon-384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "screenshots": [
    {
      "src": "assets/screenshots/login.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "assets/screenshots/tela1.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ],
  "categories": ["business", "productivity", "finance"],
  "lang": "pt-BR",
  "dir": "ltr"
}
```

---

### PASSO 2: Criar o service-worker.js

Crie um arquivo chamado `service-worker.js` na raiz do projeto:

```javascript
// service-worker.js - SISLOT PWA
const CACHE_NAME = 'sislot-v1.0.0';
const urlsToCache = [
  '/login.html',
  '/viabrasil-tela1.html',
  '/viabrasil-tela2.html',
  '/viabrasil-tela3.html',
  '/viabrasil-tela4.html',
  '/backend-auth.js',
  '/config-loterias.js',
  '/manifest.json'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('[Service Worker] Erro ao fazer cache:', error);
      })
  );
  self.skipWaiting();
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  // Não fazer cache de requisições para o backend
  if (event.request.url.includes('script.google.com')) {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - retorna a resposta do cache
        if (response) {
          return response;
        }

        // Clone da requisição
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Verifica se é uma resposta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone da resposta
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Fallback para página offline (opcional)
        return caches.match('/login.html');
      })
  );
});

// Sincronização em background (opcional)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-fechamentos') {
    event.waitUntil(syncFechamentos());
  }
});

async function syncFechamentos() {
  console.log('[Service Worker] Sincronizando fechamentos...');
  // Implementar lógica de sincronização se necessário
}
```

---

### PASSO 3: Adicionar o Manifest em TODAS as Telas HTML

Em **TODAS** as telas HTML (login.html, tela1, tela2, tela3, tela4), adicione no `<head>`:

```html
<!-- PWA Manifest -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#00c896">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="SISLOT">

<!-- Ícones para iOS -->
<link rel="apple-touch-icon" href="/icons/icon-152.png">
<link rel="apple-touch-icon" sizes="72x72" href="/icons/icon-72.png">
<link rel="apple-touch-icon" sizes="96x96" href="/icons/icon-96.png">
<link rel="apple-touch-icon" sizes="128x128" href="/icons/icon-128.png">
<link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152.png">
<link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192.png">
<link rel="apple-touch-icon" sizes="384x384" href="/icons/icon-384.png">
<link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512.png">

<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16.png">
```

---

### PASSO 4: Registrar o Service Worker

Adicione este código no **final do `<body>`** de **TODAS** as telas HTML:

```html
<!-- Registrar Service Worker -->
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registrado:', registration.scope);
      })
      .catch((error) => {
        console.log('❌ Falha ao registrar Service Worker:', error);
      });
  });
}
</script>
```

---

### PASSO 5: Criar os Ícones

#### Opção A: Usar Gerador Online (Mais Fácil)

1. **Acesse:** https://www.pwabuilder.com/imageGenerator
2. **Upload** uma logo quadrada (512x512px no mínimo)
3. **Baixe** todos os ícones gerados
4. **Crie** a pasta `icons/` na raiz do projeto
5. **Coloque** todos os ícones dentro de `icons/`

#### Opção B: Criar Manualmente

**Crie uma logo simples:**

1. Use o Canva, Figma ou qualquer editor
2. Crie um quadrado **512x512px**
3. Use as cores do projeto:
   - Fundo: `#0a1628` (azul escuro)
   - Ícone: `#00c896` (verde)
   - Texto: `SL` (iniciais)

**Redimensione para todos os tamanhos:**
- 16x16, 32x32, 72x72, 96x96, 128x128
- 144x144, 152x152, 192x192, 384x384, 512x512

**Salve na pasta `icons/`:**
```
icons/
├── icon-16.png
├── icon-32.png
├── icon-72.png
├── icon-96.png
├── icon-128.png
├── icon-144.png
├── icon-152.png
├── icon-192.png
├── icon-384.png
└── icon-512.png
```

---

### PASSO 6: Adicionar Prompt de Instalação (Opcional)

Adicione este código em `login.html` e `viabrasil-tela1.html`:

```html
<style>
.install-prompt {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: var(--blue-deep);
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 200, 150, 0.3);
  display: none;
  align-items: center;
  gap: 12px;
  z-index: 1000;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.install-prompt button {
  background: var(--blue-deep);
  color: var(--accent);
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.install-prompt button:hover {
  background: var(--blue-mid);
}

.install-prompt .close-btn {
  background: transparent;
  color: var(--blue-deep);
  padding: 4px 8px;
}
</style>

<div class="install-prompt" id="install-prompt">
  <span>📱 Instalar SISLOT como app?</span>
  <button id="install-btn">Instalar</button>
  <button class="close-btn" id="close-install">✕</button>
</div>

<script>
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Mostrar prompt de instalação
  document.getElementById('install-prompt').style.display = 'flex';
});

document.getElementById('install-btn').addEventListener('click', async () => {
  if (!deferredPrompt) return;
  
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  
  console.log(`Usuário ${outcome === 'accepted' ? 'aceitou' : 'recusou'} instalar`);
  deferredPrompt = null;
  document.getElementById('install-prompt').style.display = 'none';
});

document.getElementById('close-install').addEventListener('click', () => {
  document.getElementById('install-prompt').style.display = 'none';
});

// Detectar se já está instalado
window.addEventListener('appinstalled', () => {
  console.log('✅ PWA instalado com sucesso!');
  document.getElementById('install-prompt').style.display = 'none';
});
</script>
```

---

## 📁 Estrutura Final do Projeto

```
sislot-fechamento/
├── manifest.json           ← NOVO
├── service-worker.js       ← NOVO
├── icons/                  ← NOVA PASTA
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
├── login.html              ← MODIFICADO
├── viabrasil-tela1.html    ← MODIFICADO
├── viabrasil-tela2.html    ← MODIFICADO
├── viabrasil-tela3.html    ← MODIFICADO
├── viabrasil-tela4.html    ← MODIFICADO
├── backend-auth.js
├── config-loterias.js
└── ... outros arquivos
```

---

## 🧪 Como Testar

### No Desktop (Chrome/Edge):

1. Abra o site no navegador
2. Pressione **F12** (DevTools)
3. Vá na aba **Application**
4. No menu esquerdo:
   - **Manifest:** Verifique se aparece
   - **Service Workers:** Deve mostrar "activated and is running"
5. No menu direito (barra de endereço):
   - Deve aparecer ícone de **instalação (+)**
6. Clique e instale

### No Android (Chrome):

1. Abra o site no Chrome
2. Menu ⋮ → **"Adicionar à tela inicial"** ou **"Instalar app"**
3. Confirme
4. Ícone aparece na tela inicial

### No iOS (Safari):

1. Abra o site no Safari
2. Toque no ícone de **Compartilhar** (⬆️)
3. **"Adicionar à Tela de Início"**
4. Confirme
5. Ícone aparece na tela inicial

---

## 🚀 Publicar com PWA no GitHub

### Atualizar o Repositório

```bash
# Se estiver usando GitHub Desktop:
# 1. Adicione os novos arquivos
# 2. Commit: "feat: adicionar suporte PWA"
# 3. Push

# Se estiver usando o site:
# 1. Upload manifest.json
# 2. Upload service-worker.js
# 3. Upload pasta icons/
# 4. Edite cada HTML para adicionar as tags PWA
```

### Habilitar GitHub Pages (para testar online)

1. No repositório, vá em **Settings**
2. No menu esquerdo, **Pages**
3. **Source:** Deploy from a branch
4. **Branch:** main / (root)
5. **Save**
6. Aguarde 2-3 minutos
7. Seu site estará em: `https://SEU-USUARIO.github.io/sislot-fechamento/`

**Agora você pode testar o PWA online!** 📱

---

## 🎨 Customizações Avançadas

### Mudar Cores do Tema

No `manifest.json`:
```json
"background_color": "#0a1628",  // Cor de fundo ao abrir
"theme_color": "#00c896"        // Cor da barra de status
```

### Mudar Orientação

```json
"orientation": "portrait-primary"  // Vertical
// ou
"orientation": "any"              // Qualquer orientação
```

### Adicionar Atalhos

```json
"shortcuts": [
  {
    "name": "Novo Fechamento",
    "short_name": "Novo",
    "description": "Iniciar novo fechamento",
    "url": "/viabrasil-tela1.html",
    "icons": [{ "src": "/icons/icon-96.png", "sizes": "96x96" }]
  }
]
```

---

## 📊 Funcionalidades Offline

### O que funciona offline:
- ✅ Navegação entre telas já visitadas
- ✅ Visualização de dados salvos no sessionStorage
- ✅ Interface completa
- ✅ Preenchimento de formulários

### O que NÃO funciona offline:
- ❌ Login (precisa validar no backend)
- ❌ Salvar fechamento (precisa enviar para Google Sheets)
- ❌ Validar sessão

### Para Melhorar Offline:

**Adicione no service-worker.js:**

```javascript
// Armazenar fechamentos offline para enviar depois
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-fechamentos') {
    event.waitUntil(enviarFechamentosPendentes());
  }
});

async function enviarFechamentosPendentes() {
  // Buscar do IndexedDB e enviar
  // Implementar conforme necessidade
}
```

---

## ✅ Checklist de PWA

- [ ] `manifest.json` criado
- [ ] `service-worker.js` criado
- [ ] Pasta `icons/` com todos os tamanhos
- [ ] Tags PWA em todas as páginas HTML
- [ ] Service Worker registrado em todas as páginas
- [ ] Testado no Chrome Desktop
- [ ] Testado no celular Android/iOS
- [ ] Publicado com HTTPS (GitHub Pages)
- [ ] Ícone de instalação aparece
- [ ] App abre em tela cheia
- [ ] Funciona offline (parcialmente)

---

## 🎉 Pronto!

Seu SISLOT agora é um PWA completo! 📱

**Benefícios:**
- Instalável como app nativo
- Ícone na tela inicial
- Abre em tela cheia
- Funciona parcialmente offline
- Mais rápido (cache)
- Mais profissional

**Para distribuir:**
1. Publique no GitHub Pages
2. Compartilhe o link
3. Usuários podem instalar
4. Pronto! App funcionando! 🚀

---

**Dúvidas?** Consulte:
- https://web.dev/progressive-web-apps/
- https://developer.mozilla.org/pt-BR/docs/Web/Progressive_web_apps
