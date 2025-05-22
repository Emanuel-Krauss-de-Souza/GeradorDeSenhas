import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { mensagemToast } from "../components/ToastMensagem";

export default function Cadastro({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isValid, setIsValid] = useState(false); 

  const validarFormulario = (senhaLocal, confirmarSenhaLocal) => {
    if (
      nome.trim() && 
      email.trim() && 
      senhaLocal.trim() && 
      confirmarSenhaLocal.trim() && 
      senhaLocal === confirmarSenhaLocal
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const nvgLogin = () => {
    navigation.navigate("login");
    mensagemToast('success', 'Sucesso', 'Cadastro efetuado com sucesso.');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.tituloInicial}>Cadastre-se</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#555"
            value={nome}
            onChangeText={(text) => {
              setNome(text);
              validarFormulario();
            }}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            placeholderTextColor="#555"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validarFormulario();
            }}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            placeholderTextColor="#555"
            value={senha}
            onChangeText={(text) => {
              setSenha(text);
              validarFormulario(text, confirmarSenha);
            }}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirmar Senha: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            secureTextEntry={true}
            placeholderTextColor="#555"
            value={confirmarSenha}
            onChangeText={(text) => {
              setConfirmarSenha(text);
              validarFormulario(senha, text);
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonEntrar, isValid ? {} : styles.buttonDisabilitado]}
          onPress={nvgLogin}
          disabled={!isValid}
        >
          <Text style={styles.textButton}>Cadastrar</Text>
        </TouchableOpacity>
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
  label: {
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
});
