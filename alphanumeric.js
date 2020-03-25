function loadAlpha() {
    //numerical value at a certain index where index A is 0 and value is 1
    var num = [];
    //minimum level
    var minLevel = 2;
    gameLevel = gameLevel == 1 ? minLevel : gameLevel;
    //reset from progiq
    document.getElementById("problem2").style.font = "100px arial,serif";

    var addends = new Array(gameLevel + 1);
    var names = [];
    var total;
    modeTitle = "alpha";
    startTimer();
    var maxadds = 4;
    totalPitches++;
    lin2 = "";
    totalLetters = 26;
    document.getElementById("ans").type = "number"
    //operator level
    var OPL = gameLevel;
    if (gameLevel > 2 * maxadds + 4) {
        //level3: greek
        OPL -= 2 * maxadds + 4;
        totalLetters = 77;
        lin2 = "Greek Alphabet: ";
    } else if (gameLevel > maxadds + 2) {
        OPL -= maxadds + 2;
        totalLetters += 26;
        lin2 = "Z=26, a=27, b=28...";
    }
    TLR = totalLetters - 1;
    for (var i = 0; i <= TLR; i++) {
        num.push(i+1);
        if (i >= 52) {
            names.push(String.fromCharCode(i + 893));
            lin2 += names[i] + "  =   "+num[i]+  "\n";
        } else if (i >= 26)
            names.push(String.fromCharCode(i + 71));
        else
            names.push(String.fromCharCode(i + 65));
        if (i == 51) console.log(names.slice(-26).join() + "\n--------------------------------------");
        if (i == 76) console.log(names.slice(-25).join() + "\n--------------------------------------");

        if (i == 25) console.log(names.join()+"\n--------------------------------------");
    }
    total = 0;
    problem2 = {
        desc: "",
        answer: 0
    };
    addends[0] = parseInt(Math.random() * TLR);
    while (PRV == addends[0]) {
        addends[0] = parseInt(Math.random() * TLR);
    }
    problem2.desc = names[addends[0]];
    //problem2.answer=num[addends[0]];
    if (OPL <= maxadds) {
        for (var j = 1; j <= OPL - 1; j++) {
            addends[j] = parseInt(Math.random() * TLR);
            problem2.desc += " + " + names[addends[j]];
            //problem2.answer+=num[addends[j]];
        }
        problem2.answer = addends.reduce(function(a, b) {
            return a + num[b]
        }, 0);
    } else if (OPL > maxadds) {
        for (var j = 1; j <= OPL - maxadds; j++) {
            addends[j] = parseInt(Math.random() * TLR);
            problem2.desc += "*" + names[addends[j]];
        }
        problem2.answer = addends.reduce(function(a, b) {
            return a * num[b]
        }, 1);
    }
    
    question = problem2.desc;
    displayInfo(problem2, "Alphanumeric Arithmetic", lin2);
    return problem2.desc;
}
