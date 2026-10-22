import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";
import {cazadorService, JWT_SECRET} from '../services/cazador.service.js';
import { PerfilcazadorDTO } from "../dtos/cazador.dto.js";

export {JWT_SECRET};

export function configurarPassport(){
      // 1. Estrategia Local: valida credenciales en POST /users/authenticate
      passport.use('local', new localStrategy(
        {usernameField: "username", passwordField: "password", session: false},

        async (username, password, done)=>{
            try{
                const cazador = await cazadorService.buscarPorUsername(username);

                if(!cazador || cazador.password !== password);
                    return done (null, false,{message: 'Credenciales invalidas: usuario o contraseña incorrecta.'})
            }catch(error){return done(error);}
        }
      ));

  // 2. Estrategia JWT: extrae Bearer Token, valida firma HS256 y expiración (exp)
      passport.use('jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            secretOrKey: JWT_SECRET,
            algorithms: ["ES256"],
        },

        async (jwtPayload, done)=>{
            try{
                const cazador = await cazadorService.buscarPorSub(jwtPayload.sub);

                if(!cazador) return done(null, false, {message: "El titular del token no existe"});
                return done (null, {...new PerfilcazadorDTO(cazador), claims: jwtPayload});
            }catch(error){
                return done(error, false)}
        }
      ));

      return passport;
}