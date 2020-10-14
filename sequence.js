async function Sequence() {
    startTimer();
    problem2 = {
        desc: "",
        answer: ""
    };
    blackFont();
    mode = modeTitles.findIndex(x=>x=="Sequence");
    //document.cookie[0]=1;
    //modeLevels[mode] = parseInt(document.cookie) ?? 1;
// modeLevels[mode] = 5;
loadData('alphabet');
    var i = 0;
    totalPitches++;
    function setSeqItems(level){
      items=[];
    len = level > 4 ? 4 : 2;
        startval = getRandomInt(varItems.length);
        increment = (getRandomInt(3))+1+(level > 4 ? (level-4) : level);
        hardinc = getRandomInt(2,0)+1;
      items.push(startval);
      var foo = r();
      for (var i = 1; i <= len; i++) {
startval =(startval+increment) % varItems.length
        if((level  ==5 )&& (i % 2 ==foo)) startval = (hardinc +startval)% varItems.length
        if(level> 5) startval=(startval+hardinc*i) % varItems.length;
        if(i < len) items.push(startval);

      }


      problem2.answer = varItems[startval% varItems.length];

    }
    setSeqItems(modeLevels[mode]);
    displayData();
    problem2.desc = "";
    answerKey = "";
    for (var i = 0; i < items.length; i++) {
        problem2.desc += varItems[items[i]] + " ";
        answerKey += varItems[items[i]] + "=" + prices[items[i]] + " ";
    }
    problem2.desc += "..."

    lin2 = "";
    question = problem2.desc;
    //if(dataNames[rand]=="elements") displayElementInfo(items,lin2);
    displayInfo(problem2, "");
    document.getElementById('ans').type = "text"

    document.getElementById('modeDisplay').innerHTML = "Mode: Sequence"
    return problem2.desc;
}
