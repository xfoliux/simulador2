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
  componente.classList.remove("activa");

  let componente2 = document.getElementById("clientes");
  componente2.classList.remove("activa");

  let componente3 = document.getElementById("creditos");
  componente3.classList.remove("activa");
}


function mostrarSeccion(id) {
  ocultarSecciones();

  let componente = document.getElementById(id);
  let listaClass = componente.classList;
  listaClass.add("activa");  //activa
}


function guardarTasa(){
  let tasa = recuperarFloat("tasaInteres");
  if (tasa >= 10 && tasa <= 20) {
    tasaInteres = tasa;
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + " %"); //mostrar texto: util.
  } else {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  }
}

function guardarCliente() {
  let cedula = recuperaraTexto("cedula");
  let nombre = recuperaraTexto("nombre");
  let apellido = recuperaraTexto("apellido");
  let ingresos = recuperarFloat("ingresos");
  let egresos = recuperarFloat("egresos");

  // VALIDACIÓN
  if (cedula == "" || nombre == "" || apellido == "" || isNaN(ingresos) || isNaN(egresos)) {
    alert("Complete todos los campos correctamente");
    return;
  }
    //evitar que las cedulas se dupliquen
    if (buscarCliente(cedula) != null && clienteSeleccionado == null) {
    alert("La cédula del cliente ya existe");
    return;
  }

  if (clienteSeleccionado == null) {
    // INGRESO DE DATOS PERSONALES
    let cliente = {
      cedula,
      nombre,
      apellido,
      ingresos,
      egresos
    };
    clientes.push(cliente);

  } else {
    // ACTUALIZACION DE DATOS
    clienteSeleccionado.nombre = nombre;
    clienteSeleccionado.apellido = apellido;
    clienteSeleccionado.ingresos = ingresos;
    clienteSeleccionado.egresos = egresos;

    clienteSeleccionado = null;
  }

  pintarClientes();
  limpiarFormulario();
}

function pintarClientes() {
  let contenido = "";

  for (let i = 0; i < clientes.length; i++) {
    contenido += "<tr>";
    contenido += "<td>" + clientes[i].cedula + "</td>";
    contenido += "<td>" + clientes[i].nombre + "</td>";
    contenido += "<td>" + clientes[i].apellido + "</td>";
    contenido += "<td>" + clientes[i].ingresos + "</td>";
    contenido += "<td>" + clientes[i].egresos + "</td>";

    contenido += "<td>";
    contenido += "<button onclick=\"seleccionarCliente('" + clientes[i].cedula + "')\">Actualizar</button>";
    contenido += "<button onclick=\"eliminarCliente('" + clientes[i].cedula + "')\">Eliminar</button>";
    contenido += "</td>";

    contenido += "</tr>";
  }

  document.getElementById("tablaClientes").innerHTML = contenido;
}

function eliminarCliente(cedula) {
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula === cedula) {
      clientes.splice(i, 1);
      break;
    }
  }

  if (clienteSeleccionado != null && clienteSeleccionado.cedula === cedula) {
    limpiarFormulario();
  }
  pintarClientes();
}

function seleccionarCliente(cedula) {
  let cliente = buscarCliente(cedula);

  if (cliente != null) {
    mostrarTextoEnCaja("cedula", cliente.cedula);
    mostrarTextoEnCaja("nombre", cliente.nombre);
    mostrarTextoEnCaja("apellido", cliente.apellido);
    mostrarTextoEnCaja("ingresos", cliente.ingresos);
    mostrarTextoEnCaja("egresos", cliente.egresos);

    clienteSeleccionado = cliente;
  } else {
    alert("Cliente no encontrado");
  }
}

function limpiarFormulario() {
  mostrarTextoEnCaja("cedula", "");
  mostrarTextoEnCaja("nombre", "");
  mostrarTextoEnCaja("apellido", "");
  mostrarTextoEnCaja("ingresos", "");
  mostrarTextoEnCaja("egresos", "");

  clienteSeleccionado = null;
}

function buscarCliente(cedula){
  for(let i = 0 ; i < clientes.length; i++){
    if(clientes[i].cedula === cedula){
      return clientes[i];
    }
  }
  return null;
}

function buscarClienteCredito(){
  let cedula = recuperaraTexto("buscarCedulaCredito");
  let cliente = buscarCliente(cedula);
  let div = document.getElementById("datosClienteCredito");

    if(cedula == ""){
      div.innerHTML = `<p style="color:red;">Ingrese una cédula</p>`;
      return;
    }

      if (cliente != null) {
        clienteSeleccionado = cliente;

    div.innerHTML = `
      <h3>Datos del Cliente</h3>
      <p><strong>Cédula:</strong> ${cliente.cedula}</p>
      <p><strong>Nombre:</strong> ${cliente.nombre}</p>
      <p><strong>Apellido:</strong> ${cliente.apellido}</p>
      <p><strong>Ingresos:</strong> ${cliente.ingresos}</p>
      <p><strong>Egresos:</strong> ${cliente.egresos}</p>`;
  } else {
    div.innerHTML = `<p style="color:red;">Cliente no encontrado</p>`;
  }
}

function calcularCredito() {
  if (clienteSeleccionado == null) {
    alert("Debe buscar un cliente");
    return;
  }

  let monto = recuperarFloat("montoCredito");
  let plazo = recuperarInt("plazoCredito");

  if (isNaN(monto) || isNaN(plazo)) {
    alert("Ingrese monto y plazo");
    return;
  }

  let capacidadPago =
    clienteSeleccionado.ingresos - clienteSeleccionado.egresos;
  let interes = monto * (tasaInteres / 100);
  let totalPagar = monto + interes;
  let cuotaMensual = totalPagar / plazo;
  let resultado = document.getElementById("resultadoCredito");

  if (cuotaMensual <= capacidadPago * 0.4) {

    resultado.innerHTML = `
      Capacidad de pago: ${capacidadPago}<br>
      Total a pagar: ${totalPagar}<br>
      Cuota mensual: ${cuotaMensual.toFixed(2)}<br>
      RESULTADO: APROBADO
    `;

    resultado.className = "aprobado";
    creditoAprobado = true;

  } else {

    resultado.innerHTML = `
      Capacidad de pago: ${capacidadPago}<br>
      Total a pagar: ${totalPagar}<br>
      Cuota mensual: ${cuotaMensual.toFixed(2)}<br>
      RESULTADO: RECHAZADO
    `;

    resultado.className = "rechazado";
    creditoAprobado = false;
  }
}
mostrarSeccion("parametros");

//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios