// FILE: shape-system/shapes.js
// LAYER: Domain — pure math. No console.log. No document. No require('./loggers').

'use strict';

/**
 * Abstract base class for all shapes.
 * Calling new Shape() directly will throw.
 */
class Shape {
  get shapeType() {
    throw new Error(`${this.constructor.name} must implement shapeType getter.`);
  }

  calculateArea() {
    throw new Error(`${this.constructor.name} must implement calculateArea().`);
  }

  toString() {
    return `${this.shapeType}: area = ${this.calculateArea().toFixed(4)}`;
  }
}

class Circle extends Shape {
  /** @param {number} radius */
  constructor(radius) {
    super();
    // Protect the invariant: negative radius is nonsense
    if (typeof radius !== 'number' || radius <= 0) {
      throw new RangeError(`Radius must be a positive number. Got: ${radius}`);
    }
    this._radius = radius;  // _radius = private by convention
  }

  get shapeType() { return 'Circle'; }
  get radius()    { return this._radius; }  // read-only access

  calculateArea() {
    return Math.PI * this._radius ** 2;
  }
}

class Rectangle extends Shape {
  /** @param {number} width @param {number} height */
  constructor(width, height) {
    super();
    if (typeof width  !== 'number' || width  <= 0) throw new RangeError(`Width must be > 0. Got: ${width}`);
    if (typeof height !== 'number' || height <= 0) throw new RangeError(`Height must be > 0. Got: ${height}`);
    this._width  = width;
    this._height = height;
  }

  get shapeType() { return 'Rectangle'; }
  calculateArea() { return this._width * this._height; }
}

class Triangle extends Shape {
  /** @param {number} base @param {number} height */
  constructor(base, height) {
    super();
    if (typeof base   !== 'number' || base   <= 0) throw new RangeError(`Base must be > 0. Got: ${base}`);
    if (typeof height !== 'number' || height <= 0) throw new RangeError(`Height must be > 0. Got: ${height}`);
    this._base   = base;
    this._height = height;
  }

  get shapeType() { return 'Triangle'; }
  calculateArea() { return 0.5 * this._base * this._height; }
}

// ADDING A NEW SHAPE = add a class here. Nothing else in the project changes.
class Hexagon extends Shape {
  /** @param {number} sideLength */
  constructor(sideLength) {
    super();
    if (typeof sideLength !== 'number' || sideLength <= 0) {
      throw new RangeError(`Side length must be > 0. Got: ${sideLength}`);
    }
    this._sideLength = sideLength;
  }

  get shapeType() { return 'Hexagon'; }
  calculateArea() {
    return (3 * Math.sqrt(3) / 2) * this._sideLength ** 2;
  }
}

// Export all classes so other files can import them
module.exports = { Shape, Circle, Rectangle, Triangle, Hexagon };