import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Exercises from './components/Exercises';
import ExerciseList from './components/ExerciseList';
import WorkoutList from './components/WorkoutList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [muscleGroups, setMuscleGroups] = useState({});

  useEffect(() => {
    axios.get('https://fitness-tracker-backend-five.vercel.app/api/v1/fitness/muscleGroups')
      .then(response => {
        setMuscleGroups(response.data);
      })
  }, []);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise" element={<Exercises muscleGroups={muscleGroups} />} />
          <Route path="/exercises/:groupName" element={<ExerciseList muscleGroups={muscleGroups} />} />
          <Route path="/workoutlist" element={<WorkoutList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
