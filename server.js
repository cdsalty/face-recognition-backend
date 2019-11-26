const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("res send is sending this from app dot get"); // verified via Postman
});

app.listen(3000, () => {
  console.log("breaker, breaker, sanity-check to start working on the backend");
});

/*
The basic thinking for the layout: (what routes the app will need)
ROUTES:
- /, a root route that responds it is working off the route folder
- /signin --> POST REQUEST(because you don't want to send a password in the url; instead it needs to be sent through the body)
- /register (POST REQUEST: want to ADD data to the database)
- /profile/:userId (GET REQUEST: returns the user and their information)
- /image (PUT REQUEST: updating the user's image along with their ranking)
*/
