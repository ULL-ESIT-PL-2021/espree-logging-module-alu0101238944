/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author J. Daniel Escánez
 * @date 8 Mar 2020
 * @desc A program that evaluates the puntuation in the dice game Yacht
 *
 * @see https://exercism.io/my/solutions/963688a35bd246869430183957cc3a83
 */

'uses strict';

/**
 * @desc The numeric evaluation by the category
 * @param {Object} diceThrows An array with five dice rolled
 * @param {string} category The rule that decides how they score
 * @return {number}
 */
const score = (diceThrows, category) => {
  switch (category) {
    case 'ones':
      return countValueRepetition(diceThrows, 1);
    case 'twos':
      return countValueRepetition(diceThrows, 2);
    case 'threes':
      return countValueRepetition(diceThrows, 3);
    case 'fours':
      return countValueRepetition(diceThrows, 4);
    case 'fives':
      return countValueRepetition(diceThrows, 5);
    case 'sixes':
      return countValueRepetition(diceThrows, 6);
    case 'full house':
      return fullHouse(diceThrows);
    case 'four of a kind':
      return fourOfAKind(diceThrows);
    case 'little straight':
      return littleStraight(diceThrows);
    case 'big straight':
      return bigStraight(diceThrows);
    case 'choice':
      return choice(diceThrows);
    case 'yacht':
      return yacht(diceThrows);
    default:
      throw new Error('Category not found');
  }
};

/**
 * @desc Counts the number of repetitions
 * @param {Object} diceThrows An array with five dice rolled
 * @param {number} value The number to count
 * @return {number}
 */
const countValueRepetition = (diceThrows, value) => {
  let cnt = 0;
  for (let i = 0; i < diceThrows.length; i++)
    if (diceThrows[i] == value) cnt++;
  return cnt * value;
};

/**
 * @desc The puntuation by fullHouse
 * @param {Object} diceThrows An array with five dice rolled
 * @return {number}
 */
const fullHouse = (diceThrows) => {
  let cnt1 = 1;
  let cnt2 = 0;
  const firstValue = diceThrows[0];
  let secondValue = 0;
  for (let i = 1; i < diceThrows.length; i++) {
    if (diceThrows[i] === firstValue) {
      cnt1++;
    } else {
      if (secondValue === 0) {
        secondValue = diceThrows[i];
        cnt2++;
      }
      else {
        if (diceThrows[i] === secondValue) cnt2++;
        else return 0;
      }
    } 
  }
  const isValid = cnt1 === 3 && cnt2 === 2 || cnt1 === 2 && cnt2 === 3;
  const punctuation = cnt1 * firstValue + cnt2 * secondValue;
  return isValid ? punctuation : 0;
};

/**
 * @desc The puntuation by fourOfAKind
 * @param {Object} diceThrows An array with five dice rolled
 * @return {number}
 */
const fourOfAKind = (diceThrows) => {
  let cnt1 = 1;
  let cnt2 = 0;
  let firstValue = diceThrows[0];
  let secondValue = 0;
  for (let i = 1; i < diceThrows.length; i++) {
    if (diceThrows[i] === firstValue) {
      cnt1++;
    } else {
      if (secondValue === 0) {
        secondValue = diceThrows[i];
        cnt2++;
      }
      else {
        if (diceThrows[i] === secondValue) cnt2++;
        else return 0;
      }
    } 
  }
  if (cnt1 >= 4) return firstValue * 4;  
  if (cnt2 >= 4) return secondValue * 4;
  return 0;
};


/**
 * @desc The puntuation by choice
 * @param {Object} diceThrows An array with five dice rolled
 * @return {number}
 */
const choice = (diceThrows) => {
  let points = 0;
  for (let i = 0; i < diceThrows.length; i++)
    points += diceThrows[i];
  return points;
};

/**
 * @desc The puntuation by yacht
 * @param {Object} diceThrows An array with five dice rolled
 * @return {number}
 */
const yacht = (diceThrows) => {
  for (let i = 1; i < diceThrows.length; i++)
    if (diceThrows[i] !== diceThrows[0])
      return 0;
  return 50;
};

/**
 * @desc The puntuation by littleStraight
 * @param {Object} diceThrows An array with five dice rolled
 * @return {number}
 */
const littleStraight = (diceThrows) => {
  return diceThrows.indexOf(1) >= 0 && diceThrows.indexOf(2) >= 0 && diceThrows.indexOf(3) >= 0 && 
    diceThrows.indexOf(4) >= 0 && diceThrows.indexOf(5) >= 0 ? 30 : 0;
};

/**
 * @desc The puntuation by bigStraight
 * @param {Object} diceThrows An array with five dice rolled
 * @return {number} 
 */
const bigStraight = (diceThrows) => {
  return diceThrows.indexOf(2) >= 0 && diceThrows.indexOf(3) >= 0 && diceThrows.indexOf(4) >= 0 &&
    diceThrows.indexOf(5) >= 0 && diceThrows.indexOf(6) >= 0 ? 30 : 0;
};
