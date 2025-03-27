let input=document.getElementById("inputt");
let btnAgregar=document.getElementById("btnAgregar");
let ul=document.getElementById("ulLista");
let pError=document.getElementById('pError');
let lista = [], tareaMasRapida={};

const formatearHora=(fecha)=>{
    return fecha.getDate().toString().padStart(2, '0') + '/' +
                      (fecha.getMonth() + 1).toString().padStart(2, '0') + '/' +
                      fecha.getFullYear() + ' ' +
                      fecha.getHours().toString().padStart(2, '0') + ':' +
                      fecha.getMinutes().toString().padStart(2, '0');
}
const formatearSegundos = (diferencia) => {
    // Convertir la diferencia en milisegundos a segundos, minutos y horas
    let horas = Math.floor(diferencia / 3600000); // 1 hora = 3600000 ms
    let minutos = Math.floor((diferencia % 3600000) / 60000); // 1 minuto = 60000 ms
    let segundos = Math.floor((diferencia % 60000) / 1000); // 1 segundo = 1000 ms

    return horas.toString().padStart(2, '0') + ':' +
           minutos.toString().padStart(2, '0') + ':' +
           segundos.toString().padStart(2, '0');
}



console.log(formatearHora(new Date()));
const agregarElemento=()=>{
    let element={
        texto: input.value,
        creado: new Date(),
        tachado: null,
        marcadoListado: false
    }
    
    lista.push(element);
}
const borrarElemento = (id) => lista.splice(id,1);


const mostrarError=(mensaje)=>{
    pError.innerText=mensaje;
    pError.className="error"
}
const mostrarTareas=()=>{
    let codigoHTML=" ";
    for(let i=0;i<lista.length;i++){
        if(!lista[i].marcadoListado){
            codigoHTML+=`
            <li id="li${i}">
                <div class="punto">
                    <div class="div-adentro">
                        <input type="checkbox" class="checkbox" id="${i}">
                        <p class="texto-todo">${lista[i].texto}</p>
                    </div>
                    <p class="hora">${formatearHora(lista[i].creado)}</p>
                </div>
            </li>
            `;
        } else{
            codigoHTML+=`
            <li id="li${i}" class="tachado">
                <div class="punto">
                    <div class="div-adentro">
                        <input type="checkbox" class="checkbox"  checked id="${i}">
                        <p class="texto-todo">${lista[i].texto}</p>
                    </div>
                    <p class="hora">${formatearHora(lista[i].creado)}</p>
                </div>
            </li>
            `;
        }
    }
    ul.innerHTML=codigoHTML;


let checkboxes = document.querySelectorAll('.checkbox');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        let id=checkbox.id;
        let linea = document.getElementById("li" + id);
        if (checkbox.checked) {
            lista[id].marcadoListado = true;
            lista[id].tachado = new Date();
        } else {
            lista[id].marcadoListado = false;
            lista[id].tachado = false;
        }
        if(esLaTareaMasRapida(lista[id]) || !lista.some(tarea => tarea.texto==tareaMasRapida.texto&&tarea.creado==tareaMasRapida.creado)){
            console.log(esLaTareaMasRapida(lista[id]), !lista.includes(tareaMasRapida));
            tareaMasRapida=lista[id];
        }
        console.log(tareaMasRapida);

        linea.className = lista[id].tachado ? 'tachado' : '';
    });
});
};


const tacharTarea = (id) => {
lista[id].marcadoListado = true;
lista[id].tachado = Date.now();
};


btnAgregar.addEventListener('click',()=>{
    input=document.getElementById("inputt");
    if(input.value!=""){
    agregarElemento();
    mostrarTareas();
    } else{
        mostrarError('No puedes agregar una tarea vacía.');
    }
});




const esLaTareaMasRapida=(tarea)=> {
    if(tareaMasRapida!={}){
        return tarea.tachado - tarea.creado>tareaMasRapida.tachado-tareaMasRapida.creado;
    }else{
        return true
    }
};

const mostrarTareaMasRapida=()=>{
    let display=document.getElementById("displayTareaMasRapida");
    let tiempo=formatearSegundos(tareaMasRapida.tachado-tareaMasRapida.creado);
    
    display.innerText=`La tarea más rapida fue "${tareaMasRapida.texto}, en ${tiempo}"`;
}