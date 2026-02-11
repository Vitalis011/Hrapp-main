import {useState} from "react";
import axios from 'axios';
import './PersonCard.css';

const PersonCard = ({
    id,
    name,
    title,
    salary,
    phone,
    email,
    animal,
    startDate,
    location,
    department,
    skills,
    onUpdate,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newSalary, setNewSalary] = useState(salary);
    const [newLocation, setNewLocation] = useState(location);
    const [newDepartment, setNewDepartment] = useState(department);
    const [skillsInput, setSkillsInput] = useState(skills.join(", "));
    const [message, setMessage] = useState("");

    const handleSave = async () => {
        const updatedFields = {};
       if (parseFloat(newSalary) !== parseFloat(salary)) updatedFields.salary = parseFloat(newSalary);
       if (newLocation !== location) updatedFields.location = newLocation;
       if (newDepartment !== department) updatedFields.department = newDepartment;
       const parsedSkills = skillsInput.split(",").map(s => s.trim()).filter(Boolean);
       if (parsedSkills.join(",") !== skills.join(",")) updatedFields.skills = parsedSkills;

       if (Object.keys(updatedFields).length === 0) return;

       try {
        const res = await axios.patch(`http://localhost:3001/employees/${id}`, updatedFields);
        onUpdate(id, {...res.data, skills: parsedSkills});
        setMessage("Changes saved!");
        setTimeout(() => setMessage(""), 2000);
        setIsEditing(false);
       } catch (err) {
        console.error("Failed to update:", err);
        setMessage("Update failed");
        setTimeout(() => setMessage(""), 2000);
       }
    };

    const handleCancel = () => {
        setNewSalary(salary);
        setNewLocation(location);
        setNewDepartment(department);
        setSkillsInput(skills.join(", "));
        setIsEditing(false);
        setMessage("");
    };

    const isSaveDisabled = () => {
        return (
        parseFloat(newSalary) === parseFloat(salary) &&
        newLocation === location &&
        newDepartment === department &&
        skillsInput.split(",").map(s => s.trim()).filter(Boolean).join() === skills.join(",")
        );
    };

    const start = new Date(startDate);
    const today = new Date();
    
    const monthsWorked = (today.getFullYear() - start.getFullYear()) * 12 + (today.getMonth() - start.getMonth());
    const yearsWorked = monthsWorked / 12;
    const isProbation = yearsWorked < 0.5;
    const isAnniversary = Math.floor(yearsWorked) > 0 && Math.floor(yearsWorked) % 5 === 0;

    const getAnimalEmoji = (animal) => {
        const map = {
            parrot: "🦜",
            cat: "🐈",
            owl: "🦉",
            dog: "🐕",
            pig: "🐖",
            chicken: "🐔",
            leopard: "🐆",
            eagle: "🦅",
            bear: "🐻",
            panda: "🐼",
            penguin: "🐧"
        };

        return map[animal?.toLowerCase()] || animal;
    };

    return (
        <div className="personCard">
            <div className="personCard-header">
            <p>Name: {name}</p>
            <p>Title: {title}</p>
            <p>Phone: {phone}</p>
            <p>Email: {email}</p>
            <p>Animal: {getAnimalEmoji(animal)}</p>
            <p>Start Date: {startDate}</p>
            <p>Years Worked: {yearsWorked.toFixed(1)} years</p>
            {isAnniversary && (
                <p>🎉 Schedule recognition meeting.</p>
            )}
            {isProbation && (
                <p>🔔 Schedule probation review.</p>
            )}
            </div>
            <div className="personCard-content">
                {isEditing ? (
                    <input type="number" value={newSalary} 
                    onChange={(e) => setNewSalary(e.target.value)} />
                ) : (
                    <p className="salary">Salary: {salary}€</p>
                )}
                {isEditing ? (
                    <input type="text" value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)} />
                ) : (
                    <p className="location">Location: {location}</p>
                )}
                {isEditing ? (
                    <input type="text" value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)} />
                ) : (
                    <p className="department">Department: {department}</p>
                )}
                {isEditing ? (
                    <input type="text" value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
        />
                ) : (
                    <p className="skills">Skills: {skills.join(", ")}</p>
                )}
            </div>
            <div className="personCard-footer">
            {isEditing ? (
                <>
                <button onClick={handleSave} disabled={isSaveDisabled()}>
                    Save</button>
                <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <button className="secondary" onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            )}
            {message && <p className="confirmation">{message}</p>}
        </div>
    </div>
    );
};

export default PersonCard;