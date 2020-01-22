class BlueBuy extends HTMLElement {

  static get observedAttributes() {
    return ['name'];
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    alert(`Value updated from ${oldValue} to ${newValue}`);
    this.render();
  }

  render() {
    this.innerHTML = `<h1>Hello ${this.attributes['name'].value}</h1>`;
    this.style.color = "red";
  }
}
window.customElements.define('blue-buy', BlueBuy);

function updateAttributes() {
  document.querySelector("blue-buy").setAttribute("name", "Anshul");
}