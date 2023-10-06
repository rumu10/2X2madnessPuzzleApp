import React from 'react';
import './App.css';
import processClick from './controller/Controller.js';
import redrawCanvas from './boundary/BoundaryClass';
import Model from './model/ModelInfo';
import { Col, Row } from 'antd';
import rotateHandler from './controller/RotateController';

function App() {
  const [model, setModel] = React.useState(new Model())
  const [redraw, forceRedraw] = React.useState(0);

  const appRef = React.useRef(null);      // to be able to access "top level" app object
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas

  // identify WHAT STATE you monitor
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current)
  }, [model, redraw])

  const handleClick = (e) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();

    // normalizing RAW point into localized canvas coordinates.
    let x = e.clientX - canvasRect.left
    let y = e.clientY - canvasRect.top

    const firstValue = model.board.squares[0]['color'];

    const result = model.board.squares.every(item => item['color'] === firstValue);

    if (!result) processClick(model, canvasRef.current, x, y);

    model.checkAndRemoveGroups(model.board);

    forceRedraw(redraw + 1)   // FORCE REDRAW
  }

  const rotateController = (direction) => {

    const firstValue = model.board.squares[0]['color'];

    const result = model.board.squares.every(item => item['color'] === firstValue);

    if (!result) {
      rotateHandler(model, canvasRef.current, direction);
      model.moveCount = model.moveCount + 1;
      // Check and remove groups

      forceRedraw(redraw + 1);
    }

    console.log(model.board.squares);
  }

  const configChaneHandler = (model, canvasObj, size) => {
    model.chooseConfig(size);
    model.moveCount = 0;
    forceRedraw(redraw + 1)
}

const  resetHandler = ()=> {
  console.log(model)
  model.reset();
  forceRedraw(redraw + 1)
  
}


  return (
    <div className="App">
      <Row>
        <Col className="gutter-row" span={12}>
          <button className="reset_button" onClick={(e) => resetHandler(model, canvasRef.current)} >Reset</button>
          <canvas tabIndex="1"
            data-testid="canvas"
            className="App-canvas"
            ref={canvasRef}
            width="600"
            height="450"
            onClick={handleClick}
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={{ display: 'flex' }}>
            <button className="config" data-testid="config" onClick={(e) => configChaneHandler(model, canvasRef.current, 0)} > 4x4</button>
            <button className="config" onClick={(e) => configChaneHandler(model, canvasRef.current, 1)} > 5x5</button>
            <button className="config" onClick={(e) => configChaneHandler(model, canvasRef.current, 2)} >6x6</button>
          </div>
          Choose Config
          <br />
          <br />
          <br />
          <div>
            <button className="rotate"   data-testid="rotateCw" onClick={(e) => rotateController(true)} >ClockWise</button>

          </div>
          <br />
          <button className="rotate" data-testid="rotateCcw" onClick={(e) => rotateController(false)}>CounterClockWise</button>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div data-testid="moveCount">
            Move Counter : {model.moveCount}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div style={{ color: 'green', fontSize: '20px', fontWeight: 'bold' }}>{model.victory ? "Congratulations! You solved the puzzle!!" : null}</div>
        </Col>
      </Row>
    </div>
  );
}

export default App;

