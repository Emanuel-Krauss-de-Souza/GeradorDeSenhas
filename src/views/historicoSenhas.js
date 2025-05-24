import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { mensagemToast } from '../components/ToastMensagem';
import { getItens, deleteItem } from '../service/auth/itemService';

export default function HistoricoSenhas() {
  const [senhasSalvas, setSenhasSalvas] = useState([]);
  const [token, setToken] = useState(null);
  const [visiveis, setVisiveis] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [indiceSelecionado, setIndiceSelecionado] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    async function carregarTokenESenhas() {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (!storedToken) {
          mensagemToast('error', 'Erro', 'Token não encontrado. Faça login novamente.');
          return;
        }
        setToken(storedToken);

        const dados = await getItens(storedToken);
        if (!Array.isArray(dados)) {
          mensagemToast('error', 'Erro', 'Dados recebidos em formato inválido.');
          return;
        }
        setSenhasSalvas(dados);
        setVisiveis(new Array(dados.length).fill(false));
      } catch (error) {
        mensagemToast('error', 'Erro', error.message);
      }
    }

    carregarTokenESenhas();
  }, []);

  const alternarVisibilidade = (index) => {
    const novaVisibilidade = [...visiveis];
    novaVisibilidade[index] = !novaVisibilidade[index];
    setVisiveis(novaVisibilidade);
  };

  const copiarSenha = (senha) => {
    Clipboard.setString(senha);
    mensagemToast('success', 'Copiado', 'Senha copiada para a área de transferência.');
  };

  const confirmarExclusao = async () => {
    try {
      if (indiceSelecionado === null) return;
      const id = senhasSalvas[indiceSelecionado]?.id;
      if (!id) return;

      await deleteItem(id, token);

      const novaLista = senhasSalvas.filter((_, i) => i !== indiceSelecionado);
      setSenhasSalvas(novaLista);
      setVisiveis(new Array(novaLista.length).fill(false));

      setModalVisible(false);
      setIndiceSelecionado(null);

      mensagemToast('success', 'Sucesso', 'Senha deletada com sucesso.');
    } catch (error) {
      mensagemToast('error', 'Erro ao deletar', error.message);
    }
  };

  const nvgTelaInicial = () => {
    navigation.navigate('telaInicial');
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.senhaBox}>
      <Text style={styles.nome}>{item.nome}</Text>
      <View style={styles.linhaSenha}>
        <Text style={styles.senhaEscondida}>
          {visiveis[index] ? item.senha : '********'}
        </Text>
        <TouchableOpacity onPress={() => alternarVisibilidade(index)}>
          <Text style={styles.icone}>👁️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => copiarSenha(item.senha)}>
          <Text style={styles.icone}>📋</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIndiceSelecionado(index);
            setModalVisible(true);
          }}
        >
          <Text style={styles.icone}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.tituloInicial}>Histórico de Senhas</Text>

      {senhasSalvas.length === 0 ? (
        <Text style={styles.textoSemSenhas}>Nenhuma senha adicionada até o momento.</Text>
      ) : (
        <FlatList
          data={senhasSalvas}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderItem}
          style={styles.lista}
        />
      )}

      <View style={styles.containerBotao}>
        <TouchableOpacity style={styles.buttonEntrar} onPress={nvgTelaInicial}>
          <Text style={styles.textButton}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIndiceSelecionado(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Confirmar exclusão</Text>
            <Text style={styles.modalTexto}>Tem certeza de que deseja excluir esta senha?</Text>
            <View style={styles.modalBotoes}>
              <TouchableOpacity
                style={styles.modalBotaoCancelar}
                onPress={() => {
                  setModalVisible(false);
                  setIndiceSelecionado(null);
                }}
              >
                <Text style={[styles.modalTextoBotao, { color: '#000' }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBotaoExcluir} onPress={confirmarExclusao}>
                <Text style={styles.modalTextoBotao}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#718f85',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  tituloInicial: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonEntrar: {
    width: 150,
    height: 50,
    backgroundColor: '#fcb408',
    borderWidth: 2,
    borderColor: '#e28d01',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  textButton: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  },
  lista: {
    flex: 1,
  },
  senhaBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: '#000',
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  linhaSenha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  senhaEscondida: {
    fontSize: 16,
    letterSpacing: 3,
    flex: 1,
  },
  icone: {
    fontSize: 20,
    marginLeft: 10,
  },
  containerBotao: {
    marginBottom: 20,
    alignItems: 'center',
  },
  textoSemSenhas: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTexto: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBotaoCancelar: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  modalBotaoExcluir: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e53935',
    alignItems: 'center',
  },
  modalTextoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
});
