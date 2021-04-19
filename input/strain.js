/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author J. Daniel Escánez
 * @date 8 Mar 2020
 *
 * @see https://exercism.io/my/solutions/72694d2a53af4dc393fb61f5fb4ede86
 */

'use strict';

/**
 * @desc Returns a new collection containing those
 *     elements where the predicate is true
 * @param {Array<number>} list
 * @param {number} condition
 * @return {Array<number>}
 */
const keep = (list, condition) => {
  let keepList = [];
  for (let i = 0; i < list.length; i++)
    if (condition(list[i])) keepList.push(list[i]);
  return keepList;
};

/**
 * @desc Returns a new collection containing those 
 *     elements where the predicate is false
 * @param {Array<number>} list
 * @param {number} condition
 * @return {Array<number>}
 */
const discard = (list, condition) => {
  let discardList = [];
  for (let i = 0; i < list.length; i++)
    if (!condition(list[i])) discardList.push(list[i]);
  return discardList;
};
