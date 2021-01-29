import React from "react";
import { Modal } from "react-bootstrap";
import { API, Token } from "../../utils/Constants";
import BucketDetails from "./BucketDetails";

export default class Bucket extends React.Component {
  state = {
    active: 1,
    files: [],
    show: false,
    details: {},
    loading: false,
  };

  componentDidMount() {
    let bucket = this.props.match.params.id;
    fetch(
      `${API}/buckets/${bucket}/objects`,
      {
        method: "get",
        headers: {
          Authorization: `Token ${Token}`,
          "Content-Type": "application/json",
        },
      },
      this.setState({ loading: true })
    )
      .then((response) => response.json())
      .then((datas) => {
        this.setState({ loading: false });
        this.setState({ files: datas.objects });
      });
  }

  onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    /* const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      console.log(img.src);
      let bucket = this.props.match.params.id;
      fetch(`${API}/buckets/${bucket}/objects`, {
        method: "post",
        headers: {
          Authorization: `Token 10af0cbc-2532-4de3-90a9-21ee51e09458`,
          // "Content-Type": "multipart/form-data; boundary=l3iPy71otz",
        },
        data: JSON.stringify({ bucket: bucket, file: img.src }),
      })
        .then((response) => response.json())
        .then((datas) => {
          console.log(datas);
        });
    };
    reader.readAsDataURL(event.target.files[0]);*/

    var file = event.target.files[0];
    console.log(file);
    this.setState({ file });
    let bucket = this.props.match.params.id;
    var form = new FormData();
    form.append("file", this.state.file);
    form.append("bucket", bucket);

    fetch(`${API}/buckets/${bucket}/objects`, {
      method: "post",
      headers: {
        Authorization: `Token ${Token}`,
        "Content-Type": "multipart/form-data; boundary=CUSTOM",
      },
      data: form,
    })
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
      });
  };

  deleteBucket = () => {
    let bucket = this.props.match.params.id;
    fetch(`${API}/buckets/${bucket}`, {
      method: "delete",
      headers: {
        Authorization: `Token ${Token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        this.props.history.push("/");
      });
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
            <button className="btn btn-danger" onClick={this.deleteBucket}>
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
                {this.state.files.length > 0 ? (
                  this.state.files.map((file) => (
                    <tr
                      key={file.id}
                      onClick={() => this.setState({ details: file })}
                    >
                      <td>{file.name}</td>
                      <td>{file.lastModified}</td>
                      <td>{file.size}</td>
                    </tr>
                  ))
                ) : (
                  <div class="d-flex justify-content-center">
                    <strong>Loading...</strong>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <BucketDetails details={this.state.details} />
        )}
      </div>
    );
  }
}
