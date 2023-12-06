import React, {useEffect, useState} from "react";
import {VerifyLogin} from "./Auth.js"
import {getRandomPhrase} from "./GetRandomPhrase.js";
import {getHiddenPhrase, judgeGuess} from "./PhraseProcess.js";
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithRedirect} from "firebase/auth";
import './styles/App.css';
import './styles/welcome-page.css'
import './styles/wheel.css'
import './styles/wheel-background.css'
import './styles/text-board.css'
import './styles/login.css'
import './styles/Start.css'
import axios from "axios";
import {Button, createTheme, ThemeProvider} from "@mui/material";
import {purple} from "@mui/material/colors";

function App() {

    const initialChances = 15;
    const [start, setStart] = useState(false);
    const [guess, setGuess] = useState('');
    const [chances, setChances] = useState(initialChances);
    const [phrase, setPhrase] = useState('');
    const [upperPhrase, setUpperPhrase] = useState('');
    const [hiddenPhrase, setHiddenPhrase] = useState('');
    const [cntAsterisk, setCntAsterisk] = useState(0);
    const [prevGuess, setPrevGuess] = useState(new Array(chances).fill(''));
    const [handle, setHandle] = useState('');
    const [userDisplayName, setUserDisplayName] = useState('');
    // const [count, setCount] = useState(0);
    const [missNum, setMissNum] = useState(0);
    const [userId, setUserId] = useState('');
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const phraseList = ['Hello World', 'The world is your oyster'];
    // const phraseList = ['aa', 'ss'];
    const apiURL = '';

    const theme = createTheme({
        palette: {
            primary:{
                main: '#1565c0',
            },
            secondary: purple,
        },
    });

    // const [isAuth, setIsAuth] = useState(false);

    // useEffect(() => {
    //     if (userId) {
    //         if (!start) {
    //             setStart(true);
    //         }
    //     }
    // }, [userId]);

    useEffect(() => {
        if (start) {
            init();
        }
    }, [start])

    const firebaseConfig = {
        apiKey: "AIzaSyCZvC4T3r288EqrCH9va7beTD_WAGxWp7U",
        authDomain: "springbookstore-e69b6.firebaseapp.com",
        projectId: "springbookstore-e69b6",
        storageBucket: "springbookstore-e69b6.appspot.com",
        messagingSenderId: "95323661066",
        appId: "1:95323661066:web:20e9f105818921f1e110f3",
        measurementId: "G-PJ0H671XLT"
    };

    initializeApp(firebaseConfig);

    const auth = getAuth();
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                console.log("User is signed in:", user);
                setUserId(user.uid);
                setUserDisplayName(user.displayName);
            } else {
                // No user is signed in.
                console.log("No user is signed in.");
            }
        });
    }, [])

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithRedirect(auth, provider)
            .then((result) => {
                // User signed in
                console.log(result.user);
            }).catch((error) => {
            // Handle Errors here.
            console.error(error);
        });
    };


    function init() {
        let randomPhrase = getRandomPhrase(phraseList);
        setPhrase(randomPhrase);
        // Attention: useState set*** function update state asynchronously
        let upperCase = randomPhrase.toUpperCase();
        setUpperPhrase(upperCase);
        let result = getHiddenPhrase(upperCase);
        setHiddenPhrase(result[0]);
        setCntAsterisk(result[1]);
        setChances(15);
        setPrevGuess(new Array(chances).fill(''));
        setScore(0);
    }

    // let prevMisses = [];
    //
    // let cntAsterisk = hiddenPhrase.length;
    //
    // let guess = '';
    // let chances = 15;
    // let phrase = '';
    // let upperPhrase = '';
    // let hiddenPhrase = '';
    // let cntAsterisk = '';
    // let prevGuess = new Array(chances).fill('');
    // let count = 0;
    // let missNum = 0;
    const processGuess = (event) => {
        event.preventDefault();
        let result = judgeGuess(guess, chances);
        if (!result) {
            setGuess('');
            return;
        }
        if (prevGuess.includes(guess)) {
            alert("Repeated input! Your current guess: " + guess + ". Chances: " + chances);
            setGuess('');
            return;
        }
        // prevGuess[count] = guess;
        prevGuess.push(guess);
        // setCount(count + 1);
        let copy = hiddenPhrase;
        let asterisk = cntAsterisk;
        let isMatch = false;
        let chance = chances - 1;
        setChances(chance);
        for (let j = 0; j < upperPhrase.length; j++) {
            if (upperPhrase[j] === guess) {
                copy = copy.substr(0, j) + phrase[j] + copy.substr(j + 1);
                asterisk -= 1;
                isMatch = true;
            }
        }
        if (!isMatch) {
            setMissNum(missNum + 1);
            alert("Doesn't match, your input: " + guess + "; Your chances left: " + chance);
        } else {
            setHiddenPhrase(copy);
            setCntAsterisk(asterisk);
        }
        setGuess('');
        if (asterisk === 0) {
            alert('Game over! You win!\r\n' + 'The original phrase: ' + phrase)
            console.log("Game over! You win!");
            console.log("The original phrase: " + phrase);
            setScore(chance + score);
            // setStart(false);
            setGameOver(true);
        }

        if (chance === 0) {
            alert('Game over! You lost!\r\n' + 'The original phrase: ' + phrase)
            console.log("Game over! You lost!");
            console.log("The original phrase: " + phrase);
            // setStart(false);
            setGameOver(true);
        }
    }

    const processHandle = (event) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
            setHandle(value);
        }
    }

    function mainPage() {
        return (
            <>
                {/*<WheelBackground/>*/}
                <div className="App">
                    {/*<img className='spin-back' src='/spin-background.jpg' alt='background'/>*/}
                    {/*<img className='spin-back' src='/New-York.jpg' alt='background'/>*/}
                    <img className='spin-back' src='/Las-Vegas.jpg' alt='background'/>
                    <div className='spin-crop'>
                        <img className='spin-picture' src='/spin.jpg' alt='This is spin image'/>
                    </div>
                </div>
                {start ?
                    (<div className='text-board'>
                        <h4>Hello {(handle === '') ? userDisplayName : handle}</h4>
                        {handle === '' ?
                            <HandleForm/>
                            :
                            (<>
                                {/*<ShowPlayInterface/>*/}
                                <div>
                                    <h4 style={{marginBottom: '0'}}>Hidden Phrase</h4><br/>
                                    {hiddenPhrase}<br/>
                                    <form onSubmit={processGuess}>
                                        <h4 style={{margin: "0"}}>Take A Guess</h4><br/>
                                        <input className='letter-input' type='text' value={guess} onChange=
                                            {(event) => setGuess((event.target.value).toUpperCase())}/><br/><br/>
                                        <button className='submit-btn' type='submit'>Submit</button>
                                    </form>
                                </div>
                                {gameOver ?
                                    (<ShowScore/>)
                                    :
                                    (<></>)
                                }
                            </>)
                        }
                    </div>)
                    :
                    (<div className='Start'>
                        <button className='Start-btn' onClick={event => setStart(true)}>Start Game</button>
                    </div>)
                }
            </>
        )
    }

    // function WheelBackground() {
    //     return (
    //         <div className="App">
    //             {/*<img className='spin-back' src='/spin-background.jpg' alt='background'/>*/}
    //             {/*<img className='spin-back' src='/New-York.jpg' alt='background'/>*/}
    //             <img className='spin-back' src='/Las-Vegas.jpg' alt='background'/>
    //             <div className='spin-crop'>
    //                 <img className='spin-picture' src='/spin.jpg' alt='This is spin image'/>
    //             </div>
    //         </div>
    //     )
    // }

    function HandleForm() {
        return (
            <form onSubmit={processHandle}>
                <input className='handle' placeholder='Set your handle' name='handle'></input>
                <button type='submit'>submit</button>
            </form>
        )
    }

    // function ShowPlayInterface() {
    //     return (
    //         <div>
    //             <h4 style={{marginBottom: '0'}}>Hidden Phrase</h4><br/>
    //             {hiddenPhrase}<br/>
    //             <form onSubmit={processGuess}>
    //                 <h4 style={{margin: "0"}}>Take A Guess</h4><br/>
    //                 <input className='letter-input' type='text' value={guess} onChange=
    //                     {(event) => setGuess((event.target.value).toUpperCase())}/><br/><br/>
    //                 <button className='submit-btn' type='submit'>Submit</button>
    //             </form>
    //         </div>
    //     )
    // }

    function ShowScore() {
        return (
            <form>
                <h4>Your Score: {score}</h4>
                <button type='submit' onClick={SaveScore}>save</button>
                <button type='submit' onClick={reset}>pass</button>
            </form>
        )
    }

    function reset() {
        setStart(false);
        setGameOver(false);
    }

    function SaveScore() {
        const data = {
            id: userId,
            handle: handle,
            score: score
        }
        console.log(
            data.score + "," + data.id + "," + data.handle
        );
        // try {
        //     const response = axios.post(apiURL + "saveRecord", data);
        //     console.log("Response:", response.data);
        //     getScores();
        // } catch (error) {
        //     console.error("Error posting data:", error);
        // }
        reset();
    }

    /**
     * Retrieve all score records data
     * @returns {Promise<void>}
     */
    async function getScores() {
        await axios
            .get(apiURL + "findAllGameRecords")
            .then((response) => {
                // setGameRecords(response.data); // Axios packs the response in a 'data' property
                // setLoading(false);
            })
            .catch((error) => {
                // setError(error.message);
                // setLoading(false);
            });
    }

    function SignIn() {
        return (
            // <div>
            //     <button onClick={signInWithGoogle}>Sign in with Google</button>
            // </div>
            <div>
                <img className='Google-icon' src='/picture/Google-icon.jpg' alt='google icon'/>
                <div className='Google-login'>
                    <ThemeProvider theme={theme}>
                        <Button className='Google-login-btn' variant="contained" color='primary' onClick={signInWithGoogle}>Sign in with Google</Button>
                    </ThemeProvider>
                </div>
            </div>
        );
    }

    // function LoginPage() {
    //     let userId = '';
    //     let password = '';
    //
    //     const handleLogin = (event) => {
    //         event.preventDefault(); // Prevent default form submission behavior
    //
    //         // Assuming VerifyLogin returns a boolean indicating authentication success
    //         setStart(VerifyLogin(userId, password)); // Corrected: set isAuth directly
    //     };
    //
    //     return (
    //         <>
    //             <div className='login-heading-div'>
    //                 {/*<img className='img' src='/picture/library.jpg' alt='This is an image'/>*/}
    //                 <h1 className='login-heading-h1'>Wheel Of Fortune</h1>
    //             </div>
    //             <div className='login'>
    //                 <form className='loginForm' onSubmit={handleLogin}>
    //                     <div className='headingDiv'>
    //                         <h3 className='loginHeading'>Sign in with your user name</h3><br/>
    //                     </div>
    //                     <div>
    //                         <input
    //                             className='login-input'
    //                             placeholder='User Name'
    //                             // value={userId}
    //                             type='text'
    //                             onChange={(event) => userId = (event.target.value)} // Corrected: onChange event
    //                         />
    //                     </div>
    //                     <br/>
    //                     <div>
    //                         <input
    //                             className='login-input'
    //                             placeholder='Password'
    //                             type='password'
    //                             onChange={(event) => password = (event.target.value)} // Corrected: onChange event
    //                         />
    //                     </div>
    //                     <br/>
    //                     <button className='signInBtn' type="submit">Sign In</button>
    //                 </form>
    //             </div>
    //         </>
    //     );
    // }

    if (!userId) {
        // return LoginPage();
        return <SignIn/>
    } else {
        return mainPage();
    }
}

export default App;