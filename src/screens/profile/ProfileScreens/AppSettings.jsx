import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, List, Divider, Text, IconButton } from 'react-native-paper';
import { LinearGradient } from 'react-native-linear-gradient'; // Gradiente de fundo
import { useNavigation } from '@react-navigation/native';

const AppSettings = () => {
  const navigation = useNavigation();
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Estado para tema escuro
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true); // Estado para notificações

  // Função para alternar o tema
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Lógica adicional pode ser implementada para mudar o tema global
  };

  // Função para ativar/desativar notificações
  const toggleNotifications = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
  };

  return (
    <LinearGradient
      colors={['#81E0DD', '#FAFAFA', '#F5F5F5', '#fff']} // Mesmas cores do perfil
      style={styles.container}
    >
      <IconButton 
        icon="arrow-left" 
        size={30} 
        onPress={() => navigation.goBack()} 
        style={styles.backIcon}
        color="#000" // Ícone de volta para combinar com o tema
      />
      
      <Text style={styles.header}>App Settings</Text>

      <List.Section>
        <List.Item
         titleStyle={{color:'#666'}}
          title="Dark Theme"
          description="Enable dark theme for the app"
          left={() => <List.Icon icon="theme-light-dark" color="#000" />}
          right={() => (
            <Switch 
              value={isDarkTheme} 
              onValueChange={toggleTheme} 
              color="#81E0DD" // Cor do switch para combinar
            />
          )}
        />
        <Divider />
        <List.Item
        titleStyle={{color:'#666'}}
          title="Notifications"
          description="Enable notifications"
          left={() => <List.Icon icon="bell" color="#000" />}
          right={() => (
            <Switch 
              value={isNotificationsEnabled} 
              onValueChange={toggleNotifications} 
              color="#81E0DD" // Cor do switch para combinar
            />
          )}
        />
        <Divider />
        <List.Item
        titleStyle={{color:'#666'}}
          title="Privacy Policy"
          description="View privacy policy"
          left={() => <List.Icon icon="shield-lock" color="#000" />}
          onPress={() => navigation.navigate('Privacy')}
        />
        <Divider />
        <List.Item
        titleStyle={{color:'#666'}}
          title="Terms and Conditions"
          description="View terms and conditions"
          left={() => <List.Icon icon="file-document-outline" color="#000" />}
          onPress={() => navigation.navigate('Terms')}
        />
      </List.Section>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
});

export default AppSettings;
