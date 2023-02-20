class Calculator {
  constructor() {
    this.value = 0;
    this.history = [];
  }

  executeCommand(command) {
    this.history.push(command);
    this.value = command.execute(this.value);
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      this.value = command.undo(this.value);
    }
  }

  getValue() {
    return parseFloat(this.current.toFixed(3));
  }

  reset() {
    this.current = 0;
    this.history = [];
  }

  setValue(value) {
    this.value = value;
  }
}

class AddCommand {
  constructor(valueToAdd) {
    this.valueToAdd = valueToAdd;
  }

  execute(currentValue) {
    return currentValue + this.valueToAdd;
  }

  undo(currentValue) {
    return currentValue - this.valueToAdd;
  }
}

class SubtractCommand {
  constructor(valueToSubtract) {
    this.valueToSubtract = valueToSubtract;
  }

  execute(currentValue) {
    return currentValue - this.valueToSubtract;
  }

  undo(currentValue) {
    return currentValue + this.valueToSubtract;
  }
}

class MultiplyCommand {
  constructor(valueToMultiply) {
    this.valueToMultiply = valueToMultiply;
  }

  execute(currentValue) {
    return this.valueToMultiply * currentValue;
  }

  undo(currentValue) {
    return this.valueToMultiply / currentValue;
  }
}

class DivideCommand {
  constructor(valueToDivide) {
    this.valueToDivide = valueToDivide;
  }

  execute(currentValue) {
    const calcValue =
      Math.round((currentValue / this.valueToDivide) * 1000) / 1000;
    return calcValue;
  }

  undo(currentValue) {
    return this.valueToDivide * currentValue;
  }
}
class ClearCommand {
  tempValue = 0;

  execute(currentValue) {
    this.tempValue = currentValue;
    return 0;
  }

  undo() {
    return this.tempValue;
  }
}

class RemainderCommand {
  constructor(valueToRemainder) {
    this.valueToRemainder = valueToRemainder;
    this.temp = 0;
  }

  execute(currentValue) {
    this.temp = Math.floor(currentValue / this.valueToRemainder);
    return currentValue % this.valueToRemainder;
  }

  undo(currentValue) {
    const tempVal = this.temp * this.valueToRemainder;
    return currentValue + tempVal;
  }
}

export {
  AddCommand,
  Calculator,
  ClearCommand,
  DivideCommand,
  MultiplyCommand,
  RemainderCommand,
  SubtractCommand,
};
