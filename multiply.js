  function loadMult() {
      startTimer();
      //document.getElementById("problem2").style.font = "bold 100px arial,serif";
      var gameModifier = Math.pow(10, gameLevel) - 1;
      var average;
      var problem2e = document.getElementById('problem2');
      document.getElementById('bar1').style.display = "block";
      var ttt;
      modeTitle="mult";
      problem2 = {
          desc: "",
          answer: ""
      };
      document.getElementById("ans").type = "number";
      var q1 = 0,
          q2 = 0;
      if(gameLevel % 2 ==1)
      {
        do {
          q1 = getRandomNumber((window.gameLevel+1)/2+1);
          q2 = getRandomNumber((window.gameLevel+1)/2+1);
      } while (q1 % 10 == 0 || q2 % 10 == 0)}
      else if (gameLevel % 2 == 0){
        var foo = [5,7,12.5,2.5];
        q1 = getRandomNumber(window.gameLevel/2+1);
        q2 = foo[Math.round(Math.random() * 3) ];
      }
      totalPitches++;
      problem2.desc = "  " + q1 + "\nx " + "" + q2;
      problem2.answer = q1 * q2;

      question = problem2.desc;
      displayInfo(problem2, "Mode: Multiply", "");
      return problem2.desc;
  }
  function loadDivide() {
      startTimer();
      //document.getElementById("problem2").style.font = "bold 100px arial,serif";
      var gameModifier = Math.pow(10, gameLevel) - 1;
      var average;
      modeTitle="divide";
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

      problem2.desc = "  " + q1*q2 + " / " + "" + q2;
      problem2.answer = q1;

      question = problem2.desc;
      displayInfo(problem2, "Mode: Division", "");
      return problem2.desc;
  }
