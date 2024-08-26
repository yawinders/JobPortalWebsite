import { body, validationResult } from 'express-validator';

// Middleware to validate registration input
export const validateRegistration = [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Enter a valid email address.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('home', {
                customCss: 'home.css',
                message: errors.array().map(error => error.msg).join(', '),
                showLoginModal: false, // Don't show login modal if validation fails
                showRegisterModal: true
            });
        }
        next();
    }
];
