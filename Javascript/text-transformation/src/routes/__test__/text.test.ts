import request from 'supertest';
import { app } from '../../app';

describe('test text modifications', () => {
    const apiUrl = '/api/v1/text';
    const sampleText = 'This is a sample text \nto be sent for modification';
    it('should return same string if given no modifiers', async () => {
        const response = await request(app).post(apiUrl).send({ text: sampleText }).expect(200);
        expect(response.body.data).toMatchObject({ text: sampleText });
    });

    describe('width modifier', () => {
        it('should return bad request if width is not a number', () => {
            request(app).post(apiUrl).send({ text: sampleText, lineWidth: 'not_a_number' }).expect(400);
        });
        it('should return text of apprpriate width', () => {
            request(app).post(apiUrl).send({ text: sampleText, lineWidth: 80 }).expect(200);
        });
    });

    describe('bold modifier', () => {
        it('should return status 400 in case if italic modifier is supplied but is empty', () => {
            request(app)
                .post(apiUrl)
                .send({
                    text: sampleText,
                    bold: [],
                })
                .expect(400);
        });

        it('should return bold words in the given text', async () => {
            const response = await request(app)
                .post(apiUrl)
                .send({
                    text: sampleText,
                    bold: ['sample', 'modification'],
                })
                .expect(200);
            expect(response.body.data.text).toContain('**sample**');
            expect(response.body.data.text).toContain('**modification**');
        });
    });

    describe('italic modifier', () => {
        it('should return status 400 in case if italic modifier is supplied but is empty', () => {
            request(app)
                .post(apiUrl)
                .send({
                    text: sampleText,
                    italic: [],
                })
                .expect(400);
        });

        it('should return italic words in the given text', async () => {
            const response = await request(app)
                .post(apiUrl)
                .send({
                    text: sampleText,
                    italic: ['sample', 'modification'],
                })
                .expect(200);
            expect(response.body.data.text).toContain('_sample_');
            expect(response.body.data.text).toContain('_modification_');
        });
    });

    describe('alignment modifier', () => {
        it('should return status 400 for any value apart from left/right/center', () => {
            request(app)
                .post(apiUrl)
                .send({
                    text: sampleText,
                    alignment: 'top',
                })
                .expect(400);
        });

        it('should align the text to right', () => {
            request(app)
                .post(apiUrl)
                .send({
                    text: sampleText,
                    alignment: 'right',
                })
                .expect(200);
        });

        it('should align the text to left', () => {
            request(app)
                .post(apiUrl)
                .send({
                    text: sampleText,
                    alignment: 'left',
                })
                .expect(200);
        });

        it('should align the text to center', () => {
            request(app)
                .post(apiUrl)
                .send({
                    text: sampleText,
                    alignment: 'center',
                })
                .expect(200);
        });
    });

    describe('spacing modifier', () => {
        it('should return status 400 for any value apart from single/double', () => {
            request(app)
                .post(apiUrl)
                .send({
                    text: sampleText,
                    spacing: 'triple',
                })
                .expect(400);
        });

        it('should keep single spacing between line breaks', async () => {
            const response = await request(app)
                .post(apiUrl)
                .send({
                    text: sampleText,
                    spacing: 'single',
                })
                .expect(200);
            //single line break has no effect
            expect(response.body.data.text).toBe(sampleText);
        });

        it('should keep double spacing between line breaks', () => {
            request(app)
                .post(apiUrl)
                .send({
                    text: sampleText,
                    spacing: 'double',
                })
                .expect(200);
        });
    });

    describe('replacers modifier', () => {
        it('should return status 400 in case replacer modifier is supplied but is empty', () => {
            request(app)
                .post(apiUrl)
                .send({
                    text: sampleText,
                    replacers: {},
                })
                .expect(400);
        });

        it('should replace words mentioned in replacer modifier array', async () => {
            const response = await request(app)
                .post(apiUrl)
                .send({
                    text: sampleText,
                    replacers: {
                        This: 'It',
                        sample: 'example',
                    },
                })
                .expect(200);
            expect(response.body.data.text).not.toContain('This');
            expect(response.body.data.text).toContain('It');
            expect(response.body.data.text).not.toContain('sample');
            expect(response.body.data.text).toContain('example');
        });
    });
});
