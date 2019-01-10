// ============ //
// Dependencies //
// ============ //
var express = require("express");
var path = require("path");

// require our friends array
var friendsArray = require("./friends")


// ======================= //
// Sets up the Express App //
// ======================= //
var app = express();
var PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsingclear
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ====== //
// Routes //
// ====== //

// home page, display the home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
});

// survey page, display the survey.html
app.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "survey.html"));
})

// link to the Friends API, will return the json formatted friendsArray (which is being taken from friends.js)
app.get("/friends", function (req, res) {
    return res.json(friendsArray);
});

// whenever the user posts to the server through the survey
app.post("/friends", function (req, res) {

    // set the request object body equal to a variable
    var newFriend = req.body;

    // set the newFriend property answers (the array of user answers) equal to a variable
    var userA = newFriend.scores;

    // parse the user answers so that they are integers
    var userANum = [];

    userA.forEach(function (e) {
        var x = parseInt(e);
        userANum.push(x);
    });

    // shows that the parse worked
    // console.log(userANum);

    var joe = 0;
    var sal = 0;
    var q = 0;
    var murr = 0;

    // do the logic to figure out which friend is the best... 
    // for loop to check through each friends answers
    for (var i = 0; i < friendsArray.length; i++) {
        var counter = 0;

        // for each value in the friends scores, evaluate the difference and add to the relevant variable
        friendsArray[i].scores.forEach(function (element) {
            var x = Math.abs(element - userANum[counter]);
            counter++
            // check which var to put the difference into
            if (i == 0) {
                joe += x;
            }
            else if (i == 1) {
                sal += x;
            }
            else if (i == 2) {
                q += x;
            }
            else {
                murr += x;
            }
        }); // end forEach 

    }; // end for loop

    // if statements to account for every friend
    if (joe < sal && joe < q && joe < murr) {
        res.json(friendsArray[0]);
    }
    else if (sal < joe && sal < q && sal < murr) {
        res.json(friendsArray[1]);
    }
    else if (q < joe && q < sal && q < murr) {
        res.json(friendsArray[2]);
    }
    else if (murr < joe && murr < sal && murr < q) {
        res.json(friendsArray[3]);
    }
    // check each friends total
    // console.log(joe);
    // console.log(sal);
    // console.log(q);
    // console.log(murr);

    // this pushes the users info into the friends array but is unnecessary in this case 
    // friendsArray.push(newFriend);

}); // end app.post


// ==================================== //
// Starts the server to begin listening //
// ==================================== //
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
