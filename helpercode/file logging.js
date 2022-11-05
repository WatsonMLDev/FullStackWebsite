const fs = require('fs');

//fs.writeFile('october31.txt', 'Hello world!', (error) => {
//    if(error) throw error;
//    console.log("file written")
//});

//fs.appendFile('thing2.txt', 'Hi there.....\n', (error) =>{
//    if(error) throw error;
//    console.log("appended to file")
//})

//fs.readFile('thing2.txt', (error, data) =>{
//    if(error) throw error;
//    console.log(`data read: ${data}`)
//});

let fileExists = fs.existsSync("thing2.txt")
console.log(fileExists)

console.log(Date()) // use this on the server for individual assignment