/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 *
 * @author J. Daniel Escánez
 */

const {addLogging} = require('./addLogging.js');
const fs = require('fs');
const program = require('commander');
const {version, description} = require('../package.json');

/**
 * @desc Programa principal que ejecuta el addLogging según las opciones escogidas
 */
function main() {
  program
    .version(version)
    .description(description)
    .usage('[options] <filename> [...]')
    .option('-o, --output <filename>', 'establecer el fichero de salida del resultado del programa');

  program.parse(process.argv);
  // options contiene las opciones del programa
  const options = program.opts();
  let inputFilename = program.args.shift();

  try {
    if (inputFilename) {
      /* Al leer un fichero se usa una función asíncrona
      * Todas las funciones asíncronas llevan una callback que es el único
      * lugar donde estamos seguros que el código se va a ejecutar después
      * de haber ejecutado la función
      * Normalmente se pasa como argumento el error y resultado de la 
      * función asíncrona, para el caso de que no hubiera error.
      */
      fs.readFile(inputFilename, 'utf8', (err, input) => {
        // Si hay error se envía un throw
        if (err) throw `Error reading '${inputFilename}': ${err}`;
        // eoc se llama al addLoggin y se guarda en output
        const output = addLogging(input);
        // Se muesta la cadena de entrada al programador
        console.error(`input:\n${input}\n---`);
        // Si se ha indicado un fichero de salida en la línea de comandos
        if (options.output) {
          // Manera correcta de realizar el write después del read 
          // (dentro de la callback). Tendencia hacia la diagonalidad
          fs.writeFile(options.output, output, err => {
            // Se comprueba si ha habido o no error y se imprime la salida por pantalla
            if (err) throw `Can't write to '${options.output}': ${err}`;
            console.log(`Output in file '${options.output}'`);
          })
        }
        else {
          // Si no se indica fichero de salida se imprime por consola
          console.error('output:\n');
          console.log(output);
        }
      });
    }
    else program.help(); // En caso de no usar la sintaxis correcta se imprime la ayuda
  }
  catch (e) {
    console.error(`Hubo errores: ${e}`);
  }
}

main();
