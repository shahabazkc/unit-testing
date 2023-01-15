import { Request, Response, NextFunction } from 'express';
import { log } from '../../../config/logger';
import ApiError from '../../../utils/Error-Handler/ApiError';
import service from './service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { username, password, mobile_number }:
            { username: string, password: string, mobile_number: number }
            = req.body;

        if (!username || !password) return res.status(400).json({
            status: false,
            message: 'Invalid Input'
        });

        if (password.length <= 4) {
            return next(new ApiError(400, 'Password must be greater than 4'));
        }


        let findQuery: any = {
            $or: [
                {
                    username
                }
            ]
        }
        if (mobile_number) {
            findQuery.$or.push(
                {
                    mobile_number
                }
            )
        }

        let userExist = await service.getAUser(findQuery);
        console.log(req.body);
        if (userExist) return next(new ApiError(400, 'User already exist'));

        const user = await service.createUser(req.body);

        return res.json({
            status: true,
            _id: user._id
        });

    } catch (error) {
        log.error(error);
        return next(new ApiError(500, 'Internal Server Error'));
    }

};

export default {
    createUser
}