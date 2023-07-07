const  bcrypt = require('bcrypt');

// const hashPassword = async (password) => {
//     const salt = await bcrypt.genSalt(12);
//     const hashedPass = await bcrypt.hash(password, salt);
//     console.log(salt);
//     console.log(hashedPass);
// }

const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 12);
    console.log(hash);
}

hashPassword('double')


const login = async (password, hashedPass) => {
    const result = await bcrypt.compare(password, hashedPass);

    if(result) {
        console.log('Login Successful')
    } else {
        console.log('Try Again')
    }
}

login('monkey', '$2b$12$5SeyGvpcRNeRV5C8tRrx8uyeg1xsPQ90KcIWcvdZzz2ung7Q4QLIe')
login('double', '$2b$12$m0PiOYUt3FildOSb.buWhOpYL.BSBXXfuhWBnChaGpChAQMjSuUwi')