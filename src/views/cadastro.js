import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { mensagemToast } from "../components/ToastMensagem";
import { signup } from "../service/auth/authService";

export default function Cadastro({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [senhasIguais, setSenhasIguais] = useState(true);

  useEffect(() => {
    const camposPreenchidos = nome.trim() && email.trim() && senha.trim() && confirmarSenha.trim();
    const senhasConferem = senha === confirmarSenha;

    setSenhasIguais(senhasConferem);
    setIsValid(camposPreenchidos && senhasConferem);
  }, [nome, email, senha, confirmarSenha]);

  const cadastrarUsuario = async () => {
    console.log("Senha:", senha, "Confirmar Senha:", confirmarSenha)
    if (!isValid || isLoading) return;

    setIsLoading(true);
    try {
      await signup(nome, email, senha, confirmarSenha);
      mensagemToast('success', 'Sucesso', 'Cadastro realizado com sucesso!');
      setTimeout(() => {
        navigation.navigate("login");
      }, 500);
    } catch (error) {
      mensagemToast('error', 'Erro no Cadastro', error?.message || "Ocorreu um erro ao cadastrar");
    } finally {
      setIsLoading(false);
    }
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
            onChangeText={setNome}
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
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            placeholderTextColor="#555"
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirmar Senha: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            secureTextEntry
            placeholderTextColor="#555"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
          {!senhasIguais && (
            <Text style={styles.errorText}>As senhas não coincidem</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.buttonEntrar, !isValid && styles.buttonDisabilitado]}
          onPress={cadastrarUsuario}
          disabled={!isValid || isLoading}
        >
          <Text style={styles.textButton}>
            {isLoading ? "Aguarde..." : "Cadastrar"}
          </Text>
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
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
});
