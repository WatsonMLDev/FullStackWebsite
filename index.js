const server = "http://127.0.0.1:3000";

function serverCall(){
    let selection = document.querySelector("#select").selectedIndex;
    let div = document.querySelector('#result');
    let request = new XMLHttpRequest();
    div.innerHTML = "";

    if (selection === 1){
        request.open("POST", server + "/log_error", true);
        request.send();
        request.onload = function(){
            if (request.status < 200 && request.status >= 400) {
                let newP = document.createElement("p");
                newP.appendChild(document.createTextNode(this.response));
                div.appendChild(newP);
                console.log(`Error ${request.status}: ${request.statusText}`);
                return;
            }
            let newP = document.createElement("p");
            newP.appendChild(document.createTextNode(this.response + " Error"));
            div.appendChild(newP);
        }
    }
    else if (selection === 2){
        request.open("POST", server + "/log_warning", true);
        request.send();
        request.onload = function(){
            if (request.status < 200 && request.status >= 400) {
                let newP = document.createElement("p");
                newP.appendChild(document.createTextNode(this.response));
                div.appendChild(newP);
                console.log(`Error ${request.status}: ${request.statusText}`);
                return;
            }

            let newP = document.createElement("p");
            newP.appendChild(document.createTextNode(this.response + " Warning"));
            div.appendChild(newP);
        }
    }
    else if (selection === 3){
        request.open("GET", server + "/errors", true);
        request.send();
        request.onload = function(){
            if (request.status < 200 && request.status >= 400) {
                let newP = document.createElement("p");
                newP.appendChild(document.createTextNode(this.response));
                div.appendChild(newP);
                console.log(`Error ${request.status}: ${request.statusText}`);
                return;
            }

            let responses = this.response.split("\n");
            responses.forEach((response) => {
                let newP = document.createElement("p");
                newP.appendChild(document.createTextNode(response));
                div.appendChild(newP);
            })
        }
    }
    else if (selection === 4){
        request.open("GET", server + "/warnings", true);
        request.send();
        request.onload = function(){
            if (request.status < 200 && request.status >= 400) {
                let newP = document.createElement("p");
                newP.appendChild(document.createTextNode(this.response));
                div.appendChild(newP);
                console.log(`Error ${request.status}: ${request.statusText}`);
                return;
            }

            let responses = this.response.split("\n");
            responses.forEach((response) => {
                let newP = document.createElement("p");
                newP.appendChild(document.createTextNode(response));
                div.appendChild(newP);
            })
        }
    }
    else if (selection === 5){
        request.open("GET", server + "/all", true);
        request.send();
        request.onload = function(){
            if (request.status < 200 && request.status >= 400) {
                let newP = document.createElement("p");
                newP.appendChild(document.createTextNode(this.response));
                div.appendChild(newP);
                console.log(`Error ${request.status}: ${request.statusText}`);
                return;
            }

            let responses = this.response.split("\n");
            responses.forEach((response) => {
                let newP = document.createElement("p");
                newP.appendChild(document.createTextNode(response));
                div.appendChild(newP);
            })
        }
    }
    else {
        request.open("POST", server + "/test_resource_error", true);
        request.send();
        request.onload = function(){
            let newP = document.createElement("p");
            newP.appendChild(document.createTextNode(this.response));
            div.appendChild(newP);
        }
    }
}