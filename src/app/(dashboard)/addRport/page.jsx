"use client";
import React, { useState } from 'react';
import axios from 'axios'; // Axios for making API calls
import { Input } from '@/components/ui/input';

const FormComponent = () => {
  const [testId, setTestId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [gender, setGender] = useState('');
  const [comments, setComments] = useState('');
  const [reportIssuedDate, setReportIssuedDate] = useState('');
  const [testCost, setTestCost] = useState('');
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmit = async () => {
    e.preventDefault();
    try {
      setLoader(true);
      const data = {
        testId,
        patientName,
        phoneNumber,
        patientAge,
        gender,
        comments,
        reportIssuedDate,
        testCost,
      };

      // API call using Axios
      const response = await axios.post('/api/submitData', data);
      const result = response.data;
      setMessage(result.message);
    } catch (error) {
      console.error(error);
      setMessage('Failed to submit data');
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4 text-center">Submit Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testId">
            Test ID
          </label>
          <Input
            id="testId"
            type="text"
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientName">
            Patient Name
          </label>
          <Input
            id="patientName"
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <Input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientAge">
            Patient Age
          </label>
          <Input
            id="patientAge"
            type="text"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender
          </label>
          <Input
            id="gender"
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comments">
            Comments
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reportIssuedDate">
            Report Issued Date
          </label>
          <Input
            id="reportIssuedDate"
            type="text"
            value={reportIssuedDate}
            onChange={(e) => setReportIssuedDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testCost">
            Test Cost
          </label>
          <Input
            id="testCost"
            type="text"
            value={testCost}
            onChange={(e) => setTestCost(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300"
          type="submit"
          disabled={loader}
        >
          {loader ? 'Submitting...' : 'Submit'}
        </button>
        {message && (
          <p className="text-green-500 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
};

export default FormComponent;
