import './styles/App.css';
import './styles/wheel.css'
import './styles/wheel-background.css'
import './styles/text-board.css'
import {useEffect, useState} from "react";
import './styles/welcome-page.css'
import {getRandomPhrase} from "./GetRandomPhrase";
import {getHiddenPhrase, judgeGuess} from "./PhraseProcess";
import {welcome} from "./WelcomePage";

function App() {

    const [start, setStart] = useState(false);
    const [guess, setGuess] = useState('');
    const [chances, setChances] = useState(15);
    const [phrase, setPhrase] = useState('');
    const [upperPhrase, setUpperPhrase] = useState('');
    const [hiddenPhrase, setHiddenPhrase] = useState('');
    const [cntAsterisk, setCntAsterisk] = useState(0);
    const [prevGuess, setPrevGuess] = useState(new Array(chances).fill(''));
    // const [count, setCount] = useState(0);
    const [missNum, setMissNum] = useState(0);
    const phraseList = ['He', 'She'];

    useEffect(() => {
        if (start) {
            initPhrase();
        }
    }, [start]);

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
            setStart(false);
        }

        if (chance === 0) {
            alert('Game over! You lost!\r\n' + 'The original phrase: ' + phrase)
            console.log("Game over! You lost!");
            console.log("The original phrase: " + phrase);
            setStart(false);
        }
    }

    function mainPage() {
        return (
            <>
                <div className="App">
                    {/*<img className='spin-back' src='/spin-background.jpg' alt='background'/>*/}
                    {/*<img className='spin-back' src='/New-York.jpg' alt='background'/>*/}
                    <img className='spin-back' src='/Las-Vegas.jpg' alt='background'/>
                    <div className='spin-crop'>
                        <img className='spin-picture' src='/spin.jpg' alt='This is spin image'/>
                    </div>
                </div>
                <div className='text-board'>
                    <h4 style={{marginBottom: '0'}}>Hidden Phrase</h4><br/>
                    {hiddenPhrase}<br/>
                    <form onSubmit={processGuess}>
                        <h4 style={{margin: "0"}}>Take A Guess</h4><br/>
                        <input className='letter-input' type='text' value={guess} onChange=
                            {(event) => setGuess((event.target.value).toUpperCase())}/><br/><br/>
                        <button className='submit-btn' type='submit'>Submit</button>
                    </form>
                </div>
            </>
        );
    }

    function initPhrase() {
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
    }

    if (!start) {
        return welcome(setStart) ;
    } else {
        return mainPage();
    }
}

export default App;