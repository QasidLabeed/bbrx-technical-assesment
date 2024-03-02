import React, { useState, useEffect } from "react";

function ShowServiceCharges() {
  const [serviceCharges, setSericeCharges] = useState([]);

  const fetchServiceCharges = () => {
    fetch("http://localhost:5000/service-charges")
      .then((res) => res.json())
      .then((data) => {
        setSericeCharges(data);
      });
  };

  //Fetch service charges on App load
  useEffect(() => {
    fetchServiceCharges();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Service Charge Information</h2>
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
          {serviceCharges.map((item) => (
            <tr>
              <td className="border px-4 py-2">{item.period_code}</td>
              <td className="border px-4 py-2">{item.period_label}</td>
              <td className="border px-4 py-2">{item.start_date}</td>
              <td className="border px-4 py-2">{item.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ShowServiceCharges;
