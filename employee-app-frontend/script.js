const API_URL = 'http://localhost:8080';

// Show loader element
const showLoader = () => {
    const loader = document.querySelector('#loader');
    loader.style.display = 'block';
  };
  setTimeout(() => {
    hideLoader();
  }, 3000); // 2 minutes in milliseconds
  // Hide loader element
  const hideLoader = () => {
    const loader = document.querySelector('#loader');
    loader.style.display = 'none';
  };

// Fetch all employees and render the table
const fetchEmployees = async () => {
  try {
    const response = await fetch(`${API_URL}/employees`);
    const employees = await response.json();
    const tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = '';

    employees.forEach(employee => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.title}</td>
        <td>${employee.department}</td>
        <td>${employee.annualSalary}</td>
        <td>
          <button class="update-button" onclick="updateEmployee('${employee._id}')">Update</button>
          <button class="delete-button" onclick="deleteEmployee('${employee._id}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
};

// Create a new employee
const createEmployee = async (event) => {
  event.preventDefault();

  const nameInput = document.querySelector('#nameInput');
  const titleInput = document.querySelector('#titleInput');
  const departmentInput = document.querySelector('#departmentInput');
  const salaryInput = document.querySelector('#salaryInput');

  const employeeData = {
    name: nameInput.value,
    title: titleInput.value,
    department: departmentInput.value,
    annualSalary: parseFloat(salaryInput.value),
  };

  try {
    showLoader(); // Show the loader element

    await fetch(`${API_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    // Clear form inputs
    nameInput.value = '';
    titleInput.value = '';
    departmentInput.value = 'HR';
    salaryInput.value = '';

    // Fetch and render updated employee list
    fetchEmployees(); // Fetch and render updated employee list
  } catch (error) {
    console.error('Error creating employee:', error);
  } finally {
    hideLoader(); // Hide the loader element
  }
};

// Update an employee
const updateEmployee = async (employeeId) => {
    const title = prompt('Enter the new title:');
    if (!title) return;
  
    const department = prompt('Enter the new department:');
    if (!department) return;
  
    const annualSalary = prompt('Enter the new annual salary:');
    if (!annualSalary) return;
  
    const updatedEmployeeData = {
      title,
      department,
      annualSalary: parseFloat(annualSalary),
    };
  
    try {
      await fetch(`${API_URL}/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployeeData),
      });
  
      // Fetch and render updated employee list
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };
  

// Delete an employee
const deleteEmployee = async (employeeId) => {
  const confirmDelete = confirm('Are you sure you want to delete this employee?');
  if (!confirmDelete) return;

  try {
    await fetch(`${API_URL}/employees/${employeeId}`, {
      method: 'DELETE',
    });

    // Fetch and render updated employee list
    fetchEmployees();
  } catch (error) {
    console.error('Error deleting employee:', error);
  }
};

// Add event listener to the form submit event
const employeeForm = document.querySelector('#employeeForm');
employeeForm.addEventListener('submit', createEmployee);

// Fetch and render initial employee list
fetchEmployees();
