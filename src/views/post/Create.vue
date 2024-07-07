<template>
    <div class="bg-gray-50 dark:bg-gray-900">
        Create post
     <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Social Task
                
            </a>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create post
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="">
                        <div>
                            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                title</label>
                            <input type="title" v-model="post.title" name="title" id="title"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Title" required="">
                            <div v-if="errors.title"> <span class="text-red-600"> {{ errors.title[0] }}</span></div>
                        </div>
                        <div>
                            <label for="body"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">body</label>
                            <textarea type="body" v-model="post.body" name="body" id="body"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""> </textarea>
                            <div v-if="errors.body"> <span class="text-red-600"> {{ errors.body[0] }}</span></div>
                        </div>
                        <div v-if="errors.message"> <span class="text-red-600"> {{ errors.message }}</span></div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" v-model="post.is_public" aria-describedby="remember" type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 dark:text-gray-300">is Public</label>
                                </div>
                            </div>
                            <!-- <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> -->
                        </div>
                        <button type="submit" @click="handlePost"
                            class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create Post</button>
                            <!-- <router-link :to="posts" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Cancel </router-link> -->
                          
                    </form>
                </div>
            </div>
        </div>
    
    </div>
</template>

  <script setup>
import { reactive, ref,onMounted} from "vue";
import { createpost } from '../services/post_service'
import { toast } from 'vue3-toastify';
import { useRouter } from "vue-router";
import { usePostStore } from "@/stores/postStore";



  const postStore = usePostStore();

const router = useRouter();
const post = reactive({
    title: '',
    body: '',
    is_public:false,
});


const errors = ref({});
const handlePost = async () => {
    try {

        const response = await createpost(post);
        toast.success('post created succeessfully');

        setTimeout(() => {
            router.push('/post')
        });



    }
    catch (error) {
        errors.value = error.response.data.errors
        
        toast.error(error.response.data.message);
       
    }
}

</script>