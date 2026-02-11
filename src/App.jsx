import React, {useState} from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import {persons} from "./data/personsData";
import './App.css';
import Root from './pages/Root';
import About from './pages/About';
import PersonList from './components/Persons/PersonList';
import AddEmployee from './pages/AddEmployee';

const App = () => {
  const [personsData, setPersonsData] = useState(persons);

  const addEmployeeHandler = (newPerson) => {
    setPersonsData((prev) => [...prev, {...newPerson, id: Date.now()},]);
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
        <Route index element={<PersonList personsData={personsData} setPersonsData={setPersonsData}/>}/>
        <Route path="about" element={<About />} />
        <Route path="persons" element={<PersonList personsData={personsData} setPersonsData={setPersonsData} />} />
        <Route path="add" element={<AddEmployee onAddEmployee={addEmployeeHandler} />} />
        </Route></Routes></BrowserRouter>
  );
};

export default App;
