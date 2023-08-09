import { create } from '../../../libraries/prismaClient';
import { errorHandlerForResolvers, isEmptyStringNullOrUndefined, throwError } from '../../../utils';
import { ERROR_CODE, LIMIT_ANSWERS, TABLE_NAME } from '../../../utils/const';

const { UNPROCESSABLE_CONTENT } = ERROR_CODE;

const separateAnswer = (answers) =>
  answers.reduce(
    (pre, cur) => {
      cur.isCorrect === true ? pre.correctAns.push(cur) : pre.incorrectAns.push(cur);
      return pre;
    },
    { incorrectAns: [], correctAns: [] }
  );

const validateMultipleChoicesQuestion = (answers) => {
  const { incorrectAns, correctAns } = separateAnswer(answers);

  if (!correctAns.length) {
    return throwError('Answer must contain at least 1 correct answer', UNPROCESSABLE_CONTENT);
  }
  if (correctAns.length > 1) {
    return throwError('Answer must contain only 1 correct answer', UNPROCESSABLE_CONTENT);
  }
  if (!incorrectAns.length) {
    return throwError('Answer must contain an incorrect answer', UNPROCESSABLE_CONTENT);
  }
};

const validateMultipleResponseQuestion = (answers) => {
  const { incorrectAns, correctAns } = separateAnswer(answers);
  if (!correctAns.length || correctAns.length < 2) {
    return throwError('Answer must contain at least 2 correct answer', UNPROCESSABLE_CONTENT);
  }
  if (!incorrectAns.length) {
    return throwError('Answer must contain an incorrect answer', UNPROCESSABLE_CONTENT);
  }
};
const createMultipleChoicesOrMultipleResponseQuestion = async (
  { file, content, type, shuffleAnswer, answers, categoryIds },
  userInfo
) => {
  if ([isEmptyStringNullOrUndefined(file), isEmptyStringNullOrUndefined(content)].every(Boolean)) {
    return throwError('Missing field input', UNPROCESSABLE_CONTENT);
  }
  if ([!answers.length, answers.length > LIMIT_ANSWERS].some(Boolean)) {
    return throwError(`Answer length must lower than ${LIMIT_ANSWERS} and greater than 0`, UNPROCESSABLE_CONTENT);
  }
  if (type === 'MULTIPLE_CHOICES') {
    validateMultipleChoicesQuestion(answers);
  } else {
    validateMultipleResponseQuestion(answers);
  }
  const { questions_categories, ...rest } = await create(TABLE_NAME.QUESTIONS, {
    data: {
      file: file || null,
      content: content || null,
      shuffleAnswer: shuffleAnswer || false,
      answers: { create: answers },
      type,
      users: { connect: { id: userInfo.id } },
      questions_categories: {
        createMany: {
          data: categoryIds.map((el) => ({ categoryId: el })),
        },
      },
    },
    include: {
      answers: {
        select: { id: true, content: true, isCorrect: true, file: true },
      },
      questions_categories: { select: { categories: { select: { id: true, name: true } } } },
    },
  });
  return {
    ...rest,
    categories: questions_categories.map(({ categories }) => categories),
  };
};

/**
 *
 * @param {Object} arg
 * @param {String} arg.file
 * @param {String} arg.content
 * @param {String} arg.type
 * @param {Object} userInfo
 * @returns
 */
const createEssayOrMediaQuestion = async ({ file, content, type, categoryIds }, userInfo) => {
  if ([isEmptyStringNullOrUndefined(file), isEmptyStringNullOrUndefined(content)].every(Boolean)) {
    return throwError('Missing field input', UNPROCESSABLE_CONTENT);
  }
  const { questions_categories, ...rest } = await create(TABLE_NAME.QUESTIONS, {
    data: {
      file: file || null,
      content: content || null,
      authorId: userInfo.id,
      type,
      questions_categories: {
        createMany: {
          data: categoryIds.map((el) => ({ categoryId: el })),
        },
      },
    },
    include: {
      answers: {
        select: { id: true, content: true, isCorrect: true, file: true },
      },
      questions_categories: { select: { categories: { select: { id: true, name: true } } } },
    },
  });

  return {
    ...rest,
    categories: questions_categories.map(({ categories }) => categories),
  };
};

export default async ({ input: data }, userInfo) => {
  const { type } = data;

  const createQuestionTypeMapper = {
    MULTIPLE_CHOICES: createMultipleChoicesOrMultipleResponseQuestion,
    MULTIPLE_RESPONSE: createMultipleChoicesOrMultipleResponseQuestion,
    ESSAY: createEssayOrMediaQuestion,
    MEDIA: createEssayOrMediaQuestion,
  };

  try {
    return await createQuestionTypeMapper[type](data, userInfo);
  } catch (error) {
    errorHandlerForResolvers(error);
  }
};
