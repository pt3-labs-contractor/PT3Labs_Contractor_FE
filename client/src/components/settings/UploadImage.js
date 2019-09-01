import React from 'react';
import axios, { post } from 'axios';
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

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then(response => {
      console.log(response.data);
    });
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  fileUpload(file) {
    const url = 'http://localhost:5000/upload';
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.post(url, formData, config);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default FileUpload;
