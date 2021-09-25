const gameBoard = (() => {
    let board = [["", "", ""], ["", "",""], ["", "", ""]];

    const checkIfMarkerAvailable = (location) => {
        if (board[location[0]][location[1]] == "")
            return true
        else
            return false
    };

    const addMarker = (markerInput, location) => {
        if (!checkIfMarkerAvailable(location))
            return null
        console.log(`addMarker called, location: ${location}`);

        board[location[0]][location[1]] = markerInput;
    };
    
    return {
        // For testing purposes return board
        board,
        addMarker
    };
})();

const displayController = ((gameBoard) => {
    const boardCells = document.querySelectorAll(".cell");

    const startLoop = () => {
        boardCells.forEach(cell => {
            cell.addEventListener('click', () => addPlay(cell, "o"));
        });
    };
    
    const addPlay = (cell, marker) => {
        let location = cell.dataset.location.split(",");
        gameBoard.addMarker("o", location)
        addMarkerToCell(cell, marker)
    };

    const addMarkerToCell = (cell, marker) => {
        cell.textContent = marker;
    };

    return {
        // Return boardCells for testing purposes only
        boardCells,
        startLoop
    }
})(gameBoard);

const Player = (playerMarker) => {
    const marker = playerMarker;
};

playerX = Player('x');
playerO = Player('o');

displayController.startLoop();