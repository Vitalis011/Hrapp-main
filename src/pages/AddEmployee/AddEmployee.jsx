import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAxios from "./../../hooks/useAxios";
import styles from "./AddEmployee.module.css";

const AddEmployee = ({onAddEmployee}) => {
    const {post} = useAxios();
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        salary: "",
        phone: "",
        email: "",
        animal: "",
        startDate: "",
        location: "",
        department: "",
        skills: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEmployee = {...formData, salary: parseFloat(formData.salary), skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean) };

        try {
            const res = await post(`${API_URL}/employees`, newEmployee);
            onAddEmployee(res.data);
            navigate("/");
        } catch (err) {
            console.error("Failed to add employee:", err);
        }
    };

    return (
        <>
        <h1>Add a new employee</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
           <input className={styles.input} type="text" placeholder="Name" value={formData.name} onChange={handleChange} name="name" />
           <input className={styles.input} type="text" placeholder="Title" value={formData.title} onChange={handleChange} name="title" />
           <input className={styles.input} type="number" placeholder="Salary" value={formData.salary} onChange={handleChange} name="salary" />
           <input className={styles.input} type="tel" placeholder="Phone number" value={formData.phone} onChange={handleChange} name="phone" />
           <input className={styles.input} type="email" placeholder="Email" value={formData.email} onChange={handleChange} name="email" />
           <input className={styles.input} type="text" placeholder="Favorite animal" value={formData.animal} onChange={handleChange} name="animal" />
    
           <input 
           className={styles.input}
           type="date" 
           placeholder="YYYY-MM-DD" 
           value={formData.startDate} 
           onFocus={(e) => e.target.type = "date"}
           onBlur={(e) => {
            if (!e.target.value) e.target.type = "text";}}
            onChange={handleChange} name="startDate" />
           <input className={styles.input} type="text" placeholder="Location" value={formData.location} onChange={handleChange} name="location"/>
           <input className={styles.input} type="text" placeholder="Department" value={formData.department} onChange={handleChange} name="department" />
           <input className={styles.input} type="text" placeholder="Skills" value={formData.skills} onChange={handleChange} name="skills" />
           <button className={styles.submitButton} type="submit">Add Employee</button>
        </form>
        </>
    )
};

export default AddEmployee;