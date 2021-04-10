const express = require("express");
const app = express();
var bodyParser = require('body-parser')

// Our users which will be queried by their index
// const users = [{
//     firstName: "Jesse",
//     lastName: "Pinkman",
//     position: "Manufacturer",
//     cars: [{
//       brand: "BMW",
//       model: "M3",
//       kW: 338,
    
//     }, ],
//   },
//   {
//     firstName: "Walter",
//     lastName: "White",
//     position: "CEO",
//     cars: [{
//         brand: "BMW",
//         model: "335i",
//         kW: 225,
//       },
//       {
//         brand: "Lamborghini",
//         model: "Aventador",
//         kW: 566,
//       }
//     ],
//   },
// ];

let users = [
    {
        id :1,
        email : "endri.azizi@gmail.com",
        subscription : "reseller"
    },
    {
        id :2,
        email : "mario.rossi@gmail.com",
        subscription : "master"
    },
    {
        id :3,
        email : "endri.azizi@gmail.com",
        subscription : "reseller"
    },
    {
        id :4,
        email : "mario.rossi@gmail.com",
        subscription : "master"
    }
    
]


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/* {
    name string required: false
    surname	string required: false
    profession string required: false
    subscription string Enum: Array [ 5 ] required: true
    email string($email)  required: true
} */
// Allow cross-origin requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

app.get("/users", (req, res) => {
  return res.json(users);
});

app.get("/user/:id", (req, res) => {
  // To prevent the ID "0" we'll simply subtract by one. This way we can query for id = 2 which will serve us 1, etc.
  const idx = req.params.id - 1;

  if (!users[idx]) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  return res.status(200).json(users[idx]);
});


app.put("/userORIGINALE/:id", (req, res) => {
    // To prevent the ID "0" we'll simply subtract by one. This way we can query for id = 2 which will serve us 1, etc.
    const idx = req.params.id - 1;
  console.log("ID: ", idx);
    // if (!users[idx]) {
    //   return res.status(404).json({
    //     error: "User not found"
    //   });
    // }

  
    // return res.json(users[idx]);

    console.log('Got body:', req.body);
    res.sendStatus(200);
  });

  app.put('/user/:id', function (req, res) {
    // get item object match by `id`
    console.log("body: ", req.body);
    let found = users.find(function (item) {
        console.log("item: ", item);
        return item.id === parseInt(req.params.id);
    });

    // check if item found
    if (found) {
        let updated = {
            id: found.id,
            email: req.body.email, // set value of `title` get from req
            subscription: req.body.subscription // set value of `order` get from req
        //     completed: req.body.completed // set value of `completed` get from req
        };

        // find index of found object from array of data
        let targetIndex = users.indexOf(found);

        // replace object from data list with `updated` object
        users.splice(targetIndex, 1, updated);
        

        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

  
app.listen(3333, () => {
  console.log("Server running on port 3333");
});
