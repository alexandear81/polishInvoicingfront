import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { ksefApi } from '../services/ksefApi';
import * as forge from 'node-forge';

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
  const [certFile, setCertFile] = useState<File | null>(null);
  const [xmlToSign, setXmlToSign] = useState<string>('');

  const requestChallenge = async () => {
    try {
      const response = await ksefApi.requestChallenge({
        type: idType,
        identifier: idValue,
      });

      if (response.xmlToSign) {
        const xmlContent = atob(response.xmlToSign);
        setXmlToSign(xmlContent);
        const blob = new Blob([xmlContent], { type: 'application/xml' });
        saveAs(blob, 'InitSessionSignedRequest.xml');
        alert('XML file downloaded! Sign it with ePUAP/qualified certificate or use test certificate option below.');
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

  const handleCertChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCertFile(event.target.files[0]);
    }
  };

  const sendSignedXml = async () => {
    if (!file) return alert('Please select a file first.');

    try {
      const fileContent = await file.text();
      const base64Content = btoa(fileContent);
      const response = await ksefApi.requestSessionToken(base64Content);
      const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
      saveAs(blob, 'SessionToken.json');
      alert(`Session token generated successfully! Token saved to SessionToken.json file.`);
    } catch (error) {
      alert('Failed to generate session token');
      console.error(error);
    }
  };

  const signWithTestCertificate = async () => {
    if (!certFile || !xmlToSign) return alert('Please provide both the certificate and generate the XML first.');

    try {
      const p12ArrayBuffer = await certFile.arrayBuffer();
      const p12Buffer = forge.util.createBuffer(p12ArrayBuffer);
      const p12Asn1 = forge.asn1.fromDer(p12Buffer);
      const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, '');

      const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
      const certBags = p12.getBags({ bagType: forge.pki.oids.certBag });
      const privateKey = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag]?.[0]?.key as forge.pki.rsa.PrivateKey;
      const certificate = certBags[forge.pki.oids.certBag]?.[0]?.cert;

      const canonicalXml = xmlToSign.trim();
      const messageDigest = forge.md.sha256.create();
      messageDigest.update(canonicalXml, 'utf8');
      const digestValue = forge.util.encode64(messageDigest.digest().getBytes());
      const signature = privateKey.sign(messageDigest);
      const signatureValue = forge.util.encode64(signature);

      if (!certificate) {
        throw new Error('Certificate is undefined. Please check the provided .p12 file.');
      }
      const certPem = forge.pki.certificateToPem(certificate);
      const certBase64 = certPem.replace(/-----BEGIN CERTIFICATE-----\n?/, '')
        .replace(/\n?-----END CERTIFICATE-----\n?/, '')
        .replace(/\n/g, '');

      const signedXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<tns:InitSessionSignedRequest xmlns:tns="http://ksef.mf.gov.pl/schema/gtw/svc/online/auth/request/2021/10/01/0001" xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
  ${canonicalXml.replace('<?xml version="1.0" encoding="UTF-8"?>', '').trim()}
  <ds:Signature>
    <ds:SignedInfo>
      <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
      <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
      <ds:Reference URI="">
        <ds:Transforms>
          <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
          <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
        </ds:Transforms>
        <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
        <ds:DigestValue>${digestValue}</ds:DigestValue>
      </ds:Reference>
    </ds:SignedInfo>
    <ds:SignatureValue>${signatureValue}</ds:SignatureValue>
    <ds:KeyInfo>
      <ds:X509Data>
        <ds:X509Certificate>${certBase64}</ds:X509Certificate>
      </ds:X509Data>
    </ds:KeyInfo>
  </ds:Signature>
</tns:InitSessionSignedRequest>`;

      const blob = new Blob([signedXmlContent], { type: 'application/xml' });
      saveAs(blob, 'SignedInitSession.xml');
      alert('✅ XML signed successfully with test certificate!');
    } catch (error) {
      console.error('❌ Signing error:', error);
      alert(`❌ Failed to sign XML: ${error instanceof Error ? error.message : error}`);
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

        <hr className="my-6" />

        <div>
          <label className="block text-sm font-medium">Sign XML with TEST CERTIFICATE (.p12)</label>
          <input type="file" accept=".p12" onChange={handleCertChange} />
        </div>
        <button
          onClick={signWithTestCertificate}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Sign XML with TEST CERTIFICATE
        </button>
      </div>
    </div>
  );
};

export default RequestTokenPage;
