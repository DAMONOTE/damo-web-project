// Main secret key
export var serverSecretKey = "test"

// DB settings
const masterDbName = "cnt2020_db_dev"
//const masterDbUser = "admin"
//const masterDbPwd = "admin"
export const masterDbUri =`mongodb://localhost:27017/${masterDbName}?retryWrites=true&w=majority`

