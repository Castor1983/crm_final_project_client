import * as Joi from "joi";

export const editOrderSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .messages({
            'string.base': 'Name must be a string',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name must be at most 50 characters long',
        }),

    surname: Joi.string()
        .min(3)
        .max(50)
        .messages({
            'string.base': 'Surname must be a string',
            'string.min': 'Surname must be at least 3 characters long',
            'string.max': 'Surname must be at most 50 characters long',
        }),

    email: Joi.string()
        .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .messages({
            'string.base': 'Email must be a string',
            'string.email': 'Email must be a valid email address',
        }),

    phone: Joi.string()
        .pattern(/^0\d{9}$/)
        .messages({
            'string.base': 'Phone must be a string',
            'string.pattern.base': 'Phone must be a valid phone number (e.g., 0123456789)',
        }),

    age: Joi.number()
        .integer()
        .min(15)
        .max(100)
        .required()
        .messages({
            'number.base': 'Age must be a number',
            'number.min': 'Age must be between 15 and 100',
            'number.max': 'Age must be between 15 and 100',
        }),

    sum: Joi.number()
        .min(0)
        .messages({
            'number.base': 'Sum must be a number',
            'number.min': 'Sum cannot be less than 0',
        }),

    alreadyPaid: Joi.number()
        .min(0)
        .messages({
            'number.base': 'Already Paid must be a number',
            'number.min': 'Already Paid cannot be less than 0',
        })
});