const crypto = require('crypto')


module.exports.createPasswordPbkdf2 = (pw) => {
  const salt = crypto.randomBytes(32).toString('base64')
  const encodedPw = crypto.pbkdf2Sync(pw, salt, 99891, 32, 'sha512').toString('base64')
  return {encodedPw, salt}
}

module.exports.getPasswordPbkdf2 = (pw, salt) => {
  return crypto.pbkdf2Sync(pw, salt, 99891, 32, 'sha512').toString('base64')
}

