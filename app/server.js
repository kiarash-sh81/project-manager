module.exports = class Apllication{
    #experss = require('express');
    #app = this.#experss();
    constructor(PORT , DB_URL){
        this.configDataBase(DB_URL);
        this.configApllication();
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();
    }
    configApllication(){
        const path = require('path');
        this.#app.use(this.#experss.json());
        this.#app.use(this.#experss.urlencoded({extended : true}));
        this.#app.use(this.#experss.static("/public" ,path.join(__dirname , ".." , "public")));
    }
    createServer(PORT){
        const http =require('http');
        const server = http.createServer(this.#app);
        server.listen(PORT , ()=>{
            console.log(`Server Run > On http://localhost:${PORT}`);
        });
    }
    configDataBase(DB_URL){
        const mongoose = require('mongoose');
        mongoose.connect(DB_URL , (error)=>{
            if(error) throw error
            return console.log(`Connected to DB successfully...`);
        })

    }
    errorHandler(){
        this.#app.use((req , res , next)=>{
            return res.status(404).json({
                status: 404,
                success: false,
                message: "page not founded"
            });
        });
        this.#app.use((error , req , res , next)=>{
            const status = error?.status || 500;
            const message = error?.message || "internalServerError";
            return res.status(status).json({
                status,
                success: false,
                message
            });
        })
    }
    createRoutes(){
        this.#app.get("/" , (req , res , next)=>{
            return res.json({
                message: "this is a new Express application "
            })
        })
    }
}