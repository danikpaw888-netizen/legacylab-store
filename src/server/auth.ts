import {hashPassword,verifyPassword} from './password';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './auth-schema';
export function auth(env:Env) {
 return betterAuth({
  appName:'LegacyLab',baseURL:env.BASE_URL,secret:env.BETTER_AUTH_SECRET,
  database:drizzleAdapter(drizzle(env.DB,{schema}),{provider:'sqlite',schema,transaction:false}),
  trustedOrigins:[env.BASE_URL],
  user:{additionalFields:{role:{type:'string',defaultValue:'user',input:false}}},
  emailAndPassword:{enabled:true,password:{hash:hashPassword,verify:verifyPassword},minPasswordLength:10,maxPasswordLength:128,revokeSessionsOnPasswordReset:true,
   sendResetPassword:async({user,url})=>{
    if(!env.RESEND_API_KEY || !env.MAIL_FROM) throw new Error('MAIL_NOT_CONFIGURED');
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:env.MAIL_FROM,to:[user.email],subject:'Восстановление доступа — LegacyLab',text:'Для смены пароля откройте ссылку: '+url+'\nЕсли вы не запрашивали смену пароля, проигнорируйте письмо.'})});
    if(!response.ok) throw new Error('MAIL_DELIVERY_FAILED');
   }},
  advanced:{useSecureCookies:env.BASE_URL.startsWith('https:'),defaultCookieAttributes:{httpOnly:true,sameSite:'lax'},disableOriginCheck:false},
  session:{expiresIn:60*60*24*7,updateAge:60*60*24},
  rateLimit:{enabled:false},
  logger:{disabled:true}
 });
}
