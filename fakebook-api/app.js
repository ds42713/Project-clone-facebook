require('dotenv').config()
require('./config/passport')
const express = require('express');
const cors = require('cors');
const db = require('./models/index')

const userRoute = require('./routes/userRoute')
const friendRoute = require('./routes/friendRoute')
const postRoute = require('./routes/postRoute')
const commentRoute = require('./routes/commentRoute')
const likeRoute = require('./routes/likeRoute')

const app = express();

app.use(cors()); // จำเป็นต้องเรียก
app.use(express.json()); // จำเป็นต้องเรียก
app.use(express.urlencoded({ extended: false })); // จำเป็นต้องเรียก

app.use('/static', express.static('public')) // ไฟล์รูป

app.use('/users', userRoute)
app.use('/friends', friendRoute)
app.use('/posts', postRoute)
app.use('/comments', commentRoute)
app.use('/like', likeRoute)


app.use((req,res) => {
    res.status(404).json({ message: 'resource not found on this server '})
})
app.use((err,req,res,next) => {
    console.log(err)
    res.status(500).json({ message: err.message })
})

const port = process.env.PORT
db.sequelize.sync({force: false}).then(() => {
    console.log("Database is sync DONE")
    app.listen(port, () => {
        console.log(`Server is running at port ${process.env.PORT}`);
    });
})
