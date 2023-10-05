export default function rotateHandler(model, canvasObj, dir) {
    if (dir) {
        //CLOCKWISE
        // Determine the top-left corner of the selected group
        const minRow = Math.min(...model.board.selectedGroup.map((square) => square.row));
        const minColumn = Math.min(...model.board.selectedGroup.map((square) => square.column));

        const rotatedBoard = model.board.selectedGroup.map((square) => {
            const relativeRow = square.row - minRow;
            const relativeColumn = square.column - minColumn;
            const newRow = minRow + relativeColumn;
            const newColumn = minColumn + 1 - relativeRow; // Rotate clockwise
            return { ...square, row: newRow, column: newColumn };
        });


        // Remove the original selected squares from the board configuration
        for (const square of model.board.selectedGroup) {
            console.log(square)
            const index = square.row * model.board.size + square.column;
            model.board.squares[index] = null; // Set the square to null or some other value to indicate removal
        }

        // Update the board configuration array with the rotated squares
        for (const square of rotatedBoard) {
            const index = square.row * model.board.size + square.column;
            model.board.squares[index] = square;
        }

        // Clear the selectedGroup array and push the rotated squares into it
        model.board.selectedGroup.length = 0;
        model.board.selectedGroup.push(...rotatedBoard);

    } else {
        // Determine the top-left corner of the selected group
        const minRow = Math.min(...model.board.selectedGroup.map((square) => square.row));
        const minColumn = Math.min(...model.board.selectedGroup.map((square) => square.column));

        const rotatedBoard = model.board.selectedGroup.map((square) => {
            const relativeRow = square?.row - minRow;
            const relativeColumn = square?.column - minColumn;
            const newRow = minRow + 1 - relativeColumn;;
            const newColumn = minColumn + relativeRow; // Rotate clockwise
            return { ...square, row: newRow, column: newColumn };
        });

        // Update the entire board with the rotated squares
        model.board.selectedGroup.length = 0;
        model.board.selectedGroup = model.board.selectedGroup.concat(rotatedBoard)

        // Update the board configuration array with the rotated squares
        for (const square of rotatedBoard) {
            const index = square.row * model.board.size + square.column;
            model.board.squares[index] = square;
        }
    }

}
