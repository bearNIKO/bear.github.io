const path = require('path')
module.exports = {
    DB_HOST: '140.143.161.65',
    DB_USER: 'root',
    DB_PASS: 'xiongsn.159',
    DB_NAME: 'bearbookcan',
    secret:"bear",
    ROOT: 8080,
    HTTP_ROOT: 'http://localhost:8080',
    UPLOAD_DIR: path.resolve(__dirname, '../../public/upload/')
}