const PEG = require('pegjs');

const grammar = `
{
  const flatten = require('underscore').flatten;
}

program = e:expr? rest:(('.' [\\n ]* e:expr){ return e; })*
          { return [e].concat(rest).join('\\n'); }

expr
  = t:term rest:([-+] term)* { return flatten(t.concat(rest)); }
  / decl

decl = id:ident ' := ' e:expr
     { return 'let ' + id + ' = ' + e.join('') + ';'; }

ident = (digit / letter / '_')+

digit = [0-9]

letter = [a-zA-Z]

term
  = factor ([*/] factor)*

factor
  = '(' expr ')' / number

number
  = digits:digit+ { return digits.join(''); }
`;

const parser = PEG.buildParser(grammar, {
    trackLineAndColumn: true
});

console.log(parser.parse("x := 2+5. y := 3"));
