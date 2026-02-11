import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AddEmployee.css";

const AddEmployee = ({onAddEmployee}) => {
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        salary: "",
        phone: "",
        email: "",
        animal: "",
        startDate: "2010-02-01",
        location: "",
        department: "",
        skills: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEmployee = {...formData, id: Date.now(),skills: formData.skills.split(",") };
        axios.post("http://localhost:3001/employees", newEmployee).then((res) => {
            console.log(res);
        });

        onAddEmployee(newEmployee);
        navigate("/");

        setFormData({ name: "", title: "", salary: "", phone: "", email: "", animal: "", startDate: "", location: "", department: "", skills: ""});
    };

    return (
        <>
        <h1>Add a new employee</h1>
        <form onSubmit={handleSubmit}>
           <input type="text" placeholder="Name" value={formData.name} onChange={handleChange} name="name" />
           <input type="text" placeholder="Title" value={formData.title} onChange={handleChange} name="title" />
           <input type="number" placeholder="Salary" value={formData.salary} onChange={handleChange} name="salary" />
           <input type="tel" placeholder="Phone number" value={formData.phone} onChange={handleChange} name="phone" />
           <input type="email" placeholder="Email" value={formData.email} onChange={handleChange} name="email" />
           <input type="text" placeholder="Animal" value={formData.animal} onChange={handleChange} name="animal" />
           <input type="date" placeholder="Start date" value={formData.startDate} onChange={handleChange} name="startDate" />
           <input type="text" placeholder="Location" value={formData.location} onChange={handleChange} name="location"/>
           <input type="text" placeholder="Department" value={formData.department} onChange={handleChange} name="department" />
           <input type="text" placeholder="Skills" value={formData.skills} onChange={handleChange} name="skills" />
           <button type="submit">Add Employee</button>
        </form>
        </>
    )
};

export default AddEmployee;