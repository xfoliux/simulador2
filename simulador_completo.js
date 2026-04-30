let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

function ocultarSecciones() {
  let componente = document.getElementById("parametros");
  let listaClass = componente.classList;
  listaClass.remove("activa");  // oculta

  let componente2 = document.getElementById("clientes");
  let listaClass2 = componente2.classList;
  listaClass2.remove("activa");
}


function mostrarSeccion(id) {
  ocultarSecciones();

  let componente = document.getElementById(id);
  let listaClass = componente.classList;
  listaClass.add("activa");  //activa
}


function guardarTasa() {
  let tasa = recuperarFloat("tasaInteres");
  if (tasa >= 10 && tasa <= 20) {
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + " %"); //mostrar texto: util.
  } else {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10 y 20");
  }

}


//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios