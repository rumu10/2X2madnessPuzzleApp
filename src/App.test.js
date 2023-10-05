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
  let m = new Model()
  expect(m.currentConfig).toEqual(0)
});

test('validate move counter is deafult 0', () => {
  let m = new Model()
  expect(m.moveCount).toEqual(0)
});

test('validate move counter is deafult 0', () => {
  let m = new Model()
  expect(m.victory).toEqual(false)
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
  console.log('After rotation:', model.board.squares);

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