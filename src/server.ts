import express from "express";
import { resourceLimits } from "worker_threads";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get("/eat/apple", (req, res) => {
  res.json({
    message: "Yum yum - you ate an apple!",
  });
});

app.get("/eat/banana", (req, res) => {
  res.json({
    message: "Yum yum - you ate a banana!",
  });
});

app.get("/eat/carrot", (req, res) => {
  res.json({
    message: "Yum yum - you ate a carrot!",
  });
});

app.get("/echo/:exampleRouteParameter", (req, res) => {
  const echoContent = req.params.exampleRouteParameter;
  res.json({
    echo: echoContent,
    message: `I am echoing back to you: ${echoContent}`,
  });
});

app.get("/multiply/:numOne/:numTwo", (req, res) => {
  /**
   * Note that `numOne` and `numTwo` are both typed as string.
   * (Hover over with your mouse to see!)
   *
   * Route params are, by default, typed as strings when they
   * are parsed by Express.
   */
  const { numOne, numTwo } = req.params;
  const multiplication = parseInt(numOne) * parseInt(numTwo);
  res.json({
    original: `${numOne} x ${numTwo}`,
    result: multiplication,
  });
});

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});


//added route parameters

//shout/hello

app.get<{shout: string}>("/shout/:shout", (req, res) =>{
  let shout= `${req.params.shout}`;
  res.send({
    "shout" : `${shout.toUpperCase()}!`,
    "result" : `I am shouting back to you ${shout.toUpperCase()}!`,


  });
});

//shout/quick-brown-fox - no need for this because it is covered above dear xx

// app.get<{fox : string}>("/shout/quick-brown-fox", (req, res) =>{
//   let brownFox = `${req.params.fox}!`;
//   res.json({
//     shout: `${brownFox.toUpperCase()}!`,
//     result: `I am shouting back to you ${brownFox.toUpperCase()}!`
//   });
// });


//Addition - both 2 numbers and 3 numbers

app.get<{numOne: string, numTwo: string, numThree?: string}>("/add/:numOne/:numTwo/:numThree?", (req, res) => {
  /**
   * Note that `numOne` and `numTwo` are both typed as string.
   * (Hover over with your mouse to see!)
   *
   * Route params are, by default, typed as strings when they
   * are parsed by Express.
   */
  const { numOne, numTwo, numThree } = req.params;
  let result: number;
  let original: string;
  let num1= parseInt(numOne);
  let num2 = parseInt(numTwo);
  
  
  if(numThree){
    original = `${numOne} + ${numTwo} + ${numThree}`
    result = num1 + num2 + parseInt(numThree);
    
  }else if(!numThree){
    original = `${numOne} + ${numTwo}`
    result = num1 + num2;
  }else{
    original = `This ain't here`
    result = 0;
  }
  res.json({
    original: original,
    result: result,
  });
});


//Eating food - paying attention to a / an (for leading vowels only)

app.get<{animal : string}>("/eat/:animal", (req, res) =>{
  let vowels: Array<string> = ['a','e','i','o','u'];
  let animal = req.params.animal;
  let word: string;
  if (vowels.includes(animal[0])){
    word = "an";
  }

  else{
    word = "a";
  }

  res.json({
    message: `Yum yum - you ate ${word} ${animal}`,

  });
});


//using 4000 by convention, but could be changed
const PORT_NUMBER = 3000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
