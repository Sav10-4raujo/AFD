const express = require('express'),
app = express(),
cors = require('cors');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

let alphabet= 0;
let states= 0;
let initialState= 0;
let finalStates= 0;

app.get("/a",(req,res)=>{

  res.json({msg:"ok"})

})

app.post('/start',(req, res)=>{

  alphabet = req.body.alphabet;
  states = req.body.states;
  initialState = req.body.initialState;
  finalStates = req.body.finalStates;

  console.log(req.body.states[0].transitions)
  console.log(req.body.states[1].transitions)
  console.log(req.body.states[2].transitions)


  res.json({msg:"ok"})

});




app.post('/work',(req, res)=>{
  console.log(req.body)
  let verify= false;
  let statusNow = initialState;
  let string = req.body.string;
  string = string.split('');

  for(a=0 ; a < string.length ; a++){

    for(i=0 ; i < states.length ; i++){

      if(alphabet.indexOf(string[a]) != -1){

        if(states[i].name == statusNow){
          console.log(string[a])
          
          statusNow = states[i].transitions[string[a]];

          break;
    
        }

      }else{

        res.json({msg:"Inválido"});
        verify = true;
        break;

      }
    
    }

  }


  for(i=0;i < finalStates.length; i++){

    if(statusNow == finalStates[i] ){

      res.json({msg:"Válido"});
      verify = true;
      break;
      return

    }

  }

  if(!verify){

    res.json({msg:"Inválido"})

  }

  statusNow = initialState

  
})

app.listen('3003',()=>{

  console.log("Gotcha!")

})