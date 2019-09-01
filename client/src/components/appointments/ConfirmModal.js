import React from 'react';

import './ConfirmModal.css';

function ConfirmModal(props) {
  return (
    <div className={`modal ${props.confirm ? 'active' : 'disabled'}`}>
      <div className="confirm-box">
        <p>Are you sure?</p>
        <div className="modal-btn-container">
          <button onClick={() => props.postAppointment(true)}>Yes</button>
          <button onClick={() => props.postAppointment(false)}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
