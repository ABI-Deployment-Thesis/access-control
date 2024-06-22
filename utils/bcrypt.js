const bcrypt = require('bcrypt')

async function hashString(string) {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT))
            const hash = bcrypt.hashSync(string, salt)
            resolve(hash)
        } catch (err) {
            reject(err)
        }
    })
}

async function compare(string, hash) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = bcrypt.compareSync(string, hash)
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    hashString: hashString,
    compare: compare
}