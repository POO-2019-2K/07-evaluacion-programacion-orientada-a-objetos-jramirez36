import Funciones from "./Funciones.js";
import Tareas  from "./Tarea.js";
class Main {
constructor() 
{
    //TAgenda es tablas de Tareas
    let TAgenda = new Tareas( document.querySelector("#Agenda"), document.querySelector("#NTareas"));
    document.querySelector("#Agregar").addEventListener("click", () => {
    let form = document.querySelector("#form");
    if (form.checkValidity() === true) 
    {
        let Nombre = document.querySelector("#tarea").value;
        let i = document.querySelector("#inicio").value;
        i = i.split("-");
        let inicio = new Date(i[0], i[1] - 1, i[2]);
        let f = document.querySelector("#fin").value;
        f = f.split("-");
        let fin = new Date(f[0], f[1] - 1, f[2]);
        let objTarea = {
        Nombre: Nombre,
        Inicio: inicio,
        Fin: fin
        };
        let Tarea = new Funciones(objTarea);
        TAgenda._ATarea(Tarea);
    }
    else
    {
        Swal.fire({
            type: "error" ,
            title: "falta alguna informacion importante",
            text: "no se a llenado un cuadro de informacion"
            })
    }
    form.classList.add("was-validated");
    });
    var select = document.getElementById("Tipo");
    select.addEventListener("change", () => {
    var Tipo = select.value;
        if(Tipo == "Nombre")
        {
            Tipo = 1;
        }
        else if(Tipo == "Dia")
        {
            Tipo = 2;
        }
        else
        {
            Swal.fire({
                type: "error" ,
                title: "No selecciono en que orden se ordenara la lista",
                text: "No selecciono en que orden se ordenara la lista por lo cual no se puede continuar"
                })
        }
            TAgenda._Ordenar(Tipo);
        });
} 
}
new Main();
