import{S as Ae,i as Me,s as Ne,k as g,e as o,t as B,w as be,am as Le,d as s,m as E,c as i,a as c,h as C,x as ge,b as l,K as Ee,g as Q,J as e,ao as W,y as Se,L as Y,ah as Be,j as Ce,q as $e,o as Ie,B as ye,G as qe,I as Z}from"../../chunks/index-5927094f.js";import{V as De,f as Te,r as Ve,n as xe,a as Pe}from"../../chunks/required-1e16da63.js";import{c as Ue}from"../../chunks/chatbot-bca22043.js";import{t as we}from"../../chunks/SvelteToast.svelte_svelte_type_style_lang-9d6e0cc5.js";import{h as ke}from"../../chunks/http-90371e68.js";import{w as Oe}from"../../chunks/index-f4e83c97.js";import"../../chunks/local-storage-4242d675.js";function Re(a){return f=>({valid:(typeof f=="string"?f.length:isNaN(f)?0:parseFloat(f))<=a,name:"max"})}function je(){const{subscribe:a,set:f}=Oe();return{subscribe:a,async sendMessage(u,y){const v=`https://localhost:5001/api/v1/chatbots/${u}/messages`,n=await ke.post(v,y);return f(n.data),n}}}const Fe=je();function Ge(a){let f,u,y,v,n,_,d,b,D,M,p,U,S,k,m,r,ee,te,I,ae,T,N,O=a[2].value.length+"",H,se,R,re,le,V,ne,x,w,j,oe,ie,$,F,ue,J,q,ce,me;return S=new De({props:{field:a[1]}}),V=new De({props:{field:a[2]}}),{c(){f=g(),u=o("h1"),y=B("Sandbox"),v=g(),n=o("form"),_=o("div"),d=o("div"),b=o("label"),D=B("To"),M=g(),p=o("input"),U=g(),be(S.$$.fragment),k=g(),m=o("div"),r=o("label"),ee=B("Message"),te=g(),I=o("textarea"),ae=g(),T=o("div"),N=o("span"),H=B(O),se=g(),R=o("span"),re=B("/200"),le=g(),be(V.$$.fragment),ne=g(),x=o("div"),w=o("button"),j=o("div"),oe=B(`\r
      Clear`),ie=g(),$=o("button"),F=o("div"),ue=B(`\r
      Send`),this.h()},l(t){Le('[data-svelte="svelte-ij7i72"]',document.head).forEach(s),f=E(t),u=i(t,"H1",{class:!0});var G=c(u);y=C(G,"Sandbox"),G.forEach(s),v=E(t),n=i(t,"FORM",{class:!0});var L=c(n);_=i(L,"DIV",{class:!0});var K=c(_);d=i(K,"DIV",{class:!0});var P=c(d);b=i(P,"LABEL",{for:!0});var pe=c(b);D=C(pe,"To"),pe.forEach(s),M=E(P),p=i(P,"INPUT",{type:!0,id:!0,class:!0}),U=E(P),ge(S.$$.fragment,P),P.forEach(s),k=E(K),m=i(K,"DIV",{class:!0});var A=c(m);r=i(A,"LABEL",{for:!0});var he=c(r);ee=C(he,"Message"),he.forEach(s),te=E(A),I=i(A,"TEXTAREA",{id:!0,class:!0}),c(I).forEach(s),ae=E(A),T=i(A,"DIV",{class:!0});var X=c(T);N=i(X,"SPAN",{});var ve=c(N);H=C(ve,O),ve.forEach(s),se=E(X),R=i(X,"SPAN",{});var _e=c(R);re=C(_e,"/200"),_e.forEach(s),X.forEach(s),le=E(A),ge(V.$$.fragment,A),A.forEach(s),K.forEach(s),ne=E(L),x=i(L,"DIV",{class:!0});var z=c(x);w=i(z,"BUTTON",{class:!0});var de=c(w);j=i(de,"DIV",{class:!0}),c(j).forEach(s),oe=C(de,`\r
      Clear`),de.forEach(s),ie=E(z),$=i(z,"BUTTON",{type:!0,class:!0});var fe=c($);F=i(fe,"DIV",{class:!0}),c(F).forEach(s),ue=C(fe,`\r
      Send`),fe.forEach(s),z.forEach(s),L.forEach(s),this.h()},h(){document.title="Sandbox",l(u,"class","h3"),l(b,"for","to"),l(p,"type","text"),l(p,"id","to"),l(p,"class","field"),l(d,"class","form-item"),l(r,"for","message"),l(I,"id","message"),l(I,"class","field max-h-[200px]"),Ee(N,"text-red-400",a[2].value.length>200),l(T,"class","flex py-2 text-sm"),l(m,"class","form-item"),l(_,"class","form-group"),l(j,"class","i-fluent:broom-16-regular mr-2 text-2xl"),l(w,"class","btn btn-secondary"),l(F,"class","i-carbon:send-alt mr-2 text-2xl"),l($,"type","submit"),l($,"class","btn btn-blue"),$.disabled=J=!a[0],l(x,"class","actions-group"),l(n,"class","form")},m(t,h){Q(t,f,h),Q(t,u,h),e(u,y),Q(t,v,h),Q(t,n,h),e(n,_),e(_,d),e(d,b),e(b,D),e(d,M),e(d,p),W(p,a[1].value),e(d,U),Se(S,d,null),e(_,k),e(_,m),e(m,r),e(r,ee),e(m,te),e(m,I),W(I,a[2].value),e(m,ae),e(m,T),e(T,N),e(N,H),e(T,se),e(T,R),e(R,re),e(m,le),Se(V,m,null),e(n,ne),e(n,x),e(x,w),e(w,j),e(w,oe),e(x,ie),e(x,$),e($,F),e($,ue),q=!0,ce||(me=[Y(p,"input",a[9]),Y(I,"input",a[10]),Y(w,"click",a[11]),Y(n,"submit",Be(a[6]))],ce=!0)},p(t,[h]){h&2&&p.value!==t[1].value&&W(p,t[1].value);const G={};h&2&&(G.field=t[1]),S.$set(G),h&4&&W(I,t[2].value),(!q||h&4)&&O!==(O=t[2].value.length+"")&&Ce(H,O),h&4&&Ee(N,"text-red-400",t[2].value.length>200);const L={};h&4&&(L.field=t[2]),V.$set(L),(!q||h&1&&J!==(J=!t[0]))&&($.disabled=J)},i(t){q||($e(S.$$.fragment,t),$e(V.$$.fragment,t),q=!0)},o(t){Ie(S.$$.fragment,t),Ie(V.$$.fragment,t),q=!1},d(t){t&&s(f),t&&s(u),t&&s(v),t&&s(n),ye(S),ye(V),ce=!1,qe(me)}}}function He(a,f,u){let y,v,n,_,d;Z(a,Ue,r=>u(8,_=r));const b=Te(xe("to"),"",[Ve()]);Z(a,b,r=>u(1,v=r));const D=Te(xe("message"),"",[Ve(),Re(200)]);Z(a,D,r=>u(2,d=r));const M=Pe(b,D);Z(a,M,r=>u(7,n=r));let p;const U=()=>{Fe.sendMessage(y,n.summary).then(()=>{we.push(`Message was sent to ${v.value}`)}).catch(r=>{we.push(r)})};function S(){v.value=this.value,b.set(v)}function k(){d.value=this.value,D.set(d)}const m=()=>M.clear();return a.$$.update=()=>{var r;a.$$.dirty&256&&(y=((r=_.selectedChatbot)==null?void 0:r.id)||0),a.$$.dirty&128&&u(0,p=n.valid)},[p,v,d,b,D,M,U,n,_,S,k,m]}class Ze extends Ae{constructor(f){super(),Me(this,f,He,Ge,Ne,{})}}export{Ze as default};
