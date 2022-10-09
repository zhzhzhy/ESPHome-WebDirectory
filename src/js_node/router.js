/*
router to handle http request for reading server file
*/



export default function handle_route(url){
    let if_return = false;

    //default route to root
    if (url === "/") {
        url = "/index.html";
    }

    const list = url.split('/');

    if (list[1] ===  'index.html') {
        if_return = true; 
    }
   
    if(list[1] === 'src' && list[2] === 'asset'){
        if_return = true;
    }

    // determine return the file relative path or not
    if(if_return == true){
    const route =  url.slice(1);
    return `${route}`
    } else {
        return null
    }
}