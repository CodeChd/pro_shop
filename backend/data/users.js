import bcrypt from 'bcryptjs'


const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Steve mol',
        email: 'steve@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'Batman',
        email: 'bruce@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
]

export default users