// Espera a que se cargue el DOM antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {

    // Objeto que almacenará los valores del formulario
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz mediante sus IDs
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos de escucha a los campos de entrada
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    // Evento de envío del formulario
    formulario.addEventListener('submit', enviarEmail);

    // Evento de resetear el formulario
    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();
    })

    // Función para enviar el email
    function enviarEmail(e) {
        e.preventDefault();

        // Muestra el spinner para indicar que se está procesando el envío
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        // Simula un envío después de un tiempo (3 segundos)
        setTimeout(() => {
            // Oculta el spinner después del tiempo simulado
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario(); // Limpia el formulario después del envío

            // Crea una alerta de éxito para indicar que el mensaje se envió correctamente
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            // Agrega la alerta al formulario y la elimina después de 3 segundos
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove(); 
            }, 3000);
        }, 3000);
    }

    // Función para validar los campos del formulario
    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asigna los valores al objeto email y verifica si está completo
        email[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail();
    }

    // Función para mostrar alertas de error en el formulario
    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
        
        // Genera un elemento de alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
       
        // Agrega el error al formulario
        referencia.appendChild(error);
    }

    // Función para limpiar las alertas de error
    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta y la elimina
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    // Función para validar el formato de email
    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    // Función para comprobar si todos los campos del objeto email están completos
    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        } 
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    // Función para resetear el formulario y el objeto email
    function resetFormulario() {
        // Reinicia el objeto email
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset(); // Resetea el formulario
        comprobarEmail(); // Comprueba el estado del email
    }
});
