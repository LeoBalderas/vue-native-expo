<template>
  <app-navigator></app-navigator>
</template>

<script>
import { createAppContainer, createStackNavigator } from "vue-native-router";
import HomeScreen from "./screens/HomeScreen.vue";
import UserScreen from "./screens/user/UserScreen.vue";

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Gestor de Usuarios",
        headerStyle: {
          backgroundColor: "#03506f",
          height: 45,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          textAlign:"center", 
          flex: 1,
        },
      },
    },

    ActionsUser: {
      screen: UserScreen,
      navigationOptions: {
        title: "Usuario - Detalle",
        headerStyle: {
          backgroundColor: "#03506f",
          height: 45,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
      },
    },
  },
  {
    initialRouteName: "Home",
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
};
</script>
