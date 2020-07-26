// Arquivo para tratar os erros. Toda fez que precisar exibir um erro irá invocar esse bloco

module.exports = {
    send: (err, req, res, code = 400)=>{

        console.log(`error: ${err}`);
        res.status(code).json({
            error: err
        });
    }
};