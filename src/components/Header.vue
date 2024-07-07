<template>

    <div
		class="sticky top-0 z-10 bg-gray-200 flex justify-between h-16 w-full border-b-2 shadow-sm py-2 px-4 border-gray-300"
	>
		<router-link to="/post"><img class="w-12 h-12" src="../assets/logo.svg" alt="" /></router-link>
		<div class="mt-3 flex gap-4">
			
			
      <RouterLink to="Login" v-if="authStore.isLoggedIn ==false">Login</RouterLink>
      <RouterLink to="Register" v-if="authStore.isLoggedIn ==false">Register</RouterLink>
      <RouterLink to="create-post"  v-if="authStore.isLoggedIn">Create Post</RouterLink>
	  
	  <RouterLink to="feed"  v-if="authStore.isLoggedIn">Feed</RouterLink>
      
      <RouterLink to="post"  v-if="authStore.isLoggedIn" >Posts</RouterLink>
      <button @click="logout"  v-if="authStore.isLoggedIn"><LogOut /></button>


		</div>
	</div>
</template>

<script setup>
import { RouterLink, RouterView , useRouter} from 'vue-router'
import {Settings, LogOut, Router} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/AuthStore'
const authStore  = useAuthStore();
const router  = useRouter();
const logout = async () => {
	try {
		await authStore.logout();
		router.push("/login");
	} catch (error) {
		console.log(error);
	}
    
}
</script>