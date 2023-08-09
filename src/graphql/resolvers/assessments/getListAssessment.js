import { findMany } from '../../../libraries/prismaClient';
import { errorHandlerForResolvers } from '../../../utils';
import { TABLE_NAME } from '../../../utils/const';

const getAssessments = async ({ status, metadata }) => {
  const skip = metadata.skip || 0;
  const take = metadata.take || 10;
  const assessments = await findMany(TABLE_NAME.ASSESSMENTS, {
    skip,
    take,
    where: { status },
    select: {
      id: true,
      name: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [{ createdAt: 'desc' }],
  });

  return { assessments, metadata: { skip, take } };
};

const assessmentStateMapped = (testTakersAssessment) => {
  const stateAssessmentMapped = testTakersAssessment.reduce((pre, cur) => {
    if (!Object.prototype.hasOwnProperty.call(pre, cur.assessmentId)) {
      pre[cur.assessmentId] = [cur];
    } else {
      pre[cur.assessmentId].push(cur);
    }
    return pre;
  }, {});

  const stateCounterAssessments = Object.keys(stateAssessmentMapped).reduce((aPre, assessmentId) => {
    const stateCounter = stateAssessmentMapped[assessmentId].reduce(
      (pre, cur) => {
        cur.state === 'FINISHED' ? (pre.finishedTestTaker += 1) : (pre.totalTestTaker += 1);
        return pre;
      },
      {
        totalTestTaker: 0,
        finishedTestTaker: 0,
      }
    );
    aPre[assessmentId] = stateCounter;

    return aPre;
  }, {});

  return stateCounterAssessments;
};

export default async ({ input }) => {
  try {
    const { assessments, metadata } = await getAssessments(input);
    const assessmentIds = assessments.map(({ id }) => id);
    const testTakersState = await findMany(TABLE_NAME.TEST_TAKER_ASSESSMENT, {
      where: { assessmentId: { in: assessmentIds } },
    });
    const mappedData = assessmentStateMapped(testTakersState);

    const result = assessments.map((assessment) => {
      const hasStateCounter = Object.keys(mappedData);
      hasStateCounter.includes(assessment.id)
        ? Object.assign(assessment, mappedData[assessment.id])
        : Object.assign(assessment, { totalTestTaker: 0, finishedTestTaker: 0 });
      return assessment;
    });

    return {
      data: result,
      metadata,
    };
  } catch (error) {
    errorHandlerForResolvers(error);
  }
};
