/*const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);
});*/
//todo lo anterior se cambio por un data-tipo y se crea la siguiente funcion

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    console.log(input.parentElement);
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }
    else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
};

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError ={
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío"
    },
    
    email: {
        valueMissing: "El campo email no puede estar vacío",
        typeMismatch: "El correo no es valido"
    },
    
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Útiliza al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número, sin caracteres especiales"
    },
    
    nacimiento: {
        valueMissing: "El campo no puede estar vacío",
        customError: "Debes tener almenos 18 años de edad"
    },

    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números"
    },

    direccion: {
        valueMissing: "El campo dirección no puede estar vacío",
        typeMismatch: "La dirección debe contener entre 10 y 40 caracteres"
    },

    ciudad: {
        valueMissing: "El campo Ciudad no puede estar vacío",
        typeMismatch: "Ciudad debe contener entre 10 y 40 caracteres"
    },
    estado: {
        valueMissing: "El campo Estado no puede estar vacío",
        typeMismatch: "El Estado debe contener entre 10 y 40 caracteres"
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje
}

function validarNacimiento(input) {
const fechaCliente = new Date (input.value);
let mensaje = "";
if (!mayorDeEdad(fechaCliente)){
    mensaje= "Debes tener almenos 18 años de edad";
};

input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    
    return diferenciaFechas <= fechaActual;
    
};