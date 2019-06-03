import React from 'react';

const OnClickPop = props => {
  const onEditClick = () => {
    props.editClick();
  };

  const onDelClick = e => {
    e.preventDefault();
    props.setCre();
    props.delSch();
    props.createSch();
  };
  return (
    <div class={props.klass === true ? 'hidden' : 'clickCont'}>
      <h3 className="title">{props.title}</h3>
      <p className="loc">{props.location}</p>
      <div className="time">
        <p className="start">Start: {props.start}</p>
        <p className="end">End: {props.end}</p>
      </div>
      <div className="buttons">
        <button className="edit" onClick={onEditClick}>
          Edit
        </button>
        <button className="delete" onClick={onDelClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default OnClickPop;
