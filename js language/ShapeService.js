// FILE: shape-system/ShapeService.js
// LAYER: Service — thin coordinator. No math. No console. No document.

'use strict';

const { Shape }       = require('./shapes');    // Domain
const { ShapeLogger } = require('./loggers');   // Infrastructure abstraction

class ShapeService {
  /**
   * @param {ShapeLogger} logger  Any logger that extends ShapeLogger
   */
  constructor(logger) {
    if (!logger || typeof logger.log !== 'function') {
      throw new TypeError('logger must be a ShapeLogger instance.');
    }
    this._logger = logger;
  }

  /**
   * Calculates the area of the shape and logs the result.
   * @param {Shape} shape
   * @returns {number} the computed area
   */
  process(shape) {
    if (!(shape instanceof Shape)) {
      throw new TypeError('shape must be an instance of Shape.');
    }

    const area  = shape.calculateArea();           // Domain does the math
    const ts    = new Date().toISOString()
                    .replace('T', ' ').slice(0, 19);
    const entry = `[${ts}] ${shape.shapeType}: area = ${area.toFixed(4)}`;
    this._logger.log(entry);                       // Infrastructure does the output

    return area;
  }
}

module.exports = { ShapeService };