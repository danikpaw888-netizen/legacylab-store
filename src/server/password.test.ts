import {describe,it,expect} from 'vitest';
import {hashPassword,verifyPassword} from './password';
describe('native scrypt password hashing',()=>{
 it('uses a fresh salt and verifies only the correct normalized password',async()=>{
  const password='Legacy-'+String.fromCodePoint(0x00e9)+'-secure-2026';
  const hash=await hashPassword(password);
  expect(hash).not.toContain(password);expect(await hashPassword(password)).not.toBe(hash);
  expect(await verifyPassword({hash,password:password.normalize('NFD')})).toBe(true);
  expect(await verifyPassword({hash,password:'wrong-password'})).toBe(false);
  expect(await verifyPassword({hash:'invalid-hash',password})).toBe(false);
 });
});
