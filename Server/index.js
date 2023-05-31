const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //specify the directory where you want to store uploaded file
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        // Generate a unique name for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split(".").pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
    }
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    // read images folder
    fs.readdir("public/images", (err, files) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(files);
    })
});

app.post("/upload", upload.array("upload-files", 12), (req, res) => {
    const files = req.files.map(file => { return file.filename })
    if (req.files.length > 0) {
        res.status(200).json(files);
    }

});


const PORT = 3008;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));