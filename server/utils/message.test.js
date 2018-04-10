const expect = require('expect');

var { genarateMessage, genarateLocationMessage } = require('./message');

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

describe('genarateLocationMesage', () => {
    it('should genarate correct location object', done => {
        let from = 'hungtrn';
        let location = {
            lat: 69,
            lng: 96
        }
        let url = 'https://www.google.com/maps?q=69,96';
        let message = genarateLocationMessage(from, location);
        expect(message.url).toBe(url);
        expect(message).toMatchObject({ from, url });
        done();
    })
})