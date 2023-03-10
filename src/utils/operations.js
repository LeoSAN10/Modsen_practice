const generateArrFromStr = (str) => {
  const strArr = str.trim().split("");

  // str without spaces
  let nakedStr = strArr.filter((i) => i !== "" && i !== " ");
  const lastSymbolIsOperator = /\+|\-|\/|\=|\%|x/.test(
    nakedStr[nakedStr.length - 1]
  );
  nakedStr = !lastSymbolIsOperator
    ? nakedStr
    : nakedStr.splice(0, nakedStr.length - 1);

  const symbolStr = "/*+-%()";
  const calculation = [];
  let current = "";

  for (let i = 0; i < nakedStr.length; i += 1) {
    const symbol = nakedStr[i];
    if (symbolStr.includes(symbol)) {
      if (current.length > 0) {
        calculation.push(+current);
        calculation.push(symbol);
      } else {
        calculation.push(symbol);
      }
      current = "";
    } else {
      current += symbol;
    }
  }
  if (current !== "") {
    calculation.push(+current);
  }
  // check negative sign in the beginning
  if (calculation[0] === "-") {
    const temp = calculation[1];
    calculation[1] = temp * -1;
    return calculation.splice(1, calculation.length);
  }
  return calculation;
};

// check if Brackets is paired
const checkBrackets = (calculation) => {
  const stack = [];
  for (const el of calculation) {
    if (el === "(") {
      stack.push(el);
    } else if (el === ")") {
      const topOfStack = stack[stack.length - 1];
      if (stack.length > 0 && topOfStack !== el) {
        stack.pop();
      } else {
        throw new Error("ExpressionError: Brackets must be paired!!!");
      }
    }
  }
  if (!stack.length) {
    return true;
  }
  throw new Error("ExpressionError: Brackets must be paired!!!");
};

const doCalc = (expr) => {
  let calculation = expr;
  const simple = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  };
  const complicated = {
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "%": (a, b) => a % b,
  };

  const operators = [complicated, simple];

  let newCalculation = [];
  let operatorIsExist = false;
  let curOperator = (a, b) => a + b;

  for (const operator of operators) {
    for (let i = 0; i < calculation.length; i += 1) {
      // if current el of calculation is operator then remember it for further operation else it is number - push it to newCalculation array
      const currentEl = calculation[i];
      if (operator[currentEl]) {
        curOperator = operator[currentEl];
        operatorIsExist = true;
      } else if (operatorIsExist) {
        if (curOperator === operator["/"] && currentEl === 0) {
          throw new Error("TypeError: Division by zero!!!");
        } else {
          const lastNumber = newCalculation[newCalculation.length - 1];

          const curValue = curOperator(lastNumber, currentEl);

          newCalculation[newCalculation.length - 1] = curValue;
          operatorIsExist = false;
        }
      } else {
        newCalculation.push(currentEl);
      }
    }
    calculation = newCalculation;
    newCalculation = [];
  }
  const res = calculation[0];
  return Math.round(+res * 1000) / 1000;
};

const doCalcExpression = (expr) => {
  const calculation = generateArrFromStr(expr);

  // if brackets is paired continue
  try {
    if (calculation.includes("(") || calculation.includes(")")) {
      const bracketsIsValid = checkBrackets(calculation);
      if (bracketsIsValid) {
        // make finding the brackets and calculate the inside brackets expression while calculation length will not be equal to 1
        while (calculation.length !== 1) {
          let indexOfCloseBr = calculation.indexOf(")"); // find first close bracket
          const tempArr = calculation.slice(0, indexOfCloseBr);
          let indexOfOpenBr = tempArr.lastIndexOf("("); // find last open bracket but in the array not longer then close bracket(in tempArr);
          if (indexOfCloseBr !== -1) {
            const innerCalcExp = calculation.slice(
              indexOfOpenBr + 1,
              indexOfCloseBr
            );
            const innerRes = doCalc(innerCalcExp);
            calculation.splice(
              indexOfOpenBr,
              indexOfCloseBr - indexOfOpenBr + 1,
              innerRes
            );
            indexOfOpenBr = null;
            indexOfCloseBr = null;
          } else {
            const res = doCalc(calculation);
            return Math.round(+res * 10000) / 10000;
          }
        }
      }
    } else {
      const res = doCalc(calculation);
      return Math.round(+res * 10000) / 10000;
    }
  } catch (err) {
    return err;
  }
  return calculation[0];
};

const separateStrBySymbols = (str) => {
  const regExp = /\+|\-|\/|\)|\(|\%|x/;
  return str.split(regExp);
};

const checkCommaIsUnique = (expr) => {
  const arr = separateStrBySymbols(expr);
  const lastEl = arr[arr.length - 1];
  const isCommaAlreadyExist = lastEl.includes(".");

  return { isCommaAlreadyExist };
};

const checkLastSignIsOperator = (expr) => {
  const operators = "+-/x%";
  const lastInExpression = expr[expr.length - 1];
  const lastSignIsOperator = operators.includes(lastInExpression);
  return { lastSignIsOperator };
};

const checkLastSignIsOpenBrackets = (expr) => {
  const lastInExpression = expr[expr.length - 1];
  const lastSignIsOpenBracket = lastInExpression === "(";
  return { lastSignIsOpenBracket };
};

const checkLastSignIsCloseBrackets = (expr) => {
  const lastInExpression = expr[expr.length - 1];
  const lastSignIsCloseBracket = lastInExpression === ")";
  return { lastSignIsCloseBracket };
};

const checkNumberExistAfterLastOpenBracket = (expr) => {
  const indexOfLastOpenBr = expr.lastIndexOf("(");
  const subStrFromLastOpenBr = expr.substring(indexOfLastOpenBr);
  const regExp = /[0-9]/;
  const numberIsExist = regExp.test(subStrFromLastOpenBr);
  return { numberIsExist };
};

const checkExprContainsBracket = (expr) => {
  const regExp = /\(|\)/;
  return regExp.test(expr);
};

const getLastNumberInExpr = (expr) => {
  const arr = generateArrFromStr(expr);
  const lastNumber = Number(arr[arr.length - 1]);
  return { lastNumber };
};

const generateErrorMsg = (msg) => {
  const str = msg.split(":");
  return str[str.length - 1];
};

const numberIsFloat = (n) => n % 1 === 0;

export {
  checkBrackets,
  checkCommaIsUnique,
  checkExprContainsBracket,
  checkLastSignIsCloseBrackets,
  checkLastSignIsOpenBrackets,
  checkLastSignIsOperator,
  checkNumberExistAfterLastOpenBracket,
  doCalcExpression,
  generateErrorMsg,
  getLastNumberInExpr,
  numberIsFloat,
};
