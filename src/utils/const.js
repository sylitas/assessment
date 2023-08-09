export const FILE_TYPE = {
  ANSWER: 'ANSWER',
  ASSESSMENT: 'ASSESSMENT',
};

export const TABLE_NAME = {
  TEST_TAKERS: 'test_takers',
  USERS: 'users',
  ROLES: 'roles',
  USERS_ROLES: 'users_roles',
  ASSESSMENTS: 'assessments',
  TEST_TAKER_ASSESSMENT: 'test_taker_assessment',
  EXAMS: 'exams',
  ASSESSMENTS_EXAMS: 'assessments_exams',
  QUESTIONS: 'questions',
  CATEGORIES: 'categories',
  QUESTIONS_CATAGORIES: 'questions_catagories',
  EXAMS_QUESTIONS: 'exams_questions',
  ANSWERS: 'answers',
};

export const ERROR_CODE = {
  UNAUTHENTICATED: {
    status: 401,
    code: 'UNAUTHENTICATED',
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    code: 'INTERNAL_SERVER_ERROR',
  },
  FORBIDDEN: {
    status: 403,
    code: 'FORBIDDEN',
  },
  NOT_IMPLEMENTED: {
    status: 501,
    code: 'NOT_IMPLEMENTED',
  },
  UNPROCESSABLE_CONTENT: {
    status: 422,
    code: 'UNPROCESSABLE_CONTENT',
  },
};

export const ROLE = {
  ADMIN: 'ADMIN',
  ASSESSMENT: {
    OWNER: 'ASSESSMENT.OWNER',
    MEMBER: 'ASSESSMENT.MEMBER',
  },
};

export const LIMIT_ANSWERS = 10;

export const MAIL_TEMPLATE = {
  INVITATION: { subject: '[MOR] Invitation for Test at Interview - Prove Your Skills!' },
};

export const SELECT_ASSESSMENT = {
  id: true,
  name: true,
  retake: true,
  breakTime: true,
  description: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  authorId: true,
  isPublic: true,
  assessmentsExams: {
    select: {
      round: true,
      exams: {
        select: {
          id: true,
          duration: true,
          examsQuestions: {
            select: {
              questions: {
                select: {
                  id: true,
                  file: true,
                  type: true,
                  content: true,
                  shuffleAnswer: true,
                  answers: { select: { id: true, content: true, isCorrect: true, file: true } },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const TEST_TAKER_STATE = {
  SENT: 'SENT',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
};
