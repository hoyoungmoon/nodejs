/**
 * @swagger
 * paths:
 *   /api/feedLike/{feedIdx}/{idx}:
 * 
 *     post:
 *       tags:
 *         - FeedLike
 *       name: Put Student
 *       summary: 특정 피드 좋아요 등록 시 사용
 *       parameters:
 *         - in: path
 *           name: feedIdx
 *         - in: path
 *           name: idx
 *           
 *       responses:
 *         '200':
 *           description: succeed
 *         '404':
 *           description: fail
 * 
 
 *   
 *  
 *     delete:
 *       tags:
 *         - FeedLike
 *       came: Register Student
 *       summary: 좋아요 취소 시 사용
 *       parameters:
 *         - in: path
 *           name: feedIdx
 *         - in: path
 *           name: idx
 *     
 *       responses:
 *         '200':
 *           description: Register succeed
 *         '409':
 *           description: Duplicate email
 * 
 */
