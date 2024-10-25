import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Text, useTheme, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';

export default function SplashScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userId = user.uid;
            const userEmail = user.email;
            await AsyncStorage.setItem('userId', userId);
            await AsyncStorage.setItem('userEmail', userEmail);

            navigation.replace('MainTabs');
          } else {
            navigation.replace('Login');
          }
        });
      } catch (error) {
        setErrorMessage('Falha ao carregar os dados de autenticação.');
        console.error('Erro ao verificar o status de login', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Image
              source={{ uri: 'https://cdn.pixabay.com/photo/2015/08/03/14/20/photoshop-873358_1280.png' }}
              style={styles.logoImage}
            />
          </View>
          <Text style={[styles.appName, { color: colors.primary }]}>TasksApp</Text>
        </View>
        <ActivityIndicator size="large" color={colors.primary} />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <Divider style={styles.divider} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Tasks</Text>
          <Text style={styles.footerText}>Todos os direitos reservados</Text>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#81E0DD',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#00BFA5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 20,
    letterSpacing: 1.2,
  },
  divider: {
    marginTop: 50,
    width: '90%',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    padding: 5,
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});
