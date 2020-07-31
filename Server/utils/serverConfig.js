// Main secret key
export var serverSecretKey = "test"

// DB settings
const masterDbName = "cnt2020_db1"
const masterDbUser = "accountUser"
const masterDbPwd = "count2020"
export const masterDbUri =`mongodb://${masterDbUser}:${masterDbPwd}@localhost:27017/${masterDbName}?retryWrites=true&w=majority`
export const redisSecretKey = "changeme"

