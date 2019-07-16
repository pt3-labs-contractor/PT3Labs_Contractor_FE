// import React, {useState, useEffect} from 'react'
// import { connect } from 'react-redux'

// function DeleteModal() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [toggle, setToggle] = useState(false)

//   useEffect (() => {
//     props.getFeedback()
//     setIsOpen(true)
//   })

//   useEffect (() => {
//     props.deleteFeedback()
//   })

//   toggle() {
//     (prevState => ({
//       isOpen: !prevState.isOpen
//     }))
//   }

//   backToFeedback = () => {
//     props.history.push(`/userfeedback/${id}`)
//   }

//   return (
//     <div>
//       <h1>Are you sure you want to Delete this?</h1>
//       <button onClick={this.deleteHandler}>Yes</button>
//       <button onClick={this.backToFeedback}>No</button>
//     </div>
//   )
// }

// export default connect(
//   mapStateToProps,
//   {
//   getFeedback, deleteFeedback
// })(DeleteModal)
