// ══════════════════════════════════════════════════════════════════
// service-worker.js - SISLOT PWA
// Service Worker para cache e funcionalidade offline
// ══════════════════════════════════════════════════════════════════

const CACHE_NAME = 'sislot-v1.0.0';
const RUNTIME_CACHE = 'sislot-runtime-v1.0.0';

// Arquivos para fazer cache na instalação
const urlsToCache = [
  '/login.html',
  '/viabrasil-tela1.html',
  '/viabrasil-tela2.html',
  '/viabrasil-tela3.html',
  '/viabrasil-tela4.html',
  '/backend-auth.js',
  '/config-loterias.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// ══════════════════════════════════════════════════════════════════
// INSTALAÇÃO
// ══════════════════════════════════════════════════════════════════

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando SISLOT v1.0.0...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Cache aberto');
        return cache.addAll(urlsToCache)
          .catch((error) => {
            console.error('[Service Worker] Erro ao fazer cache:', error);
            // Continua mesmo se alguns arquivos falharem
            return Promise.resolve();
          });
      })
  );
  
  // Força a ativação imediata
  self.skipWaiting();
});

// ══════════════════════════════════════════════════════════════════
// ATIVAÇÃO
// ══════════════════════════════════════════════════════════════════

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Deletar caches antigos
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[Service Worker] Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Toma controle imediatamente
  self.clients.claim();
});

// ══════════════════════════════════════════════════════════════════
// FETCH - Interceptar requisições
// ══════════════════════════════════════════════════════════════════

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Não fazer cache de requisições para:
  // - Google Apps Script (backend)
  // - APIs externas
  // - Chrome extensions
  if (
    url.origin.includes('script.google.com') ||
    url.origin.includes('apis.google.com') ||
    url.origin.includes('accounts.google.com') ||
    url.protocol === 'chrome-extension:'
  ) {
    return event.respondWith(fetch(request));
  }

  // Estratégia: Cache First, depois Network
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Se encontrou no cache, retorna
        if (cachedResponse) {
          console.log('[Service Worker] Servindo do cache:', request.url);
          return cachedResponse;
        }

        // Se não encontrou, busca na rede
        console.log('[Service Worker] Buscando na rede:', request.url);
        return fetch(request)
          .then((response) => {
            // Verifica se é uma resposta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona a resposta para armazenar no cache
            const responseToCache = response.clone();

            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            console.log('[Service Worker] Erro na rede:', error);
            
            // Fallback: tentar retornar a página de login do cache
            if (request.mode === 'navigate') {
              return caches.match('/login.html');
            }
            
            return new Response('Offline - Sem conexão com a internet', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// ══════════════════════════════════════════════════════════════════
// SINCRONIZAÇÃO EM BACKGROUND (Background Sync)
// ══════════════════════════════════════════════════════════════════

self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Evento de sincronização:', event.tag);
  
  if (event.tag === 'sync-fechamentos') {
    event.waitUntil(syncFechamentos());
  }
});

async function syncFechamentos() {
  console.log('[Service Worker] Sincronizando fechamentos pendentes...');
  
  // Aqui você pode implementar lógica para:
  // 1. Buscar fechamentos salvos localmente (IndexedDB)
  // 2. Tentar enviar para o backend
  // 3. Marcar como sincronizado se bem-sucedido
  
  // Exemplo básico:
  try {
    // const fechamentosPendentes = await buscarFechamentosPendentes();
    // for (const fechamento of fechamentosPendentes) {
    //   await enviarParaBackend(fechamento);
    // }
    console.log('[Service Worker] Sincronização concluída');
  } catch (error) {
    console.error('[Service Worker] Erro na sincronização:', error);
    throw error; // Reagendar sincronização
  }
}

// ══════════════════════════════════════════════════════════════════
// NOTIFICAÇÕES PUSH (opcional - para implementação futura)
// ══════════════════════════════════════════════════════════════════

self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push recebido');
  
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'SISLOT';
  const options = {
    body: data.body || 'Nova notificação',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-96.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notificação clicada');
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/login.html')
  );
});

// ══════════════════════════════════════════════════════════════════
// MENSAGENS DO CLIENTE
// ══════════════════════════════════════════════════════════════════

self.addEventListener('message', (event) => {
  console.log('[Service Worker] Mensagem recebida:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

// ══════════════════════════════════════════════════════════════════
// LOG DE VERSÃO
// ══════════════════════════════════════════════════════════════════

console.log('[Service Worker] SISLOT Service Worker v1.0.0 carregado');
