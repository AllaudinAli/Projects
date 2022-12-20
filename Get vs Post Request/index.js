const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override')
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))

//-----------------------------------------------------------//
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'Lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching!'
    },
    {
        id: uuid(),
        username: 'AhmadCrisp',
        comment: 'How do you spell nessecory'
    }
]
app.get('/', (req, res) => {
    res.send('Home Page!')
})
app.get('/comments', (req, res) => {
    res.render('comments', { comments })
})
app.get('/comments/new', (req, res) => {
    res.render('new')
})
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments');
})
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(i => i.id === id);
    res.render('show', { comment });
})
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(i => i.id === id);
    res.render('edit', { comment })
})
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(i => i.id === id);
    foundComment = newCommentText;
    res.redirect('/comments');
})
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(i => i.id !== id);
    res.redirect('/comments')
})
app.listen(3000, () => {
    console.log('On Port 3000!');
})