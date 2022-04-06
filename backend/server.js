const express = require('express')
const fs = require('fs')
const path = require('path')
const userFile = path.join(`${__dirname}/../frontend/users.json`)
const app = express();
const frontend = path.join(`${__dirname}/../frontend`);

app.use(express.json());

const port = 9000;

const folder = `${__dirname}/../frontend`

app.get('/', (request, response, next) => {
    
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
    
})

app.get('/admin/order-view', (request, response, next) => {
    
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
    
})

/*app.get("/kismacska", (request, response, next) => {
    console.log("Request received");
    res.sendFile(`${frontend}/somefile.json`);
});*/

app.get('/something', (request, response, next) => {
    
    console.log('request received for something endpoint')
    response.send('Thanks for your request. This is our response for something endpoint.')
    
})

app.get('/api/w1/users', (request, response, next) => {
    
    console.log('users endpoint')
    
    response.sendFile(path.join(`${__dirname}/../frontend/users.json`));
    
    //response.send(JSON.stringify(users))
    
})

app.get('/api/w1/users-query', (request, response, next) => {
    
    console.dir(request.query)
    console.log(request.query.apiKey)
    
    if ( request.query.apiKey === 'apple') {
        
        response.sendFile(path.join(`${__dirname}/../frontend/users.json`));
        
    } else {
        
        response.send('unauthorized')
    }
    
    response.sendFile(path.join(`${__dirname}/../frontend/users.json`));
    
    //response.send(JSON.stringify(users))
    
})

/*app.get('/api/w1/users-params/:key', (request, response, next) => {
    
    console.dir(request.params)
    console.log(request.params.key)
    
    if (request.params.key === 'apple') {
        
        response.send('azt írtad, hogy alma')
    } else {
        
        response.send('nem azt írtad, hogy alma')
    }
    response.send('Hello')
    
    
})*/

/*app.get('/api/w1/users/active', (request, response, next) => {
    
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
})*/

app.get('/api/w1/users-params/:key', (request, response, next) => {
    
    fs.readFile(userFile), (error, data) => {
        const users = JSON.parse(data);
        if (request.params.key === 'active') {
            
            
            const activeUsers = users.filter(user => user.status === 'active')
            //response.send(users.filter(user => user.status === 'active'))
            response.send(activeUsers)
            
            
        } else if (request.params.key === 'passive') {
            
            
            const passiveUsers = users.filter(user => user.status === 'passive')
            //response.send(users.filter(user => user.status === 'passive'))
            response.send(passiveUsers)

        } else {

            response.send('error')
        }
        
        
    }   
    
})

app.use('/public', express.static(`$folder}/../frontend/public`));


app.post("/users/new", (req, res) => {
    
    fs.readFile(`${frontend}/users.json`, (error, data) => {
        if (error) {

            console.log(error);
            res.send("Error reading users file");

        } else {

            const users = JSON.parse(data);

            console.log(req.body)
            users.push(req.body);

            fs.writeFile(`${frontend}/users.json`, JSON.stringify(users), error => {

                if (error) {
                    console.log(error);
                    res.send("Error writing users file");
                }
            })

            res.send(req.body);
        }
    })
})



app.listen(port, () => {
    
    console.log(`http://127.0.0.1:${port}`)
    
})
