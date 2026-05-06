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
    tasaInteres = tasa;
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + " %"); //mostrar texto: util.
  } else {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  }
}

function guardarClientes() {
  let cedula = document.getElementById("cedula").value;
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let ingresos = document.getElementById("ingresos").value;
  let egresos = document.getElementById("egresos").value;

  let cliente = {
    cedula : cedula,
    nombre : nombre,
    apellido : apellido,
    ingresos : ingresos,
    egresos : egresos
  }
  clientes.push(cliente);
  pintarClientes();
}

function pintarClientes(){
  let contenido = "";

  for(i = 0 ; i < clientes.length ; i++){
    contenido += "<tr>";
    contenido += "<td>" + clientes[i].cedula + "</td>";
    contenido += "<td>" + clientes[i].nombre + "</td>";
    contenido += "<td>" + clientes[i].apellido + "</td>";
    contenido += "<td>" + clientes[i].ingresos + "</td>";
    contenido += "<td>" + clientes[i].egresos + "</td>";
    contenido += "<td><button>Eliminar</button></td>";
    contenido += "</tr>";
  }
  document.getElementById("tablaClientes").innerHTML = contenido;
}


//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios