"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});var t=require("react"),ne=require("react-codemirror6"),k=require("@codemirror/view"),L=require("@codemirror/state"),se=require("@codemirror/lang-javascript"),c=require("@codemirror/highlight"),ce=require("react-hook-inview"),le=require("@strudel.cycles/eval"),ie=require("@strudel.cycles/core/util.mjs"),y=require("@strudel.cycles/tone"),$=require("@strudel.cycles/core"),C=require("@strudel.cycles/midi");function ue(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var g=ue(t);const de="#abb2bf",fe="#7d8799",ge="#ffffff",me="#21252b",K="rgba(0, 0, 0, 0.5)",be="transparent",V="#353a42",pe="rgba(128, 203, 196, 0.5)",A="#ffcc00",he=k.EditorView.theme({"&":{color:"#ffffff",backgroundColor:be,fontSize:"15px","z-index":11},".cm-content":{caretColor:A,lineHeight:"22px"},".cm-line":{background:"transparent"},".cm-line > *":{background:"#00000090"},"&.cm-focused .cm-cursor":{backgroundColor:A,width:"3px"},"&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":{backgroundColor:pe},".cm-panels":{backgroundColor:me,color:"#ffffff"},".cm-panels.cm-panels-top":{borderBottom:"2px solid black"},".cm-panels.cm-panels-bottom":{borderTop:"2px solid black"},".cm-searchMatch":{backgroundColor:"#72a1ff59",outline:"1px solid #457dff"},".cm-searchMatch.cm-searchMatch-selected":{backgroundColor:"#6199ff2f"},".cm-activeLine":{backgroundColor:A+"50"},".cm-selectionMatch":{backgroundColor:"#aafe661a"},"&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket":{backgroundColor:"#bad0f847",outline:"1px solid #515a6b"},".cm-gutters":{background:"transparent",color:"#676e95",border:"none"},".cm-activeLineGutter":{backgroundColor:K},".cm-foldPlaceholder":{backgroundColor:"transparent",border:"none",color:"#ddd"},".cm-tooltip":{border:"none",backgroundColor:V},".cm-tooltip .cm-tooltip-arrow:before":{borderTopColor:"transparent",borderBottomColor:"transparent"},".cm-tooltip .cm-tooltip-arrow:after":{borderTopColor:V,borderBottomColor:V},".cm-tooltip-autocomplete":{"& > ul > li[aria-selected]":{backgroundColor:K,color:de}}},{dark:!0}),ve=c.HighlightStyle.define([{tag:c.tags.keyword,color:"#c792ea"},{tag:c.tags.operator,color:"#89ddff"},{tag:c.tags.special(c.tags.variableName),color:"#eeffff"},{tag:c.tags.typeName,color:"#f07178"},{tag:c.tags.atom,color:"#f78c6c"},{tag:c.tags.number,color:"#ff5370"},{tag:c.tags.definition(c.tags.variableName),color:"#82aaff"},{tag:c.tags.string,color:"#c3e88d"},{tag:c.tags.special(c.tags.string),color:"#f07178"},{tag:c.tags.comment,color:fe},{tag:c.tags.variableName,color:"#f07178"},{tag:c.tags.tagName,color:"#ff5370"},{tag:c.tags.bracket,color:"#a2a1a4"},{tag:c.tags.meta,color:"#ffcb6b"},{tag:c.tags.attributeName,color:"#c792ea"},{tag:c.tags.propertyName,color:"#c792ea"},{tag:c.tags.className,color:"#decb6b"},{tag:c.tags.invalid,color:ge}]),ye=[he,ve],z=L.StateEffect.define(),we=L.StateField.define({create(){return k.Decoration.none},update(e,a){try{for(let n of a.effects)if(n.is(z))if(n.value){const u=k.Decoration.mark({attributes:{style:"background-color: #FFCA2880"}});e=k.Decoration.set([u.range(0,a.newDoc.length)])}else e=k.Decoration.set([]);return e}catch(n){return console.warn("flash error",n),e}},provide:e=>k.EditorView.decorations.from(e)}),G=e=>{e.dispatch({effects:z.of(!0)}),setTimeout(()=>{e.dispatch({effects:z.of(!1)})},200)},P=L.StateEffect.define(),Ce=L.StateField.define({create(){return k.Decoration.none},update(e,a){try{for(let n of a.effects)n.is(P)&&(e=k.Decoration.set(n.value.flatMap(u=>(u.context.locations||[]).map(({start:d,end:l})=>{const i=u.context.color||"#FFCA28";let m=a.newDoc.line(d.line).from+d.column,r=a.newDoc.line(l.line).from+l.column;const s=a.newDoc.length;return m>s||r>s?void 0:k.Decoration.mark({attributes:{style:`outline: 1.5px solid ${i};`}}).range(m,r)})).filter(Boolean),!0));return e}catch{return e}},provide:e=>k.EditorView.decorations.from(e)});function J({value:e,onChange:a,onViewChanged:n,onCursor:u,options:d,editorDidMount:l}){return g.default.createElement(g.default.Fragment,null,g.default.createElement(ne.CodeMirror,{onViewChange:n,style:{display:"flex",flexDirection:"column",flex:"1 0 auto"},value:e,onChange:a,extensions:[se.javascript(),ye,Ce,we]}))}function X(e){const{onEvent:a,onQuery:n,onSchedule:u,ready:d=!0,onDraw:l}=e,[i,m]=t.useState(!1),r=1,s=()=>Math.floor(y.Tone.getTransport().seconds/r),M=(p=s())=>{const S=new $.TimeSpan(p,p+1),N=n?.(new $.State(S))||[];u?.(N,p);const B=S.begin.valueOf();y.Tone.getTransport().cancel(B);const w=(p+1)*r-.5,q=Math.max(y.Tone.getTransport().seconds,w)+.1;y.Tone.getTransport().schedule(()=>{M(p+1)},q),N?.filter(h=>h.part.begin.equals(h.whole?.begin)).forEach(h=>{y.Tone.getTransport().schedule(v=>{a(v,h,y.Tone.getContext().currentTime),y.Tone.Draw.schedule(()=>{l?.(v,h)},v)},h.part.begin.valueOf())})};t.useEffect(()=>{d&&M()},[a,u,n,l,d]);const E=async()=>{m(!0),await y.Tone.start(),y.Tone.getTransport().start("+0.1")},T=()=>{y.Tone.getTransport().pause(),m(!1)};return{start:E,stop:T,onEvent:a,started:i,setStarted:m,toggle:()=>i?T():E(),query:M,activeCycle:s}}function Y(e){return t.useEffect(()=>(window.addEventListener("message",e),()=>window.removeEventListener("message",e)),[e]),t.useCallback(a=>window.postMessage(a,"*"),[])}let ke=()=>Math.floor((1+Math.random())*65536).toString(16).substring(1);const Me=e=>encodeURIComponent(btoa(e));function Z({tune:e,defaultSynth:a,autolink:n=!0,onEvent:u,onDraw:d}){const l=t.useMemo(()=>ke(),[]),[i,m]=t.useState(e),[r,s]=t.useState(),[M,E]=t.useState(""),[T,x]=t.useState(),[p,S]=t.useState(!1),[N,B]=t.useState(""),[w,q]=t.useState(),h=t.useMemo(()=>i!==r||T,[i,r,T]),v=t.useCallback(f=>E(o=>o+`${o?`

`:""}${f}`),[]),F=t.useMemo(()=>{if(r&&!r.includes("strudel disable-highlighting"))return(f,o)=>d?.(f,o,r)},[r,d]),W=t.useMemo(()=>r&&r.includes("strudel hide-header"),[r]),H=t.useMemo(()=>r&&r.includes("strudel hide-console"),[r]),b=X({onDraw:F,onEvent:t.useCallback((f,o,oe)=>{try{u?.(o),o.context.logs?.length&&o.context.logs.forEach(v);const{onTrigger:D,velocity:ae}=o.context;if(D)D(f,o,oe,1);else if(a){const re=ie.getPlayableNoteValue(o);a.triggerAttackRelease(re,o.duration.valueOf(),f,ae)}else throw new Error("no defaultSynth passed to useRepl.")}catch(D){console.warn(D),D.message="unplayable event: "+D?.message,v(D.message)}},[u,v,a]),onQuery:t.useCallback(f=>{try{return w?.query(f)||[]}catch(o){return console.warn(o),o.message="query error: "+o.message,x(o),[]}},[w]),onSchedule:t.useCallback((f,o)=>te(f,o),[]),ready:!!w&&!!r}),O=Y(({data:{from:f,type:o}})=>{o==="start"&&f!==l&&(b.setStarted(!1),s(void 0))}),I=t.useCallback(async(f=i)=>{if(r&&!h){x(void 0),b.start();return}try{S(!0);const o=await le.evaluate(f);b.start(),O({type:"start",from:l}),q(()=>o.pattern),n&&(window.location.hash="#"+encodeURIComponent(btoa(i))),B(Me(i)),x(void 0),s(f),S(!1)}catch(o){o.message="evaluation error: "+o.message,console.warn(o),x(o)}},[r,h,i,b,n,l,O]),te=(f,o)=>{f.length};return{hideHeader:W,hideConsole:H,pending:p,code:i,setCode:m,pattern:w,error:T,cycle:b,setPattern:q,dirty:h,log:M,togglePlay:()=>{b.started?b.stop():I()},setActiveCode:s,activateCode:I,activeCode:r,pushLog:v,hash:N}}function j(...e){return e.filter(Boolean).join(" ")}let R=[],Q;function ee({view:e,pattern:a,active:n}){t.useEffect(()=>{if(e)if(a&&n){let d=function(){try{const l=y.Tone.getTransport().seconds,m=[Math.max(Q||l,l-1/10),l+1/60];Q=l+1/60,R=R.filter(s=>s.whole.end>l);const r=a.queryArc(...m).filter(s=>s.hasOnset());R=R.concat(r),e.dispatch({effects:P.of(R)})}catch{e.dispatch({effects:P.of([])})}u=requestAnimationFrame(d)},u=requestAnimationFrame(d);return()=>{cancelAnimationFrame(u)}}else R=[],e.dispatch({effects:P.of([])})},[a,n,e])}const Ee="_container_1eogc_1",Te="_header_1eogc_5",xe="_buttons_1eogc_9",_e="_button_1eogc_9",Se="_buttonDisabled_1eogc_17",De="_error_1eogc_21",Ne="_body_1eogc_25";var _={container:Ee,header:Te,buttons:xe,button:_e,buttonDisabled:Se,error:De,body:Ne};function U({type:e}){return g.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"sc-h-5 sc-w-5",viewBox:"0 0 20 20",fill:"currentColor"},{refresh:g.default.createElement("path",{fillRule:"evenodd",d:"M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z",clipRule:"evenodd"}),play:g.default.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",clipRule:"evenodd"}),pause:g.default.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z",clipRule:"evenodd"})}[e])}function qe({tune:e,defaultSynth:a,hideOutsideView:n=!1,theme:u,init:d,onEvent:l,enableKeyboard:i}){const{code:m,setCode:r,pattern:s,activeCode:M,activateCode:E,evaluateOnly:T,error:x,cycle:p,dirty:S,togglePlay:N,stop:B}=Z({tune:e,defaultSynth:a,autolink:!1,onEvent:l});t.useEffect(()=>{d&&T()},[e,d]);const[w,q]=t.useState(),[h,v]=ce.useInView({threshold:.01}),F=t.useRef(),W=t.useMemo(()=>((v||!n)&&(F.current=!0),v||F.current),[v,n]);return ee({view:w,pattern:s,active:p.started&&!M?.includes("strudel disable-highlighting")}),t.useLayoutEffect(()=>{if(i){const H=async b=>{(b.ctrlKey||b.altKey)&&(b.code==="Enter"?(b.preventDefault(),G(w),await E()):b.code==="Period"&&(p.stop(),b.preventDefault()))};return window.addEventListener("keydown",H,!0),()=>window.removeEventListener("keydown",H,!0)}},[i,s,m,E,p,w]),g.default.createElement("div",{className:_.container,ref:h},g.default.createElement("div",{className:_.header},g.default.createElement("div",{className:_.buttons},g.default.createElement("button",{className:j(_.button,p.started?"sc-animate-pulse":""),onClick:()=>N()},g.default.createElement(U,{type:p.started?"pause":"play"})),g.default.createElement("button",{className:j(S?_.button:_.buttonDisabled),onClick:()=>E()},g.default.createElement(U,{type:"refresh"}))),x&&g.default.createElement("div",{className:_.error},x.message)),g.default.createElement("div",{className:_.body},W&&g.default.createElement(J,{value:m,onChange:r,onViewChanged:q})))}function Re(e){const{ready:a,connected:n,disconnected:u}=e,[d,l]=t.useState(!0),[i,m]=t.useState(C.WebMidi?.outputs||[]);return t.useEffect(()=>{C.enableWebMidi().then(()=>{C.WebMidi.addListener("connected",s=>{m([...C.WebMidi.outputs]),n?.(C.WebMidi,s)}),C.WebMidi.addListener("disconnected",s=>{m([...C.WebMidi.outputs]),u?.(C.WebMidi,s)}),a?.(C.WebMidi),l(!1)}).catch(s=>{if(s){console.error(s),console.warn("Web Midi could not be enabled..");return}})},[a,n,u,i]),{loading:d,outputs:i,outputByName:s=>C.WebMidi.getOutputByName(s)}}exports.CodeMirror=J;exports.MiniRepl=qe;exports.cx=j;exports.flash=G;exports.useCycle=X;exports.useHighlighting=ee;exports.usePostMessage=Y;exports.useRepl=Z;exports.useWebMidi=Re;
