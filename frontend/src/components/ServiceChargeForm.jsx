import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";

export default function ServiceChargeForm(props) {

    const {setLoadMoreData} = props

    const validationSchema = Yup.object().shape({
        periodLabel: Yup.string()
          .required("Period Label is required")
          .max(50, "Period Label must be at most 50 characters"),
        startDate: Yup.date().required("Start Date is required"),
        endDate: Yup.date()
          .required("End Date is required")
          .min(Yup.ref("startDate"), "End date must be greater than start date"),
      });
    
      const generateUniquePeriodCode = () => {
        //Generate Max 10 char period code
        return nanoid(10);
      };
    
      const initialValues = {
        periodLabel: "",
        startDate: "",
        endDate: "",
      };

      
    const onSubmit = (values,{resetForm}) => {
        const periodCode = generateUniquePeriodCode();
    
        const body = JSON.stringify({
          period_code: periodCode,
          period_label: values.periodLabel,
          start_date: values.startDate,
          end_date: values.endDate,
        });
    
        //Can be shifted to global contants
        fetch("http://localhost:5000/service-charge", {
          method: "POST",
          body,
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .finally(() => setLoadMoreData(true));

          //Reset form after submit
          resetForm()
        
      };
    
  return (
    <div className="flex-1">
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}      
    >
      <Form className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label
            htmlFor="periodLabel"
            className="block text-sm font-medium text-gray-700"
          >
            Period Label:
          </label>
          <Field
            type="text"
            name="periodLabel"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          <ErrorMessage name="periodLabel" className="text-red-500 text-sm" />
        </div>
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date:
          </label>
          <Field
            type="date"
            name="startDate"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          <ErrorMessage name="startDate" className="text-red-500 text-sm" />
        </div>
        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date:
          </label>
          <Field
            type="date"
            name="endDate"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          <ErrorMessage name="endDate" className="text-red-500 text-sm" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Submit
        </button>
      </Form>
    </Formik>
  </div>
  )
}
