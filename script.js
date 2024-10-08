// Variables to track the game state
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Winning combinations for Tic-Tac-Toe
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Selecting elements
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

// Function to handle cell click
const handleCellClick = (event) => {
  const index = event.target.getAttribute('data-index');

  // If the cell is already taken or the game is inactive, return
  if (board[index] !== '' || !isGameActive) return;

  // Update the board and UI
  board[index] = currentPlayer;
  event.target.innerText = currentPlayer;

  // Check for a win or draw
  checkResult();
  
  // Switch players
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

// Function to check the result (win, draw, or continue)
const checkResult = () => {
  let roundWon = false;

  // Check if there's a winning combination
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    message.innerText = `Player ${currentPlayer} wins!`;
    isGameActive = false;
  } else if (!board.includes('')) {
    message.innerText = "It's a draw!";
    isGameActive = false;
  }
};

// Function to reset the game
const resetGame = () => {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  message.innerText = '';
  cells.forEach(cell => (cell.innerText = ''));
};

// Add event listeners to each cell and the reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
