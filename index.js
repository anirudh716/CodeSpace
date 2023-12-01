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
    if (option.value == "java"){
        editor.setOption("mode","text/x-java");
        editor.setValue(codeSnippets.java);
    }
    else if (option.value == "cpp"){
        editor.setOption("mode","text/x-c++src");
        editor.setValue(codeSnippets.cpp);
    }
    else if (option.value == "python"){
        editor.setOption("mode","text/x-python");
        editor.setValue(codeSnippets.python);
    }
    else{
        editor.setValue(codeSnippets.none);
    }
});

const codeSnippets = {
    none: 'Choose A Language From Above',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello";\n  return 0;\n}',
    java: 'public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}',
    python: 'print("Hello")'
};
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


