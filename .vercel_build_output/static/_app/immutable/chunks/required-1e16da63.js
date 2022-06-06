var V=Object.defineProperty,j=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var E=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable;var b=(e,r,n)=>r in e?V(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n,h=(e,r)=>{for(var n in r||(r={}))L.call(r,n)&&b(e,n,r[n]);if(E)for(var n of E(r))$.call(r,n)&&b(e,n,r[n]);return e},w=(e,r)=>j(e,A(r));import{S as M,i as P,s as D,e as q,t as J,c as C,a as I,h as N,d as y,b as R,g as S,J as U,j as z,E as x,M as B,ac as g}from"./index-5927094f.js";import{d as G,w as H}from"./index-f4e83c97.js";function F(e,r,n){const t=e.slice();return t[2]=r[n],t}function k(e){let r,n=e[1].get(e[2])+"",t;return{c(){r=q("p"),t=J(n),this.h()},l(a){r=C(a,"P",{class:!0});var l=I(r);t=N(l,n),l.forEach(y),this.h()},h(){R(r,"class","text-sm text-red-500 dark:text-red-400")},m(a,l){S(a,r,l),U(r,t)},p(a,l){l&1&&n!==(n=a[1].get(a[2])+"")&&z(t,n)},d(a){a&&y(r)}}}function K(e){let r,n=e[0].errors,t=[];for(let a=0;a<n.length;a+=1)t[a]=k(F(e,n,a));return{c(){r=q("div");for(let a=0;a<t.length;a+=1)t[a].c()},l(a){r=C(a,"DIV",{});var l=I(r);for(let i=0;i<t.length;i+=1)t[i].l(l);l.forEach(y)},m(a,l){S(a,r,l);for(let i=0;i<t.length;i+=1)t[i].m(r,null)},p(a,[l]){if(l&3){n=a[0].errors;let i;for(i=0;i<n.length;i+=1){const d=F(a,n,i);t[i]?t[i].p(d,l):(t[i]=k(d),t[i].c(),t[i].m(r,null))}for(;i<t.length;i+=1)t[i].d(1);t.length=n.length}},i:x,o:x,d(a){a&&y(r),B(t,a)}}}function Q(e,r,n){let{field:t}=r;const a=new Map([["required","El campo es requerido."],["pattern","El valor actual no coincide con la expresi\xF3n regular."],["between","El valor ingresado no est\xE1 dentro del rango."],["email","El correo electr\xF3nico es inv\xE1lido."],["url","El valor ingresado NO es una URL v\xE1lida."],["min","La longitud del valor ingresado es inferior al m\xEDnimo permitido."],["max","La longitud del valor ingresado es mayor al m\xE1ximo permitido."]]);return e.$$set=l=>{"field"in l&&n(0,t=l.field)},[t,a]}class ne extends M{constructor(r){super(),P(this,r,Q,K,D,{field:0})}}const ae=e=>e;function ie(...e){let r=[],n=[];if(e.forEach(o=>{const s=g(o);r.includes(s.name)?n=n.includes(s.name)?n:[...n,s.name]:r=[...r,s.name]}),n.length)throw new Error(`Cannot have the fields with the same name: ${n.join(", ")}`);const t=G(e,o=>({valid:o.every(s=>s.valid),dirty:o.some(s=>s.dirty),get summary(){return o.reduce((s,c)=>(s[c.name]=c.value,s),{})},errors:o.map(s=>s.errors.map(c=>c.includes(".")?c:`${s.name}.${c}`)).flat().filter((s,c,u)=>u.indexOf(s)===c),hasError(s){return this.errors.findIndex(c=>c===s)!==-1}})),{subscribe:a}=t;function l(){e.forEach(o=>o.reset&&o.reset())}function i(){e.forEach(o=>o.clear&&o.clear())}async function d(){for(const o of e)o.validate&&await o.validate()}function f(o){return e.find(s=>g(s).name===o)}function p(){return g(t).summary}return{subscribe:a,reset:l,validate:d,getField:f,summary:p,clear:i}}function T(e){return!!e&&(typeof e=="object"||typeof e=="function")&&typeof e.then=="function"}const W={valid:!0,checkOnInit:!1,validateOnChange:!0,stopAtFirstError:!1};function X(e){const r=Object.keys(e);return["name","value","valid","invalid","errors"].every(n=>r.includes(n))}function Y(e){const r=function(t){return e.subscribe!==void 0},n=function(t){return!!e.name&&e.valid!==void 0};return r()?g(e).value:n()?e.value:e}async function O(e,r,n=!1){const t=Y(e);let a=[];for(const l of r){let i=l(t);if(T(i)&&(i=await i),n&&!i.valid){a=[i];break}a=[...a,i]}return a}function m(e,r,n={}){if(r){const t=r.filter(l=>!l.valid).map(l=>l.name),a=!t.length;return h(w(h({},e),{valid:a,invalid:!a,errors:t}),n)}return e}function Z(e,r,n=[],t){const a={name:e,value:r,valid:t.valid,invalid:!t.valid,dirty:!1,errors:[]},l=H(a),{subscribe:i,update:d,set:f}=l;async function p(u,v=!1){if(X(u)||(u=m(g(l),[],{value:u})),v||t.validateOnChange){let _=await O(u,n,t.stopAtFirstError);f(m(u,_,{dirty:!0}))}else f(m(u,null,{dirty:!0}))}async function o(){const u=await O(l,n,t.stopAtFirstError);let v;return d(_=>(v=m(_,u,{dirty:!1}),v)),v}function s(){f(m({dirty:!1,errors:[],name:e,valid:t.valid,invalid:!t.valid,value:r}))}t.checkOnInit&&p(a);function c(){f(m({dirty:!1,errors:[],name:e,valid:t.valid,invalid:!t.valid,value:null}))}return{subscribe:i,update:d,set:p,validate:o,reset:s,clear:c}}function le(e,r,n,t={}){return Z(e,r,n,h(h({},W),t))}function se(){return e=>{let r=!0;return e==null&&(r=!1),typeof e=="string"&&(r=e.replace(/\s/g,"").length>0),{valid:r,name:"required"}}}export{ne as V,ie as a,le as f,ae as n,se as r};
