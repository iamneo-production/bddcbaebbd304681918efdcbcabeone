// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.btn');
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle player moves
const ticTacToe = (element, index) => {
    if (!cells[index] && !isGameOver) {
        // Update the cell and display X or O
        cells[index] = currentPlayer;
        element.value = currentPlayer;
        element.classList.add(currentPlayer.toLowerCase());

        // Check for a win or draw
        const winner = checkWin();
        if (winner) {
            if (winner === 'draw') {
                result.textContent = "It's a draw!";
            } else {
                result.textContent = `Player ${winner} wins!`;
            }
            document.getElementById('reset-btn').disabled = false;
            isGameOver = true;
        } else {
            // Switch to the next player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            result.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
};

// Function to check for a win
function checkWin() {
    for (const combo of conditions) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
    if (cells.every(cell => cell)) {
        return 'draw';
    }
    return null;
}

// Function to reset the game
const resetGame = () => {
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    result.textContent = "Player X's Turn";
    btns.forEach(btn => {
        btn.value = '';
        btn.classList.remove('x', 'o');
    });
    document.getElementById('reset-btn').disabled = true;
    isGameOver = false;
};

btns.forEach((btn, i) => {
    btn.addEventListener('click', () => ticTacToe(btn, i));
});

document.querySelector('#reset-btn').addEventListener('click', resetGame);