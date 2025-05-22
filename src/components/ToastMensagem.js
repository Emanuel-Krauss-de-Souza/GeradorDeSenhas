import Toast from 'react-native-toast-message';
 
export const mensagemToast = (tipo, texto1, texto2 = '') => {
  Toast.show({
    type: tipo,
    text1: texto1,
    text2: texto2,
    position: 'bottom',
  });
};