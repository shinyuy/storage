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
    success: false,
    fail: false,
    bucket: {},
  };

  componentDidMount() {
    let bucket = this.props.match.params.id;
    fetch(
      `${API}/buckets/${bucket}`,
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
      .then((data) => {
        this.setState({ bucket: data.bucket });
      });
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
      .then((data) => {
        this.setState({ loading: false });
        this.setState({ files: data.objects });
      });
  }

  onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();

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
      .then((response) => {
        console.log(response.status);
        if (response.status === 200 || response.status === 201) {
          this.setState({ success: true });
        } else {
          this.setState({ fail: true });
        }
        response.json();
      })
      .then((data) => {
        console.log(data);
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

  reset = () => {
    this.setState({ success: false });
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
        <h1>{this.state.bucket.name}</h1>
        {this.state.success ? (
          <div class="alert alert-success" role="alert">
            {setTimeout(function () {
              //  this.setState({ success: false });
            }, 3000)}
            Object creation successfully!
          </div>
        ) : (
          ""
        )}
        {this.state.fail ? (
          <div class="alert alert-danger" role="alert">
            {setTimeout(function () {
              //this.setState({ fail: false });
            }, 3000)}
            Object creation failed, try again.
          </div>
        ) : (
          ""
        )}
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
                      style={{ cursor: "pointer" }}
                      key={file.id}
                      onClick={() =>
                        this.setState({ details: file, active: 2 })
                      }
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
