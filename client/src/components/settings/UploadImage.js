// import React, { useState } from 'react';
// import axios from 'axios'

// function UploadImage() {
//   const [imageUpload, setImageUpload] = useState();

//   const selectFileHandler = event => {
//     setImageUpload({
//       imageUpload: event.target.files[0],
//     });
//   };

//   const fileUploadHandler = () => {
//     const fd = new FormData()
//     fd.append('image', this.state.selectFile, this.selectFileHandler)
//     axios.post('', fd)
//   }

//   return (
//     <div>
//       <input type="file" onChange={selectFileHandler} />
//     </div>
//   );
// }

// export default UploadImage;
