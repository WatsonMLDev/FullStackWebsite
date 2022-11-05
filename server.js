const http = require('http');
const fs = require('fs');



function logToFile(res, data) {
    fs.appendFile("logs.txt", data + "\n", (error) => {
        if (error) {
            res.statusCode = 500;
            console.log(error);
            res.write(`Server error when logging to file: ${error}`);
            res.end();
            return;
        }
        console.log(`Appended "${data}" to file`)
        res.write(`Logged: ${data}`);
        res.end();
    })
}

function getErrorOrWarningOrAll(res, selection){
    fs.readFile("logs.txt", (error, data) => {
        if (error) {
            res.statusCode = 500;
            if (error.code === "ENOENT"){
                console.log(`File not found: ${error}`);
                res.write(`File not found`);
                res.end();
                return;
            }
            console.log(`Server error when reading file: ${error}`);
            res.write("Server error when reading file");
            res.end();
            return;
        }
        let fileData = data.toString().split("\n");

        if (0 === selection){
            fileData.forEach((line) => {
                if (line.includes("Error")) res.write(line + "\n");
            })
            res.end();
            console.log("Sent errors");
            return;
        }
        else if (1 === selection){
            fileData.forEach((line) => {
                if (line.includes("Warning")) res.write(line + "\n");
            })
            res.end();
            console.log("Sent warnings");
            return;
        }
        res.write(data);
        res.end();
        console.log("Sent all errors and warnings");
    });
}


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

        const {method, url} = req;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            if(url === '/log_error' && method === 'POST') {
                logToFile(res, "Error occurred at: " + Date());
            }
            else if (url === '/log_warning' && method === 'POST') {
                logToFile(res, "Warning occurred at: " + Date());
            }
            else if(url === '/errors' && method === 'GET') {
                getErrorOrWarningOrAll(res, 0);
            }
            else if(url === '/warnings' && method === 'GET') {
                getErrorOrWarningOrAll(res, 1);
            }
            else if(url === '/all' && method === 'GET') {
                getErrorOrWarningOrAll(res,2);
            }
            else {
                res.statusCode = 404;
                res.write("Resource not available");
                res.end();
                console.log("Invalid request received");
            }

        }
        catch (e) {
            res.statusCode = 500;
            res.write("Error occurred");
            res.end();
            console.log(`Error occurred: ${e}`);
        }

    }
)

server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    }
);
