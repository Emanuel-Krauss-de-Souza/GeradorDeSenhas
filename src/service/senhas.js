import { getDataStorage, setDataStorage } from "../utils/localStorage";

export const gerarSenha = () => {
  const possiveisCaracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let senhaGerada = '';

  for (let i = 0; i < 12; i++) {
    senhaGerada += possiveisCaracteres.charAt(Math.floor(Math.random() * possiveisCaracteres.length));
  }
  return senhaGerada;
};

export const salvarSenha = async (password) => {
  await setDataStorage("password", password);
};

export const coletarSenha = async () => {
  return await getDataStorage("password");
};
