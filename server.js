const http = require('http');
const fs = require('fs');
let files = ["errorFile.txt", "warningFile.txt"];


function logErrorToFile(res, data) {
    fs.appendFile(files[0], data + "\n", (error) => {
        if (error) {
            res.statusCode = 500;
            res.write("Server error when logging to file");
            res.end();
            return;
        }
        console.log("Appended error to file")
        res.write("Error logged");
        res.end();
    })


}

function logWarningToFile(res, data) {
    fs.appendFile(files[1], data + "\n", (error) => {
        if (error) {
            res.statusCode = 500;
            res.write("Server error when logging to file");
            res.end();
            return;
        }
        console.log("Appended warning to file")
        res.write("Warning logged");
        res.end();
    })
}

function getErrorOrWarning(res, selection){
    let file = files[selection];
    fs.readFile(file, (error, data) => {
        if (error) {
            res.statusCode = 500;
            if (error.code === "ENOENT"){
                res.write(`No ${file} file found`);
                res.end();
                return;
            }
            res.write("Server error when reading file");
            res.end();
            return;
        }
        res.write(data);
        res.end();
    });
}

function getAll(res){
    files.forEach((file) => {
        console.log(file);
        fs.readFile(file, (error, data) => {
            if (error) {
                res.statusCode = 500;
                if (error.code === "ENOENT"){
                    res.write(`No ${file} file found`);
                    res.end();
                    return;
                }
                res.write("Server error when reading files");
                res.end();
                return;
            }
            console.log(data);
            res.write(data);

        });
    })
}


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

        const {method, url} = req;
        res.setHeader('Content-Type', 'text/plain');
        try{
            if(url === '/log_error' && method === 'GET') {
                logErrorToFile(res, "Error occurred at: " + Date());
            }
            else if (url === '/log_warning' && method === 'GET') {
                logWarningToFile(res, "Warning occurred at: " + Date());
            }
            else if(url === '/errors' && method === 'GET') {
                getErrorOrWarning(res, 0);
            }
            else if(url === '/warnings' && method === 'GET') {
                getErrorOrWarning(res, 1);
            }
            else if(url === '/all' && method === 'GET') {
                getAll(res);
            }
            else {
                res.statusCode = 404;
                res.write("Invalid request");
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
