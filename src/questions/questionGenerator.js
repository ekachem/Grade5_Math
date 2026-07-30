function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function greatestCommonDivisor(a, b) {
  let first = Math.abs(a);
  let second = Math.abs(b);

  while (second !== 0) {
    const remainder = first % second;
    first = second;
    second = remainder;
  }

  return first;
}

function simplifyFraction(numerator, denominator) {
  const divisor = greatestCommonDivisor(numerator, denominator);

  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor,
  };
}

function createAlgebraQuestion(difficulty) {
  if (difficulty === "easy") {
    const answer = randomInteger(1, 20);
    const addedNumber = randomInteger(1, 15);
    const result = answer + addedNumber;

    return {
      prompt: `x + ${addedNumber} = ${result}`,
      instruction: "Find the value of x.",
      answer: String(answer),
      answerType: "number",
    };
  }

  if (difficulty === "medium") {
    const answer = randomInteger(2, 12);
    const multiplier = randomInteger(2, 10);
    const result = answer * multiplier;

    return {
      prompt: `${multiplier}x = ${result}`,
      instruction: "Find the value of x.",
      answer: String(answer),
      answerType: "number",
    };
  }

  const answer = randomInteger(2, 15);
  const multiplier = randomInteger(2, 8);
  const addedNumber = randomInteger(2, 20);
  const result = multiplier * answer + addedNumber;

  return {
    prompt: `${multiplier}x + ${addedNumber} = ${result}`,
    instruction: "Find the value of x.",
    answer: String(answer),
    answerType: "number",
  };
}

function createEasyFractionQuestion() {
  const denominator = randomInteger(2, 10);
  const firstNumerator = randomInteger(1, denominator - 1);
  const secondNumerator = randomInteger(1, denominator - 1);
  const totalNumerator = firstNumerator + secondNumerator;

  const simplified = simplifyFraction(totalNumerator, denominator);

  return {
    prompt: `${firstNumerator}/${denominator} + ${secondNumerator}/${denominator}`,
    instruction: "Add the fractions. Simplify your answer.",
    answer: `${simplified.numerator}/${simplified.denominator}`,
    answerType: "fraction",
  };
}

function createMediumFractionQuestion() {
  const denominator = randomInteger(3, 12);
  const largerNumerator = randomInteger(2, denominator);
  const smallerNumerator = randomInteger(1, largerNumerator - 1);
  const resultNumerator = largerNumerator - smallerNumerator;

  const simplified = simplifyFraction(resultNumerator, denominator);

  return {
    prompt: `${largerNumerator}/${denominator} - ${smallerNumerator}/${denominator}`,
    instruction: "Subtract the fractions. Simplify your answer.",
    answer: `${simplified.numerator}/${simplified.denominator}`,
    answerType: "fraction",
  };
}

function createHardFractionQuestion() {
  const firstDenominator = randomInteger(2, 8);
  let secondDenominator = randomInteger(2, 8);

  while (secondDenominator === firstDenominator) {
    secondDenominator = randomInteger(2, 8);
  }

  const firstNumerator = randomInteger(1, firstDenominator - 1);
  const secondNumerator = randomInteger(1, secondDenominator - 1);

  const resultNumerator =
    firstNumerator * secondDenominator +
    secondNumerator * firstDenominator;

  const resultDenominator = firstDenominator * secondDenominator;

  const simplified = simplifyFraction(
    resultNumerator,
    resultDenominator
  );

  return {
    prompt:
      `${firstNumerator}/${firstDenominator} + ` +
      `${secondNumerator}/${secondDenominator}`,
    instruction: "Add the fractions. Simplify your answer.",
    answer: `${simplified.numerator}/${simplified.denominator}`,
    answerType: "fraction",
  };
}

function createFractionQuestion(difficulty) {
  if (difficulty === "easy") {
    return createEasyFractionQuestion();
  }

  if (difficulty === "medium") {
    return createMediumFractionQuestion();
  }

  return createHardFractionQuestion();
}

export function generateQuestions(topic, difficulty, count = 10) {
  const questions = [];

  for (let index = 0; index < count; index += 1) {
    const question =
      topic === "algebra"
        ? createAlgebraQuestion(difficulty)
        : createFractionQuestion(difficulty);

    questions.push({
      ...question,
      id: `${topic}-${difficulty}-${Date.now()}-${index}`,
    });
  }

  return questions;
}

function normalizeFraction(value) {
  const compactValue = value.replace(/\s+/g, "");
  const parts = compactValue.split("/");

  if (parts.length !== 2) {
    return null;
  }

  const numerator = Number(parts[0]);
  const denominator = Number(parts[1]);

  if (
    !Number.isFinite(numerator) ||
    !Number.isFinite(denominator) ||
    denominator === 0
  ) {
    return null;
  }

  return simplifyFraction(numerator, denominator);
}

export function isAnswerCorrect(userAnswer, correctAnswer, answerType) {
  const trimmedAnswer = userAnswer.trim();

  if (answerType === "number") {
    return Number(trimmedAnswer) === Number(correctAnswer);
  }

  if (answerType === "fraction") {
    const userFraction = normalizeFraction(trimmedAnswer);
    const expectedFraction = normalizeFraction(correctAnswer);

    if (!userFraction || !expectedFraction) {
      return false;
    }

    return (
      userFraction.numerator === expectedFraction.numerator &&
      userFraction.denominator === expectedFraction.denominator
    );
  }

  return (
    trimmedAnswer.toLowerCase() === correctAnswer.trim().toLowerCase()
  );
}
