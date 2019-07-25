import React from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';

function AppointmentList(props) {
  return (
    <div className="appointment-list">
      <h3>Pending Appointments</h3>
      <div className="appointments-container">
        {props.appointments.slice(0, 4).map(item => {
          const contractor = props.contractors.filter(
            con => con.id === item.contractorId
          )[0];
          if (item.confirmed === null)
            return (
              <div className="appointment-card" key={item.id}>
                <h5>{dateFns.format(item.startTime, 'MMMM Do:[   ]HH:mm')}</h5>
                {/* <p>
                  {`${dateFns.format(
                    item.startTime,
                    'HH:mm'
                  )} - ${dateFns.format(
                    dateFns.addHours(item.startTime, item.duration.hours),
                    'HH:mm'
                  )}`}
                </p> */}
                <p>{contractor.name}</p>
                <p>{contractor.phoneNumber}</p>
                <p className="service-title">{item.service}</p>
              </div>
            );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    appointments: state.appointments,
    contractors: state.contractors,
  };
};

export default connect(mapStateToProps)(AppointmentList);
