function loadAlpha() {
    //numerical value at a certain index where index A is 0 and value is 1
    var num = [];
    //minimum level
    var minLevel = 1;
    modeLevels[mode] = modeLevels[mode] == 1 ? minLevel : modeLevels[mode];
    //reset from progiq
    document.getElementById("problem2").style.font = "100px";
    modeBlinkDuration.push(6);
    var addends = new Array(modeLevels[mode] + 1);
    var names = [];
    var total;
    addTitle("alpha");
    startTimer();
    var maxadds = 4;
    totalPitches++;
    lin2 = "";
    totalLetters = 26;
    document.getElementById("ans").type = "number"
    //operator level
    var OPL = modeLevels[mode];
    if (modeLevels[mode] > 2 * maxadds + 4) {
        //level3: greek
        OPL -= 2 * maxadds + 4;
        totalLetters = 77;
        lin2 = "Greek Alphabet: ";
    } else if (modeLevels[mode] > maxadds + 2) {
        OPL -= maxadds + 2;
        totalLetters += 26;
        lin2 = "Z=26, a=27, b=28...";
    }
    TLR = totalLetters - 1;
    for (var i = 0; i <= 1; i++) {
        num.push(i + 1);
        if (i >= 52) {
            names.push(String.fromCharCode(i + 893));
            lin2 += names[i] + "  =   " + num[i] + "\n";
        } else if (i >= 26)
            names.push(String.fromCharCode(i + 71));
        else
            names.push(String.fromCharCode(i + 65));
        if (i == 51) console.log(names.slice(-26).join() + "\n--------------------------------------");
        if (i == 76) console.log(names.slice(-25).join() + "\n--------------------------------------");

        if (i == 25) console.log(names.join() + "\n--------------------------------------");
    }

    function addval(s, n) {
        for (var i = 0; i < s.length; i++) {

            names.push(s[i]), num.push(n[i]);
        }
    }

    //names[0]="HTTPS",num[0]=443,names[1]="POP3",num[1]=110;
    //names.push("IMAP"), num.push(143);
    //names.push("SMTP"),num.push(25);
    //addval(["rdp",'ftp','snmp','ssh','telnet','dns','dhcp','tftp','smb','rtp'],[3389,20,161,22,23,53,67,69,445,5005]);
    //     addval(["cat3","cat5","cat5e","cat6_under100m","cat6a","cat7"].map(a=>a+" speed in Mbps"),
    // [10,100,1000,10000,10000,10000]);
    // var foo=["802.11a","802.11b","802.11g","802.11n","802.11ac"];
    // var bar = foo.map(a => a+" freq in Ghz");
    // foo = foo.map(a => a+" speed in Mbps");

    // addval(foo,[54,11,54, 600, 6933]);
    // addval(bar,[5,2.4,2.4,5,5])
    // addval(["bluetooth speed in Mbps"],[24]);

    total = 0;
    problem2 = {
        desc: "",
        answer: 0
    };
    addends[0] = parseInt(Math.random() * names.length-8)+8;

    problem2.desc = names[addends[0]];
    //problem2.answer=num[addends[0]];
    if (OPL <= maxadds) {
        for (var j = 1; j <= OPL - 1; j++) {
            addends[j] = getRandomInt(18,addends[0]+8)+8;
            problem2.desc += " + " + names[addends[j]];

            //problem2.answer+=num[addends[j]];
        }
        problem2.answer = addends.reduce(function(a, b) {
            appendLog(names[b] + " [" + b + "]: " + num[b]);
            return a + num[b]
        }, 0);
    } else if (OPL > maxadds) {
        for (var j = 1; j <= OPL - maxadds; j++) {
            addends[j] = parseInt(Math.random() * names.length);
            problem2.desc += "*" + names[addends[j]];
        }
        problem2.answer = addends.reduce(function(a, b) {
            return a * num[b]
        }, 1);
    }
    names.forEach((n, i) => console.log(n + " " + num[i]));
    question = problem2.desc;
    displayInfo(problem2, "Alphanumeric Arithmetic");
    return problem2.desc;
}
