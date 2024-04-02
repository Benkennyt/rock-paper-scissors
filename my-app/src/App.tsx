import React, { useState } from 'react';
import './App.css';
import RockPaperScissors from './features/RockPaperScissors';
import ReactModal from 'react-modal';
import { IoClose } from "react-icons/io5";
import { ReactComponent as Rules1 } from './assets/images/image-rules.svg';


function App() {
  const [openModal, setopenModal] = useState(false)

  const handleModalToggle = () => {
    if (openModal) {
      setopenModal(false)
    } else {
      setopenModal(true)
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
      <RockPaperScissors handleModalToggle={handleModalToggle}/>
    </div>
  );
}

export default App;
