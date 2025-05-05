import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function HistoricoSenhas() {
  const [senhasSalvas, setSenhasSalvas] = useState([]);
  const [visiveis, setVisiveis] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const carregarSenhas = async () => {
      const dados = await AsyncStorage.getItem('senhas');
      if (dados) {
        setSenhasSalvas(JSON.parse(dados));
      }
    };
    carregarSenhas();
  }, []);

  const alternarVisibilidade = (index) => {
    setVisiveis(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const copiarSenha = (senha) => {
    Clipboard.setString(senha);
    Alert.alert("Copiado", "Senha copiada para a área de transferência.");
  };

  const deletarSenha = async (index) => {
    const novaLista = [...senhasSalvas];
    novaLista.splice(index, 1);
    await AsyncStorage.setItem('senhas', JSON.stringify(novaLista));
    setSenhasSalvas(novaLista);
  };

  const nvgTelaInicial = () => {
    navigation.navigate("telaInicial"); // 👈 Navega para a tela desejada
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.senhaBox}>
      <Text style={styles.nome}>{item.nome}</Text>
      <View style={styles.linhaSenha}>
        <Text style={styles.senhaEscondida}>
          {visiveis[index] ? item.senha : '********'}
        </Text>
        <TouchableOpacity onPress={() => alternarVisibilidade(index)}>
          <Text style={styles.icone}>😑</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => copiarSenha(item.senha)}>
          <Text style={styles.icone}>✋</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deletarSenha(index)}>
          <Text style={styles.icone}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.tituloInicial}>Histórico de Senhas</Text>
      <FlatList
        data={senhasSalvas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={styles.lista}
      />
      <View style={styles.containerBotao}>
        <TouchableOpacity style={styles.buttonEntrar} onPress={nvgTelaInicial}>
          <Text style={styles.textButton}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#718f85",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  tituloInicial: {
    color: "white",
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonEntrar: {
    width: 150,
    height: 50,
    backgroundColor: "#fcb408",
    borderWidth: 2,
    borderColor: "#e28d01",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  textButton: {
    fontWeight: 'bold',
    color: "white",
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
});
