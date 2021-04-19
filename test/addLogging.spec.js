/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 *
 * @author J. Daniel Escánez
 */

'use strict';

const {expect} = require('chai');
const {addLogging} = require('../src/addLogging.js');

describe('main tests', () => {
  const emptyArrowFunction = `() => {}`;
  const arrowFunction = 
      `const arrowFunctionExpression = (x) => {  
        return x + 1; 
      }`;
  const emptyFunctionDeclaration = `function fDeclaration() {}`;
  const functionDeclaration = 
      `function fDeclaration(x) {  
        return x + 2; 
      }`;
  const emptyFunctionExpression = 
      `(function fExpression() {}) ()`;
  const functionExpression = 
      `(function fExpression(x) { return x + 3; }) (2)`;
  const emptyIdFunctionExpression = 
      `(function (x) { return x + 3; }) (2)`;
  
  describe('ArrowFunction', () => {
    it('Función vacía', () => {
      expect(addLogging(emptyArrowFunction))
          .to.be.equal('() => {\n    console.log(`Entering <anonymous function>() at line 1`);\n};')
    });
    it('Función ejemplo README.md', () => {
      expect(addLogging(arrowFunction))
          .to.be.equal('const arrowFunctionExpression = x => {\n    console.log(' +
          '`Entering <anonymous function>(${ x }) at line 1`);\n    return x + 1;\n};')
    });
  });
  describe('FunctionDeclaration', () => {
    it('Función vacía', () => {
      expect(addLogging(emptyFunctionDeclaration))
          .to.be.equal('function fDeclaration() {\n    console.log(`Entering fDeclaration() at line 1`);\n}')
    });
    it('Función ejemplo README.md', () => {
      expect(addLogging(functionDeclaration))
          .to.be.equal('function fDeclaration(x) {\n    console.log(`Entering ' +
          'fDeclaration(${ x }) at line 1`);\n    return x + 2;\n}')
    });
  });
  describe('FunctionDeclaration', () => {
    it('Función vacía', () => {
      expect(addLogging(emptyFunctionExpression))
          .to.be.equal('(function fExpression() {\n    console.log(`Entering fExpression() at line 1`);\n}());')
    });
    it('Función ejemplo README.md', () => {
      expect(addLogging(functionExpression))
          .to.be.equal('(function fExpression(x) {\n    console.log(`Entering fExpression(${ x }) at line 1`);\n    return x + 3;\n}(2));')
    });
    it('Función ejemplo README.md (sin id)', () => {
      expect(addLogging(emptyIdFunctionExpression))
          .to.be.equal('(function (x) {\n    console.log(`Entering <anonymous function>(${ x }) at line 1`);\n    return x + 3;\n}(2));')
    });
  });
});
