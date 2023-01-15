import apiManager from '../helper/apiHelper';
import cuid from 'cuid';

describe('Create User Endpoint', () => {
    it('Should create new user', async () => {
        const res = await apiManager('POST', {
            endPoint: '/api/user/v1/create-user', reqBody:
                { username: cuid(), password: '12345' }
        }, []);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
    })
    it('Should return user already exist', async () => {
        const res = await apiManager('POST', {
            endPoint: '/api/user/v1/create-user', reqBody:
                { username: 'shahabazkc', password: '12345' }
        }, []);
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('User already exist');
    })
    it('Should throw Invalid input', async () => {
        const res = await apiManager('POST', {
            endPoint: '/api/user/v1/create-user', reqBody:
                {}
        }, []);
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid Input');
    })
    it('Should throw password must be greater than 4 character', async () => {
        const res = await apiManager('POST', {
            endPoint: '/api/user/v1/create-user', reqBody:
                { username: cuid(), password: '1234' }
        }, []);
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Password must be greater than 4');
    })
})