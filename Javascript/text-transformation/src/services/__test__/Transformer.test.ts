import { ITextData } from '../ITextData';
import { Transformer } from '../Transformer';

describe('test transformer function', () => {
    const inputText =
        'If you are looking to have an impact on the world, then read carefully because at Choco, we are moving mountains to transition the world into sustainable food systems.\nThe food industry is an industry with essential problems, especially in food-supply-chain. We are now leveraging technology to bring change and start the necessary transformation the industry is craving for.\nWe are building the digital platform on which the global food trade will operate. Our company has the potential to reduce food prices, decrease food waste by 30% and reshape one of the oldest and largest industries on the planet.';
    describe('test transform function', () => {
        it('should transform the text by applying all modifiers', async () => {
            const input = {
                text: inputText,
                lineWidth: 180,
                bold: ['Choco', 'Chuck', 'Norris'],
                italic: ['food'],
                alignment: 'right',
                replacers: {
                    Choco: 'CHOCO',
                    sustainable: 'SUSTAINABLE',
                },
                facts: ['industry', 'change'],
                spacing: 'single',
            } as ITextData;
            const output = await Transformer.transform(input);
            //This might fail as Chuck Norris API response is unpredictable, so there can be
            //line breaks within words. Ideally I would mock the API client to get fixed response
            //but due to time limitations leaving it like this.
            const expectedStrings = ['**Chuck**', 'Norris', '_food_', 'CHOCO', 'SUSTAINABLE'];
            expectedStrings.forEach((str) => expect(output).toContain(str));
            const singleLine = output.split('\n')[0];
            expect(singleLine.length).toBe(input.lineWidth);
        });
    });
});
