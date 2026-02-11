import {useState, useRef, useEffect} from "react";
import useAxios from './../../hooks/useAxios';
import styles from './PersonCard.module.css';

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
    const {patch} = useAxios();
    const [isEditing, setIsEditing] = useState(false);
    const [newSalary, setNewSalary] = useState(salary);
    const [newLocation, setNewLocation] = useState(location);
    const [newDepartment, setNewDepartment] = useState(department);
    const safeSkills = Array.isArray(skills) ? skills : [];
    const [skillsInput, setSkillsInput] = useState(safeSkills.join(", "));
    const [message, setMessage] = useState("");

    const start = new Date(startDate);
    const today = new Date();

    const salaryInputRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            if (document.activeElement === salaryInputRef.current) {
                salaryInputRef.current.blur();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    const monthsWorked = (today.getFullYear() - start.getFullYear()) * 12 + (today.getMonth() - start.getMonth());
    const yearsWorked = monthsWorked / 12;

    const getReminders = () => {
        if (yearsWorked < 0.5) {
            return <p className="reminder">🔔 Schedule probation review.</p>;
        }
        if (Math.floor(yearsWorked) > 0 && Math.floor(yearsWorked) % 5 === 0) {
            return <p className="reminder">🎉 Schedule recognition meeting.</p>;
        }
        return null;
    }

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
            penguin: "🐧",
            butterfly: "🦋",
            bee: "🐝",
            ant: "🐜",
            ladybug: "🐞",
            crab: "🦀",
            lobster: "🦞",
            shrimp: "🦐",
            camel: "🐪",
            kangaroo: "🦘",
            bat: "🦇",
            turkey: "🦃",
            duck: "🦆",
            swan: "🦢",
            peacock: "🦚",
            flamingo: "🦩",
            turtle: "🐢",
            frog: "🐸",
            mouse: "🐁",
            rat: "🐀",
            hedgehog: "🦔",
            snake: "🐍",
            dragon: "🐉",
            unicorn: "🦄",
            sheep: "🐑",
            goat: "🐐",
            monkey: "🐒",
            elephant: "🐘",
            tiger: "🐅",
            lion: "🦁",
            fox: "🦊",
            wolf: "🐺",
            crocodile: "🐊",
            whale: "🐋",
            dolphin: "🐬",
            fish: "🐟",
            shark: "🦈",
            octopus: "🐙",
            snail: "🐌",
            rabbit: "🐇",
            horse: "🐎",
            cow: "🐄"
        };

        return map[animal?.toLowerCase()] || "❓";
    };

    const handleSave = async () => {
        
        const updatedFields = {};
       if (parseFloat(newSalary) !== parseFloat(salary)) updatedFields.salary = parseFloat(newSalary);
       if (newLocation !== location) updatedFields.location = newLocation;
       if (newDepartment !== department) updatedFields.department = newDepartment;
       const parsedSkills = skillsInput.split(",").map(s => s.trim()).filter(Boolean);
       if (parsedSkills.join(",") !== skills.join(",")) updatedFields.skills = parsedSkills;

       if (Object.keys(updatedFields).length === 0) return;

       try {
        const res = await patch(`${import.meta.env.VITE_API_URL}/employees/${id}`, updatedFields);
        onUpdate(id, {...res.data, skills: parsedSkills});
        setMessage("Changes saved!");
        setTimeout(() => setMessage(""), 2000);
        setIsEditing(false);
       } catch {
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
        const currentSkills = skills.map(s => s.trim()).sort();
        const inputSkills = skillsInput.split(",").map(s => s.trim()).filter(Boolean).sort();

        const skillsChanged = currentSkills.length !== inputSkills.length ||
        !currentSkills.every((s, i) => s === inputSkills[i]);
        return (
       Number(newSalary) === Number(salary) &&
        newLocation === location &&
        newDepartment === department &&
        !skillsChanged
        );
    };

    return (
        <div className={styles.personCard}>
            <div className={styles.personCardHeader}>
            <h2>{name}</h2>
            <p>{title}</p>
            <p>📱 {phone}</p>
            <p>📧 {email}</p>
            <p className={styles.favAnimal}>{getAnimalEmoji(animal)}</p>
            <p>{startDate} ~ ({yearsWorked.toFixed(1)} years)</p>
           <div className={styles.reminders}>
            {getReminders()}
            </div>
            </div>
            <div className={styles.personCardContent}>
                {isEditing ? (
                    <input ref={salaryInputRef} type="number" value={newSalary} 
                    onChange={(e) => setNewSalary(e.target.value)} 
                    onWheel={e => e.target.blur()}/>
                ) : (
                    <p>💰 {salary}€</p>
                )}
                {isEditing ? (
                    <input type="text" value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)} />
                ) : (
                    <p>📍 {location}</p>
                )}
                {isEditing ? (
                    <input type="text" value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)} />
                ) : (
                    <p>🏢 {department}</p>
                )}
                {isEditing ? (
                    <input type="text" value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
        />
                ) : (
                    <p>🛠️ {skills.join(", ")}</p>
                )}
            </div>
            <div className={styles.personCardFooter}>
            {isEditing ? (
                <>
                <button onClick={handleSave} disabled={isSaveDisabled()}>
                    Save</button>
                <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <button className={styles.secondary} onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            )}
            {message && <p className={styles.confirmation}>{message}</p>}
        </div>
    </div>
    );
};

export default PersonCard;