// import {isAuth, setIsAuth} from './MyContext';
import axios from "axios";

let isValid = false;

export async function VerifyLogin(userId, passWord) {
    // const [isValid, setIsValid] = useState(false); // Corrected: Initialize state with false
    const postData = {
        userId,
        passWord,
    };
    try {
        const response = await axios.post(`https://affable-alpha-404519.wl.r.appspot.com/checkLogin`, postData)
        // .then(response => isValid = response.data);
        isValid = response.data;
    } catch (error) {
        console.error('Error posting data:', error);
    }
    return true;
    // if (!isValid) {
    //     alert('Authentication attempt has failed, likely due to invalid credentials. Please verify and try again.');
    // }
}

// export default verifyLogin;