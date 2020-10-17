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

      hardLevel = 10;
      hll=5;
    len = createArray(100,1,1).map(x=>x<=hardLevel ? 2 : x)
    .map(x=>((x >hardLevel) && (x<=hardLevel+hll)) ? 3 : x)
    .map(x=>x >hardLevel+hll ? 6 : x)[level-1];
        startval = getRandomInt(varItems.length > 100 ? 100 : varItems.length);
        increment = (getRandomInt(3))+1+(level > hardLevel ? (level-hardLevel) : level);
        hardinc = (getRandomInt(3))+1+(level > hardLevel ? (level-hardLevel) : level);
        hardinc2 = (getRandomInt(3))+1+(level > hardLevel+hll ? (level-hardLevel-hll) : level)
      items.push(startval);
      var foo = r1();
      for (var i = 1; i <= len; i++) {
startval =(startval+increment) % varItems.length
        if((level  > hardLevel+hll )&& (i % 2 ==foo)) startval = (hardinc2 +startval)% varItems.length
        if(level> hardLevel) startval=(startval+hardinc*i) % varItems.length;
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
