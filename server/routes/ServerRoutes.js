async function ServerRoutes(app){
    console.log('Server routes enabled..');
    app.get('/', async (req, res)=>{
        res.json({'res':'working'});
    });
}

module.exports = {
    ServerRoutes
}