import { Board, Square } from "../model/ModelInfo";

export default function processClick(model, canvas, x, y) {
    let sqArr = [];
    for (const square of model.board.squares){

        //top left
        let diagX = x-30;
        let diagY = y-30;

        if (diagX >= square?.column * 60 && diagX <= square?.column * 60 + 60) {
            if (diagY >= square?.row * 60 && diagY <= square?.row * 60 + 60) {
                sqArr.push(square)
            }
          }

          //Top right
           diagX = x+30;
            diagY = y-30;
        if (diagX >= square?.column * 60 && diagX <= square?.column * 60 + 60) {
            if (diagY >= square?.row * 60 && diagY <= square?.row * 60 + 60) {
                sqArr.push(square)
            }
        }
          //bottom right
          diagX = x+30;
          diagY = y+30;
        if (diagX >= square?.column * 60 && diagX <= square?.column * 60 + 60) {
            if (diagY >= square?.row * 60 && diagY <= square?.row * 60 + 60) {
                sqArr.push(square)
            }
          }

           //bottom left
           diagX = x-30;
           diagY = y+30;
        if (diagX >= square?.column * 60 && diagX <= square?.column * 60 + 60) {
            if (diagY >= square?.row * 60 && diagY <= square?.row * 60 + 60) {
                sqArr.push(square)
            }
          }
    }

    model.board.selectedGroup = sqArr;
    
}
