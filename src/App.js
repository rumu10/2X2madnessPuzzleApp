import React from 'react';
import './App.css';
import processClick from './controller/Controller.js';
import resetHandler from './controller/ResetController.js';
import redrawCanvas from './boundary/BoundaryClass';
import Model from './model/ModelInfo';
import { Col, Divider, Row } from 'antd';
import configChaneHandler from './controller/ConfigController';

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

    processClick(model, canvasRef.current, x, y)
    forceRedraw(redraw + 1)   // FORCE REDRAW
  }

  const rotateController = (direction) => {
    configChaneHandler(model, canvasRef.current, 5)
    forceRedraw(redraw + 1)   // FORCE REDRAW
  }

const configChaneHandler = (model, canvasObj, size) => {
    model.currentConfig = size;
    model.moveCount = model.moveCount + 1;

    // model.resetConfig(size,cnt );
    // console.log(model.moveCount)

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
            className="App-canvas"
            ref={canvasRef}
            width="600"
            height="400"
            onClick={handleClick}
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={{ display: 'flex' }}>
            <button className="config" onClick={(e) => configChaneHandler(model, canvasRef.current, 0)} > 4x4</button>
            <button className="config" onClick={(e) => configChaneHandler(model, canvasRef.current, 1)} > 5x5</button>
            <button className="config" onClick={(e) => configChaneHandler(model, canvasRef.current, 2)} >6x6</button>
          </div>
          Choose Config
          <br />
          <br />
          <br />
          <div>
            <button className="rotate" onClick={(e) => rotateController(true)} >ClockWise</button>

          </div>
          <br />
          <button className="rotate" onClick={(e) => rotateController(false)}>CounterClockWise</button>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div>
            Move Counter : {model.moveCount}
          </div>
        </Col>
      </Row>

    </div>
  );
}

export default App;

