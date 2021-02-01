import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { API, Token } from "../../utils/Constants";

let schema = Yup.object().shape({
  name: Yup.string().required(),
  location: Yup.string().required(),
});

export default function Main() {
  const [loading, setLoading] = useState(false);
  const [showCreateBucketForm, setShowCreateBucketForm] = useState(false);
  const [buckets, setBuckets] = useState([]);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    fetch(`${API}/buckets`, {
      method: "post",
      headers: {
        Authorization: `Token ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status); // Will show you the status
        if (response.status === 200 || response.status === 201) {
          setSuccess(true);
        } else {
          setFail(true);
        }
        return response.json();
      })
      .then((datas) => {
        console.log(datas);
        if (datas.bucket) {
          buckets.unshift(datas.bucket);
        }
      });

    setShowCreateBucketForm(false);
  };

  useEffect(() => {
    fetch(
      `${API}/buckets`,
      {
        method: "get",
        headers: {
          Authorization: `Token ${Token}`,
          "Content-Type": "application/json",
        },
      },
      setLoading(true)
    )
      .then((response) => response.json())
      .then((datas) => {
        setLoading(false);
        console.log(datas);
        setBuckets(datas.buckets);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="text-left">Bucket List</h1>
      {success ? (
        <div class="alert alert-success" role="alert">
          {setTimeout(function () {
            setSuccess(false);
          }, 3000)}
          Bucket created successfully!
        </div>
      ) : (
        ""
      )}
      {fail ? (
        <div class="alert alert-danger" role="alert">
          {setTimeout(function () {
            setFail(false);
          }, 3000)}
          Bucket creation failed, try again.
        </div>
      ) : (
        ""
      )}
      {showCreateBucketForm ? (
        <div>
          <h5 className="text-left pt-3">Create New Bucket</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col">
                <label className="text-left">Bucket Name*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bucket Name"
                  name="name"
                  ref={register}
                />
                {errors.name && (
                  <small id="name" className="form-text text-danger">
                    {errors.name.message}
                  </small>
                )}
              </div>
              <div className="col">
                <label className="text-left">Bucket Location*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bucket Location"
                  name="location"
                  ref={register}
                />
                {errors.location && (
                  <small id="location" className="form-text text-danger">
                    {errors.location.message}
                  </small>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-start py-3">
              <button type="submit" className="btn btn-primary">
                Create Bucket
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}

      <div className="row pt-3 d-flex justify-content-between">
        <h5>All Buckets({buckets.length})</h5>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateBucketForm(true)}
        >
          Create New Bucket
        </button>
      </div>
      <div className="row py-5">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
            </tr>
          </thead>

          <tbody>
            {buckets.length > 0 ? (
              buckets.map((bucket) => (
                <tr key={bucket.id}>
                  <td>
                    <Link to={`/buckets/${bucket.id}`}>{bucket.name}</Link>{" "}
                  </td>
                  <td>
                    <Link to={`/buckets/${bucket.id}`}>
                      {bucket.location.name}
                    </Link>{" "}
                  </td>
                </tr>
              ))
            ) : (
              <div className="d-flex justify-content-center text-center">
                <strong>Loading...</strong>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
