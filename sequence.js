async function loadSequence() {
    startTimer();
    modeLevel = gameLevel;
    problem2 = {
        desc: "",
        answer: ""
    };
    modeTitles.push("seq");
    blackFont();
    //document.cookie[0]=1;
    //gameLevel = parseInt(document.cookie) ?? 1;
    var saLevel = gameLevel + 1;
    var q = new Array(saLevel + 3);
    var i = 0;
    totalPitches++;
    setSeqItems(gameLevel);
    displayData();
    problem2.desc = "";
    answerKey = "";
    for (var i = 0; i < items.length; i++) {
        problem2.desc += varItems[items[i]] + " ";
        answerKey += varItems[items[i]] + "=" + prices[items[i]] + " ";
    }
    problem2.desc += "\n\n"


    lin2 = "";
    question = problem2.desc;
    //if(dataNames[rand]=="elements") displayElementInfo(items,lin2);
    displayInfo(problem2, "");
    document.getElementById('ans').type = "text"

    document.getElementById('modeDisplay').innerHTML = "Mode: Sequence"
    return problem2.desc;
}
