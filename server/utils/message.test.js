const expect = require('expect');

let { generateMessage } = require("./message");

describe('generateMessage', ()=>{
    it('should generate correct message object.', ()=>{
        let from = 'Jen',
            text = 'Some Message';
        let message = generateMessage(from,text);

        // store res in variable

        // assert from match

        //  assert from text match

        // assert createdAt is number
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});