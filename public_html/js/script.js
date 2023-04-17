/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


const btnAgregar = document.getElementById("btnAgregar");
const contenedorCampos = document.getElementById("contenedorCampos");
const contenedorUni = document.getElementById("contenedorUni");
const contenedorMulti = document.getElementById("contenedorMulti");
const times = document.querySelector('#times');
const casos = document.querySelector('#tabla2 tbody');
//Matriz que contendrá los datos leídos en los input-text
let matrizDatos=[];
const idRow = document.createElement('th');

btnAgregar.addEventListener("click", function () {
  const divCampos = document.createElement("div");

  for (let i = 1; i <= 3; i++) {
    const inputCampo = document.createElement("input");
    inputCampo.type = "text";
    inputCampo.name = `campo${i}`;
    var m="";
    switch(i){
        
            case 1: m="Input Process ID";
                break;
                case 2: m="Input CPU Time";
                break;
                
                case 3: m="Input I/O Time";
                break;
    }
    
    inputCampo.placeholder=m;
    divCampos.appendChild(inputCampo);
  }

  contenedorCampos.appendChild(divCampos);
});

localStorage.removeItem("suma");


btnLeer.addEventListener("click", function () {
  const camposTexto = document.querySelectorAll("input[type=text]");
  var suma = 0;
  let filas=camposTexto.length/3;
  let col=0;
  let j=0;
  for (let i=0;i<filas;i++)
  {
      matrizDatos[i]=[];
      matrizDatos[i][j]=camposTexto[col].value;
      matrizDatos[i][j+1]=camposTexto[col+1].value;
      matrizDatos[i][j+2]=camposTexto[col+2].value;
      col+=3;
      suma += Number(matrizDatos[i][j+1]) + Number(matrizDatos[i][j+2]);
  }

  localStorage.setItem("suma",suma);
  window.alert("The data read dynamically in the input-text is loaded into an array named matrizDatos of size nx3. \n You can use this array to solve your requirements. ");
  console.log(matrizDatos);
  createTable(matrizDatos);

});

function createTable(matrix) {
 let table = '<table border="1" align="center"><thead><tr><th>ID </th><th>CPU Time</th><th>I/O Time</th></tr></thead><tbody>';
  for (let i = 0; i < matrix.length; i++) {
    table += '<tr><td>' + matrix[i][0] + '</td><td>' + matrix[i][1] + '</td><td>' + matrix[i][2] + '</td></tr>';
  }
  table += '</tbody></table><br><br>';
  document.getElementById('tabla').innerHTML = table;
}



function createTable2(matriz) {
  times.innerHTML = '';
  casos.innerHTML = '';
  var a=0;
  var cont=0;
  var cpu = 0;
  var io = 0;
  idRow.style.width ='40px';
  idRow.style.textAlign = 'center';
  idRow.innerHTML += 'Id';
  times.appendChild(idRow);
  for(let i=0;i<localStorage.getItem("suma");i++){
    const row = document.createElement('th');
    row.style.width = '40px';
    row.style.textAlign = 'center';
    row.innerHTML += ' '+(i+1)+'</th>';
    times.appendChild(row);
  }
  
  for(let i=0; i < matriz.length; i++){

    const newRow = document.createElement('tr');
    newRow.style.width = '40px';
    newRow.style.textAlign = 'center';

    const idColumn = document.createElement('td');
    idColumn.style.width ='40px';
    idColumn.style.textAlign = 'center';
    idColumn.innerHTML += ''+Number(matriz[i][a]);

    newRow.appendChild(idColumn);
    
    if(i>0){
      for(let j = 1; j <= cont ; j++)
      {
          const column3 = document.createElement('td');
          column3.style.backgroundColor = "gray";
          newRow.appendChild(column3);
      }
     }
    for(cpu;cpu<Number(matriz[i][a+1]);cpu++){
      const column1 = document.createElement('td');
      column1.style.backgroundColor = "green";
      newRow.appendChild(column1);
      
      if(io<Number(matriz[i][a+2])){
        
        for(io;io < Number(matriz[i][a+2]);io++)
        {
          const column2 = document.createElement('td');
          column2.style.backgroundColor = "gainsboro";
          newRow.appendChild(column2);
        }
      }
    }
    cont += Number(matriz[i][a+1]) + Number(matriz[i][a+2]);
    
    if(cpu==Number(matriz[i][a+1])){
      for(let b = cont;b<localStorage.getItem("suma");b++)
      {
        const column4 = document.createElement('td');
        column4.style.backgroundColor = "gray";
        newRow.appendChild(column4);
      }
    }
    cpu=0;
    io=0;
    casos.appendChild(newRow);
  }
  console.log(cont);
}


btnUni.addEventListener("click", function () {
     const nuevoParrafo = document.createElement("p");
    const textoParrafo = document.createTextNode("A table for Uniprogramming is printed below.");
    nuevoParrafo.appendChild(textoParrafo);
    contenedorUni.appendChild(nuevoParrafo);  
    createTable2(matrizDatos);
});

btnMulti.addEventListener("click", function () {
     const nuevoParrafo = document.createElement("p");
    const textoParrafo = document.createTextNode("A table for Multiprogramming is printed below.");
    nuevoParrafo.appendChild(textoParrafo);
    contenedorMulti.appendChild(nuevoParrafo);
});