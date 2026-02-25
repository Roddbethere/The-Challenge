// FILE: shape-system/loggers.js
// LAYER: Infrastructure — knows WHERE to write. Knows nothing about math.

'use strict';

const fs = require('fs');   // Node.js built-in file system module

/**
 * "Abstract" base logger.
 * In JavaScript there's no real abstract keyword, so we throw if
 * a subclass forgets to implement the required methods.
 */
class ShapeLogger {
  /** @param {string} message */
  log(message) {
    throw new Error(`${this.constructor.name} must implement log(message).`);
  }

  /** @returns {string[]} */
  getHistory() {
    throw new Error(`${this.constructor.name} must implement getHistory().`);
  }
}

/** Writes to the terminal (console) and keeps an internal history. */
class ConsoleShapeLogger extends ShapeLogger {
  constructor() {
    super();
    this._history = [];   // private by convention
  }

  log(message) {
    console.log(message);        // The ONLY file allowed to use console.log
    this._history.push(message);
  }

  getHistory() {
    return [...this._history];   // Spread = return a copy, not the original array
  }
}

/** Appends to a text file using Node's fs module. */
class FileShapeLogger extends ShapeLogger {
  /** @param {string} filePath */
  constructor(filePath) {
    super();
    if (!filePath || !filePath.trim()) {
      throw new Error('filePath cannot be blank.');
    }
    this._filePath = filePath;
    this._history  = [];
  }

  log(message) {
    fs.appendFileSync(this._filePath, message + '\n', 'utf8');
    this._history.push(message);
  }

  getHistory() {
    return [...this._history];
  }
}

/** Stores messages in memory only. Zero I/O. Great for tests. */
class InMemoryShapeLogger extends ShapeLogger {
  constructor() {
    super();
    this._history = [];
  }

  log(message)  { this._history.push(message); }
  getHistory()  { return [...this._history]; }
}

module.exports = { ShapeLogger, ConsoleShapeLogger, FileShapeLogger, InMemoryShapeLogger };