const http = require("http");
const fs = require("fs");
const minimist=require("minimist");
let arg=minimist(process.argv);

let port=parseInt(arg.port);
let homeContent = "";
let projectContent = "";
let register = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});
fs.readFile("register-form.html", (err, reg) => {
  if (err) {
    throw err;
  }
  register = reg;
});
http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/register-form.html":
        response.write(register);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(port);
