const { Score } = require("../class/Score.js");

function resolverConcurso(concurso) {
    let dataPlayers = concurso.split("||");
    let scores = [];
    let result = "";

    for (let i = 0; i < dataPlayers.length; i++) {
        let dataPlayer = dataPlayers[i].split("*");
        let name = dataPlayer[0];
        let spots = dataPlayer[1].split(";");

        let totalPoints = 0;
        let firstSpotPoints = 0;
        let totalLastShotSpot = 0;

        for (let j = 0; j < spots.length; j++) {
            let shots = spots[j];

            for (let k = 0; k < shots.length; k++) {
                totalPoints += parseInt(shots[k]);

                if (k == shots.length - 1) {
                    totalLastShotSpot += parseInt(shots[k]);
                }
            }

            if (j == 0) {
                firstSpotPoints = totalPoints;
            }
        }

        scores.push(new Score(name, totalPoints, firstSpotPoints, totalLastShotSpot));
    }

    bubbleSortScoresDesc(scores);
    scores.forEach(score => {
        if(result === "") {
            result += score.toString();
        }
        else {
            result += "\n" + score.toString();
        }
    });

    return result;
}

function bubbleSortScoresDesc(scores) {
    let n = scores.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (scores[j].compare(scores[j + 1]) < 0) {
                let temp = scores[j];
                scores[j] = scores[j + 1];
                scores[j + 1] = temp;
            }
        }
    }
}

function calculateInformation(scores) {
    let dataPlayers = scores.split("||");
    let spots = dataPlayers[0].split("*")[1].split(";");
    let playersname = [];
    let results = [];
    
    for (let i = 0; i < dataPlayers.length; i++) {
        let dataPlayer = dataPlayers[i].split("*");
        let name = dataPlayer[0];
        playersname.push(name);
    }

    for (let i = 0; i < dataPlayers.length; i++) {
        let dataPlayer = dataPlayers[i].split("*");
        let nameScore = dataPlayer[0];
        let spotsScore = dataPlayer[1].split(";");

        let totalPoints = 0;
        let firstSpotPoints = 0;
        let totalLastShotSpot = 0;

        for (let j = 0; j < spotsScore.length; j++) {
            let shots = spotsScore[j];

            for (let k = 0; k < shots.length; k++) {
                totalPoints += parseInt(shots[k]);

                if (k == shots.length - 1) {
                    totalLastShotSpot += parseInt(shots[k]);
                }
            }

            if (j == 0) {
                firstSpotPoints = totalPoints;
            }
        }

        results.push(new Score(nameScore, totalPoints, firstSpotPoints, totalLastShotSpot));
    }

    bubbleSortScoresDesc(results);

    return { names: playersname, spots: spots, results: results };
}

module.exports = { resolverConcurso, calculateInformation };