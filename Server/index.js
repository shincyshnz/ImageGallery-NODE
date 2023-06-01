const express = require("express");
const cors = require("cors");
const app = express();

const ImageGalleryRoute = require('./routes/imageGallery');

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


const userData = [];


//Application Level middleware
app.use((req, res, next) => {
    const newData = {
        "url": req.url,
        "method": req.method
    };
    userData.push(newData);
    console.log(userData);
    console.log("User Data inserted");
    console.log("Inside Application Level middleware");
    next();
});

app.use("/", ImageGalleryRoute);

app.use("*", (req, res) => {
    res.status(404).json({
        message: "This Route does not exist",
    });
});


const PORT = 3008;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));