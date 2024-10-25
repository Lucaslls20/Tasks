import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { List, Avatar, Text, IconButton, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { LinearGradient } from 'react-native-linear-gradient'; // Gradiente de fundo
import { signOut } from 'firebase/auth'; // Função para logout do Firebase

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null); // Estado para armazenar dados do usuário
  const [loading, setLoading] = useState(true); // Estado para o carregamento

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data()); // Salva os dados no estado
        }
      }
      setLoading(false); // Para o carregamento após buscar os dados
    };

    fetchUserData(); // Buscar dados ao montar o componente
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            await signOut(auth); // Desconectar o usuário
            navigation.navigate('Login'); // Redirecionar para a tela de login
          }
        }
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#81E0DD', '#FAFAFA', '#F5F5F5', '#fff']} // Cores de gradiente combinando com o app
      style={styles.container}
    >
      <IconButton
        icon="arrow-left"
        size={30}
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
        color="#000" // Ícone de volta para combinar com o tema
      />

      {/* Exibe o carregamento enquanto busca os dados */}
      {loading ? (
        <ActivityIndicator animating={true} size="large" color="#81E0DD" style={styles.loading} />
      ) : (
        <>
          <Avatar.Image
            size={120}
            source={{ uri: 'https://thumbs.dreamstime.com/b/%C3%ADcone-do-s%C3%B3lido-preto-avatar-perfil-de-usu%C3%A1rio-121102166.jpg' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{userData ? userData.name : 'Nome do usuário'}</Text>
          <Text style={styles.email}>{userData ? userData.email : 'Email'}</Text>

          <List.Section>
            <List.Item
              title="Personal Details"
              titleStyle={styles.listItemText}
              left={() => <List.Icon icon="account" color="#000" />}
              onPress={() => navigation.navigate('PersonalDetails', { userData })}
            />
            <List.Item
              title="Privacy Policy"
              titleStyle={styles.listItemText}
              left={() => <List.Icon icon="shield-lock" color="#000" />}
              onPress={() => navigation.navigate('Privacy')}
            />

            <List.Item
              title="App Settings"
              titleStyle={styles.listItemText}
              left={() => <List.Icon icon="cog" color="#000" />}
              onPress={() => navigation.navigate('AppSettings')}
            />

            <List.Item
              title="Notifications"
              titleStyle={styles.listItemText}
              left={() => <List.Icon icon="bell" color="#000" />}
              onPress={() => navigation.navigate('Notifications')}
            />

            <List.Item
              title="Log Out"
              titleStyle={styles.listItemText}
              left={() => <List.Icon icon="logout" color="#000" />}
              onPress={handleLogout}
            />
          </List.Section>
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  name: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333', // Cor para combinar com o tema claro
  },
  email: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666', // Cor para o email
    marginBottom: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  listItemText: {
    color: '#333', // Cor dos textos da lista
  },
});

export default Profile;
