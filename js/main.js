$(document).ready(function () {
  console.log("ready!");

  var database = firebase.database().ref('trains');

  database.on('child_added', function (data) {
    console.log(data.val());
    trainData = data.val();

    $("tbody").append("<tr> <td>" + trainData.trainName + "</td> <td>" + trainData.destination + "</td> <td>" + trainData.frequency + "</td> <td>" + trainData.nextTrain + "</td> <td>" + trainData.minutesAway + "</td></tr>");

  });



  function saveTrainInput(trainName, destination, frequency, nextTrain, tMinutesTillTrain) {
    console.log(trainName);

    var newTrainRef = database.push();
    newTrainRef.set({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      nextTrain: nextTrain,
      minutesAway: tMinutesTillTrain
    })
  }

  function calculateTrainData(tFrequency, firstTime) {

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var todayDate = moment().format("ll");

    return {
      currentTime, 
      diffTime, 
      tRemainder,
      tMinutesTillTrain, 
      nextTrain,
      todayDate
    }
  }

  // Test case 2:
  // 16 - 00 = 16
  // 16 % 7 = 2 (Modulus is the remainder)
  // 7 - 2 = 5 minutes away
  // 5 + 3:16 = 3:21

  //  var trainArray=[trainName,destination,frequency,nextArrival,tMinutesTillTrain];

  $("#inputForm").submit(function (event) {
    event.preventDefault();

    var frequency = $("#frequency").val();
    var firstTrainTime = $("#firstTrainTime").val();
    var trainName = $("#trainName").val();
    var destination = $("#destination").val();


    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

    var trainData = calculateTrainData(frequency, firstTrainTime);

    //save train
    saveTrainInput(trainName, destination, frequency, moment(trainData.nextTrain).format("hh:mm"), trainData.tMinutesTillTrain);
    // clear form values for next input
    $(".form-control").val("");

  });


});