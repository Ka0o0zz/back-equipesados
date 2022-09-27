const express = require('express')
//const home = require('./categories/home')
const path = require('path')
const fs = require('fs')



const app = express()
app.use(express.static(__dirname + '/public'));

/*
//Creating files
fs.readFile(__dirname + '/api/categories/home', 'utf8', function (err, data) {
    if(!err){
        var categories = JSON.parse(data).response_data.categories;
        categories.forEach((c,i)=>{
            fs.readFile(__dirname + '/api/products/list/for-category/'+c._id, 'utf8', function (err, data2) {
                if(!err){
                    var products = JSON.parse(data2).response_data;
                    var newCategories = {
                        "response_code": 200,
                        "response_data": categories };
                    newCategories.response_data[i].products = products;
                    fs.writeFile(__dirname + '/api/products/home/for-category/'+c._id, JSON.stringify(newCategories), ()=>{});
                }
            });
        });
    }
    //console.log(err);
    //console.log(data);
});
*/


//app.use('/static', express.static('api'));
//app.use('/api', express.static(path.join(__dirname, 'api')))


// app.get('/', (req, res) => {
//     res.status(200).json({
//         ok:true,
        
//     })
// });

app.get('/', function(req, res) {

    
    res.json({
        hola: 'holaa'
    })

});

app.get('/products/home_', function(req, res) {

    
    serveFile(res, 'api/products/home_');

});

app.get('/products/list/for-category/:id', function(req, res) {
    const {id} = req.params
    
    serveFile(res, `api/products/list/for-category/${id}`);

});

app.get('/products/home/for-category/:id', function(req, res) {
    const {id} = req.params
    serveFile(res, `api/products/home/for-category/${id}`);
});

app.get('/products/detail/:id', function(req, res) {
    const {id} = req.params;    
    serveFile(res, `api/products/detail/${id}.json`);

});

app.get('/users/me', function(req, res) {

    
    serveFile(res, 'api/users/me');

});

app.get('/categories/home', function(req, res) {

    
    serveFile(res, 'api/categories/home');

});

app.get('/chats/user/:id', function(req, res) {
    const {id} = req.params
    
    serveFile(res, `api/chats/user/${id}`);

});

app.get('/categories/:id', function(req, res) {
    const {id} = req.params
    
    serveFile(res, `api/categories/${id}`);

});

function serveFile(res, pathName, mime) {
    
    mime = mime || 'application/json';
    const basepath = __dirname.replace('/./', '')
    
    fs.readFile(basepath + '/' + pathName, function (err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end('Error loading ' + pathName + " with Error: " + err);
        }
        res.writeHead(200, {"Content-Type": mime});
        res.end(data);
    });
    
}

app.listen(8000, ()=>{
    console.log('el servidor se esta corriendo')
})