import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { ksefApi } from '../services/ksefApi';

const SendInvoicePage: React.FC = () => {
  const [sessionToken, setSessionToken] = useState('');
  const [invoiceXml, setInvoiceXml] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState<any>(null);

  const sendInvoice = async () => {
    if (!sessionToken || !invoiceXml) {
      return alert('Please provide both session token and invoice XML');
    }

    try {
      const response = await ksefApi.sendInvoice(sessionToken, invoiceXml);
      
      setReferenceNumber(response.elementReferenceNumber);
      
      const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
      saveAs(blob, 'InvoiceResponse.json');
      
      alert(`Invoice sent successfully! Reference number: ${response.elementReferenceNumber}`);
    } catch (error) {
      alert('Failed to send invoice');
      console.error(error);
    }
  };

  const checkInvoiceStatus = async () => {
    if (!sessionToken || !referenceNumber) {
      return alert('Please provide both session token and reference number');
    }

    try {
      const response = await ksefApi.getInvoiceStatus(sessionToken, referenceNumber);
      setInvoiceStatus(response);
      
      const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
      saveAs(blob, 'InvoiceStatus.json');
    } catch (error) {
      alert('Failed to get invoice status');
      console.error(error);
    }
  };

  const terminateSession = async () => {
    if (!sessionToken) {
      return alert('Please provide session token');
    }

    try {
      await ksefApi.terminateSession(sessionToken);
      alert('Session terminated successfully');
      setSessionToken('');
      setReferenceNumber('');
      setInvoiceStatus(null);
    } catch (error) {
      alert('Failed to terminate session');
      console.error(error);
    }
  };

  const generateSampleInvoice = () => {
    const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (2)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>${new Date().toISOString()}</DataWytworzeniaFa>
  </Naglowek>
  
  <Podmiot1>
    <DaneIdentyfikacyjne>
      <NIP>1234567890</NIP>
      <Nazwa>Sample Company Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Przykładowa 1, 00-001 Warszawa</AdresL1>
    </Adres>
  </Podmiot1>
  
  <Podmiot2>
    <DaneIdentyfikacyjne>
      <NIP>0987654321</NIP>
      <Nazwa>Client Company Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Kliencka 2, 00-002 Kraków</AdresL1>
    </Adres>
    <JST>2</JST>
    <GV>2</GV>
  </Podmiot2>
  
  <Fa>
    <KodWaluty>PLN</KodWaluty>
    <P_1>${new Date().toISOString().split('T')[0]}</P_1>
    <P_6>${new Date().toISOString().split('T')[0]}</P_6>
  </Fa>
</Faktura>`;
    
    setInvoiceXml(sampleXml);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Send Invoice to KSeF</h2>
      
      <div className="space-y-6">
        {/* Session Token */}
        <div>
          <label className="block text-sm font-medium mb-2">Session Token</label>
          <textarea
            className="border rounded w-full px-3 py-2 h-20"
            value={sessionToken}
            onChange={(e) => setSessionToken(e.target.value)}
            placeholder="Paste your session token here (from SessionToken.json file)"
          />
        </div>

        {/* Invoice XML */}
        <div>
          <label className="block text-sm font-medium mb-2">Invoice XML</label>
          <textarea
            className="border rounded w-full px-3 py-2 h-40"
            value={invoiceXml}
            onChange={(e) => setInvoiceXml(e.target.value)}
            placeholder="Paste your invoice XML here"
          />
          <button
            onClick={generateSampleInvoice}
            className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Generate Sample Invoice XML
          </button>
        </div>

        {/* Send Invoice */}
        <button
          onClick={sendInvoice}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Send Invoice
        </button>

        <hr className="my-6" />

        {/* Check Status */}
        <div>
          <label className="block text-sm font-medium mb-2">Reference Number</label>
          <input
            className="border rounded w-full px-3 py-2"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            placeholder="Invoice reference number"
          />
          <button
            onClick={checkInvoiceStatus}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Check Invoice Status
          </button>
        </div>

        {/* Status Display */}
        {invoiceStatus && (
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium mb-2">Invoice Status:</h3>
            <pre className="text-sm overflow-auto">{JSON.stringify(invoiceStatus, null, 2)}</pre>
          </div>
        )}

        <hr className="my-6" />

        {/* Terminate Session */}
        <button
          onClick={terminateSession}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Terminate Session
        </button>
      </div>
    </div>
  );
};

export default SendInvoicePage;
