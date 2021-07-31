import { ITextData } from './ITextData';
import { constants } from '../utils/constants';
import { ApplicationError } from '../errors/ApplicationError';
import client from '../utils/httpClient';
import IParams from './IParams';

declare global {
    interface String {
        splice(index: number, rem: number, str: string): string;
    }
}

String.prototype.splice = function (index, rem, str) {
    return this.slice(0, index) + str + this.slice(index + Math.abs(rem));
};

/**
 * Transformer service takes care of the input received by the text service
 * to apply the supplied modifiers to the text and return the output
 */
export class Transformer {
    /**Map to hold all the mapping functions */
    private static transformMapper: Map<string, (text: string, params: IParams) => string>;

    /**
     * Initialize the map and load all functions. The **transform** function will
     * **ONLY** call the mapping function for which modifier is supplied as input
     */
    private static initialize() {
        Transformer.transformMapper = new Map();
        //Limitation: we need to keep the sequence intact to get expected output. Hence
        //cannot depend on order of modifiers received in request
        Transformer.transformMapper.set(constants.TEXT_REPLACERS, Transformer.replaceText);
        //Trade-off:Some functions are contradictory, like either you can replace the word with supplied
        //word or make it bold
        Transformer.transformMapper.set(constants.TEXT_MODIFIER_BOLD, Transformer.addBoldText);
        Transformer.transformMapper.set(constants.TEXT_MODIFIER_ITALIC, Transformer.addItalicText);
        Transformer.transformMapper.set(constants.LINE_WIDTH, Transformer.addLineWidth);
        Transformer.transformMapper.set(constants.TEXT_ALIGNMENT, Transformer.alignText);
        Transformer.transformMapper.set(constants.LINE_SPACING, Transformer.addSpacing);
    }

    /**
     * Align supplied text to LEFT/RIGHT/CENTER
     * @param {string} text input text
     * @param {IParams} params text modifiers
     * @returns {string} modified text
     */
    private static alignText(text: string, params: IParams): string {
        try {
            //Split text by line breaks
            const lines = text.split('\n');
            //align each line and join them back with line break
            return lines.map((line) => Transformer.align(line, params)).join('\n');
        } catch (error) {
            throw new ApplicationError(error.stack);
        }
    }

    /**
     * Align each line to LEFT/RIGHT/CENTER by padding the whitespace
     * according to line width
     * @param {string} text input text
     * @param {string} params text modifiers
     * @returns {string} modified text
     */
    private static align(text: string, params: IParams): string {
        try {
            const alignment = params.alignment;
            if (alignment === 'left') {
                return text.padEnd(params.lineWidth);
            }
            if (alignment === 'right') {
                return text.padStart(params.lineWidth);
            }
            //Add padding left & right
            return text
                .padStart(text.length + Math.floor((params.lineWidth - text.length) / 2))
                .padEnd(params.lineWidth);
        } catch (error) {
            throw new ApplicationError(error.stack);
        }
    }

    /**
     * Adds a line break after every {@link IParams.lineWidth}
     * @param {string} text input text
     * @param {string} params text modifiers
     * @returns {string} modified text
     */
    private static addLineWidth(text: string, params: IParams): string {
        try {
            const strLength = text.length;
            let counter = 0;
            let result = text;
            while (counter * params.lineWidth < strLength) {
                //add a line break after every lineWidth characters
                result = result.splice(counter * params.lineWidth, 0, '\n');
                counter += 1;
            }
            return result;
        } catch (error) {
            throw new ApplicationError(error.stack);
        }
    }

    /**
     * Adds spacing between the lines. It effectively replaces single line
     * break **\n** with double line break **\n\n** if spacing=double
     * @param {string} text input text
     * @param {string} params text modifiers
     * @returns {string} modified text
     */
    private static addSpacing(text: string, params: IParams): string {
        try {
            if (params.spacing === 'double') {
                return text.replace(/(\r\n|\n|\r)/gm, '\n\n');
            }
            // No need to change anything
            return text;
        } catch (error) {
            throw new ApplicationError(error.stack);
        }
    }

    /**
     * Common function used by other mapping functions to replace words in the
     * text. It uses map keys to form greedy regex to find matching words and
     * uses map values to replace them
     * @param {string} input input text
     * @param {Map} mapObj map with source words as keys and replacers as values
     */
    private static replacer(input: string, mapObj: Map<string, string>): string {
        try {
            const list = Array.from(mapObj.keys());
            //Limitation: I could not use the 'gi' flag for case insensitive
            //search since user would expect to replace words in case sensitive manner
            const pattern = new RegExp(list.join('|'), 'g');
            return input.replace(pattern, (matched) => mapObj.get(matched)!);
        } catch (error) {
            throw new ApplicationError(error.stack);
        }
    }

    /**
     * Uses {@link Transformer.replacer} to replace normal word with **word**
     * @param {string} text input text
     * @param {IParams} params input modifiers
     * @returns {string} modified text
     */
    private static addBoldText(text: string, params: IParams): string {
        try {
            const modifiers = new Map(params.bold.map((s) => [s, `**${s}**`] as [string, string]));
            return Transformer.replacer(text, modifiers);
        } catch (error) {
            throw new ApplicationError(error.stack);
        }
    }

    /**
     * Uses {@link Transformer.replacer} to replace a word with word given in
     * **replacers** modifier
     * @param {string} text input text
     * @param {IParams} params input modifiers
     * @returns {string} modified text
     */
    private static addItalicText(text: string, params: IParams): string {
        try {
            const modifiers = new Map(params.italic.map((s) => [s, `_${s}_`] as [string, string]));
            return Transformer.replacer(text, modifiers);
        } catch (error) {
            throw new ApplicationError(error.stack);
        }
    }

    /**
     * Uses {@link Transformer.replacer} to replace normal word with **word**
     * @param {string} text input text
     * @param {IParams} params input modifiers
     * @returns {string} modified text
     */
    private static replaceText(text: string, params: IParams): string {
        try {
            const mapObj = new Map(Object.entries(params.replacers));
            return Transformer.replacer(text, mapObj);
        } catch (error) {
            throw new ApplicationError(error.message);
        }
    }

    /**
     * It adds random Chuck Norris facts to the text.
     * Steps:
     * 1. For every fact word in the text check where it is present in the text and add its position
     * to the set.
     * 2. Do API call only the times equal to set size
     * 3. Resolve the promises and insert the API response at indexes in the set
     * @param {string} text input text
     * @param {IParams} params input modifiers
     * @returns {string} modified text
     */
    private static async addFacts(text: string, params: IParams): Promise<string> {
        //Using a set because multiple fact modifiers supplied as input might be
        //present in a same paragraph. Hence they will end up with same index. So
        //we need unique set of indexes
        const factIndexes: Set<number> = new Set();
        const factEndpoint = 'https://api.chucknorris.io';
        for (const factkey of params.facts) {
            const regexp = new RegExp(`${factkey}.*(?=\\n)`, 'g');
            let match;
            while ((match = regexp.exec(text || '')) != null) {
                factIndexes.add(match.index + match[0].length + 1);
            }
        }
        //Fire calls to Chuck Norris
        const factsReponse = await Promise.all(
            Array.from(factIndexes).map(() => client(factEndpoint).get('/jokes/random?category=food')),
        );
        const facts: string[] = factsReponse.map((f) => ` ${f.data.value}\n `);
        let modifiedText = text || '';
        //Add facts according to indexes in the set
        Array.from(factIndexes).forEach((f, idx) => {
            modifiedText = modifiedText.splice(f, 0, facts[idx]);
        });
        return modifiedText;
    }

    /**
     * Main function to be called for text transformation. It first adds
     * facts to the text so we have full text available for transformation
     * and then runs mapping functions **ONLY** for the modifiers supplied
     * in the input
     * @param {ITextData} input input data containing the text
     * @returns {string} modified text
     */
    static async transform(input: ITextData): Promise<string> {
        if (!Transformer.transformMapper) {
            Transformer.initialize();
        }
        try {
            const params = { ...input } as IParams;
            let result = input.text;
            if (params.facts) {
                //Limitation: This will slow down the API response as we cannot
                //perform other operations unless we receive Chuck Norris response
                result = await Transformer.addFacts(result, params);
            }
            result = Array.from(Transformer.transformMapper.entries()).reduce((accumulator, mapFn): string => {
                if (mapFn[0] in input) {
                    accumulator = mapFn[1](accumulator || '', params);
                }
                return accumulator || '';
            }, result);
            return result;
        } catch (error) {
            throw new ApplicationError(error.stack);
        }
    }
}
