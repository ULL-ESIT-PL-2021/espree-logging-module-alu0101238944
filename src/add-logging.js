/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 *
 * @author J. Daniel Escánez
 */

const escodegen = require('escodegen');
const espree = require('espree');
const estraverse = require('estraverse');

module.exports = {
  /**
   * @desc Se parsea el código con la última versión de ecma, indicando que se requiere la 
   * información acerca de las líneas que aparacen; se recorre el árbol, y para cada
   * nodo con el tipo indicado se llama a addBeforeCode
   * @param {string} code
   * @return El código del arbol generado
   */
  addLogging: function(code, pattern) {
    const ast = espree.parse(code, {ecmaVersion: espree.latestEcmaVersion, loc: true});
    estraverse.traverse(ast, {
      enter: function(node, parent) {
        // Se ha creído conveniente utilizar un switch en lugar de un if
        switch (node.type) {
          case 'FunctionDeclaration':
          case 'FunctionExpression':
          case 'ArrowFunctionExpression':
            if (!pattern || pattern === node.type || new RegExp(pattern).test(node.type)) {
              addBeforeCode(node);
            }
        }
      }
    });
    return escodegen.generate(ast);
  }
}

/**
 * Inserta antes del node el array de árboles que nos interesa
 * @param {Object} node 
 */
function addBeforeCode(node) {
  // Si existe un id para este node, el nombre será el nombre de ese id
  // eoc: se trata de una función anónima
  const name = node.id ? node.id.name : '<anonymous function>';
  // Cada parámetro del nodo [a, b, c, ...] lo formateo [${a}, ${b}, ${c}, ...]
  const parameters = node.params.map(param => `\$\{${param.name}\}`);
  // beforeCode guarda el console log con el nombre de la función, los parámetros y la línea
  const beforeCode = `console.log(\`Entering ${name}(${parameters}) at line ${node.loc.start.line}\`);`;
  // Parseo la cadena anterior (solo me interesa el body [array de ASTs], 
  // no todo el program) (se usa ecmaVersion 6 para las ``)
  const beforeNodes = espree.parse(beforeCode, { ecmaVersion: 6 }).body;
  // Concatenamos el array de árboles anterior con el del nodo
  node.body.body = beforeNodes.concat(node.body.body);
}
