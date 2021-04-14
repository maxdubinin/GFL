window.addEventListener('DOMContentLoaded', function () {


/*  let propName1 = prompt("first prop name", "");
let propName2 = prompt("second prop name", "");
let calculator = {
  firstValue : null,
  secondValue : null,
  read() {
    this[propName1] = +prompt("Enter first value", '');
    this[propName2] = +prompt("Enter second value", '');
  },
  sum() {
    return this[propName1] + this[propName2];
  },
  mul() {
    return this[propName1] * this[propName2];
  }
}

calculator.read();
console.log( calculator.sum() );
console.log( calculator.mul() );*/

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
  }

class Calculator {

  add(firstOperand, secondOperand) {
      return firstOperand + secondOperand;
  }
  subtract(firstOperand, secondOperand) {
  return firstOperand - secondOperand;
}
  multiple(firstOperand, secondOperand) {
    return firstOperand * secondOperand;
  }
  devide(firstOperand, secondOperand) {
    return firstOperand / secondOperand;
  }
  percent(percent, number) {
    return number * (percent / 100);
  }
}

class AnotherCalculator {

  calculate(firstOperand, operation, secondOperator) {
    let result;
    const prev = parseFloat(firstOperand);
    const current = parseFloat(secondOperator);
    if (!isNumber(prev) || !isNumber(current)) return 'Please, enter a number!';
    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      case '%':
        result = current * (prev / 100);
        break;
      default:
        return 'Please, enter a valid operation';
    }
    return result;
  }
}

let calc = new Calculator();
console.log(calc.devide(1,2));
console.log(calc.percent(10,20));

let anotherCalc = new AnotherCalculator();
console.log(anotherCalc.calculate('50', '-', 100));
console.log(anotherCalc.calculate('8', '%', '100'));










});


