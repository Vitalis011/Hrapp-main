import axios from 'axios';
import {useEffect, useState} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import PersonList from './components/Persons/PersonList';
import About from './pages/About';
import AddEmployee from './pages/AddEmployee';
import Root from './pages/Root';

const App = () => {
  const [personsData, setPersonsData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/employees").then((res) => {
      setPersonsData(res.data);
    });
  }, []);

  const addEmployeeHandler = (newPerson) => {
    setPersonsData((prev) => [...prev, {...newPerson, id: Date.now()},]);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <PersonList personsData={personsData} setPersonsData={setPersonsData} />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "add",
          element: <AddEmployee onAddEmployee={addEmployeeHandler} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
