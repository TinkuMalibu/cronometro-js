const cronometro = document.getElementById('cronometer');
const botonInicioPausa = document.getElementById('boton-inicio-pausa');
const botonReinicio = document.getElementById('boton-reiniciar');

let [horas, minutos, segundos,] = [0, 0, 0,];
let intervaloDeTiempo;
let estado = 'pausado';

const updateCronometro = () => {
  segundos++;

  if (segundos / 60 === 1) {
    segundos = 0;
    minutos++;

    if (minutos / 60 === 1) {
      minutos = 0;
      horas++;
    }
  }

const segundosConFormato = asignarFormato(segundos);
const minutosConFormato = asignarFormato(minutos);
const horasConFormato = asignarFormato(horas);

cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`;


}

const asignarFormato = (tiempo) => {
  return tiempo < 10 ? '0' + tiempo : tiempo;
}

botonInicioPausa.addEventListener('click', function () {
  if(estado === 'pausado') {
    intervaloDeTiempo = window.setInterval(updateCronometro, 1000);
    botonInicioPausa.innerHTML = '<i class="bi bi-pause-btn-fill"></i>';
    botonInicioPausa.classList.add('iniciar');
    botonInicioPausa.classList.remove('pausar');
    estadoCronometro = 'pausado';
  } else {
    window.clearInterval(intervaloDeTiempo);
    botonInicioPausa.innerHTML = '<i class="bi bi-play-btn-fill"></i>';
    botonInicioPausa.classList.remove('pausar');
    botonInicioPausa.classList.add('iniciar');
    


  }
  });
