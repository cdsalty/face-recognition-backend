const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// MIDDLEWARE
app.use(bodyParser.json()); // in order to send data to the front end, it must be parsed

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date(),
    },
  ]
}

app.get("/", (req, res) => {
  // res.send("res send is sending this from app dot get"); // verified via Postman
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  // res.send("signing in...");  // but we need it in json
  // the user's response will come back in the request. This response needs to be verified it matches
  // ** BODY-PARCER (remember, to read the request, we need to parce it using body-parcer) **
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json("signin success");
  } else {
    res.status(400).json("error logging in");
  }
});

// When a new user is created: (the user registration form requires a name, email and password)
app.post('/register', (req, res) => {
  // grab the information from req.body
  const { email, password, name } = req.body;
  // to create a new user
  database.users.push({
    id: '125',
    // name: 'John',
    name: name, // making use of object destructuring
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  // ALWAYS REMEMBER THE RESPONSE (here, grab the last item in the array)
  res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(400).json("not found");
  }
})


app.listen(3000, () => {
  console.log("sanity check; server listening on port 3000");
});

