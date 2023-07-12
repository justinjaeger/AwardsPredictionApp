// @ts-ignore
import crypto from '../../polyfill/crypto';
import { JWT_SECRET } from '../../config';

function encodeBase64(str: string) {
  return Buffer.from(str, 'binary').toString('base64');
}

function decodeBase64(str: string) {
  return Buffer.from(str, 'base64').toString('binary');
}

function stringify(obj: any) {
  return JSON.stringify(obj);
}

/* Takes head and body encoded as base64
 * and return a hash(head + "." + body,secret)
 */
function checkSumGen(head: string, body: string) {
  const checkSumStr = head + '.' + body;
  // @ts-ignore
  const hash = crypto.createHmac('sha256', JWT_SECRET);
  const checkSum = hash.update(checkSumStr).digest('base64').toString('utf8');
  return checkSum;
}

const alg = { alg: 'HS256', typ: 'JWT' };

/**
 * takes a payload, adds an expiration to it
 * follows jwt algorithm,
 * returns a jwt string
 */
const encode = <T>(payload: T, exp?: number) => {
  // create expiration on payload if expires is true
  const payloadWithExp: T & { exp: number | undefined } = {
    ...payload,
    exp,
  };
  let result = '';
  const header = encodeBase64(stringify(alg));
  console.log('header', header);
  result += header + '.';
  const body = encodeBase64(stringify(payloadWithExp));
  console.log('body', body);
  result += body + '.';

  const checkSum = checkSumGen(header, body);
  result += checkSum;
  return result;
};

/**
 * takes a JWT string, parses the head and payload
 * computes the signature, compares if the two signatures are equal
 * verifies if is expired
 * return the payload as an object, or undefined if invalid
 */
const decode = <T>(str: string): T | undefined => {
  const jwtArr = str.split('.');
  const head = jwtArr[0];
  const body = jwtArr[1];
  const hash = jwtArr[2];
  const checkSum = checkSumGen(head, body);

  if (hash === checkSum) {
    console.log('JWT authenticated!');
    const decoded = JSON.parse(decodeBase64(body)) as T;
    // verify if JWT is expired, if exp is a field on it
    // @ts-ignore
    const { exp } = decoded || {};
    const now = new Date().getTime();
    if (exp && now > exp) {
      console.log('JWT expired');
      return undefined;
    }
    return decoded;
  } else {
    console.log('JWT NOT authenticated');
    return undefined;
  }
};

const CryptoService = {
  encode,
  decode,
};

export default CryptoService;
