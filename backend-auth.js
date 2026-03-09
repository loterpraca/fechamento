// ══════════════════════════════════════════════════════════════════
// backend-auth.js
// Sistema de autenticação e integração com Google Apps Script
// ══════════════════════════════════════════════════════════════════

// IMPORTANTE: Configure aqui a URL do seu Google Apps Script deployment
const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwh5WAyT602V-7GVxDARtDY5iI52ZB-i8H54vMNn-th5gyiLfwUvZdhK9ArOMaQ--pz2g/exec';

// ── Gerenciamento de Sessão ──────────────────────────────────────

function getToken() {
  return localStorage.getItem('sislot_token');
}

function getUser() {
  const userStr = localStorage.getItem('sislot_user');
  return userStr ? JSON.parse(userStr) : null;
}

function clearSession() {
  localStorage.removeItem('sislot_token');
  localStorage.removeItem('sislot_user');
  sessionStorage.clear();
}

function logout() {
  clearSession();
  window.location.href = 'login.html';
}

// ── Validação de Sessão ──────────────────────────────────────────

async function validarSessao() {
  const token = getToken();
  
  if (!token) {
    logout();
    return false;
  }

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'validarSessao',
        token: token,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      // Atualizar dados do usuário
      localStorage.setItem('sislot_user', JSON.stringify(data.user));
      return true;
    } else {
      clearSession();
      logout();
      return false;
    }
  } catch (error) {
    console.error('Erro ao validar sessão:', error);
    return false;
  }
}

// ── Salvar Fechamento ────────────────────────────────────────────

async function salvarFechamento(dados) {
  const token = getToken();
  
  if (!token) {
    logout();
    throw new Error('Sessão expirada');
  }

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'salvarFechamento',
        token: token,
        payload: dados,
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      if (result.error && result.error.includes('expirada')) {
        clearSession();
        logout();
      }
      throw new Error(result.error || 'Erro ao salvar fechamento');
    }

    return result;
  } catch (error) {
    console.error('Erro ao salvar fechamento:', error);
    throw error;
  }
}

// ── Proteção de Página (chamar no início de cada tela) ──────────

async function protegerPagina() {
  const isValid = await validarSessao();
  
  if (!isValid) {
    return false;
  }

  // Adicionar informações do usuário na interface (se houver elementos)
  const user = getUser();
  if (user) {
    const userNameEl = document.getElementById('user-name');
    const userPerfilEl = document.getElementById('user-perfil');
    
    if (userNameEl) userNameEl.textContent = user.nome;
    if (userPerfilEl) userPerfilEl.textContent = user.perfil;
  }

  return true;
}

// ── Inicialização automática em páginas protegidas ──────────────

window.addEventListener('load', async () => {
  // Verifica se a página atual não é a de login
  if (!window.location.pathname.includes('login.html')) {
    const isValid = await protegerPagina();
    
    if (!isValid) {
      console.log('Sessão inválida, redirecionando para login...');
    }
  }
});

// ── Utilitários ──────────────────────────────────────────────────

function mostrarErro(mensagem) {
  alert(mensagem);
}

function mostrarSucesso(mensagem) {
  alert(mensagem);
}

// Exportar funções para uso global
window.SislotAuth = {
  getToken,
  getUser,
  logout,
  validarSessao,
  salvarFechamento,
  protegerPagina,
  mostrarErro,
  mostrarSucesso,
};
