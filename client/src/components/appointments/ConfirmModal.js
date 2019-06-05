import React from 'react';

import './ConfirmModal.css';

function ConfirmModal(props) {
  return (
    <div className={`modal ${props.confirm ? 'active' : 'disabled'}`}>
      <div className="confirm-box">
        <p>Are you sure?</p>
        <button onClick={props.postAppointment}>Yes</button>
      </div>
    </div>
  );
}

export default ConfirmModal;
