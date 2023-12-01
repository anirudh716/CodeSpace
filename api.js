const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const options = {stats:true}
compiler.init(options)
app.use(bodyP.json())
app.use("/style.css", express.static("E:/Projects/CodeSpace/style.css"))
app.use("/index.js", express.static("E:/Projects/CodeSpace/index.js"))
app.get("/", function(req, res){
    compiler.flush(function(){
        console.log("deleted")
    })
    res.sendFile("E:/Projects/CodeSpace/index.html")
})

app.post("/compile", function(req, res){
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    var envData = { OS : "windows"}; 
    try{
        if(lang == "cpp"){
            if(!input){ 
                var envData = { OS : "windows" , cmd : "g++", options:{timeout:10000}}; 
                compiler.compileCPP(envData , code , function (data) {
                    if(data.output){
                        res.send(data)
                    }
                    else{
                        res.send({output:"Error"})
                    }     
                });
            }
            else{
                var envData = { OS : "windows" , cmd : "g++", options:{timeout:10000}}; 
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.output){
                        res.send(data)
                    }
                    else{
                        res.send({output:"Error"})
                    }
                });
            }
        }
        else if(lang == "java"){
            if(!input){
                var envData = { OS : "windows"}; 
                compiler.compileJava( envData , code , function(data){
                    if(data.output){
                        res.send(data)
                    }
                    else{
                        res.send({output:data})
                    }
                });    
            }
            else{
                var envData = { OS : "windows"};
                compiler.compileJavaWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data)
                    }
                    else{
                        res.send({output:"Error"})
                    }
                });
            }
        }
        else if(lang == "python"){
            if(!input){
                var envData = { OS : "windows"}; 
                compiler.compilePython( envData , code , function(data){
                    if(data.output){
                        res.send(data)
                    }
                    else{
                        res.send({output:"Error"})
                    }
                });    
            }
            else{
                var envData = { OS : "windows"}; 
                compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data)
                    }
                    else{
                        res.send({output:data})
                    }        
                });
            }
        }
    } 
    catch(e){
        console.log("Error")
    }
})
app.listen(8000)