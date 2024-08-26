import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import userController from './src/controllers/user.controller.js';
import { uploadFile } from './middleware/uplaodFileMiddleware.js';
import session from 'express-session';
import { auth } from './middleware/auth.middleware.js';

import { validateRegistration } from './middleware/validationMiddelware.js';
const user = new userController();

const app = express();

//setting up middleware for session



app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(expressEjsLayouts);
app.set('view engine', "ejs");
app.set("views", path.join(path.resolve(), 'src', 'views'))

// Set the isLoggedIn variable for all views
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.userEmail ? true : false;
    res.locals.isName = req.session.userName;
    next();
});



app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res, next) => {

    res.render('home', { customCss: 'home.css', message: null });

});

app.get('/logout', user.logout);
app.post('/register', validateRegistration, user.register);
app.post('/login', user.login);
app.get('/jobs', user.viewJob)
app.get('/jobs/:id', user.viewJobDetails);
app.post('/jobs/:id', uploadFile.single('resume'), user.handleApply);
app.get('/delete/:id', user.deletePost)


app.get('/postNewJob', auth, user.postNewJobForm);
app.post('/postNewJob', user.postingNewJob)

app.get('/applicantDetails/:id', user.applicantsDetails);

app.get('/update/:id', user.updateJobPost)
app.post('/update/:id', user.handleUpdateJobPost)
export default app;
