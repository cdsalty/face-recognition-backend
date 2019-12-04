const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// MIDDLEWARE
app.use(bodyParser.json()); // in order to send data to the front end, it must be parsed
app.use(cors()); // gives the ability to work around cors issues.

const database = {
  users: [
    {
      id: "123",
      name: "John",
      password: "cookies",
      email: "john@gmail.com",
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "Sally",
      password: "bananas",
      email: "sally@gmail.com",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  // res.send("res send is sending this from app dot get"); // verified via Postman
  res.send(database.users);
});

1;
// first step in connecting back to front, start with the sign in route

app.post("/signin", (req, res) => {
  // res.send("signing in...");  // but we need it in json
  // the user's response will come back in the request. This response needs to be verified it matches
  // ** BODY-PARCER (remember, to read the request, we need to parce it using body-parcer) **
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success"); // will use this comment to sign in later...
  } else {
    res.status(400).json("error logging in");
  }
});

// When a new user is created: (the user registration form requires a name, email and password)
app.post("/register", (req, res) => {
  // get email password and name from req.body
  const { email, password, name } = req.body; // information the user is submitting
  // to create a new user
  database.users.push({
    // get the user's info and add it to the database
    id: "125",
    // name: 'John',
    name: name, // making use of object destructuring
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  // ALWAYS REMEMBER THE RESPONSE (here, grab the last item in the array)
  res.json(database.users[database.users.length - 1]); // the response is the new user created
});
// Get the user for their homepage
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    // forEach; not creating a new array
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("not found");
  }
});

app.put("/image", (req, res) => {
  // 1st: locate the user to update their entries
  // const { id } = req.params; ---------> Instead of params, we need the body info
  const { id } = req.body; // receive user id from the body
  let found = false;
  database.users.forEach(user => {
    // forEach; not creating a new array
    if (user.id === id) {
      found = true; // once found,
      user.entries++; // increase their entries
      return res.json(user.entries); // and return the new updated amount of entries submitted
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.listen(3000, () => {
  console.log("sanity check; server listening on port 3000");
});
