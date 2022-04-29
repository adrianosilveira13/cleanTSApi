export const unauthorized = {
  description: 'Credenciais Inválidass',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
