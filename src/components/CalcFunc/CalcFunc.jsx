import React, { useContext, useState, useEffect } from "react";

import { ControlPanel } from "components/ControlPanel/ControlPanel";
import { Display } from "components/Display/Display";
import { OPERATORS } from "constants//Operators";

import { HistoryContext } from "context/context";

import {
  AddCommand,
  Calculator,
  ClearCommand,
  DivideCommand,
  MultiplyCommand,
  SubtractCommand,
} from "utils/calculator";
import {
  checkCommaIsUnique,
  checkLastSignIsCloseBrackets,
  checkLastSignIsOpenBrackets,
  checkLastSignIsOperator,
  checkNumberExistAfterLastOpenBracket,
  doCalcExpression,
  generateErrorMsg,
  getLastNumberInExpr,
} from "utils/operations";

import { CalcWrapper } from "components/CalcLayout/styles";

const calculator = new Calculator();

export const FunctionalCalculator = () => {
  const { history, setHistory } = useContext(HistoryContext);
  const [expression, setExpression] = useState("0");
  const [currentOperator, setCurrentOperator] = useState("");
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  const handleExpressionValue = (value) => {
    switch (value) {
      case OPERATORS.CLEAR:
        handleClearDisplay();
        break;

      case OPERATORS.COMMA:
        handleComma(value);
        break;

      case OPERATORS.DELETE_LAST:
        handleBackOneSign();
        break;

      case OPERATORS.OPPOSITE:
        handleOppositeSign();
        break;

      case OPERATORS.OPEN_BRACKET:
        handleOpenBracket(value);
        break;

      case OPERATORS.CLOSE_BRACKET:
        handleCloseBracket(value);
        break;

      default:
        handleNumber(value);
    }
  };

  const handleClearDisplay = () => {
    setExpression("0");
    setIsError(false);
    setIsFinish(false);
    setResult("");
    setCurrentOperator("");
  };

  const handleComma = (value) => {
    const { isCommaAlreadyExist } = checkCommaIsUnique(expression);
    if (!isError) {
      if (!isCommaAlreadyExist) {
        setExpression(expression + value);
      }
    }
  };

  const handleBackOneSign = () => {
    if (!isError) {
      if (expression.length > 1) {
        const cutValue = expression.slice(0, -1);
        setExpression(cutValue);
      } else {
        setExpression("0");
      }
    }
  };

  const handleOppositeSign = () => {
    if (!isError && expression !== "0") {
      setExpression((Number(expression) * -1).toString());
    }
  };

  const handleOpenBracket = (value) => {
    const { lastSignIsOperator } = checkLastSignIsOperator(expression);

    if (!isError) {
      if (value === "(" && lastSignIsOperator) {
        calculator.executeCommand(new ClearCommand());
        setResult("0");
        setCurrentOperator("");
      }

      if ((expression.length === 1 && expression === "0") || isFinish) {
        setIsFinish(false);
        setExpression(value);
      } else {
        const lastSign = expression.charAt(expression.length - 1);

        if (lastSignIsOperator) {
          setExpression(expression + value);
        } else if (lastSign === "(") {
          setExpression(expression + value);
        }
      }
    }
  };

  const handleCloseBracket = (value) => {
    const { lastSignIsOperator } = checkLastSignIsOperator(expression);
    const { numberIsExist } = checkNumberExistAfterLastOpenBracket(expression);
    if (
      expression.length !== 1 &&
      !lastSignIsOperator &&
      expression.includes("(") &&
      numberIsExist
    ) {
      setCurrentOperator("");
      handleImmediateResult(currentOperator);
      setExpression(expression + value);
    }
  };

  const handleNumber = (value) => {
    const operands = "+-/*%";
    const curValueIsOperator = operands.includes(value);
    const { lastSignIsOperator } = checkLastSignIsOperator(expression);
    const { lastSignIsOpenBracket } = checkLastSignIsOpenBrackets(expression);
    const { lastSignIsCloseBracket } = checkLastSignIsCloseBrackets(expression);
    if (curValueIsOperator) {
      setCurrentOperator(value);
    }

    if (expression === "0") {
      if (!curValueIsOperator) {
        setExpression(value);
        setIsFinish(false);
      }
    } else if (isError && !curValueIsOperator) {
      setIsError(false);
      setExpression(value);
    } else if (isFinish && !curValueIsOperator) {
      setIsFinish(false);
      setExpression(value);
    }
    // sign need to be added
    else if (!lastSignIsOperator && !isError && !lastSignIsOpenBracket) {
      setExpression(expression + value);
      setIsFinish(false);
    } else if (!curValueIsOperator) {
      setExpression(expression + value);
      setIsFinish(false);
    }

    // immediateResult
    if (
      curValueIsOperator &&
      !lastSignIsCloseBracket &&
      !lastSignIsOpenBracket &&
      !lastSignIsOperator
    ) {
      handleImmediateResult(currentOperator);
    }

    if (value === OPERATORS.EQUAL) {
      handleCalculation();
      calculator.executeCommand(new ClearCommand());
      setResult("");
      setIsFinish(true);
    }
  };

  const handleCalculation = () => {
    if (!isError) {
      setHistory([...history, expression]);
    }
    const res = doCalcExpression(expression);

    if (res || res === 0) {
      if (String(res).includes("Error")) {
        const errRes = generateErrorMsg(String(res));
        setExpression(errRes);
        setIsError(true);
        setIsFinish(true);
      } else {
        setExpression(String(res));
        setIsFinish(true);
        setResult("");
        setCurrentOperator("");
      }
    }
  };

  const handleImmediateResult = (operator) => {
    const { lastNumber } = getLastNumberInExpr(expression);
    switch (operator) {
      case OPERATORS.MINUS:
        calculator.executeCommand(new SubtractCommand(lastNumber));
        setResult(calculator.value.toString());
        break;

      case OPERATORS.PLUS:
        calculator.executeCommand(new AddCommand(lastNumber));
        setResult(calculator.value.toString());
        break;

      case OPERATORS.DIVIDE:
        calculator.executeCommand(new DivideCommand(lastNumber));
        setResult(calculator.value.toFixed(3));
        break;

      case OPERATORS.MULTIPLY:
        calculator.executeCommand(new MultiplyCommand(lastNumber));
        setResult(calculator.value.toString());
        break;

      default:
        calculator.executeCommand(new AddCommand(lastNumber));
        setResult(calculator.value.toString());
    }
  };
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  return (
    <CalcWrapper>
      <Display error={isError} value={expression} result={result} />
      <ControlPanel handleClick={handleExpressionValue} />
    </CalcWrapper>
  );
};
