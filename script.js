"use strict";

/*
LIMITATIONS:
- works only on two numbers

CONSTRAINTS:
- cannot have two decimal points in a number
- cannot have two consecutive operators
- cannot have operator without two numbers
- can only have one decimal per number
- cannot have decimal only
- cannot have decimal and operator only
*/

// document.addEventListener(
//   "DOMContentLoaded",
//   function () {
//     document.querySelector("#result").focus();
//   },
//   false
// );

let firstNum = "",
  secondNum = "",
  operator = "";
let firstNumNegative = false,
  secondNumNegative = false,
  reset = false;

function scroll() {
  const result = document.getElementById("result");

  result.scrollTo({
    left: result.scrollWidth,
    behavior: "smooth",
  });
}

function toggleNegative() {
  if (reset) {
    clr();
  }
  let oldText = document.querySelector("#result").value;
  if (operator === "") {
    if (firstNumNegative == true) {
      let newText = oldText.replace("-", "");
      document.querySelector("#result").value = newText;
      firstNumNegative = false;
    } else {
      document.querySelector("#result").value = `-${oldText}`;
      firstNumNegative = true;
    }
  } else {
    let operatorPos = oldText.indexOf(operator);
    if (secondNumNegative == true) {
      // remove the negative symbol for the second number
      let secondNumText = oldText.substring(operatorPos, -1);
      console.log(`second num text = ${secondNumText}`);
      let finalText = secondNumText.replace("-", "");
      console.log(`final text = ${finalText}`);
      document.querySelector("#result").value = `${oldText.substring(
        0,
        operatorPos + 1
      )}${finalText}`;
      secondNumNegative = false;
    } else {
      // check if a number is already given
      if (
        oldText.charAt(oldText.length - 1) == operator ||
        oldText.charAt(oldText.length - 1) == "-"
      ) {
        // if no number, just append a "-" symbol
        console.log(`no number, appending negative symbol`);
        document.querySelector("#result").value = `${oldText}-`;
      } else {
        // if number exists, insert a negative symbol
        console.log(`number exists. Inserting negative symbol`);
        let newText = `${oldText.substring(
          0,
          operatorPos + 1
        )}-${oldText.substring(operatorPos, -1)}`;
        document.querySelector("#result").value = newText;
      }
      secondNumNegative = true;
    }
  }
}

function addDecimal() {
  if (reset) {
    clr();
  }
  let oldText = document.querySelector("#result").value;
  // check which number is on
  if (secondNum === "") {
    // check if already has decimal
    if (!firstNum.includes(".")) {
      firstNum += ".";
      document.querySelector("#result").value = `${oldText}.`;
      // console.log("added decimal");
    } else {
      console.error("firstNum already has a decimal");
    }
  } else {
    // check if already has decimal
    if (!secondNum.includes(".")) {
      secondNum += ".";
      document.querySelector("#result").value = `${oldText}.`;
      // console.log("added decimal");
    } else {
      console.error("secondNum already has a decimal");
    }
  }
}

function addNum(num) {
  if (reset) {
    clr();
  }
  let oldText = document.querySelector("#result").value;
  if (operator === "") {
    firstNum += num;
    document.querySelector("#result").value = `${oldText}${num}`;
    scroll();
    // console.log(`firstNum = ${firstNum}`);
  } else {
    secondNum += num;
    document.querySelector("#result").value = `${oldText}${num}`;
    scroll();
    // console.log(`secondNum = ${secondNum}`);
  }
}

function addOperator(newOperator) {
  if (reset) {
    clr();
  }
  // check if number already present
  if (firstNum === "") {
    console.error("Select a number first");
    return;
  }
  // check if operator already present
  else if (operator === "") {
    // check if firstNum contains at least 1 number
    if (!isNaN(parseFloat(firstNum))) {
      let oldText = document.querySelector("#result").value;
      operator = newOperator;
      document.querySelector("#result").value = `${oldText}${operator}`;
      // console.log(`operator = ${operator}`);
      scroll();
    } else {
      console.error("Must have number before adding operator");
      return;
    }
  } else {
    console.error("Operator already selected");
    return;
  }
}

function del() {
  if (reset) {
    clr();
  }
  if (secondNum != "") {
    sliceLast();
    secondNum = secondNum.slice(0, -1);
    // console.log(`secondNum(sliced) = ${secondNum}`);
    scroll();
  } else if (operator != "") {
    sliceLast();
    operator = "";
    // console.log(`operator removed!`);
    scroll();
  } else {
    sliceLast();
    firstNum = firstNum.slice(0, -1);
    // console.log(`firstNum(sliced) = ${firstNum}`);
    scroll();
  }
}

function sliceLast() {
  let newText = document.querySelector("#result").value.slice(0, -1);
  document.querySelector("#result").value = newText;
}

function calculate() {
  if (reset) {
    clr();
  }
  if (secondNum == "" && operator != "²") {
    console.error("No second number and not exponential");
    return;
  }
  if (firstNumNegative == true) {
    firstNum = -Math.abs(firstNum);
  }
  if (secondNumNegative == true) {
    secondNum = -Math.abs(secondNum);
  }
  switch (operator) {
    case "+":
      document.querySelector("#result").value = `${
        parseFloat(firstNum) + parseFloat(secondNum)
      }`;
      reset = true;
      break;
    case "-":
      document.querySelector("#result").value = `${
        parseFloat(firstNum) - parseFloat(secondNum)
      }`;
      reset = true;
      break;
    case "×":
      document.querySelector("#result").value = `${
        parseFloat(firstNum) * parseFloat(secondNum)
      }`;
      reset = true;
      break;
    case "÷":
      document.querySelector("#result").value = `${
        parseFloat(firstNum) / parseFloat(secondNum)
      }`;
      reset = true;
      break;
    case "²":
      document.querySelector("#result").value = `${parseFloat(firstNum) ** 2}`;
      reset = true;
      break;
    case "%":
      document.querySelector("#result").value = `${firstNum % secondNum}`;
      reset = true;
      break;
  }
}

function clr() {
  document.querySelector("#result").value = "";
  (firstNum = ""), (secondNum = ""), (operator = "");
  (firstNumNegative = false), (secondNumNegative = false), (reset = false);
}
