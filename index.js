// Install dependencies

// ------------ npm install --save-dev nodemon
// ------------ npm install express
// ------------ npm install cors

// To start Server
// -------------npm run dev

// building server by http protocol in node

// const http = require("http");

// let notes = [
//   {
//     id: 1,
//     content: "HTML  is easy",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST  are the most important methods of HTTP protocol ",
//     important: true,
//   },
// ];
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);

// Updating the server to use express(a library in server-side development)
const express = require("express");
const app = express();


// To make express show static content, the page index.html and the JavaScript, etc., it fetches, we need a built-in middleware from Express called static.
// When we add the following amidst the declarations of middlewares
app.use(express.static("dist"));


// Enable cross browser exchange of data
const cors = require("cors");
app.use(cors());

// Without the json-parser, the body property would be undefined. The json-parser takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called.

app.use(express.json()); //  helps in posting data

let notes = [
  {
    id: 1,
    content: "HTML  is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST  are the most important methods of HTTP protocol ",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// Fetching all the notes

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

//fetching a single resource

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

//Deleting resources
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//posting data
app.post("/api/notes", (request, response) => {
  const generateId = () => {
    //generate an Id for the object to  be added, this is an option but not the best way
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxId + 1;
  };

  const body = request.body;

  //check if note follows the schema
  if (!body.content) {
    return response.status(400).json({
      error: "Content missing",
    });
  }
  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);
  response.json(note);
});
