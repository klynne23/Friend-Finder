// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// require our friends array
var friendsArray = require("./friends")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsingclear

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "survey.html"));
})

app.get("/friends", function(req, res) {
    return res.json(friendsArray);
  });

app.post("/friends", function(req, res){

    var newFriend = req.body;
    console.log(newFriend.answers);

    // do the logic to figure out which friend is the best... 


});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  