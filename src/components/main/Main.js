import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

let schema = Yup.object().shape({
  name: Yup.string().required(),
  location: Yup.string().required(),
});

export default function Main() {
  const [showCreateBucketForm, setShowCreateBucketForm] = useState(false);
  const [buckets, setBuckets] = useState([
    { id: 1, name: "BestStorage", location: "Kranj" },
    { id: 2, name: "Pics", location: "Ljubljana" },
  ]);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    /*  fetch(`/api/report/update`, {
      method: "post",
      headers: {
        // Authorization: `Bearer ${authenticity.token(hash)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((datas) => {

      });*/
    buckets.unshift(data);
    setShowCreateBucketForm(false);
  };
  return (
    <div className="container">
      <h1 className="text-left">Bucket List</h1>
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
        <h5>All Buckets(2)</h5>
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
            {buckets.length > 0
              ? buckets.map((bucket) => (
                  <tr key={bucket.id}>
                    <td>
                      <Link to={`/buckets/${bucket.id}`}>{bucket.name}</Link>{" "}
                    </td>
                    <td>
                      <Link to={`/buckets/${bucket.id}`}>
                        {bucket.location}
                      </Link>{" "}
                    </td>
                  </tr>
                ))
              : "No buckets"}
          </tbody>
        </table>
      </div>
    </div>
  );
}
