export default function redrawCanvas(model, canvasObj, appObj) {
    const ctx = canvasObj.getContext('2d');

    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);  // assume square region

    // DRAW SQUARES....

    for (const square of model.board.squares) {
        ctx.fillStyle = square.color;
        ctx.fillRect(square.row * 60, square.column * 60, 60, 60);
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 5;
        ctx.strokeRect(square.row * 60, square.column * 60, 60, 60);
    }

    // DRAW SELECTED GROUP (if any)
    const selectedGroup = model.board.selectedGroup; // Replace with the actual selected group from your model
    if (selectedGroup.length > 0) {

        for (const square of selectedGroup) {
            ctx.fillStyle = square.color;
            ctx.fillRect(square.row * 60, square.column * 60, 60, 60);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 5;
            ctx.strokeRect(square.row * 60, square.column * 60, 60, 60);

        }


    }


    // DRAW CIRCLES
    for (let row = 0; row < model.board.size - 1; row++) {
        for (let col = 0; col < model.board.size - 1; col++) {

            const centerX = col * 60 + 30;
            const centerY = row * 60 + 30;
            const radius = 9;

            ctx.beginPath();
            ctx.arc(centerX + 30, centerY + 30, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'orange';
            ctx.fill();
            ctx.stroke();
        }
    }


    if (appObj) {
        appObj.forceRedraw(prevRedraw => prevRedraw + 1);
    }

}
