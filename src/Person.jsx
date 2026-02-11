const Person = (props) => {
    return (
        <div className="box">
            <p>Name: <span class="info">{props.name}</span></p>
            <p>Title: <span class="info">{props.title}</span></p>
            <p>Salary: <span class="info">{props.salary}</span></p>
            <p>Phone: <span class="info">{props.phone}</span></p>
            <p>Email: <span class="info">{props.email}</span></p>
            <p>Animal: <span class="info">{props.animal}</span></p>
        </div>
    )
}

export default Person;