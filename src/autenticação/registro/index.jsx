import React, { useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button, HelperText, useTheme, Text, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Cadastro = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSignup = async () => {
    if (!name) {
      setError('Nome é obrigatório.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setError('');

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', user.uid), { name, email });

      navigation.navigate("MainTabs");
    } catch (error) {
      setError('Erro ao fazer cadastro. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://cdn.pixabay.com/photo/2015/08/03/14/20/photoshop-873358_1280.png' }}
              style={styles.logoImage}
            />
          </View>
          <Text style={styles.title}>Crie sua conta no TasksApp</Text>
          
          <TextInput
            label="Nome"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="flat"
            error={!!error && !name}
          />
          <HelperText style={{ color: '#E0776C' }} type="error" visible={!!error && !name}>
            Nome é obrigatório.
          </HelperText>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            mode="flat"
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
            mode="flat"
            error={!!error && password.length < 6}
          />
          <HelperText style={{ color: '#E0776C' }} type="error" visible={!!error && password.length < 6}>
            A senha deve ter no mínimo 6 caracteres.
          </HelperText>

          <TextInput
            label="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
            mode="flat"
            error={!!error && password !== confirmPassword}
          />
          <HelperText style={{ color: '#E0776C' }} type="error" visible={!!error && password !== confirmPassword}>
            As senhas não coincidem.
          </HelperText>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={handleSignup}
            style={styles.button}
            color={colors.primary}
          >
            Cadastrar
          </Button>

          <View style={{ alignItems: 'center', gap: 30 }}>
            <Divider style={styles.divider} />
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: '#6388E0', textDecorationLine: 'underline' }}>
                Já tem uma conta? Faça login aqui.
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#81E0DD',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
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

export default Cadastro;
