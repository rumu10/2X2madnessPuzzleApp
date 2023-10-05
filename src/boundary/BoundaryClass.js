export default function redrawCanvas(model, canvasObj, appObj) {
    const ctx = canvasObj.getContext('2d');

    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);  // assume square region

    // DRAW SQUARES....

    for (const square of model.board.squares) {
        ctx.fillStyle = square?.color;
        ctx.fillRect(square?.column * 60, square?.row * 60, 60, 60);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2.8;
        ctx.strokeRect(square?.column * 60, square?.row * 60, 60, 60);
    }

    // DRAW SELECTED GROUP (if any)
    const selectedGroup = model.board.selectedGroup; // Replace with the actual selected group from your model
    if (selectedGroup.length > 0) {

        for (const square of selectedGroup) {
            ctx.fillStyle = square?.color;
            ctx.fillRect(square?.column * 60, square?.row * 60, 60, 60);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 5;
            ctx.strokeRect(square?.column * 60, square?.row * 60, 60, 60);

        }

    }


    // DRAW CIRCLES
    for (let row = 0; row < model.board.size - 1; row++) {
        for (let col = 0; col < model.board.size - 1; col++) {

            const centerX = col * 60 + 30;
            const centerY = row * 60 + 30;
            const radius = 7;

            let checkSelectedCircle;

            if (selectedGroup.length > 0) { checkSelectedCircle = true; }
            else { checkSelectedCircle = false }

            for (const square of selectedGroup) {
                if (!(square.row === row || square.row === row + 1))
                    checkSelectedCircle = false;
                if (!(square.column === col || square.column === col + 1))
                    checkSelectedCircle = false;

            }

            ctx.beginPath();
            ctx.arc(centerX + 30, centerY + 30, radius, 0, 2 * Math.PI, false);
            if (checkSelectedCircle)
                ctx.fillStyle = 'red';
            else
                ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.fill();
            ctx.stroke();
        }
    }


    if (appObj) {
        appObj.forceRedraw(prevRedraw => prevRedraw + 1);
    }

}
