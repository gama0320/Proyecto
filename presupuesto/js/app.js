import Ingreso from './Ingreso.js';
import Egreso from './Egreso.js';


let ingresos = [

];


let egresos = [
    new Egreso("Renta", 400),
    new Egreso("Ropa", 80),
    new Egreso("Colegiatura", 3000)
];


const eliminarIngreso = (id) => {
    ingresos = ingresos.filter(ingreso => ingreso.getId() !== id);
    console.log(ingresos)
    cargarApp();
};


function cargarIngresos() {
    let ingresosHTML = '';
    for (const ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    const listaIngresosElement = document.getElementById('lista_ingresos');
    listaIngresosElement.innerHTML = ingresosHTML;
    console.log("Ingresos cargados:", ingresos);
};


const eliminarEgreso = (id) => {
    const indiceEliminar = egresos.findIndex(egreso => egreso.getId() === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero(); 
    cargarEgresos(); 

const cargarEgresos = () => {
    let egresosHTML = '';
    for (const egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    const listaEgresosElement = document.getElementById('lista_egresos');
    listaEgresosElement.innerHTML = egresosHTML;
    console.log("Egresos cargados:", egresos);
};

const crearIngresoHTML = (ingreso) => {
    const ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" onclick="${(ingreso)=>(eliminarIngreso(ingreso.getId()))}">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return ingresoHTML;
};


const crearEgresoHTML = (egreso) => {
    const egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.getId()})">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return egresoHTML;
};



const formatoMoneda = valor => {
    return valor.toLocaleString('es-MX', {
        style: 'currency',  
        currency: 'MXN', 
        minimumFractionDigits: 2 
    });
};


const cargarCabecero = () => {
  

    const formatoPorcentaje = valor => {
        return valor.toLocaleString('es-MX', {
            style: 'percent',
            minimumFractionDigits: 2 
        });
    };

    
    const totalIngresos = () => {
        let totalIngreso = 0;
        for (let ingreso of ingresos) { 
            totalIngreso += ingreso.valor;
        }
        return totalIngreso;
    };

 
    const totalEgresos = () => {
        let totalEgreso = 0;
        for (let egreso of egresos) { 
            totalEgreso += egreso.valor;
        }
        return totalEgreso;
    };


    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos()


    const presupuestoElement = document.getElementById('presupuesto_valor');
    const porcentajeElement = document.getElementById('porcentaje');
    const ingresosElement = document.getElementById('ingresos_valor');
    const egresosElement = document.getElementById('egresos_valor');
 

    presupuestoElement.innerHTML = formatoMoneda(presupuesto);
    porcentajeElement.innerHTML = formatoPorcentaje(porcentajeEgreso);
    ingresosElement.innerHTML = formatoMoneda(totalIngresos());
    egresosElement.innerHTML = formatoMoneda(totalEgresos());

  
    console.log(`Presupuesto: ${formatoMoneda(presupuesto)}`);
    console.log(`Porcentaje de Egreso: ${formatoPorcentaje(porcentajeEgreso)}`);
    console.log(`El Total de los INGRESOS: ${formatoMoneda(totalIngresos())}`);
    console.log(`El Total de EGRESOS: ${formatoMoneda(totalEgresos())}`);   
}


const cargarApp = () => {
    cargarCabecero(); 
    cargarIngresos(); 
    cargarEgresos(); 
};

const agregarDato = () => {
 
    const forma = document.getElementById('forma');
    const tipo = document.getElementById('tipo').value;
    const descripcion = document.getElementById('descripcion').value;
    const valor = document.getElementById('valor').value; 

    console.log("Descripción:", descripcion);
    console.log("Valor:", valor);

    
    if (descripcion.trim() === '' || valor.trim() === '') {
        alert('Por favor, ingresa una descripción y un valor.');
        return;
    }

    
    if (tipo === 'ingreso') {
        ingresos.push(new Ingreso(descripcion, parseFloat(valor)));
        console.log("Ingreso agregado:", ingresos);
        cargarIngresos(); 

    } else if (tipo === 'egreso') {
        egresos.push(new Egreso(descripcion, parseFloat(valor)));
        cargarEgresos(); 
        console.log("Egreso agregado:", egresos);
    }

    cargarCabecero(); 
    forma.reset(); 
};

    const botonAgregar = document.getElementById('agregar-btn');

    
    if (botonAgregar) {
        botonAgregar.addEventListener('click', agregarDato);
    }

    cargarApp();
};

window.agregarDato = agregarDato;