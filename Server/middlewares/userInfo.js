const fs = require(("fs"));
const userinfoLog = require("../logs/userinfoLog.json");

// const userData = [];

const userInfo = (req, res, next) => {
    const newData = {
        "url": req.url,
        "method": req.method
    };
    userinfoLog.push(newData);
    // console.log(userData);
    console.log("User Data inserted");
    console.log("Inside Application Level middleware");

    // fs.writeFile("logs/userinfoLog.json", JSON.stringify(userinfoLog), (err) => {
    //     if (err) {
    //         return res.status(400).json({
    //             message: err
    //         });
    //     }
    // });

    next();
};

module.exports = { userInfo };