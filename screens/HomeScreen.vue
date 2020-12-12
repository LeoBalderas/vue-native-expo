<template>
  <view class="container">
    <status-bar
        background-color="blue"
        bar-style="light-content"
    />
    <scroll-view :style="{width: '95%'}">
        <view v-for="(item, index) in returnListUsers" :key="index" class="usuarios">
            <touchable-opacity class="flex-container" :on-press="()=> changeRoute(item)">
              <text class="espacio">No. {{index+1}}</text>
							<text class="espacio">{{item.nombre}}</text>
              <text class="espacio">{{item.apellido}}</text>
              <text class="espacio">{{item.direccion}}</text>
							<text class="espacio">{{item.telefono}}</text>
						</touchable-opacity>
        </view>
    </scroll-view>
    <view class="absolute">
      <touchable-opacity class="add-user" :on-press="actionRoute">
        <text class="color-white">Agregar</text>
      </touchable-opacity>
      <touchable-opacity class="edit-user" :style="{backgroundColor: actionSelected.edit? '#ab794f': '#ff9642'}"
          :on-press="editSelected"
      >
        <text class="color-white">Editar</text>
      </touchable-opacity>
      <touchable-opacity  class="delete-user" :style="{backgroundColor: actionSelected.delete ? '#6b262d' : '#931a25'}"
          :on-press="openModalDelete"
      >
        <text class="color-white">Eliminar</text>
      </touchable-opacity>
    </view>
  </view>
</template>

<style>
.container {
  align-items: center;
  justify-content: center;
  flex: 1;
}
.usuarios{
	padding: 9;
	width: 100%;
	border-bottom-width: 1;
	border-color: rgb(221, 221, 221);
}
.espacio{
	padding-bottom: 5;
}
.absolute{
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 40;
  right: 8%;
}
.add-user{
  width: 80;
  height: 40;
  border-radius: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1CA409;
  margin-right: 10;
  margin-bottom: 10;
}
.edit-user{
  width: 80;
  height: 40;
  border-radius: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10;
  margin-bottom: 10;
}
.delete-user{
  width: 80;
  height: 40;
  border-radius: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.color-white{
  color: white;
}
</style>

<script>
import * as env from './../env.config';
import axios from "axios";
import user from "../user";
import { Alert } from 'react-native';

export default {
	data: function(){
		return{
			listaUsuarios : user.state.UserList,
      itemSelected : [],
      actionSelected:{
			  edit: false,
        delete: false
      }
		}
	}, 
  props: {
    navigation: { type: Object }
  },
  computed:{
	  returnListUsers (){
	    return this.listaUsuarios = user.state.UserList;
    }
  },
  methods: {
    changeRoute(item) {
      this.itemSelected = item;
      if  (this.actionSelected.edit){
        this.navigation.navigate('ActionsUser',{
          datos: item
        });
      }
	    else if (this.actionSelected.delete){
        Alert.alert(
            'Hey!',
            '¿Estás seguro de eliminar el usuario?',
            [
              {text: 'Si', onPress: () =>
                this.deleteSelected()
              },
              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
            ],
            { cancelable: false }
        );
      }
	    else{
        this.navigation.navigate('Details',{
          datos: item
        });
      }
    },
    actionRoute(){
      this.navigation.navigate('ActionsUser');
    },
    editSelected(){
	    if(this.actionSelected.delete){
	      this.actionSelected.delete = false;
      }
	    this.actionSelected.edit = !this.actionSelected.edit;
    },
    openModalDelete(){
	    if (this.actionSelected.edit){
	      this.actionSelected.edit = false;
      }
      this.actionSelected.delete = !this.actionSelected.delete;
    },
    deleteSelected(){
	    axios.delete(`${env.API_CALL}/usuario/${this.itemSelected.id}`).then(res=>{
	      if(res.status === 200){
          user.dispatch("DELETE_USER", this.itemSelected.id)
        }
      })
    }
  },
  mounted: function(){
		axios.get( `${env.API_CALL}/usuario`).then(res=>{
			user.dispatch('SET_USERS', res.data);
		})
  }
}
</script>
