import  swaggerJsdoc from 'swagger-jsdoc'
import env from '../utils/validateEnv'


const options = {
  failOnError:true, //weather or not to throw error when parsing errors 
  definition: {
    openapi: '3.0.0',
    servers:[{
      url:`${env.SERVER_URL}/api/v1`,
    }
    ], 
    info: {
      title: 'Hotel  management system ',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        barerAuth: {
          type:'http',
          schema:'bearer', 
          bearerFormat:"JWT",
        }
      }
    },
    security:<any> [{
      bearerAuth: []
    }], 


  },

  apis: ['src/routes/*.ts'], 
};

export default  swaggerJsdoc(options);