
    <template>
   <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          
        Social Task
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Register your account
              </h1>
              <form class="space-y-4 md:space-y-6" @submit.prevent="" method="post">
                              <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                      <input type="name"  v-model="user.name" name="name" id="name" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com">
                      <div v-if="errors.name"> <span class="text-red-600"> {{errors.name[0]}}</span></div>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email"  v-model="user.email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com">
                      <div v-if="errors.email"> <span class="text-red-600"> {{errors.email[0]}}</span></div>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   v-model="user.password">
                      <div v-if="errors.password"> <span class="text-red-600"> {{errors.password[0]}}</span></div>
                  </div>
                 
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Confirmation</label>
                      <input type="password" name="password_confirmation" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   v-model="user.password_confirmation">
                      <div v-if="errors.password_confirmation"> <span class="text-red-600"> {{errors.password_confirmation[0]}}</span></div>
                  </div>


                 
                 
                  <button type="submit" @click="handleSubmit" class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Have an account?   <RouterLink to="login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Signin</RouterLink>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</template>

<script setup>
import { reactive, ref } from "vue";
import {register} from '../services/auth_service'
import { toast } from 'vue3-toastify';
import { useRouter } from "vue-router";


const router = useRouter();
const user  = reactive({
    name:'',
    email:'',
    password:'',
    password_confirmation:'',
});
const errors = ref({});
const handleSubmit = async()=>{
    try{

const response =    await register(user);
toast.success('User created succeessfully');
user.name='';
user.password='';
user.password_confirmation='';
user.email='';

setTimeout(() => {
router.push('/validateemail')    
}, 1000);



    }
    catch(error){
           errors.value = error.response.data.errors
console.log(error)
    }
}



</script>
