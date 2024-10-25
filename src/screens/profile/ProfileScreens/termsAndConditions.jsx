import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, IconButton, Divider, Title } from 'react-native-paper';
import { LinearGradient } from 'react-native-linear-gradient'; // Gradiente de fundo
import { useNavigation } from '@react-navigation/native';

const TermsAndConditions = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#81E0DD', '#FAFAFA', '#F5F5F5', '#fff']} // Mesmas cores do app
      style={styles.container}
    >
      {/* Ícone de volta */}
      <IconButton 
        icon="arrow-left" 
        size={30} 
        onPress={() => navigation.goBack()} 
        style={styles.backIcon}
        color="#000" 
      />
      
      {/* Título */}
      <Title style={styles.title}>Terms and Conditions</Title>
      
      {/* Conteúdo dos Termos */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>
          Welcome to the Tasks app! These terms and conditions outline the rules and regulations for the use of our application.
        </Text>

        <Divider style={styles.divider} />

        <Text style={styles.subTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By accessing and using the Tasks app, you accept and agree to be bound by these terms. If you do not agree, please do not use the app.
        </Text>

        <Divider style={styles.divider} />

        <Text style={styles.subTitle}>2. Use of the App</Text>
        <Text style={styles.text}>
          The Tasks app is provided for personal and non-commercial use only. You agree not to misuse the app for any illegal or unauthorized purposes.
        </Text>

        <Divider style={styles.divider} />

        <Text style={styles.subTitle}>3. Account Security</Text>
        <Text style={styles.text}>
          You are responsible for maintaining the confidentiality of your account and password. We are not liable for any loss or damage from your failure to protect your account.
        </Text>

        <Divider style={styles.divider} />

        <Text style={styles.subTitle}>4. Termination</Text>
        <Text style={styles.text}>
          We reserve the right to terminate your account and access to the app without notice if we determine that you have violated these terms.
        </Text>

        <Divider style={styles.divider} />

        <Text style={styles.subTitle}>5. Changes to the Terms</Text>
        <Text style={styles.text}>
          We may update these terms from time to time. We will notify you of any changes by posting the updated terms on the app.
        </Text>

        <Divider style={styles.divider} />

        <Text style={styles.subTitle}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about these Terms and Conditions, please contact us at lucasreserva571@gmail.com.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333', // Título com cor escura para contraste
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    paddingBottom: 40,
  },
  text: {
    fontSize: 16,
    color: '#666', // Texto em cor neutra
    marginBottom: 15,
    lineHeight: 22,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Subtítulo com destaque
    marginBottom: 10,
  },
  divider: {
    marginVertical: 15,
    backgroundColor: '#81E0DD', // Cor do divisor para combinar com o tema
  },
});

export default TermsAndConditions;
