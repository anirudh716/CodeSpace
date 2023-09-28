var editor = CodeMirror.fromTextArea(document.getElementById('editor'),{
        mode: 'clike',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
    }
);