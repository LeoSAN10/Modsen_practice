import React from "react";
import { Panel } from "components/Panel/Panel";
import { Display } from "components/Display/Display";
import { OPERATORS } from "constants/operators";

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
  numberIsFloat,
} from "utils/operations";

import { Container } from "components/Panel/styles";

export class ClassCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: "0",
      currentOperator: "",
      result: "",
      isError: false,
      isFinished: false,
    };
    this.calculator = new Calculator();
  }

  handleExpressionValue = (value) => {
    switch (value) {
      case OPERATORS.CLEAR:
        this.handleClearDisplay();
        break;

      case OPERATORS.COMMA:
        this.handleComma(value);
        break;

      case OPERATORS.DELETE_LAST:
        this.handleBackOneSign();
        break;

      case OPERATORS.OPPOSITE:
        this.handleOppositeSign();
        break;

      case OPERATORS.OPEN_BRACKET:
        this.handleOpenBracket(value);
        break;

      case OPERATORS.CLOSE_BRACKET:
        this.handleCloseBracket(value);
        break;

      default:
        this.handleNumber(value);
    }
  };

  handleClearDisplay = () => {
    this.setState({
      expression: "0",
      isError: false,
      isFinished: false,
      result: "",
      currentOperator: "",
    });
    this.calculator.executeCommand(new ClearCommand());
  };

  handleComma = (value) => {
    const { expression, isError } = this.state;
    const { isCommaAlreadyExist } = checkCommaIsUnique(expression);
    if (!isError) {
      if (!isCommaAlreadyExist) {
        this.setState(() => ({
          expression: expression + value,
        }));
      }
    }
  };

  handleBackOneSign = () => {
    const { expression, isError } = this.state;
    if (!isError) {
      if (expression.length > 1) {
        this.setState({
          expression: expression.slice(0, -1),
        });
      } else {
        this.setState({ expression: "0" });
      }
    }
  };

  handleOppositeSign = () => {
    const { isError, expression } = this.state;
    if (!isError && expression !== "0") {
      this.setState({
        expression: (Number(expression) * -1).toString(),
      });
    }
  };

  handleOpenBracket = (value) => {
    const { expression, isFinished, isError } = this.state;
    const { lastSignIsOperator } = checkLastSignIsOperator(expression);

    if (!isError) {
      if (value === OPERATORS.OPEN_BRACKET && lastSignIsOperator) {
        this.calculator.executeCommand(new ClearCommand());
        this.setState({ result: "0", currentOperator: "" });
      }

      if ((expression.length === 1 && expression === "0") || isFinished) {
        this.setState({
          expression: value,
          isFinished: false,
        });
      } else {
        const lastSign = expression.charAt(expression.length - 1);
        if (lastSignIsOperator) {
          this.setState({ expression: expression + value });
        } else if (lastSign === "(") {
          this.setState({ expression: expression + value });
        }
      }
    }
  };

  handleCloseBracket = (value) => {
    const { expression, currentOperator } = this.state;
    const { lastSignIsOperator } = checkLastSignIsOperator(expression);
    const { numberIsExist } = checkNumberExistAfterLastOpenBracket(expression);
    if (
      expression.length !== 1 &&
      !lastSignIsOperator &&
      expression.includes(OPERATORS.OPEN_BRACKET) &&
      numberIsExist
    ) {
      this.setState({ currentOperator: "" });
      this.handleImmediateResult(currentOperator);
      this.setState({ expression: expression + value });
    }
  };

  handleNumber = (value) => {
    const { expression, isError, isFinished, currentOperator } = this.state;
    const operators = "+-/*%";
    const curValueIsOperator = operators.includes(value);
    const { lastSignIsOperator } = checkLastSignIsOperator(expression);
    const { lastSignIsOpenBracket } = checkLastSignIsOpenBrackets(expression);
    const { lastSignIsCloseBracket } = checkLastSignIsCloseBrackets(expression);
    if (curValueIsOperator) {
      this.setState({ currentOperator: value });
    }

    if (expression === "0") {
      if (!curValueIsOperator) {
        this.setState({
          expression: value,
          isFinished: false,
        });
      }
    } else if (isError && !curValueIsOperator) {
      this.setState({ expression: value, isError: false });
    } else if (isFinished && !curValueIsOperator) {
      this.setState({
        expression: value,
        isFinished: false,
      });
    } else if (!lastSignIsOperator && !isError && !lastSignIsOpenBracket) {
      this.setState(() => ({
        expression: expression + value,
        isFinished: false,
      }));
    } else if (!curValueIsOperator) {
      this.setState(() => ({
        expression: expression + value,
        isFinished: false,
      }));
    }

    if (
      curValueIsOperator &&
      !lastSignIsCloseBracket &&
      !lastSignIsOpenBracket &&
      !lastSignIsOperator
    ) {
      this.handleImmediateResult(currentOperator);
    }

    if (value === OPERATORS.EQUAL) {
      this.handleCalculation();
      this.calculator.executeCommand(new ClearCommand());
      this.setState({ result: "", isFinished: true });
      this.context.setHistory([...this.context.history, expression]);
      localStorage.setItem("history", JSON.stringify(this.context.history));
    }
  };

  handleImmediateResult = (operator) => {
    const { expression } = this.state;
    const { lastNumber } = getLastNumberInExpr(expression);
    switch (operator) {
      case OPERATORS.MINUS:
        this.calculator.executeCommand(new SubtractCommand(lastNumber));
        this.setState({
          result: numberIsFloat(this.calculator.value)
            ? this.calculator.value.toString()
            : this.calculator.value.toFixed(3),
        });
        break;

      case OPERATORS.PLUS:
        this.calculator.executeCommand(new AddCommand(lastNumber));
        this.setState({
          result: numberIsFloat(this.calculator.value)
            ? this.calculator.value.toString()
            : this.calculator.value.toFixed(3),
        });
        break;

      case OPERATORS.DIVIDE:
        this.calculator.executeCommand(new DivideCommand(lastNumber));
        this.setState({
          result: numberIsFloat(this.calculator.value)
            ? this.calculator.value.toString()
            : this.calculator.value.toFixed(3),
        });
        break;

      case OPERATORS.MULTIPLY:
        this.calculator.executeCommand(new MultiplyCommand(lastNumber));
        this.setState({
          result: numberIsFloat(this.calculator.value)
            ? this.calculator.value.toString()
            : this.calculator.value.toFixed(3),
        });
        break;

      default:
        this.calculator.executeCommand(new AddCommand(lastNumber));
        this.setState({
          result: numberIsFloat(this.calculator.value)
            ? this.calculator.value.toString()
            : this.calculator.value.toFixed(3),
        });
    }
  };

  handleCalculation = () => {
    const { expression } = this.state;
    const res = doCalcExpression(expression);

    if (res || res === 0) {
      if (String(res).includes("Error")) {
        const errRes = generateErrorMsg(String(res));
        this.setState({
          expression: errRes,
          isError: true,
          isFinished: true,
        });
      } else {
        this.setState({
          expression: String(res),
          isFinished: true,
          result: "",
          currentOperator: "",
        });
      }
    }
  };

  render() {
    const { expression, isError, result } = this.state;
    return (
      <Container>
        <Display error={isError} value={expression} result={result} />
        <Panel handleClick={this.handleExpressionValue} />
      </Container>
    );
  }
}

ClassCalculator.contextType = HistoryContext;
