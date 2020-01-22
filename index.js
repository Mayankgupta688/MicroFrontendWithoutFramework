class BlueBuy extends HTMLElement {

  static get observedAttributes() {
    return ['name'];
  }

  connectedCallback() {
    this.render()
    document.getElementById("invokeFunction").addEventListener("click", () => {
      var event = new CustomEvent("update", {
        bubbles: true
      });
      this.dispatchEvent(event)
    })
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div>
        <h1>Hello ${this.attributes['name'].value}</h1>
        <input type="button" value="Click to Raise Event" id="invokeFunction" />
      </div>`;
    this.style.color = "red";
  }
}

class OtherElement extends HTMLElement {

  isUpdated = "None";
  render() {
    this.innerHTML = `<h2>This is Child Component ${this.isUpdated}</h2>`;
  }

  connectedCallback() {
    this.render();
    this.addEventListener("update", () => {
      this.isUpdated = "Updated...";
      this.render();
    })
  }
}

window.customElements.define('blue-buy', BlueBuy);
window.customElements.define('other-element', OtherElement);

function updateAttributes() {
  document.querySelector("blue-buy").setAttribute("name", "Anshul");
}

// $('blue-buy')[0].addEventListener('blue:basket:changed', function() {
//   $('blue-basket')[0].refresh();
// });