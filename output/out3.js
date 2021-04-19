'uses strict';
const score = (diceThrows, category) => {
    console.log(`Entering <anonymous function>(${ diceThrows },${ category }) at line 22`);
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
const countValueRepetition = (diceThrows, value) => {
    console.log(`Entering <anonymous function>(${ diceThrows },${ value }) at line 59`);
    let cnt = 0;
    for (let i = 0; i < diceThrows.length; i++)
        if (diceThrows[i] == value)
            cnt++;
    return cnt * value;
};
const fullHouse = diceThrows => {
    console.log(`Entering <anonymous function>(${ diceThrows }) at line 71`);
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
            } else {
                if (diceThrows[i] === secondValue)
                    cnt2++;
                else
                    return 0;
            }
        }
    }
    const isValid = cnt1 === 3 && cnt2 === 2 || cnt1 === 2 && cnt2 === 3;
    const punctuation = cnt1 * firstValue + cnt2 * secondValue;
    return isValid ? punctuation : 0;
};
const fourOfAKind = diceThrows => {
    console.log(`Entering <anonymous function>(${ diceThrows }) at line 100`);
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
            } else {
                if (diceThrows[i] === secondValue)
                    cnt2++;
                else
                    return 0;
            }
        }
    }
    if (cnt1 >= 4)
        return firstValue * 4;
    if (cnt2 >= 4)
        return secondValue * 4;
    return 0;
};
const choice = diceThrows => {
    console.log(`Entering <anonymous function>(${ diceThrows }) at line 130`);
    let points = 0;
    for (let i = 0; i < diceThrows.length; i++)
        points += diceThrows[i];
    return points;
};
const yacht = diceThrows => {
    console.log(`Entering <anonymous function>(${ diceThrows }) at line 142`);
    for (let i = 1; i < diceThrows.length; i++)
        if (diceThrows[i] !== diceThrows[0])
            return 0;
    return 50;
};
const littleStraight = diceThrows => {
    console.log(`Entering <anonymous function>(${ diceThrows }) at line 154`);
    return diceThrows.indexOf(1) >= 0 && diceThrows.indexOf(2) >= 0 && diceThrows.indexOf(3) >= 0 && diceThrows.indexOf(4) >= 0 && diceThrows.indexOf(5) >= 0 ? 30 : 0;
};
const bigStraight = diceThrows => {
    console.log(`Entering <anonymous function>(${ diceThrows }) at line 164`);
    return diceThrows.indexOf(2) >= 0 && diceThrows.indexOf(3) >= 0 && diceThrows.indexOf(4) >= 0 && diceThrows.indexOf(5) >= 0 && diceThrows.indexOf(6) >= 0 ? 30 : 0;
};