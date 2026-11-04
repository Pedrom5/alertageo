const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usuarios = [];

function gerarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil
    },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '8h' }
  );
}

async function register(req, res) {
  const { nome, email, senha, perfil = 'cidadao' } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }

  const usuarioExistente = usuarios.find((usuario) => usuario.email === email);

  if (usuarioExistente) {
    return res.status(409).json({ message: 'Usuário já cadastrado.' });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    senha: senhaHash,
    perfil
  };

  usuarios.push(novoUsuario);

  const token = gerarToken(novoUsuario);

  return res.status(201).json({
    message: 'Usuário cadastrado com sucesso.',
    token,
    usuario: {
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      perfil: novoUsuario.perfil
    }
  });
}

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  const usuario = usuarios.find((item) => item.email === email);

  if (!usuario) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const token = gerarToken(usuario);

  return res.status(200).json({
    message: 'Login realizado com sucesso.',
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil
    }
  });
}

module.exports = {
  register,
  login
};
