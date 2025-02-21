import * as Joi from "joi";

export const editOrderSchema = Joi.object({
    name: Joi.alternatives().try(
        Joi.string().pattern(/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ' -]+$/)
            .min(3)
            .max(50),
        Joi.valid(null))
        .messages({
            'string.pattern.base': "Name must  contain only the letters ",
            'string.base': 'Name must be a string or empty',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name must be at most 50 characters long',
        }),

    surname: Joi.alternatives().try(
        Joi.string().pattern(/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ' -]+$/)
        .min(3)
        .max(50),
        Joi.valid(null))
        .messages({
            'string.pattern.base': "Surname must  contain only the letters ",
            'string.base': 'Surname must be a string or empty',
            'string.min': 'Surname must be at least 3 characters long',
            'string.max': 'Surname must be at most 50 characters long',
        }),

    group: Joi.alternatives().try(
        Joi.string()
            .min(4)
            .max(20),)
        .messages({
            'string.base': 'group must be a string or empty',
            'string.min': 'group must be at least 4 characters long',
            'string.max': 'group must be at most 20 characters long',
        }),

    email: Joi.alternatives().try(Joi.string()
        .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        Joi.valid(null))
        .messages({
            'string.pattern.base': "Email must be real",
            'string.base': 'Email must be a string or empty',
            'string.email': 'Email must be a valid email address',
        }),

    phone: Joi.alternatives().try(
        Joi.string()
        .pattern(/^0\d{9}$/),
        Joi.valid(null))
        .messages({
            'string.base': 'Phone must be a string or empty',
            'string.pattern.base': 'Phone must be a valid phone number (e.g., 0123456789)',
        }),

    age: Joi.alternatives().try(
        Joi.number().integer().min(15).max(100),
        Joi.valid(null))
        .messages({
            'number.base': 'Age must be a number or empty',
            'number.min': 'Age must be between 15 and 100',
            'number.max': 'Age must be between 15 and 100',
        }),

    sum: Joi.alternatives().try(
        Joi.number().integer().min(0),
        Joi.valid(null))
        .messages({
            'number.base': 'Sum must be a number or empty',
            'number.min': 'Sum cannot be less than 0',
        }),

    alreadyPaid: Joi.alternatives().try(
        Joi.number().integer().min(0),
        Joi.valid(null))
        .messages({
            'number.base': 'Already Paid must be a number or empty',
            'number.min': 'Already Paid cannot be less than 0',
        })
});