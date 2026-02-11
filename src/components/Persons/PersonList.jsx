import PersonCard from './PersonCard';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const PersonList = ({personsData}) => {
    console.log("personsData:", personsData);
    return (
        <>
        <div className="boxes">
            {personsData.map(person => 
                <PersonCard key={person.id} {...person}/>
                )}
            </div>
        </>    
    )
}

export default PersonList;