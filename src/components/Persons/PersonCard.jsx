import './Persons.css';

const PersonCard = (props) => {
    const start = new Date(props.startDate);
    const today = new Date();

    let yearsWorked = today.getFullYear() - start.getFullYear();
    const noAnniversaryYet =
        today.getMonth() < start.getMonth() ||
        (today.getMonth() === start.getMonth() && today.getDate() < start.getDate());

    if (noAnniversaryYet) {
        yearsWorked -= 1;
    }

    const monthsWorked = (today.getFullYear() - start.getFullYear()) * 12 + (today.getMonth() - start.getMonth());
    const isProbation = monthsWorked < 6;
    const isAnniversary = yearsWorked > 0 && yearsWorked % 5 === 0;

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
            parrot: "🦜",
            owl: "🦉",
            chicken: "🐔",
            leopard: "🐆",
            eagle: "🦅",
            penguin: "🐧"
        };

        return map[animal?.toLowerCase()] || animal;
    };

    return (
        <div className="personCard">
            <p>Name: {props.name}</p>
            <p>Title: {props.title}</p>
            <p>Salary: {props.salary}</p>
            <p>Phone: {props.phone}</p>
            <p>Email: {props.email}</p>
            <p>Animal: {getAnimalEmoji(props.animal)}</p>
            <p>Start Date: {props.startDate}</p>
            {isAnniversary && (
                <p>🎉 Schedule recognition meeting.</p>
            )}
            {isProbation && (
                <p>🔔 Schedule probation review.</p>
            )}
            <p>Location: {props.location}</p>
            <p>Department: {props.department}</p>
            <p>Skills: {props.skills.join(", ")}</p>
        </div>
    )
}

export default PersonCard;