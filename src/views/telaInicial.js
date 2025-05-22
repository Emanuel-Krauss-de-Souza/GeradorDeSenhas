import React, { useState, useEffect } from 'react';  
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gerarSenha } from '../service/senhas';
import { mensagemToast } from '../components/ToastMensagem';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importando o ícone de logout

export default function telaInicial({ navigation }) {
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const carregarHistorico = async () => {
      const dados = await AsyncStorage.getItem('senhas');
      if (dados) {
        setHistorico(JSON.parse(dados));
      }
    };
    carregarHistorico();
  }, []);

  const coletarSenha = () => {
    const novaSenha = gerarSenha();
    setSenha(novaSenha);
  };

  const copiarSenha = async () => {
    if (!senha) {
      mensagemToast('error', 'Erro', 'Nenhuma senha gerada para copiar.');
      return;
    }
    await Clipboard.setStringAsync(senha);
    mensagemToast('success', 'Copiado', 'Senha copiada para a área de transferência.');
  };

  const nvgHistorico = () => {
    navigation.navigate("historico");
  };

  const salvarSenha = async () => {
    if (!nome.trim()) {
      mensagemToast('error', 'Erro','O nome não pode estar vazio.');
      return;
    }

    const nomeDuplicado = historico.find(item => item.nome === nome);
    if (nomeDuplicado) {
      mensagemToast('error', 'Erro', 'Este nome já está sendo utilizado.');
      return;
    }

    const novaLista = [...historico, { nome, senha }];
    await AsyncStorage.setItem('senhas', JSON.stringify(novaLista));
    setHistorico(novaLista);
    setNome('');
    setModalVisible(false);
    mensagemToast('success', 'Sucesso', 'Senha salva com sucesso!');
  };

  // Função para logout
  const nvgLogin = () => {
    navigation.navigate('login');
    mensagemToast('success', 'Sucesso', 'Deslogado com sucesso!');
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

      <TouchableOpacity
        style={[styles.buttonSalvarSenha, !senha && styles.buttonDisabled]}
        onPress={() => setModalVisible(true)}
        disabled={!senha}
      >
        <Text style={styles.textButton}>Salvar</Text>
      </TouchableOpacity>

      <Text style={styles.textoRota} onPress={nvgHistorico}>Histórico de Senhas</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={nvgLogin}>
        <Icon name="sign-out" size={30} color="#fff" />
      </TouchableOpacity>

      <StatusBar style="auto" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Salvar Senha</Text>

            <Text style={styles.textoSalvarSenha}>Nome da Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.textoSalvarSenha}>Senha Gerada</Text>
            <TextInput
              style={styles.input}
              value={senha}
              editable={false}
            />

            <TouchableOpacity style={styles.buttonSalvarSenhaModal} onPress={salvarSenha}>
              <Text style={styles.textButton}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#000', marginTop: 10 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  buttonSalvarSenha: {
    width: 350,
    height: 50,
    backgroundColor: "#c27c5d",
    borderWidth: 2,
    borderColor: "#b55336",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  textButton: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 25,
  },
  textoRota: {
    paddingTop: 15,
    fontWeight: 'bold',
    color: "white",
    fontSize: 15,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    right: 20, 
    backgroundColor: '#fcb408', 
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 350,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonSalvarSenhaModal: {
    backgroundColor: '#52baa7',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  textoSalvarSenha: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
