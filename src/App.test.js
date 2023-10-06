import Model, { Board, Square } from './model/ModelInfo'
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { mockMatchMedia } from './setupTests';
import rotateHandler from './controller/RotateController';


beforeAll(() => {
  mockMatchMedia();
});

test('validate config is default one', () => {
  let m = new Model();
  expect(m.currentConfig).toEqual(0);
});

test('validate move counter is deafult 0', () => {
  let m = new Model();
  expect(m.moveCount).toEqual(0);
});

test('validate move counter is deafult 0', () => {
  let m = new Model();
  expect(m.victory).toEqual(false);
});


test('renders learn react link', () => {
  const { getByText } = render(<App />);

  const canvasElement = screen.getByTestId('canvas');
  fireEvent.click(canvasElement, {
    clientX: 70, clientY: 69, screenX: 1637,
    screenY: 269
  })

});

test('areAllSquaresWhite returns true when all squares are white', () => {
  // Create a board with all white squares
  const whiteSquares = [
    { row: 0, column: 0, color: 'white' },
    { row: 0, column: 1, color: 'white' },
    // Add more white squares as needed
  ];
  let m = new Model()
  // Call the areAllSquaresWhite method
  const result = m.areAllSquaresWhite(whiteSquares);

  // Assert that the result is true
  expect(result).toBe(true);
});

test('renders learn react link', () => {
  const { getByText } = render(<App />);

  const canvasElement = screen.getByTestId('rotateCw');
  fireEvent.click(canvasElement, {
    clientX: 70, clientY: 69, screenX: 1637,
    screenY: 269
  })

});

test('renders learn react link', () => {
  const { getByText } = render(<App />);

  const canvasElement = screen.getByTestId('rotateCcw');
  fireEvent.click(canvasElement, {
    clientX: 70, clientY: 69, screenX: 1637,
    screenY: 269
  })

});

test('renders learn react link', () => {
  const { getByText } = render(<App />);

  const canvasElement = screen.getByTestId('moveCount');
  fireEvent.click(canvasElement, {
    clientX: 70, clientY: 69, screenX: 1637,
    screenY: 269
  })

});

test('renders learn react link', () => {
  const { getByText } = render(<App />);

  const canvasElement = screen.getByTestId('config');
  fireEvent.click(canvasElement, {
    clientX: 70, clientY: 69, screenX: 1637,
    screenY: 269
  })

});

test('should rotate the selected group clockwise', () => {
  const model = {
    board: new Board({
      numRows: '4',
      numColumns: '4',
      baseSquares: [
        { row: '0', column: '0', color: 'red' },
        { row: '0', column: '1', color: 'green' },
        { row: '1', column: '0', color: 'blue' },
        { row: '1', column: '1', color: 'yellow' },
        // Add more squares as needed for your initial configuration
      ],
    }),
  };

  // Create a mock selected group for testing rotation
  model.board.selectedGroup = [
    new Square(0, 0, 'red'),
    new Square(0, 1, 'green'),
    new Square(1, 0, 'blue'),
    new Square(1, 1, 'yellow'),
  ];

  // Call rotateHandler with the clockwise direction
  rotateHandler(model, {}, true);

  expect(model.board.selectedGroup).toEqual([
    new Square(0, 1, 'red'),
    new Square(1, 1, 'green'),
    new Square(0, 0, 'blue'),
    new Square(1, 0, 'yellow') // Expected rotated positions and colors

  ]);

  expect(model.board.squares).toEqual([
    { row: 0, column: 0, color: 'blue' },
    { row: 0, column: 1, color: 'red' },
    { row: 1, column: 0, color: 'blue' },
    { row: 1, column: 1, color: 'yellow' },
    { row: 1, column: 0, color: 'yellow' },
    { row: 1, column: 1, color: 'green' }
  ]);
});

test('should rotate the selected group counter clockwise', () => {
  const model = {
    board: new Board({
      numRows: '4',
      numColumns: '4',
      baseSquares: [
        { row: '0', column: '0', color: 'red' },
        { row: '0', column: '1', color: 'green' },
        { row: '1', column: '0', color: 'blue' },
        { row: '1', column: '1', color: 'yellow' },
        // Add more squares as needed for your initial configuration
      ],
    }),
  };

  // Create a mock selected group for testing rotation
  model.board.selectedGroup = [
    new Square(0, 0, 'red'),
    new Square(0, 1, 'green'),
    new Square(1, 0, 'blue'),
    new Square(1, 1, 'yellow'),
  ];

  // Call rotateHandler with the clockwise direction
  rotateHandler(model, {}, false);
  console.log(model.board.squares)

  expect(model.board.selectedGroup).toEqual(
    [
      { row: 1, column: 0, color: 'red' },
      { row: 0, column: 0, color: 'green' },
      { row: 1, column: 1, color: 'blue' },
      { row: 0, column: 1, color: 'yellow' }
    ]);

  expect(model.board.squares).toEqual([
    { row: 0, column: 0, color: 'green' },
    { row: 0, column: 1, color: 'yellow' },
    { row: 1, column: 0, color: 'blue' },
    { row: 1, column: 1, color: 'yellow' },
    { row: 1, column: 0, color: 'red' },
    { row: 1, column: 1, color: 'blue' }
  ]);
});


test('should return true when all colors are white', () => {
  const model = new Model(); // Create an instance of your Model
  // Set up the board with squares of the same color (e.g., 'red')
  model.board.squares = [
    { row: 0, column: 0, color: 'white' },
    { row: 0, column: 1, color: 'white' },
    { row: 1, column: 0, color: 'white' },
    { row: 1, column: 1, color: 'white' },
  ];

  const result = model.areAllSquaresWhite(model.board.squares);
  console.log(result);

  expect(result).toBe(true);
});

test('should change the currentConfig when choosing a configuration', () => {
  const model = new Model();
  model.chooseConfig(1); // Choose a configuration
  model.reset();
  expect(model.currentConfig).toBe(0);
  expect(model.victory).toBe(false);
  expect(model.isRemoved).toBe(false);
  expect(model.moveCount).toBe(0);


  model.board = new Board({
    numRows: '4',
    numColumns: '4',
    baseSquares: [
      { row: '0', column: '0', color: 'red' },
      { row: '0', column: '1', color: 'red' },
      { row: '1', column: '0', color: 'red' },
      { row: '1', column: '1', color: 'red' },
    ],
  });

  // Call the checkAndRemoveGroups method
  model.checkAndRemoveGroups(model.board);


  const isAllWhite = model.board.squares.every((square) => square.color === 'white');
  expect(isAllWhite).toBe(true);
});