const { Score } = require("../class/Score.js");

function validateData(data) {
    let dataPlayers = [];
    let playerNames = [];
    let dataSpots = [];
    let spots = [];
    let message = '';

    //Calculo el numero de datos de jugadores
    dataPlayers = data.replace(/\'/g, "").split("||");

    //Valido el rango de jugadores debe ser 0 < n < 101
    if (dataPlayers.length < 1 || dataPlayers.length > 100) {
        message = "Error en el numero de datos de jugadores, el numero de jugadores debe ser mayor a 0 y menor a 101";
        return message;
    }

    //Calculo el numero de datos de nombres y spots
    for (let n = 0; n < dataPlayers.length; n++) {
        playerNames.push(dataPlayers[n].split("*")[0]);
        dataSpots.push(dataPlayers[n].split("*")[1]);
    }

    //Valido que los nombres no esten vacios, tengan un tamaño maximo de 20 caracteres y no se repitan
    for (let n = 0; n < playerNames.length; n++) {
        if (playerNames[n] == "") {
            message = "Error en el nombre del jugador " + playerNames[n] + ", el nombre no puede estar vacio";
            return message;
        }
        else if (playerNames[n].length > 20) {
            message = "Error en el nombre del jugador " + playerNames[n] + ", el nombre no puede tener mas de 20 caracteres";
            return message;
        }
        else if (playerNames.indexOf(playerNames[n]) != n) {
            message = "Error en el nombre del jugador " + playerNames[n] + ", el nombre no puede repetirse";
            return message;
        }
    }

    //Elimino los espacios en blanco de los spots
    for (let p = 0; p < dataSpots.length; p++) {
        dataSpots[p] = dataSpots[p].replace(/\s/g, "");
    }

    //Valido que los spots solo contengan 0 y 1
    for (let p = 0; p < dataSpots.length; p++) {
        spots = dataSpots[p].split(";");

        for (let m = 0; m < spots.length; m++) {
            for (let n = 0; n < spots[m].length; n++) {
                if (spots[m][n] != 0 && spots[m][n] != 1) {
                    message = "Error en el dato " + spots[m][n] + " del spot " + spots[m] + " del jugador " + playerNames[p] + ", el dato solo puede ser 0 o 1";
                    return message;
                }
            }
        }
    }

    //Valido que el numero de datos de nombres y spots sea el mismo
    if (playerNames.length != dataSpots.length) {
        message = "Error en el numero de datos de nombres y spots";
        return message;
    }

    //Valido que el numero de datos de spots sea el mismo para todos los jugadores
    for (let p = 1; p < playerNames.length; p++) {
        spots = dataSpots[p].split(";");

        if (spots.length != dataSpots[0].split(";").length) {
            message = "Error en el numero de datos de spots en el jugador " + playerNames[p];
            return message;
        }

        //Valido que el numero de shots sea el mismo para todos los spots
        for (let m = 1; m < spots.length; m++) {
            if (spots[m].length != spots[0].length) {
                message = "Error en el numero de datos de shots en el spot " + spots[m] + " del jugador " + playerNames[p];
                return message;
            }
        }

        //Valido que los shots sean numeros
        for (let i = 0; i < spots.length; i++) {
            for (let j = 0; j < spots[i].length; j++) {
                if (isNaN(spots[i][j])) {
                    message = "Error en el dato " + spots[i][j] + " del spot " + spots[i] + " del jugador " + playerNames[p];
                    return message;
                }
            }
        }
    }

    return message;
}

function resolverConcurso(concurso) {
    let dataPlayers = concurso.replace(/\'/g, "").split("||");
    let scores = [];
    let result = "";

    for (let n = 0; n < dataPlayers.length; n++) {
        let dataPlayer = dataPlayers[n].split("*");
        let playerNames = dataPlayer[0];
        let spots = dataPlayer[1].split(";");

        let totalPoints = 0;
        let firstSpotPoints = 0;
        let totalLastShotSpot = 0;

        for (let p = 0; p < spots.length; p++) {
            let shots = spots[p].replace(/\s/g, "");

            for (let m = 0; m < shots.length; m++) {
                if (m == shots.length - 1) {
                    totalLastShotSpot += parseInt(shots[m]);
                    totalPoints += parseInt(shots[m] * 2);
                }
                else {
                    totalPoints += parseInt(shots[m]);
                }
            }

            if (p == 0) {
                firstSpotPoints = totalPoints;
            }
        }

        scores.push(new Score(playerNames, totalPoints, firstSpotPoints, totalLastShotSpot));
    }

    bubbleSortScoresAsc(scores);
    scores.forEach(score => {
        if (result === "") {
            result += score.toString();
        }
        else {
            result += "\n" + score.toString();
        }
    });

    return result;
}

function bubbleSortScoresAsc(scores) {
    let n = scores.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (scores[j].compare(scores[j + 1]) > 0) {
                let temp = scores[j];
                scores[j] = scores[j + 1];
                scores[j + 1] = temp;
            }
        }
    }
}

function calculateInformation(scores) {
    let dataPlayers = scores.replace(/\'/g, "").split("||");
    let dataSpots = dataPlayers[0].split("*")[1];
    let playersname = [];
    let spots = [];
    let results = [];

    for (let i = 0; i < dataPlayers.length; i++) {
        let dataPlayer = dataPlayers[i].split("*");
        let name = dataPlayer[0];
        playersname.push(name);
    }

    for (let i = 0; i < dataSpots.split(";").length; i++) {
        spots.push(dataSpots.split(";")[i].replace(/\s/g, ""));
    }

    for (let i = 0; i < dataPlayers.length; i++) {
        let dataPlayer = dataPlayers[i].split("*");
        let nameScore = dataPlayer[0];
        let spotsScore = dataPlayer[1].replace(/\s/g, "").split(";");

        let totalPoints = 0;
        let firstSpotPoints = 0;
        let totalLastShotSpot = 0;

        for (let j = 0; j < spotsScore.length; j++) {
            let shots = spotsScore[j];

            for (let k = 0; k < shots.length; k++) {

                if (k == shots.length - 1) {
                    totalLastShotSpot += parseInt(shots[k]);
                    totalPoints += parseInt(shots[k] * 2);
                }
                else {
                    totalPoints += parseInt(shots[k]);
                }
            }

            if (j == 0) {
                firstSpotPoints = totalPoints;
            }
        }

        results.push(new Score(nameScore, totalPoints, firstSpotPoints, totalLastShotSpot));
    }

    bubbleSortScoresAsc(results);

    return { names: playersname, spots: spots, results: results };
}

module.exports = { validateData, resolverConcurso, calculateInformation };