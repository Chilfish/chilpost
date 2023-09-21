import process from 'node:process'
import fs from 'fs-extra'
import { exportPKCS8, exportSPKI, generateKeyPair, importPKCS8, importSPKI } from 'jose'
import 'dotenv/config'

export const alg = 'ES256'

const {
  PRIVATE_KEY,
  PUBLIC_KEY,
} = process.env

export async function generateKeys() {
  const {
    publicKey: ecPublicKey,
    privateKey: ecPrivateKey,
  } = await generateKeyPair(alg)

  const [privateKey, publicKey] = await Promise.all([
    exportPKCS8(ecPrivateKey),
    exportSPKI(ecPublicKey),
  ])

  if (isDev) {
    await Promise.all([
      fs.writeFile('./private.pem', privateKey),
      fs.writeFile('./public.pem', publicKey),
    ])
  }

  return {
    ecPublicKey,
    ecPrivateKey,
    privateKey,
    publicKey,
  }
}

// vercel serverless function is read-only
export async function getKeys() {
  try {
    const [privateKey, publicKey] = isDev
      ? await Promise.all([
        fs.readFile('./private.pem', 'utf8'),
        fs.readFile('./public.pem', 'utf8'),
      ])
      : [PRIVATE_KEY, PUBLIC_KEY]

    const [ecPublicKey, ecPrivateKey] = await Promise.all([
      importSPKI(publicKey!, alg),
      importPKCS8(privateKey!, alg),
    ])

    return {
      privateKey,
      publicKey,
      ecPublicKey,
      ecPrivateKey,
    }
  }
  catch (error) {
    return await generateKeys()
  }
}
