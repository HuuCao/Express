import sha256 from 'crypto-js/sha256'
import hmacSHA512 from 'crypto-js/hmac-sha512'
import Base64 from 'crypto-js/enc-base64'

const encrypt = (data) => {
  const hashDigest = sha256(data)
  const hmacDigest = Base64.stringify(
    hmacSHA512(hashDigest, process.env.HMAC_TOKEN_KEY)
  )
  return hmacDigest
  // cry.AES.encrypt(data, process.env.HMAC_TOKEN_KEY).toString()
}

export default encrypt
