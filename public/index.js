const host = 'http://localhost:3000/';

const btnStart = document.getElementById('btnStart');
const btnReset = document.getElementById('btnReset');
const inputData = document.getElementById('inputData');
const txtResult = document.getElementById('txtResult');
const divInformationResults = document.getElementById("divInformationResults");
const txtPlayersCount = document.getElementById("txtPlayersCount");
const txtSpotsCount = document.getElementById("txtSpotsCount");
const txtShotsCount = document.getElementById("txtShotsCount");
const tablePlayers = document.getElementById("tablePlayers");
const tableScores = document.getElementById("tableScores");
const tableResults = document.getElementById("tableResults");

btnStart.addEventListener('click', startProcess);
btnReset.addEventListener('click', reset);

//Start Process
function startProcess() {
    const endpoint = host + 'calculate';
    const endpoint2 = host + 'calculate2';

    const data = {
        data: inputData.value
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };

    fetch(endpoint, options)
        .then(res => res.json())
        .then(res => {
            txtResult.value = res;
            divInformationResults.classList.remove('d-none');
        })
        .catch(err => {
            console.error(err);
            return;
        });

    fetch(endpoint2, options)
        .then(res => res.json())
        .then(res => {
            createTables(res);
        })
        .catch(err => {
            console.error(err);
            return;
        });
}

//Reset
function reset() {
    inputData.value = '';
}

function createTables(data) {
    txtPlayersCount.value = data.names.length;
    txtSpotsCount.value = data.spots.length;
    txtShotsCount.value = data.spots[0].length;

    let tablePlayersHTML = '<table class="table"><tr><th>Name</th></tr>';
    let tableScoresHTML = '<table class="table"><tr><th>Player';
    let tableResultsHTML = '<table class="table"><tr><th>#</th><th>Player</th><th>Total Score</th><th>Score First Splot</th><th>Last shot of each splot</th></tr>';

    for (let i = 1; i <= data.spots.length; i++) {
        tableScoresHTML += `<th>Spot ${i}</th>`;
    }

    for (let i = 0; i < data.names.length; i++) {
        tablePlayersHTML += `<tr><td><input type="text" class="form-control" value="${data.names[i]}"></td></tr>`;
        tableScoresHTML += `<tr><td>${data.names[i]}</td>`;
        tableResultsHTML += `<tr><td>${i + 1}</td><td>${data.results[i].name}</td><td>${data.results[i].totalPoints}</td><td>${data.results[i].firstSpotPoints}</td><td>${data.results[i].totalLastShotSpots}</td></tr>`;

        for (let j = 0; j < data.spots.length; j++) {
            tableScoresHTML += `<td>`;
            for (let k = 0; k < data.spots[0].length; k++) {
                tableScoresHTML += `<input type="text" class="form-control mb-1" value="${data.spots[j][k]}" readonly>`;
            }
            tableScoresHTML += `</td>`;
        }
        tableScoresHTML += "</tr>";
    }

    tablePlayersHTML += "</table>";
    tableScoresHTML += "</table>";
    tableResultsHTML += "</table>";
    tablePlayers.innerHTML = tablePlayersHTML;
    tableScores.innerHTML = tableScoresHTML;
    tableResults.innerHTML = tableResultsHTML;
}