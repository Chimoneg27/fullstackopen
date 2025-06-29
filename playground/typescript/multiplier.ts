type Operation = 'multiply' | 'divide' | 'add'; // defining the type of operation
// line 1 is called an union type, which is formed from two or more types
// type Operation: this is a type alias, which is a way to give a name to a type
type Result = number | string; // defining the type of result, which can be a number or a string

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0!'); return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
}


try {
  console.log(calculator(1, 5 , 'divide'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}