import './RockPaperScissorsV2.css'

import { ReactComponent as Logo } from '../assets/images/logo-bonus.svg';
import { ReactComponent as BGPentagon } from '../assets/images/bg-pentagon.svg'
import { ReactComponent as Paper } from '../assets/images/icon-paper.svg';
import { ReactComponent as Scissors } from '../assets/images/icon-scissors.svg';
import { ReactComponent as Rock } from '../assets/images/icon-rock.svg';
import { ReactComponent as Lizard } from '../assets/images/icon-lizard.svg';
import { ReactComponent as Spock } from '../assets/images/icon-spock.svg';



const RockPaperScissorsV2 = (props:any) => {
    const {handleModalToggle, handleGameToggle, gameWon, setGameWon, gameLost, setGameLost, update, setUpdate} = props

    let playerChoice = localStorage.getItem('playerChoice')
    let computerChoice = localStorage.getItem('computerChoice')
    let score  =  0 
    let storedScore = parseInt(localStorage.getItem('score') || '');

    // change score to the local stored scores
    if (storedScore) {
        score = storedScore
    }

    const handleGame2 = (btn: any) => {

        // computer choice 0 - 0.19 is lizard, 0.2 - 0.39 is paper, 0.4 - 0.59 is spock, 0.6-0.79 is rock, 0.8-0.99 is scissors
        let computerChoiceNumber  = Math.random();
        console.log(computerChoiceNumber)
        
        if (btn == 1 && computerChoiceNumber >= 0.4 && computerChoiceNumber <= 0.79 ) {
            localStorage.setItem('gameWon', 'true')
            score++
            localStorage.setItem('score', JSON.stringify(score))
            localStorage.setItem('playerChoice', 'Paper' )
            if (computerChoiceNumber <= 0.59) {
                localStorage.setItem('computerChoice', 'Spock')
            } else {
                localStorage.setItem('computerChoice', 'Rock')
            }
        }else if (btn == 2 && computerChoiceNumber >= 0.6 && computerChoiceNumber <= 0.99 ) {
            localStorage.setItem('gameWon', 'true')
            score++
            localStorage.setItem('score', JSON.stringify(score))
            localStorage.setItem('playerChoice', 'Spock' )
            if (computerChoiceNumber <= 0.79) {
                localStorage.setItem('computerChoice', 'Rock')
            } else {
                localStorage.setItem('computerChoice', 'Scissors')
            }
        }else if (btn == 3 && computerChoiceNumber >= 0 && computerChoiceNumber <= 0.39) {
            localStorage.setItem('gameWon', 'true')
            score++
            localStorage.setItem('score', JSON.stringify(score))
            localStorage.setItem('playerChoice', 'Scissors' )
            if (computerChoiceNumber <= 0.19) {
                localStorage.setItem('computerChoice', 'Lizard')
            } else {
                localStorage.setItem('computerChoice', 'Paper')
            }
        }else if (btn == 4 && computerChoiceNumber >= 0.2 && computerChoiceNumber <= 0.59) {
            localStorage.setItem('gameWon', 'true')
            score++
            localStorage.setItem('score', JSON.stringify(score))
            localStorage.setItem('playerChoice', 'Lizard' )
            if (computerChoiceNumber <= 0.39) {
                localStorage.setItem('computerChoice', 'Paper')
            } else {
                localStorage.setItem('computerChoice', 'Spock')
            }
        }else if (btn == 5 && computerChoiceNumber <= 0.19 && computerChoiceNumber >= 0.8) {
            localStorage.setItem('gameWon', 'true')
            score++
            localStorage.setItem('score', JSON.stringify(score))
            localStorage.setItem('playerChoice', 'Rock' )
            if (computerChoiceNumber <= 0.19) {
                localStorage.setItem('computerChoice', 'Lizard')
            } else {
                localStorage.setItem('computerChoice', 'Scissors')
            }
        }else {
            if (btn == 1){
                localStorage.setItem('gameLost', 'true')
                if (computerChoiceNumber <= 0.19) {
                    localStorage.setItem('computerChoice', 'Lizard')
                } else {
                    localStorage.setItem('computerChoice', 'Scissors')
                }
            }else if (btn == 2) {
                localStorage.setItem('gameLost','true')
                if (computerChoiceNumber <= 0.19) {
                    localStorage.setItem('computerChoice', 'Lizard')
                } else {
                    localStorage.setItem('computerChoice', 'Paper')
                }
            }else if (btn == 3) {
                localStorage.setItem('gameLost', 'true')
                localStorage.setItem('playerChoice', 'Scissors' )
                if (computerChoiceNumber <= 0.59) {
                    localStorage.setItem('computerChoice', 'Spock')
                } else {
                    localStorage.setItem('computerChoice', 'Rock')
                }
            }else if (btn == 4) {
                localStorage.setItem('gameLost', 'true')
                localStorage.setItem('playerChoice', 'Lizard' )
                if (computerChoiceNumber <= 0.79) {
                    localStorage.setItem('computerChoice', 'Rock')
                } else {
                    localStorage.setItem('computerChoice', 'Scissors')
                }
            }else if (btn == 5) {
                localStorage.setItem('gameLost', 'true')
                localStorage.setItem('playerChoice', 'Rock' )
                if (computerChoiceNumber <= 0.39) {
                    localStorage.setItem('computerChoice', 'Paper')
                } else {
                    localStorage.setItem('computerChoice', 'Spock')
                }
            }
        }

        if (update) {
            setUpdate(false)
        }else{
            setUpdate(true)
        }
    }

    

    const handlePlayAgain = () => {
        localStorage.setItem('gameWon', 'false')
        localStorage.setItem('gameLost', 'false')
        if (update) {
            setUpdate(false)
        } else{
            setUpdate(true)
        }
    }
    

    const handleGameReset = () => { 
        localStorage.removeItem('gameWon')
        localStorage.removeItem('gameLost')
        localStorage.removeItem('score')
        score = 0
        setGameLost(false)
        setGameWon(false)
        if (update) {
            setUpdate(false)
        } else{
            setUpdate(true)
        }
    }
    
    return (
    <div className='rpssl-container'>
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
        {gameWon || gameLost ? 
        <div className='game-result'>
            <div className="game-result-1">
                <div className="game-result-2">
                    <p>YOU PICKED</p>
                    <div className={playerChoice == 'Paper' && !gameWon ? "paper result" : playerChoice == 'Rock' && !gameWon ? "rock result" : playerChoice == "Scissors" && !gameWon ? "scissors result": playerChoice == "Spock" && !gameWon ? "spock result":playerChoice == "Lizard" && !gameWon ? "lizard result" : playerChoice == 'Paper' && gameWon ? "paper result rings" : playerChoice == 'Rock' && gameWon ? "rock result rings" : playerChoice == "Scissors" && gameWon ? "scissors result rings":playerChoice == "Spock" && gameWon ? "spock result rings" : ''}>
                        <div className={gameWon ? "white-inner":playerChoice == "Lizard" && gameWon ? "lizard result rings" : "white-inner"}>
                            {playerChoice == 'Paper' ? <Paper/> : playerChoice == 'Rock' ? <Rock/> : playerChoice == 'Scissors' ? <Scissors/> :playerChoice == 'Spock' ? <Spock/>:playerChoice == 'Lizard' ? <Lizard/>  : '' }
                        </div>
                    </div>
                </div>

                <div className="play-again-btn pa-btn-1">
                    {gameWon ? <p>YOU WIN</p> : gameLost ? <p>YOU LOSE</p> : ''}
                    <button onClick={handlePlayAgain}>
                        PLAY AGAIN
                    </button>
                </div>

                <div className="game-result-2">
                    <p>THE HOUSE PICKED</p>
                    <div className={computerChoice == 'Paper' && !gameLost ? "paper result" : computerChoice == 'Rock' && !gameLost ? "rock result" : computerChoice == "Scissors" && !gameLost ? "scissors result" : computerChoice == 'Spock' && !gameLost ? "spock result" :computerChoice == 'Lizard' && !gameLost ? "lizard result" : computerChoice == 'Paper' && gameLost ? "paper result rings" : computerChoice == 'Rock' && gameLost ? "rock result rings" : computerChoice == "Scissors" && gameLost ? "scissors result rings": computerChoice == "Spock" && gameLost ? "spock result rings":computerChoice == "Lizard" && gameLost ? "lizard result rings" :  ''}>
                        <div className={gameLost ? "white-inner" : "white-inner" }>
                        {computerChoice == 'Paper' ? <Paper/>:computerChoice == 'Spock' ? <Spock/>:computerChoice == 'Lizard' ? <Lizard/> : computerChoice == 'Rock' ? <Rock/> : computerChoice == 'Scissors' ? <Scissors/> : '' }
                        </div>
                    </div>
                </div>  
            </div>

            <div className="play-again-btn pa-btn-2">
                    {gameWon ? <p>YOU WIN</p> : gameLost ? <p>YOU LOSE</p> : ''}
                    <button onClick={handlePlayAgain}>
                        PLAY AGAIN
                    </button>
            </div>
            
        </div> 
        :
        <div className="rpssl-2">
            <div className="rpssl-2-a">
                <div className="pentagon">
                    <BGPentagon/>
                </div>
                <div className="paper-contnr">
                    <div onClick={() => handleGame2(1)} className="paper rpssl-btn v2-paper">
                        <div className="white-inner-a">
                            <Paper/>
                        </div>
                    </div>
                </div>
                <div className="spock-scissors">
                    <div onClick={() => handleGame2(2)} className="spock rpssl-btn">
                        <div className="white-inner-a">
                            <Spock/>
                        </div>
                    </div>
                    <div onClick={() => handleGame2(3)} className="scissors rpssl-btn">
                        <div className="white-inner-a">
                            <Scissors/>
                        </div>
                    </div>
                </div>
                <div className="rock-lizard">
                    <div onClick={() => handleGame2(4)} className="lizard rpssl-btn">
                        <div className="white-inner-a">
                            <Lizard/>
                        </div>
                    </div>
                    <div onClick={() => handleGame2(5)} className="rock rpssl-btn">
                        <div className="white-inner-a">
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

export default RockPaperScissorsV2