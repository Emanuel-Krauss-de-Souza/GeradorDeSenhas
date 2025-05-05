import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validarFormulario = () => {

    if (email.trim() && senha.trim()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    validarFormulario();
  }, [email, senha]);

  const nvgTelaInicial = () => {
    navigation.navigate("telaInicial");
  };

  const nvgCadastro = () => {
    navigation.navigate("cadastro");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloInicial}>Login</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.textoLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            keyboardType="email-address"
            placeholderTextColor="#555"
            value={email}
            onChangeText={(text) => setEmail(text)} 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.textoLabel}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            placeholderTextColor="#555"
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonEntrar, isValid ? {} : styles.buttonDisabilitado]} 
          onPress={nvgTelaInicial} 
          disabled={!isValid} 
        >
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.textoPossuiConta}>
          <Text style={styles.textoRota}>Não possui uma conta?</Text>
          <TouchableOpacity style={styles.textoCadastro} onPress={nvgCadastro}>Cadastre-se</TouchableOpacity>
        </View>
      </View>
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
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputGroup: {
    width: 350,
    marginBottom: 16,
  },
  textoLabel: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 18,
    marginBottom: 4,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: "#A3D7CE",
    borderWidth: 2,
    borderColor: "#52baa7",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "black",
    fontSize: 16,
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
    marginTop: 10,
  },
  buttonDisabilitado: {
    backgroundColor: "#d3d3d3",
    borderColor: "#a0a0a0", 
  },
  textButton: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 25,
  },
  textoPossuiConta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
  },
  textoRota: {
    fontWeight: 'bold', 
    color: "white",
    fontSize: 15,
  },
  textoCadastro: {
    fontWeight: 'bold',
    color: "#ADD8E6",
    fontSize: 15,
    marginLeft: 5,
  },
});
""