import { getSignedUrl } from '../../../libraries/aws-sdk';
import { findMany } from '../../../libraries/prismaClient';
import { errorHandlerForResolvers, isEmptyStringNullOrUndefined } from '../../../utils';
import { TABLE_NAME } from '../../../utils/const';

export default async ({ input: { type, metadata } }) => {
  try {
    const skip = metadata.skip || 0;
    const take = metadata.take || 20;
    const params = {
      skip,
      take,
      select: {
        id: true,
        file: true,
        type: true,
        createdAt: true,
        updatedAt: true,
        content: true,
        shuffleAnswer: true,
        answers: { select: { id: true, content: true, isCorrect: true, file: true } },
        users: { select: { id: true, firstname: true, lastname: true } },
        questions_categories: { select: { categories: { select: { id: true, name: true } } } },
      },
    };

    if (!isEmptyStringNullOrUndefined(type)) params.where = { type };

    const questionRaw = await findMany(TABLE_NAME.QUESTIONS, params);

    const questions = await Promise.all(
      questionRaw.map(async (question) => {
        let { file: questionFile, answers } = question;
        const { users: author, questions_categories, ...rest } = question;

        if (questionFile) questionFile = await getSignedUrl(questionFile, process.env.S3_BUCKET_KEEP);
        if (answers.length) {
          answers = await Promise.all(
            answers.map(async (answer) => {
              let answerFile = answer.file;
              if (answerFile) answerFile = await getSignedUrl(answerFile, process.env.S3_BUCKET_KEEP);
              return { ...answer, file: answerFile };
            })
          );
        }

        const categories = questions_categories.map(({ categories: el }) => el);

        delete question.users;
        return { ...rest, file: questionFile, answers, author, categories };
      })
    );

    const result = { data: questions, metadata: { skip, take } };

    return result;
  } catch (error) {
    errorHandlerForResolvers(error);
  }
};
