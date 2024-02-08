

const mockData = [
    {
        "title": "My journey with Azure",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "created": "",
        "id": 1
    },
    {
        "title": "Learning Next.js and Node",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "created": "",
        "id": 2
    },
    {
        "title": "Deploying to Azure",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "created": "",
        "id": 3
    }
]

const cors = require('cors');

const express = require('express')
const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get('/', (req, res) => {
    res.send("hello world!")
})

app.get('/api/blogposts', (req, res) => {
    // if (!req.body.title || !req.body.text) res.status(400).send("Title and text is mandatory.")
    res.send(mockData)
})

app.get('/api/blogposts/:id', (req, res) => {
    const post = mockData.find(c => c.id === parseInt(req.params.id))
    if(!post) res.status(404).send('No post with this ID was found.')
    res.send(post)
})

app.put('/api/blogposts/:id', (req, res) => {
    const post = mockData.find(c => c.id === parseInt(req.params.id))
    if(!post) res.status(404).send('No post with this ID was found.')
    //TODO: add validation

    post.title = req.body.title
    post.text = req.body.text
    res.send(post)
})

app.post('/api/blogposts', (req, res) => {
    const post = {
        id: mockData.length + 1,
        title: req.body.title,
        text: req.body.text,
        created: ""
    }
    mockData.push(post)
    res.send(post)
})

app.delete('/api/blogposts/:id', (req, res) => {
    const post = mockData.find(c => c.id === parseInt(req.params.id))
    if(!post) res.status(404).send('No post with this ID was found.')

    const index = mockData.indexOf(post)
    mockData.splice(index, 1)
    res.send(post)
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on ${port}`))