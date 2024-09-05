async function loadStandings() {
    // Fetch the predicted standings data
    const response = await fetch('predicted_standings.json');
    const predictedStandings = await response.json();

    const afcDiv = document.getElementById('standings-afc');
    const nfcDiv = document.getElementById('standings-nfc');

    // Load AFC Standings
    const afcStandings = predictedStandings["AFC"];
    createStandingsView(afcStandings, afcDiv, "AFC");

    // Load NFC Standings
    const nfcStandings = predictedStandings["NFC"];
    createStandingsView(nfcStandings, nfcDiv, "NFC");

    // Load the Playoff Bracket
    loadPlayoffBracket();

    // Load Awards
    loadAwards(predictedStandings["Awards"]);

    // Set up button toggles for AFC, NFC, Playoffs, and Awards views
    setupToggleButtons();
}

function createStandingsView(conferenceData, container, conferenceName) {
    for (const division in conferenceData) {
        const divisionHeader = document.createElement('h2');
        divisionHeader.textContent = division;
        container.appendChild(divisionHeader);

        const table = document.createElement('table');
        table.classList.add('standings-table');

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Team</th>
            <th>Predicted Position</th>
            <th>Blurb</th>
        `;
        table.appendChild(headerRow);

        conferenceData[division].forEach(team => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${team.team}</td>
                <td>${team.position}</td>
                <td class="blurb">${team.blurb}</td>
            `;
            table.appendChild(row);
        });

        container.appendChild(table);
    }
}

async function loadPlayoffBracket() {
    // Fetch data from JSON file
    const response = await fetch('predicted_standings.json');
    const data = await response.json();
    
    // Extract playoff matchups
    const playoffs = data["Playoffs"];
    const wildCard = playoffs["Wild Card"];
    const divisional = playoffs["Divisional"];
    const conference = playoffs["Conference Finals"];
    const superBowl = playoffs["Super Bowl"];

    // Populate Wild Card Round
    populateRound(wildCard, document.querySelector('.round-1'));

    // Populate Divisional Round
    populateRound(divisional, document.querySelector('.round-2'));

    // Populate Conference Finals
    populateRound(conference, document.querySelector('.round-3'));

    // Populate Super Bowl
    populateRound(superBowl, document.querySelector('.round-4'));
}

// Function to populate the teams in each round
function populateRound(matchups, roundElement) {
    const matchupsDivs = roundElement.querySelectorAll('.matchup');

    matchups.forEach((matchup, index) => {
        if (matchupsDivs[index]) {
            const team1 = matchupsDivs[index].querySelector('.team-1');
            const team2 = matchupsDivs[index].querySelector('.team-2');
            
            team1.textContent = matchup.team1;
            team2.textContent = matchup.team2;
        }
    });
}

function loadAwards(awardsData) {
    const awardsBody = document.getElementById('awards-body');

    awardsData.forEach(award => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${award.award}</td>
            <td>${award.winner}</td>
            <td>${award.team}</td>
        `;
        awardsBody.appendChild(row);
    });
}

function setupToggleButtons() {
    const afcBtn = document.getElementById('afc-btn');
    const nfcBtn = document.getElementById('nfc-btn');
    const playoffsBtn = document.getElementById('playoffs-btn');
    const awardsBtn = document.getElementById('awards-btn');

    const afcDiv = document.getElementById('standings-afc');
    const nfcDiv = document.getElementById('standings-nfc');
    const playoffsDiv = document.getElementById('playoffs-view');
    const awardsDiv = document.getElementById('awards-view');

    afcBtn.addEventListener('click', () => {
        afcDiv.classList.remove('hidden');
        nfcDiv.classList.add('hidden');
        playoffsDiv.classList.add('hidden');
        awardsDiv.classList.add('hidden');

        afcBtn.classList.add('active');
        nfcBtn.classList.remove('active');
        playoffsBtn.classList.remove('active');
        awardsBtn.classList.remove('active');
    });

    nfcBtn.addEventListener('click', () => {
        nfcDiv.classList.remove('hidden');
        afcDiv.classList.add('hidden');
        playoffsDiv.classList.add('hidden');
        awardsDiv.classList.add('hidden');

        nfcBtn.classList.add('active');
        afcBtn.classList.remove('active');
        playoffsBtn.classList.remove('active');
        awardsBtn.classList.remove('active');
    });

    playoffsBtn.addEventListener('click', () => {
        playoffsDiv.classList.remove('hidden');
        afcDiv.classList.add('hidden');
        nfcDiv.classList.add('hidden');
        awardsDiv.classList.add('hidden');

        playoffsBtn.classList.add('active');
        afcBtn.classList.remove('active');
        nfcBtn.classList.remove('active');
        awardsBtn.classList.remove('active');
    });

    awardsBtn.addEventListener('click', () => {
        awardsDiv.classList.remove('hidden');
        afcDiv.classList.add('hidden');
        nfcDiv.classList.add('hidden');
        playoffsDiv.classList.add('hidden');

        awardsBtn.classList.add('active');
        afcBtn.classList.remove('active');
        nfcBtn.classList.remove('active');
        playoffsBtn.classList.remove('active');
    });
}

loadStandings();
