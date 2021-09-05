
const getUsers = (req, res) => {
    res.json({
        ok: true,
        msg: 'Get users'
    });
}

const createUsers = (req, res) => {
    res.json({
        ok: true,
        msg: 'Creating user'
    });
}

module.exports = {
    getUsers,
    createUsers
}