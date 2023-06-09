const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },
  eventHandlers: {
    oninput: null,
    onclose: null,
  },
  properties: {
    value: "",
    capslock: false,
  },
  init() {
    //Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    //Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard-keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard-key");

    //Add to DOM
    document.body.appendChild(this.elements.main);
    this.elements.main.appendChild(this.elements.keysContainer);
    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },
  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space",
    ];
    const createIconHtml = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const addLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;
      //Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard-key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard-key--wide");
          keyElement.innerHTML = createIconHtml("backspace");
          keyElement.addEventListener("click", () => {
            var activeElement = document.activeElement;

            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });
          break;
        case "caps":
          keyElement.classList.add(
            "keyboard-key--wide",
            "keyboard-key--activateable"
          );
          keyElement.innerHTML = createIconHtml("keyboard_capslock");
          keyElement.addEventListener("click", () => {
            this._toggleCapslock();

            keyElement.classList.toggle(
              "keyboard-key-active",
              this.properties.capslock
            );
          });
          break;
        case "enter":
          keyElement.classList.add("keyboard-key--wide");
          keyElement.innerHTML = createIconHtml("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });
          break;

        case "space":
          keyElement.classList.add("keyboard-key--extra--wide");
          keyElement.innerHTML = createIconHtml("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });
          break;

        case "done":
          keyElement.classList.add("keyboard-key--wide", "keyboard-key--dark");
          keyElement.innerHTML = createIconHtml("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capslock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });
          break;
      }
      fragment.appendChild(keyElement);

      if (addLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },
  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },
  _toggleCapslock() {
    this.properties.capslock = !this.properties.capslock;
    for (key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capslock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },
  open(initalValue, oninput, onclose) {
    this.properties.value = initalValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },
  close() {
    this.properties.value = "";
    this.eventHandlers.onclose = onclose;
    this.eventHandlers.oninput = oninput;
    this.elements.main.classList.add("keyboard--hidden");
  },
};

window.addEventListener("DOMContentLoaded", () => {
  Keyboard.init();
});

console.log("hello");
