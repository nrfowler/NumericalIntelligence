// async function checkAns() {
//     if (event.key === 'Enter') {
//         elapsed = endTimer();
//         //useless??
//         //seconds = seconds + elapsed;
//         var answer = document.getElementById('ans');
//         var convertedAns;
//         var ans2 = document.getElementById('answer2');
//         //If typing mode
//         // if (mode == 1 && answer.value.length > 0 && answer.value.substring(0, 3) == "add") {
//         // }
//         //if mode is bridge
//         if (modeTitles[mode]== "bridge") {
//             convertedAns = answer.value;
//         } else if (modeTitles[mode]== "progiq")
//         {
//             if (answer.value == ans2.value) {
//                 incrementPoints();
//                 displayScore(ans2, elapsed)
//
//                 colorFeedback('yes');
//                 loadGame();
//                 return;
//             } else if (answer.value.length == 0) {
//
//                 loadGame();
//                 return;
//             } else {
//                 db = firebase.firestore();
//
//                 db.collection("flashcards").add({
//                         content: answer.value
//
//                     })
//                     .then(function(docRef) {
//                         appendLog("Document written with ID: ", docRef.id, " ", answer.value+"\n");
//                     })
//                     .catch(function(error) {
//                         console.error("Error adding document: ", error);
//                     });
//                 loadGame();
//                 return;
//             }
//         } else {
//             convertedAns = parseFloat(answer.value)
//
//         }
//         if (Math.abs(convertedAns - problem2.answer)<.001 || convertedAns == problem2.answer) {
//             incrementPoints();
//             displayScore(ans2, elapsed);
//             if (!answerShown  && elapsed <= gameLevel+5) {
//               if( CurrentHP != null)  await rmDups(CurrentHP.content);
//               colorFeedback('yes');
//               appendLog("...\n"+foo+" seconds is time limit, you took "+elapsed.toFixed(2));
//             }
//             else if ( elapsed > gameLevel+5 || (CurrentHP!=null && CurrentHP?.elapsed < elapsed)){
//               var foo = CurrentHP?.elapsed == undefined ? gameLevel+5 : CurrentHP?.elapsed;
//               appendLog("not quick enough...\n"+foo+" seconds is time limit, you took "+elapsed.toFixed(2));
//                 colorFeedback('slow');
//               sendHardQ();
//             }
//
//             loadGame();
//         } else {
//             decrementPoints();
//             displayScore(ans2, elapsed);
//             ans2.innerHTML = ans2.innerHTML + "<p>" + problem2.desc + "="+ problem2.answer + "</p>"
//             ans2.innerHTML = ans2.innerHTML + "<p>" + answerKey + "</p>";
//             answerShown = true;
//             colorFeedback('wrong');
//             if(modeTitles[mode]!="pointcount") loadGame();
//             //sendHardQ();
//             loadGame();
//         }
//         //Start next pitch
//         answer.value = null;
//         //never repeat
//         pauseQ();
//     }
// }

function onKeyPress(){
  var answer = document.getElementById('ans');
  var convertedAns;
  var ans2 = document.getElementById('answer2');
  //If typing mode
  // if (mode == 1 && answer.value.length > 0 && answer.value.substring(0, 3) == "add") {
  // }
  //if mode is bridge

  if (modeTitles[mode]== "bridge") {
      convertedAns = answer.value;
  } else {
      convertedAns = parseFloat(answer.value)

  }

  if (( getDigits(convertedAns) >= getDigits(problem2.answer) )|| event.key === 'Enter'){
    var elapsed = endTimer();
    if (Math.abs(convertedAns - problem2.answer)<.001 || convertedAns == problem2.answer) {
        incrementPoints();
        displayScore(ans2, elapsed);
        if (!answerShown  && elapsed <= gameLevel+5) {
          colorFeedback('yes');
          appendLog("...\n"+foo+" seconds is time limit, you took "+elapsed.toFixed(2));
        }
        else if ( elapsed > gameLevel+5 || (CurrentHP!=null && CurrentHP?.elapsed < elapsed)){
          var foo = CurrentHP?.elapsed == undefined ? gameLevel+5 : CurrentHP?.elapsed;
          appendLog("not quick enough...\n"+foo+" seconds is time limit, you took "+elapsed.toFixed(2));
            colorFeedback('slow');
          sendHardQ();
        }

        loadGame();
    }
    else {
      decrementPoints();
      displayScore(ans2, elapsed);
      ans2.innerHTML = ans2.innerHTML + "<p>" + problem2.desc + "="+ problem2.answer + "</p>"
      ans2.innerHTML = ans2.innerHTML + "<p>" + answerKey + "</p>";
      answerShown = true;
      colorFeedback('wrong');

      loadGame();
    }
    answer.value = null;
  }

}
