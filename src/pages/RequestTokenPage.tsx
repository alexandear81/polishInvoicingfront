import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { ksefApi } from '../services/ksefApi';

/**
 * KSeF Token Request Page
 * 
 * Workflow:
 * 1. User enters NIP/PESEL and clicks "Download XML for Signing"
 * 2. Backend generates challenge and returns XML ready for signing
 * 3. User downloads XML, signs it with ePUAP/qualified certificate
 * 4. User uploads signed XML and clicks "Generate Session Token"
 * 5. Backend verifies signature and returns session token for authenticated operations
 */
const RequestTokenPage: React.FC = () => {
  const [idType, setIdType] = useState('onip');
  const [idValue, setIdValue] = useState('');
  const [file, setFile] = useState<File | null>(null);

  /**
   * Step 1: Request authorization challenge from KSeF
   * Backend returns proper XML structure ready for digital signing
   */
  const requestChallenge = async () => {
    try {
      const response = await ksefApi.requestChallenge({
        type: idType,
        identifier: idValue,
      });

      console.log('Challenge:', response.challenge);
      console.log('Timestamp:', response.timestamp);
      
      // Backend returns ready-to-sign XML as base64
      if (response.xmlToSign) {
        const xmlContent = atob(response.xmlToSign); // Decode base64
        const blob = new Blob([xmlContent], { type: 'application/xml' });
        saveAs(blob, 'InitSessionSignedRequest.xml');
        alert('XML file downloaded! Sign it with ePUAP/qualified certificate and upload it back.');
      }
    } catch (error) {
      alert('Failed to fetch challenge');
      console.error(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  /**
   * Step 2: Upload signed XML and generate session token
   * Backend verifies the digital signature and returns authenticated session token
   */
  const sendSignedXml = async () => {
    if (!file) return alert('Please select a file first.');
    
    try {
      // Read file as text and encode to base64
      const fileContent = await file.text();
      const base64Content = btoa(fileContent); // Encode to base64
      
      const response = await ksefApi.requestSessionToken(base64Content);

      // Save the session token and response data
      const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
      saveAs(blob, 'SessionToken.json');
      
      alert(`Session token generated successfully! Token saved to SessionToken.json file.`);
    } catch (error) {
      alert('Failed to generate session token');
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
          Download XML for Signing
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
          Generate Session Token
        </button>
      </div>
    </div>
  );
};

export default RequestTokenPage;