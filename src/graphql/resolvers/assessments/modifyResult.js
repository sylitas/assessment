import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { isEmptyStringNullOrUndefined } from '../../../utils';

/**
 *
 * @param {String} path
 * @returns
 */
const getURL = async (path) => {
  let file = null;
  if (!isEmptyStringNullOrUndefined(path)) {
    file = await getSignedUrl(path, process.env.S3_BUCKET_KEEP);
  }
  return file;
};

/**
 * Modify assessment after return
 * @param {Object} assessment
 * @returns
 */
export const modifyResult = async ({ assessmentsExams, ...rest }) => ({
  ...rest,
  exams: await Promise.all(
    assessmentsExams.map(async ({ round, exams: { examsQuestions: questions, ...examRest } }) => ({
      ...examRest,
      round,
      questions: await Promise.all(
        questions.map(async ({ questions: { file, answers, ...restQues } }) => ({
          ...restQues,
          file: await getURL(file),
          answers: await Promise.all(answers.map(async (ans) => ({ ...ans, file: await getURL(ans.file) }))),
        }))
      ),
    }))
  ),
});
