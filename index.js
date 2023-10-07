var editor = CodeMirror.fromTextArea(document.getElementById('editor'),{
        mode: 'clike',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
    }
);

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

