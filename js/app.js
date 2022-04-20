// variables
const btnEnviar = document.querySelector("#enviar");
const formulario = document.querySelector("#enviar-mail");
const btnReset = document.querySelector("#resetBtn");

// variables para campo
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

// Expresion regular
const er = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

evenListener();
function evenListener() {
  // cuando la app arranca
  document.addEventListener("DOMContentLoaded", iniciarApp);

  // campos del formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  // resetea el formulario

  // enviar email
  formulario.addEventListener("submit", enviarEmail);
}

// funciones

function iniciarApp() {
  btnEnviar.disable = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {
  if (e.target.value.length > 0) {
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }
    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }
  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      const error = document.querySelector("p.error");
      error.remove();
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mostrarError("Email no valido");
    }
  }

  if (er.test(email.value) && asunto.value != "" && mensaje.value != "") {
    btnEnviar.disable = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}
// Enviar el email
function enviarEmail(e) {
  e.preventDefault();
  // Mostrar el spinner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";
  // Despues de 3 segundos ocultar el spinner y mostrar el mensaje
  setTimeout(() => {
    spinner.style.display = "none";
    //mostrar el mesaje que dice se envio correctamente
    const parrafo = document.createElement("p");
    parrafo.textContent = "El mensaje se envio correctamente";
    parrafo.classList.add(
      "text-center",
      "my-10",
      "p-2",
      "bg-green-500",
      "text-white",
      "font-bold",
      "uppercase"
    );

    formulario.insertBefore(parrafo, spinner);

    setTimeout(() => {
      parrafo.remove();
      resetearFormulario();
    }, 3000);
  }, 3000);
}

function resetearFormulario() {
  formulario.reset();
  iniciarApp();
}
