import user from './apis/user'
import userList from './apis/userList'

// Export APIs by specifying request method and url
module.exports = {
    'GET /api/user': user,
    'GET /api/userList': userList,
    'POST /api/userList': userList,
}
