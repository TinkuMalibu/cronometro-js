// Seleccionar los botones.
const botonInicioPausa = document.querySelector('#boton-inicio-pausa');
const botonReiniciar = document.querySelector('#boton-reiniciar');
const cronometro = document.querySelector('#cronometer');

// Variables para almacenar los segundos, minutos y horas.
let [segundos, minutos, horas] = [0, 0, 0];

// Variables para almacenar el intervalo de tiempo que debe
// transcurrir para actualizar el cronometro y el estado
// del cronometro.
let intervaloDeTiempo;
let estadoCronometro = 'pausado'; // Dos estados posibles: 'pausado' o 'andando'.

// Actualizar el cronometro.
function actualizarCronometro() {
  segundos++;

  if (segundos / 60 === 1) {
    segundos = 0;
    minutos++;

    if (minutos / 60 === 1) {
      minutos = 0;
      horas++;
    }
  }

  // Agregar un cero a la izquierda si es necesario.
  const segundosConFormato = asignarFormato(segundos);
  const minutosConFormato = asignarFormato(minutos);
  const horasConFormato = asignarFormato(horas);

  // Actualizar el contenido del cronometro.
  const cronometro = document.getElementById('cronometer');
  cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`;
}

// Agregar un cero a la izquierda si se necesita.
function asignarFormato(unidadDeTiempo) {
  return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
}

const removeIniciar = botonInicioPausa.classList.remove('iniciar');
const removePausar = botonInicioPausa.classList.remove('pausar');
const addIniciar = botonInicioPausa.classList.add('iniciar');
const addPausar = botonInicioPausa.classList.add('pausar');

botonInicioPausa.classList.add('pausar');
botonInicioPausa.addEventListener('click', function() {
  if (estadoCronometro === 'pausado') {
    // LLamar a la funcion cronometro cada 1000 milisegundos.
    intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);
    // Si el cronometro esta pausado, se muestra la flecha >
    // y se debe cambiar a || porque ese simbolo aparece cuando esta andando
    botonInicioPausa.innerHTML = `<i class="bi bi-pause" id="boton-inicio-pausa"></i>`;
    removeIniciar;
    addPausar;
    // Actualizar el estado del cronometro.
    estadoCronometro = 'andando';
  } else {
    // Detener el cronometro al eliminar el intervalo de tiempo
    // usado para llamar a la funcion actualizarCronometro().
    window.clearInterval(intervaloDeTiempo);
    // Actualizar los botones y el estado del cronometro.
    botonInicioPausa.innerHTML = `<i class="bi bi-play-fill" id="boton-inicio-pausa"></i>`;
    removePausar;
    addIniciar;
    estadoCronometro = 'pausado';
  }
});

// Reiniciar el cronometro eliminando el intervalo de tiempo,
// reiniciando los segundos, minutos y horas, y actualizando
// el estado del cronometro y de los botones.
botonReiniciar.addEventListener('click', function() {
  // Eliminar el intervalo.
  window.clearInterval(intervaloDeTiempo);

  // Para reiniciar Segundos, minutos y horas.
  horas = 0;
  minutos = 0;
  segundos = 0;
  cronometro.innerHTML = '00:00:00';

  // Actualizar Botones.
  botonInicioPausa.innerHTML = `<i class="bi bi-play-fill" id="inicio"></i>`;
  botonInicioPausa.classList.remove('pausar');
  botonInicioPausa.classList.add('iniciar');

  // Estado.
  estadoCronometro = 'pausado';
});
