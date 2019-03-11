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
    time = moment($("#time-input").val().trim(), "HH:mm").format("LT");
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

    var newFreq = $("#frequency-input").val();
    console.log(newFreq);

    var newTime = $("#time-input").val();
    console.log(time);

    var timeConverted = moment(newTime, "HH:mm").subtract(1, "years");
    console.log(timeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(timeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % newFreq;
    console.log(tRemainder);

    var minutes = newFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutes);

    var arrival = moment().add(minutes, "minutes");
    console.log("ARRIVAL TIME: " + moment(arrival).format("hh:mm"));

    $("#border").append("<div class='table'><table><tr><td> " +
        childSnapshot.val().train +
        " </td><td> " + childSnapshot.val().destination +
        " </td><td> " + childSnapshot.val().frequency +
        " </td><td> " + moment(arrival).format("hh:mm") +
        " </td><td> " + minutes +
        " </td></tr><table>");

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});

