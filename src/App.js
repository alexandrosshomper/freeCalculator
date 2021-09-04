import { useState } from "react";

function App() {
  const [calc, setCalc] = useState("");
  const [decimal, setDecimal] = useState("false");
  const ops = ["/", "*", "+", "-"];

  const updateCalc = (value) => {
    console.log("updateCalc");
    if (
      //When calculation is empty and value is 0 return
      (value === "0" && calc === "") ||
      //When value is an operator and calc is empty
      (ops.slice(0, -1).includes(value) && calc === "") ||
      //When value is . and decimal is true
      (value === "." && decimal === true)
    ) {
      return;
    }
    //When value is operator and last char is operator
    if (ops.includes(value) && ops.includes(calc.slice(-1))) {
      console.log(calc + " ->" + calc.slice(0, -1) + value);
      //When value is - and last character is operator, append value
      if (value === "-" && ops.includes(calc.slice(-1))) {
        setCalc(calc + value);
        return;
      }
      console.log("Döp " + calc.slice(-2, -1));

      //Whenn value is oparator and last two characters are operators and last operator is -, change last two characters to value
      if (ops.includes(calc.slice(-2, -1))) {
        setCalc(calc.slice(0, -2) + value);
        return;
      }
      setCalc(calc.slice(0, -1) + value);
      return;
    }
    //When value is - and last char is -
    if (value === "-" && ops.includes(calc.slice(-1))) {
    }
    if (value === ".") {
      setDecimal(true);
      if (calc === "") {
        setCalc("0" + value);
        return;
      }
    }
    if (ops.includes(value) || value === "-") {
      setDecimal(false);
    }

    setCalc(calc + value);
  };
  const createDigits = () => {
    const digits = [];
    const digitID = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button
          onClick={() => updateCalc(i.toString())}
          id={digitID[i - 1]}
          key={i}
        >
          {i}
        </button>
      );
    }
    return digits;
  };

  const calculate = () => {
    if (calc === "") {
      return;
    }
    setCalc(eval(calc).toString());
  };
  const deleteAll = () => {
    if (calc === "") {
      return;
    }
    setCalc("");
    setDecimal(false);
  };
  return (
    <div className="App">
      <div className="calculator">
        <div className="display" id="display">
          {calc || "0"}
        </div>
        <div className="operators">
          <button onClick={() => updateCalc("/")} id="divide">
            /
          </button>
          <button onClick={() => updateCalc("*")} id="multiply">
            *
          </button>
          <button onClick={() => updateCalc("+")} id="add">
            +
          </button>
          <button onClick={() => updateCalc("-")} id="subtract">
            -
          </button>
          <button onClick={deleteAll} id="clear">
            AC
          </button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")} id="zero">
            0
          </button>
          <button onClick={() => updateCalc(".")} id="decimal">
            .
          </button>
          <button id="equals" onClick={calculate}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
