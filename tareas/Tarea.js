import Funciones from "./Funciones.js";
export default class Tareas {
    constructor(tablaAgenda, NTareas) {
    this._tablaAgenda = tablaAgenda;
    this._NTareas = NTareas;
    this._Tareas = [];
    this._CTareas = 0;
    this._iTablas();
}
    //iTablas es un iniciador para ver el localstorage
    _iTablas() 
    {
    //localStorage.removeItem("Almacen")
    let lTareas = JSON.parse(localStorage.getItem("Almacen"));
    if (lTareas === null) {
    return;
    }
    lTareas.forEach((Tarea, index) => {
        Tarea.Inicio = new Date(Tarea.Inicio)
        Tarea.Fin = new Date(Tarea.Fin)
        this._ATabla(new Funciones(Tarea));
    })
    }
    //agregar tabla
    _ATabla(Tarea) 
    {
    let row = this._tablaAgenda.insertRow(-1);
    let CNombre = row.insertCell(0);
    let CInicio = row.insertCell(1);
    let CFin = row.insertCell(2);
    let CDias = row.insertCell(3);
    row.insertCell(4);
    row.insertCell(5);
    CNombre.innerHTML = Tarea.Nombre;
    CInicio.innerHTML = Tarea._OpCadena();
    CFin.innerHTML = Tarea._OpCadena2();
    CDias.innerHTML = Tarea._OpDias();
    this._CTareas++;
    this._NTareas.rows[0].cells[1].innerHTML = this._CTareas;
    Tarea._Boton(row, Tarea); 
    this._Guardado(Tarea);
    }
    _Guardado(Tarea)
    {
        let Dias = Tarea._OpDias();
        let objTareas = {
            Nombre: Tarea.Nombre,
            Inicio: Tarea.Inicio,
            Fin: Tarea.Fin,
            Dias: Dias
                            };
        this._Tareas.push(objTareas);
        
    }
    //agregar contacto
    _ATarea(Tarea) 
    {
    let Encontrado = Tarea._RTarea(this._Tareas, Tarea.Nombre);
    if(Encontrado >= 0)
    {
        Swal.fire({
        type: "error" ,
        title: "Error",
        text: "tarea ya existe"
        })
        return;
    }
    var Dias = Tarea._OpDias()
    if(Dias >= 0)
    {
        this._ATabla(Tarea);
        var Tipo = 2;
        localStorage.setItem("Almacen", JSON.stringify(this._Tareas));
        this._Ordenar(Tipo);
    }
    else
    {
        Swal.fire({
            type: "error" ,
            title: "Error",
            text: "la tarea ya a pasado su fecha"
            })
    }
    }
    _Ordenar(Tipo)
        {
            var ordenado = this._Tareas.slice(-this._CTareas);
            if (Tipo === 1)
            {
                ordenado.sort(function(a, b) {
                return a.Nombre.localeCompare(b.Nombre);
                                                                });
            }
        else if (Tipo === 2)
            {
                ordenado.sort(function(a, b) {
                return a.Dias - b.Dias;
                                                                });
            }
            this._Limpiador();
            localStorage.setItem("Almacen", JSON.stringify(ordenado));
            this._iTablas();
        }
    _Limpiador()
        {
            var i;
            for (i = this._CTareas+1; i > 1; i--)
            {
                this._tablaAgenda.deleteRow(i);
            }
                
            this._CTareas = 0;
        }
}