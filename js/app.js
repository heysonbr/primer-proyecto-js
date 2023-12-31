// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
const lupa = document.querySelector('#submit-buscador');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
    // Elmina  cursos del carito
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];// reseteamos el arreglo

        limpiarHTML();// eliminamos todo html
    })
}


// Funciones
function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        
        const cursoSeleccionado= e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

   
}
//Elimina un curso del carrito 
function eliminarCurso(e){
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
          //Elimina del arreglo de articulosCarrito por el data-id
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();//Iterar sobre el carrito y mostrar su html
    }
}



// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    
    //crear un objeto con el contenido del curso antual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), 
        cantidad: 1
    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizaado
            }else{
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
          //Agrega elementos al aarreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
  

    console.log(articulosCarrito)

    carritoHTML();
}



//Muestra el carrito de compras en el HTML
function carritoHTML(){

    //Limpiar el HTML
    limpiarHTML();


    //REcorre el carrito y genera el html
    articulosCarrito.forEach(curso=>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>
                    <img src="${imagen}" Width = "100">
                </td>
                <td>
                    ${titulo}               
                </td>
                <td>
                    ${precio}               
                </td>
                <td>
                    ${cantidad}               
                </td>
                <td>
                    <a hreft="#" class="borrar-curso" data-id=${id}>X</a>
                </td>
        `;
        //Agrega el HTML DEL CARRITO EN EL TBODY
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}


//Lupa 

lupa.onclick = funcionLupa;

function funcionLupa(evt){
    evt.preventDefault()
    alert('Haha era de broma , No funciono!')

}   
