//---------------- PACKAGES ------------------

//to get paths
const path = require('path');

//to accsess  directories and files
const fs = require('fs');

const express = require('express');
const app = express();

//enable to take the body of the request
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//enable to serve the client
const cors = require('cors');
var corsOptions = {
    origin: '*',
    // some legacy browsers (IE11, various SmartTVs) choke on 204 
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const basePath = path.join(__dirname);

const basePathDist = `${basePath}/dist`;


app.get(`/`, (req, res) => {
    res.sendFile(`${basePathDist}/book-store/index.html`);
});

fs.readdir(basePathDist, (err, files) => {
    app.use(express.static(`${basePathDist}/book-store`));
    app.get('/book-store', (req, res) => {
        res.sendFile(`${basePathDist}/book-store/index.html`);
    });

});

app.post("/api/login", (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    if (isValidLogin(userName, password)) {

        //serch in user.json file if there is a user who has the gotted userName and password as parameter
        let currentList = require("./user.json");
        let user = currentList.find(user =>
            user.userName.toLowerCase() == userName.toLowerCase() &&
            user.password.toLowerCase() == password.toLowerCase());
        let isExistingUser = user != null;
        //if user is existing return this user else return null
        if (isExistingUser)
            res.status(201).send(user);
        else
            res.status(201).send(null);
    }
    //if the parameters are not valid
    else {
        console.log("bad");
        res.status(400);
    }

})

app.post("/api/register", (req, res) => {
    let registeredUser = req.body;
    if (isValidRegister(registeredUser)) {
        let currentList = require("./user.json");

        //check if the userName and password of the registered user are unique

        //search user with the same username as the registered user
        let user1 = currentList.find(user => user.userName.toLowerCase() == registeredUser.userName.toLowerCase());
        if (user1 != null) {
            //if some user was founded remove his uploaded profile image and return -1
            removeImage(registeredUser.profileImageUrl)
            res.send({ userId: -1 });
            return;
        }

        //search user with the same password as the registered user
        let user2 = currentList.find(user => user.password.toLowerCase() == registeredUser.password.toLowerCase());
        if (user2 != null) {
            //if some user was founded remove his uploaded profile image and return -2
            removeImage(registeredUser.profileImageUrl)
            res.send({ userId: -2 });
            return;
        }
        //if userName and password are unique - it's ok, add the user to the user.json file and return his id
        registeredUser.id = currentList.length == 0 ? 1 : Math.max(...currentList.map(user => user.id)) + 1;
        currentList.push(registeredUser);
        fs.writeFileSync("user.json", JSON.stringify(currentList));
        res.status(201).send({ userId: registeredUser.id });
    }
    //if not all the registered user details are valid
    else {
        console.log("bad");
        res.status(400);
    }

})

//to upload images
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

//to rand string so that the uploaded image name will be unique
const uuidv4 = require('uuid/v4');

//upload image and return it's new name
app.post("/api/upload", upload.single("file" /* name of the key in the formData object in client side*/),
    (req, res) => {
        const tempPath = req.file.path;
        const newFilename = `${uuidv4()}.JPG`;
        const targetPath = path.join(__dirname, `./uploads/${newFilename}`);
        fs.rename(tempPath, targetPath, err => {
            if (err)
                return handleError(err, res);
            res.status(200).send({ newFilename: newFilename });
        });
    });



app.get(`/uploads`, (req, res) => {
    let fileName = req.query.fileName;
    res.sendFile(`${basePath}/uploads/${fileName}`);
});

removeImage = (fileName) => {
    fs.unlink(`${basePath}/uploads/${fileName}`, (err) => {
        if (err) throw err;
        console.log('image was deleted');
    });
}
const handleError = (err, res) => {
    console.log("handle err");
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

isValidLogin = (userName, password) => {
    return isValidUserName(userName) && isValidPassword(password);
}
isValidRegister = (user) => {
    return isValidFirstName(user.firstName) &&
        isValidLastName(user.lastName) &&
        isValidUserName(user.userName) &&
        isValidPassword(user.password) &&
        isValidImage(user.profileImageUrl);
}
isValidFirstName = (firstName) => {
    return isValidString(firstName) && isValidLength(firstName, 2, 15) && firstName.match(/^[A-Za-z]+$/);
}
isValidLastName = (lastName) => {
    return isValidString(lastName) && isValidLength(lastName, 2, 15) && lastName.match(/^[A-Za-z]+$/);
}
isValidUserName = (userName) => {
    return isValidString(userName) && isValidLength(userName, 3, 15) && userName.match(/^[A-Za-z]+$/);
}

isValidPassword = (password) => {
    return isValidString(password) && isValidLength(password, 5, 10);
}

isValidImage = (profileImageUrl) => {
    return isValidString(profileImageUrl);
}
isValidString = (str) => {
    return str != null && str != undefined && typeof str == 'string';
}

isValidLength = (str, min, max) => {
    return str.length >= min && str.length <= max;
}

const port = process.env.PORT || 3500;
app.listen(port, () => { console.log(`OK`); });
