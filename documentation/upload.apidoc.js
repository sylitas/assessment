/**
 *
 * @api {POST} /upload/singleFile Upload file to application
 * @apiName Upload file to application
 * @apiDescription Upload file to application, please use `Postman` to upload file, follow this description
 *
 * Remember to pass your token to `Headers` -> `Authorization`
 *
 * Choose `Body` -> `form-data` -> key = `file` (choose file) -> value = `file that you upload` -> Send
 * @apiGroup 3-Upload
 * @apiVersion 1.0.0
 * @apiPermission ADMIN
 *
 * @apiParam {File} file Form-based File Upload in HTML
 * @apiHeader {String} Authorization Token get from [Login](#api-2-Authentication-Login_into_application)
 * @apiSampleRequest off
 *
 * @apiSuccess (200) {String} key Key is a file path that can relate to other apis
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "key": 'fa1f0-1121-4b9f-.../5b567a-a894-4ac3-.../file.ext',
 * }
 *
 * @apiError {Object} error Error response
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *   message: "Unauthorized"
 * }
 */
