import React, { useEffect, useState } from 'react';
import './App.css';
import RockPaperScissors from './features/RockPaperScissors';
import ReactModal from 'react-modal';
import { IoClose } from "react-icons/io5";
import { ReactComponent as Rules1 } from './assets/images/image-rules.svg';
import { ReactComponent as Rules2 } from './assets/images/image-rules-bonus.svg';
import RockPaperScissorsV2 from './features/RockPaperScissorsV2';


function App() {
  const [openModal, setopenModal] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)
  const [gameDrew, setGameDrew] = useState(false)
  const [update, setUpdate] = useState(false)
  const [toggleGameV, settoggleGameV] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('toggleGame') == 'true') {
      settoggleGameV(true)
    }else {
      settoggleGameV(false)
    }

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

    if (localStorage.getItem('gameDrew') == 'true') {
      setGameDrew(true)
    }else {
      setGameDrew(false)
    }
}, [update])

  const handleModalToggle = () => {

    if (openModal) {
      setopenModal(false)
    } else {
      setopenModal(true)
    }
  }

  const handleGameToggle = () => {
    localStorage.removeItem('gameWon')
    localStorage.removeItem('gameLost')
    localStorage.removeItem('gameDrew')
    localStorage.removeItem('score')
    localStorage.removeItem('computerChoice')
    localStorage.removeItem('playerChoice')
    setGameDrew(false)
    setGameLost(false)
    setGameWon(false)

    if (toggleGameV) {
      localStorage.setItem('toggleGame', "false")
      settoggleGameV(false)
      setUpdate(true)

    } else {
      localStorage.setItem('toggleGame', "true")
      settoggleGameV(true)
      setUpdate(false)
    }

  }

  

  return (
    <div className="App">
      <ReactModal
        isOpen={openModal}
        style={
          { overlay: {zIndex:'200', background:'rgba(0, 0, 0, 0.505'}, 
          content: {width:'370px', height: 'fit-content', top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)', 
          borderRadius:'10px',
       } }
        }
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        preventScroll={true}
        ariaHideApp={false}
      >
        <div className='modal-contnr'>
          <div className="modal-contnr-2">
            <p>RULES</p>
            <div className='close-btn-1' onClick={handleModalToggle}>
              <IoClose/>
            </div>
          </div>
          <div className="modal-contnr-3">
            {toggleGameV ? <Rules1/> : <Rules2/>}
          </div>
          <div className='close-btn-2' onClick={handleModalToggle}>
              <IoClose/>
            </div>
        </div>
      </ReactModal>
      {toggleGameV 
      ? 
      <RockPaperScissors handleModalToggle={handleModalToggle} handleGameToggle={handleGameToggle} gameWon={gameWon} setGameWon={setGameWon} gameLost={gameLost} setGameLost={setGameLost} update={update} setUpdate={setUpdate} gameDrew={gameDrew} setGameDrew={setGameDrew} />
      :
      <RockPaperScissorsV2 handleModalToggle={handleModalToggle} handleGameToggle={handleGameToggle} gameWon={gameWon} setGameWon={setGameWon} gameLost={gameLost} setGameLost={setGameLost} update={update} setUpdate={setUpdate} gameDrew={gameDrew} setGameDrew={setGameDrew} />}


    </div>
  );
}

export default App;
