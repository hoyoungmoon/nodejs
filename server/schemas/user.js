/**
 * @swagger
 * paths:
 *   /api/user/duplicate/{email}:
 *     get:
 *       tags:
 *         - User
 *       name: Get Student
 *       summary: 중복 이메일 확인 시 사용
 *       parameters:
 *         - in: path
 *           name: email
 *       
 *       responses:
 *         '200':
 *           description: Get number of duplicate email
 * 
 *   /api/user/{idx}:
 *     get:
 *       tags:
 *         - User
 *       name: Get Student
 *       summary: 현재 로그인된 유저의 회원정보 가져올 시 사용
 *       parameters: 
 *         - name: idx
 *           in: path
 *           
 *       responses:
 *         '200':
 *           description: Get user info
 *         '400':
 *           description: Fail
 * 
 *   /api/user/login:
 *     post:
 *       tags:
 *         - User
 *       came: Signin student with id, pwd
 *       summary: 유저 로그인 시 사용         
 *       parameters:
 *         - name: body
 *           in: body
 *           schema:           
 *             type: object
 *             properties:
 *               EMAIL: 
 *                 type: string
 *               PASSWORD:
 *                 type: string
 * 
 *             example:
 *               EMAIL: testEmail
 *               PASSWORD : testPassword
 *               
 *                                  
 *       responses:
 *         '200':
 *           description: Login succeed
 *         '409':
 *           description: Login failed (Incorrect email or pwd)
 *   
 *  
 * 
 * 
 *   /api/user:
 *     post:
 *       tags:
 *         - User
 *       came: Register Student
 *       summary: 유저 회원가입(등록) 시 사용       
 *       parameters:
 *         - name: body
 *           in: body
 *           schema:           
 *             type: object
 *             properties:
 *               EMAIL: 
 *                 type: string
 *               NAME:
 *                 type: string
 *               INTRODUCE:
 *                 type: string
 *               PASSWORD:
 *                 type: string
 *               SALT:
 *                 type: string
 *               TOKEN:
 *                 type: string
 *               REGISTER_DATE:
 *                 type: string
 *               UPDATE_DATE:
 *                 type: string
 * 
 *             example:
 *               EMAIL: testEmail
 *               NAME : testName
 *               INTRODUCE : testIntroduce
 *               PASSWORD : testPassword
 *     
 *       responses:
 *         '200':
 *           description: Register succeed
 *         '409':
 *           description: Duplicate email
 *   
 *
 *
 *     put:
 *       tags:
 *         - User
 *       name: Put Student
 *       summary: 현재 로그인된 유저의 회원정보 변경 시 사용
 *       parameters: 
 *         - name: body
 *           in: body
 *           schema:           
 *             type: object
 *             properties:
 *               IDX: 
 *                 type: number
 *               EMAIL: 
 *                 type: string
 *               NAME:
 *                 type: string
 *               INTRODUCE:
 *                 type: string
 *               PASSWORD:
 *                 type: string
 *               
 * 
 *             example:
 *               IDX : 1
 *               EMAIL: testEmail
 *               NAME : updateName
 *               INTRODUCE : updateIntroduce
 *               PASSWORD : updatePassword
 *         
 *           
 *       responses:
 *         '200':
 *           description: Update user info
 *         '404':
 *           description: Not found user to update
 * 
 * 
 *     delete:
 *       tags:
 *         - User
 *       name: Delete Student
 *       summary: 현재 로그인된 유저의 회원정보 삭제(탈퇴) 시 사용
 *       parameters: 
 *         - name: body
 *           in: body
 *           schema:           
 *             type: object
 *             properties:
 *               IDX: 
 *                 type: number   
 *             example:
 *               IDX : 1              
 *       responses:
 *         '200':
 *           description: Delete user
 *         '400':
 *           description: Fail
 * 
 *         
 */
