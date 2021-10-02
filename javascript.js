const gameBoard = (() => {
    let board = [["", "", ""], ["", "",""], ["", "", ""]];

    const checkIfCellAvailable = (location) => {
        if (board[location[0]][location[1]] == "")
            return true
        else
            return false
    };

    const addMarker = (markerInput, location) => {
        console.log(`addMarker called, location: ${location}`);
        
        board[location[0]][location[1]] = markerInput;
    };

    const itemsEqualTo = (arr, value) => {
        return arr.every(item => item === value);
    };

    const checkIfWin = (mark) => {
        if (itemsEqualTo(board[0], mark) ||
            (itemsEqualTo(board[1], mark)) ||
            (itemsEqualTo(board[2], mark)) ||
            (board[0][0] == mark) && (board[1][0] == mark) && (board[2][0] == mark) ||
            (board[0][1] == mark) && (board[1][1] == mark) && (board[2][1] == mark) ||
            (board[0][2] == mark) && (board[1][2] == mark) && (board[2][2] == mark) ||
            (board[0][0] == mark) && (board[1][1] == mark) && (board[2][2] == mark) ||
            (board[0][2] == mark) && (board[1][1] == mark) && (board[2][0] == mark)) {
            console.log(`win`);
            return true
        } else {
            return false
        }
    };

    const checkIfTie = () => {
        // return board.every(row => (row.every(cell => cell != "")))
        if (board.every(row => (row.every(cell => cell != "")))) {
            console.log("tie");
            return true
        } else {
            console.log("false returned");
            return false
        }
    };

    const restartBoard = () => {
        return board = [["", "", ""], ["", "",""], ["", "", ""]];
    };
    
    return {
        // For testing purposes return board
        board,
        addMarker,
        checkIfCellAvailable,
        checkIfWin,
        itemsEqualTo,
        checkIfTie,
        restartBoard
    };
})();

const restartBtn = (() => {
    const btn = document.querySelector(".restart-btn");
    btn.addEventListener("click", () => pressed());

    const pressed = () => {
        gameBoard.board = gameBoard.restartBoard();
        hide();
        displayController.restartBoard();
    };

    const show = () => {
        btn.style.display = "block";
    };

    const hide = () => {
        btn.style.display = "none";
    };

    return {
        show,
        hide
    }
})();

const displayController = ((gameBoard) => {
    const boardCells = document.querySelectorAll(".cell");
    const markerOptions = ['x', 'o'];
    let currentMarker = markerOptions[0];
    let gameOver = false;

    const startLoop = () => {
        addClickListeners(boardCells);
    };
    
    const addPlay = (cell, marker) => {
        if (gameOver) {
            return false
        }
        
        let location = cell.dataset.location.split(",");
        if (!gameBoard.checkIfCellAvailable(location))
            return null
        
        gameBoard.addMarker(marker, location)
        addMarkerToCell(cell, marker)
        changeCurrentMarker();
        
        if (gameBoard.checkIfWin(marker) || gameBoard.checkIfTie()) {
            restartBtn.show();
            gameOver = true;
            console.log("gameover or tie");
        }
    };

    const addMarkerToCell = (cell, marker) => {
        cell.textContent = marker;
    };

    const changeCurrentMarker = () => {
        if (currentMarker == markerOptions[0])
            currentMarker = markerOptions[1];
        else
            currentMarker = markerOptions[0];
    };

    const addClickListeners = (cells) => {
        cells.forEach(cell => {
            cell.addEventListener('click', () => addPlay(cell, currentMarker));
        });
    };

    const restartBoard = () => {
        boardCells.forEach(cell => {addMarkerToCell(cell, "")});
        gameOver = false;
    };

    return {
        // Return boardCells for testing purposes only
        boardCells,
        startLoop,
        restartBoard
    }
})(gameBoard);

const Player = (playerMarker) => {
    const marker = playerMarker;
};

playerX = Player('x');
playerO = Player('o');

displayController.startLoop();