'use strict';

function DatosCliente(nombre, tipoDocumento, DNI, direccion, email, tipoComprobante){
  this.nombre = nombre;
  this.tipoDocumento = tipoDocumento;
  this.DNI = DNI;
  this.direccion = direccion;
  this.email = email;
  this.tipoComprobante = tipoComprobante;
}

const clientes = [];
document.addEventListener('DOMContentLoaded', function() {
    const storedClientes = localStorage.getItem('clientes');
    if (storedClientes) {
        const parsedClientes = JSON.parse(storedClientes);
        parsedClientes.forEach(clienteData => {
            clientes.push(new DatosCliente(
                clienteData.nombre,
                clienteData.tipoDocumento,
                clienteData.DNI,
                clienteData.direccion,
                clienteData.email,
                clienteData.tipoComprobante
            ));
        });
        console.log('Datos recuperados de localStorage:', clientes);
    }
});
const formCliente = document.getElementById('form-cliente');
formCliente.addEventListener('submit', function(event){
    event.preventDefault();
    const cliente = new DatosCliente();
    for(let i = 0; i < event.target.length; i++) {
        if (event.target[i].name !== ''){
            cliente[event.target[i].name] = event.target[i].value;
        }
    }
    const comprobanteRadio = document.querySelector('input[name="tipoComprobante"]:checked');
        if (!comprobanteRadio) {
        alert("Por favor, seleccione Boleta o Factura.");
         return;
     }
    clientes.push(cliente);
    console.log(clientes);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    
    console.log('Datos guardados en localStorage:', clientes);
});

 const btnDatos = document.getElementById("btn-datos");
 btnDatos.addEventListener("click", function(){
 });