  async function loadMult() {
      startTimer();
      modeTitles.push("mult");
      modeBlinkDuration.push(9);
      problem2 = {
          desc: "",
          answer: ""
      };
      hpm = [];
      if(reviewMode) await getRelevantHP();
      if (hpm.length > 0) {
          displayHardProblem();
      } else {
          blackFont();
          MultLogic();
      }
      totalPitches++;
      displayInfo(problem2, "Mode: Multiplication", lin2)
      question = problem2.desc;
      return problem2.desc;
  }

function MultLogic() {
    var q1 = 0,
        q2 = 0;
        do {
            q1 = getRandomNumber((window.gameLevel + 1) / 2 + 1);
            q2 = Math.round(Math.random() * 4) + 5;
        } while (q1 % 10 == 0 || q2 % 10 == 0)
    if (verbalMode) {
        smallFont();
        var item = getRandomInt(varItems.length);
        var prices = [];
        for (var i = 1; i <= varItems.length; i++)
            prices.push(getRandomNumber((window.gameLevel + 1) / 2 + 1));
        prices[item] = q1;
        for (var i = 0; i < varItems.length; i++)
            problem2.desc += varItems[i] + '  $' + prices[i]+"\n";
        problem2.desc += "\n"+q2 + " " + varItems[item]+"";
        problem2.answer = q1 * q2;
        //varItems = varItems.reverse();
        return;
    }
    else{
      if (gameLevel % 2 == 1) {


          problem2.desc = " " + q1 + "\n x" + "" + q2;
          problem2.answer = q1 * q2;
      } else if (gameLevel % 2 == 0) {
          var foo = [2.5, .75, 1, 2];
          q1 = getRandomNumber(window.gameLevel / 2 + 1);
          q2 = foo[Math.round(Math.random() * 3)];
          problem2.desc = " " + q1 + " mph for "  + q2 + " s = __ ft";
          problem2.answer = Math.round(q1 * 5280* q2 / 3600);
      }
    }


  }
  async function loadDivide() {
      startTimer();
      //document.getElementById("problem2").style.font = "bold 100px arial,serif";
      var gameModifier = Math.pow(10, gameLevel) - 1;
      var average;
      modeTitles.push("divide");
      modeBlinkDuration.push(9);
      var ttt;
      problem2 = {
          desc: "",
          answer: ""
      };
      document.getElementById("ans").type = "number";
      var hpm = [];
      if (reviewMode && totalPitches % 5 == 4) {
          await getHardProblems();
          hpm = HardProblems.filter(d => d.game == modeTitle);
          CurrentHP = null;
      }
      problem2 = {
          desc: "",
          answer: ""
      };
      if (reviewMode && hpm.length > 0 ) {
          CurrentHP = hpm[0];
          problem2.desc = CurrentHP.content;
          problem2.answer = CurrentHP.answer;
          console.log("Loading hard problem: " + CurrentHP.docID)
          HardProblems = [];
      } else {
          divLogic();
      }
      totalPitches++;
      displayInfo(problem2, "Mode: Division", lin2)
      question = problem2.desc;
      return problem2.desc;
  }
function divLogic() {
    var q1 = 0,
        q2 = 0;
    do {
        q1 = getRandomNumber(window.gameLevel + 1);
        q2 = Math.round(Math.random() * 4) + 5;
    } while (q1 % 10 == 0 || q2 % 10 == 0)
    problem2.desc = "  " + q1 * q2 + " / " + "" + q2;
    problem2.answer = q1;
}
