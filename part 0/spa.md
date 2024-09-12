sequenceDiagram
    participant: browser
    participant: server

    browser->>: get https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    The single page app works differently from traditional web apps. We only fetch one HTML file from the server, the contents being manipulated by JavaScript. The server sends the HTML file, and the browser executes the JavaScript code that requests JSON data from the server.

    Although our app is a single page app, the server still sends the HTML file. The difference is that the server sends the HTML file only once, and the browser manipulates the contents with JavaScript. The server sends the HTML file, and the browser executes the JavaScript code that requests JSON data from the server.