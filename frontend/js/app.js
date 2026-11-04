const API_BASE = 'http://localhost:3000/api';

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const alertForm = document.getElementById('alertForm');
const tabs = document.querySelectorAll('.tab');
const toast = document.getElementById('toast');

function showToast(message, success = true) {
  toast.textContent = message;
  toast.style.background = success ? 'rgba(13, 191, 125, 0.96)' : 'rgba(255, 107, 107, 0.96)';
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

function switchTab(target) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === target;
    tab.classList.toggle('active', isActive);
  });

  loginForm.classList.toggle('active', target === 'login');
  registerForm.classList.toggle('active', target === 'register');
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

document.getElementById('scrollToForm').addEventListener('click', () => {
  document.getElementById('alertForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('showLogin').addEventListener('click', () => {
  switchTab('login');
  document.querySelector('.auth-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    email: document.getElementById('loginEmail').value,
    senha: document.getElementById('loginPassword').value
  };

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao autenticar');
    }

    localStorage.setItem('token', data.token);
    showToast('Login realizado com sucesso!');
  } catch (error) {
    showToast(error.message, false);
  }
});

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    nome: document.getElementById('registerName').value,
    email: document.getElementById('registerEmail').value,
    senha: document.getElementById('registerPassword').value,
    perfil: document.getElementById('registerPerfil').value
  };

  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao cadastrar usuário');
    }

    localStorage.setItem('token', data.token);
    showToast('Cadastro realizado com sucesso!');
    switchTab('login');
  } catch (error) {
    showToast(error.message, false);
  }
});

alertForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    titulo: document.getElementById('alertTitle').value,
    categoria: document.getElementById('alertCategory').value,
    nivel: document.getElementById('alertLevel').value,
    descricao: document.getElementById('alertDescription').value,
    latitude: null,
    longitude: null
  };

  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${API_BASE}/alerts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao salvar alerta');
    }

    showToast('Alerta enviado com sucesso!');
    alertForm.reset();
  } catch (error) {
    showToast(error.message, false);
  }
});

async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE}/health`);
    if (!response.ok) {
      throw new Error('Servidor indisponível');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.warn('Back-end ainda não está em execução:', error.message);
  }
}

checkHealth();
