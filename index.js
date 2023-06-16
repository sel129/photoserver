const express = require('express')
const multer  = require('multer')
const { db } = require('./db');
const {authCheck} = require('./authMiddleware')

const upload = multer({ dest: 'uploads/' })
const port = 3000;

const app = express()

// initialize the index
async function initialize() {
  await db.get('index', (err) => {
    if(err?.code === 'LEVEL_NOT_FOUND') {
      db.put('index', 0)
    }
  })
}
initialize();

app.use(authCheck)
app.use(express.static('uploads'))

app.post('/upload', upload.single('photo'), async function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file)
  const record = {
    date: new Date(),
    path: req.file.path.split('/')[1]
  }
  const index = await db.get('index')
  await db.put(index, record)
  await db.put('index', index + 1)

  res.status(200).send('success')
  next();
})

app.get('/photo/:photoId', async (req, res) => {
  const value = await db.get(req.params.photoId)
  res.status(200).json(value)
})


app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

app.get('/photos', async function(req, res, next) {
  const from = Number(req.query.from)
  const to = Number(req.query.to)

  if(from > to) {
    res.status(500).send("from > to")
  }

  const keys = [];
  for (let i = from; i <= to; i++) {
    keys.push(i)
  }

  const files = await db.getMany(keys)

  res.status(200).json(files);

})

app.get('/app', (req, res) => {
    res.send('<form action="/upload" method="post" enctype="multipart/form-data"><input type="file" name="photo" /><input type="submit"></form>')
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

