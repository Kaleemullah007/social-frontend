import { defineStore } from "pinia";
import {logOut} from '../views/services/auth_service'
export const useAuthStore = defineStore('authstore',{
    state : ()=>{

       return  {
        user:{},
        isLoggedIn: false,
    }},
    actions:{
        setUser(user){
            this.user = user;
            this.isLoggedIn = true;
        },
        setToken(token){
            localStorage.setItem('access_token',token);
        },
        getToken(){
            let token = localStorage.getItem('access_token');
            if(token){
                return token;
            }
            return null;
        },

        getUser(){
            return this.user
        },
        
        async logout() {
            try {
                await logOut();
                this.user = {};
                this.isLoggedIn = false;
                localStorage.setItem('access_token', '');
            } catch (error) {
                throw error;
            }
        }

    },
    persist: {
        enabled: true
    }
});