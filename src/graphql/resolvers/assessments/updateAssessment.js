import { update } from '../../../libraries/prismaClient';
import { errorHandlerForResolvers, isEmptyStringNullOrUndefined } from '../../../utils';
import { TABLE_NAME } from '../../../utils/const';

export default async ({ input }) => {
  try {
    const { assessmentId: id, name, retake, breakTime, description } = input;
    const data = {};
    !isEmptyStringNullOrUndefined(name) && (data.name = name);
    !isEmptyStringNullOrUndefined(description) && (data.description = description);
    retake !== undefined && retake !== null && (data.retake = retake);
    breakTime !== undefined && breakTime !== null && (data.breakTime = breakTime);
    const newAssessment = await update(TABLE_NAME.ASSESSMENTS, { where: { id }, data });

    return newAssessment;
  } catch (error) {
    errorHandlerForResolvers(error);
  }
};
