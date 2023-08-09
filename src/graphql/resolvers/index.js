import { GraphQLScalarType, Kind } from 'graphql';
import createQuestion from './questions/createQuestion';
import deleteQuestion from './questions/deleteQuestion';
import getListQuestion from './questions/getListQuestion';
import createAssessment from './assessments/createAssessment';
import updateStatusAssessment from './assessments/updateStatusAssessment';
import getListAssessment from './assessments/getListAssessment';
import updateAssessment from './assessments/updateAssessment';
import sendBulkMail from './bulkMail/sendBulkMail';
import updatePublicAssessment from './assessments/updatePublicAssessment';
import cloneAssessment from './assessments/cloneAssessment';

const ObjectScalarType = new GraphQLScalarType({
  name: 'Object',
  description: 'Arbitrary object',
  parseValue: (value) => (typeof value === 'object' ? value : typeof value === 'string' ? JSON.parse(value) : null),
  serialize: (value) => (typeof value === 'object' ? value : typeof value === 'string' ? JSON.parse(value) : null),
  parseLiteral: (ast) => {
    switch (ast.kind) {
      case Kind.STRING:
        return JSON.parse(ast.value);
      case Kind.OBJECT:
        throw new Error('Not sure what to do with OBJECT for ObjectScalarType');
      default:
        return null;
    }
  },
});

export default {
  Object: ObjectScalarType,
  Query: {
    GetListQuestion: (_, ...args) => getListQuestion(...args),
    GetListAssessment: (_, ...args) => getListAssessment(...args),
  },
  Mutation: {
    CreateQuestion: (_, ...args) => createQuestion(...args),
    DeleteQuestion: (_, ...args) => deleteQuestion(...args),
    CreateAssessment: (_, ...args) => createAssessment(...args),
    UpdateStatusAssessment: (_, ...args) => updateStatusAssessment(...args),
    UpdateAssessment: (_, ...args) => updateAssessment(...args),
    UpdatePublicAssessment: (_, ...args) => updatePublicAssessment(...args),
    CloneAssessment: (_, ...args) => cloneAssessment(...args),
    SendBulkMail: (_, ...args) => sendBulkMail(...args),
  },
};
