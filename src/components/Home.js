import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import your CSS file

const Home = () => {
    const navigate = useNavigate();

    const handleStartTracking = () => {
        navigate('/exercise');
    };

    return (
        <div className="home-container">
            <h1>Fitness Tracker</h1>
            <p className="text">
                Tracking your workouts is essential for measuring progress, setting
                goals, and staying motivated. By logging your exercises, you can
                better understand your strengths and weaknesses, adjust your training
                plans, and see tangible results over time. Start tracking today for
                a healthier, fitter you!
            </p><br />
                <button
                    className="button"
                    onClick={handleStartTracking}>
                    Start Tracking Workouts
                </button>
        </div>
    );
};

export default Home;
