const {compareSync, hashSync} =  require('bcryptjs')

module.exports ={
    hashPassword:(password)=>hashSync(password),
    comparePassword:(pw,realpw)=>compareSync(pw,realpw)
}