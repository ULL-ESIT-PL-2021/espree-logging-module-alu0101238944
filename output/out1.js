let escodegen = require('escodegen');
let esprima = require('espree');
let estraverse = require('estraverse');
function addLogging(code) {
    console.log(`Entering addLogging(${ code }) at line 5`);
    let ast = esprima.parse(code);
    estraverse.traverse(ast, {
        enter: function (node, parent) {
            console.log(`Entering <anonymous function>(${ node },${ parent }) at line 8`);
            if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                addBeforeCode(node);
            }
        }
    });
    return escodegen.generate(ast);
}
function addBeforeCode(node) {
    console.log(`Entering addBeforeCode(${ node }) at line 18`);
    let name = node.id ? node.id.name : '<anonymous function>';
    let beforeCode = `console.log('Entering ${ name }()');`;
    let beforeNodes = esprima.parse(beforeCode).body;
    node.body.body = beforeNodes.concat(node.body.body);
}
const input = `
function foo(a, b) {
  var x = 'blah';
  var y = (function () {
    return 3;
  })();
}
foo(1, 'wut', 3);
`;
const output = addLogging(input);
console.log(`input:\n${ input }\n---`);
console.log(`output:\n${ output }\n---`);