import './style.css'
import {buscarPalabrasEnSopa} from './sopadeletras.js'
console.log('Controller loaded');

let form = document.getElementById('entradas')
let btn_verificar= document.querySelector('button[type="button"]')
let btn_enviar= document.querySelector('button[type="submit"]')
let btn_limpiar= document.querySelector('button[type="reset"]')
let app = document.getElementById('app')

let columnas_validadas = []
let palabras_validadas = []
let isValid = false
let sopa_letras = []
let palabras_buscadas = []

let matriz_values = document.getElementById('matriz')
matriz_values.addEventListener('change', (event)=>{
    event.preventDefault()
    let matriz = event.target.value.split('\n')
    matriz = matriz.map((row)=>{
      row = row.split(',')
      row = row.map(v=>v.trim())
      return row
    })
    matriz.pop()
    sopa_letras = matriz
    matriz.forEach((row,i) => {
      if(row.length==0 || row.length!=14){
        columnas_validadas.push({"index":i, "validacion":false})
      }else{
        columnas_validadas.push({"index":i, "validacion":true})
      }
    });
})

let palabras_values = document.getElementById('palabras')
palabras_values.addEventListener('change', (event)=>{
    event.preventDefault()
    let palabras = event.target.value.split(/\s+/)
    palabras_buscadas = palabras
    palabras.forEach((v,i)=>{
        if (v.length<=2 || v.length>14){
            palabras_validadas.push({"index":i, "validacion": false, "largo":v.length})
        }else{
            palabras_validadas.push({"index":i, "validacion": true, "largo":v.length})
        }
    })
})

form.addEventListener('change', (event)=>{
    event.preventDefault()
    if (columnas_validadas.length!=0 && palabras_validadas.length!=0){
        isValid = columnas_validadas.every((v)=>v.validacion) && palabras_validadas.every((v)=>v.validacion)
    }
    if (isValid){
        btn_verificar.removeAttribute('disabled')
    }
})

btn_verificar.addEventListener('click', (event)=>{
    event.preventDefault()
    app.setAttribute('class', 'border-app')
    app.innerHTML = crear_lista(palabras_buscadas) + crear_tabla(sopa_letras)
    if(btn_enviar.hasAttribute('disabled')){
        btn_enviar.removeAttribute('disabled')
    }
})

function crear_tabla(matriz){
    const table =/*html*/ `
        <div>
            <h2> Sopa de Letras </h2>
            <table>
                ${ matriz.map((row,i)=>
                    `<tr>
                        ${row.map((v,j)=> `<td id="${i}_${j}">${v}</td>`).join('')}
                    </tr>
                    `
                ).join('')}
            </table>
        </div>
    `
    return table
}

function crear_lista(palabras){
    const ul = /*html*/`
        <div>
            <h2> Palabras a buscar </h2>
            <ul>
                ${palabras.map(p=>
                    `<li id="${p}">${p}</li>`
                ).join('')}
            </ul>
        </div>
    `
    return ul
}

btn_enviar.addEventListener('click',(event)=>{
    event.preventDefault()
    const palabrasEncontradas = buscarPalabrasEnSopa(sopa_letras, palabras_buscadas)
    for (const palabra in palabrasEncontradas){
        let tmpEl = document.getElementById(palabra)
        if (palabrasEncontradas[palabra].encontrada){
            tmpEl.setAttribute('class', 'accent')
            for(const pos of palabrasEncontradas[palabra].posiciones){
                let tmpId = `${pos['fila']}_${pos['columna']}`
                let tmpTd = document.getElementById(tmpId)
                tmpTd.setAttribute('class', 'bg-accent')               
            }
        }
    }
})

btn_limpiar.addEventListener('click', (_)=> location.reload())
