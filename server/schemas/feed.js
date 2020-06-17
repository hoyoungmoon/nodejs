/**
 * @swagger
 * paths:
 *   /api/feed:
 *     post:
 *       tags:
 *         - Feed
 *       came: Signin student with id, pwd
 *       summary: 피드 등록시 사용        
 *       parameters:
 *         - name: body
 *           in: body
 *           schema:           
 *             type: object
 *             properties:
 *               USER_IDX:
 *                 type: number
 *               CONTENT:
 *                 type: string
 *               PATH:
 *                 type: string
 * 
 *             example:
 *               USER_IDX : 1
 *               CONTENT : testContent
 *               PATH : testPath
 *                              
 *       responses:
 *         '200':
 *           description: Register succeed
 *         '409':
 *           description: Register failed 
 *   
 *   
 *     get:
 *       tags:
 *         - Feed
 *       came: Register Student
 *       summary: 피드 리스트 가져올 시 사용
 *       parameters:
 *         - name: idx
 *           in: query
 *         - name: userIdx
 *           in: query
 *     
 *       responses:
 *         '200':
 *           description: Register succeed
 *         '409':
 *           description: Duplicate email
 *   
 * 
 *   /api/feed/{idx}:
 * 
 * 
 *     put:
 *       tags:
 *         - Feed
 *       name: Delete Student
 *       summary: 피드 정보 변경 시 사용
 *       parameters:
 *         - in: path
 *           name: idx       
 *           schema:           
 *             type: object
 *             properties:
 *               name: 
 *                 type: number
 * 
 *         - name: body
 *           in: body
 *           schema:           
 *             type: object
 *             properties:
 *               TITLE: 
 *                 type: string
 *               CONTENT:
 *                 type: string
 * 
 *             example:
 *               TITLE : updateTitle
 *               CONTENT : updateContent
 *             
 *                  
 *       responses:
 *         '200':
 *           description: Update feed
 *         '400':
 *           description: Fail
 * 
 *     delete:
 *       tags:
 *         - Feed
 *       name: Delete Student
 *       summary: 피드 삭제 시 사용
 *       parameters:
 *         - in: path
 *           name: idx       
 *           schema:           
 *             type: object
 *             properties:
 *               name: 
 *                 type: number
 *             
 *                  
 *       responses:
 *         '200':
 *           description: Delete feed
 *         '400':
 *           description: Fail
 */
