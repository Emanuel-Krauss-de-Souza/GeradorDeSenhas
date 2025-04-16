import React, { useState } from 'react';  
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { gerarSenha } from '../service/senhas';

export default function telaInicial({navigation}) {
  const [senha, setSenha] = useState('');

  const coletarSenha = () => {
    setSenha(gerarSenha());
  };
  const nvgHistorico = () => {
    navigation.navigate("historico")
  };

  const copiarSenha = async () => {
      await Clipboard.setStringAsync(senha);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.tituloInicial}>Gerador de Senha</Text>
      <Image
        style={styles.imagemInicial}
        source={{ uri: 'https://imgs.search.brave.com/YmU5Yqn4Vl8GuhNmYz6JAORRABvmhFoyv6d6jNNem80/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LXBpbm8tNjc4MDU0/OS01NTU3NTQ3LnBu/Zz9mPXdlYnAmdz0x/Mjg' }}
      />
      <View style={styles.viewSenhaGerada}>
        <Text style={styles.textButton}>{senha || "Clique em 'Gerar Senha'"}</Text>
      </View>
      <TouchableOpacity style={styles.buttonGerarSenha} onPress={coletarSenha}>
        <Text style={styles.textButton}>Gerar Senha</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCopiarSenha} onPress={copiarSenha}>
        <Text style={styles.textButton}>Copiar Senha</Text>
      </TouchableOpacity>
        <Text style={styles.textoRota} onPress={nvgHistorico}>Histórico de Senhas</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#718f85",
    alignItems: 'center',
    paddingTop: 150,
  },
  tituloInicial: {
    color: "white",
    fontSize: 40,
    fontWeight: 'bold', 
    paddingBottom: 20,
  },
  imagemInicial: {
    width: 200,
    height: 200,
  },
  viewSenhaGerada: {
    width: 350,
    height: 50,
    backgroundColor: "#A3D7CE",
    borderWidth: 2,
    borderColor: "#52baa7",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 30, 
  },
  textSenhaGerada: {
    fontWeight: 'bold', 
    color: "black",
  },
  buttonGerarSenha: {
    width: 350,
    height: 50,
    backgroundColor: "#52baa7",
    borderWidth: 2,
    borderColor: "#3e8f7e",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 10, 
  },
  textButton: {
    fontWeight: 'bold', 
    color: "white",
    fontSize: 25,
  },
  buttonCopiarSenha: {
    width: 350,
    height: 50,
    backgroundColor: "#fcb408",
    borderWidth: 2,
    borderColor: "#e28d01",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 10, 
  },
  textoRota: {
    paddingTop: 15,
    fontWeight: 'bold', 
    color: "white",
    fontSize: 15,
  }
});
