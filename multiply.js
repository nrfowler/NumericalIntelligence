  async function Multiply() {
      startTimer();
      mode = modeTitles.findIndex(x=>x=="Multiply");

      modeBlinkDuration.push(9);
      problem2 = {
          desc: "",
          answer: ""
      };
      hpm = [];
      //if (reviewMode) await getRelevantHP();
      if (hpm.length > 0) {
          //displayHardProblem();
      } else {
          blackFont();
          MultLogic();
      }
      totalPitches++;
      displayInfo(problem2, "");
      document.getElementById('modeDisplay').innerHTML = "Mode: Multiply"
      question = problem2.desc;
      return problem2.desc;
  }

  function MultLogic() {
      var q1 = 0,
          q2 = 0;
      do {
          q1 = getRandomNumber((window.modeLevels[mode] + 1) / 2 + 1);
          q2 = Math.round(Math.random() * 2) + 7;
      } while (q1 % 10 == 0 || q2 % 10 == 0)
      if (verbalMode) {
          smallFont();
          var item = getRandomInt(varItems.length);
          var item2 = getRandomInt(varItems.length,item);
          problem2.desc = varItems[item2] + "&#215;" + varItems[item] + "\n\n";
          items=[item,item2];
          problem2.answer = prices[item] * prices[item2];
          answerKey = varItems[item] + "=" + prices[item]+ "\n"+varItems[item2] + "=" + prices[item2];
          displayData();
          //varItems = varItems.reverse();
          return;
      } else {
          if (modeLevels[mode] % 2 == 1) {


              problem2.desc = " 0x" + q1.toString(16) + "\n x" + "" + q2;
              problem2.answer = q1 * q2;
          } else if (modeLevels[mode] % 2 == 0) {
              var foo = [2.5, .75, 1, 2];
              q1 = getRandomNumber(window.modeLevels[mode] / 2 + 1);
              q2 = foo[Math.round(Math.random() * 3)];
              problem2.desc = " " + q1 + " mph for " + q2 + " s = __ ft";
              problem2.answer = Math.round(q1 * 5280 * q2 / 3600);
          }
      }


  }
  async function Divide() {
      startTimer();
      mode = modeTitles.findIndex(x=>x=="Divide");
      var gameModifier = Math.pow(10, modeLevels[mode]) - 1;
      var average;
      modeBlinkDuration.push(9);
      var ttt;
      problem2 = {
          desc: "",
          answer: ""
      };
      document.getElementById("ans").type = "number";
      var hpm = [];
      if (reviewMode && totalPitches % 5 == 4) {
          //await getHardProblems();
          //hpm = HardProblems.filter(d => d.game == modeTitle);
          //CurrentHP = null;
      }
      problem2 = {
          desc: "",
          answer: ""
      };
      if (reviewMode && hpm.length > 0) {
          //CurrentHP = hpm[0];
          //problem2.desc = CurrentHP.content;
          //problem2.answer = CurrentHP.answer;
          //console.log("Loading hard problem: " + CurrentHP.docID)
          //HardProblems = [];
      } else {
          divLogic();
      }
      totalPitches++;
      displayInfo(problem2, "")
      document.getElementById('modeDisplay').innerHTML = "Mode: Division";
      question = problem2.desc;
      return problem2.desc;
  }

  function divLogic() {
      var q1 = 0,
          q2 = 0;
      do {
          if(modeLevels[mode] < 6){
          q1 = getRandomNumber(modeLevels[mode] + 1);
          q2 = Math.round(Math.random() * 4) + 6;}
          else{
            q1 = getRandomNumber(modeLevels[mode]-4)+1;
            q2 = getRandomNumber(2)+1;
          }
      } while (q1 % 10 == 0 || q2 % 10 == 0)
      problem2.desc = "  " + q1 * q2 + " / " + "" + q2;
      problem2.answer = q1;
  }
