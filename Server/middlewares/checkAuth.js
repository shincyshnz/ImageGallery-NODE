const checkAuth = (req, res, next) => {
    const { auth } = req.body;
    // const { auth } = req.files;
    console.log(req.body.auth, "===auth");
    console.log(req.files, "===req");
    if (!auth) {
        return res.status(401).json({
            message: "un-authorized"
        });
    }
    next();
}

module.exports = { checkAuth };