import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { ksefApi } from '../services/ksefApi';

const RequestTokenPage: React.FC = () => {
  const [idType, setIdType] = useState('onip');
  const [idValue, setIdValue] = useState('');
  const [challenge, setChallenge] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const requestChallenge = async () => {
    try {
      const response = await ksefApi.requestChallenge({
        type: idType,
        identifier: idValue,
      });

      setChallenge(response.challenge);
      setTimestamp(response.timestamp);
      console.log('Challenge:', response.challenge);
      console.log('Timestamp:', response.timestamp);
      generateXml(response.challenge, response.timestamp);
    } catch (error) {
      alert('Failed to fetch challenge');
      console.error(error);
    }
  };

  const generateXml = (challenge: string, timestamp: string) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<InitSessionSignedRequest xmlns="http://ksef.mf.gov.pl/wsp/ksef.xsd">
  <Context>Demo</Context>
  <Timestamp>${timestamp}</Timestamp>
  <Challenge>${challenge}</Challenge>
  <SubjectIdentifier>
    <Type>${idType}</Type>
    <Identifier>${idValue}</Identifier>
  </SubjectIdentifier>
</InitSessionSignedRequest>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    saveAs(blob, 'InitSessionSignedRequest.xml');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const sendSignedXml = async () => {
    if (!file) return alert('Please select a file first.');
    try {
      const response = await ksefApi.initSession(file);

      // Save the session token and response data
      const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
      saveAs(blob, 'SessionToken.json');
      
      alert(`Session initialized successfully! Session token saved to file.`);
    } catch (error) {
      alert('Failed to send signed XML');
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Request KSeF Token</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Identifier Type</label>
          <input
            className="border rounded w-full px-2 py-1"
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Identifier</label>
          <input
            className="border rounded w-full px-2 py-1"
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
          />
        </div>
        <button
          onClick={requestChallenge}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Challenge and XML
        </button>

        <hr className="my-6" />

        <div>
          <label className="block text-sm font-medium">Upload Signed XML</label>
          <input type="file" accept=".xml" onChange={handleFileChange} />
        </div>
        <button
          onClick={sendSignedXml}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Signed XML and Get Token
        </button>
      </div>
    </div>
  );
};

export default RequestTokenPage;