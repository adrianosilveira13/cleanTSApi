export const surveyResultSchema = {
  type: 'object',
  properties: {
    suveyId: {
      type: 'string'
    },
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyResultAnswer'
      }
    },
    date: {
      type: 'string'
    }
  },
  required: ['suveyId', 'question', 'answers', 'date']
}
