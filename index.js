const http = require("http");
const data = require("./people");

const onRequest = (req, res) => {
  switch (req.url) {
    case "/":
      res.end("Welcome to the homepage!");
      return;
    case "/about":
      res.end("Welcome to the about page!");
      return;
    case "/people":
      res.end(JSON.stringify(data));
      return;
    default:
      if (req.url.startsWith("/people/")) {
        if (req.method === "GET") {
          const id = Number(req.url.split("/")[2]);
          const person = data.find((person) => person.id === id);
          if (person) {
            res.end(JSON.stringify(person));
          } else {
            res.writeHead(404).end("Person not found");
          }
        } else if (req.method === "DELETE") {
          const id = Number(req.url.split("/")[2]);
          const personIndex = data.findIndex((person) => person.id === id);
          if (personIndex !== -1) {
            data.splice(personIndex, 1);
            res.end("Person deleted");
          } else {
            res.writeHead(404).end("Person not found");
          }
        } else {
          res.writeHead(405).end("Method Not Allowed");
        }
      } else {
        res.writeHead(404).end("404 Not Found");
      }
      return;
  }
};

const server = http.createServer(onRequest);

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// delete data ini berhasil didelete
// get list
// get detail
// delete
