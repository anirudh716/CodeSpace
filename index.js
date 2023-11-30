var editor = CodeMirror.fromTextArea(document.getElementById('editor'),{
        mode: 'clike',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
    }
);

var input = document.getElementById("input")
var onput = document.getElementById("output")
var run = document.getElementById("run-btn")

var option = document.getElementById("languages");
option.addEventListener("change", function(){
    if (option.value == "c"){
        editor.setOption("mode","text/x-csrc");
    }
    else if (option.value == "java"){
        editor.setOption("mode","text/x-java");
    }
    else if (option.value == "cpp"){
        editor.setOption("mode","text/x-c++src");
    }
    else if (option.value == "python"){
        editor.setOption("mode","text/x-python");
    }
});

var code;
run.addEventListener("click", async function(){
    code={
        code:editor.getValue(),
        input:input.value,
        lang:option.value
    }
    var oData = await fetch("http://localhost:8000/compile",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(code)
    })
    var d = await oData.json()
    output.value = d.output
})

