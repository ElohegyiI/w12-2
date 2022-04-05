const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express();
const port = 9000;

app.get('/', (request, response, next) => {

    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));

})


app.get('/something', (request, response, next) => {

    console.log('request received for something endpoint')
    response.send('Thanks for your request. This is our response for something endpoint.')

})

app.get('/api/w1/users', (request, response, next) => {

    console.log('users endpoint')

    response.sendFile(path.join(`${__dirname}/../frontend/users.json`));

    //response.send(JSON.stringify(users))

})

app.get('/api/w1/users/active', (request, response, next) => {

    fs.readFile('../frontend/users.json', (error, data) => {

       if (error) {

        response.send(error)

       } else {

        const users = JSON.parse(data);

        //const activeUsers = users.filter(user => user.status === 'active')
        response.send(users.filter(user => user.status === 'active'))
       }

    })

});

app.get('/api/w1/users/passive', (request, response, next) => {

    fs.readFile('../frontend/users.json', (error, data) => {

        if (error) {
 
         response.send('Hiba van!')
 
        } else {
 
         const users = JSON.parse(data);
 
         //const passiveUsers = users.filter(user => user.status === 'passive')
         response.send(users.filter(user => user.status === 'passive'));

        }
    

    })
})

app.use('/public', express.static(`${__dirname}/../frontend/public`));

app.listen(port, () => {

    console.log(`http://127.0.0.1:${port}`)

})
