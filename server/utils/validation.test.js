const expect = require('expect');

const { isRealName } = require('./../utils/validation');

describe('isRealName', () => {
    it('should reject non-string value', done => {
        let res = isRealName(96);
        expect(res).toBe(false);
        done();
    })

    it('should reject with only spaces', done => {
        let res = isRealName('   ');
        expect(res).toBe(false);
        done();
    })

    it('should allow string with non-space characters', done => {
        let res = isRealName('  Hung Tran  ');
        expect(res).toBe(true);
        done();
    })
})