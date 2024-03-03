import React, { useState } from "react";

import ShowServiceCharges from "./components/ShowServiceCharges";
import ServiceChargeForm from "./components/ServiceChargeForm";


function App() {
 const [loadMoreData,setLoadMoreData] = useState(false)
  
  return (
   <div className="flex-col justify-center items-center mt-20 bg-gray-100">
    <h1 className="text-3xl">Service Charges</h1>
    <ShowServiceCharges loadMoreData={loadMoreData} setLoadMoreData={setLoadMoreData}/>

    <h1 className="text-3xl mt-10">Add New Charge</h1>
    <ServiceChargeForm  setLoadMoreData={setLoadMoreData}/>
   </div>
  );
}

export default App;
