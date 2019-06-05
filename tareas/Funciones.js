export default class Funciones {
    constructor(tarea) {
        this._Nombre= tarea.Nombre;
        this._inicio = new Date(tarea.Inicio);
        this._fin = new Date(tarea.Fin);
        this._Tareas = [];
        this._Inicio2 = 0;
        this._Dias = 0;
        this._Meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
        ];
    }
    _Op2Digitos(numero){
        if(numero < 10)
        {
        return "0"+ numero;
        }
        return numero;
    }
    _OpDato(){ 
        let Fecha = this._inicio.getFullYear() + "-" + this._Op2Digitos(this._inicio.getMonth()+1) + "-" + this._Op2Digitos(this._inicio.getDate()+1);
        return Fecha;
    }
    _OpCadena() {
        let FechaCadena = (this._inicio.getDate()) + "/" + this._Meses[this._inicio.getMonth()] + "/" + this._inicio.getFullYear();
        return FechaCadena;
    }
    _OpDato2(){ 
    let Fecha2 = this._fin.getFullYear() + "-" + this._Op2Digitos(this._fin.getMonth()+1) + "-" + this._Op2Digitos(this._fin.getDate()+1);
    return Fecha2;
    }
    _OpCadena2() {
    let FechaCadena2 = (this._fin.getDate()) + "/" + this._Meses[this._fin.getMonth()] + "/" + this._fin.getFullYear();
    return FechaCadena2;
    }
    _OpDias() {
      let unDia = 24 * 60 * 60 * 1000;
        let diferencia = this._fin - new Date();
        let Dias = Math.trunc(diferencia / unDia);
        return Dias;
    }
    _RTarea(Tareas, Nombre)
    {
    let Buscador = -1;
    Tareas.forEach((Tarea, index) => {
        if (Tarea.Nombre === Nombre)
        {
            Buscador = index;
            return;
        }
    })
    return Buscador;
    }
    get Nombre() 
    {
        return this._Nombre;
    }
    get Inicio() 
    {
        return this._inicio;
    }
    get Fin() 
    {
        return this._fin;
    }
    _Boton(row, Tarea)
    {
        let btnEditar = document.createElement("input");
        btnEditar.type = "button";
        btnEditar.value = "Editar";
        btnEditar.className = "btn btn-success";
        btnEditar.addEventListener("click", () => {
            return this._editarFila(row, Tarea);
        })
        let btnEliminar = document.createElement("input");
        btnEliminar.type = "button";
        btnEliminar.value = "Eliminar";
        btnEliminar.className = "btn btn-danger";
        btnEliminar.addEventListener("click", () => {
            this._Eliminar(row, Tarea);
        });
        row.cells[3].innerHTML = "";
        row.cells[3].appendChild(btnEditar);
        row.cells[4].innerHTML = "";
        row.cells[4].appendChild(btnEliminar);
    }
    _editarFila(row, Tarea)
    {
        let iNombre = document.createElement("input");
        iNombre.type = "text";
        iNombre.value = Tarea.Nombre;
        row.cells[0].innerHTML = "";
        row.cells[0].appendChild(iNombre);
        let iInicio = document.createElement("input");
        iInicio.type = "date";
        row.cells[1].innerHTML = "";
        row.cells[1].appendChild(iInicio);
        let iFin = document.createElement("input");
        iFin.type = "date";
        row.cells[2].innerHTML = "";
        row.cells[2].appendChild(iFin);
        let btnGuardado = document.createElement("input");
        btnGuardado.type = "button";
        btnGuardado.value = "Grabar";
        btnGuardado.className = "btn btn-success";
        row.cells[3].innerHTML = "";
        row.cells[3].appendChild(btnGuardado);
        this._Inicio2 = (Tarea.Inicio.getDate()) + "/" + this._Meses[Tarea.Inicio.getMonth()] + "/" + Tarea.Inicio.getFullYear();
        this._Dias = Math.trunc((new Date(iFin.value) - new Date())/(24 * 60 * 60 * 1000));
        btnGuardado.addEventListener("click", () => {   
        let nuevoTarea = 
        {
            Nombre: iNombre.value,
            Inicio: new Date(iInicio.value),
            Fin: new Date(iFin.value),
            Dias: this._Dias
        };
        console.log(nuevoTarea)
            return this._salvarEdicion(row, Tarea, nuevoTarea);
        })
        let btnCancelar = document.createElement("input");
        btnCancelar.type = "button";
        btnCancelar.value = "Cancelar";
        btnCancelar.className = "btn btn-danger";
        row.cells[4].innerHTML = "";
        row.cells[4].appendChild(btnCancelar);
        btnCancelar.addEventListener("click", () => {
            this._cancelarEdicion(row, Tarea);
        })
    }
    _salvarEdicion(row, Tarea, nuevoTarea)
    {
        var Guardar = JSON.parse(localStorage.getItem("Almacen"));
        let nuevo = this._RTarea(Guardar, Tarea.Nombre);
        Guardar[nuevo] = nuevoTarea;
        console.log(Guardar)
        this._cancelarEdicion(row, new Funciones(nuevoTarea));
        return Guardar;
    }
    _cancelarEdicion(row, Tarea)
    {
        row.cells[0].innerHTML = "";
        row.cells[0].innerHTML = Tarea.Nombre;
        row.cells[1].innerHTML = "";
        row.cells[1].innerHTML = this._Inicio2;
        row.cells[2].innerHTML = "";
        row.cells[2].innerHTML = this._Dias;
        this._Boton(row, Tarea);
    
    }
    _Eliminar(row, Tarea)
    {
        let btnConfirmar = document.createElement("input");
        btnConfirmar.type = "button";
        btnConfirmar.value = "Confirmar";
        btnConfirmar.className = "btn btn-danger";
        row.cells[3].innerHTML = "";
        row.cells[3].appendChild(btnConfirmar);
        btnConfirmar.addEventListener("click", () => {  
            this._Tareas = JSON.parse(localStorage.getItem("Almacen"));
            this._Tareas.splice(Tarea, 1);
            row.innerHTML = "";
            localStorage.setItem("Almacen", JSON.stringify(this._Tareas));
            Swal.fire({
                type: "error" ,
                title: "Eliminado",
                text: "El usuario ya ha sido eliminado"
                })
                return;
        }) 
        let btnCancelar = document.createElement("input");
        btnCancelar.type = "button";
        btnCancelar.value = "Cancelar";
        btnCancelar.className = "btn btn-success";
        row.cells[4].innerHTML = "";
        row.cells[4].appendChild(btnCancelar);
        btnCancelar.addEventListener("click", () => {
            this._Boton(row, Tarea);
        })
    }
}