import React from "react";
import { Modal } from "react-bootstrap";

export default class Bucket extends React.Component {
  state = {
    active: 1,
    files: [
      { id: 1, name: "File01", lastModified: "12/02/2021", size: "3MB" },
      { id: 2, name: "File02", lastModified: "04/04/2021", size: "50KB" },
      { id: 3, name: "File03", lastModified: "02/08/2021", size: "12KB" },
      { id: 4, name: "File04", lastModified: "01/03/2021", size: "90MB" },
    ],
    show: false,
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    /*  fetch(`/api/report/update`, {
      method: "get",
      headers: {
        // Authorization: `Bearer ${authenticity.token(hash)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((datas) => {

      });*/
  }

  onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);
    this.setState({ file });

    var form = new FormData();
    form.append("file", this.state.file);
  };

  delete = () => {
    let id = this.props.match.params.id;
    console.log(id);
    /*  fetch(`/api/report/update`, {
      method: "get",
      headers: {
        // Authorization: `Bearer ${authenticity.token(hash)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((datas) => {

      });*/
  };

  render() {
    return (
      <div className="container">
        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Body>
            <p>Do you really want to delete this object?</p>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn btn-danger" onClick={this.delete}>
              Delete
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.setState({ show: false })}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
        <h1>MyNewStorage</h1>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <span
              style={{ cursor: "pointer" }}
              className={`nav-link ${
                this.state.active === 1 ? "active bg-primary" : ""
              }`}
              aria-current="page"
              //href="#"
              onClick={() => this.setState({ active: 1 })}
            >
              Files
            </span>
          </li>

          <li className="nav-item">
            <span
              style={{ cursor: "pointer" }}
              className={`nav-link ${
                this.state.active === 2 ? "active bg-primary" : ""
              }`}
              onClick={() => this.setState({ active: 2 })}
              //href="#"
            >
              Details
            </span>
          </li>
        </ul>
        {this.state.active === 1 ? (
          <div>
            <div className="row d-flex justify-content-between">
              <div>All Files(4)</div>
              <div>
                <button
                  className="btn btn-danger mx-2 my-2"
                  onClick={() => this.setState({ show: true })}
                >
                  Delete Object
                </button>

                <input
                  id="myInput"
                  type="file"
                  ref={(ref) => (this.upload = ref)}
                  style={{ display: "none" }}
                  onChange={this.onChangeFile.bind(this)}
                />
                <button
                  className="btn btn-primary mx-2 my-2"
                  primary={false}
                  onClick={() => {
                    this.upload.click();
                  }}
                >
                  Upload Object
                </button>
              </div>
            </div>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Last Modified</th>
                  <th scope="col">Size</th>
                </tr>
              </thead>
              <tbody>
                {this.state.files.length > 0
                  ? this.state.files.map((file) => (
                      <tr key={file.id}>
                        <td>{file.name}</td>
                        <td>{file.lastModified}</td>
                        <td>{file.size}</td>
                      </tr>
                    ))
                  : "No buckets"}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div className="row d-flex justify-content-between">
              <h5>Bucket Details</h5>
              <button className="btn btn-danger mx-2 my-2">Delete File</button>
            </div>
            <div className="row">
              <p>File Name: Some name</p>
              <br />
              <p>Location: Some location</p>
              <br />
              <p>Size: 100mb</p>
              <br />
            </div>
          </div>
        )}
      </div>
    );
  }
}
