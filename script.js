document.addEventListener("DOMContentLoaded", function () {
    let board = document.getElementById("sudoku-board");
    for (let i = 0; i < 9; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 9; j++) {
            let cell = document.createElement("td");
            let input = document.createElement("input");
            input.type = "number";
            input.min = 1;
            input.max = 9;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
});

function solveSudoku() {
    let board = [];
    document.querySelectorAll("#sudoku-board tr").forEach((row, rowIndex) => {
        let rowData = [];
        row.querySelectorAll("td input").forEach((cell) => {
            rowData.push(cell.value ? parseInt(cell.value) : 0);
        });
        board.push(rowData);
    });

    fetch("/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board: board })
    })
    .then(response => response.json())
    .then(data => {
        if (data.solved_board) {
            document.querySelectorAll("#sudoku-board tr").forEach((row, rowIndex) => {
                row.querySelectorAll("td input").forEach((cell, colIndex) => {
                    cell.value = data.solved_board[rowIndex][colIndex];
                });
            });
        } else {
            alert("No solution found");
        }
    });
}
