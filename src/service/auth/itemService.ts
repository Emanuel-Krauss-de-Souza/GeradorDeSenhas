import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function createItem(nome, senha, token) {
  try {
    const response = await api.post(
      '/item',
      { nome, senha },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function getItens(token) {
  try {
    const response = await api.get('/itens', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.itens;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteItem(id, token) {

    console.log(token)
  try {
    const response = await api.delete(`/item/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

function handleError(error) {
  if (error.response) {
    const errorMessage = error.response.data.error ||
                          error.response.data.message ||
                          'Erro desconhecido no servidor';

    const statusMessages = {
      400: 'Dados inválidos',
      401: 'Não autorizado',
      403: 'Acesso negado',
      404: 'Item não encontrado',
      409: 'Conflito de dados',
      500: 'Erro interno no servidor'
    };

    throw new Error(statusMessages[error.response.status] || errorMessage);

  } else if (error.request) {
    throw new Error('Servidor não respondeu. Verifique sua conexão.');
  } else {
    throw new Error('Erro ao configurar a requisição: ' + error.message);
  }
}
