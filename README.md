# Employee Creation/Updation and Deletion App

This application allows you to create, update, and delete employee records. It provides an interface to manage employee information including their name, title, department, and annual salary. The app also includes logging functionality for history and auditing purposes.

## Deployment

The application is deployed and can be accessed using the following links:

- Frontend: [Deployed Frontend](https://employee-task-manager.netlify.app/)
- Backend: [Deployed Frontend](https://employee-task-manager.onrender.com/)


## Features

- Create new employee records
- Update department, title, and annual salary of existing employees
- Mark employees as deleted
- Logging functionality for history and auditing
- Typescript implementation
- Test coverage

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - MongoDB
- Frontend:
  - HTML
  - CSS (Vanilla)
  - JavaScript (Vanilla)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/employee-app.git
   
2. Install the dependencies for the backend:
  ```bash
   cd employee-app-backend
   npm install
```

3. Install the dependencies for the frontend:
  ```bash
   cd ../employee-app-frontend
   npm install
```

4. Run the application
  ```bash
cd employee-app-backend
npm start
```
5. Testing
  ```bash
cd employee-app-backend
npm test
```
6. User guide
- Use the provided form to create a new employee record by entering their name, title, department, and annual salary.
- Click on the "Create Employee" button to add the employee to the database.
- The employee list will be displayed, showing the existing employees with their details.
- To update an employee, click the "Update" button next to the respective employee. Provide the updated information in the form that appears and click "Update" to save the changes.
- To delete an employee, click the "Delete" button next to the respective employee. The employee will be marked as deleted (soft delete) in the database.
- The application also captures logs for the history and auditing purposes.

