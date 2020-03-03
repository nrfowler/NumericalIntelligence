function loadPointCount() {
    startTimer();
    var average;
    var ttt;
    problem2 = {
        desc: "",
        answer: ""
    };
    document.getElementById("ans").type = "number";
    var q1 = 0,
        q2 = 0;
    var cards = [];
    //cards[0] = Math.round(Math.random() * 52) + 1;
    var clubstr = "&clubs; ";
    var diamstr = " ";
    var heartstr = " ";
    var spadestr = " ";
    var clubsctr = 0, diamsctr = 0, heartsctr = 0, spadesctr = 0;
    var hpc = 0;
    var distrib = 0;
    console.clear()
    var symb = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    var sample = [9,13,22,26,35,39,48,52,1,14,27,40,2];
    var j = 0;
    do {
        //q1 = Math.round(Math.random() * 51) + 1;
        q1=sample[j++];
        if (cards.every(e => e != q1)) {
            cards.push(q1);
            if (q1 <= 13) {
                i = q1 - 1;
                clubstr=clubstr.concat(symb[i])+" ";
                if(++clubsctr>4)
                 {hpc++;
                    distrib++;
                }
            } else if (q1 <= 26) {
                i = q1 - 14;
                diamstr=diamstr.concat(symb[i])+" ";
                if(diamsctr++>3) {hpc++;
                  distrib++;
                }
            } else if (q1 <= 39) {
                i = q1 - 27;
                heartstr=heartstr.concat(symb[i])+" ";
                if(heartsctr++>3) {
                  hpc++;
                distrib++;}
            } else {
                i = q1 - 40;
                spadestr=spadestr.concat(symb[i])+" ";
                if(spadesctr++>3) {
                  hpc++;
                distrib++;}
            }
            if(i>8)
              hpc+=i-8;
            else if(i==8)
              hpc+=.5;
        }
    } while (cards.length < 13*gameLevel)
    //Deduct pt if singleton hpc less than ace
    if(clubsctr==1 && cards.find(e => e >=9 && e <= 12)!=undefined)
      {hpc--;}
    if(diamsctr==1 && cards.find(e => e >=22 && e <= 25)!=undefined)
      {hpc--;}
    if(heartsctr==1 && cards.find(e => e >=35 && e <= 38)!=undefined)
      {hpc--;}
    if(spadesctr==1 && cards.find(e => e >=48 && e <= 51)!=undefined)
      {hpc--;}
    //deduct pt for aceless hand
    if( cards.find(e => e == 13)==undefined)
      {hpc--;}
    if(cards.find(e => e == 26)==undefined)
      {hpc--;}
    if(cards.find(e => e == 39)==undefined)
      {hpc--;}
    if(cards.find(e =>e == 52)==undefined)
      {hpc--;}
    //add 1 pt for 4 aces or 4 tens
    const isAce = function(i,card){
      if(i==card || i==card+13 || i == card+26 || i == card+39){
        return 1;
      }
      else {
        return 0;
      }
    }
    //TODO: Find simpler
    var reducer = (accumulator, cv) => isAce(cv,13)+accumulator;
    hpc += cards.reduce(reducer,0) == 4? 1: 0;
    reducer = (accumulator, cv) => isAce(cv,9)+accumulator;
    hpc += cards.reduce(reducer,0) == 4? 1: 0;
    totalPitches++;
    //hand is balanced, add 100 (not correct)
    //if(distrib<2){hpc+=100;}
    problem2.desc = "<p>&spades;" + spadestr + "</p>\n<p><span style='color:red'>&hearts;</span>"+ heartstr + "</p>\n<p><span style='color:orange'>&diams;</span>" + diamstr + " </p>\n" + clubstr+"</p>";
    problem2.answer = hpc;
    var problem2e = document.getElementById('bridge');
    problem2e.style.display = "block";
    document.getElementById('bar1').style.display = "none";
    problem2e.innerHTML =problem2.desc;
    var fff = document.getElementById('curMode');
    fff.innerHTML = "Mode: Bridge Point Count";
    var curLevel = document.getElementById('curLevel');
    curLevel.innerHTML = "Level: " + gameLevel;
    question = problem2.desc;
    return problem2.desc;
}
