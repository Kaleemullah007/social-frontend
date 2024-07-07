import { http } from "./http_service";
export function dbposts(){
    return  http().get('/posts');
}

export function editpost(id){
   
    return  http().get('/posts/'+id);
}

export function createpost(data){
    return  http().post('/posts',data);
}

export function updatepost(data,id){
    return  http().put('/posts/'+id,data);
}
export function deletepost(id){
    return  http().delete('/posts/'+id);
}

export function likepost(id){
    return  http().post('/posts/like',{"post_id":id});
}

export function searchposts(title){
    return  http().get('/posts/search?search='+title);
}




