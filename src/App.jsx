import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "./autenticação/splachScreen";
import Login from "./autenticação/login";
import Cadastro from "./autenticação/registro";
import Home from "./screens/home";
import Conclued from "./screens/conclued";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Usando uma biblioteca compatível com ícones
import Profile from "./screens/profile";
import PersonalDetails from "./screens/profile/ProfileScreens/personalDetais";
import Privacy from "./screens/profile/ProfileScreens/privacyScreen";
import AppSettings from "./screens/profile/ProfileScreens/AppSettings";
import TermsAndConditions from "./screens/profile/ProfileScreens/termsAndConditions";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Função para criar as abas de navegação (Home e Concluido)
const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerShown: false, // Esconde o header
        }}
      />
      <Tab.Screen
        name="Concluido"
        component={Conclued}
        options={{
          tabBarLabel: 'Concluido',
          tabBarIcon: ({ color, size }) => (
            <Icon name="check-circle" color={color} size={size} />
          ),
          headerShown: false, // Esconde o header
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon name='account' color={color} size={size} />
          ),
          headerShown: false, // Esconde o header
        }}
      />
    </Tab.Navigator>
  );
};


// Stack Navigator para telas de autenticação
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{ headerShown: false }}
      />
      {/* Navegar para HomeTabs depois da autenticação */}
      <Stack.Screen
        name="MainTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name="PersonalDetails"
      component={PersonalDetails}
      options={{headerShown:false}}
      />
      <Stack.Screen
      name="Privacy"
      component={Privacy}
      options={{headerShown:false}}
      />
      <Stack.Screen
      name="AppSettings"
      component={AppSettings}
      options={{headerShown:false}}
      />
      <Stack.Screen
      name="Terms"
      component={TermsAndConditions}
      options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
};

// Componente principal do aplicativo
const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
