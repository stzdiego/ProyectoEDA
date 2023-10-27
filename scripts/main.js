document.addEventListener("DOMContentLoaded", function () {
    const playersCountInput = document.getElementById("playersCount");
    const shotsCountInput = document.getElementById("shotsCount");
    const spotsCountInput = document.getElementById("spotsCount");
    const msgPlayers1 = document.getElementById("msgPlayers1");
    const msgPlayers2 = document.getElementById("msgPlayers2");
    const msgPlayers3 = document.getElementById("msgPlayers3");

    playersCountInput.addEventListener("change", createTables);
    shotsCountInput.addEventListener("change", createTables);
    spotsCountInput.addEventListener("change", createTables);

    function createTables() {
        const playersCount = parseInt(playersCountInput.value);
        const shotsCount = parseInt(shotsCountInput.value);
        const spotsCount = parseInt(spotsCountInput.value);

        // Generar la tabla si playerCount es mayor o igual a 2
        if (playersCount >= 2) {
            const tablePlayers = document.getElementById("tablePlayers");
            const tableScores = document.getElementById("tableScores");
            const tableResults = document.getElementById("tableResults");

            let tablePlayersHTML = '<table class="table"><tr><th>Name</th><th>Nickname</th></tr>';
            let tableScoresHTML = '<table class="table"><tr><th>Player';
            let tableResultsHTML = '<table class="table"><tr><th>Player</th><th>Total Score</th><th>Score First Splot</th><th>Last shot of each splot</th></tr>';

            for (let i = 1; i <= spotsCount; i++) {
                tableScoresHTML += `<th>Spot ${i}</th>`;
            }

            for (let i = 1; i <= playersCount; i++) {
                tablePlayersHTML += `<tr><td><input type="text" class="form-control" placeholder="Player ${i} Name"></td><td><input type="text" class="form-control" placeholder="Player ${i} Nickname"></td></tr>`;
                tableScoresHTML += `<tr><td>Player ${i}</td>`;
                tableResultsHTML += `<tr><td>Player ${i}</td><td>0</td><td>0</td><td>0</td></tr>`;

                for (let j = 1; j <= spotsCount; j++) {
                    tableScoresHTML += `<td>`;
                    for (let k = 1; k <= shotsCount; k++) {
                        tableScoresHTML += `<input type="number" class="form-control" value="0" min="0" max="1" placeholder="Score">`;
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
            msgPlayers1.classList.add("d-none");
            msgPlayers2.classList.add("d-none");
            msgPlayers3.classList.add("d-none");
        }
    }
});
