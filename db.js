function getHardProblems() {

    var i = 0;
    db.collection("hardproblems")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                //appendLog(doc.id, " => ", doc.data());
                HardProblems[i++] = {
                    docID: doc.id,
                    ...doc.data()
                };
            });
            //appendLog("Got Hard Problems "+HardProblems.length)
        })
        .catch(function(error) {
            appendLog("Error getting documents: ", error);
        });

}
async function deleteProblem(c) {

    await db.collection("hardproblems").doc(c.docID).delete().then(function() {
        appendLog("Document successfully deleted! " + c.content);
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

async function rmDups(content) {
    //alert(HardProblems.filter( h => h.content==content).length+ " to remove");
    var foo = HardProblems.filter(h => h.content == content)
    foo.forEach(hp => deleteProblem(hp));
    HardProblems = HardProblems.filter(h => h.content != content)
}
async function getRelevantHP() {
    await getHardProblems();
    hpm = HardProblems.filter(d => d.game == modeTitles[mode]);
    hpm = hpm.filter(d => d.timestamp - Date.now() < -1000 * 3600);
    //remove dups and remove paused q in session
    var bar = [];
    hpm.forEach( d => {
      if(bar.some(e=>e.content==d.content))
      {

      }
      else if (pausedQ.some(e=>e==d.content)){

      }
      else {
        bar.push(d);
      }
    });
    hpm =[];
    hpm = bar;


    CurrentHP = null;
}
function sendHardQ() {
  if(modeTitles[mode]=="progiq" || modeTitles[mode]== "pointcount" || problem2.ans == "" || retainMode == false) return;
    var db = firebase.firestore();

    db.collection("hardproblems").add({
            content: problem2.desc,
            game: modeTitles[mode],
            answer: problem2.answer,
        timestamp: Date.now(),
        showTime: showTime,
            elapsed: elapsed
        })
        .then(function(docRef) {
            appendLog("Document written with ID: ", docRef.id.substring(1,4)," ",problem2.desc+"\n");
        })
        .catch(function(error) {
            appendLog("Error adding document: ", docRef.id.substring(1,4));
        });

}
