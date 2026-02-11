import PersonCard from '../../components/Persons/PersonCard';
import styles from "./PersonList.module.css";

const PersonList = ({
    personsData,
    onUpdate
}) => {
  
    if (!Array.isArray(personsData)) {
        return <p style={{ color: "red" }}>❌ Error: personsData is not an array</p>;
    }
    
    return (     
        <div className={styles.container}>
            <h1>Employee list</h1>
             <div className={styles.personsGrid}>
            {personsData.map(person => {

                return <PersonCard key={person.id} 
                {...person} 
                onUpdate={onUpdate} />
            } )}
            </div>
        </div>
    );
};

export default PersonList;