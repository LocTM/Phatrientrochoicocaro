
    const board = document.getElementById('board');
    const boardArray = Array.from({ length: 20 }, () => Array(20).fill(''));

    function createBoard() {
    for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 20; col++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}
}
}

    function handleCellClick(event) {
    const clickedCell = event.target;
    const row = Number(clickedCell.dataset.row);
    const col = Number(clickedCell.dataset.col);

    if (boardArray[row][col] === '') {
    const currentPlayer = getCurrentPlayer();
    clickedCell.textContent = currentPlayer;
    boardArray[row][col] = currentPlayer;

    if (checkWinner(row, col)) {
    alert(`${currentPlayer} wins!`);
    resetGame();
}
}
}

    function getCurrentPlayer() {
    const totalMoves = boardArray.flat().filter(cell => cell !== '').length;
    return totalMoves % 2 === 0 ? 'X' : 'O';
}

    function checkWinner(row, col) {
    const currentPlayer = boardArray[row][col];

    // Check horizontally
    if (checkConsecutive(row, col, 0, 1, currentPlayer) || checkConsecutive(row, col, 0, -1, currentPlayer)) {
    return true;
}

    // Check vertically
    if (checkConsecutive(row, col, 1, 0, currentPlayer) || checkConsecutive(row, col, -1, 0, currentPlayer)) {
    return true;
}

    // Check diagonally
    if (checkConsecutive(row, col, 1, 1, currentPlayer) || checkConsecutive(row, col, -1, -1, currentPlayer)) {
    return true;
}

    if (checkConsecutive(row, col, 1, -1, currentPlayer) || checkConsecutive(row, col, -1, 1, currentPlayer)) {
    return true;
}

    return false;
}

    function checkConsecutive(row, col, rowIncrement, colIncrement, currentPlayer) {
    let count = 1;

    for (let i = 1; i < 5; i++) {
    const newRow = row + i * rowIncrement;
    const newCol = col + i * colIncrement;

    if (newRow < 0 || newRow >= 20 || newCol < 0 || newCol >= 20) {
    break;
}

    if (boardArray[newRow][newCol] === currentPlayer) {
    count++;
} else {
    break;
}
}

    for (let i = 1; i < 5; i++) {
    const newRow = row - i * rowIncrement;
    const newCol = col - i * colIncrement;

    if (newRow < 0 || newRow >= 20 || newCol < 0 || newCol >= 20) {
    break;
}

    if (boardArray[newRow][newCol] === currentPlayer) {
    count++;
} else {
    break;
}
}

    return count >= 5;
}

    function resetGame() {
    boardArray.forEach(row => row.fill(''));
    document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
});
}

createBoard();
