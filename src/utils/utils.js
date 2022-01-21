import jwt_decode from 'jwt-decode'
import { SERVER_URL } from "./constants";

export const phetch = async (route, request) => {
    let response = await fetch(SERVER_URL + route, {
        headers: { 
            'Authorization': sessionStorage.token, 
            'Content-Type': 'application/json', 
            ...request.headers
        },
        method: request.method,
        body: JSON.stringify({...request.body})
    })
    return response
}

export function isTokenAlive(){
    try{
        if(!sessionStorage.getItem("token")) return false;
        const token = sessionStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        if (Date.now() >= decodedToken?.exp * 1000) {
            return false;
        }
        return !!decodedToken;
    } catch(err){
        console.log(err.message)
    }
}

export function getToken(){
    try{
        const token = sessionStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        return decodedToken
    } catch(err){
        console.log(err.message)
    }
}

export const clsx = (...args) => 
    args.map(arg => 
        isObject(arg) ? Object.entries(arg).reduce((p, [k, v])=>`${p} ${v ? k : ""}`.trim(),"").trim()
        : isArray(arg) ? clsx(...arg)
        : isString(arg) ? arg.trim() 
        : ""
    ).join(" ").trim()

    
export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const isNumber = v => typeof v === 'number' && !isNaN(v)
export const isNull = v => v === null
export const isUndefined = v => v === undefined
export const isNullish = v => v == undefined
export const isObject = v =>  !!v && typeof v === 'object' && !Array.isArray(v)
export const isString = v =>  typeof v === 'string'
export const isFunction = v =>  typeof v === 'function'
export const isArray = v =>  Array.isArray(v)
export const isBoolean = v => typeof v === 'boolean'
export const isUpperCase = v => v === v.toUpperCase()
export const isLowerCase = v => v === v.toLowerCase()

export const toNumber = v => +v
export const toString = v => v+''
export const toBoolean = v => !!v