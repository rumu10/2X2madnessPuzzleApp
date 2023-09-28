export default function configChaneHandler(model, canvasObj, size) {
    model.currentConfig = size;
    let cnt  = model.moveCount + 1;

    model.resetConfig(size,cnt );
    console.log(model.moveCount)

}
