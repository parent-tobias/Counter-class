/***
 * A Button class, simply a unified way of constructing buttons
 *   from a given object spec. The config object for the button:
 *
 *  {
 *    id: <unique id for this button, String>,
 *    label: <label for this button, String>,
 *    onClick: <click handler, callback function>,
 *    classList: <list of classes for this button, String>
 *  }
 *  All are optional.
 *
 * Button.domEl -- returns the DOM node for this button, with classes, ids
 *    and event handlers attahed.
 *
 ***/
class Button {
  constructor(props){
    this._id = props.id || null;
    this._label = props.label || null;
    this._click = (props.onClick && typeof(props.onClick) == "function") ? props.onClick : function(){}
    this._domEl = document.createElement("button");
    if(this._id) this.domEl.id = this._id;
    this._domEl.textContent = this._label;
    if(props.classList) this._domEl.classList = props.classList;
  }
  get domEl(){
    this._domEl.addEventListener("click", this._click);
    
    return this._domEl;
    
  } 
}
/****
 * Counter class. A simple increment/decrement counter, this is
 *   composed of two buttons and a display node. The buttons use
 *   the above Button class, so as to be consistent.
 *
 * The constructor properties looks for an object, formatted like:
 *
 *  {
 *    id: <ID to assign to this el. Also used to build IDs for
 *        sub-components. String>,
 *    max: <Maximum count value, Integer>,
 *    min: <Minimum count value, Integer>,
 *    default: <Default count value, Integer>,
 *    title: <Text label for Counter widget, String>,
 *    classList: <List of classes to assign to this Counter, String>,
 *    onIncrement: <Function to handle increment callback, function>,
 *    onDecrement: <Function to handle decrement callback, function>,
 *    onChange: <Function to handle change callback, function>,
 *    onReset: <Function to handle reset callback, function>
 *  }
 *
 *  Something to note, and something that could be made more robust:
 *    I don't actually maintain a **COUNTER** value anywhere. I simply
 *    populate the text field with a value, and get that as I need it.
 *
 ****/
class Counter {
  constructor(props){
    this._id = props.id;
    this._max = props.max || 10;
    this._min = props.min || 0;
    this._default = props.default || 5;
    this._title = props.title || "Counter";
    this._classList = props.classList || [];
    this._increment = (props.onIncrement && typeof(props.onIncrement) == "function") ? 
      props.onIncrement :
      function(){};
    this._decrement = (props.onDecrement && typeof(props.onDecrement) == "function") ? 
      props.onDecrement :
      function(){};
    this._change = (props.onChange && typeof(props.onChange) == "function") ? 
      props.onChange :
      function(){};
    this._reset = (props.onReset && typeof(props.onReset) == "function") ?
      props.onReset :
      function(){};
    // Let's create and set preferences on the widget container
    this._domEl = document.createElement("div");
    this._domEl.id = this._id;
    this._domEl.classList.add("counter");
    this._classList.forEach(className => this._domEl.classList.add(className));
    
    // First thing our Counter widget needs is a label of some sort.
    this._labelEl = document.createElement("header");
    this._labelEl.textContent = this._title;
    // And we can stick that header into the Counter container.
    this._domEl.appendChild(this._labelEl);
    
    // In the context of the buttons, the context of 'this' has changed.
    //  We could use bind(), but for simplicity, I've created a reference
    //  to the current context.
    let that = this;
    
    // We can use our Button class, so we get the exact same behavior
    //   from both buttons.
    this._incBtn = new Button({
      id: this._id+"-increment",
      // label: "+",
      // The click handler for the increment button should call both
      //   our increment handler AND our change handler. If neither is
      //   defined, we're just running empty functions.
      onClick: function(){
        let counterVal = Number(that._counterEl.textContent);
        if(counterVal < that._max){
          that._counterEl.textContent = (counterVal+1);
          that._increment(); 
          that._change()
        }
      },
      classList: "fa fa-arrow-up"
    })
    this._decBtn = new Button({
      id: this._id+"-decrement",
      //label: "-",
      onClick: function(){
        let counterVal = Number(that._counterEl.textContent);
        if(counterVal > that._min){
          that._counterEl.textContent = (Number(that._counterEl.textContent)-1);
          that._decrement();
          that._change()
        }
      },
      classList: "fa fa-arrow-down"
    });
    
    // We also need to create a displayed element that will contain
    //   the current value.
    this._counterEl = document.createElement("div");
    this._counterEl.classList.add("counter-display");
    if(this._id) this._counterEl.id = this._id+"-count";
    this._counterEl.textContent = this._default;
    
    // Place all three newly created elements into our container.
    this._domEl.appendChild(this._decBtn.domEl);
    this._domEl.appendChild(this._counterEl);
    this._domEl.appendChild(this._incBtn.domEl);
  }
  
  /***
   * Getters and setters for our Counter.
   *
   * - Counter.domEl;     (returns the complete DOM node for our widget)
   * - Counter.count;     (returns the current count value)
   * - Counter.count = 5; (sets the count value to 5)
   * - Counter.reset();   (resets the counter to its default value)
   ***/
  
  get domEl(){
    return this._domEl;
  }
  get count() {
    return Number(this._counterEl.textContent);
  }
  set count(val) {
    this._counterEl.textContent = Number(val);
  }
  reset(){
    this._reset();
    this._counterEl.textContent = this._default;
  }
}