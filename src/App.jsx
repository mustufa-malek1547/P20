
import { useState } from "react";

function EmployeeList({ employees, onEdit, onDelete }) {
  return (
    <div>
      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p>No employees available.</p>
      ) : (
        employees.map((employee) => (
          <div key={employee.id}>
            <p>
              ID: {employee.id} | Name: {employee.name} |
              Department: {employee.department} |
              Salary: Rs. {employee.salary}
            </p>

            <button onClick={() => onEdit(employee)}>
              Edit
            </button>{" "}

            <button onClick={() => onDelete(employee.id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Sumit",
      department: "IT",
      salary: 30000
    },
    {
      id: 2,
      name: "Rahul",
      department: "HR",
      salary: 25000
    }
  ]);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [editId, setEditId] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (editId !== null) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editId
            ? {
                ...employee,
                name: name,
                department: department,
                salary: Number(salary)
              }
            : employee
        )
      );

      setEditId(null);
    } else {
      const newEmployee = {
        id: Date.now(),
        name: name,
        department: department,
        salary: Number(salary)
      };

      setEmployees([...employees, newEmployee]);
    }

    setName("");
    setDepartment("");
    setSalary("");
  }

  function handleEdit(employee) {
    setEditId(employee.id);
    setName(employee.name);
    setDepartment(employee.department);
    setSalary(String(employee.salary));
  }

  function handleDelete(id) {
    setEmployees(
      employees.filter((employee) => employee.id !== id)
    );

    if (editId === id) {
      setEditId(null);
      setName("");
      setDepartment("");
      setSalary("");
    }
  }

  return (
    <div>
      <h1>Employee Management System</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(event) => setSalary(event.target.value)}
          min="0"
          required
        />
        <br /><br />

        <button type="submit">
          {editId !== null ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <EmployeeList
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
