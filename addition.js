  function loadLongAddition() {
      startTimer();
      problem2 = {
          desc: "",
          answer: ""
      };
      var q1 = 0,
          q2 = 0;
      do {
          q1 = getRandomNumber(window.gameLevel+2);
          q2 = getRandomNumber(window.gameLevel+2);
      } while (q1 % 100 == 0 || q2 % 100 == 0)
      totalPitches++;
      problem2.desc =" "+q1 + "\n+" + q2;
      problem2.answer = q1 + q2;
      lin2="";
      question = problem2.desc;
      displayInfo(problem2, "Mode: Long Addition", lin2);
      return problem2.desc;
  }

  function loadSerialAddition() {
      startTimer();
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
