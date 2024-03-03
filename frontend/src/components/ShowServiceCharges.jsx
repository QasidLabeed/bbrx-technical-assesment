import React, { useState, useEffect } from "react";


function ShowServiceCharges(props) {
  const {loadMoreData,setLoadMoreData} = props
  const [serviceCharges, setSericeCharges] = useState([]);

  const fetchServiceCharges = () => {
    //Base URL can be shifted to global constants
    fetch("http://localhost:5000/service-charges")
      .then((res) => res.json())
      .then((data) => {
        setSericeCharges(data);
        setLoadMoreData(false)
      });

  };

  useEffect(() => {
    //Fetch more data once the form is submitted
    loadMoreData && fetchServiceCharges();
  }, [loadMoreData]);

  //Fetch service charges on App load
  useEffect(() => {
   fetchServiceCharges();
  }, []);

  return (
    <div className="flex-1 ">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Period Code</th>
            <th className="px-4 py-2">Period Label</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
          </tr>
        </thead>
        <tbody>
          {serviceCharges.length !==0 && serviceCharges.map((item) => (
            <tr>
              <td className="border px-4 py-2">{item.period_code}</td>
              <td className="border px-4 py-2">{item.period_label}</td>
              <td className="border px-4 py-2">{item.start_date}</td>
              <td className="border px-4 py-2">{item.end_date}</td>
            </tr>
          ))}
          {
            serviceCharges.length ===0 && 
            <tr>
              <td colSpan="4">
              <h1  className="text-sm text-center ">No charges exists</h1>
              </td>
            </tr>
           
          }
        </tbody>
      </table>
    </div>
  );
}
export default ShowServiceCharges;
