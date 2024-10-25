import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

const PersonalDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userData } = route.params; // Recebe os dados do usuário

    return (
        <LinearGradient
            colors={['#81E0DD', '#FAFAFA']} // Gradiente suave para o fundo
            style={styles.gradient}
        >
            <View style={styles.container}>
                <IconButton
                    icon="arrow-left"
                    size={30}
                    onPress={() => navigation.goBack()}
                    style={styles.backIcon}
                />
                <Text style={styles.header}>Minhas Informações</Text>

                <List.Section>
                    <List.Item
                        titleStyle={{ color: '#555' }}
                        descriptionStyle={{ color: '#777' }}
                        title="Nome"
                        description={userData ? userData.name : 'Nome não disponível'}
                        left={() => <List.Icon icon="account" />}
                    />
                    <List.Item
                        titleStyle={{ color: '#555' }}
                        descriptionStyle={{ color: '#777' }}
                        title="Email"
                        description={userData ? userData.email : 'Email não disponível'}
                        left={() => <List.Icon icon="email" />}
                    />
                </List.Section>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    header: {
        fontSize: 24, // Tamanho do texto do cabeçalho ajustado
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333', // Cor escura para contraste
    },
    backIcon: {
        position: 'absolute',
        top: 20,
        left: 10,
    },
});

export default PersonalDetails;
