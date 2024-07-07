<script setup>
import {useCommonStore} from '../stores/commonStore';

const store = useCommonStore();
</script>

<template>
  <main>
   
   
   <div class="text-center content-center">
  <h1 class="text-3xl font-bold underline hover:text-green-500 ">
   Socail Task  {{store.is_login }}  
  </h1>
  </div>

  </main>
</template>
