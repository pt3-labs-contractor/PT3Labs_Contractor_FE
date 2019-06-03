import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';

const Cpop = props => {
  const [title, setTitle] = useState(props.data.title);
  const [location, setLocation] = useState(props.data.location);
  const [mount, setMount] = useState(false);

  const onInfoChange = e => {
    e.target.id === 'title'
      ? setTitle(e.target.value)
      : setLocation(e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    const newSched = { title: title, location: location };
    props.cred(newSched);
    setTitle('');
    setLocation('');
  };

  const setEditForm = () => {
    const data = props.data;
    if (data.id && props.mount === true) {
      setTitle(data.title);
      setLocation(data.location);
    }
    return data;
  };

  useEffect(() => {
    setEditForm();
  }, [setEditForm]);

  return (
    <div className={props.klass === true ? 'hidden' : 'formCont'}>
      <form className="cForm" onSubmit={submit}>
        <div className="titleCont">
          <label className="title" htmlFor="title">
            Title:{' '}
          </label>
          <input id="title" type="text" value={title} onChange={onInfoChange} />
        </div>
        <div className="locCont">
          <label className="loc" htmlFor="loc">
            Location:{' '}
          </label>
          <input
            id="loc"
            type="text"
            value={location}
            onChange={onInfoChange}
          />
        </div>
        <button className="sub">Save</button>
      </form>
    </div>
  );
};

export default Cpop;
