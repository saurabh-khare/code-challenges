import { body, ValidationChain } from 'express-validator';
import { constants } from '../utils/constants';

const validator = (): ValidationChain[] => {
    return [
        body(constants.INPUT_TEXT).exists().withMessage('Input text is required'),
        body(constants.LINE_WIDTH).optional(true).isNumeric().withMessage('width should be a number'),
        body(constants.TEXT_ALIGNMENT)
            .optional(true)
            .trim()
            .matches(/left|right|center/)
            .withMessage('alignment can only be left right or center'),
        body(constants.LINE_SPACING)
            .optional(true)
            .trim()
            .matches(/single|double/)
            .withMessage('spacing can only be single or double'),
        body(constants.TEXT_MODIFIER_BOLD)
            .optional(true)
            .notEmpty()
            .isArray()
            .withMessage('bold strings should be in an array'),
        body(constants.TEXT_MODIFIER_ITALIC)
            .optional(true)
            .notEmpty()
            .isArray()
            .withMessage('italic strings should be in an array'),
        body(constants.FACTS)
            .optional(true)
            .notEmpty()
            .isArray()
            .withMessage('food fact strings should be in an array'),
        body(constants.TEXT_REPLACERS).optional(true).isObject().withMessage('replacers need to be added in an object'),
    ];
};

export default validator;
