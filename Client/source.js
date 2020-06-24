
function send(){

  let alphabet = document.querySelector("#alphabet").value;
  alphabet = alphabet.split('');
//VALIDAÇÃO ALFABETO
  if(alphabet.length < 2){
	  window.alert("O tamanho do alfabeto precisa ser, no mínimo, dois.")
	  return
  }
  for(let i = 0; i < alphabet.length; i++){
	  if(
		!(alphabet[i].charCodeAt(0) >= 48 && alphabet[i].charCodeAt(0) <= 57) && //Checar se não está entre 0~9
		!(alphabet[i].charCodeAt(0) >= 65 && alphabet[i].charCodeAt(0) <= 90) && //Checar se não está entre A~Z
		!(alphabet[i].charCodeAt(0) >= 97 && alphabet[i].charCodeAt(0) <= 122)	 //Checar se não está entre a~z
		){
		  window.alert("Alfabeto possui caracteres inválidos! Use apenas caracteres entre 0~9, A~Z e a~z.")
		  return 
		}
  }
//;VALIDAÇÃO ALFABETO
  let transitions = [];
  let states = [];
  let name = 0;
  let count = 0;
  let transitionsStrings = 0;
  let statesString = document.querySelector("#states").value;
//VALIDAÇÃO ESTADOS
  if(alphabet.length < 2){
	  window.alert("São necessários pelo menos dois estados.")
	  return
  }
  for(let i = 0; i < statesString.length; i++){
	  if(
		!(statesString[i].charCodeAt(0) >= 48 && statesString[i].charCodeAt(0) <= 57) &&  //Checar se não está entre 0~9
		!(statesString[i].charCodeAt(0) >= 65 && statesString[i].charCodeAt(0) <= 90) &&  //Checar se não está entre A~Z
		!(statesString[i].charCodeAt(0) >= 97 && statesString[i].charCodeAt(0) <= 122) && //Checar se não está entre a~z
		!("/,; ".includes(statesString[i]))												  //Checar se não está usando /,;
		){
		  window.alert("Estados possuem caracteres inválidos! Use apenas caracteres entre 0~9, \"/,;\", A~Z e a~z.")
		  return
		}
  }

//;VALIDAÇÃO ESTADOS
  statesString = statesString.split(' ');
  statesString.forEach((e)=>{
    name = e.split("/")[0];
    transitionsStrings = e.split("/")[1];
    transitionsStrings = transitionsStrings.split(';');


    for(let i = 0; i < transitionsStrings.length; i++){

      transitions[transitionsStrings[i].split(",")[0]] = transitionsStrings[i].split(",")[1]
      
    }

      states[count] = JSON.parse(JSON.stringify({name, transitions}))
      count ++
  })

  let initialState = document.querySelector("#initialState").value;
  let finalStates = document.querySelector("#finalStates").value;
//VALIDAÇÃO ESTADO INICIAL E FINAL
  if(initialState.length < 2){
	  window.alert("Estado inicial inválido.")
	  return
  } 
  if(finalStates.length < 2){
	  window.alert("Estado final inválido.")
	  return
  }

  let statesNames = []
  for(let i = 0; i < states.length; i++){
	statesNames.push(states[i].name)
  }
  if(!statesNames.includes(initialState)){
	  window.alert("Estado inicial inválido.")
	  return
  }
  for(let i = 0; i < finalStates.length; i++){
	  if(!statesNames.includes(finalStates[i])){
		  window.alert("Estado final inválido.")
		  return
	  }
  }
//;VALIDAÇÃO ESTADO INICIAL E FINAL

  $.ajax({
    url: "http://localhost:3003/start",
    method: "post",
    data: {
      alphabet,
      states,
      initialState,
      finalStates
    },
    success: function(data){
      console.log(data)
    }
  })

}

function string (){

  let string = document.querySelector("#string").value;
//VALIDAÇÃO STRING
  if(string.length < 2){
	  window.alert("O tamanho da string precisa ser, no mínimo, dois.")
	  return
  }
  for(let i = 0; i < string.length; i++){
	  if(
		!(string[i].charCodeAt(0) >= 48 && string[i].charCodeAt(0) <= 57) && //Checar se não está entre 0~9
		!(string[i].charCodeAt(0) >= 65 && string[i].charCodeAt(0) <= 90) && //Checar se não está entre A~Z
		!(string[i].charCodeAt(0) >= 97 && string[i].charCodeAt(0) <= 122)	 //Checar se não está entre a~z
		){
		  window.alert("String possui caracteres inválidos! Use apenas caracteres no alfabeto disponível.")
		  return 
		}
  }
//;VALIDAÇÃO STRING
  let status = document.querySelector("#status");

  $.ajax({
    url: "http://localhost:3003/work",
    method: "post",
    data: {string},
    success: function(data){
      status.innerHTML = `<H1>${data.msg}</H1>`
    }
  })



}