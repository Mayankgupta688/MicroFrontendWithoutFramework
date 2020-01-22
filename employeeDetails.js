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
          <div style="padding: 10px; border-bottom: 1px solid red;">
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
    var selectedEmployee = this.employeeList.filter(employee => employee.id == event.target.id.split("employee_")[1])[1]
    var customEvent = new CustomEvent("getDetails", {
      bubbles: true,
      selectedEmployee: selectedEmployee
    })
    this.dispatchEvent(customEvent)
  }
}

window.customElements.define('employee-list', EmployeeList);