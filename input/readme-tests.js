/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 *
 * @author J. Daniel Escánez
 */

/**
 * Ejemplo ArrowFunctionExpression
 * @param {number} x
 * @return {number} x + 1
 */
const arrowFunctionExpression = (x) => {
  return x + 1;
}
/**
 * Ejemplo FunctionDeclaration
 * @param {number} x
 * @return {number} x + 2
 */
function fDeclaration(x) {
  return x + 2;
}
/**
 * Ejemplo FunctionExpression
 * @param {number} x
 * @return {number} x + 3
 */
(function fExpression(x) { return x + 3; }) (2);
/**
 * Ejemplo FunctionExpression (empty id)
 * @param {number} x
 * @return {number} x + 3
 */
(function (x) { return x + 3; }) (2);
