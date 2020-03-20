  function loadLongAddition() {
      startTimer();
      modeLevel= 1;
      modeTitle="longaddition";
      modeBlinkDuration = 4;
      var q1 = 0,
          q2 = 0, s1=0, s2=0;
    for(var i =0; i < gameLevel+2; i++){
          q1 = Math.round(Math.random() * 8) + 1;
      do {
          q2 = Math.round(Math.random() * (9-q1)) + q1;
      } while (q1+q2<10)
      s1+=q1*Math.pow(10,i);
      s2+=q2*Math.pow(10,i);
    }


      totalPitches++;
      problem2.desc =" "+s1 + "\n+" + s2;
      problem2.answer = s1 + s2;
      lin2="";
      question = problem2.desc;
      displayInfo(problem2, "Mode: Long Addition", lin2);
      return problem2.desc;
  }

  function loadSerialAddition() {
      startTimer();
      modeLevel= 2;
      problem2 = {
          desc: "",
          answer: ""
      };

      //document.cookie[0]=1;
      //gameLevel = parseInt(document.cookie) ?? 1;
      var saLevel = gameLevel + 1;
      var q = new Array(saLevel + 1);
      var i = 0;
      do {
          q[i++] = getRandomNumber(2);
      } while (i < saLevel)
      totalPitches++;
      problem2.desc = " " + q[0];
      problem2.answer = q[0];
      for (var j = 1; j < saLevel; j++) {
          problem2.desc += "\n+" + q[j];
          problem2.answer += q[j];
      }
        lin2="";
        question = problem2.desc;
      displayInfo(problem2, "Mode: Serial Addition", lin2);
      return problem2.desc;
  }
