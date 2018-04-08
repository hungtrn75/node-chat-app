const expect = require('expect');

var { genarateMessage } = require('./message');

describe('genarateMessage', () => {
    it('should genarate correct message object', done => {
        let from = 'test1@example.com';
        let text = 'tes1';
        let message = genarateMessage(from, text);
        expect(message).toMatchObject({ from, text });
        expect(typeof message.createdAt).toBe('number');
        done();
    })
})