import DashboardLayout from "../layout/AppLayout"
import { useState } from "react"
import { saveAs } from "file-saver"
import * as forge from "node-forge"

export default function SettingsPage() {
  const [nip, setNip] = useState("")
  const [orgName, setOrgName] = useState("")

  const generateCertificate = () => {
    const keys = forge.pki.rsa.generateKeyPair(2048)
    const cert = forge.pki.createCertificate()

    cert.publicKey = keys.publicKey
    cert.serialNumber = (Math.floor(Math.random() * 1e16)).toString()
    cert.validity.notBefore = new Date()
    cert.validity.notAfter = new Date()
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1)

    const attrs = [
      { name: 'countryName', value: 'PL' },
      { name: 'organizationName', value: orgName || 'Test Org' },
      { name: 'commonName', value: 'KSeF Test Certificate' },
      {
        type: '2.5.4.97', // organizationIdentifier
        value: `VATPL.${nip}`
      }
    ]

    cert.setSubject(attrs)
    cert.setIssuer(attrs)
    cert.sign(keys.privateKey, forge.md.sha256.create())

    const p12Asn1 = forge.pkcs12.toPkcs12Asn1(
      keys.privateKey,
      cert,
      '', // no password
      { algorithm: '3des' }
    )

    const p12Der = forge.asn1.toDer(p12Asn1).getBytes()
    const blob = new Blob([new Uint8Array(forge.util.createBuffer(p12Der).toHex().match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)))], {
      type: 'application/x-pkcs12'
    })

    saveAs(blob, `ksef-cert-${nip}.p12`)
  }

  return (
    <DashboardLayout title="Settings" description="Manage company and signature settings">
      <div className="text-xl font-bold text-gray-700 mb-4">Test Certificate Generator</div>
      <div className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="NIP"
          className="border px-3 py-2 rounded w-full"
          value={nip}
          onChange={(e) => setNip(e.target.value)}
        />
        <input
          type="text"
          placeholder="Organization Name"
          className="border px-3 py-2 rounded w-full"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />
        <button
          onClick={generateCertificate}
          disabled={!nip.trim()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Generate Test Certificate (.p12)
        </button>
        {nip && (
          <p className="text-sm text-gray-600">
            📋 Will generate certificate for NIP: <strong>{nip}</strong>
          </p>
        )}
      </div>
    </DashboardLayout>
  )
}
