const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/hello', function (req, res) {
    var jsqon = [{"message": "hello yourself"}];
    res.status(200).end(JSON.stringify(json));
});

app.get('/properties', function (req, res) {
	var json = [{"message": "properties!"}];
    res.status(200).end(JSON.stringify(json));
});

// npm run server
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`))