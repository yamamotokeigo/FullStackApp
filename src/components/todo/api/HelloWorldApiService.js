import axios from "axios"

export function retrieveHelloWorldBean(){
    return axios({
        url: 'http://localhost:8080/hello-world-bean',
        method: 'GET', // or 'POST' if it's a POST request
        headers: {
            'Origin': 'http://localhost:3000'
        },
        withCredentials: true
    })
}