<template>
  <view class="container">
      <status-bar background-color="blue" bar-style="light-content"/>
    <view class="form">
      <view class="item-input">
        <text class="text-style">Nombre: </text>
        <text-input class="input-style" v-model="nombre"/>
      </view>

      <view class="item-input">
        <text class="text-style">Apellido: </text>
        <text-input class="input-style" v-model="apellido"/>
      </view>

      <view class="item-input">
        <text class="text-style">Dirección: </text>
        <text-input class="input-style" v-model="direccion"/>
      </view>

      <view class="item-input">
        <text class="text-style">Teléfono: </text>
        <text-input class="input-style" v-model="telefono"/>
      </view>
    </view>
    <view class="center">
      <touchable-opacity class="save-user" :on-press="saveUser">
        <text class="color-white">Guardar</text>
      </touchable-opacity>
    </view>
  </view>
</template>


<style>

.form{
  margin-top: 15;
}
.item-input{
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 20;
  padding-right: 20;
}
.text-style{
  font-size: 16;
}
.input-style{
  height: 40;
  font-size: 20;
  width: 100%;
  margin-top: 5;
  padding: 5;
  border-color: #F5F6F7;
  border-width: 1;
  border-radius: 5;
  background-color: #F5F6F7;
}
.center{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.save-user {
  margin-top: 15;
  width: 100;
  height: 40;
  border-radius: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #065c6f;
  margin-right: 10;
}
.color-white {
  font-size: 17;
  color: #ffffff;
}

</style>


<script>
import * as env from "./../../env.config";
import axios from "axios";
import user from "../../user";

export default {
  props: {
    navigation: {type: Object},
  },
  data: function () {
    return {
      mode:'add',
      nombre:'',
      apellido: '',
      direccion: '',
      telefono: '',
      id: ''
    };
  },
  methods: {
    saveUser() {
      const body = {
        nombre : this.nombre,
        apellido : this.apellido,
        direccion: this.direccion,
        telefono : this.telefono
      }
      if(this.mode !== "edit"){
        axios.post(`${env.API_CALL}/usuario`, body).then((res)=>{
          if(res.status === 201){
            user.dispatch("ADD_USER", res.data)
            this.navigation.navigate("Home");
          }
        })
      }
      else{
       axios.patch(`${env.API_CALL}/usuario/${this.id}`, body).then(res => {
         if(res.status === 200){
           user.dispatch("EDIT_USER", {nombre: this.nombre, apellido : this.apellido, direccion: this.direccion, telefono: this.telefono, id : this.id} )
           this.navigation.navigate("Home")
         }
        })
      }
    },
  },
  mounted : function(){
    const details = this.navigation.getParam("datos");
    if (details){
      this.nombre = details.nombre;
      this.apellido = details.apellido;
      this.direccion = details.direccion;
      this.telefono = details.telefono;
      this.mode = "edit";
      this.id = details.id;
    }
  }
};
</script>
