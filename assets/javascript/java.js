//Firebase//

var config = {
    apiKey: "AIzaSyBc772D3wTZ1XLL5fyKGzvhw6a-pbvLYwI",
    authDomain: "first-project-abf97.firebaseapp.com",
    databaseURL: "https://first-project-abf97.firebaseio.com",
    projectId: "first-project-abf97",
    storageBucket: "first-project-abf97.appspot.com",
    messagingSenderId: "537496433805"
};

firebase.initializeApp(config);

var database = firebase.database();

var train = "";
var destination = "";
var time = "";
var frequency = "";

$("#submit").on("click", function (event) {

    event.preventDefault();

    train = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({

        train: train,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });
});

database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val().train);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);

    // full list of items to the well
    $("#border").append("<div class='table'><table><tr><td> " +
        childSnapshot.val().train +
        " </td><td> " + childSnapshot.val().destination +
        " </td><td> " + childSnapshot.val().time +
        " </td><td> " + childSnapshot.val().frequency +
        " </td></tr><table>");

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});

