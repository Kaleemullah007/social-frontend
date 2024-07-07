import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import  Login  from "../views/auth/Login.vue";
import  Register  from "../views/auth/Register.vue";

import  Post  from "../views/post/View.vue";
import  CreatePost  from "../views/post/Create.vue";
import  EditPost  from "../views/post/Edit.vue";
import  Feed  from "../views/post/Feed.vue";

import { toast } from 'vue3-toastify';
import { useAuthStore } from '../stores/authStore';
import EmailVerfication from '../views/auth/email-verfication.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },



    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter(to,from,next){
        const authStore = useAuthStore();
        if(!authStore.isLoggedIn){
          next()
        }else{
          next('/post')
        }
      }
    },


    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter(to,from,next){
        const authStore = useAuthStore();
        if(!authStore.isLoggedIn){
          next()
        }else{
          next('/validateemail')
        }
      }
    },

    {
      path: '/validateemail',
      name: 'validateemail',
      component: EmailVerfication
      
    },


    {
      path: '/post',
      name: 'post',
      component: Post,
      beforeEnter(to,from,next){
        const authStore = useAuthStore();
        
        if(authStore.isLoggedIn){
          next()
        }else{
          next('/login')
        }
      }

    },
    {
      path: '/feed',
      name: 'feed',
      component: Feed,
      beforeEnter(to,from,next){
        const authStore = useAuthStore();
        if(authStore.isLoggedIn){
          next()
        }else{
          
          next('/login')
        }
      }
    },

    
    {
      path: '/create-post',
      name: 'create-post',
      component: CreatePost,
      beforeEnter(to,from,next){
        const authStore = useAuthStore();
        
        if(authStore.isLoggedIn){
          next()
        }else{
          next('/login')
        }
      }
      
    },

    {
      path: '/edit-post/:id',
      name: 'edit-post',
      component: EditPost,
      beforeEnter(to,from,next){
        const authStore = useAuthStore();
        
        if(authStore.isLoggedIn){
          next()
        }else{
          next('/login')
        }
      },props: true
      
    },
   

  ],
 
})

export default router
