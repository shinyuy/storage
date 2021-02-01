import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { API, Token } from "../../utils/Constants";
import { useParams, useHistory } from "react-router-dom";

export default function BucketDetails({ details }) {
  let { id } = useParams();
  let history = useHistory();
  const [show, setShow] = useState(false);

  const deleteObject = () => {
    fetch(`${API}/buckets/${id}/objects/${details.id}`, {
      method: "delete",
      headers: {
        Authorization: `Token ${Token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        history.push(`/buckets/${id}`);
      });
  };

  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <p>Do you really want to delete this object?</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-danger" onClick={deleteObject}>
            Delete
          </button>
          <button className="btn btn-primary" onClick={() => setShow(false)}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      <div className="row d-flex justify-content-between">
        <h5>Bucket Details</h5>
        <button
          className="btn btn-danger mx-2 my-2"
          onClick={() => setShow(true)}
        >
          Delete File
        </button>
      </div>
      <div className="row">
        <p className="text-left" style={{ width: "100%" }}>
          File Name: {details.name}
        </p>
        <br />
        <p className="text-left" style={{ width: "100%" }}>
          Location: {details.lastModified}
        </p>
        <br />
        <p className="text-left" style={{ width: "100%" }}>
          Size: {details.size}
        </p>
        <br />
      </div>
    </div>
  );
}
