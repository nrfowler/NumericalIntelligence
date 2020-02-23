function loadAlpha1() {
    var num = [];
    var addends = new Array(gameLevel + 1);
    var names = [];
    var total;
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
        totalLetters = 76;
        lin2 = "Greek Alphabet: ";
    } else if (gameLevel > maxadds + 2) {
        OPL -= maxadds + 2;
        totalLetters += 26;
        lin2 = "Z=26, a=27, b=28...";
    }
    TLR = totalLetters - 1;
    for (var i = 0; i <= totalLetters - 1; i++) {
        num.push(i);
        if (i > 52) {
            names.push(String.fromCharCode(i + 892));
            lin2 += names[i - 1] + "     ";
        } else if (i > 26)
            names.push(String.fromCharCode(i + 70));
        else
            names.push(String.fromCharCode(i + 65));
        console.log(names[i]);
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
    } else if (OPL >= maxadds + 1) {
        for (var j = 1; j <= OPL - maxadds; j++) {
            addends[j] = parseInt(Math.random() * TLR);
            problem2.desc += "·" + names[addends[j]];
        }
        problem2.answer = addends.reduce(function(a, b) {
            return a * num[b]
        }, 1);
    } else if (OPL == maxadds + 2) {
        addends[1] = parseInt(Math.random() * TLR);
        problem2.desc += " / " + names[addends[1]];
        problem2.answer = Math.floor(num[0] / num[1]);
    }
    question = problem2.desc;
    displayInfo(problem2, "Alphanumeric Arithmetic", lin2);
    return problem2.desc;
}
