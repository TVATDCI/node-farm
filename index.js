// CommonJs recap
// Synchronous
// Blocking code execution
{
  /**
    const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `Do you know? \n${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync(`./txt/output.text`, textOut);
console.log(`File written`);
    */
}
// You can register Asynchronous readFile function to read the task and use call back function to get the task back and execute it in Single Thread.
// Non-Blocking Code
// Call back Hell ASynchronous!

const fs = require("fs");

{
  /**
    fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`${data1}.text`, "utf-8", (err, data2) => {
    fs.readFile(`append.text`, "utf-8", (err, data3) => {
      fs.writeFile(`final.text`, `${data2} ${data3}`, `utf-8`, (err) => {
        if (err) throw err;
        console.log(`Your file have been saved`);
      });
    });
  });
});

     */
}

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
    });
  });
});
console.log(
  `Node.js will read data -read-this- in the background. \nSo it will read this line first and then the data below`
);
