import styles from "./About.module.css";

const About = () => {
    return (
        <>
        <h1>React HR Application</h1>
        <div className={styles.aboutContainer}>
            <p>
                This simple React HR application was built as a task from React basics course at REACT25K Full Stack Web Developer Program, Business College Helsinki. It allows you to manage employee data, including adding and updating employee information. The application uses external APIs for data storage and retrieval.
            </p>

            <h2>Features Included</h2>

            <h3>Employee List</h3>
            <ul>
                <li>Fetch employee data from a local JSON server</li>
                <li>Show the person's favorite animal as an emoji</li>
                <li>Display conditional reminders by calculating work years</li>
                <li>Edit employee information</li>
                <li>Add new employees through a form</li>
            </ul>

            <h3>Navigation</h3>
            <ul>
                <li>React Router-based page navigation</li>
            </ul>

            <h2>Technologies Used</h2>
            <ul>
                <li>React (with a custom hook: useAxios)</li>
                <li>React Router</li>
                <li>JSON Server (local backend for employees)</li>
                <li>Basic CSS and CSS Modules</li>
            </ul>
        </div>
        </>
    );
};

export default About;