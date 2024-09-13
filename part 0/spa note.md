sequenceDiagram
    participant: browser
    participant: server

    At first glance, the application appears identical to the previous version. The HTML code is nearly the same, but the JavaScript file (spa.js) differs, and there is a minor change in the definition of the form tag.

    The form has no action or method attributes to define how and where to send the input data
    When a new note is created the browser sends one request to the server.

    browser->>: post https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: { message: "note created" } Status code 201

    The server does not ask for a redirect but instead stays on the same page and stops sending HTTP requests. The browser then fetches the notes from the server.