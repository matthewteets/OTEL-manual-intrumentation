/* Dice function library */

// Initializes a tracer called 'dice-lib'
const { trace } = require('@opentelemetry/api');
const tracer = trace.getTracer('dice-lib');

function rollOnce(i, min, max) {
    // Then create child span
    return tracer.startActiveSpan(`rollOnce:${i}`, (span) => {
      const result = Math.floor(Math.random() * (max - min) + min);
      // Child span end
      span.end();
      return result;
    });
  }
  
  function rollTheDice(rolls, min, max) {
    // Create parent span
    return tracer.startActiveSpan('rollTheDice', (parentSpan) => {
      const result = [];
      for (let i = 0; i < rolls; i++) {
        result.push(rollOnce(i, min, max));
      }
      // Parent span ends
      parentSpan.end();
      return result;
    });
  }

  module.exports = { rollTheDice };

