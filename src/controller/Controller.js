import { Board, Square } from "../model/ModelInfo";

export default function processClick(model, canvas, x, y) {
    let sqArr = [];
    for (const square of model.board.squares){

        //top left
        let diagX = x-30;
        let diagY = y-30;

        if (diagX >= square.row*60  && diagX <= square.row*60 +60) {
            if(diagY >= square.column*60  && diagY <= square.column*60 +60){
                console.log(diagX,y,square.row,square.row*60+60, square); 
                sqArr.push(square)
            }
          }

          //Top right
           diagX = x+30;
            diagY = y-30;
          if (diagX >= square.row*60  && diagX <= square.row*60 +60) {
            if(diagY >= square.column*60  && diagY <= square.column*60 +60){
                console.log(diagX,y,square.row,square.row*60+60, square);
                sqArr.push(square) 
            }
          }

          //bottom right
          diagX = x+30;
          diagY = y+30;
          if (diagX >= square.row*60  && diagX <= square.row*60 +60) {
            if(diagY >= square.column*60  && diagY <= square.column*60 +60){
                console.log(diagX,y,square.row,square.row*60+60, square);
                sqArr.push(square) 
            }
          }

           //bottom left
           diagX = x-30;
           diagY = y+30;
          if (diagX >= square.row*60  && diagX <= square.row*60 +60) {
            if(diagY >= square.column*60  && diagY <= square.column*60 +60){
                console.log(diagX,y,square.row,square.row*60+60, square);
                sqArr.push(square) 
            }
          }
    }

    console.log(model);
    model.board.selectedGroup = sqArr;
    
}
