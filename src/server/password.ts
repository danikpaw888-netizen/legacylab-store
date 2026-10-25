import {randomBytes,scrypt,timingSafeEqual} from 'node:crypto';
// Same scrypt parameters and serialized format as Better Auth. Native crypto avoids
// the pure-JavaScript fallback when bundling for Cloudflare's workerd condition.
const options={N:16384,r:16,p:1,maxmem:128*16384*16*2};
const key=(password:string,salt:string)=>new Promise<Buffer>((resolve,reject)=>{
 scrypt(password.normalize('NFKC'),salt,64,options,(error,result)=>error?reject(error):resolve(result));
});
export async function hashPassword(password:string):Promise<string>{
 const salt=randomBytes(16).toString('hex');
 return salt+':'+(await key(password,salt)).toString('hex');
}
export async function verifyPassword({hash,password}:{hash:string;password:string}):Promise<boolean>{
 const [salt,expected,...rest]=hash.split(':');
 if(rest.length||!salt||!expected||!/^[a-f0-9]{32}$/.test(salt)||!/^[a-f0-9]{128}$/.test(expected))return false;
 const actual=await key(password,salt),stored=Buffer.from(expected,'hex');
 return actual.length===stored.length&&timingSafeEqual(actual,stored);
}
