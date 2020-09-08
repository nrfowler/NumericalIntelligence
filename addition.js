  async function loadLongAddition() {
      startTimer();
      modeLevel= 1;
      modeTitles.push("longaddition");
      modeBlinkDuration.push(9);
      hpm = [];
      if (reviewMode) await getRelevantHP();
      if (hpm.length > 0) {
          displayHardProblem();
      } else {
          blackFont();
          var q1 = 0,
              q2 = 0, s1 = 0, s2 = 0;
          for (var i = 0; i < gameLevel + 2; i++) {
              q1 = Math.round(Math.random() * 8) + 1;
              do {
                  q2 = Math.round(Math.random() * (9 - q1)) + q1;
              } while (q1 + q2 < 10)
              s1 += q1 * Math.pow(10, i);
              s2 += q2 * Math.pow(10, i);
          }
      }
      if (verbalMode) {
          smallFont();
          var item = getRandomInt(varItems.length);
          var item2 = getRandomInt(varItems.length, item);
          var prices = [];
          for (var i = 1; i <= varItems.length; i++)
              prices.push(getRandomNumber(2));
          prices[item] = s1;
          prices[item2] = s2;
          problem2.desc = "";
          for (var i = 0; i < varItems.length; i++)
              problem2.desc += varItems[i] + ':  ' + prices[i] + "\n";
          problem2.desc += "\n" + varItems[item] + " + " + varItems[item2] + "";
          problem2.answer = s1 + s2;
          //varItems = varItems.reverse();

      }
      else {
          problem2.desc = " " + s1 + "\n+" + s2;
          problem2.answer = s1 + s2;
      }




      totalPitches++;

      lin2="";
      question = problem2.desc;
      displayInfo(problem2, "Mode: Long Addition", lin2);
      return problem2.desc;
  }

  async function loadSerialAddition() {
      startTimer();
      modeLevel= gameLevel;
      problem2 = {
          desc: "",
          answer: ""
      };
      modeTitles.push("serial");
      //document.cookie[0]=1;
      //gameLevel = parseInt(document.cookie) ?? 1;
      var saLevel = gameLevel + 1;
      var q = new Array(saLevel + 1);
      var i = 0;


      var items = [];
      function displayQuestion(){
        problem2.desc += "\n"+varItems[items[0]];
        problem2.answer = prices[items[0]]
        for (var i = 1; i < items.length; i++){
              problem2.desc +=' + '+ varItems[items[i]] ;
              problem2.answer += prices[items[i]]  }
      }
      totalPitches++;
      if (verbalMode) {
          smallFont();
          for(var i = 0; i < gameLevel+1; i++) items.push(getRandomInt(varItems.length));

          if(prices.length==0){
            for (var i = 1; i <= varItems.length; i++) prices.push(getRandomDecimal(2,2));
            }

          problem2.desc = "";
          if(displaytype=="vlist"){
          for (var i = 0; i < varItems.length; i++)
              problem2.desc += varItems[i] + ':  ' + prices[i] + "\n";
          displayQuestion();
            }
          else if (displaytype=="hlist") {
            for (var i = 0; i < varItems.length; i++)
                problem2.desc += varItems[i] + ': ' + prices[i] + "     ";
            displayQuestion();
          }
          else if (displaytype=="truckgauges") {
              truckFont();
                problem2.desc +=  prices[0] + " ";
                problem2.desc += prices[1]+ "      ";
                problem2.desc +=  prices[6]+"    ";
                problem2.desc +=  prices[7]+ "        ";
                problem2.desc +=prices[8]+" ";
                problem2.desc += prices[9]+"\n\n";

                problem2.desc += prices[2] + " ";
                problem2.desc += prices[3] +"  ";
                problem2.desc +="                        ";
                problem2.desc +=  prices[10]+" ";
                problem2.desc +=  prices[11]+"\n\n";

                problem2.desc +=  prices[4] + " ";
                problem2.desc += prices[5] +" ";
                problem2.desc +="                        ";
                problem2.desc +=  prices[12]+" ";
                problem2.desc +=  prices[13]+"\n";
                displayQuestion();
          }
          else if (displaytype == "stocks"){
problem2.desc = "loading"

  problem2.desc = "";
  for (var i = 0; i < varItems.length; i++){
    prices[i]=pricefoo[i][0]['open'];
    console.log(prices[i])
      problem2.desc += varItems[i] + ':  ' + prices[i] + "\n";
    }
      displayQuestion();

          }
  //varItems = varItems.reverse();

      }
      else{

      problem2.desc = " " + q[0];
      problem2.answer = q[0];
      for (var j = 1; j < saLevel; j++) {
          problem2.desc += "\n+" + q[j];
          problem2.answer += q[j];
      }
    }
        lin2="";
        question = problem2.desc;
      displayInfo(problem2, "Mode: Serial Addition", lin2);
      return problem2.desc;
  }
