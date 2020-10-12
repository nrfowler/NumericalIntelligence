window.onload = function() {
    modeNames = [loadSerialAddition, loadLongAddition,
        loadMult, loadDivide
    ];
    modeTitles = [];
    verbalMode = true;
    modeLevel = 1;
    showTime = 0;

    lin2 = "";
    modeBlinkDuration = [];
    reviewMode = false;
    listnames = [];
    priceslist = [];
    item = 0;
    item2 = 0;
    numItems = 0;
    varItems = [];
    answerKey = "";
    dataNames = ['truck', 'elements', 'truck', 'stocks', 'pharmacy', 'alphabet']
    displaytypelist = ['vlist', 'vlist', 'truckgauges', 'stocks', 'vlist', 'vlist']
    listnames[0] = ['front suspension', 'front wheel', 'front brake', 'cab area',
    'saddle tank area', 'coupling system',
        'rear tractor wheels', 'suspension', 'brakes'
    ];
    listnames[1] = ['B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg',
        'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti',
        'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As',
        'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru',
        'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'
    ];
    listnames[2] = ['exhaust pyrom', 'engine oil p', 'engine oil t', 'engine coolant t',
     'ammeter', 'voltmeter', 'tachometer',
        'odom', 'air p', 'air brake app p', 'fuel gauge', 'air filter rest', 'axle t', '2nd axle t'
    ];
    listnames[3] = ['BA', 'WMT', 'D', 'IBM', 'KO','SPY']; //,'WFC','SPY','NDAQ']
    listnames[4] = ['g/oz', 'ml/tsp', 'mg/gr', 'g/lb', 'fl-oz/pint', 'fl-oz/quart',
     'mL/quart', 'mL/pint', 'fl-dr/fl-oz', 'mL/fl-dr', 'mL/oz', 'L/gal', 'J/cal'];
    listnames[5] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    priceslist[5] = getRndVal([createArray(26,1)]);
minTime = 6;
    priceslist[0] = [];
    priceslist[1] = createArray(listnames[1].length, 5);
    //listnames[1].splice(listnames[1].length - 34);
    priceslist[2] = [];
    items = [];
    priceslist[4] = [28.35, 5, 64.8, 454, 16, 32, 960, 480, 8, 5, 30, 3.785, 4.19];
    priceslist[3] = createArray(6,1,1); //24.20,100,100];
    stocks = new Stocks('ARKXWZK7XN8ZWJ0W');
    stockPrices = new Array();
    //rand = getRandomInt(listnames.length);
    rand = 0;
    ReverseMode = false;
    prices = [];
    randMode = false;
    stocksLoading = false;
    populateStocks();
    var jagged = [listnames, displaytypelist, priceslist, dataNames];
    rmArrayFromJagged(jagged, 0);
    rmArrayFromJagged(jagged, 1);
    switchElementsFromJagged(jagged,0,3);
    switchElementsFromJagged(jagged,1,3);
    spliceElementsFromJaggedSubset(jagged,[0,2],0,[0,8]);
    spliceElementsFromJaggedSubset(jagged,[0,2],1,[25,listnames[1].length]);
    base = 10;
    updateData(0);
    articles=[];
    loadElements();
    getNews2();
    results = 10;
    arxiv=new Array(results)
    getArxiv();
    lin2="";
    //[4,3,3,9,0,10];
    dataHeight = 10;
    points = 0;
    gameLevel = 1;
    totalPitches = 0;
    totalModes = modeNames.length;
    mode = 0;
    answerShown = false;
    blinkMode = 0;
    question = "";
    inarow = 0;
    timeouts = [];
    //document.cookie = "2";
    console.log(document.cookie);
    //timer variable
    seconds = 0;
    elapsed = 0;
    totalTime = 0;
    //points scored in "pitch"
    pointDiff = 0;
    //do wrong answers decrement points?
    penaltyMode = true;
    //displays error logging to user w/o console
    ermsg = ""
    problem2 = {
        desc: "",
        answer: "",
        legend: "",
    };
    //question index
    qi=[];
    retainMode = false;

    pausedQ = [];
    sentraw = [];
    db = firebase.firestore();
    HardProblems = [];
    hpm = [];
    CurrentHP = null //HardProblems[0];
    // db.collection("flashcards").get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         sentraw.push(doc.data()["content"].replace("add ", ""));
    //         //console.log(sentraw.pop());
    //     });
    //     //wait until loaded
    //     rndI = sentraw.length - 1;
    // });
    //previous random variable
    loadGame();
    PRV = 0;
    //modeNames.forEach(x => x());
    //sleep(3);

}