'use strict';
const keep = (list, condition) => {
    console.log(`Entering <anonymous function>(${ list },${ condition }) at line 22`);
    let keepList = [];
    for (let i = 0; i < list.length; i++)
        if (condition(list[i]))
            keepList.push(list[i]);
    return keepList;
};
const discard = (list, condition) => {
    console.log(`Entering <anonymous function>(${ list },${ condition }) at line 36`);
    let discardList = [];
    for (let i = 0; i < list.length; i++)
        if (!condition(list[i]))
            discardList.push(list[i]);
    return discardList;
};