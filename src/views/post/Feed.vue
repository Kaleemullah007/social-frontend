<script setup>
import { reactive, ref,onMounted} from "vue";
import { useRouter } from "vue-router";
import { usePostStore } from "@/stores/PostStore";
import { ThumbsUp } from "lucide-vue-next";
import {likepost,dbposts} from "../services/post_service"
import { toast } from 'vue3-toastify';
const postStore = usePostStore();
const router = useRouter();

const allposts = reactive({
    posts:[],
})

onMounted(()=>{
    alldbPosts();
})

const likePost = async (id) =>{
    try {

        const response = await likepost(id);
        toast.success(response.data.message);
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
allposts

</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mb-10">
        



        <table class="max-w-screen-md m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            
            <tbody>

                <tr v-for="post in allposts.posts" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                <div class="max-w-screen-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {{ post.title }}</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> {{ post.body }}</p>
    
        
        <button @click="likePost(post.id)" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-red-800"> <ThumbsUp></ThumbsUp> <div v-if="post.likes_count > 0">({{post.likes_count}})</div></button>
    
</div>

                  
                </tr>
                <tr v-if="allposts.posts.length == 0">
                    <td colspan="1" class="text-center text-3xl">No record found</td>
                </tr>

            </tbody>
        </table>
    </div>
    
    </template>
    
