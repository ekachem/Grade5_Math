import { algebraQuestionTypes } from "./algebraQuestionTypes";

function weightedRandomChoice(questionTypes) {
  const totalWeight = questionTypes.reduce(
    (sum, questionType) => sum + questionType.weight,
    0
  );

  let randomValue = Math.random() * totalWeight;

  for (const questionType of questionTypes) {
    randomValue -= questionType.weight;

    if (randomValue <= 0) {
      return questionType;
    }
  }

  return questionTypes[questionTypes.length - 1];
}

export function getAvailableAlgebraQuestionTypes(difficulty) {
  return algebraQuestionTypes.filter((questionType) => {
    return (
      questionType.enabled &&
      questionType.weight > 0 &&
      questionType.difficulties.includes(difficulty)
    );
  });
}

export function generateAlgebraQuestion(
  difficulty,
  excludedTypeIds = []
) {
  const availableTypes =
    getAvailableAlgebraQuestionTypes(difficulty);

  if (availableTypes.length === 0) {
    throw new Error(
      `No enabled Algebra question types exist for difficulty: ${difficulty}`
    );
  }

  /*
   * Avoid an immediate repetition when possible.
   */
  const nonRepeatedTypes = availableTypes.filter(
    (questionType) =>
      !excludedTypeIds.includes(questionType.id)
  );

  const selectionPool =
    nonRepeatedTypes.length > 0
      ? nonRepeatedTypes
      : availableTypes;

  const selectedType =
    weightedRandomChoice(selectionPool);

  const question = selectedType.generate();

  return {
    ...question,
    type: selectedType.id,
    typeLabel: selectedType.label,
    difficulty,
  };
}
