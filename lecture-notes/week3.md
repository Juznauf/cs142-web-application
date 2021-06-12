### Document Object Model (DOM)


#### Accessing DOM nodes
- Walking the DOM hierarchy is not recommended (traversing the sibling and child nodes)
- Use DOM lookup method, an example of using ids:
    `HTML: <div id="div42">...</div>`

    `element = document.getElementById("div42");element.setAttribute()`


#### Events

- DOM communicates to javascript with Events
- Event handling
    - Creating an event handler,must specify three things
    - What happened: the event of interest
    - Where it happened: an element of interest
    - What to do: Javascript to invoke when the event occurs on the element
- Node.js uses event dispatching engine in JavaScript for server programming


#### Front end programming
- MVC pattern 
    - Model: Manages the application data
    - View: What the web page looks like
    - Controller: Fetch models and control view, handle user interactions

- View generation
    - Web app