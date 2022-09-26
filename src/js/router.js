export default function handle_route(url){
    if (url === "/") {
        url = "/index.html"
    }
    const route =  url.slice(1);
    return `${route}`
}