# Práctica: Espree-logging. Fases de un compilador
### José Daniel Escánez Expósito - PE101
#### Procesadores de Lenguajes - Ingeniería Informática ULL

Para la realización de esta práctica se han seguido las instrucciones de [este enunciado](https://ull-esit-gradoii-pl.github.io/assets/temas/introduccion-a-javascript/creating-and-publishing-npm-module) y de la [clase grabada del profesor](https://www.youtube.com/watch?v=bEbRd6m4-nc).

---

# addLogging

A function to insert console.logs at the beginning of arrow functions, function expression, and function declaration. 

## Installation

```bash
$ npm install @ull-esit-pl-2021/addlogging --save
```

## Usage

```js
const addLogging = require('@ull-esit-pl-2021/addlogging');
console.log(addLogging('(x) => { x + 1; }'));
```

## Tests

```bash
$ npm run mocha       # Mocha and chai tests
$ npm run mocha-cat   # Mocha and chai tests (Nyan cat)
$ test                # Mocha and chai tests + nyc coverage
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
