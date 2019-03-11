$( document ).ready(function() {
    console.log( "ready!" );

   

  var database = firebase.database().ref('trains');

  function saveTrainInput(trainName, destination, frequency, nextTrain, tMinutesTillTrain){
      var newTrainRef = database.push();
        newTrainRef.set({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            nextTrain: nextTrain,
            minutesAway: tMinutesTillTrain
        })
  }

  
     
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21
     
    //  var trainArray=[trainName,destination,frequency,nextArrival,tMinutesTillTrain];
     
    $("#inputForm").submit(function(event){
        event.preventDefault();
        

          // frquency gotten from from.
       var tFrequency = $("#frequency").val();

       // First train time is gotten from form.
       var firstTime = $("#firstTrainTime").val();
   
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

        var trainName = $("#trainName").val();

        var destination = $("#destination").val();


        var firstTrainTime = $("#firstTrainTime").val();
        var convertedTime = moment(firstTrainTime, "HH:mm");
        
        var todayDate = moment().format("ll");
        

        var frequency = $("#frequency").val();
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

        console.log("submit pressed");
       console.log("trainName :"+trainName);
       console.log("destination :"+destination);
       console.log("firstTrainTime :"+ convertedTime);
       console.log("todayDate: "+ todayDate);
       console.log("frequency"+frequency);

    
        // write next table line in DOM
       $("tbody").append("<tr> <td>"+trainName+"</td> <td>"+destination+"</td> <td>"+frequency+"</td> <td>"+moment(nextTrain).format("hh:mm")+"</td> <td>"+tMinutesTillTrain+"</td></tr>");



        //save train
       saveTrainInput(trainName, destination, frequency, moment(nextTrain).format("hh:mm"), tMinutesTillTrain);
        // clear form values for next input
      $(".form-control").val("");
     
      

    });
    
    
   


});