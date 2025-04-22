export function createComment(){
    fetch('./assets/json/comment.json')
    .then(res => res.json())
    .then(data =>{
        console.log(data);
    })

}