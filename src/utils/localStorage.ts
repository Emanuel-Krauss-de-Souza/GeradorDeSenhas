import AsyncStorage from "@react-native-async-storage/async-storage";

// Buscar todas as senhas salvas
export const getInformacoes = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erro ao obter informações: ", error);
    return [];
  }
};

export const salvarMemoria = async (key, value) => {
  try {
    const senhasAtuais = await getInformacoes(key);
    const atualizadas = [value, ...senhasAtuais];
    await AsyncStorage.setItem(key, JSON.stringify(atualizadas));
  } catch (error) {
    console.error("Erro ao salvar na memória: ", error);
  }
};

export const limparDados = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Erro ao limpar dados: ", error);
  }
};
