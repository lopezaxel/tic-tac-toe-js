const gameboard = (() => {
    let board = [["", "", ""], ["", "",""], ["", "", ""]];

    const checkIfMarkerAvailable = (location) => {
        if (board[location[0]][location[1]] == "")
            return true
        else
            return false
    };

    const addMarker = (marker, location) => {
        if (!checkIfMarkerAvailable(location))
            return null

        return board[location[0]][location[1]] = marker;
    };
    
    return {
        // For testing purposes return board
        board,
        addMarker
    };
})();