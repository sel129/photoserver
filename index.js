const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const port = 3000;

const app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file)
  next();
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

app.get('/app', (req, res) => {
    res.send('<form action="/profile" method="post" enctype="multipart/form-data"><input type="file" name="avatar" /><input type="submit"></form>')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

