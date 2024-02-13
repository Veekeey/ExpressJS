fs = require('fs');

const handleEvents = (req, res)=>{
    const url = req.url;
    const method = req.method;

    if (url === '/'){
        res.write('<html>');
        res.write('<head><title>node routing</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type=submit>Send</button></form></body');
        res.write('</html>');
        return res.end();
    }
    
    
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (info) =>{
            console.log(info);
            body.push(info);
        });

        req.on('end', ()=>{
            parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            message = parsedBody.split("=")[1];
            fs.writeFileSync('message.txt', message);
        })

        res.statusCode = 302;
        res.setHeader('Location', "/");
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>new node page</title></head>');
    res.write('<body><h1>Welcome to my node page for routing</h1></body');
    res.write('</html>');
    res.end();
};

module.exports = handleEvents;