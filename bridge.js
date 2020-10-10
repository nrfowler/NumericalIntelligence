function loadPointCount() {
    startTimer();
    var average;
    var ttt;
    gameLevel = 1;
    modeTitle = "pointcount"
    modeTitles.push("bridge");
    modeBlinkDuration.push(9);
    hpm = [];
    problem2 = {
        desc: "",
        answer: ""
    };
    document.getElementById("ans").type = "text";
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
    //var sample = [9,11,22,26,35,39,48,52,1,14,27,40,2];
    var j = 0;
    var isBiddable =[0,0,0,0];
    do {
        q1 = Math.round(Math.random() * 51) + 1;
        //skew towards high points
        if (cards.every(e => e != q1) && q1 % 14 > 2) {
            cards.push(q1);
            if (q1 <= 13) {
                i = q1 - 1;
                clubstr=clubstr.concat(symb[i])+" ";
                if(i>7){
                  isBiddable[0]+=i-8;
                }
                if(++clubsctr>4)
                 {hpc++;
                   isBiddable[0]++;
                    distrib++;
                }
            } else if (q1 <= 26) {
                i = q1 - 14;
                diamstr=diamstr.concat(symb[i])+" ";
                if(i>7){
                  isBiddable[1]+=i-8;
                }
                if(diamsctr++>3) {hpc++;

                  isBiddable[1]++;
                }
            } else if (q1 <= 39) {
                i = q1 - 27;
                heartstr=heartstr.concat(symb[i])+" ";
                if(i>7){
                  isBiddable[2]+=i-8;
                }
                if(heartsctr++>3) {
                  hpc++;
                  isBiddable[2]++;
                }
            } else {
                i = q1 - 40;
                spadestr=spadestr.concat(symb[i])+" ";
                if(i>7){
                  isBiddable[3]+=i-8;
                }
                if(spadesctr++>3) {
                  hpc++;
                isBiddable[3]++;}
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

    var ctr = [clubsctr,diamsctr,heartsctr,spadesctr];
    ctr.sort();
    problem2.desc = "<p>&spades;" + spadestr + "</p>\n<p><span style='color:red'>&hearts;</span>"+ heartstr + "</p>\n<p><span style='color:orange'>&diams;</span>" + diamstr + " </p>\n" + clubstr+"</p>";
    problem2.answer = "";
      //hand is 1NT
    if(ctr.pop()+ctr.pop()<=8 && hpc>15 && hpc < 19){problem2.answer = "1NT";}
if(ctr.pop()+ctr.pop()<=8 && hpc>18 && hpc < 23){problem2.answer = "2NT";}
    if(isBiddable[0]==Math.max(...isBiddable) && clubsctr >= 3 && hpc>12 && hpc <= 21){problem2.answer = "1c";}
    if(isBiddable[1]==Math.max(...isBiddable) && diamsctr >= 3 && hpc>12 && hpc <= 21){problem2.answer = "1d";}
    if(isBiddable[2]==Math.max(...isBiddable) && heartsctr >= 3 && hpc>12 && hpc <= 21){problem2.answer = "1h";}
    if(isBiddable[3]==Math.max(...isBiddable) && spadesctr >= 3 && hpc>12 && hpc <= 21){problem2.answer = "1s";}

    if(isBiddable[0]==Math.max(...isBiddable) && clubsctr >= 4 && hpc>12 && hpc <= 21){problem2.answer = "1c";}
    if(isBiddable[1]==Math.max(...isBiddable) && diamsctr >= 4 && hpc>12 && hpc <= 21){problem2.answer = "1d";}
    if(isBiddable[2]==Math.max(...isBiddable) && heartsctr >= 4 && hpc>12 && hpc <= 21){problem2.answer = "1h";}
    if(isBiddable[3]==Math.max(...isBiddable) && spadesctr >= 4 && hpc>12 && hpc <= 21){problem2.answer = "1s";}

    if(isBiddable[0]==Math.max(...isBiddable) && clubsctr >= 5 && hpc>12 && hpc <= 21){problem2.answer = "1c";}
    if(isBiddable[1]==Math.max(...isBiddable) && diamsctr >= 5 && hpc>12 && hpc <= 21){problem2.answer = "1d";}
    if(isBiddable[2]==Math.max(...isBiddable) && heartsctr >= 5 && hpc>12 && hpc <= 21){problem2.answer = "1h";}
    if(isBiddable[3]==Math.max(...isBiddable) && spadesctr >= 5 && hpc>12 && hpc <= 21){problem2.answer = "1s";}

    if(isBiddable[0]==Math.max(...isBiddable) && clubsctr >= 3 && hpc>21 && hpc <= 30){problem2.answer = "2c";}
    if(isBiddable[1]==Math.max(...isBiddable) && diamsctr >= 3 && hpc>21 && hpc <= 30){problem2.answer = "2d";}
    if(isBiddable[2]==Math.max(...isBiddable) && heartsctr >= 3 && hpc>21 && hpc <= 30){problem2.answer = "2h";}
    if(isBiddable[3]==Math.max(...isBiddable) && spadesctr >= 3 && hpc>21 && hpc <= 30){problem2.answer = "2s";}

    if(isBiddable[0]==Math.max(...isBiddable) && clubsctr >= 4 && hpc>21 && hpc <= 30){problem2.answer = "2c";}
    if(isBiddable[1]==Math.max(...isBiddable) && diamsctr >= 4 && hpc>21 && hpc <= 30){problem2.answer = "2d";}
    if(isBiddable[2]==Math.max(...isBiddable) && heartsctr >= 4 && hpc>21 && hpc <= 30){problem2.answer = "2h";}
    if(isBiddable[3]==Math.max(...isBiddable) && spadesctr >= 4 && hpc>21 && hpc <= 30){problem2.answer = "2s";}

    if(isBiddable[0]==Math.max(...isBiddable) && clubsctr >= 5 && hpc>21 && hpc <= 30){problem2.answer = "2c";}
    if(isBiddable[1]==Math.max(...isBiddable) && diamsctr >= 5 && hpc>21 && hpc <= 30){problem2.answer = "2d";}
    if(isBiddable[2]==Math.max(...isBiddable) && heartsctr >= 5 && hpc>21 && hpc <= 30){problem2.answer = "2h";}
    if(isBiddable[3]==Math.max(...isBiddable) && spadesctr >= 5 && hpc>21 && hpc <= 30){problem2.answer = "2s";}

    var problem2e = document.getElementById('bridge');
    problem2e.style.display = "block";
    document.getElementById('bar1').style.display = "none";

  problem2e.innerHTML =problem2.desc;



    var fff = document.getElementById('curMode');
    document.getElementById('modeDisplay').innerHTML= "Mode: Bridge Point Count";

    var curLevel = document.getElementById('curLevel');

    question = problem2.desc;
    return problem2.desc;
}
