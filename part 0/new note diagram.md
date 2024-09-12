sequenceDiagram
    participant: browser
    participant: server
    
    browser->>: post https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server->>browser: failed to send resource, error 302 and performs a redirect
    deactivate server
    browser-->>: redirect to https://studies.cs.helsinki.fi/exampleapp/notes

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the js file
    deactivate server

    Browser starts executing js code that requests JSON data from server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ content: "HTML is easy", date: "2024-05-27" }, ...]
    deactivate server

    The browser executes the callback function that renders notes to display