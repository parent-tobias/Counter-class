
class Button {
  constructor(props){
    this._id = props.id || null;
    this._label = props.label || "Your label here";
    this._click = (props.onClick && typeof(props.onClick) == "function") ? props.onClick : function(){}
    this._domEl = document.createElement("button");
    this._domEl.textContent = this._label;
    this._domEl.classList = props.classList;
  }
  get domEl(){
    this._domEl.addEventListener("click", this._click);
    
    return this._domEl;
    
  } 
}

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
    
    this._domEl = document.createElement("div");
    this._domEl.classList.add("counter");
    this._classList.forEach(className => this._domEl.classList.add(className));
    this._labelEl = document.createElement("header");
    this._labelEl.textContent = this._title;
    this._domEl.appendChild(this._labelEl);
    
    let that = this;
    this._incBtn = new Button({
      id: this._id+"-increment",
      label: "+",
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
      label: "-",
      onClick: function(){
        let counterVal = Number(that._counterEl.textContent);
        if(counterVal > that._min){
          that._counterEl.textContent = (Number(that._counterEl.textContent)-1);
          that._decrement();
          that._change()
        }
      },
      classList: "fa fa-arrow-down"
    })
    this._counterEl = document.createElement("div");
    this._counterEl.classList.add("counter-display");
    this._counterEl.textContent = this._default;
    
    this._domEl.appendChild(this._decBtn.domEl);
    this._domEl.appendChild(this._counterEl);
    this._domEl.appendChild(this._incBtn.domEl);
  }
  get domEl(){
    return this._domEl;
  }
  get count() {
    return Number(this._counterEl.textContent);
  }
  reset(){
    this._counterEl.textContent = this._default;
  }
}