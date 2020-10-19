function onKeyPress() {
    var answer = document.getElementById('ans');
    var convertedAns;
    var ans2 = document.getElementById('answer2');
    //If typing mode
    // if (mode == 1 && answer.value.length > 0 && answer.value.substring(0, 3) == "add") {
    // }
    //if mode is bridge

    var elapsed = endTimer();
    function right(){
      if ( elapsed <= minTime) {
      incrementPoints();
      displayScore(ans2, elapsed);
          colorFeedback('yes');
          appendLog("...\n" + minTime + " seconds is time limit, you took " + getDuration(elapsed));
          //getNews(r1());
          //if(articles.length==0) getNews2();
    }
    else if (elapsed > minTime || (CurrentHP != null && CurrentHP?.elapsed < elapsed)) {
        appendLog("not quick enough...\n" + minTime + " seconds is time limit, you took " + getDuration(elapsed));
        colorFeedback('slow');
      }
      loadGame();

  }
  function wrong(){
    decrementPoints();
    displayScore(ans2, elapsed);
    document.getElementById('element0').src = "",document.getElementById('element1').src = "";
    document.getElementById('elementdesc0').innerHTML = "",document.getElementById('elementdesc1').innerHTML = "";
    ans2.innerHTML = ans2.innerHTML + "<p>" + problem2.desc + "=" + problem2.answer + "</p>"
    ans2.innerHTML = ans2.innerHTML + "<p>" + answerKey + "</p>";
    answerShown = true;
    colorFeedback('wrong');

    loadGame();
  }
    if (["bridge","Sequence"].includes(modeTitles[mode]) && verbalMode) {
        convertedAns = answer.value;
        if ((convertedAns.length >= problem2.answer.length) || event.key === 'Enter') {
          if (convertedAns.toLowerCase() == problem2.answer.toLowerCase()) {
              right();
              }
          else wrong();
        }
    } else {
        convertedAns = parseFloat(answer.value)
    if ((getDigits(convertedAns) >= getDigits(problem2.answer)) || event.key === 'Enter') {
        if (Math.abs(convertedAns - problem2.answer) < 1 || convertedAns == problem2.answer) {
            right();
        } else {
            wrong();
        }

    }
  }

}
