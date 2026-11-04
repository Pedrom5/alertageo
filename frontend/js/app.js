const API_BASE = 'http://localhost:3001/api';

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const alertForm = document.getElementById('alertForm');
const tabs = document.querySelectorAll('.tab');
const toast = document.getElementById('toast');
const listaReclamacoes = document.getElementById('listaReclamacoes');
const btnAtualizarReclamacoes = document.getElementById('btnAtualizarReclamacoes');

function showToast(message, success = true) {
  toast.textContent = message;
  toast.style.background = success ? 'rgba(13, 191, 125, 0.96)' : 'rgba(255, 107, 107, 0.96)';
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

function renderReclamacoes(reclamacoes) {
  if (!Array.isArray(reclamacoes) || reclamacoes.length === 0) {
    listaReclamacoes.innerHTML = '<div class="empty-state">Nenhuma reclamação cadastrada no momento.</div>';
    return;
  }

  listaReclamacoes.innerHTML = reclamacoes.map((reclamacao) => {
    const categoria = reclamacao.categoria || 'geral';
    const nivel = reclamacao.nivel || 'medio';
    const status = reclamacao.status || 'novo';
    const descricao = reclamacao.descricao || 'Descrição não informada.';
    const localizacao = reclamacao.latitude && reclamacao.longitude
      ? `Lat ${reclamacao.latitude}, Lon ${reclamacao.longitude}`
      : 'Localização não informada';

    return `
      <article class="reclamacao-card">
        <div class="reclamacao-topo">
          <span class="tag categoria">${categoria}</span>
          <span class="tag nivel ${nivel}">${nivel}</span>
        </div>
        <h4>${reclamacao.titulo}</h4>
        <p>${descricao}</p>
        <div class="reclamacao-meta">
          <span>${status}</span>
          <span>${localizacao}</span>
        </div>
      </article>
    `;
  }).join('');
}

async function carregarReclamacoes() {
  try {
    const response = await fetch(`${API_BASE}/alerts`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Não foi possível carregar as reclamações');
    }

    renderReclamacoes(data);
  } catch (error) {
    listaReclamacoes.innerHTML = `<div class="empty-state error">${error.message}</div>`;
  }
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

btnAtualizarReclamacoes.addEventListener('click', carregarReclamacoes);

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
    await carregarReclamacoes();
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
    await carregarReclamacoes();
  } catch (error) {
    console.warn('Back-end ainda não está em execução:', error.message);
    listaReclamacoes.innerHTML = '<div class="empty-state error">Servidor indisponível. Ligue o backend para carregar as reclamações.</div>';
  }
}

checkHealth();
