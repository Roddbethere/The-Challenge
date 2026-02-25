// FILE: shape-system/main.js
// Composition Root — wires all layers together and runs the demo.

'use strict';

const { Circle, Rectangle, Triangle, Hexagon } = require('./shapes');
const { ConsoleShapeLogger }                   = require('./loggers');
const { ShapeService }                         = require('./ShapeService');

console.log('=== Shape System (Refactored) ===\n');

// To switch loggers, change ONLY this one line:
const logger = new ConsoleShapeLogger();
// const logger = new FileShapeLogger('./shapes.log');
// const logger = new InMemoryShapeLogger();

const service = new ShapeService(logger);

// No if/else chains — each shape knows its own formula
service.process(new Circle(5));
service.process(new Rectangle(4, 6));
service.process(new Triangle(3, 8));
service.process(new Hexagon(7));    // New shape — zero changes to ShapeService!

const history = logger.getHistory();
console.log(`\n--- History (${history.length} entries) ---`);
history.forEach(entry => console.log('  ' + entry));