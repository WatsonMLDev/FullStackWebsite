const http = require('http');
const fs = require('fs');



function logToFile(res, data) {
    fs.appendFile("logs.txt", data + "\n", (error) => {
        if (error) {
            res.statusCode = 500;
            res.write("Server error when logging to file");
            res.end();
            return;
        }
        console.log("Appended to file")
        res.write("Logged");
        res.end();
    })
}

function getErrorOrWarningOrAll(res, selection){
    fs.readFile("logs.txt", (error, data) => {
        if (error) {
            res.statusCode = 500;
            if (error.code === "ENOENT"){
                res.write(`File not found`);
                res.end();
                return;
            }
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
            return;
        }
        else if (1 === selection){
            fileData.forEach((line) => {
                if (line.includes("Warning")) res.write(line + "\n");
            })
            res.end();
            return;
        }
        res.write(data);
        res.end();
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
            }

        }
        catch (e) {
            res.statusCode = 500;
            res.write("Error occurred");
            res.end();
        }

    }
)

server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    }
);
