/**
 *
 * @api {POST} /auth/login Login into application
 * @apiName Login into application
 * @apiDescription Login into application using email and password that provided from Admin
 * @apiGroup 2-Authentication
 * @apiVersion 1.0.0
 * @apiPermission ADMIN
 *
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 *
 * @apiExample {curl} curl
 *   curl -X POST /auth/login \
 *        -d '{"email":"Sylitas", "password":"i_am_god"}'
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'POST',
 *        url: '/auth/login',
 *        data: {
 *          "email":"sylitas@mor.com.vn",
 *          "password":"password"
 *        }
 *     });
 *     console.log('accessToken: ', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (200) {String} assessToken Token for each request from front end
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "assessToken": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 * }
 *
 * @apiError {Object} error Error response
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *   message: "Unauthorized"
 * }
 */
