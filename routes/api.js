'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    if (!puzzle || !coordinate || !value) {
      res.json({ error: 'Required field(s) missing' });
      return;
    }
    if (solver.validate(puzzle) !== 'Valid') {
      res.json({ error: solver.validate(puzzle) });
      return;
    }
    const row = coordinate.split('')[0];
    const column = coordinate.split('')[1];
    if (
      coordinate.length !== 2 ||
      !/[a-i]/i.test(row) ||
      !/[1-9]/i.test(column) 
    ) {
      console.log('Invalid coordinate :>> ');
      res.json({ error: 'Invalid coordinate' });
      return;
    }
    if (!/^[1-9]$/.test(value)) {
      res.json({ error: 'Invalid value' });
      return;
    }
  }); 

  app.route('/api/solve').post((req, res) => {
    const puzzle = req.body.puzzle;
    if (solver.validate(puzzle) !== 'Valid') {

    }
  });
};
