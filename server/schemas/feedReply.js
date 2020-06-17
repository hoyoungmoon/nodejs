/**
 * @swagger
 * paths:
 *   /api/feedReply:
 *     get:
 *       tags:
 *         - FeedReply
 *       came: Signin student with id, pwd
 *       summary: 특정 피드의 댓글, 대댓글 나타낼 시 사용          
 *       parameters:
 *         - in: query
 *           name: idx
 *         - in: query
 *           name: feedIdx
 *                                  
 *       responses:
 *         '200':
 *           description: succeed
 *         '409':
 *           description: fail
 * 
 * 
 *   /api/feedReply/{feedIdx}:
 *   
 *     post:
 *       tags:
 *         - FeedReply
 *       came: Register Student
 *       summary: 댓글 등록 시 사용  
 *       parameters:
 *         - in: path
 *           name: feedIdx
 * 
 *         - name: body
 *           in: body
 *           schema:           
 *             type: object
 *             properties:
 *               USER_IDX:
 *                 type: number
 *               CONTENT:
 *                 type: string
 * 
 *             example:
 *               USER_IDX : 1
 *               CONTENT : testContent
 *     
 *       responses:
 *         '200':
 *           description: succeed
 *         '409':
 *           description: fail
 *  
 *   /api/feedReply/re/{feedIdx}:
 *     post:
 *       tags:
 *         - FeedReply
 *       name: Get Student
 *       summary: 대댓글 등록 시 사용
 *       parameters:
 *         - in: path
 *           name: feedIdx
 * 
 *         - name: body
 *           in: body
 *           schema:           
 *             type: object
 *             properties:
 *               USER_IDX:
 *                 type: number
 *               GROUP:
 *                 type: number
 *               GROUP_ORDER:
 *                 type: number
 *               DEPTH:
 *                 type: number
 *               CONTENT:
 *                 type: string
 * 
 *             example:
 *               USER_IDX : 1
 *               GROUP : 1 
 *               GROUP_ORDER : 0    
 *               DEPTH : 0
 *               CONTENT : testRecomment
 *       
 *       responses:
 *         '200':
 *           description: succeed
 *         '400':
 *           description: fail
 * 
 *   /api/feedReply/{idx}:
 * 
 *
 *     put:
 *       tags:
 *         - FeedReply
 *       name: Put Student
 *       summary: 댓글, 대댓글 수정 시 사용
 *       parameters:
 *         - in: path
 *           name: idx
 * 
 *         - name: body
 *           in: body
 *           schema:           
 *             type: object
 *             properties:
 *               USER_IDX:
 *                 type: number
 *               CONTENT: 
 *                 type: string               
 * 
 *             example:
 *               USER_IDX: 1
 *               CONTENT: updateContent
 *         
 *       responses:
 *         '200':
 *           description: succeed
 *         '404':
 *           description: fail
 * 
 * 
 *     delete:
 *       tags:
 *         - FeedReply
 *       name: Delete Student
 *       summary: 댓글, 대댓글 삭제 시 사용
 *       parameters:
 *         - in: path
 *           name: idx     
 * 
 *         - name: body
 *           in: body
 *           schema:           
 *             type: object
 *             properties:
 *               USER_IDX:
 *                 type: number
 * 
 *             example:
 *               USER_IDX : 1
 *             
 *                  
 *       responses:
 *         '200':
 *           description: Delete succeed
 *         '400':
 *           description: Fail
 */
