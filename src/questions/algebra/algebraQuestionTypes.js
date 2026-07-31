function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(items) {
  return items[randomInteger(0, items.length - 1)];
}

const studentNames = [
  "Ava",
  "Emma",
  "Liam",
  "Noah",
  "Maya",
  "Lucas",
  "Sofia",
  "Ethan",
  "Olivia",
  "Daniel",
];

const objects = [
  "stickers",
  "marbles",
  "pencils",
  "books",
  "shells",
  "cards",
  "apples",
  "toy cars",
];

function createQuestion({
  type,
  skill,
  prompt,
  instruction,
  answer,
}) {
  return {
    type,
    skill,
    prompt,
    instruction,
    answer: String(answer),
    answerType: "number",
  };
}

/*
 * ============================================================
 * ALGEBRA QUESTION REGISTRY
 * ============================================================
 *
 * To disable a problem type:
 *
 *     enabled: false
 *
 * To enable it:
 *
 *     enabled: true
 *
 * To make it appear more frequently:
 *
 *     weight: 3
 *
 * To restrict it to certain difficulty levels:
 *
 *     difficulties: ["easy"]
 *
 * or:
 *
 *     difficulties: ["medium", "hard"]
 * ============================================================
 */

export const algebraQuestionTypes = [
  /*
   * ----------------------------------------------------------
   * EASY QUESTIONS
   * ----------------------------------------------------------
   */

  {
    id: "addition-unknown",
    label: "Addition with unknown",
    enabled: true,
    weight: 2,
    difficulties: ["easy"],

    generate() {
      const answer = randomInteger(2, 30);
      const addedNumber = randomInteger(2, 25);
      const total = answer + addedNumber;

      return createQuestion({
        type: "addition-unknown",
        skill: "One-step addition equation",
        prompt: `x + ${addedNumber} = ${total}`,
        instruction: "Find the value of x.",
        answer,
      });
    },
  },

  {
    id: "subtraction-from-unknown",
    label: "Subtract from unknown",
    enabled: true,
    weight: 2,
    difficulties: ["easy"],

    generate() {
      const answer = randomInteger(10, 50);
      const subtractedNumber = randomInteger(2, answer - 1);
      const result = answer - subtractedNumber;

      return createQuestion({
        type: "subtraction-from-unknown",
        skill: "One-step subtraction equation",
        prompt: `x − ${subtractedNumber} = ${result}`,
        instruction: "Find the value of x.",
        answer,
      });
    },
  },

  {
    id: "unknown-subtracted",
    label: "Unknown number being subtracted",
    enabled: true,
    weight: 1,
    difficulties: ["easy"],

    generate() {
      const startingNumber = randomInteger(15, 60);
      const answer = randomInteger(2, startingNumber - 2);
      const result = startingNumber - answer;

      return createQuestion({
        type: "unknown-subtracted",
        skill: "Missing subtrahend",
        prompt: `${startingNumber} − x = ${result}`,
        instruction: "Find the value of x.",
        answer,
      });
    },
  },

  {
    id: "multiplication-unknown",
    label: "Multiplication with unknown",
    enabled: true,
    weight: 2,
    difficulties: ["easy"],

    generate() {
      const multiplier = randomInteger(2, 10);
      const answer = randomInteger(2, 12);
      const product = multiplier * answer;

      return createQuestion({
        type: "multiplication-unknown",
        skill: "One-step multiplication equation",
        prompt: `${multiplier} × x = ${product}`,
        instruction: "Find the value of x.",
        answer,
      });
    },
  },

  {
    id: "division-unknown-dividend",
    label: "Division with unknown dividend",
    enabled: true,
    weight: 1,
    difficulties: ["easy"],

    generate() {
      const divisor = randomInteger(2, 10);
      const answer = divisor * randomInteger(2, 12);
      const quotient = answer / divisor;

      return createQuestion({
        type: "division-unknown-dividend",
        skill: "One-step division equation",
        prompt: `x ÷ ${divisor} = ${quotient}`,
        instruction: "Find the value of x.",
        answer,
      });
    },
  },

  {
    id: "division-unknown-divisor",
    label: "Division with unknown divisor",
    enabled: true,
    weight: 1,
    difficulties: ["easy"],

    generate() {
      const answer = randomInteger(2, 10);
      const quotient = randomInteger(2, 10);
      const dividend = answer * quotient;

      return createQuestion({
        type: "division-unknown-divisor",
        skill: "Missing divisor",
        prompt: `${dividend} ÷ x = ${quotient}`,
        instruction: "Find the value of x.",
        answer,
      });
    },
  },

  {
    id: "addition-pattern",
    label: "Addition number pattern",
    enabled: true,
    weight: 1,
    difficulties: ["easy"],

    generate() {
      const start = randomInteger(1, 20);
      const step = randomInteger(2, 10);

      const sequence = [
        start,
        start + step,
        start + 2 * step,
        start + 3 * step,
      ];

      const answer = start + 4 * step;

      return createQuestion({
        type: "addition-pattern",
        skill: "Growing number pattern",
        prompt: `${sequence.join(", ")}, ___`,
        instruction: "Find the next number in the pattern.",
        answer,
      });
    },
  },

  {
    id: "multiplication-pattern",
    label: "Multiplication number pattern",
    enabled: true,
    weight: 1,
    difficulties: ["easy", "medium"],

    generate() {
      const start = randomInteger(1, 5);
      const multiplier = randomItem([2, 3]);

      const first = start;
      const second = first * multiplier;
      const third = second * multiplier;
      const fourth = third * multiplier;
      const answer = fourth * multiplier;

      return createQuestion({
        type: "multiplication-pattern",
        skill: "Multiplicative number pattern",
        prompt: `${first}, ${second}, ${third}, ${fourth}, ___`,
        instruction: `Each number is multiplied by ${multiplier}. Find the next number.`,
        answer,
      });
    },
  },

  /*
   * ----------------------------------------------------------
   * MEDIUM QUESTIONS
   * ----------------------------------------------------------
   */

  {
    id: "two-step-addition",
    label: "Two-step addition equation",
    enabled: true,
    weight: 2,
    difficulties: ["medium"],

    generate() {
      const multiplier = randomInteger(2, 6);
      const answer = randomInteger(2, 15);
      const addedNumber = randomInteger(2, 20);
      const result = multiplier * answer + addedNumber;

      return createQuestion({
        type: "two-step-addition",
        skill: "Two-step equation",
        prompt: `${multiplier}x + ${addedNumber} = ${result}`,
        instruction: "Find the value of x.",
        answer,
      });
    },
  },

  {
    id: "two-step-subtraction",
    label: "Two-step subtraction equation",
    enabled: true,
    weight: 2,
    difficulties: ["medium"],

    generate() {
      const multiplier = randomInteger(2, 7);
      const answer = randomInteger(3, 15);
      const maximumSubtraction = multiplier * answer - 1;
      const subtractedNumber = randomInteger(
        2,
        Math.min(20, maximumSubtraction)
      );

      const result = multiplier * answer - subtractedNumber;

      return createQuestion({
        type: "two-step-subtraction",
        skill: "Two-step equation",
        prompt: `${multiplier}x − ${subtractedNumber} = ${result}`,
        instruction: "Find the value of x.",
        answer,
      });
    },
  },

  {
    id: "expression-on-right",
    label: "Equation with expression on right",
    enabled: true,
    weight: 1,
    difficulties: ["medium"],

    generate() {
      const firstNumber = randomInteger(3, 15);
      const secondNumber = randomInteger(2, 10);
      const product = firstNumber * secondNumber;
      const addedNumber = randomInteger(3, 25);
      const answer = product - addedNumber;

      return createQuestion({
        type: "expression-on-right",
        skill: "Evaluate and solve",
        prompt: `x + ${addedNumber} = ${firstNumber} × ${secondNumber}`,
        instruction:
          "Evaluate the expression on the right, then find x.",
        answer,
      });
    },
  },

  {
    id: "parentheses-equation",
    label: "Equation with parentheses",
    enabled: true,
    weight: 1,
    difficulties: ["medium", "hard"],

    generate() {
      const multiplier = randomInteger(2, 6);
      const addedNumber = randomInteger(2, 10);
      const answer = randomInteger(2, 15);
      const result = multiplier * (answer + addedNumber);

      return createQuestion({
        type: "parentheses-equation",
        skill: "Equation with grouped operations",
        prompt: `${multiplier}(x + ${addedNumber}) = ${result}`,
        instruction: "Find the value of x.",
        answer,
      });
    },
  },

  {
    id: "input-output-table-addition",
    label: "Input-output addition rule",
    enabled: true,
    weight: 1,
    difficulties: ["medium"],

    generate() {
      const ruleNumber = randomInteger(3, 15);
      const inputs = [2, 4, 6];
      const outputs = inputs.map(
        (input) => input + ruleNumber
      );

      const targetInput = randomInteger(7, 15);
      const answer = targetInput + ruleNumber;

      return createQuestion({
        type: "input-output-table-addition",
        skill: "Input-output relationship",
        prompt:
          `Input → Output\n` +
          `${inputs[0]} → ${outputs[0]}\n` +
          `${inputs[1]} → ${outputs[1]}\n` +
          `${inputs[2]} → ${outputs[2]}\n` +
          `${targetInput} → ?`,
        instruction:
          "Find the rule and determine the missing output.",
        answer,
      });
    },
  },

  {
    id: "input-output-table-multiplication",
    label: "Input-output multiplication rule",
    enabled: true,
    weight: 1,
    difficulties: ["medium", "hard"],

    generate() {
      const multiplier = randomInteger(2, 6);
      const inputs = [2, 3, 5];
      const outputs = inputs.map(
        (input) => input * multiplier
      );

      const targetInput = randomInteger(6, 12);
      const answer = targetInput * multiplier;

      return createQuestion({
        type: "input-output-table-multiplication",
        skill: "Multiplicative input-output relationship",
        prompt:
          `Input → Output\n` +
          `${inputs[0]} → ${outputs[0]}\n` +
          `${inputs[1]} → ${outputs[1]}\n` +
          `${inputs[2]} → ${outputs[2]}\n` +
          `${targetInput} → ?`,
        instruction:
          "Find the rule and determine the missing output.",
        answer,
      });
    },
  },

  /*
   * ----------------------------------------------------------
   * WORD PROBLEMS
   * ----------------------------------------------------------
   */

  {
    id: "word-problem-addition",
    label: "Addition word problem",
    enabled: true,
    weight: 2,
    difficulties: ["easy", "medium"],

    generate() {
      const name = randomItem(studentNames);
      const object = randomItem(objects);
      const answer = randomInteger(5, 40);
      const extraAmount = randomInteger(3, 25);
      const total = answer + extraAmount;

      return createQuestion({
        type: "word-problem-addition",
        skill: "Representing an addition situation",
        prompt:
          `${name} had some ${object}. ` +
          `${name} received ${extraAmount} more and then had ` +
          `${total} ${object}.`,
        instruction:
          `Let x represent the starting number of ${object}. Find x.`,
        answer,
      });
    },
  },

  {
    id: "word-problem-comparison",
    label: "Comparison word problem",
    enabled: true,
    weight: 1,
    difficulties: ["medium"],

    generate() {
      const firstName = randomItem(studentNames);

      let secondName = randomItem(studentNames);

      while (secondName === firstName) {
        secondName = randomItem(studentNames);
      }

      const object = randomItem(objects);
      const answer = randomInteger(5, 35);
      const more = randomInteger(3, 20);
      const secondAmount = answer + more;

      return createQuestion({
        type: "word-problem-comparison",
        skill: "Comparison relationship",
        prompt:
          `${firstName} has x ${object}. ` +
          `${secondName} has ${more} more ${object} than ` +
          `${firstName}. ${secondName} has ${secondAmount} ${object}.`,
        instruction: `How many ${object} does ${firstName} have?`,
        answer,
      });
    },
  },

  {
    id: "word-problem-total",
    label: "Two people total word problem",
    enabled: true,
    weight: 2,
    difficulties: ["hard"],

    generate() {
      const firstName = randomItem(studentNames);

      let secondName = randomItem(studentNames);

      while (secondName === firstName) {
        secondName = randomItem(studentNames);
      }

      const object = randomItem(objects);
      const answer = randomInteger(5, 30);
      const more = randomInteger(3, 15);
      const secondAmount = answer + more;
      const total = answer + secondAmount;

      return createQuestion({
        type: "word-problem-total",
        skill: "Two-step comparison word problem",
        prompt:
          `${firstName} has x ${object}. ` +
          `${secondName} has ${more} more ${object} than ` +
          `${firstName}. Together they have ${total} ${object}.`,
        instruction: `How many ${object} does ${firstName} have?`,
        answer,
      });
    },
  },

  {
    id: "equal-groups-word-problem",
    label: "Equal groups word problem",
    enabled: true,
    weight: 1,
    difficulties: ["medium", "hard"],

    generate() {
      const numberOfGroups = randomInteger(3, 10);
      const answer = randomInteger(3, 15);
      const total = numberOfGroups * answer;
      const object = randomItem(objects);

      return createQuestion({
        type: "equal-groups-word-problem",
        skill: "Multiplication relationship",
        prompt:
          `${total} ${object} are divided equally into ` +
          `${numberOfGroups} groups.`,
        instruction:
          "Let x be the number in each group. Find x.",
        answer,
      });
    },
  },

  {
    id: "rectangle-perimeter",
    label: "Rectangle perimeter problem",
    enabled: true,
    weight: 2,
    difficulties: ["hard"],

    generate() {
      const answer = randomInteger(4, 18);
      const width = randomInteger(3, 15);
      const perimeter = 2 * (answer + width);

      return createQuestion({
        type: "rectangle-perimeter",
        skill: "Using perimeter to find an unknown side",
        prompt:
          `A rectangle has a perimeter of ${perimeter} cm. ` +
          `Its width is ${width} cm and its length is x cm.`,
        instruction: "Find the length x.",
        answer,
      });
    },
  },

  {
    id: "balance-equation",
    label: "Balanced expressions",
    enabled: true,
    weight: 1,
    difficulties: ["hard"],

    generate() {
      const answer = randomInteger(3, 15);
      const leftMultiplier = randomInteger(2, 5);
      const leftAdded = randomInteger(2, 12);
      const rightMultiplier = randomInteger(1, leftMultiplier - 1);

      const leftValue =
        leftMultiplier * answer + leftAdded;

      const rightAdded =
        leftValue - rightMultiplier * answer;

      return createQuestion({
        type: "balance-equation",
        skill: "Equality and balanced expressions",
        prompt:
          `${leftMultiplier}x + ${leftAdded} = ` +
          `${rightMultiplier}x + ${rightAdded}`,
        instruction: "Find the value of x.",
        answer,
      });
    },
  },

  {
    id: "reverse-operation-chain",
    label: "Reverse a sequence of operations",
    enabled: true,
    weight: 1,
    difficulties: ["hard"],

    generate() {
      const answer = randomInteger(3, 15);
      const multiplier = randomInteger(2, 6);
      const addedNumber = randomInteger(3, 15);
      const result = answer * multiplier + addedNumber;

      return createQuestion({
        type: "reverse-operation-chain",
        skill: "Reverse operations",
        prompt:
          `A number is multiplied by ${multiplier}, and then ` +
          `${addedNumber} is added. The result is ${result}.`,
        instruction: "What was the starting number?",
        answer,
      });
    },
  },
];
