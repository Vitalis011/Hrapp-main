import PersonCard from '../../components/Persons/PersonCard';

const PersonList = ({
    personsData,
    onUpdate
}) => {
    
    return (
        
        <div className="boxes">
            {personsData.map(person => (
                <PersonCard key={person.id} 
                {...person} 
                onUpdate={onUpdate} />
               ) )}
            </div>
   
    );
};

export default PersonList;