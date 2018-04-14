const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'hung',
            room: 'ltm'
        }, {
            id: '2',
            name: 'long',
            room: 'xlths'
        }, {
            id: '3',
            name: 'vuong',
            room: 'ltm'
        }]
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: 'test',
            name: 'hungtrn',
            room: 'example'
        };
        let resUser = users.addUser(user.id, user.name, user.room);;
        expect(users.users).toMatchObject([user]);
    })

    it('should remove user', () => {
        let user = users.removeUser('2');
        expect(user.id).toBe('2');
        expect(users.users.length).toBe(2);
    })

    it('should not remove user', () => {
        let user = users.removeUser('4');
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    })

    it('should get user', () => {
        let userId = '1';
        let user = users.getUser(userId);
        expect(user.name).toBe('hung');
    })

    it('should not get user', () => {
        let userId = '4';
        let user = users.getUser(userId);
        expect(user).toBeFalsy();
    })

    it('should return names for ltm room', () => {
        let userList = users.getUserList('ltm');
        expect(userList).toMatchObject(['hung', 'vuong']);

    })

    it('should return name for xlths room', () => {
        let userList = users.getUserList('xlths');
        expect(userList).toMatchObject(['long']);
    })
})