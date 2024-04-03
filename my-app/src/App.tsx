import React, { useEffect, useState } from 'react';
import './App.css';
import RockPaperScissors from './features/RockPaperScissors';
import ReactModal from 'react-modal';
import { IoClose } from "react-icons/io5";
import { ReactComponent as Rules1 } from './assets/images/image-rules.svg';
import RockPaperScissorsV2 from './features/RockPaperScissorsV2';


function App() {
  const [openModal, setopenModal] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)
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
}, [update])

  const handleModalToggle = () => {

    if (openModal) {
      setopenModal(false)
    } else {
      setopenModal(true)
    }
  }

  const handleGameToggle = () => {
    if (toggleGameV) {
      settoggleGameV(false)
      setUpdate(true)
      localStorage.removeItem('gameWon')
      localStorage.removeItem('gameLost')
      localStorage.removeItem('score')
      localStorage.setItem('toggleGame', "false")
      

    } else {
      settoggleGameV(true)
      localStorage.removeItem('gameWon')
      localStorage.removeItem('gameLost')
      localStorage.removeItem('score')
      localStorage.setItem('toggleGame', 'true')
      setUpdate(false)
    }
  }

  

  return (
    <div className="App">
      <ReactModal
        isOpen={openModal}
        style={
          { overlay: {zIndex:'200', background:'rgba(0, 0, 0, 0.505'}, 
          content: {width:'370px', height: '370px', top: '50%',
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
            <div onClick={handleModalToggle}>
              <IoClose/>
            </div>
          </div>
          <div className="modal-contnr-3">
            <Rules1/>
          </div>
        </div>
      </ReactModal>
      {toggleGameV 
      ? 
      <RockPaperScissors handleModalToggle={handleModalToggle} handleGameToggle={handleGameToggle} gameWon={gameWon} setGameWon={setGameWon} gameLost={gameLost} setGameLost={setGameLost} update={update} setUpdate={setUpdate} />
      :
      <RockPaperScissorsV2 handleModalToggle={handleModalToggle} handleGameToggle={handleGameToggle} gameWon={gameWon} setGameWon={setGameWon} gameLost={gameLost} setGameLost={setGameLost} update={update} setUpdate={setUpdate} />}


    </div>
  );
}

export default App;
