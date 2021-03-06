class EmployeeList extends HTMLElement {

  employeeList = [];
  connectedCallback() {
    fetch("http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees")
    .then((resp) => resp.json()) 
    .then((data) => {
      this.employeeList = data;
      data.forEach(element => {
        let headerComponent = document.createElement("div");
        headerComponent.style.margin = "20px";
        headerComponent.innerHTML = `
          <div style="padding: 10px; border-bottom: 1px solid red; border-right: 1px solid red;">
            <div style="display: inline-block; width: 200px">
              <img src="${element.avatar}" />
            </div>
            <div style="display: inline-block; vertical-align: top;">
              <b>User Name: ${element.name}</b><br/><br/>
              <input type="button" value="Click To Show Details" id="employee_${element.id}" class="employee_details" />
            </div>
          </div>`;
        this.appendChild(headerComponent)
        document.getElementById(`employee_${element.id}`).addEventListener("click", this.getEmployeeDetails.bind(this))
      });
    })
  }

  getEmployeeDetails(event) {
    var selectedEmployee = this.employeeList.filter(employee => {
      return employee.id == event.target.id.split("employee_")[1]
    })
    var customEvent = new CustomEvent("getDetails", {
      bubbles: true,
      detail: {
        selectedEmployee: selectedEmployee[0]
      }
    })
    this.dispatchEvent(customEvent)
  }
}

class OtherElement extends HTMLElement {
  selectedEmployee = null;
  render() {
    if(this.selectedEmployee) {
      this.innerHTML = `<div style="">
        <h2>Employee Selected...</h2>
        <b>Employee Name: ${this.selectedEmployee.name}</b><br/><br/>
        <b>Employee Create On: ${this.selectedEmployee.createdAt}</b><br/><br/>
        <b>Employee Id: ${this.selectedEmployee.id}</b>
      </div>`;
    } else {
      this.innerHTML = `<h2></h2>`;
    }
  }
  connectedCallback() {
    this.render();
    window.addEventListener("getDetails", (event) => {
      this.selectedEmployee = event.detail.selectedEmployee;
      this.render();
    })
  }
}

window.customElements.define('other-element', OtherElement);

function updateAttributes() {
  document.querySelector("blue-buy").setAttribute("name", "Anshul");
}

window.customElements.define('employee-list', EmployeeList);