<script setup>
import { reactive, ref,onMounted} from "vue";
import { useRouter } from "vue-router";
import { usePostStore } from "@/stores/PostStore";
import { Settings } from "lucide-vue-next";
import {deletepost,dbposts,searchposts} from "../services/post_service"
import { toast } from 'vue3-toastify';
const postStore = usePostStore();
const router = useRouter();

const allposts = reactive({
    posts:[]
})

const user = reactive({
    search:'',
})


onMounted(()=>{
    alldbPosts();
})

const deletePost = async (id) =>{
    try {

        const response = await deletepost(id);
        toast.success('post deleted succeessfully');
        alldbPosts();

      
        
    }
    catch (error) {
        console.log(error)
       
    }
}
const alldbPosts = async () =>{
    try {

        const response = await dbposts();
        allposts.posts = response.data.data

    
        
    }
    catch (error) {
        
        console.log(error)
        
       
    }
}
const searchdbPosts = async () =>{
    try {

        const response = await searchposts(user.search);
        allposts.posts = response.data.data
       
    
        
    }
    catch (error) {
        
        console.log(error)
        
       
    }
}

</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  
    <div class="row">
        <input type="text" v-model="user.search" name="search" id="search" >
        <button @click="searchdbPosts()" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"> Search </button>
    </div>

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                       Title 
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Body
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Post type  
                    </th>
                    <th scope="col" class="px-6 py-3">
                     Action 
                    </th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="post in allposts.posts" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ post.title }}
                    </th>
                    <td class="px-6 py-4">
                        {{ post.body }}
                    </td>
                    <td class="px-6 py-4" v-if="post.is_public==true">
                        Public
                    </td>
                    <td class="px-6 py-4" v-if="post.is_public == false">
                        Private
                    </td>
                    <td class="px-6 py-4">
                       
                        <router-link :to="{ name: 'edit-post', params: { id: post.id }}" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Edit </router-link>
                        <button @click="deletePost(post.id)" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"> Delete </button>
                    </td>
                </tr>
                <tr v-if="allposts.posts.length == 0">
                    <td colspan="5" class="text-center text-3xl">No record found</td>
                </tr>

            </tbody>
        </table>
    </div>
    
    </template>
    
