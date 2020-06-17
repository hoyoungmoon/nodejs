/**
 * @swagger
 * paths:
 *   /api/common/fileUploadUrl:
 *     get:
 *       tags:
 *         - Image
 *       came: Signin student with id, pwd
 *       summary: 업로드 할 이미지 pre-signed url 받아올 때     
 *       parameters:
 *         - name: mimetype
 *           in: query
 *         - name: extension
 *           in: query
 *                                        
 *       responses:
 *         '200':
 *           description: succeed
 *         '409':
 *           description: fail
 * 
 *   /api/common/getExtension:
 *     get:
 *       tags:
 *         - Image
 *       came: Signin student with id, pwd
 *       summary: 파일(이미지) 확장자 받아올 때     
 *       parameters:
 *         - name: type
 *           in: query
 *               
 *                                  
 *       responses:
 *         '200':
 *           description: succeed
 *         '409':
 *           description: fail
 *   
 */
