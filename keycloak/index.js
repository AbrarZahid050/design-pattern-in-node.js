const express = require("express");
const session = require("express-session");
const Keycloak = require("keycloak-connect");
const log = require("express-winston");
const { transports, format } = require("winston");
const cors = require("cors");

const host = "192.168.18.130";
const port = 8080;

const app = express();
app.use(cors());

const memoryStore = new session.MemoryStore();

app.use(
  log.logger({
    transports: [new transports.Console()],
    format: format.combine(
      format.json(),
      format.colorize(),
      format.timestamp(),
      format.prettyPrint()
    ),
    meta: true,
    // msg: "HTTP {{req.method}} {{req.url}}",
  })
);

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

const keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware());

app.get("/secured", keycloak.protect("realm:myrole"), (req, res) => {
  res.setHeader("content-type", "text/plain");
  res.send("Secret message!");
  console.log("--------------------------------------------");
});

app.get("/public", (req, res) => {
  res.setHeader("content-type", "text/plain");
  res.send("Public message!");
  console.log("--------------------------------------------");
});

app.get("/", (req, res) => {
  console.log("--------------------------------------------");
  res.send(
    '<html><body><ul><li><a href="/public">Public endpoint</a></li><li><a href="/secured">Secured endpoint</a></li></ul></body></html>'
  );
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}.`);
});
