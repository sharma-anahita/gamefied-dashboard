import '../styles/dashboard.css';
import MOCK_USER from '../utils/user.js'

function Streak(){
    return (
        <>
        <p>Streak :{MOCK_USER.streak}</p>
        </>
    );
}

export default Streak;