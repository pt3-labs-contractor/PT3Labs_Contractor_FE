import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosTrash } from 'react-icons/io'
import { IoMdCreate } from 'react-icons/io'



function ContractorList(props) {
  console.log(props);
  return (
    <div>
        <h2>Contractor Setting Page</h2>{"\n"}
        <form>
          Contractor Email<input
            value="contractor Email"
            
          />
          Contractor Phone<input
            value="contractor phonenumber"
          />
          Old Password<input/>
          New Passowrd<input/>
          <button>Save</button>
        </form>
        <form>
          Add Service <input placeholder="Service"/>
          <input placeholder="Price"/>
        </form>
        <ul>LIST OF SERVICES
          <li>Service1<button><IoMdCreate/></button> <button><IoIosTrash/></button></li>
          <li>Service2<button><IoMdCreate/></button> <button><IoIosTrash/></button></li>
          <li>Service3<button><IoMdCreate/></button> <button><IoIosTrash/></button></li>
          <li>Service4<button><IoMdCreate/></button> <button><IoIosTrash/></button></li>
        </ul>
    </div>
  )
}

const mapStateToProps = state => {
    console.log(state)
  return {
    contractor: state.accounts.singleContractor,
    loading: state.loading,
    error: state.error
  }
}

export default connect(mapStateToProps)(ContractorList);
