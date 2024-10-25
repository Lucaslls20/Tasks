import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const Privacy = () => {
  return (
    <LinearGradient
      colors={['#81E0DD', '#FAFAFA', '#F5F5F5', '#ffffff']} // Mesmas cores de fundo para consistência
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Título da Página */}
        <Text style={styles.title}>Política de Privacidade</Text>
        
        <Text style={styles.paragraph}>
          A nossa empresa valoriza a privacidade dos seus usuários. Esta Política de Privacidade descreve como coletamos, utilizamos, divulgamos e protegemos as informações pessoais que você nos fornece ao utilizar o nosso aplicativo TasksApp.
        </Text>

        {/* Divisor visual */}
        <Divider style={styles.divider} />

        <Text style={styles.subheading}>Ao se cadastrar no nosso aplicativo, solicitamos os seguintes dados:</Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Email:</Text> Utilizado para a criação da sua conta e para enviar notificações importantes.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Senha:</Text> Utilizada para proteger a sua conta e garantir a sua segurança.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Nome:</Text> Utilizado para personalizar a sua experiência no aplicativo.
        </Text>

        <Divider style={styles.divider} />

        <Text style={styles.subheading}>Os dados que coletamos são utilizados para:</Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Criar e manter sua conta:</Text> Utilizamos seus dados para criar e gerenciar sua conta no aplicativo.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Fornecer os serviços do aplicativo:</Text> Seus dados são utilizados para fornecer os serviços do aplicativo, como permitir que você acesse suas informações e utilize os recursos disponíveis.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Melhorar nossos serviços:</Text> Analisamos dados agregados e anônimos para entender como os usuários utilizam o aplicativo e para melhorar nossos serviços.
        </Text>

        <Divider style={styles.divider} />

        <Text style={styles.subheading}>Segurança de dados:</Text>
        <Text style={styles.paragraph}>
          Utilizamos medidas de segurança técnicas e administrativas para proteger seus dados contra acesso não autorizado, divulgação, alteração ou destruição. No entanto, nenhum método de transmissão de dados pela internet ou armazenamento de dados é completamente seguro.
        </Text>

        <Divider style={styles.divider} />

        <Text style={styles.subheading}>Compartilhamento de dados:</Text>

        <Text style={styles.paragraph}>
          Não compartilhamos seus dados pessoais com terceiros, exceto nos seguintes casos:
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Com o seu consentimento:</Text> Podemos compartilhar seus dados com terceiros se você nos autorizar explicitamente.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Para cumprir a lei:</Text> Podemos compartilhar seus dados se for exigido por lei ou em resposta a um processo legal.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Para proteger nossos direitos:</Text> Podemos compartilhar seus dados para proteger nossos direitos, propriedade ou segurança, ou a de nossos usuários.
        </Text>

        <Divider style={styles.divider} />

        <Text style={styles.subheading}>Atualizações desta Política:</Text>
        <Text style={styles.paragraph}>
          Podemos atualizar esta Política de Privacidade periodicamente. As alterações serão publicadas nesta página e a data da última atualização será indicada.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333', // Subtítulos mais escuros para melhor contraste
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
    color: '#666', // Texto em tom neutro
  },
  bold: {
    fontWeight: 'bold',
    color: '#444', // Negrito para destaque
  },
  divider: {
    marginVertical: 15,
    backgroundColor: '#81E0DD', // Divider com cor suave para consistência visual
  },
});

export default Privacy;
  