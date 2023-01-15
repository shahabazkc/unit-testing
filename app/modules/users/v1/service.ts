import userModel from "../../../models/userModel"


const createUser = (body: object) => {
    return userModel.create(body);
};

const getAUser = (findQuery: object) => {
    return userModel.findOne(findQuery);
}

export default {
    createUser,
    getAUser
}