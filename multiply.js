  async function loadMult() {
      startTimer();
      //document.getElementById("problem2").style.font = "bold 100px arial,serif";
      var gameModifier = Math.pow(10, gameLevel) - 1;
      var average;
      var problem2e = document.getElementById('problem2');
      document.getElementById('bar1').style.display = "block";
      document.getElementById("ans").type = "number";
      var ttt;
      modeTitle="mult";
      modeBlinkDuration = 9;
      var hpm = [];
      if(totalPitches > 4)
      {
        await getHardProblems();
      hpm = HardProblems.filter( d => d.game == modeTitle);
      CurrentHP = null;}
      problem2 = {
          desc: "",
          answer: ""
      };
      if(hpm.length > 0 && totalPitches > 4){
        CurrentHP = hpm[0];
        document.getElementById("problem2").style.font = "bold 30px arial,serif";
        document.getElementById("problem2").style.color = "red";
        problem2.desc = CurrentHP.content;
        problem2.answer = CurrentHP.answer;
        appendLog("Loading hard problem: "+CurrentHP.docID)
        HardProblems =[];
      }
      else {
        document.getElementById("problem2").style.font = "10vh arial,serif";
        document.getElementById("problem2").style.color = "black";

        var q1 = 0,
          q2 = 0;
      if(gameLevel % 2 ==1)
      {
        do {
          q1 = getRandomNumber((window.gameLevel+1)/2+1);
          q2 = Math.round(Math.random() * 4) + 5;
      } while (q1 % 10 == 0 || q2 % 10 == 0)}
      else if (gameLevel % 2 == 0){
        var foo = [5,7,12.5,2.5];
        q1 = getRandomNumber(window.gameLevel/2+1);
        q2 = foo[Math.round(Math.random() * 3) ];
      }
      problem2.desc = "  " + q1 + "\nx " + "" + q2;
      problem2.answer = q1 * q2;
    }
      totalPitches++;
      if(blinkMode)
        window.setTimeout(hideQuestion, 3000+500*modeBlinkDuration);

      document.getElementById('bridge').style.display = "none";
      problem2e.innerHTML = problem2.desc;
      var fff = document.getElementById('curMode');
      fff.innerHTML = "Mode: Multiplication";
      var curLevel = document.getElementById('curLevel');
      curLevel.innerHTML = "Level: " + gameLevel;
      question = problem2.desc;
      return problem2.desc;
  }
  async function loadDivide() {
      startTimer();
      //document.getElementById("problem2").style.font = "bold 100px arial,serif";
      var gameModifier = Math.pow(10, gameLevel) - 1;
      var average;
      modeTitle="divide";
      modeBlinkDuration = 1;
      var ttt;
      problem2 = {
          desc: "",
          answer: ""
      };
      document.getElementById("ans").type = "number";
      var hpm = [];
      if(totalPitches % 5  == 4)
      {
        await getHardProblems();
      hpm = HardProblems.filter( d => d.game == modeTitle);
      CurrentHP = null;}
      problem2 = {
          desc: "",
          answer: ""
      };
      if(hpm.length > 0 && totalPitches % 5  == 4){
        CurrentHP = hpm[0];
        problem2.desc = CurrentHP.content;
        problem2.answer = CurrentHP.answer;
        console.log("Loading hard problem: "+CurrentHP.docID)
        HardProblems =[];
      }
      else
      {
        var q1 = 0,
          q2 = 0;
      do {
          q1 = getRandomNumber(window.gameLevel+1);
          q2 = Math.round(Math.random() * 4) + 5;
      } while (q1 % 10 == 0 || q2 % 10 == 0)
      if(blinkMode)
        window.setTimeout(hideQuestion, 2000+500*modeBlinkDuration);
      problem2.desc = "  " + q1*q2 + " / " + "" + q2;
      problem2.answer = q1;}
      totalPitches++;
      var problem2e = document.getElementById('problem2');
      problem2e.innerHTML = problem2.desc;
      var fff = document.getElementById('curMode');
      fff.innerHTML = "Mode: Division";
      var curLevel = document.getElementById('curLevel');
      curLevel.innerHTML = "Level: " + gameLevel;
      question = problem2.desc;
      return problem2.desc;
  }
