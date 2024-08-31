const { DataTypes } = require("sequelize");
const generateAccessToken = require("jsonwebtoken")

const UserModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
};

const initialize = (sequelize) => {
    return sequelize.define("user", UserModel);
};

const createUser = (user, User) => {
    return User.create(user);
};

const register = (req, res) => {
    const payload = req.body;
    let encryptedPassword = encryptPassword(payload.password);
    let role = payload.role;

    if (!role) {
        role = roles.USER;
    }

    UserModel.createUser(Object.assign(payload, { password: encryptedPassword, role })).then((user) => {
        const accessToken = generateAccessToken(payload.username, user.id);

        return res.status(200).json({
            status: 'true',
            result: {
                user: user.toJSON(),
                token: accessToken
            }
        })
    }).catch((error) => {
        return res.status(500).json({
            status: false,
            error: error,
        }
        )
    });
}

module.exports = {
    UserModel,
    initialize,
    createUser,
};