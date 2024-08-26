app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.userEmail ? true : false;
    req.locals.Name = req.session.Name;
    next();
});
