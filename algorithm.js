// Scoring Rules (Standard Needleman-Wunsch)
const MATCH_SCORE = 1;
const MISMATCH_PENALTY = -1;
const GAP_PENALTY = -2;

function runAlgorithm() {
    // 1. Grab the strings from the HTML inputs and make them uppercase
    let seq1 = document.getElementById("seq1").value.toUpperCase();
    let seq2 = document.getElementById("seq2").value.toUpperCase();

    let cols = seq1.length + 1; // +1 for the initial gap column
    let rows = seq2.length + 1; // +1 for the initial gap row

    // 2. Initialize the 2D Matrix (Just like 'int matrix[rows][cols]' in C)
    let matrix = Array(rows).fill().map(() => Array(cols).fill(0));

    // 3. Fill the first row and column with gap penalties (-2, -4, -6...)
    for (let i = 0; i < rows; i++) {
        matrix[i][0] = i * GAP_PENALTY;
    }
    for (let j = 0; j < cols; j++) {
        matrix[0][j] = j * GAP_PENALTY;
    }

    // 4. The Core Dynamic Programming Nested Loops!
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            
            // Check if the letters match
            let isMatch = (seq1[j - 1] === seq2[i - 1]);
            let diagonalScore = matrix[i - 1][j - 1] + (isMatch ? MATCH_SCORE : MISMATCH_PENALTY);
            
            let upScore = matrix[i - 1][j] + GAP_PENALTY;
            let leftScore = matrix[i][j - 1] + GAP_PENALTY;

            // Take the highest score of the three options
            matrix[i][j] = Math.max(diagonalScore, upScore, leftScore);
        }
    }

    // 5. Draw the matrix on the screen
    drawTable(matrix, seq1, seq2);
}

// A helper function to create HTML table tags out of our 2D array
function drawTable(matrix, seq1, seq2) {
    let html = "<table>";
    
    // Create the top header row with Sequence 1's letters
    html += "<tr><th></th><th>-</th>";
    for(let char of seq1) html += `<th>${char}</th>`;
    html += "</tr>";

    // Loop through our matrix to draw the rows
    for (let i = 0; i < matrix.length; i++) {
        html += "<tr>";
        // The side header column with Sequence 2's letters
        html += `<th>${i === 0 ? '-' : seq2[i - 1]}</th>`;
        
        for (let j = 0; j < matrix[i].length; j++) {
            html += `<td>${matrix[i][j]}</td>`;
        }
        html += "</tr>";
    }
    
    html += "</table>";
    document.getElementById("matrix-container").innerHTML = html;
}