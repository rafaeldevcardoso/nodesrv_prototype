let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload:true
});

module.exports = (app)=>{

    let route = app.route('/users');

    route.get((req, res) => {

        // find = metodo para listar dados de todos os usuários; sort = irá ordenar o resultado, no caso descrecente; exec = executa o comando, err = parametro pra caso de erro, users = é a informação propriamente dita 
        db.find({}).sort({name:-1}).exec((err, users)=>{

            if (err){
                app.utils.error.send(err, req, res);//o 400 é padrão então não precisa ser posto
            } else {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.json({
                    users //quando se tem uma chave com o mesmo no me da variavel 'users:users' basta usar uma vez só que o ECMAscript interpreta como nome:nome
                });
            }        
        });        
    });
    

    route.post((req, res)=>{

        if(!app.utils.validator.user(app, req, res)) return false;

        db.insert(req.body, (err, user)=>{
            
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });

    });  
    
    // Obtendo dados de 1 usuário especifico
    let routeId = app.route('/users/:id');

    routeId.get((req, res) => {
        // este db é o método que está na parte de cima do código
        // findOne trás somente um registro
        db.findOne({_id: req.params.id }).exec((err, user)=>{

            if(err){
                app.utils.error.send(err, req, res);
            }else{
                res.status(200).json(user);
            }

        });

    });

    routeId.put((req, res) => {
        
        if(!app.utils.validator.user(app, req, res)) return false;

        db.update({_id: req.params.id }, req.body, err => {

            if(err){
                app.utils.error.send(err, req, res);
            }else{
                res.status(200).json(Object.assign(req.params, req.body));
            }

        });

    });

    routeId.delete((req, res)=>{

        db.remove({ _id: req.params.id }, {}, err=>{

            if(err){
                app.utils.error.send(err, req, res);
            }else{
                res.status(200).json(req.params);
            }

        });
    });
};