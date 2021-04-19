# Práctica: Espree-logging. Fases de un compilador
### José Daniel Escánez Expósito - PE101
#### Procesadores de Lenguajes - Ingeniería Informática ULL

Para la realización de esta práctica se han seguido las instrucciones de [este enunciado](https://ull-esit-gradoii-pl.github.io//practicas/esprima-logging) y de la [clase grabada del profesor](https://www.youtube.com/watch?v=V--OxVtddLA&feature=youtu.be).

---

Comenzamos con la instalación de las dependencias necesarias:

Instalación de `escodegen`:
```bash
$ npm install escodegen
```

Instalación de `espree`:
```bash
$ npm install espree
```

Instalación de `estraverse`:
```bash
$ npm install estraverse
```

Tras esto, podremos ejecutar el programa inicialmente para comprobar las funcionalidades actuales.
```bash
$ node logging-espree.js
```

Salida:
```javascript
function foo(a, b) {
    console.log('Entering foo()');
    var x = 'blah';
    var y = function () {
        console.log('Entering <anonymous function>()');
        return 3;
    }();
}
```

Se nos propone lo siguiente:
1. Comprender el funcionamiento del programa, así como su ejecución paso a paso.
2. Modificar los console.log insertados para que se informe también de los parámetros pasados a la función.
3. Utilizando el módulo commander, realizar un parsing de la línea de comandos para que cumpla con los requerimientos expresados en el enunciado.
4. Añadir la capacidad de procesar funciones con sintáxis ECMA6 *flecha gorda* con bloque.
5. Añadir el número de línea a la información del log de la función en la que se entra.
6. Añadir scripts para ejecutar el programa en el package.json

---

## Comprensión del funcionamiento del programa

Al cargar `espree` (concretamente `.VisitorKeys`) nos devuelve la descripción de cómo son los nodos del árbol. 

```js
> espree = require('espree')
> espree.VisitorKeys
```

Sobre todo nos interesa:

```js
...,
ArrowFunctionExpression: [ 'params', 'body' ],
FunctionDeclaration: [ 'id', 'params', 'body' ],
FunctionExpression: [ 'id', 'params', 'body' ],
...
```

```js
// Ejemplo ArrowFunctionExpression:
const arrowFunctionExpression = (x) => {  
  return x + 1; 
}
```

```js
// Ejemplo FunctionDeclaration:
function fDeclaration(x) {  
  return x + 2; 
}
```

```js
// Ejemplo FunctionExpression:
(function fExpression(x) { return x + 3; }) (2)
// Puede tener el atributo id vacío:
(function (x) { return x + 3; }) (2)
```

El código del programa [p0-t0-esprigma-logging-sol.js](./p0-t0-esprigma-logging-sol.js), se encuentra comentado detallamente explicando cada paso del mismo. En él se puede observar el estudio y la comprensión de los conceptos necesarios.

## Modificación console.log (incluyendo en la información el número de línea)

En cuanto a la explicación de este apartado, se hace referencia a los comentarios incluidos en la función relativa al proceso: 
```js
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
```

## Commander

El comando para instalar la dependencia `commander` es:

```bash
$ npm install commander
```

En el siguiente fragmento de código, se puede apreciar su uso:

```js
program
  .version(version)
  .description(description)
  .usage('[options] <filename> [...]')
  .option('-o, --output <filename>', 'establecer el fichero de salida del resultado del programa');

program.parse(process.argv);
// options contiene las opciones del programa
const options = program.opts;
```

## Procesamiento de funciones con sintáxis ECMA6

En este fragmento de código se hace patente el añadido de las `ArrowFuctionExpressions`:

```js
function addLogging(code) {
  // Se parsea el código con la última versión de ecma, indicando que se requiere la 
  // información acerca de las líneas que aparacen 
  const ast = espree.parse(code, {ecmaVersion: espree.latestEcmaVersion, loc: true});
  // Se recorre el árbol, y para cada nodo con el tipo indicado se llama a addBeforeCode
  estraverse.traverse(ast, {
    enter: function(node, parent) {
      // Se ha creído conveniente utilizar un switch en lugar de un if
      switch (node.type) {
        case 'FunctionDeclaration':
        case 'FunctionExpression':
        case 'ArrowFunctionExpression':
          addBeforeCode(node);
      }
    }
  });
  // Una vez recorrido todo el árbol se genera el código del mismo
  return escodegen.generate(ast);
}
```

## Scripts en el package.json

En el directorio `test` se han añadido los códigos de prueba, y en el fichero `package.json` se ha insertado el siguiente fragmento de código:

```js
...,
"scripts": {
        ...,
        "test-1": "node src/p0-t0-esprigma-logging-sol.js test/logging.js -o output/out1.js",
        "test-2": "node src/p0-t0-esprigma-logging-sol.js test/strain.js -o output/out2.js",
        "test-3": "node src/p0-t0-esprigma-logging-sol.js test/yacht.js -o output/out3.js",
        "test": "npm run test-1; npm run test-2; npm run test-3"
    },
...,
```
