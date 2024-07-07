import { defineStore } from "pinia";
export const usePostStore = defineStore('poststore',{
    state : ()=>{

       return  {
        posts:[],
    }},
    actions:{
       
       
        async getPosts() {
            
           
            const { dbposts }  =  await import('../views/services/post_service');
            try {
                const response = await dbposts();
                 this.posts = response.data.data;
               
            } catch (error) {
                throw error;
            }
        },

       


    

    },
   
});