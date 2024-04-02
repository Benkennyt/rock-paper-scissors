import './RockPaperScissors.css';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { ReactComponent as BGTriangle } from '../assets/images/bg-triangle.svg'
import { ReactComponent as Paper } from '../assets/images/icon-paper.svg';
import { ReactComponent as Scissors } from '../assets/images/icon-scissors.svg';
import { ReactComponent as Rock } from '../assets/images/icon-rock.svg';
import { useEffect, useState } from 'react';

const RockPaperScissors = () => {
    const [score, setScore] = useState(0)
    const [computerChoice, setComputerChoice] = useState('')
    const [playerChoice, setPlayerChoice] = useState('')
    const [gameWon, setGameWon] = useState(false)
    const [gameLost, setGameLost] = useState(false)
    const [reload, setReload] = useState(0)
    let totalScore = localStorage.getItem('score')
  
    useEffect(() => {
        if (localStorage.getItem('gameWon') == 'true') {
            setGameWon(true)
        }else {
            setGameWon(false)
        }

        if (localStorage.getItem('gameLost') == 'true') {
            setGameLost(true)
        }else {
            setGameLost(false)
        }
        
    }, [reload])
    

    const handleGame = (btn: any) => {

        // computer choice 0 - 0.33 is rock, 0.34 - 0.66 is paper, and 0.67 - 0.99 is scissors
        let computerChoiceNumber  = Math.random();
        console.log(computerChoiceNumber)
        
        if (btn == 1 && computerChoiceNumber <= 0.33 ) {
            localStorage.setItem('gameWon', 'true')
            setScore(score + 1)
            localStorage.setItem('score', JSON.stringify(score))
            setPlayerChoice('Paper')
            setComputerChoice('Rock')
            setReload(reload + 1)
        }else if (btn == 2 && computerChoiceNumber >= 0.34 && computerChoiceNumber <= 0.66 ) {
            localStorage.setItem('gameWon', 'true')
            setScore(score + 1)
            localStorage.setItem('score', JSON.stringify(score))
            setPlayerChoice('Scissors')
            setComputerChoice('Paper')
            setReload(reload + 1)
        }else if (btn == 3 && computerChoiceNumber >= 0.67 && computerChoiceNumber <= 0.99) {
            localStorage.setItem('gameWon', 'true')
            setScore(score + 1)
            localStorage.setItem('score', JSON.stringify(score))
            setPlayerChoice('Rock')
            setComputerChoice('Scissors')
            setReload(reload + 1)
        }else {
            if (btn == 3){
                localStorage.setItem('gameLost', 'true')
                setPlayerChoice('Rock')
                setComputerChoice('Paper')
                setReload(reload + 1)
            }else if (btn == 2) {
                localStorage.setItem('gameLost','true')
                setPlayerChoice('Scissors')
                setComputerChoice('Rock')
                setReload(reload + 1)
            }else if (btn == 1) {
                localStorage.setItem('gameLost', 'true')
                setPlayerChoice('Paper')
                setComputerChoice('Scissors')
                setReload(reload + 1)
            }
        }
    }

    

    const handlePlayAgain = () => {
        localStorage.setItem('gameWon', 'false')
        localStorage.setItem('gameLost', 'false')
        setReload(0)
    }

    console.log(`won ${gameWon}`)
    console.log(`lost ${gameLost}`)
    console.log(computerChoice)
    console.log(playerChoice)

    
    return (
    <div className='rps-container'>
        <div className="rps-1">
                <Logo/>
            <div className="rps-score">
                <p>SCORE</p>
                <p>{totalScore}</p>
            </div>
        </div>
        {gameWon || gameLost ? 
        <div className='game-result'>
            <div className="game-result-1">
                <div className="game-result-2">
                    <p>YOU PICKED</p>
                    <div className={playerChoice == 'Paper' && !gameWon ? "paper result" : playerChoice == 'Rock' && !gameWon ? "rock result" : playerChoice == "Scissors" && !gameWon ? "scissors result" : playerChoice == 'Paper' && gameWon ? "paper result rings" : playerChoice == 'Rock' && gameWon ? "rock result rings" : playerChoice == "Scissors" && gameWon ? "scissors result rings" : ''}>
                        <div className={gameWon ? "white-inner" : "white-inner"}>
                            {playerChoice == 'Paper' ? <Paper/> : playerChoice == 'Rock' ? <Rock/> : playerChoice == 'Scissors' ? <Scissors/> : '' }
                        </div>
                    </div>
                </div>

                <div className="play-again-btn">
                    {gameWon ? <p>YOU WIN</p> : gameLost ? <p>YOU LOSE</p> : ''}
                    <button onClick={handlePlayAgain}>
                        PLAY AGAIN
                    </button>
                </div>

                <div className="game-result-2">
                    <p>THE HOUSE PICKED</p>
                    <div className={computerChoice == 'Paper' && !gameLost ? "paper result" : computerChoice == 'Rock' && !gameLost ? "rock result" : computerChoice == "Scissors" && !gameLost ? "scissors result" : computerChoice == 'Paper' && gameLost ? "paper result rings" : computerChoice == 'Rock' && gameLost ? "rock result rings" : computerChoice == "Scissors" && gameLost ? "scissors result rings" :  ''}>
                        <div className={gameLost ? "white-inner" : "white-inner" }>
                        {computerChoice == 'Paper' ? <Paper/> : computerChoice == 'Rock' ? <Rock/> : computerChoice == 'Scissors' ? <Scissors/> : '' }
                        </div>
                    </div>
                </div>  

            </div>
        </div> 
        :
        <div className="rps-2">
            <div className="triangle">
                <BGTriangle/>
            </div>
            <div className="paper-scissors">
                <div onClick={() => handleGame(1)} className="paper rps-btn">
                    <div className="white-inner">
                        <Paper/>
                    </div>
                </div>
                <div onClick={() => handleGame(2)} className="scissors rps-btn">
                    <div className="white-inner">
                        <Scissors/>
                    </div>
                </div>
            </div>
            <div className="rock-contnr">
                <div onClick={() => handleGame(3)} className="rock rps-btn">
                    <div className="white-inner">
                        <Rock/>
                    </div>
                </div>
            </div>
        </div>}
        <div className="rules-btn">
            <button>
                RULES
            </button>
        </div>
    </div>
  )
}

export default RockPaperScissors