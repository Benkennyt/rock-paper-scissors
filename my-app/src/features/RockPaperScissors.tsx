import './RockPaperScissors.css';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { ReactComponent as BGTriangle } from '../assets/images/bg-triangle.svg'
import { ReactComponent as Paper } from '../assets/images/icon-paper.svg';
import { ReactComponent as Scissors } from '../assets/images/icon-scissors.svg';
import { ReactComponent as Rock } from '../assets/images/icon-rock.svg';
import { useEffect, useState } from 'react';

const RockPaperScissors = (props:any) => {
    const {handleModalToggle, handleGameToggle, gameWon, setGameWon, gameLost, setGameLost, update, setUpdate, gameDrew, setGameDrew} = props

    let playerChoice = localStorage.getItem('playerChoice')
    let computerChoice = localStorage.getItem('computerChoice')
    let score  =  0 
    let storedScore = parseInt(localStorage.getItem('score') || '');

    // change score to the local stored scores
    if (storedScore) {
        score = storedScore
    }

    const handleGame = (btn: any) => {

        // computer choice 0 - 0.33 is rock, 0.34 - 0.66 is paper, and 0.67 - 0.99 is scissors
        let computerChoiceNumber  = Math.random();
        console.log(computerChoiceNumber)
        
        // if player win
        if (btn == 1 && computerChoiceNumber <= 0.33 ) {
            localStorage.setItem('gameWon', 'true')
            score++
            localStorage.setItem('score', JSON.stringify(score))
            localStorage.setItem('playerChoice', 'Paper' )
            localStorage.setItem('computerChoice', 'Rock')
        }else if (btn == 2 && computerChoiceNumber >= 0.34 && computerChoiceNumber <= 0.66 ) {
            localStorage.setItem('gameWon', 'true')
            score++
            localStorage.setItem('score', JSON.stringify(score))
            localStorage.setItem('playerChoice', 'Scissors' )
            localStorage.setItem('computerChoice', 'Paper')
        }else if (btn == 3 && computerChoiceNumber >= 0.67 && computerChoiceNumber <= 0.99) {
            localStorage.setItem('gameWon', 'true')
            score++
            localStorage.setItem('score', JSON.stringify(score))
            localStorage.setItem('playerChoice', 'Rock' )
            localStorage.setItem('computerChoice', 'Scissors')
        }
        // if draw
        else if (btn == 1 && computerChoiceNumber >= 0.34 && computerChoiceNumber <= 0.66) {
            localStorage.setItem('gameDrew', 'true')
            localStorage.setItem('computerChoice', 'Paper')
            localStorage.setItem('playerChoice', 'Paper')
        }else if (btn == 2 && computerChoiceNumber >= 0.67 && computerChoiceNumber <= 0.99) {
            localStorage.setItem('gameDrew', 'true')
            localStorage.setItem('computerChoice', 'Scissors')
            localStorage.setItem('playerChoice', 'Scissors')
        }else if (btn == 3 && computerChoiceNumber >= 0 && computerChoiceNumber <= 0.33) {
            localStorage.setItem('gameDrew', 'true')
            localStorage.setItem('computerChoice', 'Rock')
            localStorage.setItem('playerChoice', 'Rock')
        }
        // if player lose
        else {
            if (btn == 3){
                localStorage.setItem('gameLost', 'true')
                localStorage.setItem('playerChoice', 'Rock' )
                localStorage.setItem('computerChoice', 'Paper')
            }else if (btn == 2) {
                localStorage.setItem('gameLost','true')
                localStorage.setItem('playerChoice', 'Scissors' )
                localStorage.setItem('computerChoice', 'Rock')
            }else if (btn == 1) {
                localStorage.setItem('gameLost', 'true')
                localStorage.setItem('playerChoice', 'Paper' )
                localStorage.setItem('computerChoice', 'Scissors')
            }
        }

        if (update) {
            setUpdate(false)
        } else{
            setUpdate(true)
        }
    }

    

    const handlePlayAgain = () => {
        localStorage.setItem('gameWon', 'false')
        localStorage.setItem('gameLost', 'false')
        localStorage.setItem('gameDrew', 'false')
        if (update) {
            setUpdate(false)
        } else{
            setUpdate(true)
        }
    }
    

    const handleGameReset = () => { 
        localStorage.removeItem('gameWon')
        localStorage.removeItem('gameLost')
        localStorage.removeItem('gameDrew')
        localStorage.removeItem('score')
        score = 0
        setGameLost(false)
        setGameWon(false)
        setGameDrew(false)
        if (update) {
            setUpdate(false)
        } else{
            setUpdate(true)
        }
    }
    
    return (
    <div className='rps-container'>
        <div className="reset-btn-1 reset-btn">
            <button onClick={handleGameReset}>
                RESET GAME
            </button>
        </div>
        
        <div className="rps-1">
                    <Logo/>
                <div className="rps-score">
                    <p>SCORE</p>
                    <p>{localStorage.getItem('score') || 0}</p>
                </div>
        </div>

        {gameWon || gameLost || gameDrew ? 
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

                <div className="play-again-btn pa-btn-1">
                    {gameWon ? <p>YOU WIN</p> : gameLost ? <p>YOU LOSE</p>: gameDrew ? <p>DRAW</p> : ''}
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

            <div className="play-again-btn pa-btn-2">
                {gameWon ? <p>YOU WIN</p> : gameLost ? <p>YOU LOSE</p>: gameDrew ? <p>DRAW</p> : ''}
                <button onClick={handlePlayAgain}>
                    PLAY AGAIN
                </button>
            </div>
        </div> 
        :
        <div className="rps-2">
            <div className="rps-2-a">
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
            </div>
            <div className="reset-btn-2 reset-btn">
                <button onClick={handleGameReset}>
                    RESET GAME
                </button>
            </div>
        </div>}

        <div className="rules-btn">
            <button className='switch-btn-1' onClick={handleGameToggle}>
                Switch Version
            </button>
            <button onClick={handleModalToggle}>
                RULES
            </button>
        </div>
    </div>
  )
}

export default RockPaperScissors