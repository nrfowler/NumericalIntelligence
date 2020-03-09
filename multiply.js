  function loadMult() {
      startTimer();
      //document.getElementById("problem2").style.font = "bold 100px arial,serif";
      var gameModifier = Math.pow(10, gameLevel) - 1;
      var average;
      var problem2e = document.getElementById('problem2');
      document.getElementById('bar1').style.display = "block";
      var ttt;
      problem2 = {
          desc: "",
          answer: ""
      };
      document.getElementById("ans").type = "number";
      var q1 = 0,
          q2 = 0;
      do {
          q1 = getRandomNumber(window.gameLevel+1);
          q2 = Math.round(Math.random() * 4) + 5;
      } while (q1 % 10 == 0 || q2 % 10 == 0)
      totalPitches++;
      if(blinkMode)
        window.setTimeout(hideQuestion, 3000+500*window.gameLevel);
      problem2.desc = "  " + q1 + "\nx " + "" + q2;
      problem2.answer = q1 * q2;

      document.getElementById('bridge').style.display = "none";
      problem2e.innerHTML = problem2.desc;
      var fff = document.getElementById('curMode');
      fff.innerHTML = "Mode: Multiplication";
      var curLevel = document.getElementById('curLevel');
      curLevel.innerHTML = "Level: " + gameLevel;
      question = problem2.desc;
      return problem2.desc;
  }
  function loadDivide() {
      startTimer();
      //document.getElementById("problem2").style.font = "bold 100px arial,serif";
      var gameModifier = Math.pow(10, gameLevel) - 1;
      var average;
      var ttt;
      problem2 = {
          desc: "",
          answer: ""
      };
      document.getElementById("ans").type = "number";
      var q1 = 0,
          q2 = 0;
      do {
          q1 = getRandomNumber(window.gameLevel+1);
          q2 = Math.round(Math.random() * 4) + 5;
      } while (q1 % 10 == 0 || q2 % 10 == 0)
      totalPitches++;
      if(blinkMode)
        window.setTimeout(hideQuestion, 2000+500*window.gameLevel);
      problem2.desc = "  " + q1*q2 + " / " + "" + q2;
      problem2.answer = q1;
      var problem2e = document.getElementById('problem2');
      problem2e.innerHTML = problem2.desc;
      var fff = document.getElementById('curMode');
      fff.innerHTML = "Mode: Division";
      var curLevel = document.getElementById('curLevel');
      curLevel.innerHTML = "Level: " + gameLevel;
      question = problem2.desc;
      return problem2.desc;
  }
