//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
//variables campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners(){
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    
    //reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);
    //enviar email
    btnEnviar.addEventListener('click', enviarEmail);
}


//Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}


//validar Formulario
function validarFormulario(e){
    
    

    if(e.target.value.length > 0){
        const errorDOM = document.querySelector('p.error');
        if(errorDOM){
            errorDOM.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');   
    }
    else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        
        mostrarError('Debes completar todos los campos');
    }
    if(e.target.type === 'email'){
        if(er.test( e.target.value )){
            const errorDOM = document.querySelector('p.error');
            if(errorDOM){
                errorDOM.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');  
            
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('Email no valido');
        }
    }

    if(er.test( email.value ) && asunto.value !== '' && mensaje.value !== ''){
        console.log('pasaste la validacion');
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 
    'p-3', 'text-center', 'mt-3', 'error');

    const errores = document.querySelectorAll('.error');
    
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
        // formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));

    }
}
//envia el email
function enviarEmail(e){
    e.preventDefault();
    //mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    console.log('enviando email');

    //depues de 3 segundos ocultar spinner
    setTimeout( () =>{
        spinner.style.display = 'none';
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        //insertar el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);
        setTimeout(() =>{
            parrafo.remove();//eliminar el mensaje de enviado
            resetearFormulario();
        }, 2000);
    }, 3000 );

}

//funcion que reseta el formulario
function resetearFormulario(e){
    
    formulario.reset();

    iniciarApp();
}

