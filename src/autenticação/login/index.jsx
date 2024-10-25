import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { TextInput, Button, HelperText, useTheme, Text, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { auth } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("MainTabs");
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('Usuário não encontrado.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Senha incorreta.');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://cdn.pixabay.com/photo/2015/08/03/14/20/photoshop-873358_1280.png' }}
          style={styles.logoImage}
        />
      </View>
      <Text style={styles.title}>Bem-vindo ao TasksApp</Text>
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        mode='flat'
        error={!!error && !validateEmail(email)}
      />
      <HelperText style={{ color: '#E0776C' }} type="error" visible={!!error && !validateEmail(email)}>
        Email inválido.
      </HelperText>

      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode='flat'
        error={!!error && password.length < 6}
      />
      <HelperText style={{ color: '#E0776C' }} type="error" visible={!!error && password.length < 6}>
        A senha deve ter no mínimo 6 caracteres.
      </HelperText>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        color={colors.primary}
      >
        Entrar
      </Button>

      <View style={{ alignItems: 'center', gap: 30 }}>
        <Divider style={styles.divider} />
        <Pressable onPress={() => navigation.navigate('Cadastro')}>
          <Text style={{ color: '#6388E0', textDecorationLine: 'underline' }}>
            Não tem conta? Faça seu cadastro agora!
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#81E0DD',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#00BFA5',
  },
  input: {
    marginBottom: 7,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  divider: {
    marginTop: 50,
    width: '90%',
  },
});

export default Login;
