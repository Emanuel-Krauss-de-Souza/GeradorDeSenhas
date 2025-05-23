import api from "../api";


export async function login(email, password) {
  try {
    const response = await api.post('/login', { 
      email, 
      password
    });
    

    return response.data;
    
  } catch (error) {
    
    if (error.response) {
        const msg = error.response.data.message || error.response.data.error || 'Erro ao logar';
        throw new Error(msg);
    } else if (error.request) {
        throw new Error('Sem resposta do servidor');
    } else {
        throw new Error('Erro ao configurar a requisição');
    }
  }    
}

export async function signup(name, email, password, confirmPassword) {
  try {
    const response = await api.post('/signup', { 
      name, 
      email, 
      password,
      confirmPassword
    });
    
    return response.data;
    
  } catch (error) {
    if (error.response) {
        const msg = error.response.data.message || error.response.data.error || 'Erro ao cadastrar';
        throw new Error(msg);
    } else if (error.request) {
        throw new Error('Sem resposta do servidor');
    } else {
        throw new Error('Erro ao configurar a requisição');
    }
  }    
}

