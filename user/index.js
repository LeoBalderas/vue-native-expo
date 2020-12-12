import Vue from "vue-native-core";
import Vuex from "vuex";

Vue.use(Vuex);

const user = new Vuex.Store({
   actions:{
      SET_USERS: (context, data) => {
          context.commit("SET_USER_LIST", data);
      },
      ADD_USER:(context, data)=>{
          context.commit("ADD_USER_LIST", data);
      },
       EDIT_USER:(context, data)=>{
          for (const user in context.state.UserList) {
               if (data.id === parseInt(context.state.UserList[user].id)) {
                   context.commit("EDIT_USER_LIST", {id: user, nombre: data.nombre, apellido: data.apellido, direccion: data.direccion, telefono: data.telefono})
                   return;
               }
           }
       },
       DELETE_USER:(context, userId)=>{
           for (const user in context.state.UserList) {
               if (userId === parseInt(context.state.UserList[user].id)) {
                   context.commit("DELETE_USER_LIST", userId)
                   return ;
               }
           }
       },
   },
   mutations:{
       SET_USER_LIST : (state, post) =>{
           state.UserList = post;
       },
       ADD_USER_LIST : (state, user)=>{
           state.UserList.push(user);
       },
       EDIT_USER_LIST : (state, user)=>{
           state.UserList[user.id].nombre = user.nombre;
           state.UserList[user.id].apellido = user.apellido;
           state.UserList[user.id].direccion = user.direccion;
           state.UserList[user.id].telefono = user.telefono;
       },
       DELETE_USER_LIST : (state, userId)=>{
           state.UserList = state.UserList.filter(
               user => user.id !== userId
           );
       },
   },
   state:{
       UserList : [],
   },
});
export default user;