const fs = require('fs');
const express = require('express')
const cors = require('cors')
const app = express()

const PORT = 1000

app.use(cors())

const files = fs.readdirSync('./public/Media/').filter((item) => item.match(/.mp3/))


app.get('/', (req, res) => res.status(200).json({ files: [...files]}))


app.listen(PORT, () => {
    console.log('Server started on port %s', PORT)
})