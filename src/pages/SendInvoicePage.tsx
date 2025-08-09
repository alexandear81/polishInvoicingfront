import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { ksefApi } from '../services/ksefApi';
import { useCompanies } from '../context/DataContext';

// Proper TypeScript interfaces
interface SendInvoiceResponse {
  elementReferenceNumber?: string;
  referenceNumber?: string;
  processingCode?: number;
  processingDescription?: string;
  [key: string]: unknown;
}

interface InvoiceStatus {
  invoiceStatus?: string;
  processingCode?: number;
  processingDescription?: string;
  [key: string]: unknown;
}

const SendInvoicePage: React.FC = () => {
  const [sessionToken, setSessionToken] = useState('');
  const [invoiceXml, setInvoiceXml] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState<InvoiceStatus | null>(null);

  // Loading flags
  const [isSending, setIsSending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isTerminating, setIsTerminating] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);

  const { activeCompany } = useCompanies();

  // Helpers
  const downloadJson = (filename: string, data: unknown) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, filename);
  };

  const validateXml = (xml: string): string | null => {
    if (!xml.trim()) return 'XML cannot be empty';
    
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'application/xml');
      const parserError = doc.getElementsByTagName('parsererror')[0];
      if (parserError) return parserError.textContent || 'Invalid XML syntax';
      
      // Basic KSeF validation
      const faktura = doc.getElementsByTagName('Faktura')[0];
      if (!faktura) return 'XML must contain a Faktura element';
      
      const naglowek = faktura.getElementsByTagName('Naglowek')[0];
      if (!naglowek) return 'Faktura must contain a Naglowek element';
      
      return null;
    } catch (error) {
      return `XML validation error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  };

  // Persist session token locally with cleanup
  useEffect(() => {
    const saved = localStorage.getItem('ksefSessionToken');
    if (saved) setSessionToken(saved);
    
    return () => {
      // Cleanup if component unmounts
    };
  }, []);

  useEffect(() => {
    if (sessionToken) {
      localStorage.setItem('ksefSessionToken', sessionToken);
    } else {
      localStorage.removeItem('ksefSessionToken');
    }
  }, [sessionToken]);

  const sendInvoice = async () => {
    const cleanToken = sanitizeInput(sessionToken);
    const cleanXml = sanitizeInput(invoiceXml);
    
    if (!cleanToken || !cleanXml) {
      alert('Please provide both session token and invoice XML');
      return;
    }

    const xmlError = validateXml(cleanXml);
    if (xmlError) {
      alert(`XML validation failed:\n${xmlError}`);
      return;
    }

    try {
      setIsSending(true);
      const response: SendInvoiceResponse = await ksefApi.sendInvoice(cleanToken, cleanXml);

      const ref = response.elementReferenceNumber || response.referenceNumber || '';
      if (ref) setReferenceNumber(ref);

      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      downloadJson(`InvoiceResponse-${ref || 'no-ref'}-${ts}.json`, response);

      if (response.processingCode === 200 || ref) {
        alert(ref ? `Invoice sent successfully! Reference number: ${ref}` : 'Invoice sent successfully!');
      } else {
        alert(`Invoice sent but may have issues. Processing description: ${response.processingDescription || 'Unknown'}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to send invoice: ${errorMessage}`);
      console.error('Send invoice error:', error);
    } finally {
      setIsSending(false);
    }
  };

  const checkInvoiceStatus = async () => {
    const cleanToken = sanitizeInput(sessionToken);
    const cleanRef = sanitizeInput(referenceNumber);
    
    if (!cleanToken || !cleanRef) {
      alert('Please provide both session token and reference number');
      return;
    }

    try {
      setIsChecking(true);
      const response: InvoiceStatus = await ksefApi.getInvoiceStatus(cleanToken, cleanRef);
      setInvoiceStatus(response);

      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      downloadJson(`InvoiceStatus-${cleanRef}-${ts}.json`, response);
      
      if (response.invoiceStatus) {
        alert(`Invoice status: ${response.invoiceStatus}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to get invoice status: ${errorMessage}`);
      console.error('Check status error:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const terminateSession = async () => {
    const cleanToken = sanitizeInput(sessionToken);
    
    if (!cleanToken) {
      alert('Please provide session token');
      return;
    }

    try {
      setIsTerminating(true);
      await ksefApi.terminateSession(cleanToken);
      alert('Session terminated successfully');
      setSessionToken('');
      setReferenceNumber('');
      setInvoiceStatus(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to terminate session: ${errorMessage}`);
      console.error('Terminate session error:', error);
    } finally {
      setIsTerminating(false);
    }
  };

  const onInvoiceFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File is too large. Maximum size is 10MB.');
      e.target.value = '';
      return;
    }
    
    try {
      setIsLoadingFile(true);
      const text = await file.text();
      const cleanText = sanitizeInput(text);
      
      const xmlError = validateXml(cleanText);
      if (xmlError) {
        alert(`Invalid XML file:\n${xmlError}`);
        return;
      }
      
      setInvoiceXml(cleanText);
      alert('XML file loaded successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to read file';
      alert(`Error loading file: ${errorMessage}`);
      console.error('File loading error:', error);
    } finally {
      setIsLoadingFile(false);
      e.target.value = '';
    }
  };

  const generateSampleInvoice = () => {
    const nowIso = new Date().toISOString();
    const dateOnly = nowIso.split('T')[0];
    const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (2)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>${nowIso}</DataWytworzeniaFa>
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
    <P_1>${dateOnly}</P_1>
    <P_6>${dateOnly}</P_6>
  </Fa>
</Faktura>`;
    setInvoiceXml(sampleXml);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Active company banner */}
      {activeCompany ? (
        <div className="mb-4 p-3 rounded border bg-gray-50">
          <div className="text-sm">
            Active company: <strong>{activeCompany.name}</strong>
            {activeCompany.nip ? ` (NIP: ${activeCompany.nip})` : activeCompany.regon ? ` (REGON: ${activeCompany.regon})` : ''}
            {' '}• Environment: <span className="px-2 py-0.5 rounded bg-white border">{activeCompany.environment}</span>
          </div>
        </div>
      ) : (
        <div className="mb-4 p-3 rounded border bg-amber-50">
          <div className="text-sm">No active company selected. Add/select one in Create Invoice or Settings.</div>
        </div>
      )}

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
            disabled={isSending || isChecking || isTerminating}
          />
        </div>

        {/* Invoice XML */}
        <div>
          <label className="block text-sm font-medium mb-2">Invoice XML</label>
          <textarea
            className="border rounded w-full px-3 py-2 h-40 font-mono text-sm"
            value={invoiceXml}
            onChange={(e) => setInvoiceXml(e.target.value)}
            placeholder="Paste your invoice XML here"
            disabled={isSending || isLoadingFile}
          />
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <button
              onClick={generateSampleInvoice}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-60"
              type="button"
              disabled={isSending || isLoadingFile}
            >
              Generate Sample Invoice XML
            </button>
            <label className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer disabled:opacity-60">
              <input
                type="file"
                accept=".xml,text/xml,application/xml"
                onChange={onInvoiceFileSelected}
                className="hidden"
                disabled={isSending || isLoadingFile}
              />
              {isLoadingFile ? 'Loading...' : 'Load XML from file'}
            </label>
          </div>
        </div>

        {/* Send Invoice */}
        <button
          onClick={sendInvoice}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={isSending || !sessionToken.trim() || !invoiceXml.trim() || isLoadingFile}
        >
          {isSending ? 'Sending...' : 'Send Invoice'}
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
            disabled={isChecking || isSending || isTerminating}
          />
          <button
            onClick={checkInvoiceStatus}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
            disabled={isChecking || !sessionToken.trim() || !referenceNumber.trim() || isSending || isTerminating}
          >
            {isChecking ? 'Checking...' : 'Check Invoice Status'}
          </button>
        </div>

        {/* Status Display */}
        {invoiceStatus && (
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium mb-2">Invoice Status:</h3>
            <div className="bg-white p-2 rounded border">
              <pre className="text-sm overflow-auto max-h-60">{JSON.stringify(invoiceStatus, null, 2)}</pre>
            </div>
          </div>
        )}

        <hr className="my-6" />

        {/* Terminate Session */}
        <button
          onClick={terminateSession}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-60"
          disabled={isTerminating || !sessionToken.trim() || isSending || isChecking}
        >
          {isTerminating ? 'Terminating...' : 'Terminate Session'}
        </button>
      </div>
    </div>
  );
};

export default SendInvoicePage;
