(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function r(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=r(i);fetch(i.href,a)}})();var Jr=globalThis,$i=Jr.ShadowRoot&&(Jr.ShadyCSS===void 0||Jr.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ki=Symbol(),oa=new WeakMap,Qs=class{constructor(e,r,o){if(this._$cssResult$=!0,o!==ki)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o,r=this.t;if($i&&e===void 0){let o=r!==void 0&&r.length===1;o&&(e=oa.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&oa.set(r,e))}return e}toString(){return this.cssText}},Nl=t=>new Qs(typeof t=="string"?t:t+"",void 0,ki),E=(t,...e)=>new Qs(t.length===1?t[0]:e.reduce((r,o,i)=>r+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]),t,ki),Il=(t,e)=>{if($i)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(let r of e){let o=document.createElement("style"),i=Jr.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=r.cssText,t.appendChild(o)}},ia=$i?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(let o of e.cssRules)r+=o.cssText;return Nl(r)})(t):t,{is:Ll,defineProperty:Pl,getOwnPropertyDescriptor:Tl,getOwnPropertyNames:Ol,getOwnPropertySymbols:Rl,getPrototypeOf:Bl}=Object,Co=globalThis,aa=Co.trustedTypes,Hl=aa?aa.emptyScript:"",Dl=Co.reactiveElementPolyfillSupport,cr=(t,e)=>t,ao={toAttribute(t,e){switch(e){case Boolean:t=t?Hl:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},Ci=(t,e)=>!Ll(t,e),sa={attribute:!0,type:String,converter:ao,reflect:!1,useDefault:!1,hasChanged:Ci};Symbol.metadata??=Symbol("metadata"),Co.litPropertyMetadata??=new WeakMap;var Ee=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=sa){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){let o=Symbol(),i=this.getPropertyDescriptor(e,o,r);i!==void 0&&Pl(this.prototype,e,i)}}static getPropertyDescriptor(e,r,o){let{get:i,set:a}=Tl(this.prototype,e)??{get(){return this[r]},set(s){this[r]=s}};return{get:i,set(s){let n=i?.call(this);a?.call(this,s),this.requestUpdate(e,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??sa}static _$Ei(){if(this.hasOwnProperty(cr("elementProperties")))return;let e=Bl(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(cr("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(cr("properties"))){let r=this.properties,o=[...Ol(r),...Rl(r)];for(let i of o)this.createProperty(i,r[i])}let e=this[Symbol.metadata];if(e!==null){let r=litPropertyMetadata.get(e);if(r!==void 0)for(let[o,i]of r)this.elementProperties.set(o,i)}this._$Eh=new Map;for(let[r,o]of this.elementProperties){let i=this._$Eu(r,o);i!==void 0&&this._$Eh.set(i,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let r=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let i of o)r.unshift(ia(i))}else e!==void 0&&r.push(ia(e));return r}static _$Eu(e,r){let o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,r=this.constructor.elementProperties;for(let o of r.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Il(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,r,o){this._$AK(e,o)}_$ET(e,r){let o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(i!==void 0&&o.reflect===!0){let a=(o.converter?.toAttribute===void 0?ao:o.converter).toAttribute(r,o.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,r){let o=this.constructor,i=o._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let a=o.getPropertyOptions(i),s=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute===void 0?ao:a.converter;this._$Em=i;let n=s.fromAttribute(r,a.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,r,o,i=!1,a){if(e!==void 0){let s=this.constructor;if(i===!1&&(a=this[e]),o??=s.getPropertyOptions(e),!((o.hasChanged??Ci)(a,r)||o.useDefault&&o.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,r,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:o,reflect:i,wrapped:a},s){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??r??this[e]),a!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(r=void 0),this._$AL.set(e,r)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[i,a]of o){let{wrapped:s}=a,n=this[i];s!==!0||this._$AL.has(i)||n===void 0||this.C(i,void 0,a,n)}}let e=!1,r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(r)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(r=>this._$ET(r,this[r])),this._$EM()}updated(e){}firstUpdated(e){}};Ee.elementStyles=[],Ee.shadowRootOptions={mode:"open"},Ee[cr("elementProperties")]=new Map,Ee[cr("finalized")]=new Map,Dl?.({ReactiveElement:Ee}),(Co.reactiveElementVersions??=[]).push("2.1.2");var Mi=globalThis,na=t=>t,so=Mi.trustedTypes,la=so?so.createPolicy("lit-html",{createHTML:t=>t}):void 0,tn="$lit$",Ut=`lit$${Math.random().toFixed(9).slice(2)}$`,en="?"+Ut,Fl=`<${en}>`,fe=document,pr=()=>fe.createComment(""),fr=t=>t===null||typeof t!="object"&&typeof t!="function",Ai=Array.isArray,ql=t=>Ai(t)||typeof t?.[Symbol.iterator]=="function",Do=`[ 	
\f\r]`,Ze=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ca=/-->/g,da=/>/g,te=RegExp(`>|${Do}(?:([^\\s"'>=/]+)(${Do}*=${Do}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ha=/'/g,ua=/"/g,rn=/^(?:script|style|textarea|title)$/i,b=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),Te=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),pa=new WeakMap,ce=fe.createTreeWalker(fe,129);function on(t,e){if(!Ai(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return la===void 0?e:la.createHTML(e)}var jl=(t,e)=>{let r=t.length-1,o=[],i,a=e===2?"<svg>":e===3?"<math>":"",s=Ze;for(let n=0;n<r;n++){let l=t[n],c,d,h=-1,p=0;for(;p<l.length&&(s.lastIndex=p,d=s.exec(l),d!==null);)p=s.lastIndex,s===Ze?d[1]==="!--"?s=ca:d[1]===void 0?d[2]===void 0?d[3]!==void 0&&(s=te):(rn.test(d[2])&&(i=RegExp("</"+d[2],"g")),s=te):s=da:s===te?d[0]===">"?(s=i??Ze,h=-1):d[1]===void 0?h=-2:(h=s.lastIndex-d[2].length,c=d[1],s=d[3]===void 0?te:d[3]==='"'?ua:ha):s===ua||s===ha?s=te:s===ca||s===da?s=Ze:(s=te,i=void 0);let m=s===te&&t[n+1].startsWith("/>")?" ":"";a+=s===Ze?l+Fl:h>=0?(o.push(c),l.slice(0,h)+tn+l.slice(h)+Ut+m):l+Ut+(h===-2?n:m)}return[on(t,a+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},ii=class an{constructor({strings:e,_$litType$:r},o){let i;this.parts=[];let a=0,s=0,n=e.length-1,l=this.parts,[c,d]=jl(e,r);if(this.el=an.createElement(c,o),ce.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=ce.nextNode())!==null&&l.length<n;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(tn)){let p=d[s++],m=i.getAttribute(h).split(Ut),g=/([.?@])?(.*)/.exec(p);l.push({type:1,index:a,name:g[2],strings:m,ctor:g[1]==="."?Vl:g[1]==="?"?Gl:g[1]==="@"?Wl:Mo}),i.removeAttribute(h)}else h.startsWith(Ut)&&(l.push({type:6,index:a}),i.removeAttribute(h));if(rn.test(i.tagName)){let h=i.textContent.split(Ut),p=h.length-1;if(p>0){i.textContent=so?so.emptyScript:"";for(let m=0;m<p;m++)i.append(h[m],pr()),ce.nextNode(),l.push({type:2,index:++a});i.append(h[p],pr())}}}else if(i.nodeType===8)if(i.data===en)l.push({type:2,index:a});else{let h=-1;for(;(h=i.data.indexOf(Ut,h+1))!==-1;)l.push({type:7,index:a}),h+=Ut.length-1}a++}}static createElement(e,r){let o=fe.createElement("template");return o.innerHTML=e,o}};function Oe(t,e,r=t,o){if(e===Te)return e;let i=o===void 0?r._$Cl:r._$Co?.[o],a=fr(e)?void 0:e._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(t),i._$AT(t,r,o)),o===void 0?r._$Cl=i:(r._$Co??=[])[o]=i),i!==void 0&&(e=Oe(t,i._$AS(t,e.values),i,o)),e}var Ul=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,o=(t?.creationScope??fe).importNode(e,!0);ce.currentNode=o;let i=ce.nextNode(),a=0,s=0,n=r[0];for(;n!==void 0;){if(a===n.index){let l;n.type===2?l=new Si(i,i.nextSibling,this,t):n.type===1?l=new n.ctor(i,n.name,n.strings,this,t):n.type===6&&(l=new Xl(i,this,t)),this._$AV.push(l),n=r[++s]}a!==n?.index&&(i=ce.nextNode(),a++)}return ce.currentNode=fe,o}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings===void 0?r._$AI(t[e]):(r._$AI(t,r,e),e+=r.strings.length-2)),e++}},Si=class sn{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,o,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Oe(this,e,r),fr(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==Te&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ql(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==v&&fr(this._$AH)?this._$AA.nextSibling.data=e:this.T(fe.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:o}=e,i=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ii.createElement(on(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(r);else{let a=new Ul(i,this),s=a.u(this.options);a.p(r),this.T(s),this._$AH=a}}_$AC(e){let r=pa.get(e.strings);return r===void 0&&pa.set(e.strings,r=new ii(e)),r}k(e){Ai(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,o,i=0;for(let a of e)i===r.length?r.push(o=new sn(this.O(pr()),this.O(pr()),this,this.options)):o=r[i],o._$AI(a),i++;i<r.length&&(this._$AR(o&&o._$AB.nextSibling,i),r.length=i)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let o=na(e).nextSibling;na(e).remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Mo=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,o,i){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=v}_$AI(t,e=this,r,o){let i=this.strings,a=!1;if(i===void 0)t=Oe(this,t,e,0),a=!fr(t)||t!==this._$AH&&t!==Te,a&&(this._$AH=t);else{let s=t,n,l;for(t=i[0],n=0;n<i.length-1;n++)l=Oe(this,s[r+n],e,n),l===Te&&(l=this._$AH[n]),a||=!fr(l)||l!==this._$AH[n],l===v?t=v:t!==v&&(t+=(l??"")+i[n+1]),this._$AH[n]=l}a&&!o&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Vl=class extends Mo{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}},Gl=class extends Mo{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}},Wl=class extends Mo{constructor(t,e,r,o,i){super(t,e,r,o,i),this.type=5}_$AI(t,e=this){if((t=Oe(this,t,e,0)??v)===Te)return;let r=this._$AH,o=t===v&&r!==v||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==v&&(r===v||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Xl=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Oe(this,t)}},Kl=Mi.litHtmlPolyfillSupport;Kl?.(ii,Si),(Mi.litHtmlVersions??=[]).push("3.3.2");var Zl=(t,e,r)=>{let o=r?.renderBefore??e,i=o._$litPart$;if(i===void 0){let a=r?.renderBefore??null;o._$litPart$=i=new Si(e.insertBefore(pr(),a),a,void 0,r??{})}return i._$AI(t),i},zi=globalThis,C=class extends Ee{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Zl(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Te}};C._$litElement$=!0,C.finalized=!0,zi.litElementHydrateSupport?.({LitElement:C});var Yl=zi.litElementPolyfillSupport;Yl?.({LitElement:C}),(zi.litElementVersions??=[]).push("4.2.2");var S=t=>(e,r)=>{r===void 0?customElements.define(t,e):r.addInitializer(()=>{customElements.define(t,e)})},Jl={attribute:!0,type:String,converter:ao,reflect:!1,hasChanged:Ci},Ql=(t=Jl,e,r)=>{let{kind:o,metadata:i}=r,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(r.name,t),o==="accessor"){let{name:s}=r;return{set(n){let l=e.get.call(this);e.set.call(this,n),this.requestUpdate(s,l,t,!0,n)},init(n){return n!==void 0&&this.C(s,void 0,t,n),n}}}if(o==="setter"){let{name:s}=r;return function(n){let l=this[s];e.call(this,n),this.requestUpdate(s,l,t,!0,n)}}throw Error("Unsupported decorator location: "+o)};function f(t){return(e,r)=>typeof r=="object"?Ql(t,e,r):((o,i,a)=>{let s=i.hasOwnProperty(a);return i.constructor.createProperty(a,o),s?Object.getOwnPropertyDescriptor(i,a):void 0})(t,e,r)}function M(t){return f({...t,state:!0,attribute:!1})}var nn=(t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,r),r);function zt(t,e){return(r,o,i)=>{let a=s=>s.renderRoot?.querySelector(t)??null;return nn(r,o,{get(){return a(this)}})}}var tc;function ec(t){return(e,r)=>nn(e,r,{get(){return(this.renderRoot??(tc??=document.createDocumentFragment())).querySelectorAll(t)}})}function u(t,e,r,o){var i=arguments.length,a=i<3?e:o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(t,e,r,o);else for(var n=t.length-1;n>=0;n--)(s=t[n])&&(a=(i<3?s(a):i>3?s(e,r,a):s(e,r))||a);return i>3&&a&&Object.defineProperty(e,r,a),a}var Or=class extends C{constructor(...t){super(...t),this.level="h2",this.color="primary"}static{this.styles=E`
    :host {
      display: block;
      font-family: var(--font-family-base);
      font-weight: var(--font-weight-bold);
      font-optical-sizing: auto;
      line-height: var(--line-height-tight);
      margin: 0;
    }
    :host([color='primary'])  { color: var(--color-text-default); }
    :host([color='secondary']) { color: var(--color-text-subtle); }
    :host([color='disabled']) { color: var(--color-text-disabled); }
    :host([level='h1']) { font-size: var(--font-size-h1); letter-spacing: var(--letter-spacing-tight); }
    :host([level='h2']) { font-size: var(--font-size-h2); letter-spacing: var(--letter-spacing-tight); }
    :host([level='h3']) { font-size: var(--font-size-h3); letter-spacing: var(--letter-spacing-tight); }
    :host([level='h4']) { font-size: var(--font-size-h4); }
    :host([level='h5']) { font-size: var(--font-size-h5); }
    :host([level='h6']) { font-size: var(--font-size-h6); }
  `}get _ariaLevel(){return parseInt(this.level.substring(1),10)}render(){return b`<slot></slot>`}connectedCallback(){super.connectedCallback(),this.setAttribute("role","heading"),this.setAttribute("aria-level",String(this._ariaLevel))}updated(t){t.has("level")&&this.setAttribute("aria-level",String(this._ariaLevel))}};u([f({reflect:!0})],Or.prototype,"level",void 0),u([f({reflect:!0})],Or.prototype,"color",void 0),Or=u([S("candor-heading")],Or);var ye=class extends C{constructor(...t){super(...t),this.variant="body",this.size="md",this.color="primary",this.bold=!1}static{this.styles=E`
    :host { display: block; }
    .text {
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-relaxed);
      color: var(--color-text-default);
    }
    .text--body    { font-family: var(--font-family-reading); }
    .text--caption { font-family: var(--font-family-reading); font-style: italic; letter-spacing: var(--letter-spacing-italic); }
    .text--label   { font-family: var(--font-family-base); font-weight: var(--font-weight-regular); letter-spacing: var(--letter-spacing-wide); text-transform: uppercase; line-height: var(--line-height-tight); }
    .text--size-sm  { font-size: var(--font-size-sm); }
    .text--size-md  { font-size: var(--font-size-md); }
    .text--size-lg  { font-size: var(--font-size-lg); }
    .text--size-xl  { font-size: var(--font-size-xl); }
    .text--size-2xl { font-size: var(--font-size-2xl); }
    .text--size-3xl { font-size: var(--font-size-3xl); }
    .text--color-primary   { color: var(--color-text-default); }
    .text--color-secondary { color: var(--color-text-subtle); }
    .text--color-disabled  { color: var(--color-text-disabled); }
    .text--bold { font-weight: var(--font-weight-bold); }
  `}render(){return b`<span class="${["text",`text--${this.variant}`,`text--size-${this.size}`,`text--color-${this.color}`,this.bold?"text--bold":""].filter(Boolean).join(" ")}"><slot></slot></span>`}};u([f({reflect:!0})],ye.prototype,"variant",void 0),u([f({reflect:!0})],ye.prototype,"size",void 0),u([f({reflect:!0})],ye.prototype,"color",void 0),u([f({type:Boolean})],ye.prototype,"bold",void 0),ye=u([S("candor-text")],ye);var Sr="M822.64 777.36c5.794 5.794 9.378 13.799 9.378 22.64 0 17.683-14.335 32.018-32.018 32.018-8.841 0-16.846-3.584-22.64-9.378l-265.36-265.4-265.36 265.4c-5.794 5.794-13.799 9.378-22.64 9.378-17.683 0-32.018-14.335-32.018-32.018 0-8.841 3.584-16.846 9.378-22.64l-0 0 265.4-265.36-265.4-265.36c-5.794-5.794-9.378-13.799-9.378-22.64 0-17.683 14.335-32.018 32.018-32.018 8.841 0 16.846 3.584 22.64 9.378l265.36 265.4 265.36-265.4c5.794-5.794 13.799-9.378 22.64-9.378 17.683 0 32.018 14.335 32.018 32.018 0 8.841-3.584 16.846-9.378 22.64l-0 0-265.4 265.36z",Ei="M512 96c-229.75 0-416 186.25-416 416s186.25 416 416 416c229.75 0 416-186.25 416-416v0c-0.25-229.65-186.35-415.75-415.976-416l-0.024-0zM496 288c26.51 0 48 21.49 48 48s-21.49 48-48 48c-26.51 0-48-21.49-48-48v0c0-26.51 21.49-48 48-48v0zM544 736c-35.346 0-64-28.654-64-64v0-160c-17.673 0-32-14.327-32-32s14.327-32 32-32v0c35.346 0 64 28.654 64 64v0 160c17.673 0 32 14.327 32 32s-14.327 32-32 32v0z",Ni="M512 96c-229.75 0-416 186.25-416 416s186.25 416 416 416c229.75 0 416-186.25 416-416v0c-0.25-229.65-186.35-415.75-415.976-416l-0.024-0zM694.64 438.64l-224 224c-5.792 5.798-13.797 9.385-22.64 9.385s-16.848-3.587-22.64-9.385l-0-0-96-96c-5.794-5.794-9.378-13.799-9.378-22.64 0-17.683 14.335-32.018 32.018-32.018 8.841 0 16.846 3.584 22.64 9.378l73.36 73.4 201.36-201.4c5.794-5.794 13.799-9.378 22.64-9.378 17.683 0 32.018 14.335 32.018 32.018 0 8.841-3.584 16.846-9.378 22.64l0-0z",Ii="M947.2 752.36l-349.8-607.48c-17.525-29.455-49.194-48.883-85.4-48.883s-67.875 19.428-85.149 48.428l-0.251 0.455-349.8 607.48c-8.072 13.588-12.843 29.957-12.843 47.44s4.771 33.852 13.082 47.875l-0.239-0.435c17.146 29.356 48.5 48.765 84.389 48.765 0.356 0 0.711-0.002 1.066-0.006l-0.054 0h699.6c0.277 0.003 0.604 0.004 0.932 0.004 35.888 0 67.242-19.409 84.139-48.304l0.249-0.461c8.097-13.604 12.883-29.998 12.883-47.508 0-17.455-4.756-33.8-13.042-47.808l0.239 0.437zM480 416c0-17.673 14.327-32 32-32s32 14.327 32 32v0 160c0 17.673-14.327 32-32 32s-32-14.327-32-32v0zM512 768c-26.51 0-48-21.49-48-48s21.49-48 48-48c26.51 0 48 21.49 48 48v0c0 26.51-21.49 48-48 48v0z",Li="M512 96c-229.75 0-416 186.25-416 416s186.25 416 416 416c229.75 0 416-186.25 416-416v0c-0.25-229.65-186.35-415.75-415.976-416l-0.024-0zM662.64 617.36c5.794 5.794 9.378 13.799 9.378 22.64 0 17.683-14.335 32.018-32.018 32.018-8.841 0-16.846-3.584-22.64-9.378l-105.36-105.4-105.36 105.4c-5.794 5.794-13.799 9.378-22.64 9.378-17.683 0-32.018-14.335-32.018-32.018 0-8.841 3.584-16.846 9.378-22.64l105.4-105.36-105.4-105.36c-5.794-5.794-9.378-13.799-9.378-22.64 0-17.683 14.335-32.018 32.018-32.018 8.841 0 16.846 3.584 22.64 9.378l105.36 105.4 105.36-105.4c5.794-5.794 13.799-9.378 22.64-9.378 17.683 0 32.018 14.335 32.018 32.018 0 8.841-3.584 16.846-9.378 22.64l-105.4 105.36z",Wt="M865.96 417.96l-320 320c-8.692 8.721-20.716 14.118-34 14.118s-25.308-5.396-33.999-14.116l-0.001-0.001-320-320c-8.701-8.701-14.083-20.722-14.083-34 0-26.556 21.528-48.083 48.083-48.083 13.278 0 25.299 5.382 34 14.083l286.040 286.040 286.040-286.080c8.701-8.701 20.722-14.083 34-14.083 26.556 0 48.083 21.528 48.083 48.083 0 13.278-5.382 25.299-14.083 34l0-0z",rc="M448 720c0 35.346 28.654 64 64 64s64-28.654 64-64c0-35.346-28.654-64-64-64v0c-35.346 0-64 28.654-64 64v0zM512 512c-35.346 0-64-28.654-64-64s28.654-64 64-64c35.346 0 64 28.654 64 64v0c0 35.346-28.654 64-64 64v0zM512 240c-35.346 0-64-28.654-64-64s28.654-64 64-64c35.346 0 64 28.654 64 64v0c0 35.346-28.654 64-64 64v0z",oc="M929.96 385.96l-512 512c-8.692 8.721-20.716 14.118-34 14.118s-25.308-5.396-33.999-14.116l-224.001-224.001c-8.701-8.701-14.083-20.722-14.083-34 0-26.556 21.528-48.083 48.083-48.083 13.278 0 25.299 5.382 34 14.083l190.04 190.04 478.04-477.96c8.701-8.701 20.722-14.083 34-14.083 26.556 0 48.083 21.528 48.083 48.083 0 13.278-5.382 25.299-14.083 34v0z",ic="M925.6 177.36s0 0.4 0 0.6l-232.8 767.76c-7.304 25.256-29.216 43.807-55.769 46.024l-0.231 0.016q-2.76 0.24-5.52 0.24c-0.059 0-0.128 0-0.197 0-25.293 0-47.129-14.802-57.318-36.216l-0.164-0.384-145.6-298.8c-1.017-2.044-1.613-4.453-1.613-7 0-4.421 1.793-8.424 4.692-11.32l0-0 231.68-231.68c5.449-5.727 8.801-13.492 8.801-22.041 0-17.673-14.327-32-32-32-8.548 0-16.314 3.352-22.054 8.813l0.013-0.013-231.8 231.68c-2.896 2.899-6.899 4.693-11.32 4.693-2.547 0-4.956-0.595-7.093-1.654l0.093 0.042-299.080-145.56c-21.659-10.565-36.317-32.422-36.317-57.703 0-29.032 19.331-53.549 45.824-61.382l0.453-0.115 768.36-232.8c5.188-1.514 11.147-2.386 17.311-2.386 35.346 0 64 28.654 64 64 0 6.117-0.858 12.034-2.461 17.637l0.111-0.452z",fa={success:Ni,warning:Ii,error:Li,info:Ei},ee=class extends C{constructor(...e){super(...e),this.role_="label",this.color="primary",this.tone="info",this.bold=!1}static{this.styles=E`
    :host {
      display: inline;
      font-family: var(--font-family-accessible);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-normal);
      color: var(--color-text-default);
    }

    /* Role variants */
    :host([role_="label"]) {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
      letter-spacing: var(--letter-spacing-wide);
      text-transform: uppercase;
      line-height: var(--line-height-tight);
    }
    :host([role_="message"]) {
      font-size: var(--font-size-md);
      letter-spacing: 0.02em;
      line-height: var(--line-height-normal);
    }
    /* 16px, not 14px. The status role carries validation errors and state
       changes — Tier 1 "must read to act" content — and Tier 1 regular text is
       required to be 16px or larger, because the 14px floor is unreachable by
       any chromatic text colour (#240). candor-input already renders its own
       validation errors at 16px; this makes the generic role agree with it
       (#208). NB: this comment sits inside a tagged template literal, so it must
       contain no backtick characters — one would terminate the literal. */
    :host([role_="status"]) {
      font-size: var(--font-size-md);
      letter-spacing: 0.02em;
      line-height: var(--line-height-tight);
    }
    /* Stays at 14px, unlike status, because the component renders a tone icon
       that carries the outcome. That makes the meaning redundantly coded by a
       non-colour channel, which is Tier 3 (floor 4.5) rather than Tier 1 — and
       the redundancy is structural, not something an author has to remember.
       Consequently the text itself needs no colour: the icon carries the state,
       so the text stays at text-default (OKCA 11.5) and clears every floor with
       margin. This is the case the tier table means by "redundantly coded". */
    :host([role_="state"]) {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2xs);
      font-size: var(--font-size-sm);
      letter-spacing: 0.02em;
      line-height: var(--line-height-tight);
      color: var(--color-text-default);
    }
    /* Icon colour uses the non-text status tokens, which is what they are
       validated for. The text never uses them. */
    :host([role_="state"]) .state-icon { flex-shrink: 0; width: 1em; height: 1em; }
    :host([role_="state"][tone="success"]) .state-icon { color: var(--color-status-success); }
    :host([role_="state"][tone="warning"]) .state-icon { color: var(--color-status-warning); }
    :host([role_="state"][tone="error"])   .state-icon { color: var(--color-status-error); }
    /* No --color-status-info token exists; candor-alert uses text-subtle for the
       info icon, and this matches it. */
    :host([role_="state"][tone="info"])    .state-icon { color: var(--color-text-subtle); }

    :host([role_="annotation"]) {
      font-size: var(--font-size-sm);
      letter-spacing: 0.02em;
      line-height: var(--line-height-relaxed);
      font-style: italic;
    }

    /* Size overrides — higher specificity via two attribute selectors wins over role */
    :host([role_][size="sm"]) { font-size: var(--font-size-sm); }
    :host([role_][size="md"]) { font-size: var(--font-size-md); }
    :host([role_][size="lg"]) { font-size: var(--font-size-lg); }

    /* Color variants */
    :host([color="primary"])   { color: var(--color-text-default); }
    :host([color="secondary"]) { color: var(--color-text-subtle); }
    :host([color="disabled"])  { color: var(--color-text-disabled); }
    :host([color="error"])     { color: var(--color-status-error-text); }

    /* Bold modifier */
    :host([bold]) { font-weight: var(--font-weight-bold); }

    .accessible-text { display: contents; }
  `}render(){return b`${this.role_==="state"?b`<svg class="state-icon" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${fa[this.tone]??fa.info}"/></svg>`:v}<span class="accessible-text"><slot></slot></span>`}};u([f({reflect:!0})],ee.prototype,"role_",void 0),u([f({reflect:!0})],ee.prototype,"size",void 0),u([f({reflect:!0})],ee.prototype,"color",void 0),u([f({reflect:!0})],ee.prototype,"tone",void 0),u([f({type:Boolean,reflect:!0})],ee.prototype,"bold",void 0),ee=u([S("candor-accessible-text")],ee);var ac=`
  candor-article {
    display: block;
    max-width: 65ch;
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-default);
  }
  candor-article.article--font-serif { font-family: var(--font-family-serif); }
  candor-article.article--font-sans  { font-family: var(--font-family-reading); }

  candor-article h1, candor-article h2, candor-article h3,
  candor-article h4, candor-article h5, candor-article h6 {
    font-family: var(--font-family-display);
    font-weight: var(--font-weight-bold);
    font-optical-sizing: auto;
    line-height: var(--line-height-tight);
    color: var(--color-text-default);
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-sm);
  }
  candor-article h1:first-child, candor-article h2:first-child,
  candor-article h3:first-child, candor-article h4:first-child,
  candor-article h5:first-child, candor-article h6:first-child { margin-top: 0; }

  candor-article h1 { font-size: var(--font-size-h1); letter-spacing: var(--letter-spacing-tight); }
  candor-article h2 { font-size: var(--font-size-h2); letter-spacing: var(--letter-spacing-tight); }
  candor-article h3 { font-size: var(--font-size-h3); letter-spacing: var(--letter-spacing-tight); }
  candor-article h4 { font-size: var(--font-size-h4); }
  candor-article h5 { font-size: var(--font-size-base); margin-top: var(--spacing-lg); }
  candor-article h6 { font-size: var(--font-size-sm); margin-top: var(--spacing-md); }

  candor-article p { margin-bottom: var(--spacing-md); }
  candor-article p:last-child { margin-bottom: 0; }

  candor-article ul, candor-article ol {
    margin-bottom: var(--spacing-md);
    padding-left: var(--spacing-md);
  }
  candor-article li { margin-bottom: var(--spacing-xs); }

  candor-article blockquote {
    border-left: var(--border-width-thick) solid var(--color-blockquote-border);
    margin: var(--spacing-lg) 0;
    padding: var(--spacing-sm) var(--spacing-md);
    font-style: italic;
    letter-spacing: var(--letter-spacing-italic);
    color: var(--color-blockquote-text);
    background-color: var(--color-blockquote-bg);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  }

  candor-article .callout {
    border-left: var(--border-width-thick) solid var(--color-highlight-decorative);
    margin: var(--spacing-lg) 0;
    padding: var(--spacing-sm) var(--spacing-md);
    color: var(--color-text-default);
    background-color: var(--color-callout-bg);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  }
  candor-article .callout > :last-child { margin-bottom: 0; }

  candor-article code {
    font-family: var(--font-family-mono);
    font-size: 0.875em;
    background-color: var(--color-bg-surface);
    padding: 0.1em 0.35em;
    border-radius: var(--radius-sm);
    color: var(--color-highlight);
  }

  candor-article pre {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-normal);
    background-color: var(--color-bg-code);
    color: var(--color-text-code);
    border: var(--border-width-thin) solid var(--color-border-code);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin-bottom: var(--spacing-md);
  }
  candor-article pre code {
    background: none;
    padding: 0;
    font-size: 1em;
    color: inherit;
    border-radius: 0;
  }

  candor-article a {
    color: var(--color-link);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    border-bottom: var(--border-width-thin) solid transparent;
    padding-bottom: 0.15em;
  }
  candor-article a:visited {
    color: var(--color-link-visited);
    border-bottom-color: var(--color-link-visited);
  }
  candor-article a:hover { color: var(--color-link-hover); }
  candor-article a:focus-visible {
    outline: var(--focus-ring-width) solid var(--color-focus);
    outline-offset: var(--focus-ring-offset);
    border-radius: var(--radius-sm);
  }

  candor-article hr {
    border: none;
    border-top: var(--border-width-thin) solid var(--color-border-default);
    margin: var(--spacing-xl) 0;
  }

  candor-article strong { font-weight: var(--font-weight-bold); }
  candor-article em { font-style: italic; letter-spacing: var(--letter-spacing-italic); }

  candor-article abbr[title] {
    text-decoration: underline dotted;
    cursor: help;
  }

  candor-article figure {
    margin: var(--spacing-lg) 0;
  }
  candor-article figure img {
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: var(--radius-md);
  }
  candor-article figcaption {
    font-size: var(--font-size-sm);
    color: var(--color-text-subtle);
    margin-top: var(--spacing-xs);
    font-style: italic;
    letter-spacing: 0.03em;
  }

  candor-article table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: var(--spacing-md);
    font-family: var(--font-family-base);
    line-height: var(--line-height-tight);
  }
  candor-article table th,
  candor-article table td {
    padding: var(--spacing-xs) var(--spacing-sm);
    text-align: left;
    border-bottom: var(--border-width-thin) solid var(--color-border-default);
  }
  candor-article table td {
    font-variant-numeric: tabular-nums;
  }
  candor-article table th.numeric,
  candor-article table td.numeric {
    font-family: var(--font-family-mono);
    text-align: right;
  }
  candor-article table thead th {
    font-weight: var(--font-weight-bold);
    border-bottom: var(--border-width-medium) solid var(--color-border-strong);
  }
  candor-article table tbody tr:last-child td {
    border-bottom: none;
  }

  /* justify attribute — full justification for AI-generated or formal document prose.
     Applies only to paragraphs; headings remain left-aligned.
     Requires lang attribute on the element or an ancestor for hyphenation to work. */
  candor-article[justify] p {
    text-align: justify;
    hyphens: auto;
  }
`;if(!document.getElementById("candor-article-styles")){let t=document.createElement("style");t.id="candor-article-styles",t.textContent=ac,document.head.appendChild(t)}var Rr=class extends C{constructor(...t){super(...t),this.font="serif",this.justify=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.classList.add("article"),this._updateFontClass()}updated(t){t.has("font")&&this._updateFontClass()}_updateFontClass(){this.classList.toggle("article--font-serif",this.font==="serif"),this.classList.toggle("article--font-sans",this.font==="sans")}render(){return b`<slot></slot>`}};u([f({reflect:!0})],Rr.prototype,"font",void 0),u([f({type:Boolean,reflect:!0})],Rr.prototype,"justify",void 0),Rr=u([S("candor-article")],Rr);var ga=class extends C{static{this.styles=E`
    :host { display: inline; }
    code {
      font-family: var(--font-family-mono);
      /* Clamp to the 14px readable floor: 0.9em of the surrounding text, but
         never below --font-size-sm even inside 14px prose. */
      font-size: max(0.9em, var(--font-size-sm));
      background-color: var(--color-bg-code);
      color: var(--color-text-code);
      border: var(--border-width-thin) solid var(--color-border-code);
      border-radius: var(--radius-sm);
      padding: 0.1em 0.35em;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }
  `}render(){return b`<code part="code"><slot></slot></code>`}};ga=u([S("candor-code")],ga);var Br=class extends C{constructor(...t){super(...t),this.variant="default",this.size="md"}static{this.styles=E`
    :host { display: inline-flex; }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-full);
      font-family: var(--font-family-accessible);
      letter-spacing: 0.06em;
      font-weight: var(--font-weight-bold);
      white-space: nowrap;
      line-height: var(--line-height-tight);
    }
    .badge--sm { font-size: var(--font-size-sm); padding: 0.2rem 0.5rem; }
    .badge--md { font-size: var(--font-size-md); font-weight: var(--font-weight-regular); padding: 0.25rem 0.65rem; }
    .badge--default   { background-color: var(--color-bg-surface); color: var(--color-text-subtle-on-surface); }
    .badge--primary   { background-color: var(--color-action-primary); color: var(--color-text-on-action); }
    .badge--secondary { background-color: var(--color-action-secondary); color: var(--color-text-on-action); }
    .badge--success   { background-color: var(--color-status-success-bg); color: var(--color-status-success-text); }
    .badge--error     { background-color: var(--color-status-error-bg); color: var(--color-status-error-text); }
    .badge--warning   { background-color: var(--color-status-warning-bg); color: var(--color-status-warning-text); }
  `}render(){return b`<span class="badge badge--${this.variant} badge--${this.size}"><slot></slot></span>`}};u([f({reflect:!0})],Br.prototype,"variant",void 0),u([f({reflect:!0})],Br.prototype,"size",void 0),Br=u([S("candor-badge")],Br);var we=class extends C{constructor(...e){super(...e),this.variant="info",this.heading="",this.message="",this.dismissible=!1}static{this.styles=E`
    :host { display: block; }
    .alert {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-md);
      border: var(--border-width-thin) solid;
      font-family: var(--font-family-accessible);
    }
    .alert--info    { background-color: var(--color-bg-surface); border-color: var(--color-border-strong); }
    .alert--success { background-color: var(--color-status-success-bg); border-color: var(--color-status-success); }
    .alert--warning { background-color: var(--color-status-warning-bg); border-color: var(--color-status-warning); }
    .alert--error   { background-color: var(--color-status-error-bg); border-color: var(--color-status-error); }
    .alert__icon { flex-shrink: 0; width: 1.25rem; height: 1.25rem; margin-top: 0.125rem; }
    .alert--info    .alert__icon { color: var(--color-text-subtle); }
    .alert--success .alert__icon { color: var(--color-status-success); }
    .alert--warning .alert__icon { color: var(--color-status-warning); }
    .alert--error   .alert__icon { color: var(--color-status-error); }
    .alert__content { flex: 1; min-width: 0; }
    .alert__title {
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-default);
      font-size: var(--font-size-md);
      line-height: var(--line-height-tight);
      margin-bottom: 0.25rem;
      letter-spacing: var(--letter-spacing-wide);
      text-transform: uppercase;
    }
    .alert__message {
      color: var(--color-text-default);
      font-size: var(--font-size-md);
      line-height: var(--line-height-normal);
      letter-spacing: 0.02em;
      overflow-wrap: break-word;
    }
    .alert__dismiss {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: var(--radius-sm);
      color: var(--color-text-subtle);
      transition: color 0.15s ease, background-color 0.15s ease;
    }
    .alert__dismiss svg { width: 1rem; height: 1rem; }
    .alert__dismiss:hover { color: var(--color-text-default); background-color: oklch(from currentColor l c h / 0.1); }
    .alert__dismiss:focus-visible { outline: var(--focus-ring-width) solid var(--color-focus); outline-offset: var(--focus-ring-offset); }
  `}_iconPath(){switch(this.variant){case"info":return Ei;case"success":return Ni;case"warning":return Ii;case"error":return Li}}render(){let e=this.variant==="warning"||this.variant==="error"?"alert":"status";return b`
      <div class="alert alert--${this.variant}" role="${e}">
        <svg class="alert__icon" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${this._iconPath()}"/></svg>
        <div class="alert__content">
          ${this.heading?b`<div class="alert__title">${this.heading}</div>`:""}
          <div class="alert__message">${this.message?this.message:b`<slot></slot>`}</div>
        </div>
        ${this.dismissible?b`
          <button class="alert__dismiss" @click="${this._dismiss}" aria-label="Dismiss">
            <svg aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${Sr}"/></svg>
          </button>
        `:""}
      </div>
    `}_dismiss(){this.dispatchEvent(new CustomEvent("dismiss",{bubbles:!0,composed:!0}))}};u([f({reflect:!0})],we.prototype,"variant",void 0),u([f()],we.prototype,"heading",void 0),u([f()],we.prototype,"message",void 0),u([f({type:Boolean})],we.prototype,"dismissible",void 0),we=u([S("candor-alert")],we);var xe=class extends C{constructor(...t){super(...t),this.variant="default",this.padding="md",this._hasHeader=!1,this._hasFooter=!1}static{this.styles=E`
    :host { display: block; }
    .card { border-radius: var(--radius-md); overflow: hidden; }
    .card--default  { background-color: var(--color-bg-surface); }
    .card--elevated { background-color: var(--color-bg-elevated); box-shadow: var(--shadow-md); }
    .card--outlined { background-color: var(--color-bg-page); border: var(--border-width-thin) solid var(--color-border-default); }
    .card__header { display: none; }
    .card__header:not([hidden]) {
      display: block;
      border-bottom: var(--border-width-medium) solid var(--color-border-default);
      font-family: var(--font-family-base);
      font-optical-sizing: auto;
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-default);
    }
    .card__body { font-family: var(--font-family-base); color: var(--color-text-default); }
    .card__footer { display: none; }
    .card__footer:not([hidden]) {
      display: block;
      border-top: var(--border-width-thin) solid var(--color-border-default);
      font-family: var(--font-family-base);
      font-size: var(--font-size-sm);
      color: var(--color-text-subtle-on-surface);
    }
    .card--padding-none .card__header,
    .card--padding-none .card__body,
    .card--padding-none .card__footer { padding: 0; }
    .card--padding-sm .card__header,
    .card--padding-sm .card__body,
    .card--padding-sm .card__footer { padding: var(--spacing-sm); }
    .card--padding-md .card__header,
    .card--padding-md .card__body,
    .card--padding-md .card__footer { padding: var(--spacing-card-padding); }
    .card--padding-lg .card__header,
    .card--padding-lg .card__body,
    .card--padding-lg .card__footer { padding: var(--spacing-lg); }
  `}_onHeaderSlotChange(t){this._hasHeader=t.target.assignedElements().length>0}_onFooterSlotChange(t){this._hasFooter=t.target.assignedElements().length>0}render(){return b`
      <div class="card card--${this.variant} card--padding-${this.padding}">
        <div class="card__header" ?hidden=${!this._hasHeader}>
          <slot name="header" @slotchange=${this._onHeaderSlotChange}></slot>
        </div>
        <div class="card__body"><slot></slot></div>
        <div class="card__footer" ?hidden=${!this._hasFooter}>
          <slot name="footer" @slotchange=${this._onFooterSlotChange}></slot>
        </div>
      </div>
    `}};u([f({reflect:!0})],xe.prototype,"variant",void 0),u([f({reflect:!0})],xe.prototype,"padding",void 0),u([M()],xe.prototype,"_hasHeader",void 0),u([M()],xe.prototype,"_hasFooter",void 0),xe=u([S("candor-card")],xe);var re=class extends C{constructor(...e){super(...e),this.color="default",this.size="md",this.value=""}static{this.styles=E`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-2xs);
    }
    :host([size='md']),
    :host([size='lg']) { gap: var(--spacing-xs); }
    .stat__label {
      margin: 0;
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-subtle-on-surface);
      letter-spacing: var(--letter-spacing-italic);
      text-align: center;
    }
    .stat__value {
      margin: 0;
      font-family: var(--font-family-display);
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      font-optical-sizing: auto;
      line-height: 1;
      letter-spacing: -0.02em;
      color: var(--color-text-default);
    }
    :host([size='md']) .stat__value { font-size: var(--font-size-2xl); }
    :host([size='lg']) .stat__value { font-size: var(--font-size-3xl); }
    :host([color='success']) .stat__value { color: var(--color-status-success-text); }
    :host([color='warning']) .stat__value { color: var(--color-status-warning-text); }
    :host([color='error'])   .stat__value { color: var(--color-status-error-text); }
    :host([color='info'])    .stat__value { color: var(--color-link); }
    .stat__unit {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-subtle);
      letter-spacing: var(--letter-spacing-normal);
    }
  `}render(){return b`
      ${this.label?b`<p class="stat__label">${this.label}</p>`:v}
      <p class="stat__value" aria-label="${this.unit?`${this.value} ${this.unit}`:v}">
        ${this.value}${this.unit?b`<span class="stat__unit">${this.unit}</span>`:v}
      </p>
      <slot></slot>
    `}};u([f({reflect:!0})],re.prototype,"color",void 0),u([f({reflect:!0})],re.prototype,"size",void 0),u([f()],re.prototype,"value",void 0),u([f()],re.prototype,"unit",void 0),u([f()],re.prototype,"label",void 0),re=u([S("candor-stat")],re);function ot(t,e){let r=()=>{let i=t.getAttribute("aria-label");i!==null&&i!==""&&(e(i),queueMicrotask(()=>{t.getAttribute("aria-label")===i&&t.removeAttribute("aria-label")}))};r();let o=new MutationObserver(r);return o.observe(t,{attributes:!0,attributeFilter:["aria-label"]}),()=>o.disconnect()}var Ft=class extends C{constructor(...t){super(...t),this.type="bar",this.value=0,this.indeterminate=!1,this.label="",this.size="md",this._ariaLabel=null,this._labelId=`progress-label-${Math.random().toString(36).slice(2,9)}`}static{this.styles=E`
    :host { display: block; }
    .progress-bar-wrapper { display: flex; flex-direction: column; gap: var(--spacing-2xs); }
    .progress-bar__label { font-family: var(--font-family-accessible); font-size: var(--font-size-sm); color: var(--color-text-subtle); letter-spacing: var(--letter-spacing-italic); }
    .progress-bar {
      height: var(--spacing-xs);
      background-color: var(--color-bg-surface);
      border-radius: var(--radius-full);
      overflow: hidden;
      border: var(--border-width-thin) solid var(--color-border-default);
    }
    .progress-bar__fill {
      height: 100%;
      background-color: var(--color-action-primary);
      border-radius: var(--radius-full);
      transition: width 0.3s ease-in-out;
    }
    .progress-bar__fill--indeterminate {
      width: 40% !important;
      animation: progress-indeterminate 1.5s ease-in-out infinite;
    }
    @keyframes progress-indeterminate {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(300%); }
    }
    .spinner { animation: spinner-rotate 1.2s linear infinite; display: block; }
    .spinner--sm { width: 1.25rem; height: 1.25rem; }
    .spinner--md { width: var(--spacing-lg); height: var(--spacing-lg); }
    .spinner--lg { width: var(--spacing-xl); height: var(--spacing-xl); }
    .spinner__track { stroke: var(--color-border-default); }
    .spinner__arc {
      stroke: var(--color-action-primary);
      stroke-dasharray: 56.5 56.5;
      stroke-dashoffset: 0;
      transform-origin: center;
      animation: spinner-arc 1.2s ease-in-out infinite;
    }
    @keyframes spinner-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes spinner-arc {
      0%   { stroke-dasharray: 1 113; stroke-dashoffset: 0; }
      50%  { stroke-dasharray: 85 113; stroke-dashoffset: -35; }
      100% { stroke-dasharray: 85 113; stroke-dashoffset: -113; }
    }
  `}connectedCallback(){super.connectedCallback(),this._stopObservingAriaLabel=ot(this,t=>{this._ariaLabel=t})}disconnectedCallback(){this._stopObservingAriaLabel?.(),super.disconnectedCallback()}render(){return this.type==="spinner"?b`
        <svg class="spinner spinner--${this.size}" role="status" aria-label="${this.label||"Loading"}" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>${this.label||"Loading"}</title>
          <circle class="spinner__track" cx="22" cy="22" r="18" stroke-width="4"/>
          <circle class="spinner__arc" cx="22" cy="22" r="18" stroke-width="4" stroke-linecap="round"/>
        </svg>
      `:b`
      <div class="progress-bar-wrapper">
        ${this.label?b`<div class="progress-bar__label" id="${this._labelId}">${this.label}</div>`:v}
        <div
          class="progress-bar"
          role="progressbar"
          aria-valuenow="${this.indeterminate?v:this.value}"
          aria-valuemin="${this.indeterminate?v:"0"}"
          aria-valuemax="${this.indeterminate?v:"100"}"
          aria-valuetext="${this.indeterminate?v:`${Math.round(this.value)}%`}"
          aria-label="${this.label?v:this._ariaLabel||"Loading"}"
          aria-labelledby="${this.label?this._labelId:v}"
        >
          <div
            class="progress-bar__fill ${this.indeterminate?"progress-bar__fill--indeterminate":""}"
            style="${this.indeterminate?"":`width:${this.value}%`}"
          ></div>
        </div>
      </div>
    `}};u([f({reflect:!0})],Ft.prototype,"type",void 0),u([f({type:Number})],Ft.prototype,"value",void 0),u([f({type:Boolean})],Ft.prototype,"indeterminate",void 0),u([f()],Ft.prototype,"label",void 0),u([f({reflect:!0})],Ft.prototype,"size",void 0),u([M()],Ft.prototype,"_ariaLabel",void 0),Ft=u([S("candor-progress")],Ft);var oe=class extends C{constructor(...e){super(...e),this.variant="primary",this.size="medium",this.disabled=!1,this.type="button",this._ariaLabel=null}static{this.styles=E`
    :host { display: inline-flex; }
    .button {
      font-family: var(--font-family-base);
      font-weight: var(--font-weight-bold);
      font-optical-sizing: auto;
      border: none;
      border-radius: var(--candor-button-radius, var(--radius-md));
      cursor: pointer;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      text-decoration: none;
    }
    .button:focus-visible { outline: var(--focus-ring-width) solid var(--color-focus); outline-offset: var(--focus-ring-offset); }
    .button:disabled { cursor: not-allowed; opacity: 0.5; }
    /* Density knobs — each defaults to the per-size token, so a consumer can
       override padding/font-size/min-height (e.g. to go denser than 'small',
       #165) without forking: candor-button { --candor-button-min-height: 1.75rem; } */
    .button--small {
      font-size: var(--candor-button-font-size, var(--font-size-sm));
      font-weight: var(--font-weight-bold);
      letter-spacing: 0.01em;
      padding: var(--candor-button-padding-y, var(--spacing-button-padding-y-sm)) var(--candor-button-padding-x, var(--spacing-button-padding-x-sm));
      min-height: var(--candor-button-min-height, 2rem);
    }
    .button--medium {
      font-size: var(--candor-button-font-size, var(--font-size-md));
      padding: var(--candor-button-padding-y, var(--spacing-button-padding-y)) var(--candor-button-padding-x, var(--spacing-button-padding-x));
      min-height: var(--candor-button-min-height, var(--hit-target-aaa));
    }
    .button--large {
      font-size: var(--candor-button-font-size, var(--font-size-lg));
      padding: var(--candor-button-padding-y, var(--spacing-button-padding-y-lg)) var(--candor-button-padding-x, var(--spacing-button-padding-x-lg));
      min-height: var(--candor-button-min-height, 3rem);
    }
    .button--primary { background-color: var(--color-action-primary); color: var(--color-text-on-action); }
    .button--primary:hover:not(:disabled) { background-color: var(--color-action-primary-hover); }
    .button--primary:active:not(:disabled) { background-color: var(--color-action-primary-active); }
    .button--secondary { background-color: transparent; color: var(--color-action-primary); border: var(--border-width-thin) solid var(--color-action-primary); }
    .button--secondary:hover:not(:disabled) { background-color: oklch(from var(--color-action-primary) l c h / 0.08); }
    .button--secondary:active:not(:disabled) { background-color: oklch(from var(--color-action-primary) l c h / 0.15); }
    .button--destructive { background-color: var(--color-action-destructive); color: var(--color-action-destructive-text); border: var(--border-width-thin) solid var(--color-action-destructive-border); }
    .button--destructive:hover:not(:disabled) { background-color: var(--color-action-destructive-hover); }
    .button--destructive:active:not(:disabled) { background-color: var(--color-action-destructive-active); }
    .button--tertiary { background-color: var(--color-action-tertiary); color: var(--color-action-tertiary-text); }
    .button--tertiary:hover:not(:disabled) { background-color: var(--color-action-tertiary-hover); }
    .button--tertiary:active:not(:disabled) { background-color: oklch(from var(--color-action-tertiary-hover) calc(l - 0.04) c h); }
    .button--ghost { background-color: transparent; color: var(--color-text-default); }
    .button--ghost:hover:not(:disabled) { background-color: var(--color-bg-surface); }
    .button--ghost:active:not(:disabled) { background-color: oklch(from var(--color-bg-surface) calc(l - 0.06) c h); }
  `}connectedCallback(){super.connectedCallback(),this._stopObservingAriaLabel=ot(this,e=>{this._ariaLabel=e})}disconnectedCallback(){this._stopObservingAriaLabel?.(),super.disconnectedCallback()}render(){return b`
      <button
        part="button"
        class="button button--${this.variant} button--${this.size}"
        ?disabled="${this.disabled}"
        type="${this.type}"
        aria-label="${this._ariaLabel??v}"
      ><slot></slot></button>
    `}};u([f({reflect:!0})],oe.prototype,"variant",void 0),u([f({reflect:!0})],oe.prototype,"size",void 0),u([f({type:Boolean,reflect:!0})],oe.prototype,"disabled",void 0),u([f()],oe.prototype,"type",void 0),u([M()],oe.prototype,"_ariaLabel",void 0),oe=u([S("candor-button")],oe);var It=class extends C{constructor(...e){super(...e),this.label="",this.variant="default",this.selectable=!1,this.dismissible=!1,this.disabled=!1,this.selected=!1}static{this.styles=E`
    :host { display: inline-flex; }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2xs);
      border-radius: var(--radius-full);
      border: var(--border-width-thin) solid var(--color-border-strong);
      background-color: var(--color-bg-surface);
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-sm);
      letter-spacing: 0.06em;
      overflow: hidden;
    }
    .chip:has(:focus-visible) { outline: var(--focus-ring-width) solid var(--color-focus); outline-offset: var(--focus-ring-offset); }
    .chip--primary   { border-color: var(--color-action-primary); background-color: oklch(from var(--color-action-primary) l c h / 0.08); }
    .chip--secondary { border-color: var(--color-action-secondary); background-color: oklch(from var(--color-action-secondary) l c h / 0.08); }
    .chip--success   { border-color: var(--color-status-success); background-color: var(--color-status-success-bg); }
    .chip--warning   { border-color: var(--color-status-warning); background-color: var(--color-status-warning-bg); }
    .chip--error     { border-color: var(--color-status-error); background-color: var(--color-status-error-bg); }
    .chip--selected  { border-color: var(--color-action-primary); background-color: var(--color-action-primary); }
    .chip--selected .chip__body { color: var(--color-text-on-action); }
    .chip--selected .chip__dismiss { color: var(--color-text-on-action); }
    .chip--disabled  { opacity: 0.5; cursor: not-allowed; }
    .chip__body {
      padding: 0.25em 0.7em;
      color: var(--color-text-default);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
    }
    .chip__body--button {
      background: none;
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-size: inherit;
      letter-spacing: inherit;
    }
    .chip__body--button:not(:disabled):hover { background-color: oklch(from var(--color-action-primary) l c h / 0.06); }
    .chip__body--link { text-decoration: none; font-family: inherit; font-size: inherit; letter-spacing: inherit; transition: background-color 0.15s ease, color 0.15s ease; }
    .chip__body--link:hover { background-color: oklch(from var(--color-action-primary) l c h / 0.06); color: var(--color-text-default); }
    .chip__dismiss {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      margin-right: var(--spacing-2xs);
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;
      border-radius: var(--radius-full);
      color: var(--color-text-subtle);
      flex-shrink: 0;
      transition: background-color 0.15s ease, color 0.15s ease;
    }
    .chip__dismiss svg { width: 0.625rem; height: 0.625rem; }
    .chip__dismiss:hover { background-color: oklch(from var(--color-action-primary) l c h / 0.12); color: var(--color-text-default); }
  `}_onToggle(){this.disabled||(this.selected=!this.selected,this.dispatchEvent(new CustomEvent("change",{detail:this.selected,bubbles:!0,composed:!0})))}_onDismiss(){this.disabled||this.dispatchEvent(new CustomEvent("dismiss",{bubbles:!0,composed:!0}))}render(){return b`
      <span class="${["chip",`chip--${this.variant}`,this.selected?"chip--selected":"",this.disabled?"chip--disabled":""].filter(Boolean).join(" ")}">
        ${this.linkHref?b`<a class="chip__body chip__body--link" href="${this.linkHref}">${this.label}</a>`:this.selectable?b`<button class="chip__body chip__body--button" aria-pressed="${this.selected}" ?disabled="${this.disabled}" @click="${this._onToggle}">${this.label}</button>`:b`<span class="chip__body">${this.label}</span>`}
        ${this.dismissible&&!this.linkHref?b`
          <button class="chip__dismiss" aria-label="Remove ${this.label}" ?disabled="${this.disabled}" @click="${this._onDismiss}">
            <svg aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${Sr}"/></svg>
          </button>
        `:v}
      </span>
    `}};u([f()],It.prototype,"label",void 0),u([f({reflect:!0})],It.prototype,"variant",void 0),u([f({type:Boolean})],It.prototype,"selectable",void 0),u([f({type:Boolean})],It.prototype,"dismissible",void 0),u([f({type:Boolean,reflect:!0})],It.prototype,"disabled",void 0),u([f({type:Boolean,reflect:!0})],It.prototype,"selected",void 0),u([f({attribute:"link-href"})],It.prototype,"linkHref",void 0),It=u([S("candor-chip")],It);var Fo=class extends C{constructor(...t){super(...t),this.items=[]}static{this.styles=E`
    :host { display: block; }
    .breadcrumb { display: block; }
    .breadcrumb__list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0;
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-sm);
      letter-spacing: 0.04em;
    }
    .breadcrumb__item {
      display: flex;
      align-items: center;
    }
    .breadcrumb__item:not(:last-child)::after {
      content: '/' / '';
      margin: 0 var(--spacing-xs);
      color: var(--color-text-subtle);
      pointer-events: none;
    }
    .breadcrumb__link {
      color: var(--color-link);
      font-weight: var(--font-weight-bold);
      text-decoration: none;
    }
    .breadcrumb__link:hover { color: var(--color-link-hover); text-decoration: underline; }
    .breadcrumb__link:focus-visible {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
      border-radius: var(--radius-sm);
    }
    .breadcrumb__current {
      color: var(--color-text-default);
      font-weight: var(--font-weight-bold);
    }
    .breadcrumb__item:only-child .breadcrumb__current { letter-spacing: 0.06em; }
  `}render(){return b`
      <nav aria-label="Breadcrumb" class="breadcrumb">
        <ol class="breadcrumb__list">
          ${this.items.map((t,e)=>b`
              <li class="breadcrumb__item">
                ${e===this.items.length-1?b`<span class="breadcrumb__current" aria-current="page">${t.label}</span>`:b`<a class="breadcrumb__link" href="${t.href||"#"}">${t.label}</a>`}
              </li>
            `)}
        </ol>
      </nav>
    `}};u([f({type:Array})],Fo.prototype,"items",void 0),Fo=u([S("candor-breadcrumb")],Fo);var $e=class extends C{constructor(...e){super(...e),this.currentPage=1,this.totalPages=1,this.compact=!1,this._ariaLabel="Pagination"}static{this.styles=E`
    :host { display: block; }
    .pagination {
      display: flex;
      align-items: center;
      gap: var(--spacing-2xs);
    }
    .pagination__btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: var(--spacing-lg);
      height: var(--spacing-lg);
      padding: 0 var(--spacing-2xs);
      border: none;
      border-radius: var(--radius-sm);
      background: transparent;
      color: var(--color-text-subtle);
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
      letter-spacing: var(--letter-spacing-italic);
      line-height: 1;
      cursor: pointer;
      transition: background-color 120ms ease, color 120ms ease;
    }
    .pagination__btn:hover:not(:disabled) {
      background-color: var(--color-bg-surface);
      color: var(--color-text-default);
    }
    .pagination__btn:disabled { opacity: 0.35; cursor: not-allowed; }
    .pagination__btn:focus-visible {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
      border-radius: var(--radius-sm);
    }
    .pagination__btn--current {
      background-color: var(--color-action-primary);
      color: var(--color-text-on-action);
      font-weight: var(--font-weight-medium);
    }
    .pagination__btn--current:hover:not(:disabled) {
      background-color: var(--color-action-primary);
      color: var(--color-text-on-action);
    }
    .pagination__icon { width: var(--font-size-sm); height: var(--font-size-sm); }
    .pagination__icon--prev { transform: rotate(90deg); }
    .pagination__icon--next { transform: rotate(-90deg); }
    .pagination__ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: var(--spacing-lg);
      height: var(--spacing-lg);
      color: var(--color-text-subtle);
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-sm);
      letter-spacing: var(--letter-spacing-italic);
      user-select: none;
    }
    .pagination__status {
      display: inline-flex;
      align-items: center;
      height: var(--spacing-lg);
      padding: 0 var(--spacing-xs);
      color: var(--color-text-default);
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-sm);
      letter-spacing: var(--letter-spacing-italic);
      line-height: 1;
      white-space: nowrap;
    }
  `}connectedCallback(){super.connectedCallback(),this._stopObservingAriaLabel=ot(this,e=>{this._ariaLabel=e})}disconnectedCallback(){this._stopObservingAriaLabel?.(),super.disconnectedCallback()}get _pages(){let e=this.totalPages,r=this.currentPage;if(e<=7)return Array.from({length:e},(s,n)=>n+1);let o=[1];r>3&&o.push("ellipsis");let i=Math.max(2,r-1),a=Math.min(e-1,r+1);for(let s=i;s<=a;s++)o.push(s);return r<e-2&&o.push("ellipsis"),o.push(e),o}_goTo(e){let r=Math.max(1,Math.min(e,this.totalPages));this.currentPage=r,this.dispatchEvent(new CustomEvent("change",{detail:r,bubbles:!0,composed:!0})),this.requestUpdate()}_renderPrev(){return b`
      <button class="pagination__btn pagination__prev" ?disabled="${this.currentPage<=1}" aria-label="Previous page" @click="${()=>this._goTo(this.currentPage-1)}">
        <svg class="pagination__icon pagination__icon--prev" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${Wt}"/></svg>
      </button>
    `}_renderNext(){return b`
      <button class="pagination__btn pagination__next" ?disabled="${this.currentPage>=this.totalPages}" aria-label="Next page" @click="${()=>this._goTo(this.currentPage+1)}">
        <svg class="pagination__icon pagination__icon--next" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${Wt}"/></svg>
      </button>
    `}render(){return this.compact?b`
        <nav aria-label="${this._ariaLabel}" class="pagination pagination--compact">
          ${this._renderPrev()}
          <span class="pagination__status" aria-live="polite" aria-atomic="true">Page ${this.currentPage} of ${this.totalPages}</span>
          ${this._renderNext()}
        </nav>
      `:b`
      <nav aria-label="${this._ariaLabel}" class="pagination">
        ${this._renderPrev()}
        ${this._pages.map(e=>e==="ellipsis"?b`<span class="pagination__ellipsis" aria-hidden="true">…</span>`:b`<button
                class="pagination__btn pagination__page ${e===this.currentPage?"pagination__btn--current":""}"
                aria-current="${e===this.currentPage?"page":v}"
                aria-label="Page ${e}"
                @click="${()=>this._goTo(e)}"
              >${e}</button>`)}
        ${this._renderNext()}
      </nav>
    `}};u([f({type:Number,attribute:"current-page"})],$e.prototype,"currentPage",void 0),u([f({type:Number,attribute:"total-pages"})],$e.prototype,"totalPages",void 0),u([f({type:Boolean,reflect:!0})],$e.prototype,"compact",void 0),u([M()],$e.prototype,"_ariaLabel",void 0),$e=u([S("candor-pagination")],$e);var sc=["button:not([disabled])","a[href]","input:not([disabled])","select:not([disabled])",'[role="button"]:not([aria-disabled="true"])','[role="checkbox"]:not([aria-disabled="true"])','[role="radio"]:not([aria-disabled="true"])'].join(", "),nc=0,Ye=class extends C{constructor(...t){super(...t),this.ariaLabelledby="",this.orientation="horizontal",this._ariaLabel="",this._toolbarId=`toolbar-${nc++}`}static{this.styles=E`
    *, ::before, ::after { box-sizing: border-box; }
    :host { display: block; }
    .toolbar {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      gap: var(--spacing-2xs);
      padding: var(--spacing-2xs);
      background: var(--color-bg-surface);
      border: var(--border-width-thin) solid var(--color-border-default);
      border-radius: var(--radius-md);
      /* On narrow viewports a full toolbar scrolls in a single row instead of
         overflowing the page. Roving-tabindex nav already scrolls focus into
         view, so keyboard users follow the row as they arrow through it. */
      max-width: 100%;
      overflow-x: auto;
    }
    /* Keep each item at its natural size so the row scrolls rather than the
       items squashing (flex children shrink by default). */
    ::slotted(*) { flex-shrink: 0; }
    .toolbar--vertical {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      width: fit-content;
      max-width: 100%;
      overflow-x: visible;
    }
  `}connectedCallback(){super.connectedCallback(),this._stopObservingAriaLabel=ot(this,t=>{this._ariaLabel=t})}disconnectedCallback(){this._stopObservingAriaLabel?.(),super.disconnectedCallback()}_getItems(){return Array.from(this.querySelectorAll(sc))}_initTabindexes(){this._getItems().forEach((t,e)=>t.setAttribute("tabindex",e===0?"0":"-1"))}firstUpdated(){requestAnimationFrame(()=>this._initTabindexes())}_onKeydown(t){let e=this.orientation==="horizontal",r=e?"ArrowLeft":"ArrowUp",o=e?"ArrowRight":"ArrowDown";if(![r,o,"Home","End"].includes(t.key))return;t.preventDefault();let i=this._getItems();if(!i.length)return;let a=i.indexOf(document.activeElement);if(a===-1)return;let s=a;t.key===o&&(s=Math.min(a+1,i.length-1)),t.key===r&&(s=Math.max(a-1,0)),t.key==="Home"&&(s=0),t.key==="End"&&(s=i.length-1),s!==a&&(i[a].setAttribute("tabindex","-1"),i[s].setAttribute("tabindex","0"),i[s].focus())}_onFocusin(t){let e=this._getItems(),r=t.target;e.includes(r)&&e.forEach(o=>o.setAttribute("tabindex",o===r?"0":"-1"))}render(){return b`
      <div
        role="toolbar"
        id="${this._toolbarId}"
        class="toolbar ${this.orientation==="vertical"?"toolbar--vertical":""}"
        aria-label="${this._ariaLabel||v}"
        aria-labelledby="${this.ariaLabelledby||v}"
        aria-orientation="${this.orientation}"
        @keydown="${this._onKeydown}"
        @focusin="${this._onFocusin}"
      >
        <slot @slotchange="${()=>this._initTabindexes()}"></slot>
      </div>
    `}};u([f({attribute:"aria-labelledby"})],Ye.prototype,"ariaLabelledby",void 0),u([f({reflect:!0})],Ye.prototype,"orientation",void 0),u([M()],Ye.prototype,"_ariaLabel",void 0),Ye=u([S("candor-toolbar")],Ye);var qo=class extends C{constructor(...t){super(...t),this.orientation="vertical"}static{this.styles=E`
    *, ::before, ::after { box-sizing: border-box; }
    :host { display: contents; }
    .separator {
      flex-shrink: 0;
      align-self: stretch;
      width: var(--border-width-thin);
      background-color: var(--color-border-strong);
      margin: var(--spacing-2xs) var(--spacing-xs);
    }
    .separator--horizontal {
      width: auto;
      height: var(--border-width-thin);
      align-self: auto;
      margin: var(--spacing-xs) var(--spacing-2xs);
    }
  `}render(){return b`
      <span
        role="separator"
        aria-orientation="${this.orientation}"
        class="separator ${this.orientation==="horizontal"?"separator--horizontal":""}"
      ></span>
    `}};u([f({reflect:!0})],qo.prototype,"orientation",void 0),qo=u([S("candor-toolbar-separator")],qo);var ie=class extends C{constructor(...t){super(...t),this.items=[],this.orientation="horizontal",this.theme="default",this.brand="",this.label="Main navigation"}static{this.styles=E`
    :host { display: block; }
    .nav { display: flex; font-family: var(--font-family-base); }
    .nav--horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-sm) var(--spacing-md);
      background-color: var(--color-bg-surface);
      border-bottom: var(--border-width-thin) solid var(--color-border-default);
    }
    .nav--horizontal .nav__brand { margin-right: var(--spacing-md); }
    .nav--horizontal .nav__list { flex-direction: row; flex-wrap: wrap; margin-left: auto; }
    .nav--vertical { flex-direction: column; padding: var(--spacing-sm); width: fit-content; }
    .nav--vertical .nav__brand { margin-bottom: var(--spacing-md); }
    .nav--vertical .nav__list { flex-direction: column; }
    .nav__brand { font-weight: var(--font-weight-bold); color: var(--color-text-default); font-size: var(--font-size-lg); }
    .nav__list { display: flex; list-style: none; gap: var(--spacing-xs); margin: 0; padding: 0; }
    .nav__link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--color-text-subtle-on-surface);
      font-size: var(--font-size-base);
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--radius-sm);
      text-decoration: none;
      transition: color 0.15s ease, background-color 0.15s ease;
    }
    .nav__link:hover { color: var(--color-text-default); background-color: var(--color-action-tertiary); }
    .nav__link--active { color: var(--color-action-primary); font-weight: var(--font-weight-semibold); }
    .nav__link:focus-visible { outline: var(--focus-ring-width) solid var(--color-focus); outline-offset: var(--focus-ring-offset); }
    .nav--inverse { background-color: var(--color-bg-inverse); border-bottom-color: var(--color-border-on-inverse); }
    .nav--inverse .nav__brand { color: var(--color-text-inverse); }
    .nav--inverse .nav__link { color: var(--color-text-subtle-on-inverse); }
    .nav--inverse .nav__link:hover { color: var(--color-text-inverse); background-color: oklch(from var(--color-text-inverse) l c h / 0.1); }
    .nav--inverse .nav__link--active { color: var(--color-text-inverse); font-weight: var(--font-weight-semibold); }
    .nav__badge {
      display: inline-flex; align-items: center; justify-content: center;
      background-color: var(--color-action-secondary); color: var(--color-text-on-action);
      font-size: var(--font-size-sm); border-radius: var(--radius-full);
      padding: 0.1em 0.4em; line-height: var(--line-height-tight); font-weight: var(--font-weight-semibold);
    }
  `}render(){return b`
      <nav class="${["nav",`nav--${this.orientation}`,this.theme==="inverse"?"nav--inverse":""].filter(Boolean).join(" ")}" aria-label="${this.label}">
        ${this.brand?b`<span class="nav__brand">${this.brand}</span>`:v}
        <ul class="nav__list" role="list">
          ${this.items.map(t=>b`
            <li class="nav__item">
              <a
                class="nav__link ${t.active?"nav__link--active":""}"
                href="${t.href}"
                aria-current="${t.active?"page":v}"
              >
                ${t.label}
                ${t.badge?b`<span class="nav__badge" aria-label="${t.badgeLabel||v}">${t.badge}</span>`:v}
              </a>
            </li>
          `)}
        </ul>
      </nav>
    `}};u([f({type:Array})],ie.prototype,"items",void 0),u([f({reflect:!0})],ie.prototype,"orientation",void 0),u([f({reflect:!0})],ie.prototype,"theme",void 0),u([f()],ie.prototype,"brand",void 0),u([f()],ie.prototype,"label",void 0),ie=u([S("candor-navigation")],ie);var G=class extends C{constructor(...e){super(...e),this._internals=this.attachInternals(),this.type="text",this.required=!1,this.multiline=!1,this.rows=3,this.resize="vertical",this.disabled=!1,this.value="",this._id=`candor-input-${Math.random().toString(36).slice(2,9)}`,this._hintId=`${this._id}-hint`,this._errorId=`${this._id}-error`}static{this.formAssociated=!0}static{this.styles=E`
    :host { display: block; }
    .input-wrapper { display: flex; flex-direction: column; gap: var(--spacing-xs); }
    .input-label { font-family: var(--font-family-accessible); font-size: var(--font-size-sm); font-weight: var(--font-weight-bold); color: var(--color-text-default); display: flex; letter-spacing: var(--letter-spacing-relaxed); }
    .input-required { margin-left: 0.25em; color: var(--color-status-error-text); }
    .input {
      font-family: var(--font-family-base);
      font-size: var(--candor-input-font-size, var(--font-size-md));
      padding: var(--candor-input-padding-y, var(--spacing-input-padding-y)) var(--candor-input-padding-x, var(--spacing-input-padding-x));
      border: var(--border-width-thin) solid var(--color-border-control);
      border-radius: var(--candor-input-radius, var(--radius-md));
      background-color: var(--color-bg-page);
      color: var(--color-text-default);
      transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      min-height: var(--hit-target-aaa);
      width: 100%;
      box-sizing: border-box;
    }
    .input::placeholder { color: var(--color-text-disabled); }
    .input:hover:not(:disabled) { border-color: var(--color-text-subtle); }
    .input:focus { outline: none; border-color: var(--color-action-primary); box-shadow: 0 0 0 var(--focus-ring-width) oklch(from var(--color-action-primary) l c h / 0.2); }
    .input--error { border-color: var(--color-status-error); }
    .input--error:focus { border-color: var(--color-status-error); box-shadow: 0 0 0 var(--focus-ring-width) oklch(from var(--color-status-error) l c h / 0.2); }
    .input--textarea { min-height: unset; line-height: var(--line-height-normal); }
    .input:disabled { background-color: var(--color-bg-surface); color: var(--color-text-disabled); cursor: not-allowed; border-color: var(--color-border-default); }
    .input-hint { margin-top: calc(-1 * var(--spacing-xs)); font-family: var(--font-family-accessible); font-size: var(--font-size-sm); letter-spacing: var(--letter-spacing-italic); color: var(--color-text-subtle); }
    .input-error-message { font-family: var(--font-family-accessible); font-size: var(--font-size-md); letter-spacing: var(--letter-spacing-italic); color: var(--color-status-error-text); }
    .input-error-live { display: contents; }
  `}updated(e){(e.has("value")||e.has("required"))&&(this._internals.setFormValue(this.value),this.required&&!this.value?this._internals.setValidity({valueMissing:!0},"Please fill in this field",this._field):this._internals.setValidity({}))}_onInput(e){let r=e.target;this.value=r.value,e.stopPropagation(),this.dispatchEvent(new CustomEvent("input",{detail:this.value,bubbles:!0,composed:!0}))}_onChange(){this.dispatchEvent(new CustomEvent("change",{detail:this.value,bubbles:!0,composed:!0}))}render(){let e=["input",this.error?"input--error":"",this.multiline?"input--textarea":""].filter(Boolean).join(" "),r=[this.hint?this._hintId:"",this._errorId].filter(Boolean).join(" ");return b`
      <div class="input-wrapper">
        ${this.label?b`
          <label part="label" class="input-label" for="${this._id}">
            ${this.label}
            ${this.required?b`<span class="input-required" aria-hidden="true">*</span>`:v}
          </label>
        `:v}
        ${this.hint?b`<span part="hint" id="${this._hintId}" class="input-hint">${this.hint}</span>`:v}
        ${this.multiline?b`<textarea
              part="input"
              id="${this._id}"
              class="${e}"
              .rows="${this.rows}"
              style="resize:${this.resize}"
              ?disabled="${this.disabled}"
              ?required="${this.required}"
              .placeholder="${this.placeholder||""}"
              .value="${this.value}"
              aria-invalid="${this.error?"true":v}"
              aria-describedby="${r}"
              name="${this.name||v}"
              autocomplete="${this.autocomplete||v}"
              @input="${this._onInput}"
              @change="${this._onChange}"
            ></textarea>`:b`<input
              part="input"
              id="${this._id}"
              class="${e}"
              type="${this.type}"
              ?disabled="${this.disabled}"
              ?required="${this.required}"
              .placeholder="${this.placeholder||""}"
              .value="${this.value}"
              aria-invalid="${this.error?"true":v}"
              aria-describedby="${r}"
              name="${this.name||v}"
              autocomplete="${this.autocomplete||v}"
              @input="${this._onInput}"
              @change="${this._onChange}"
            />`}
        <div id="${this._errorId}" class="input-error-live" role="alert" aria-live="polite" aria-atomic="true">
          ${this.error?b`<span part="error-message" class="input-error-message">${this.error}</span>`:v}
        </div>
      </div>
    `}};u([f()],G.prototype,"label",void 0),u([f()],G.prototype,"type",void 0),u([f()],G.prototype,"placeholder",void 0),u([f()],G.prototype,"error",void 0),u([f()],G.prototype,"hint",void 0),u([f({type:Boolean})],G.prototype,"required",void 0),u([f()],G.prototype,"name",void 0),u([f({type:Boolean})],G.prototype,"multiline",void 0),u([f({type:Number})],G.prototype,"rows",void 0),u([f()],G.prototype,"resize",void 0),u([f({type:Boolean})],G.prototype,"disabled",void 0),u([f()],G.prototype,"value",void 0),u([f()],G.prototype,"autocomplete",void 0),u([zt("input, textarea")],G.prototype,"_field",void 0),G=u([S("candor-input")],G);var ae=class extends C{constructor(...e){super(...e),this._internals=this.attachInternals(),this.checked=!1,this.disabled=!1,this.required=!1,this._id=`candor-checkbox-${Math.random().toString(36).slice(2,9)}`}static{this.formAssociated=!0}static{this.styles=E`
    :host { display: inline-flex; }
    .checkbox-wrapper {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      cursor: pointer;
      position: relative;
    }
    .checkbox-wrapper--disabled { opacity: 0.5; cursor: not-allowed; }
    .checkbox-input {
      position: absolute;
      opacity: 0;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
    .checkbox-input:focus-visible + .checkbox-box {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
    }
    .checkbox-input:checked + .checkbox-box {
      background-color: var(--color-action-primary);
      border-color: var(--color-action-primary);
    }
    .checkbox-input:checked + .checkbox-box::after {
      content: '';
      position: absolute;
      left: 6px;
      top: 2px;
      width: 6px;
      height: 12px;
      border: solid var(--color-text-on-action);
      border-width: 0 var(--border-width-medium) var(--border-width-medium) 0;
      transform: rotate(45deg);
    }
    .checkbox-input:disabled + .checkbox-box {
      background-color: var(--color-bg-surface);
      border-color: var(--color-border-default);
      cursor: not-allowed;
    }
    .checkbox-box {
      width: 20px;
      height: 20px;
      border: var(--border-width-medium) solid var(--color-border-control);
      border-radius: var(--radius-sm);
      background-color: var(--color-bg-page);
      position: relative;
      flex-shrink: 0;
      transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    }
    .checkbox-box:hover {
      border-color: var(--color-action-primary);
    }
    .checkbox-label {
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-md);
      color: var(--color-text-default);
      user-select: none;
      letter-spacing: 0.02em;
    }
  `}updated(e){e.has("checked")&&this._internals.setFormValue(this.checked?"on":null)}_onChange(e){this.checked=e.target.checked,this.dispatchEvent(new CustomEvent("change",{detail:this.checked,bubbles:!0,composed:!0}))}render(){return b`
      <label class="checkbox-wrapper ${this.disabled?"checkbox-wrapper--disabled":""}" for="${this._id}">
        <input
          class="checkbox-input"
          type="checkbox"
          id="${this._id}"
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          name="${this.name||v}"
          @change="${this._onChange}"
        />
        <span class="checkbox-box"></span>
        ${this.label?b`<span class="checkbox-label">${this.label}</span>`:v}
        <slot></slot>
      </label>
    `}};u([f()],ae.prototype,"label",void 0),u([f({type:Boolean,reflect:!0})],ae.prototype,"checked",void 0),u([f({type:Boolean,reflect:!0})],ae.prototype,"disabled",void 0),u([f({type:Boolean})],ae.prototype,"required",void 0),u([f()],ae.prototype,"name",void 0),ae=u([S("candor-checkbox")],ae);var se=class extends C{constructor(...e){super(...e),this._internals=this.attachInternals(),this.value="",this.checked=!1,this.disabled=!1,this._id=`candor-radio-${Math.random().toString(36).slice(2,9)}`}static{this.formAssociated=!0}static{this.styles=E`
    :host { display: inline-flex; }
    .radio-wrapper {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      cursor: pointer;
      position: relative;
    }
    .radio-wrapper--disabled { opacity: 0.5; cursor: not-allowed; }
    .radio-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    .radio-input:focus-visible + .radio-circle {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
    }
    .radio-input:checked + .radio-circle {
      border-color: var(--color-action-primary);
    }
    .radio-input:checked + .radio-circle::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--color-action-primary);
    }
    .radio-input:disabled + .radio-circle {
      background-color: var(--color-bg-surface);
      border-color: var(--color-border-default);
      cursor: not-allowed;
    }
    .radio-circle {
      width: 20px;
      height: 20px;
      border: var(--border-width-medium) solid var(--color-border-control);
      border-radius: 50%;
      background-color: var(--color-bg-page);
      position: relative;
      flex-shrink: 0;
      transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    }
    .radio-circle:hover {
      border-color: var(--color-action-primary);
    }
    .radio-label {
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-md);
      color: var(--color-text-default);
      user-select: none;
      letter-spacing: var(--letter-spacing-italic);
    }
  `}updated(e){(e.has("checked")||e.has("value"))&&this._internals.setFormValue(this.checked?this.value:null)}_onChange(e){e.target.checked&&this._select()}_onKeydown(e){let r=e.key==="ArrowDown"||e.key==="ArrowRight",o=e.key==="ArrowUp"||e.key==="ArrowLeft",i=e.key==="Home",a=e.key==="End";if(!r&&!o&&!i&&!a||!this.name)return;let s=this._groupSiblings();if(s.length<2)return;let n=s.indexOf(this);if(n<0)return;let l;l=i?s[0]:a?s[s.length-1]:r?s[(n+1)%s.length]:s[(n-1+s.length)%s.length],l!==this&&(e.preventDefault(),l._selectAndFocus())}_groupSiblings(){if(!this.name)return[];let e=this.closest("fieldset")||this.parentElement||document;return Array.from(e.querySelectorAll(`candor-radio[name="${CSS.escape(this.name)}"]`)).filter(r=>!r.disabled)}_select(){for(let e of this._groupSiblings())e!==this&&e.checked&&(e.checked=!1,e._internals.setFormValue(null));this.checked=!0,this._internals.setFormValue(this.value),this.dispatchEvent(new CustomEvent("change",{detail:this.value,bubbles:!0,composed:!0}))}_selectAndFocus(){this._select(),this.shadowRoot?.querySelector("input")?.focus()}render(){return b`
      <label class="radio-wrapper ${this.disabled?"radio-wrapper--disabled":""}" for="${this._id}">
        <input
          class="radio-input"
          type="radio"
          id="${this._id}"
          .value="${this.value}"
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          name="${this.name||v}"
          @change="${this._onChange}"
          @keydown="${this._onKeydown}"
        />
        <span class="radio-circle"></span>
        ${this.label?b`<span class="radio-label">${this.label}</span>`:v}
        <slot></slot>
      </label>
    `}};u([f()],se.prototype,"label",void 0),u([f()],se.prototype,"value",void 0),u([f()],se.prototype,"name",void 0),u([f({type:Boolean,reflect:!0})],se.prototype,"checked",void 0),u([f({type:Boolean,reflect:!0})],se.prototype,"disabled",void 0),se=u([S("candor-radio")],se);var Lt=class extends C{constructor(...e){super(...e),this._internals=this.attachInternals(),this.checked=!1,this.disabled=!1,this.required=!1,this._id=`candor-switch-${Math.random().toString(36).slice(2,9)}`,this._hintId=`${this._id}-hint`}static{this.formAssociated=!0}static{this.styles=E`
    :host { display: block; }
    .switch-container { display: flex; flex-direction: column; gap: var(--spacing-xs); }
    .switch-wrapper {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      cursor: pointer;
    }
    .switch-wrapper--disabled { opacity: 0.5; cursor: not-allowed; }
    .switch-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    .switch-input:focus-visible + .switch-track {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
    }
    .switch-input:checked + .switch-track {
      background-color: var(--color-action-primary);
      border-color: var(--color-action-primary);
    }
    .switch-input:checked + .switch-track .switch-thumb {
      background-color: var(--color-text-on-action);
      transform: translateX(20px);
    }
    .switch-input:disabled + .switch-track {
      background-color: var(--color-bg-surface);
      border-color: var(--color-border-default);
      cursor: not-allowed;
    }
    .switch-track {
      display: inline-flex;
      align-items: center;
      width: 44px;
      height: 24px;
      border-radius: var(--radius-full);
      background-color: var(--color-bg-surface);
      border: var(--border-width-medium) solid var(--color-border-control);
      padding: 3px;
      flex-shrink: 0;
      transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
      box-sizing: border-box;
    }
    .switch-track:hover {
      border-color: var(--color-action-primary);
    }
    .switch-thumb {
      width: 18px;
      height: 18px;
      border-radius: var(--radius-full);
      background-color: var(--color-border-control);
      transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
      flex-shrink: 0;
    }
    .switch-label {
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-md);
      color: var(--color-text-default);
      user-select: none;
      letter-spacing: var(--letter-spacing-italic);
    }
    .switch-hint {
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-sm);
      color: var(--color-text-subtle);
      letter-spacing: var(--letter-spacing-italic);
    }
  `}connectedCallback(){super.connectedCallback(),this._stopObservingAriaLabel=ot(this,e=>{this._ariaLabel=e})}disconnectedCallback(){this._stopObservingAriaLabel?.(),super.disconnectedCallback()}updated(e){e.has("checked")&&this._internals.setFormValue(this.checked?"on":null)}_onChange(e){this.checked=e.target.checked,this._internals.setFormValue(this.checked?"on":null),this.dispatchEvent(new CustomEvent("change",{detail:this.checked,bubbles:!0,composed:!0}))}render(){return b`
      <div class="switch-container">
        <label class="switch-wrapper ${this.disabled?"switch-wrapper--disabled":""}" for="${this._id}">
          <input
            class="switch-input"
            type="checkbox"
            role="switch"
            id="${this._id}"
            .checked="${this.checked}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            aria-label="${this._ariaLabel||v}"
            aria-describedby="${this.hint?this._hintId:v}"
            name="${this.name||v}"
            @change="${this._onChange}"
          />
          <span class="switch-track">
            <span class="switch-thumb"></span>
          </span>
          ${this.label?b`<span class="switch-label">${this.label}</span>`:v}
          <slot></slot>
        </label>
        ${this.hint?b`<span id="${this._hintId}" class="switch-hint">${this.hint}</span>`:v}
      </div>
    `}};u([f()],Lt.prototype,"label",void 0),u([f()],Lt.prototype,"hint",void 0),u([f()],Lt.prototype,"name",void 0),u([M()],Lt.prototype,"_ariaLabel",void 0),u([f({type:Boolean,reflect:!0})],Lt.prototype,"checked",void 0),u([f({type:Boolean,reflect:!0})],Lt.prototype,"disabled",void 0),u([f({type:Boolean})],Lt.prototype,"required",void 0),Lt=u([S("candor-switch")],Lt);var nt=class extends C{constructor(...e){super(...e),this._internals=this.attachInternals(),this.options=[],this.required=!1,this.disabled=!1,this.value="",this._ariaLabel="",this._id=`candor-select-${Math.random().toString(36).slice(2,9)}`,this._hintId=`${this._id}-hint`,this._errId=`${this._id}-err`}static{this.formAssociated=!0}static{this.styles=E`
    :host { display: block; }
    .select-wrapper { display: flex; flex-direction: column; gap: var(--spacing-xs); }
    .select-label { font-family: var(--font-family-accessible); font-size: var(--font-size-sm); font-weight: var(--font-weight-bold); color: var(--color-text-default); display: flex; gap: var(--spacing-xs); letter-spacing: var(--letter-spacing-relaxed); }
    .select-required { color: var(--color-status-error-text); }
    .select-hint {
      margin-top: calc(-1 * var(--spacing-xs));
      font-family: var(--font-family-accessible); font-size: var(--font-size-sm);
      letter-spacing: var(--letter-spacing-italic); color: var(--color-text-subtle);
    }
    .select-control { position: relative; display: flex; align-items: center; }
    .select {
      width: 100%;
      font-family: var(--font-family-base);
      font-size: var(--font-size-md);
      padding: var(--spacing-input-padding-y) var(--spacing-input-padding-x);
      padding-right: calc(var(--spacing-input-padding-x) + 1.75rem);
      border: var(--border-width-thin) solid var(--color-border-control);
      border-radius: var(--radius-md);
      background-color: var(--color-bg-page);
      color: var(--color-text-default);
      appearance: none;
      cursor: pointer;
      transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      min-height: var(--hit-target-aaa);
    }
    .select:hover:not(:disabled) { border-color: var(--color-text-subtle); }
    .select:focus { outline: none; border-color: var(--color-action-primary); box-shadow: 0 0 0 var(--focus-ring-width) oklch(from var(--color-action-primary) l c h / 0.2); }
    .select--error { border-color: var(--color-status-error); }
    .select--error:focus { border-color: var(--color-status-error); box-shadow: 0 0 0 var(--focus-ring-width) oklch(from var(--color-status-error) l c h / 0.2); }
    .select:disabled { background-color: var(--color-bg-surface); color: var(--color-text-disabled); cursor: not-allowed; border-color: var(--color-border-default); }
    .select__caret {
      position: absolute;
      right: var(--spacing-input-padding-x);
      width: 1rem;
      height: 1rem;
      pointer-events: none;
      color: var(--color-text-subtle);
      transition: color 0.15s ease;
    }
    .select-control:focus-within .select__caret { color: var(--color-action-primary); }
    .select-control--error .select__caret { color: var(--color-status-error); }
    .select-control--disabled .select__caret { color: var(--color-text-disabled); }
    .select-error-live { display: contents; }
    .select-error-message {
      font-family: var(--font-family-accessible); font-size: var(--font-size-md);
      letter-spacing: var(--letter-spacing-italic); color: var(--color-status-error-text);
    }
  `}updated(e){(e.has("value")||e.has("options"))&&this._internals.setFormValue(this.value||null),(e.has("value")||e.has("required"))&&(this.required&&!this.value?this._internals.setValidity({valueMissing:!0},"Please select an option",this._select):this._internals.setValidity({}))}connectedCallback(){super.connectedCallback(),this._stopObservingAriaLabel=ot(this,e=>{this._ariaLabel=e})}disconnectedCallback(){this._stopObservingAriaLabel?.(),super.disconnectedCallback()}_onChange(e){this.value=e.target.value,this._internals.setFormValue(this.value),this.dispatchEvent(new CustomEvent("change",{detail:this.value,bubbles:!0,composed:!0}))}render(){let e=[this.hint?this._hintId:"",this._errId].filter(Boolean).join(" ");return b`
      <div class="select-wrapper">
        ${this.label?b`
          <label class="select-label" for="${this._id}">
            ${this.label}
            ${this.required?b`<span class="select-required" aria-hidden="true">*</span>`:v}
          </label>
        `:v}
        ${this.hint?b`<span id="${this._hintId}" class="select-hint">${this.hint}</span>`:v}
        <div class="select-control ${this.error?"select-control--error":""} ${this.disabled?"select-control--disabled":""}">
          <select
            id="${this._id}"
            class="select ${this.error?"select--error":""}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            aria-invalid="${this.error?"true":v}"
            aria-describedby="${e}"
            aria-label="${this._ariaLabel||v}"
            name="${this.name||v}"
            @change="${this._onChange}"
          >
            ${this.placeholder?b`<option value="" .selected="${!this.value}" disabled>${this.placeholder}</option>`:v}
            ${this.options.map(r=>b`
              <option value="${r.value}" ?disabled="${r.disabled||!1}" .selected="${r.value===this.value}">${r.label}</option>
            `)}
          </select>
          <svg class="select__caret" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${Wt}"/></svg>
        </div>
        <div id="${this._errId}" class="select-error-live" role="alert" aria-live="polite" aria-atomic="true">
          ${this.error?b`<span class="select-error-message">${this.error}</span>`:v}
        </div>
      </div>
    `}};u([f({type:Array})],nt.prototype,"options",void 0),u([f()],nt.prototype,"label",void 0),u([f()],nt.prototype,"placeholder",void 0),u([f()],nt.prototype,"error",void 0),u([f()],nt.prototype,"hint",void 0),u([f({type:Boolean})],nt.prototype,"required",void 0),u([f({type:Boolean})],nt.prototype,"disabled",void 0),u([f()],nt.prototype,"value",void 0),u([f()],nt.prototype,"name",void 0),u([M()],nt.prototype,"_ariaLabel",void 0),u([zt("select")],nt.prototype,"_select",void 0),nt=u([S("candor-select")],nt);var ft=class extends C{constructor(...e){super(...e),this._internals=this.attachInternals(),this.min=0,this.max=1,this.step=.001,this.value=0,this.disabled=!1,this._id=`candor-slider-${Math.random().toString(36).slice(2,9)}`}static{this.formAssociated=!0}static{this.styles=E`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      /* Sizing — consumers may override per-instance:
         candor-slider { --candor-slider-thumb-size: 1.75rem; } */
      --candor-slider-track-height: 4px;
      --candor-slider-thumb-size: 1.375rem;
      --candor-slider-gradient-height: 2.75rem;
    }
    :host([disabled]) { opacity: 0.5; pointer-events: none; }
    .slider__label {
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-default);
      letter-spacing: var(--letter-spacing-relaxed);
    }
    .slider__row {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }
    .slider__track {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .slider__track--gradient {
      height: var(--candor-slider-gradient-height);
      border-radius: var(--radius-sm);
      border: var(--border-width-thin) solid var(--color-border-default);
      padding: 0 var(--spacing-xs);
    }
    .slider__input {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      background: transparent;
      cursor: pointer;
      padding: 0;
      margin: 0;
    }
    .slider__input::-webkit-slider-runnable-track {
      height: var(--candor-slider-track-height);
      border-radius: 99px;
      background: linear-gradient(
        to right,
        var(--color-action-primary) var(--fill-percent, 50%),
        var(--color-border-strong) var(--fill-percent, 50%)
      );
    }
    .slider__track--gradient .slider__input::-webkit-slider-runnable-track {
      background: transparent;
    }
    .slider__input::-moz-range-track {
      height: var(--candor-slider-track-height);
      border-radius: 99px;
      background: linear-gradient(
        to right,
        var(--color-action-primary) var(--fill-percent, 50%),
        var(--color-border-strong) var(--fill-percent, 50%)
      );
    }
    .slider__track--gradient .slider__input::-moz-range-track {
      background: transparent;
    }
    .slider__input::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: var(--candor-slider-thumb-size);
      height: var(--candor-slider-thumb-size);
      margin-top: calc((var(--candor-slider-thumb-size) - var(--candor-slider-track-height)) / -2);
      border-radius: 50%;
      background: var(--color-slider-thumb);
      border: var(--border-width-medium) solid var(--color-border-control);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
      cursor: pointer;
      transition: transform 0.1s ease, box-shadow 0.1s ease;
    }
    .slider__input:hover:not(:disabled)::-webkit-slider-thumb {
      transform: scale(1.1);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.28);
    }
    .slider__input::-moz-range-thumb {
      width: var(--candor-slider-thumb-size);
      height: var(--candor-slider-thumb-size);
      border-radius: 50%;
      background: var(--color-slider-thumb);
      border: var(--border-width-medium) solid var(--color-border-control);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
      cursor: pointer;
      transition: transform 0.1s ease, box-shadow 0.1s ease;
    }
    .slider__input:hover:not(:disabled)::-moz-range-thumb {
      transform: scale(1.1);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.28);
    }
    .slider__input:focus { outline: none; }
    .slider__input:focus-visible::-webkit-slider-thumb {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
    }
    .slider__input:focus-visible::-moz-range-thumb {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
    }
    .slider__input:disabled { cursor: not-allowed; }
    .slider__value {
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-sm);
      color: var(--color-text-subtle);
      min-width: 3ch;
      text-align: right;
      letter-spacing: var(--letter-spacing-italic);
    }
  `}connectedCallback(){super.connectedCallback(),this._stopObservingAriaLabel=ot(this,e=>{this._ariaLabel=e})}disconnectedCallback(){this._stopObservingAriaLabel?.(),super.disconnectedCallback()}updated(e){e.has("value")&&this._internals.setFormValue(String(this.value))}get _fillPercent(){return(this.value-this.min)/(this.max-this.min)*100}get _valueText(){return this.valueTextFn?this.valueTextFn(this.value):String(this.value)}_onInput(e){this.value=parseFloat(e.target.value),this._internals.setFormValue(String(this.value)),e.stopPropagation(),this.dispatchEvent(new CustomEvent("input",{detail:this.value,bubbles:!0,composed:!0}))}_onChange(){this.dispatchEvent(new CustomEvent("change",{detail:this.value,bubbles:!0,composed:!0}))}render(){let e=!!this.gradient;return b`
      ${this.label?b`<label class="slider__label" for="${this._id}">${this.label}</label>`:v}
      <div class="slider__row">
        <div
          class="slider__track${e?" slider__track--gradient":""}"
          style="${e?`background: ${this.gradient}`:""}"
        >
          <input
            class="slider__input"
            type="range"
            id="${this._id}"
            .min="${String(this.min)}"
            .max="${String(this.max)}"
            .step="${String(this.step)}"
            .value="${String(this.value)}"
            style="--fill-percent:${this._fillPercent}%"
            ?disabled="${this.disabled}"
            aria-label="${this._ariaLabel||v}"
            aria-valuetext="${this._valueText}"
            @input="${this._onInput}"
            @change="${this._onChange}"
          />
        </div>
        ${e?v:b`<span class="slider__value" aria-hidden="true">${this._valueText}</span>`}
      </div>
    `}};u([f({type:Number})],ft.prototype,"min",void 0),u([f({type:Number})],ft.prototype,"max",void 0),u([f({type:Number})],ft.prototype,"step",void 0),u([f({type:Number})],ft.prototype,"value",void 0),u([f()],ft.prototype,"label",void 0),u([f({type:Boolean,reflect:!0})],ft.prototype,"disabled",void 0),u([M()],ft.prototype,"_ariaLabel",void 0),u([f({attribute:"value-text-fn",type:Object})],ft.prototype,"valueTextFn",void 0),u([f()],ft.prototype,"gradient",void 0),ft=u([S("candor-slider")],ft);var lc=0,tt=class extends C{constructor(...e){super(...e),this._internals=this.attachInternals(),this.label="",this.value="",this.placeholder="Select an option",this.error="",this.hint="",this.required=!1,this.disabled=!1,this.options=[],this._open=!1,this._activeIndex=-1,this._ariaLabel="",this._id=lc++,this._triggerId=`candor-listbox-trigger-${this._id}`,this._listId=`candor-listbox-list-${this._id}`,this._hintId=`candor-listbox-hint-${this._id}`,this._errId=`candor-listbox-err-${this._id}`,this._onDocumentClick=r=>{this._open&&!this.contains(r.target)&&this._close()}}static{this.formAssociated=!0}static{this.styles=E`
    :host { display: block; }
    .listbox-wrapper {
      display: flex; flex-direction: column; gap: var(--spacing-xs); position: relative;
    }
    .listbox-wrapper--disabled .listbox__label { color: var(--color-text-disabled); }
    .listbox__label {
      font-family: var(--font-family-accessible); font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold); color: var(--color-text-default); letter-spacing: var(--letter-spacing-relaxed);
    }
    .listbox__required { color: var(--color-status-error-text); margin-left: 0.25em; }
    .listbox__hint {
      margin-top: calc(-1 * var(--spacing-xs));
      font-family: var(--font-family-accessible); font-size: var(--font-size-sm);
      letter-spacing: var(--letter-spacing-italic); color: var(--color-text-subtle);
    }
    .listbox__trigger {
      appearance: none; -webkit-appearance: none;
      display: flex; align-items: center; justify-content: space-between;
      width: 100%; min-height: var(--hit-target-aaa);
      padding: var(--spacing-input-padding-y) var(--spacing-input-padding-x);
      font-family: var(--font-family-base); font-size: var(--font-size-md);
      color: var(--color-text-default); background-color: var(--color-bg-page);
      --_border-color: var(--color-border-control);
      border: var(--border-width-thin) solid var(--_border-color);
      border-radius: var(--radius-md); cursor: pointer; text-align: left;
      gap: var(--spacing-xs); transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .listbox__trigger:hover:not(:disabled) { --_border-color: var(--color-text-subtle); }
    .listbox__trigger:focus-visible {
      outline: none; --_border-color: var(--color-action-primary);
      box-shadow: 0 0 0 var(--focus-ring-width) oklch(from var(--color-action-primary) l c h / 0.2);
    }
    .listbox__trigger.listbox__trigger--error { --_border-color: var(--color-status-error); }
    .listbox__trigger.listbox__trigger--error:focus-visible {
      --_border-color: var(--color-status-error);
      box-shadow: 0 0 0 var(--focus-ring-width) oklch(from var(--color-status-error) l c h / 0.2);
    }
    .listbox__trigger:disabled {
      background-color: var(--color-bg-surface); color: var(--color-text-disabled);
      --_border-color: var(--color-border-default); cursor: not-allowed;
    }
    .listbox__trigger-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .listbox__caret {
      flex-shrink: 0; width: 1rem; height: 1rem; color: var(--color-text-subtle);
      transition: transform 200ms ease, color 200ms ease;
    }
    .listbox__caret--open { transform: rotate(180deg); color: var(--color-action-primary); }
    .listbox__trigger:disabled .listbox__caret { color: var(--color-text-disabled); }
    .listbox__dropdown {
      position: absolute; top: calc(100% + var(--spacing-2xs)); left: 0; right: 0; z-index: 200;
      margin: 0; max-height: 16rem; overflow-y: auto;
      background: var(--color-bg-elevated);
      border: var(--border-width-thin) solid var(--color-border-default);
      border-radius: var(--radius-md); box-shadow: var(--shadow-modal); padding: var(--spacing-2xs) 0;
    }
    .listbox__option {
      display: flex; align-items: center; justify-content: space-between;
      padding: var(--spacing-input-padding-y) var(--spacing-input-padding-x);
      font-family: var(--font-family-base); font-size: var(--font-size-md);
      color: var(--color-text-default); cursor: pointer; user-select: none; gap: var(--spacing-xs);
    }
    .listbox__option--active { background-color: var(--color-bg-surface); }
    .listbox__option--selected { color: var(--color-action-primary); font-weight: var(--font-weight-medium); }
    .listbox__option--active.listbox__option--selected { background-color: var(--color-bg-surface); }
    .listbox__option--disabled { color: var(--color-text-disabled); cursor: not-allowed; pointer-events: none; }
    .listbox__option-label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .listbox__option-check { flex-shrink: 0; color: var(--color-action-primary); font-size: 1rem; }
    .listbox__error-live { display: contents; }
    .listbox__error-message {
      font-family: var(--font-family-accessible); font-size: var(--font-size-md);
      letter-spacing: var(--letter-spacing-italic); color: var(--color-status-error-text);
    }
  `}get _selectedOption(){return this.options.find(e=>e.value===this.value)}get _activeOptionId(){return this._activeIndex>=0?`candor-listbox-opt-${this._id}-${this._activeIndex}`:""}updated(e){(e.has("value")||e.has("options"))&&this._internals.setFormValue(this.value||null),(e.has("value")||e.has("required"))&&(this.required&&!this.value?this._internals.setValidity({valueMissing:!0},"Please select an option",this._trigger):this._internals.setValidity({}))}_open_(){if(this.disabled)return;this._open=!0;let e=this.options.findIndex(r=>r.value===this.value);this._activeIndex=e>=0?e:0}_close(){this._open=!1,this._activeIndex=-1,this.shadowRoot?.getElementById(this._triggerId)?.focus()}_select(e){e.disabled||(this.value=e.value,this._internals.setFormValue(e.value),this.dispatchEvent(new CustomEvent("change",{detail:e,bubbles:!0,composed:!0})),this._close())}_onTriggerKeydown(e){["ArrowDown","Enter"," "].includes(e.key)||e.key==="ArrowUp"?(e.preventDefault(),this._open_()):e.key==="Escape"&&this._close()}_onListKeydown(e){let r=this._activeIndex;switch(e.key){case"ArrowDown":e.preventDefault(),this._activeIndex=Math.min(r+1,this.options.length-1);break;case"ArrowUp":e.preventDefault(),this._activeIndex=Math.max(r-1,0);break;case"Home":e.preventDefault(),this._activeIndex=0;break;case"End":e.preventDefault(),this._activeIndex=this.options.length-1;break;case"Enter":case" ":e.preventDefault(),r>=0&&this._select(this.options[r]);break;case"Escape":case"Tab":this._close();break}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocumentClick),this._stopObservingAriaLabel=ot(this,e=>{this._ariaLabel=e})}disconnectedCallback(){this._stopObservingAriaLabel?.(),super.disconnectedCallback(),document.removeEventListener("click",this._onDocumentClick)}render(){let e=this._selectedOption,r=[this.hint?this._hintId:"",this._errId].filter(Boolean).join(" ");return b`
      <div class="listbox-wrapper ${this.disabled?"listbox-wrapper--disabled":""}">
        ${this.label?b`
          <label id="${this._triggerId}-label" class="listbox__label">
            ${this.label}
            ${this.required?b`<span class="listbox__required" aria-hidden="true">*</span>`:v}
          </label>
        `:v}
        ${this.hint?b`<span id="${this._hintId}" class="listbox__hint">${this.hint}</span>`:v}
        <div style="position:relative">
          <button
            id="${this._triggerId}"
            class="listbox__trigger ${this.error?"listbox__trigger--error":""}"
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded="${this._open}"
            aria-controls="${this._listId}"
            aria-labelledby="${this.label?this._triggerId+"-label":v}"
            aria-label="${this._ariaLabel||v}"
            aria-required="${this.required||v}"
            aria-invalid="${this.error?"true":v}"
            aria-describedby="${r}"
            ?disabled="${this.disabled}"
            @click="${()=>this._open?this._close():this._open_()}"
            @keydown="${this._onTriggerKeydown}"
          >
            <span class="listbox__trigger-text">
              ${e?e.label:b`<span style="color:var(--color-text-subtle)">${this.placeholder}</span>`}
            </span>
            <svg class="listbox__caret ${this._open?"listbox__caret--open":""}" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${Wt}"/></svg>
          </button>
          ${this._open?b`
            <ul
              id="${this._listId}"
              role="listbox"
              class="listbox__dropdown"
              aria-activedescendant="${this._activeOptionId||v}"
              tabindex="-1"
              @keydown="${this._onListKeydown}"
            >
              ${this.options.map((o,i)=>b`
                <li
                  id="candor-listbox-opt-${this._id}-${i}"
                  role="option"
                  class="listbox__option
                    ${i===this._activeIndex?"listbox__option--active":""}
                    ${o.value===this.value?"listbox__option--selected":""}
                    ${o.disabled?"listbox__option--disabled":""}"
                  aria-selected="${o.value===this.value}"
                  aria-disabled="${o.disabled||v}"
                  @click="${()=>this._select(o)}"
                  @mouseenter="${()=>this._activeIndex=i}"
                >
                  <span class="listbox__option-label">${o.label}</span>
                  ${o.value===this.value?b`<span class="listbox__option-check" aria-hidden="true">✓</span>`:v}
                </li>
              `)}
            </ul>
          `:v}
        </div>
        <div id="${this._errId}" class="listbox__error-live" role="alert" aria-live="polite" aria-atomic="true">
          ${this.error?b`<span class="listbox__error-message">${this.error}</span>`:v}
        </div>
      </div>
    `}};u([f()],tt.prototype,"label",void 0),u([f()],tt.prototype,"value",void 0),u([f()],tt.prototype,"placeholder",void 0),u([f()],tt.prototype,"error",void 0),u([f()],tt.prototype,"hint",void 0),u([f({type:Boolean})],tt.prototype,"required",void 0),u([f({type:Boolean})],tt.prototype,"disabled",void 0),u([f({type:Array})],tt.prototype,"options",void 0),u([M()],tt.prototype,"_open",void 0),u([M()],tt.prototype,"_activeIndex",void 0),u([M()],tt.prototype,"_ariaLabel",void 0),u([zt("button")],tt.prototype,"_trigger",void 0),tt=u([S("candor-listbox")],tt);var cc=0,W=class extends C{constructor(...t){super(...t),this._internals=this.attachInternals(),this.label="",this.value="",this.placeholder="Search…",this.error="",this.hint="",this.required=!1,this.disabled=!1,this.options=[],this._inputValue="",this._open=!1,this._activeIndex=-1,this._filtering=!1,this._ariaLabel="",this._id=cc++,this._inputId=`candor-combobox-input-${this._id}`,this._listId=`candor-combobox-list-${this._id}`,this._hintId=`candor-combobox-hint-${this._id}`,this._errId=`candor-combobox-err-${this._id}`,this._onDocumentClick=e=>{if(this._open&&!this.contains(e.target)){this._open=!1,this._filtering=!1;let r=this.options.find(o=>o.value===this.value);this._inputValue=r?r.label:""}}}static{this.formAssociated=!0}static{this.styles=E`
    :host { display: block; }
    .combobox-wrapper {
      display: flex; flex-direction: column; gap: var(--spacing-xs); position: relative;
    }
    .combobox-wrapper--disabled .combobox__label { color: var(--color-text-disabled); }
    .combobox-wrapper--disabled .combobox__caret { cursor: not-allowed; }
    .combobox__label {
      font-family: var(--font-family-accessible); font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold); color: var(--color-text-default); letter-spacing: var(--letter-spacing-relaxed);
    }
    .combobox__required { color: var(--color-status-error-text); margin-left: 0.25em; }
    .combobox__control { position: relative; display: flex; align-items: center; }
    .combobox__input {
      width: 100%; min-height: var(--hit-target-aaa);
      padding: var(--spacing-input-padding-y) var(--spacing-input-padding-x);
      padding-right: calc(var(--spacing-input-padding-x) + 1.75rem);
      font-family: var(--font-family-base); font-size: var(--font-size-md);
      color: var(--color-text-default); background-color: var(--color-bg-page);
      border: var(--border-width-thin) solid var(--color-border-control);
      border-radius: var(--radius-md); box-sizing: border-box;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .combobox__input::placeholder { color: var(--color-text-subtle); }
    .combobox__input:hover:not(:disabled) { border-color: var(--color-text-subtle); }
    .combobox__input:focus {
      outline: none; border-color: var(--color-action-primary);
      box-shadow: 0 0 0 var(--focus-ring-width) oklch(from var(--color-action-primary) l c h / 0.2);
    }
    .combobox__input:disabled {
      background-color: var(--color-bg-surface); color: var(--color-text-disabled);
      border-color: var(--color-border-default); cursor: not-allowed;
    }
    .combobox__control--error .combobox__input { border-color: var(--color-status-error); }
    .combobox__control--error .combobox__input:focus {
      border-color: var(--color-status-error);
      box-shadow: 0 0 0 var(--focus-ring-width) oklch(from var(--color-status-error) l c h / 0.2);
    }
    .combobox__caret {
      position: absolute; right: var(--spacing-input-padding-x);
      width: 1rem; height: 1rem; color: var(--color-text-subtle); cursor: pointer;
      transition: transform 200ms ease, color 200ms ease;
    }
    .combobox__caret--open { transform: rotate(180deg); color: var(--color-action-primary); }
    .combobox__control:focus-within .combobox__caret { color: var(--color-action-primary); }
    .combobox__dropdown {
      position: absolute; top: calc(100% + var(--spacing-2xs)); left: 0; right: 0; z-index: 200;
      margin: 0; max-height: 16rem; overflow-y: auto;
      background: var(--color-bg-elevated);
      border: var(--border-width-thin) solid var(--color-border-default);
      border-radius: var(--radius-md); box-shadow: var(--shadow-modal); padding: var(--spacing-2xs) 0;
    }
    .combobox__option {
      display: flex; align-items: center; justify-content: space-between;
      padding: var(--spacing-input-padding-y) var(--spacing-input-padding-x);
      font-family: var(--font-family-base); font-size: var(--font-size-md);
      color: var(--color-text-default); cursor: pointer; user-select: none; gap: var(--spacing-xs);
    }
    .combobox__option--active { background-color: var(--color-bg-surface); }
    .combobox__option--selected { color: var(--color-action-primary); font-weight: var(--font-weight-medium); }
    .combobox__option-label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .combobox__option-check { flex-shrink: 0; color: var(--color-action-primary); font-size: 1rem; }
    .combobox__no-results {
      padding: var(--spacing-input-padding-y) var(--spacing-input-padding-x);
      font-family: var(--font-family-base); font-size: var(--font-size-md);
      color: var(--color-text-subtle); font-style: italic;
    }
    .combobox__hint {
      margin-top: calc(-1 * var(--spacing-xs));
      font-family: var(--font-family-accessible); font-size: var(--font-size-sm);
      letter-spacing: var(--letter-spacing-italic); color: var(--color-text-subtle);
    }
    .combobox__description {
      font-family: var(--font-family-accessible); font-size: var(--font-size-sm);
      letter-spacing: var(--letter-spacing-italic); min-height: var(--hit-target-aa);
    }
    .combobox__error { color: var(--color-status-error-text); font-size: var(--font-size-md); }
  `}get _filtered(){if(!this._filtering||!this._inputValue)return this.options;let t=this._inputValue.toLowerCase();return this.options.filter(e=>e.label.toLowerCase().includes(t))}get _activeOptionId(){return this._activeIndex>=0?`candor-combobox-opt-${this._id}-${this._activeIndex}`:""}_onInput(t){this._inputValue=t.target.value,this._filtering=!0,this._open=!0,this._activeIndex=-1,this._inputValue||(this.value="",this._filtering=!1,this._internals.setFormValue("")),t.stopPropagation(),this.dispatchEvent(new CustomEvent("input",{detail:this._inputValue,bubbles:!0,composed:!0}))}_select(t){this.value=t.value,this._inputValue=t.label,this._filtering=!1,this._internals.setFormValue(t.value),this.dispatchEvent(new CustomEvent("change",{detail:t,bubbles:!0,composed:!0})),this._open=!1,this._activeIndex=-1}_clear(){this.value="",this._inputValue="",this._internals.setFormValue(""),this._open=!1,this._input?.focus()}_onKeydown(t){let e=this._filtered;switch(t.key){case"ArrowDown":t.preventDefault(),this._open=!0,this._activeIndex=Math.min(this._activeIndex+1,e.length-1);break;case"ArrowUp":t.preventDefault(),this._activeIndex=Math.max(this._activeIndex-1,-1);break;case"Enter":t.preventDefault(),this._activeIndex>=0&&e[this._activeIndex]&&this._select(e[this._activeIndex]);break;case"Escape":this._open?this._open=!1:(this.value||this._inputValue)&&(this.value="",this._inputValue="",this._filtering=!1,this._activeIndex=-1,this._internals.setFormValue(null),this.dispatchEvent(new CustomEvent("change",{detail:null,bubbles:!0,composed:!0})));break}}updated(t){if(t.has("value")||t.has("options")){let e=this.options.find(r=>r.value===this.value);e?this._inputValue=e.label:t.has("value")&&!this.value&&(this._inputValue=""),this._internals.setFormValue(this.value||null)}(t.has("value")||t.has("required"))&&(this.required&&!this.value?this._internals.setValidity({valueMissing:!0},"Please select an option",this._input):this._internals.setValidity({}))}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocumentClick),this._stopObservingAriaLabel=ot(this,t=>{this._ariaLabel=t})}disconnectedCallback(){this._stopObservingAriaLabel?.(),super.disconnectedCallback(),document.removeEventListener("click",this._onDocumentClick)}render(){let t=this._filtered,e=[this.hint?this._hintId:"",this._errId].filter(Boolean).join(" ");return b`
      <div class="combobox-wrapper ${this.disabled?"combobox-wrapper--disabled":""}">
        ${this.label?b`
          <label for="${this._inputId}" class="combobox__label">
            ${this.label}
            ${this.required?b`<span class="combobox__required" aria-hidden="true">*</span>`:v}
          </label>
        `:v}
        ${this.hint?b`<span id="${this._hintId}" class="combobox__hint">${this.hint}</span>`:v}
        <div style="position:relative">
          <div class="combobox__control ${this.error?"combobox__control--error":""}">
            <input
              id="${this._inputId}"
              class="combobox__input"
              type="text"
              role="combobox"
              autocomplete="off"
              aria-label="${this._ariaLabel||v}"
              aria-autocomplete="list"
              aria-expanded="${this._open}"
              aria-controls="${this._listId}"
              aria-activedescendant="${this._activeOptionId||v}"
              aria-required="${this.required||v}"
              aria-invalid="${this.error?"true":v}"
              aria-describedby="${e}"
              .value="${this._inputValue}"
              placeholder="${this.placeholder}"
              ?disabled="${this.disabled}"
              @input="${this._onInput}"
              @focus="${()=>{this._open=!0,this._filtering=!1}}"
              @click="${()=>{this._open=!0,this._filtering=!1}}"
              @keydown="${this._onKeydown}"
            >
            <svg class="combobox__caret ${this._open?"combobox__caret--open":""}" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"
              @mousedown="${r=>{if(this.disabled)return;r.preventDefault();let o=this._open;this._input.focus(),this._open=!o,this._filtering=!1}}"
            ><path d="${Wt}"/></svg>
          </div>
          ${this._open&&t.length>0?b`
            <ul id="${this._listId}" role="listbox" class="combobox__dropdown">
              ${t.map((r,o)=>b`
                <li
                  id="candor-combobox-opt-${this._id}-${o}"
                  role="option"
                  class="combobox__option
                    ${o===this._activeIndex?"combobox__option--active":""}
                    ${r.value===this.value?"combobox__option--selected":""}"
                  aria-selected="${r.value===this.value}"
                  @mousedown="${i=>{i.preventDefault(),this._select(r)}}"
                  @mouseenter="${()=>this._activeIndex=o}"
                >
                  <span class="combobox__option-label">${r.label}</span>
                  ${r.value===this.value?b`<span class="combobox__option-check" aria-hidden="true">✓</span>`:v}
                </li>
              `)}
            </ul>
          `:this._open&&this._inputValue&&t.length===0?b`
            <div class="combobox__dropdown">
              <div class="combobox__no-results">No results for "${this._inputValue}"</div>
            </div>
          `:v}
        </div>
        <span id="${this._errId}" class="combobox__description combobox__error" role="alert">${this.error}</span>
      </div>
    `}};u([f()],W.prototype,"label",void 0),u([f()],W.prototype,"value",void 0),u([f()],W.prototype,"placeholder",void 0),u([f()],W.prototype,"error",void 0),u([f()],W.prototype,"hint",void 0),u([f({type:Boolean})],W.prototype,"required",void 0),u([f({type:Boolean})],W.prototype,"disabled",void 0),u([f({type:Array})],W.prototype,"options",void 0),u([M()],W.prototype,"_inputValue",void 0),u([M()],W.prototype,"_open",void 0),u([M()],W.prototype,"_activeIndex",void 0),u([M()],W.prototype,"_filtering",void 0),u([M()],W.prototype,"_ariaLabel",void 0),u([zt(".combobox__input")],W.prototype,"_input",void 0),W=u([S("candor-combobox")],W);var dc=0,K=class extends C{constructor(...t){super(...t),this._internals=this.attachInternals(),this.label="",this.value="",this.placeholder="",this.error="",this.hint="",this.required=!1,this.disabled=!1,this.suggestions=[],this.maxSuggestions=8,this._open=!1,this._activeIndex=-1,this._ariaLabel="",this._id=dc++,this._inputId=`candor-autocomplete-input-${this._id}`,this._listId=`candor-autocomplete-list-${this._id}`,this._hintId=`candor-autocomplete-hint-${this._id}`,this._errId=`candor-autocomplete-err-${this._id}`,this._onDocumentClick=e=>{this._open&&!this.contains(e.target)&&(this._open=!1,this._activeIndex=-1)}}static{this.formAssociated=!0}static{this.styles=E`
    :host { display: block; }
    .autocomplete-wrapper {
      display: flex; flex-direction: column; gap: var(--spacing-xs); position: relative;
    }
    .autocomplete-wrapper--disabled .autocomplete__label { color: var(--color-text-disabled); }
    .autocomplete__label {
      font-family: var(--font-family-accessible); font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold); color: var(--color-text-default); letter-spacing: var(--letter-spacing-relaxed);
    }
    .autocomplete__required { color: var(--color-status-error-text); margin-left: 0.25em; }
    .autocomplete__control { position: relative; display: flex; align-items: center; }
    .autocomplete__input {
      width: 100%; min-height: var(--hit-target-aaa);
      padding: var(--candor-autocomplete-padding-y, var(--spacing-input-padding-y)) var(--candor-autocomplete-padding-x, var(--spacing-input-padding-x));
      font-family: var(--font-family-base); font-size: var(--candor-autocomplete-font-size, var(--font-size-md));
      color: var(--color-text-default); background-color: var(--color-bg-page);
      border: var(--border-width-thin) solid var(--color-border-control);
      border-radius: var(--candor-autocomplete-radius, var(--radius-md)); box-sizing: border-box;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .autocomplete__input::placeholder { color: var(--color-text-subtle); }
    .autocomplete__input:hover:not(:disabled) { border-color: var(--color-text-subtle); }
    .autocomplete__input:focus {
      outline: none; border-color: var(--color-action-primary);
      box-shadow: 0 0 0 var(--focus-ring-width) oklch(from var(--color-action-primary) l c h / 0.2);
    }
    .autocomplete__input:disabled {
      background-color: var(--color-bg-surface); color: var(--color-text-disabled);
      border-color: var(--color-border-default); cursor: not-allowed;
    }
    .autocomplete__control--error .autocomplete__input { border-color: var(--color-status-error); }
    .autocomplete__control--error .autocomplete__input:focus {
      border-color: var(--color-status-error);
      box-shadow: 0 0 0 var(--focus-ring-width) oklch(from var(--color-status-error) l c h / 0.2);
    }
    .autocomplete__dropdown {
      position: absolute; top: calc(100% + var(--spacing-2xs)); left: 0; right: 0; z-index: 200;
      margin: 0; max-height: 16rem; overflow-y: auto;
      background: var(--color-bg-elevated);
      border: var(--border-width-thin) solid var(--color-border-default);
      border-radius: var(--radius-md); box-shadow: var(--shadow-modal); padding: var(--spacing-2xs) 0;
      list-style: none;
    }
    .autocomplete__option {
      display: flex; align-items: center;
      padding: var(--spacing-input-padding-y) var(--spacing-input-padding-x);
      font-family: var(--font-family-base); font-size: var(--font-size-md);
      color: var(--color-text-default); cursor: pointer; user-select: none;
    }
    .autocomplete__option--active { background-color: var(--color-bg-surface); }
    .autocomplete__option-label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .autocomplete__hint {
      margin-top: calc(-1 * var(--spacing-xs));
      font-family: var(--font-family-accessible); font-size: var(--font-size-sm);
      letter-spacing: var(--letter-spacing-italic); color: var(--color-text-subtle);
    }
    .autocomplete__description {
      font-family: var(--font-family-accessible); font-size: var(--font-size-sm);
      letter-spacing: var(--letter-spacing-italic); min-height: var(--hit-target-aa);
    }
    .autocomplete__error { color: var(--color-status-error-text); font-size: var(--font-size-md); }
  `}get _filtered(){let t=this.value.trim().toLowerCase(),e=t?this.suggestions.filter(r=>r.toLowerCase().includes(t)):this.suggestions;return this.maxSuggestions>0?e.slice(0,this.maxSuggestions):e}get _activeOptionId(){return this._activeIndex>=0?`candor-autocomplete-opt-${this._id}-${this._activeIndex}`:""}_commit(){this._internals.setFormValue(this.value),this.dispatchEvent(new CustomEvent("change",{detail:this.value,bubbles:!0,composed:!0}))}_onInput(t){this.value=t.target.value,this._open=!0,this._activeIndex=-1,this._internals.setFormValue(this.value),t.stopPropagation(),this.dispatchEvent(new CustomEvent("input",{detail:this.value,bubbles:!0,composed:!0}))}_onNativeChange(t){t.stopPropagation(),this._commit()}_select(t){this.value=t,this._open=!1,this._activeIndex=-1,this._commit(),this._input?.focus()}_onKeydown(t){let e=this._filtered;switch(t.key){case"ArrowDown":t.preventDefault(),!this._open&&e.length&&(this._open=!0),this._activeIndex=Math.min(this._activeIndex+1,e.length-1);break;case"ArrowUp":t.preventDefault(),this._activeIndex=Math.max(this._activeIndex-1,-1);break;case"Enter":this._open&&this._activeIndex>=0&&e[this._activeIndex]&&(t.preventDefault(),this._select(e[this._activeIndex]));break;case"Escape":this._open&&(t.stopPropagation(),this._open=!1,this._activeIndex=-1);break}}updated(t){t.has("value")&&this._internals.setFormValue(this.value),(t.has("value")||t.has("required"))&&(this.required&&!this.value?this._internals.setValidity({valueMissing:!0},"Please fill in this field",this._input):this._internals.setValidity({}))}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocumentClick),this._stopObservingAriaLabel=ot(this,t=>{this._ariaLabel=t})}disconnectedCallback(){this._stopObservingAriaLabel?.(),super.disconnectedCallback(),document.removeEventListener("click",this._onDocumentClick)}render(){let t=this._filtered,e=[this.hint?this._hintId:"",this._errId].filter(Boolean).join(" "),r=this._open&&t.length>0;return b`
      <div class="autocomplete-wrapper ${this.disabled?"autocomplete-wrapper--disabled":""}">
        ${this.label?b`
          <label part="label" for="${this._inputId}" class="autocomplete__label">
            ${this.label}
            ${this.required?b`<span class="autocomplete__required" aria-hidden="true">*</span>`:v}
          </label>
        `:v}
        ${this.hint?b`<span part="hint" id="${this._hintId}" class="autocomplete__hint">${this.hint}</span>`:v}
        <div style="position:relative">
          <div class="autocomplete__control ${this.error?"autocomplete__control--error":""}">
            <input
              part="input"
              id="${this._inputId}"
              class="autocomplete__input"
              type="text"
              role="combobox"
              autocomplete="off"
              aria-label="${this._ariaLabel||v}"
              aria-autocomplete="list"
              aria-expanded="${r}"
              aria-controls="${this._listId}"
              aria-activedescendant="${this._activeOptionId||v}"
              aria-required="${this.required||v}"
              aria-invalid="${this.error?"true":v}"
              aria-describedby="${e}"
              .value="${this.value}"
              placeholder="${this.placeholder}"
              ?disabled="${this.disabled}"
              @input="${this._onInput}"
              @change="${this._onNativeChange}"
              @focus="${()=>{this._filtered.length&&(this._open=!0)}}"
              @click="${()=>{this._filtered.length&&(this._open=!0)}}"
              @keydown="${this._onKeydown}"
            >
          </div>
          ${r?b`
            <ul id="${this._listId}" role="listbox" class="autocomplete__dropdown">
              ${t.map((o,i)=>b`
                <li
                  id="candor-autocomplete-opt-${this._id}-${i}"
                  role="option"
                  class="autocomplete__option ${i===this._activeIndex?"autocomplete__option--active":""}"
                  aria-selected="${i===this._activeIndex}"
                  @mousedown="${a=>{a.preventDefault(),this._select(o)}}"
                  @mouseenter="${()=>this._activeIndex=i}"
                >
                  <span class="autocomplete__option-label">${o}</span>
                </li>
              `)}
            </ul>
          `:v}
        </div>
        <span part="error-message" id="${this._errId}" class="autocomplete__description autocomplete__error" role="alert">${this.error}</span>
      </div>
    `}};u([f()],K.prototype,"label",void 0),u([f()],K.prototype,"value",void 0),u([f()],K.prototype,"placeholder",void 0),u([f()],K.prototype,"error",void 0),u([f()],K.prototype,"hint",void 0),u([f({type:Boolean})],K.prototype,"required",void 0),u([f({type:Boolean})],K.prototype,"disabled",void 0),u([f({type:Array})],K.prototype,"suggestions",void 0),u([f({type:Number,attribute:"max-suggestions"})],K.prototype,"maxSuggestions",void 0),u([M()],K.prototype,"_open",void 0),u([M()],K.prototype,"_activeIndex",void 0),u([M()],K.prototype,"_ariaLabel",void 0),u([zt(".autocomplete__input")],K.prototype,"_input",void 0),K=u([S("candor-autocomplete")],K);var hc=0,Pt=class extends C{constructor(...t){super(...t),this.label="Message",this.placeholder="Type a message…",this.disclaimer="",this.disabled=!1,this._value="",this._statusMessage="",this._id=hc++,this._inputId=`candor-chat-input-${this._id}`,this._hintId=`candor-chat-hint-${this._id}`}static{this.styles=E`
    :host { display: block; }
    .sr-only {
      position: absolute; width: 1px; height: 1px;
      overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap;
    }
    .chat-input { display: flex; flex-direction: column; gap: var(--spacing-xs); }
    .chat-input__label {
      position: absolute; width: 1px; height: 1px;
      overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap;
    }
    .chat-input__field {
      display: flex; align-items: flex-end; gap: var(--spacing-xs);
      background: var(--color-bg-elevated);
      border: var(--border-width-thin) solid var(--color-border-control);
      border-radius: var(--radius-md);
      padding: var(--spacing-xs) var(--spacing-xs) var(--spacing-xs) var(--spacing-sm);
      transition: border-color 0.15s ease;
    }
    .chat-input__field:focus-within {
      border-color: var(--color-action-primary);
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
    }
    .chat-input__field--disabled { opacity: 0.5; cursor: not-allowed; }
    .chat-input__textarea {
      flex: 1; background: transparent; border: none; outline: none;
      resize: none; overflow-y: auto; padding: 0;
      font-family: var(--font-family-base); font-size: var(--font-size-md);
      color: var(--color-text-default); line-height: var(--line-height-normal);
      min-height: 1.5rem; max-height: 8rem;
    }
    .chat-input__textarea::placeholder { color: var(--color-text-subtle); }
    .chat-input__textarea:focus { outline: none; }
    .chat-input__textarea:disabled { cursor: not-allowed; }
    .chat-input__send {
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; width: 2rem; height: 2rem;
      background: var(--color-action-primary); color: var(--color-text-on-action);
      border: none; border-radius: var(--radius-sm); cursor: pointer;
      transition: background-color 0.15s ease, opacity 0.15s ease;
    }
    .chat-input__send:hover:not(:disabled) { background: var(--color-action-primary-hover); }
    .chat-input__send:active:not(:disabled) { background: var(--color-action-primary-active); }
    .chat-input__send:disabled { opacity: 0.5; cursor: not-allowed; }
    .chat-input__send:focus-visible {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
    }
    .chat-input__send svg { width: 1rem; height: 1rem; }
    .chat-input__disclaimer {
      margin: 0; text-align: center;
      font-family: var(--font-family-accessible); font-size: var(--font-size-sm);
      color: var(--color-text-subtle); letter-spacing: 0.02em;
      line-height: var(--line-height-normal);
    }
  `}_onInput(t){this._value=t.target.value;let e=t.target;e.style.height="auto",e.style.height=`${e.scrollHeight}px`}_onKeydown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this._send())}_send(){!this._value.trim()||this.disabled||(this.dispatchEvent(new CustomEvent("send",{detail:{value:this._value},bubbles:!0,composed:!0})),this._value="",this._textarea&&(this._textarea.value="",this._textarea.style.height="auto"),this._statusMessage="Message sent",setTimeout(()=>{this._statusMessage=""},2e3))}render(){return b`
      <div class="chat-input">
        <label for="${this._inputId}" class="chat-input__label">${this.label}</label>
        <span id="${this._hintId}" class="sr-only">Press Enter to send. Press Shift+Enter for a new line.</span>
        <div class="chat-input__field ${this.disabled?"chat-input__field--disabled":""}">
          <textarea
            id="${this._inputId}"
            class="chat-input__textarea"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            .value="${this._value}"
            aria-describedby="${this._hintId}${this.disclaimer?" "+this._inputId+"-disclaimer":""}"
            rows="1"
            @input="${this._onInput}"
            @keydown="${this._onKeydown}"
          ></textarea>
          <button
            type="button"
            class="chat-input__send"
            ?disabled="${this.disabled||!this._value.trim()}"
            aria-label="Send message"
            @click="${this._send}"
          >
            <svg aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${ic}"/></svg>
          </button>
        </div>
        ${this.disclaimer?b`<p id="${this._inputId}-disclaimer" class="chat-input__disclaimer">${this.disclaimer}</p>`:v}
        <span role="status" class="sr-only" aria-live="polite" aria-atomic="true">${this._statusMessage}</span>
      </div>
    `}};u([f()],Pt.prototype,"label",void 0),u([f()],Pt.prototype,"placeholder",void 0),u([f()],Pt.prototype,"disclaimer",void 0),u([f({type:Boolean})],Pt.prototype,"disabled",void 0),u([M()],Pt.prototype,"_value",void 0),u([M()],Pt.prototype,"_statusMessage",void 0),u([zt(".chat-input__textarea")],Pt.prototype,"_textarea",void 0),Pt=u([S("candor-chat-input")],Pt);var Je=class extends C{constructor(...t){super(...t),this.text="",this.position="top",this._visible=!1}static{this.styles=E`
    :host { display: inline-flex; position: relative; }
    .tooltip__bubble {
      position: absolute;
      z-index: 100;
      padding: var(--spacing-2xs) var(--spacing-xs);
      background-color: var(--color-bg-inverse);
      color: var(--color-text-inverse);
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-sm);
      line-height: var(--line-height-tight);
      letter-spacing: 0.02em;
      border-radius: var(--radius-sm);
      white-space: nowrap;
      pointer-events: none;
      /* display:none takes the bubble out of layout entirely while hidden, so
         it cannot contribute to the host's scrollWidth (#107). Combined with
         @starting-style + transition-behavior:allow-discrete below, the
         display:none <-> display:block flip still fades — same technique
         candor-drawer uses for its dialog[open] transitions. */
      display: none;
      opacity: 0;
      transition: opacity 0.15s ease, display 0.15s ease allow-discrete;
    }
    .tooltip__bubble--visible {
      display: block;
      opacity: 1;
    }
    @starting-style {
      .tooltip__bubble--visible { opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .tooltip__bubble { transition: none; }
    }

    .tooltip__bubble--top {
      bottom: calc(100% + var(--spacing-xs));
      left: 50%;
      transform: translateX(-50%);
    }
    .tooltip__bubble--top::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: var(--color-bg-inverse);
    }

    .tooltip__bubble--bottom {
      top: calc(100% + var(--spacing-xs));
      left: 50%;
      transform: translateX(-50%);
    }
    .tooltip__bubble--bottom::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-bottom-color: var(--color-bg-inverse);
    }

    .tooltip__bubble--left {
      right: calc(100% + var(--spacing-xs));
      top: 50%;
      transform: translateY(-50%);
    }
    .tooltip__bubble--left::after {
      content: '';
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 5px solid transparent;
      border-left-color: var(--color-bg-inverse);
    }

    .tooltip__bubble--right {
      left: calc(100% + var(--spacing-xs));
      top: 50%;
      transform: translateY(-50%);
    }
    .tooltip__bubble--right::after {
      content: '';
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 5px solid transparent;
      border-right-color: var(--color-bg-inverse);
    }
  `}render(){return b`
      <slot
        @mouseenter="${()=>this._visible=!0}"
        @mouseleave="${()=>this._visible=!1}"
        @focusin="${()=>this._visible=!0}"
        @focusout="${()=>this._visible=!1}"
        @keydown="${t=>t.key==="Escape"&&(this._visible=!1)}"
      ></slot>
      <div
        aria-hidden="true"
        class="tooltip__bubble tooltip__bubble--${this.position} ${this._visible?"tooltip__bubble--visible":""}"
      >${this.text}</div>
    `}};u([f()],Je.prototype,"text",void 0),u([f({reflect:!0})],Je.prototype,"position",void 0),u([M()],Je.prototype,"_visible",void 0),Je=u([S("candor-tooltip")],Je);var qt=class extends C{constructor(...t){super(...t),this.open=!1,this.alert=!1,this.heading="",this.size="md",this._hasFooter=!1,this._titleId=`modal-title-${Math.random().toString(36).slice(2,9)}`}static{this.styles=E`
    :host { display: contents; }
    dialog {
      border: none;
      padding: 0;
      background: transparent;
      max-width: none;
      max-height: none;
      overflow: visible;
    }
    dialog::backdrop {
      background-color: var(--color-overlay);
      backdrop-filter: blur(2px);
    }

    .modal__panel {
      background-color: var(--color-bg-elevated);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-modal);
      display: flex;
      flex-direction: column;
      max-height: 90vh;
      width: 90vw;
      overflow: hidden;
    }
    /* Max-width — consumers may override per-instance:
       candor-modal { --candor-modal-max-width: 700px; } */
    :host { --candor-modal-max-width: 560px; }
    :host([size='sm']) { --candor-modal-max-width: 400px; }
    :host([size='lg']) { --candor-modal-max-width: 768px; }
    .modal__panel { max-width: var(--candor-modal-max-width); }

    /* Header */
    .modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-md) var(--spacing-md) var(--spacing-sm);
      border-bottom: var(--border-width-thin) solid var(--color-border-default);
      flex-shrink: 0;
    }
    .modal__title {
      font-family: var(--font-family-display);
      font-optical-sizing: auto;
      font-size: var(--font-size-h3);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
      color: var(--color-text-default);
      margin: 0;
    }

    /* Close */
    .modal__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: var(--radius-sm);
      color: var(--color-text-subtle);
      transition: background-color 0.15s ease, color 0.15s ease;
    }
    .modal__close:hover {
      background-color: var(--color-action-tertiary-hover);
      color: var(--color-text-default);
    }
    .modal__close:focus-visible {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
    }

    /* Body */
    .modal__body {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-md);
      color: var(--color-text-default);
      font-family: var(--font-family-base);
      font-size: var(--font-size-base);
      line-height: var(--line-height-relaxed);
    }
    .modal__body:focus { outline: none; }
    .modal__body:focus-visible {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: calc(-1 * var(--focus-ring-offset));
    }

    /* Footer (projected via [slot=footer]) */
    .modal__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      border-top: var(--border-width-thin) solid var(--color-border-default);
      flex-shrink: 0;
    }
    .modal__footer--empty { display: none; }
  `}updated(t){t.has("open")&&(this.open?this._dialog?.showModal():this._dialog?.close())}_close(){this.open&&(this.open=!1,this._dialog?.close(),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})))}_onBackdropClick(t){t.target===this._dialog&&this._close()}_onFooterSlotChange(t){let e=t.target;this._hasFooter=e.assignedElements().length>0}render(){return b`
      <dialog
        role="${this.alert?"alertdialog":v}"
        aria-labelledby="${this._titleId}"
        aria-modal="true"
        @click="${this._onBackdropClick}"
        @close="${this._close}"
        @cancel="${t=>{t.preventDefault(),this._close()}}"
      >
        <div class="modal__panel modal__panel--${this.size}">
          <header class="modal__header" role="none">
            <h2 class="modal__title" id="${this._titleId}">${this.heading}</h2>
            <button class="modal__close" type="button" aria-label="Close" @click="${this._close}">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 1024 1024" fill="currentColor"><path d="${Sr}"/></svg>
            </button>
          </header>
          <div class="modal__body" tabindex="0" aria-label="Dialog content"><slot></slot></div>
          <div class="modal__footer ${this._hasFooter?"":"modal__footer--empty"}">
            <slot name="footer" @slotchange="${this._onFooterSlotChange}"></slot>
          </div>
        </div>
      </dialog>
    `}};u([f({type:Boolean})],qt.prototype,"open",void 0),u([f({type:Boolean})],qt.prototype,"alert",void 0),u([f()],qt.prototype,"heading",void 0),u([f({reflect:!0})],qt.prototype,"size",void 0),u([zt("dialog")],qt.prototype,"_dialog",void 0),u([M()],qt.prototype,"_hasFooter",void 0),qt=u([S("candor-modal")],qt);var $t=class extends C{constructor(...t){super(...t),this.open=!1,this.heading="",this.position="right",this.size="md",this.dismissOnBackdrop=!0,this.modal=!0,this._hasFooter=!1,this._titleId=`drawer-title-${Math.random().toString(36).slice(2,9)}`}static{this.styles=E`
    :host { display: contents; }
    dialog {
      border: none;
      padding: 0;
      background: transparent;
      max-width: none;
      max-height: none;
      overflow: visible;
    }
    dialog[open] {
      display: flex;
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
    dialog::backdrop { background-color: var(--color-overlay); }

    /* Non-modal mode: the dialog is still a full-viewport layer (for edge-anchored
       positioning), but it must not intercept pointer events across the page — only
       the panel itself should be clickable. The modal property reflects as the string
       "true"/"false" (see the custom converter below), so non-modal is modal="false". */
    :host([modal='false']) dialog[open] { pointer-events: none; }
    :host([modal='false']) .drawer__panel { pointer-events: auto; }

    /* Position layout */
    .drawer--right  dialog[open] { justify-content: flex-end; align-items: stretch; }
    .drawer--left   dialog[open] { justify-content: flex-start; align-items: stretch; }
    .drawer--bottom dialog[open] { flex-direction: column; justify-content: flex-end; align-items: stretch; }

    /* Panel */
    .drawer__panel {
      background-color: var(--color-bg-elevated);
      box-shadow: var(--shadow-modal);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: transform 250ms cubic-bezier(0.25, 0, 0.1, 1);
    }
    .drawer--left .drawer__panel,
    .drawer--right .drawer__panel {
      height: 100%;
    }
    .drawer--bottom .drawer__panel {
      width: 100%;
      border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    }

    /* Slide-in animations */
    .drawer--right .drawer__panel { transform: translateX(0); }
    @starting-style {
      .drawer--right dialog[open] .drawer__panel { transform: translateX(100%); }
    }
    .drawer--left .drawer__panel { transform: translateX(0); }
    @starting-style {
      .drawer--left dialog[open] .drawer__panel { transform: translateX(-100%); }
    }
    .drawer--bottom .drawer__panel { transform: translateY(0); }
    @starting-style {
      .drawer--bottom dialog[open] .drawer__panel { transform: translateY(100%); }
    }

    /* Size defaults — consumers may override per-instance:
       candor-drawer { --candor-drawer-size: 400px; --candor-drawer-height: 60vh; } */
    :host { --candor-drawer-size: 480px; --candor-drawer-height: 50vh; }
    :host([size='sm'])   { --candor-drawer-size: 320px; --candor-drawer-height: 30vh; }
    :host([size='lg'])   { --candor-drawer-size: 640px; --candor-drawer-height: 75vh; }
    :host([size='full']) { --candor-drawer-size: 100vw; --candor-drawer-height: 100vh; }

    .drawer--right .drawer__panel,
    .drawer--left  .drawer__panel { width: min(var(--candor-drawer-size), 100vw); }
    .drawer--bottom .drawer__panel { max-height: var(--candor-drawer-height); }
    .drawer--bottom.drawer--full .drawer__panel { border-radius: 0; }

    @media (prefers-reduced-motion: reduce) {
      .drawer__panel { transition: none; }
    }

    /* Header */
    .drawer__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-sm);
      padding: var(--spacing-md);
      border-bottom: var(--border-width-thin) solid var(--color-border-default);
      flex-shrink: 0;
    }
    .drawer__title {
      font-family: var(--font-family-display);
      font-optical-sizing: auto;
      font-size: var(--font-size-h3);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
      color: var(--color-text-default);
      margin: 0;
    }

    /* Close */
    .drawer__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      padding: 0;
      margin-left: auto;
      border: none;
      border-radius: var(--radius-sm);
      background: transparent;
      color: var(--color-text-subtle);
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.15s ease, color 0.15s ease;
    }
    .drawer__close:hover {
      background: var(--color-action-tertiary-hover);
      color: var(--color-text-default);
    }
    .drawer__close:focus-visible {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
    }

    /* Body */
    .drawer__body {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-md);
      color: var(--color-text-default);
      font-family: var(--font-family-base);
      font-size: var(--font-size-base);
      line-height: var(--line-height-relaxed);
    }
    .drawer__body:focus { outline: none; }
    .drawer__body:focus-visible {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: calc(-1 * var(--focus-ring-offset));
    }

    /* Footer (projected via [slot=footer]) */
    .drawer__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      border-top: var(--border-width-thin) solid var(--color-border-default);
      flex-shrink: 0;
    }
    .drawer__footer--empty { display: none; }
  `}updated(t){t.has("open")&&(this.open?(this.removeAttribute("inert"),this.modal?this._dialog?.showModal():this._dialog?.show()):(this._dialog?.close(),this.setAttribute("inert","")))}_close(){this.open&&(this.open=!1,this._dialog?.close(),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})))}_onBackdropClick(t){this.dismissOnBackdrop&&t.target===this._dialog&&this._close()}_onFooterSlotChange(t){let e=t.target;this._hasFooter=e.assignedElements().length>0}render(){return b`
      <div class="drawer drawer--${this.position} drawer--${this.size}">
        <dialog
          aria-labelledby="${this.heading?this._titleId:v}"
          aria-label="${this.heading?v:"Drawer"}"
          @click="${this._onBackdropClick}"
          @close="${this._close}"
          @cancel="${t=>{t.preventDefault(),this._close()}}"
        >
          <div class="drawer__panel">
            <header class="drawer__header" role="none">
              ${this.heading?b`<h2 class="drawer__title" id="${this._titleId}">${this.heading}</h2>`:b`<span></span>`}
              <button class="drawer__close" type="button" aria-label="Close" @click="${this._close}">
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 1024 1024" fill="currentColor"><path d="${Sr}"/></svg>
              </button>
            </header>
            <div class="drawer__body" tabindex="0" aria-label="Drawer content"><slot></slot></div>
            <div class="drawer__footer ${this._hasFooter?"":"drawer__footer--empty"}">
              <slot name="footer" @slotchange="${this._onFooterSlotChange}"></slot>
            </div>
          </div>
        </dialog>
      </div>
    `}};u([f({type:Boolean})],$t.prototype,"open",void 0),u([f()],$t.prototype,"heading",void 0),u([f({reflect:!0})],$t.prototype,"position",void 0),u([f({reflect:!0})],$t.prototype,"size",void 0),u([f({attribute:"dismiss-on-backdrop",converter:{fromAttribute:t=>t!=="false",toAttribute:t=>t?"true":"false"}})],$t.prototype,"dismissOnBackdrop",void 0),u([f({reflect:!0,converter:{fromAttribute:t=>t!=="false",toAttribute:t=>t?"true":"false"}})],$t.prototype,"modal",void 0),u([zt("dialog")],$t.prototype,"_dialog",void 0),u([M()],$t.prototype,"_hasFooter",void 0),$t=u([S("candor-drawer")],$t);var ke=class extends C{constructor(...t){super(...t),this.variant="info",this.heading="",this.message="",this.dismissible=!1}static{this.styles=E`
    /* Width — consumers may override per-instance:
       candor-toast { --candor-toast-min-width: 24rem; } */
    :host {
      display: block;
      --candor-toast-min-width: 18rem;
      --candor-toast-max-width: 28rem;
    }
    .toast {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-sm);
      box-sizing: border-box;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-md);
      border: var(--border-width-thin) solid;
      border-left-width: var(--border-width-thick);
      font-family: var(--font-family-base);
      min-width: min(var(--candor-toast-min-width), 100%);
      max-width: min(var(--candor-toast-max-width), 100%);
    }
    .toast--info    { background-color: var(--color-bg-surface); border-color: var(--color-border-default); }
    .toast--success { background-color: var(--color-status-success-bg); border-color: var(--color-status-success); }
    .toast--warning { background-color: var(--color-status-warning-bg); border-color: var(--color-status-warning); }
    .toast--error   { background-color: var(--color-status-error-bg); border-color: var(--color-status-error); }
    .toast__icon { flex-shrink: 0; width: 1.25rem; height: 1.25rem; margin-top: 0.125rem; }
    .toast--info    .toast__icon { color: var(--color-text-subtle); }
    .toast--success .toast__icon { color: var(--color-status-success); }
    .toast--warning .toast__icon { color: var(--color-status-warning); }
    .toast--error   .toast__icon { color: var(--color-status-error); }
    .toast__content { flex: 1; min-width: 0; }
    .toast__title {
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-default);
      font-size: var(--font-size-base);
      line-height: var(--line-height-tight);
      margin-bottom: var(--spacing-2xs);
    }
    .toast__message {
      color: var(--color-toast-message);
      font-size: var(--font-size-md);
      line-height: var(--line-height-normal);
    }
    .toast__dismiss {
      flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center;
      width: 1.5rem; height: 1.5rem; padding: 0; border: none; background: none; cursor: pointer;
      border-radius: var(--radius-sm); color: var(--color-text-subtle);
      font-size: 1rem;
      line-height: 1;
      transition: color 0.15s ease, background-color 0.15s ease;
    }
    .toast__dismiss:hover { color: var(--color-text-default); background-color: var(--color-bg-surface); }
    .toast__dismiss:focus-visible { outline: var(--focus-ring-width) solid var(--color-focus); outline-offset: var(--focus-ring-offset); }
  `}_iconPath(){switch(this.variant){case"info":return Ei;case"success":return Ni;case"warning":return Ii;case"error":return Li}}render(){let t=this.variant==="warning"||this.variant==="error"?"alert":"status";return b`
      <div class="toast toast--${this.variant}" role="${t}">
        <svg class="toast__icon" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${this._iconPath()}"/></svg>
        <div class="toast__content">
          ${this.heading?b`<div class="toast__title">${this.heading}</div>`:v}
          <div class="toast__message">${this.message}</div>
        </div>
        ${this.dismissible?b`
          <button class="toast__dismiss" aria-label="Dismiss notification" @click="${this._dismiss}">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 1024 1024" fill="currentColor"><path d="${Sr}"/></svg>
          </button>
        `:v}
      </div>
    `}_dismiss(){this.dispatchEvent(new CustomEvent("dismiss",{bubbles:!0,composed:!0}))}};u([f({reflect:!0})],ke.prototype,"variant",void 0),u([f()],ke.prototype,"heading",void 0),u([f()],ke.prototype,"message",void 0),u([f({type:Boolean})],ke.prototype,"dismissible",void 0),ke=u([S("candor-toast")],ke);var jo=class extends C{constructor(...t){super(...t),this.position="top-right"}static{this.styles=E`
    :host {
      position: fixed;
      z-index: 2000;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      padding: var(--spacing-md);
      max-width: 32rem;
      pointer-events: none;
    }
    :host([position='top-right'])    { top: 0; right: 0; }
    :host([position='top-left'])     { top: 0; left: 0; }
    :host([position='bottom-right']) { bottom: 0; right: 0; }
    :host([position='bottom-left'])  { bottom: 0; left: 0; }
    ::slotted(*) { pointer-events: all; }
  `}render(){return b`<slot></slot>`}};u([f({reflect:!0})],jo.prototype,"position",void 0),jo=u([S("candor-toast-container")],jo);var kt=class extends C{constructor(...t){super(...t),this.tabs=[],this.theme="default",this.orientation="horizontal",this.activeId="",this._ariaLabel="",this._canScrollLeft=!1,this._canScrollRight=!1,this._updateScrollState=()=>{if(!this._list||this.orientation==="vertical"){this._canScrollLeft=!1,this._canScrollRight=!1;return}this._canScrollLeft=this._list.scrollLeft>0,this._canScrollRight=this._list.scrollLeft+this._list.clientWidth<this._list.scrollWidth-1}}static{this.styles=E`
    :host { display: block; }
    .tabs { display: block; }
    .tabs__list-wrapper {
      position: relative;
    }
    .tabs__list-wrapper::before,
    .tabs__list-wrapper::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: var(--spacing-xl);
      pointer-events: none;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.15s ease;
    }
    .tabs__list-wrapper::before {
      left: 0;
      background: linear-gradient(to right, var(--color-bg-page), transparent);
    }
    .tabs__list-wrapper::after {
      right: 0;
      background: linear-gradient(to left, var(--color-bg-page), transparent);
    }
    .tabs--can-scroll-left .tabs__list-wrapper::before { opacity: 1; }
    .tabs--can-scroll-right .tabs__list-wrapper::after { opacity: 1; }

    .tabs__scroll-btn {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 2;
      display: none;
      align-items: center;
      padding: 0 var(--spacing-xs);
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text-subtle);
      transition: color 0.15s ease;
    }
    .tabs__scroll-btn:hover { color: var(--color-text-default); }
    .tabs__scroll-btn--left { left: 0; }
    .tabs__scroll-btn--right { right: 0; }
    .tabs--can-scroll-left .tabs__scroll-btn--left { display: flex; }
    .tabs--can-scroll-right .tabs__scroll-btn--right { display: flex; }

    .tabs__list {
      display: flex;
      flex-direction: row;
      border-bottom: var(--border-width-thin) solid var(--color-border-default);
      overflow-x: auto;
      scrollbar-width: none;
    }
    .tabs__list::-webkit-scrollbar { display: none; }
    .tabs--can-scroll-left .tabs__list { padding-left: var(--spacing-lg); }
    .tabs--can-scroll-right .tabs__list { padding-right: var(--spacing-lg); }

    .tabs__tab {
      appearance: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: var(--spacing-xs) var(--spacing-sm);
      font-family: var(--font-family-base);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-subtle);
      border-bottom: var(--border-width-medium) solid transparent;
      margin-bottom: calc(-1 * var(--border-width-thin));
      transition: color 0.15s ease, border-color 0.15s ease;
      white-space: nowrap;
    }
    .tabs__tab[aria-selected='true'] {
      color: var(--color-action-primary);
      border-bottom-color: var(--color-action-primary);
      font-weight: var(--font-weight-semibold);
    }
    .tabs__tab:hover { color: var(--color-text-default); }
    .tabs__tab:focus-visible { outline: var(--focus-ring-width) solid var(--color-focus); outline-offset: var(--focus-ring-offset); }

    .tabs__panels { padding-top: var(--spacing-md); }

    /* Vertical orientation */
    .tabs--vertical {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }
    .tabs--vertical .tabs__list-wrapper::before,
    .tabs--vertical .tabs__list-wrapper::after { display: none; }
    .tabs--vertical .tabs__scroll-btn { display: none !important; }
    .tabs--vertical .tabs__list {
      flex-direction: column;
      flex-shrink: 0;
      min-width: 12rem;
      border-bottom: none;
      border-right: var(--border-width-thin) solid var(--color-border-default);
      overflow-x: visible;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    .tabs--vertical .tabs__tab {
      text-align: left;
      border-bottom: none;
      border-right: var(--border-width-medium) solid transparent;
      margin-bottom: 0;
      margin-right: calc(-1 * var(--border-width-thin));
    }
    .tabs--vertical .tabs__tab[aria-selected='true'] {
      border-bottom-color: transparent;
      border-right-color: var(--color-action-primary);
    }
    .tabs--vertical .tabs__panels {
      flex: 1;
      padding-top: 0;
      padding-left: var(--spacing-md);
    }

    /* Inverse theme */
    .tabs--inverse .tabs__list-wrapper::before {
      background: linear-gradient(to right, var(--color-bg-inverse), transparent);
    }
    .tabs--inverse .tabs__list-wrapper::after {
      background: linear-gradient(to left, var(--color-bg-inverse), transparent);
    }
    .tabs--inverse .tabs__list {
      border-bottom-color: var(--color-border-on-inverse);
      background-color: var(--color-bg-inverse);
      padding: 0 var(--spacing-sm);
    }
    /* Restore scroll clearance when inverse + overflow — the padding shorthand above overrides
       the general can-scroll rules at equal specificity, so re-assert with 3-class selectors. */
    .tabs--inverse.tabs--can-scroll-left .tabs__list { padding-left: var(--spacing-lg); }
    .tabs--inverse.tabs--can-scroll-right .tabs__list { padding-right: var(--spacing-lg); }
    .tabs--inverse .tabs__scroll-btn { color: var(--color-text-subtle-on-inverse); }
    .tabs--inverse .tabs__scroll-btn:hover { color: var(--color-text-inverse); }
    .tabs--inverse .tabs__tab { color: var(--color-text-subtle-on-inverse); }
    .tabs--inverse .tabs__tab[aria-selected='true'] {
      color: var(--color-text-inverse);
      border-bottom-color: var(--color-text-inverse);
    }
    .tabs--inverse .tabs__tab:hover { color: var(--color-text-inverse); }
  `}_activate(t){this.activeId=t,this.dispatchEvent(new CustomEvent("change",{detail:t,bubbles:!0,composed:!0})),this.requestUpdate(),this.querySelectorAll("candor-tab-panel").forEach(e=>{e.active=e.panelId===t})}_onKeydown(t){if(t.target.getAttribute("role")!=="tab")return;let e=this.tabs.map(i=>i.id),r=e.indexOf(this.activeId),o=-1;if(t.key==="ArrowRight"||this.orientation==="vertical"&&t.key==="ArrowDown"?o=(r+1)%e.length:t.key==="ArrowLeft"||this.orientation==="vertical"&&t.key==="ArrowUp"?o=(r-1+e.length)%e.length:t.key==="Home"?o=0:t.key==="End"&&(o=e.length-1),o>=0){t.preventDefault(),this._activate(e[o]);let i=this.shadowRoot?.querySelector(`#tab-${e[o]}`);i?.focus(),i?.scrollIntoView({inline:"nearest",block:"nearest"})}}_scrollTabs(t){this._list.scrollBy({left:t*200,behavior:"smooth"})}connectedCallback(){super.connectedCallback(),!this.activeId&&this.tabs.length&&(this.activeId=this.tabs[0].id),window.addEventListener("resize",this._updateScrollState),this._stopObservingAriaLabel=ot(this,t=>{this._ariaLabel=t})}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this._updateScrollState),this._stopObservingAriaLabel?.()}firstUpdated(){this._updateScrollState()}updated(){this.querySelectorAll("candor-tab-panel").forEach(t=>{let e=t;e.active=e.panelId===this.activeId;let r=this.tabs.find(o=>o.id===e.panelId);r&&(e.tabLabel=r.label)}),this._updateScrollState()}render(){return b`
      <div class="${["tabs",this.theme==="inverse"?"tabs--inverse":"",this.orientation==="vertical"?"tabs--vertical":"",this._canScrollLeft?"tabs--can-scroll-left":"",this._canScrollRight?"tabs--can-scroll-right":""].filter(Boolean).join(" ")}">
        <div class="tabs__list-wrapper">
          <button
            class="tabs__scroll-btn tabs__scroll-btn--left"
            aria-label="Scroll tabs left"
            tabindex="-1"
            @click="${()=>this._scrollTabs(-1)}"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L6 8L10 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div
            class="tabs__list"
            role="tablist"
            aria-label="${this._ariaLabel||v}"
            aria-orientation="${this.orientation}"
            @keydown="${this._onKeydown}"
            @scroll="${this._updateScrollState}"
          >
            ${this.tabs.map((t,e)=>b`
              <button
                class="tabs__tab"
                role="tab"
                id="tab-${t.id}"
                aria-selected="${t.id===this.activeId}"
                aria-controls="panel-${t.id}"
                aria-setsize="${this.tabs.length}"
                aria-posinset="${e+1}"
                tabindex="${t.id===this.activeId?"0":"-1"}"
                @click="${()=>this._activate(t.id)}"
              >${t.label}</button>
            `)}
          </div>
          <button
            class="tabs__scroll-btn tabs__scroll-btn--right"
            aria-label="Scroll tabs right"
            tabindex="-1"
            @click="${()=>this._scrollTabs(1)}"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3L10 8L6 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="tabs__panels"><slot></slot></div>
      </div>
    `}};u([f({type:Array})],kt.prototype,"tabs",void 0),u([f({reflect:!0})],kt.prototype,"theme",void 0),u([f({reflect:!0})],kt.prototype,"orientation",void 0),u([f({attribute:"active-id"})],kt.prototype,"activeId",void 0),u([M()],kt.prototype,"_ariaLabel",void 0),u([M()],kt.prototype,"_canScrollLeft",void 0),u([M()],kt.prototype,"_canScrollRight",void 0),u([zt(".tabs__list")],kt.prototype,"_list",void 0),kt=u([S("candor-tabs")],kt);var Qe=class extends C{constructor(...t){super(...t),this.panelId="",this.active=!1,this.tabLabel=""}static{this.styles=E`
    :host { display: block; }
    :host(:not([active])) { display: none; }
  `}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","presentation")}render(){return b`<div role="tabpanel" id="panel-${this.panelId}" aria-label="${this.tabLabel||v}" tabindex="0"><slot></slot></div>`}};u([f({attribute:"panel-id",reflect:!0})],Qe.prototype,"panelId",void 0),u([f({type:Boolean,reflect:!0})],Qe.prototype,"active",void 0),u([f({attribute:"tab-label"})],Qe.prototype,"tabLabel",void 0),Qe=u([S("candor-tab-panel")],Qe);var tr=class extends C{constructor(...t){super(...t),this.heading="",this.open=!1,this.variant="default",this._onToggle=e=>{let r=e.target.open;this.open!==r&&(this.open=r,this.dispatchEvent(new CustomEvent("toggle",{detail:this.open,bubbles:!0,composed:!0})))}}static{this.styles=E`
    :host { display: block; }
    :host(:last-child) .accordion-item { border-bottom: none; }
    .accordion-item { border-bottom: var(--border-width-thin) solid var(--color-border-strong); }
    .accordion-item > summary { list-style: none; }
    .accordion-item > summary::-webkit-details-marker { display: none; }
    .accordion-item__summary {
      display: flex; align-items: center; justify-content: space-between;
      gap: 0.75rem; padding: 0.875rem 0; cursor: pointer; color: var(--color-text-default);
    }
    .accordion-item__summary:hover { color: var(--color-action-primary); }
    .accordion-item__summary:focus { outline: none; }
    .accordion-item__summary:focus-visible { outline: var(--focus-ring-width) solid var(--color-focus); outline-offset: var(--focus-ring-offset); border-radius: var(--radius-sm); }
    .accordion-item__title { font-family: var(--font-family-base); font-size: var(--font-size-md); font-weight: var(--font-weight-bold); font-optical-sizing: auto; line-height: var(--line-height-tight); flex: 1; }
    .accordion-item__title--subtle { font-weight: var(--font-weight-regular); color: var(--color-text-subtle); }
    .accordion-item__title--quiet { font-weight: 500; font-size: var(--font-size-sm); color: var(--color-text-subtle); font-variation-settings: 'GRAD' -150; }
    .accordion-item__chevron { width: 1rem; height: 1rem; flex-shrink: 0; color: var(--color-text-subtle-on-surface); transition: transform 0.22s ease; }
    details[open] .accordion-item__chevron { transform: rotate(180deg); }
    .accordion-item__panel { display: grid; grid-template-rows: 1fr; }
    .accordion-item__content { overflow: hidden; padding-bottom: 0.875rem; font-family: var(--font-family-base); font-size: var(--font-size-md); color: var(--color-text-default); line-height: var(--line-height-normal); }
  `}render(){let t=["accordion-item__title",this.variant==="subtle"?"accordion-item__title--subtle":"",this.variant==="quiet"?"accordion-item__title--quiet":""].filter(Boolean).join(" ");return b`
      <details class="accordion-item" .open="${this.open}" @toggle="${this._onToggle}">
        <summary class="accordion-item__summary">
          <span class="${t}">${this.heading}</span>
          <svg class="accordion-item__chevron" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${Wt}"/></svg>
        </summary>
        <div class="accordion-item__panel">
          <div class="accordion-item__content"><slot></slot></div>
        </div>
      </details>
    `}};u([f()],tr.prototype,"heading",void 0),u([f({type:Boolean,reflect:!0})],tr.prototype,"open",void 0),u([f({reflect:!0})],tr.prototype,"variant",void 0),tr=u([S("candor-accordion-item")],tr);var uc=0,Hr=class extends C{constructor(...e){super(...e),this.label="",this.open=!1,this._id=uc++,this._triggerId=`disclosure-trigger-${this._id}`,this._panelId=`disclosure-panel-${this._id}`}static{this.styles=E`
    :host { display: block; }
    .disclosure__trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: var(--spacing-xs);
      /* Trigger padding is reachable two ways (#173): uniform density via these
         custom props, or the asymmetric case (kill just the top when the
         disclosure is the first child of a padded box) via
         candor-disclosure::part(trigger) { padding-top: 0; } */
      padding: var(--candor-disclosure-trigger-padding-y, var(--spacing-sm)) var(--candor-disclosure-trigger-padding-x, 0);
      border: none;
      border-bottom: var(--border-width-thin) solid var(--color-border-subtle);
      background: transparent;
      color: var(--color-text-default);
      font-family: var(--font-family-base);
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-medium);
      line-height: var(--line-height-tight);
      cursor: pointer;
      text-align: left;
    }
    .disclosure__trigger:hover { color: var(--color-action-primary); }
    .disclosure__trigger:focus-visible {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
      border-radius: var(--radius-sm);
    }
    .disclosure__label { flex: 1; }
    .disclosure__icon {
      flex-shrink: 0;
      width: 1rem;
      height: 1rem;
      color: var(--color-text-subtle);
      transition: transform 200ms ease;
    }
    .disclosure__icon--open { transform: rotate(180deg); }
    .disclosure__panel { overflow: hidden; }
    .disclosure__panel[hidden] { display: none; }
    .disclosure__content {
      padding: var(--spacing-sm) 0;
      font-family: var(--font-family-base);
      font-size: var(--font-size-md);
      color: var(--color-text-default);
      line-height: var(--line-height-relaxed);
    }
  `}_toggle(){this.open=!this.open,this.dispatchEvent(new CustomEvent("toggle",{detail:this.open,bubbles:!0,composed:!0}))}render(){return b`
      <div class="disclosure">
        <button
          part="trigger"
          class="disclosure__trigger"
          id="${this._triggerId}"
          aria-expanded="${this.open}"
          aria-controls="${this._panelId}"
          @click="${this._toggle}"
        >
          <span part="label" class="disclosure__label">${this.label}</span>
          <svg part="icon" class="disclosure__icon ${this.open?"disclosure__icon--open":""}" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${Wt}"/></svg>
        </button>
        <div part="panel" class="disclosure__panel" id="${this._panelId}" ?hidden="${!this.open}">
          <div class="disclosure__content"><slot></slot></div>
        </div>
      </div>
    `}};u([f()],Hr.prototype,"label",void 0),u([f({type:Boolean,reflect:!0})],Hr.prototype,"open",void 0),Hr=u([S("candor-disclosure")],Hr);var Ct=class extends C{constructor(...t){super(...t),this.label="",this.entries=[],this.align="left",this._open=!1,this._focusedIndex=0,this._menuId=`candor-menu-${Math.random().toString(36).slice(2,9)}`,this._triggerId=`candor-menu-trigger-${Math.random().toString(36).slice(2,9)}`,this._onDocumentClick=e=>{this._open&&!this.contains(e.target)&&this._close()}}static{this.styles=E`
    :host { display: inline-block; position: relative; }
    .menu-trigger {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2xs);
      padding: var(--spacing-xs) var(--spacing-sm);
      font-family: var(--font-family-base);
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-default);
      background-color: var(--color-bg-surface);
      border: var(--border-width-thin) solid var(--color-border-strong);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background-color 0.15s ease, border-color 0.15s ease;
    }
    .menu-trigger--icon-only {
      padding: var(--spacing-xs);
      width: 2.5rem;
      height: 2.5rem;
      justify-content: center;
    }
    .menu-trigger:hover {
      background-color: var(--color-bg-elevated);
      border-color: var(--color-border-control);
    }
    .menu-trigger:focus-visible {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
    }
    .menu-trigger[aria-expanded='true'] {
      background-color: var(--color-bg-elevated);
      border-color: var(--color-action-primary);
    }
    .menu-trigger[aria-expanded='true'] .menu-trigger__chevron {
      transform: rotate(180deg);
    }
    .menu-trigger__chevron {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
      transition: transform 0.2s ease;
    }
    .menu-panel {
      position: absolute;
      top: calc(100% + var(--spacing-2xs));
      left: 0;
      z-index: 200;
      min-width: 10rem;
      padding: var(--spacing-2xs);
      margin: 0;
      list-style: none;
      background-color: var(--color-bg-elevated);
      border: var(--border-width-thin) solid var(--color-border-default);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
    }
    .menu-panel--right {
      left: auto;
      right: 0;
    }
    .menu-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      width: 100%;
      padding: var(--spacing-xs) 0.75em;
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-sm);
      letter-spacing: var(--letter-spacing-italic);
      color: var(--color-text-default);
      background: none;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      text-align: left;
      transition: background-color 0.1s ease;
    }
    .menu-item:hover:not(.menu-item--disabled),
    .menu-item:focus:not(.menu-item--disabled) {
      background-color: var(--color-bg-surface);
      outline: none;
    }
    .menu-item:focus-visible {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: calc(-1 * var(--focus-ring-offset));
    }
    .menu-item--disabled {
      color: var(--color-text-disabled);
      cursor: not-allowed;
      pointer-events: none;
    }
    .menu-item__check {
      width: 0.875rem;
      height: 0.875rem;
      flex-shrink: 0;
      color: var(--color-action-primary);
    }
    .menu-item__check--empty {
      width: 0.875rem;
      height: 0.875rem;
      flex-shrink: 0;
    }
    .menu-separator {
      height: var(--border-width-thin);
      background-color: var(--color-border-default);
      margin: var(--spacing-2xs) var(--spacing-xs);
    }
  `}get _itemEntries(){return this.entries.filter(t=>t!=="separator")}get _hasCheckedItems(){return this._itemEntries.some(t=>t.checked!==void 0)}_open_(){this._open=!0,this._focusedIndex=0,requestAnimationFrame(()=>this._focusItem(0))}_close(){this._open=!1,this._trigger?.focus()}_toggle(){this._open?this._close():this._open_()}_select(t){t.disabled||(this.dispatchEvent(new CustomEvent("select",{detail:t,bubbles:!0,composed:!0})),this._close())}_focusItem(t){this._focusedIndex=t,Array.from(this._items||[])[t]?.focus()}_onTriggerKeydown(t){["ArrowDown","Enter"," "].includes(t.key)?(t.preventDefault(),this._open_()):t.key==="ArrowUp"&&(t.preventDefault(),this._open=!0,this._focusedIndex=this._itemEntries.length-1,requestAnimationFrame(()=>this._focusItem(this._itemEntries.length-1)))}_onMenuKeydown(t){let e=this._itemEntries,r=this._focusedIndex;switch(t.key){case"ArrowDown":t.preventDefault(),this._focusItem(Math.min(r+1,e.length-1));break;case"ArrowUp":t.preventDefault(),this._focusItem(Math.max(r-1,0));break;case"Home":t.preventDefault(),this._focusItem(0);break;case"End":t.preventDefault(),this._focusItem(e.length-1);break;case"Escape":case"Tab":this._close();break;case"Enter":case" ":t.preventDefault();{let o=e[r];o&&this._select(o)}break}}connectedCallback(){super.connectedCallback(),this._stopObservingAriaLabel=ot(this,t=>{this._ariaLabel=t}),document.addEventListener("click",this._onDocumentClick)}disconnectedCallback(){this._stopObservingAriaLabel?.(),document.removeEventListener("click",this._onDocumentClick),super.disconnectedCallback()}render(){let t=!this.label,e=this._hasCheckedItems;return b`
      <button
        class="menu-trigger${t?" menu-trigger--icon-only":""}"
        id="${this._triggerId}"
        aria-haspopup="menu"
        aria-expanded="${this._open}"
        aria-controls="${this._menuId}"
        aria-label="${this._ariaLabel||v}"
        @click="${this._toggle}"
        @keydown="${this._onTriggerKeydown}"
      >
        ${t?b`<svg class="menu-trigger__chevron" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${rc}"/></svg>`:b`${this.label}<svg class="menu-trigger__chevron" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${Wt}"/></svg>`}
      </button>
      ${this._open?b`
        <ul
          id="${this._menuId}"
          role="menu"
          class="menu-panel${this.align==="right"?" menu-panel--right":""}"
          aria-labelledby="${this._triggerId}"
          @keydown="${this._onMenuKeydown}"
        >
          ${this.entries.map((r,o)=>r==="separator"?b`<li role="separator" class="menu-separator"></li>`:b`<li role="none">
                  <button
                    role="${e?"menuitemradio":"menuitem"}"
                    class="menu-item ${r.disabled?"menu-item--disabled":""}"
                    aria-disabled="${r.disabled||v}"
                    aria-checked="${e?r.checked?"true":"false":v}"
                    tabindex="${this._focusedIndex===this._getItemIndex(o)?"0":"-1"}"
                    @click="${()=>this._select(r)}"
                    @mouseenter="${()=>this._focusedIndex=this._getItemIndex(o)}"
                  >
                    ${e?r.checked?b`<svg class="menu-item__check" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor"><path d="${oc}"/></svg>`:b`<span class="menu-item__check--empty"></span>`:v}
                    ${r.label}
                  </button>
                </li>`)}
        </ul>
      `:v}
    `}_getItemIndex(t){let e=0;for(let r=0;r<t;r++)this.entries[r]!=="separator"&&e++;return e}};u([f()],Ct.prototype,"label",void 0),u([f({type:Array})],Ct.prototype,"entries",void 0),u([f()],Ct.prototype,"align",void 0),u([M()],Ct.prototype,"_open",void 0),u([M()],Ct.prototype,"_focusedIndex",void 0),u([M()],Ct.prototype,"_ariaLabel",void 0),u([zt(".menu-trigger")],Ct.prototype,"_trigger",void 0),u([ec(".menu-item")],Ct.prototype,"_items",void 0),Ct=u([S("candor-menu")],Ct);var jt=class extends C{constructor(...e){super(...e),this.caption="",this.headers=[],this.rows=[],this.compact=!1,this.numericColumns=[],this.monoColumns=[]}static{this.styles=E`
    :host { display: block; overflow-x: auto; }
    table {
      min-width: 100%;
      width: max-content;
      border-collapse: collapse;
    }
    caption {
      font-family: var(--font-family-base);
      font-size: var(--font-size-sm);
      color: var(--color-text-subtle);
      text-align: center;
      padding-bottom: var(--spacing-xs);
    }
    th, td {
      padding: var(--spacing-xs) var(--spacing-sm);
      text-align: left;
      border-bottom: var(--border-width-thin) solid var(--color-border-strong);
      font-family: var(--font-family-base);
      font-size: var(--font-size-sm);
      color: var(--color-text-default);
    }
    th {
      font-weight: var(--font-weight-bold);
    }
    thead th {
      color: var(--color-text-subtle-on-surface);
      font-weight: var(--font-weight-bold);
      border-bottom: var(--border-width-medium) solid var(--color-border-strong);
    }
    td {
      font-variant-numeric: tabular-nums;
    }
    th.numeric, td.numeric {
      font-family: var(--font-family-mono);
      text-align: right;
      letter-spacing: var(--letter-spacing-normal);
    }
    /* Mono, but read left-to-right as text (version strings, timestamps, IDs,
       coordinates) — character position is load-bearing, but the value is not a
       magnitude to scan by, so it keeps natural (left) alignment. */
    th.mono, td.mono {
      font-family: var(--font-family-mono);
      font-variant-numeric: tabular-nums;
      letter-spacing: var(--letter-spacing-normal);
    }
    tbody tr:nth-child(even) td,
    tbody tr:nth-child(even) th {
      background: var(--color-bg-surface);
    }
    tbody tr:last-child td,
    tbody tr:last-child th {
      border-bottom: none;
    }
    :host([compact]) th,
    :host([compact]) td {
      padding: var(--spacing-2xs) var(--spacing-sm);
    }
    :host([compact]) tbody tr:nth-child(even) td,
    :host([compact]) tbody tr:nth-child(even) th {
      background: transparent;
    }
    :host([compact]) tbody tr:nth-child(odd) td,
    :host([compact]) tbody tr:nth-child(odd) th {
      background: var(--color-bg-surface);
    }
  `}_cellClass(e){return this.numericColumns.includes(e)?"numeric":this.monoColumns.includes(e)?"mono":v}render(){return b`
      <table>
        ${this.caption?b`<caption>${this.caption}</caption>`:v}
        ${this.headers.length?b`
          <thead>
            <tr>${this.headers.map((e,r)=>b`<th scope="col" class=${this._cellClass(r)}>${e}</th>`)}</tr>
          </thead>
        `:v}
        <tbody>
          ${this.rows.map(e=>b`
            <tr>
              ${e.cells.map((r,o)=>o===0&&(e.isHeader||!this.headers.length)?b`<th scope="row" class=${this._cellClass(o)}>${r}</th>`:b`<td class=${this._cellClass(o)}>${r}</td>`)}
            </tr>
          `)}
        </tbody>
      </table>
    `}};u([f()],jt.prototype,"caption",void 0),u([f({type:Array})],jt.prototype,"headers",void 0),u([f({type:Array})],jt.prototype,"rows",void 0),u([f({type:Boolean,reflect:!0})],jt.prototype,"compact",void 0),u([f({type:Array,attribute:"numeric-columns"})],jt.prototype,"numericColumns",void 0),u([f({type:Array,attribute:"mono-columns"})],jt.prototype,"monoColumns",void 0),jt=u([S("candor-table")],jt);var gt=class extends C{constructor(...t){super(...t),this.caption="",this.columnHeaders=[],this.rows=[],this.hideHeaders=!1,this.showLabels=!1,this._ariaLabel="",this._activeRow=0,this._activeCol=0,this._announcement="",this._hintId=`candor-dg-hint-${Math.random().toString(36).slice(2,9)}`}static{this.styles=E`
    :host { display: block; }
    .data-grid__scroll { overflow-x: auto; }
    .sr-only {
      position: absolute; width: 1px; height: 1px; padding: 0;
      overflow: hidden; clip: rect(0,0,0,0); clip-path: inset(50%);
      white-space: nowrap;
    }
    .data-grid {
      border-collapse: separate;
      border-spacing: 0;
      font-family: var(--font-family-accessible);
      border: var(--border-width-thin) solid var(--color-border-strong);
      border-radius: var(--radius-md);
      overflow: hidden;
    }
    .data-grid__caption {
      caption-side: top;
      text-align: left;
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-default);
      padding: var(--spacing-xs) var(--spacing-sm);
      letter-spacing: var(--letter-spacing-wide);
      border-bottom: var(--border-width-thin) solid var(--color-border-default);
      background: var(--color-bg-surface);
    }
    .data-grid__corner,
    .data-grid__colheader,
    .data-grid__rowheader {
      background: var(--color-bg-surface);
      color: var(--color-text-subtle-on-surface);
      font-family: var(--font-family-accessible);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-regular);
      letter-spacing: var(--letter-spacing-wide);
      text-transform: uppercase;
      padding: var(--spacing-xs) var(--spacing-sm);
      white-space: nowrap;
    }
    .data-grid__colheader {
      text-align: center;
      border-bottom: 1px solid var(--color-border-strong);
    }
    .data-grid__rowheader {
      text-align: right;
      border-right: var(--border-width-thin) solid var(--color-border-strong);
    }
    .data-grid__corner {
      border-bottom: 1px solid var(--color-border-strong);
      border-right: var(--border-width-thin) solid var(--color-border-strong);
    }
    /* NOTE: min-height here is inert and always has been — this is a <td>, so
       it computes (72px with the knob set) and lays out at content height. The
       cell's height is set on .data-grid__cell-inner below, which is a flex
       span and does honour it. Left in place because min-width does work on a
       table cell and the pair reads as one declaration. */
    .data-grid__cell {
      position: relative;
      min-width: 2.5rem;
      min-height: 2.5rem;
      padding: 0;
      cursor: pointer;
      background: var(--cell-bg, var(--color-bg-page));
      color: var(--cell-fg, var(--color-text-default));
      border: none;
      box-shadow: inset -1px 0 0 var(--color-border-default), inset 0 -1px 0 var(--color-border-default);
    }
    .data-grid__cell:focus { outline: none; }
    .data-grid__cell:focus-visible {
      outline: var(--focus-ring-width) solid white;
      outline-offset: calc(-1 * var(--focus-ring-offset));
      box-shadow:
        inset -1px 0 0 var(--color-border-default),
        inset 0 -1px 0 var(--color-border-default),
        0 0 0 3px var(--color-focus);
      z-index: 2;
    }
    .data-grid__cell.is-selected {
      box-shadow:
        inset -1px 0 0 var(--color-border-default),
        inset 0 -1px 0 var(--color-border-default),
        inset 0 0 0 2px white,
        inset 0 0 0 4px var(--color-action-primary);
      z-index: 1;
    }
    .data-grid__cell.is-selected:focus-visible {
      box-shadow:
        inset 0 0 0 2px white,
        inset 0 0 0 4px var(--color-action-primary),
        0 0 0 3px var(--color-focus);
      z-index: 2;
    }
    .data-grid__cell.is-disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    /* --candor-data-grid-cell-min-height is the one style hook this component
       exposes so far (#165's convention; the rest of its surface is still
       missing, tracked separately). It lives here rather than on the <td>
       because min-height does not apply to a table cell. It exists because the
       label plate is centred, so cell height is what decides how much of the
       fill stays visible around it: at 2.5rem a long label leaves only a rim of
       colour. A demo whose subject IS the colour can buy that back without
       needing a new size rung (#229). */
    .data-grid__cell-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: var(--candor-data-grid-cell-min-height, 2.5rem);
      pointer-events: none;
      gap: 0.2em;
      padding: 0.25rem;
      box-sizing: border-box;
    }
    /* 14px, not 12px. This renders cell.label — consumer content, and the same
       string the cell exposes as its accessible name. It is read, not chrome, so
       the readable-text floor applies (#230). 12px also had the effect of
       removing it from contrast auditing entirely, which is how #229 stayed
       unnoticed: the visible text inside every cell had no pairing at all.

       The label carries its OWN background and does not inherit --cell-fg. That
       is the whole fix for #229, and the reasoning matters more than the CSS:

       This label is alternative content — it exists for a reader who cannot
       resolve the cell's colour, which makes it the redundant non-colour
       channel in CLAUDE.md's Tier 3 sense. A channel whose legibility depends
       on the very colour it is compensating for is not a channel. Painted
       directly on the fill it could not be one: six cells across this
       component's own demos measured 2.7-5.9 against a 6.5 floor, and
       --color-focus was *unreachable* — klar reports no colour meeting 4.5
       against it, at black or white. That is not a bad palette choice. A
       saturated fill at L 0.54-0.75 cannot host text, because contrast is
       bought with lightness and the gamut narrows as lightness leaves the
       middle.

       So the plate is opaque and token-coloured: text-default on bg-page is
       OKCA 11.5 light / 12.9 dark, independent of the cell beneath it, in one
       pairing the audit can measure. Deliberately NOT a translucent scrim —
       check-contrast.js skips alpha values as uncompositable, so a scrim would
       fix the appearance by removing the label from the audit, which is the
       failure this release exists to stop shipping (#229, #230).

       --cell-fg still governs the rest of the cell, including the selected
       check glyph; only the label opts out. */
    .data-grid__cell-label {
      font-family: var(--font-family-mono);
      font-size: var(--font-size-sm);
      line-height: 1;
      color: var(--color-text-default);
      background: var(--color-bg-page);
      padding: 0.15rem 0.3rem;
      border-radius: var(--radius-sm);
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .data-grid__check {
      font-size: var(--font-size-sm);
      line-height: 1;
    }
    :host([hide-headers]) caption,
    :host([hide-headers]) thead {
      position: absolute;
      width: 1px; height: 1px; padding: 0;
      overflow: hidden; clip: rect(0,0,0,0); clip-path: inset(50%);
      white-space: nowrap;
    }
    :host([hide-headers]) .data-grid__rowheader,
    :host([hide-headers]) .data-grid__corner {
      width: 0; min-width: 0; max-width: 0;
      padding: 0; overflow: hidden; white-space: nowrap;
      clip-path: inset(50%);
    }
  `}connectedCallback(){super.connectedCallback(),this._stopObservingAriaLabel=ot(this,t=>{this._ariaLabel=t})}disconnectedCallback(){this._stopObservingAriaLabel?.(),super.disconnectedCallback()}get _hasRowHeaders(){return this.rows.some(t=>t.rowHeader)}_isActive(t,e){return this._activeRow===t&&this._activeCol===e}_onClick(t,e){let r=this.rows[t]?.cells[e];!r||r.disabled||(this._activeRow=t,this._activeCol=e,this.dispatchEvent(new CustomEvent("cell-activate",{detail:{row:t,col:e,cell:r},bubbles:!0,composed:!0})),this._announcement=`${r.label} activated`)}_onFocus(t,e){this._activeRow=t,this._activeCol=e}_onKeydown(t,e,r){let o=this.rows.length-1,i=(this.rows[0]?.cells.length??1)-1,a=e,s=r;switch(t.key){case"ArrowRight":s=Math.min(r+1,i);break;case"ArrowLeft":s=Math.max(r-1,0);break;case"ArrowDown":a=Math.min(e+1,o);break;case"ArrowUp":a=Math.max(e-1,0);break;case"Home":t.ctrlKey&&(a=0),s=0;break;case"End":t.ctrlKey&&(a=o),s=i;break;case"Enter":case" ":t.preventDefault(),this._onClick(e,r);return;default:return}t.preventDefault(),this._activeRow=a,this._activeCol=s,requestAnimationFrame(()=>{this.shadowRoot?.querySelector(`[data-row="${a}"][data-col="${s}"]`)?.focus()})}render(){let t=this._hasRowHeaders;return b`
      <p id="${this._hintId}" class="sr-only">
        Arrow keys navigate · Ctrl+Home/End jumps to first/last cell · Enter or Space activates
      </p>
      <div class="data-grid__scroll">
      <table
        role="grid"
        class="data-grid"
        aria-label="${this._ariaLabel||(this.caption?v:"Data grid")}"
        aria-describedby="${this._hintId}"
      >
        ${this.caption?b`<caption class="data-grid__caption">${this.caption}</caption>`:v}
        ${this.columnHeaders.length?b`
          <thead>
            <tr role="row">
              ${t?b`<td class="data-grid__corner" role="none"></td>`:v}
              ${this.columnHeaders.map(e=>b`
                <th role="columnheader" scope="col" class="data-grid__colheader">${e}</th>
              `)}
            </tr>
          </thead>
        `:v}
        <tbody>
          ${this.rows.map((e,r)=>b`
            <tr role="row">
              ${e.rowHeader?b`
                <th role="rowheader" scope="row" class="data-grid__rowheader">${e.rowHeader}</th>
              `:v}
              ${e.cells.map((o,i)=>b`
                <td
                  role="gridcell"
                  class="data-grid__cell ${o.selected?"is-selected":""} ${o.disabled?"is-disabled":""}"
                  tabindex="${this._isActive(r,i)?"0":"-1"}"
                  aria-selected="${o.selected?"true":v}"
                  aria-disabled="${o.disabled?"true":v}"
                  aria-label="${o.label}"
                  data-row="${r}"
                  data-col="${i}"
                  style="${o.background?`--cell-bg:${o.background};`:""}${o.foreground?`--cell-fg:${o.foreground};`:""}"
                  @keydown="${a=>this._onKeydown(a,r,i)}"
                  @click="${()=>this._onClick(r,i)}"
                  @focus="${()=>this._onFocus(r,i)}"
                >
                  <span class="data-grid__cell-inner" aria-hidden="true">
                    ${this.showLabels?b`<span class="data-grid__cell-label">${o.label}</span>`:v}
                    ${o.selected?b`<span class="data-grid__check">✓</span>`:v}
                  </span>
                </td>
              `)}
            </tr>
          `)}
        </tbody>
      </table>
      </div>
      <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">${this._announcement}</div>
    `}};u([f()],gt.prototype,"caption",void 0),u([f({type:Array,attribute:"column-headers"})],gt.prototype,"columnHeaders",void 0),u([f({type:Array})],gt.prototype,"rows",void 0),u([f({type:Boolean,reflect:!0,attribute:"hide-headers"})],gt.prototype,"hideHeaders",void 0),u([f({type:Boolean,attribute:"show-labels"})],gt.prototype,"showLabels",void 0),u([M()],gt.prototype,"_ariaLabel",void 0),u([M()],gt.prototype,"_activeRow",void 0),u([M()],gt.prototype,"_activeCol",void 0),u([M()],gt.prototype,"_announcement",void 0),gt=u([S("candor-data-grid")],gt);var U=class extends C{constructor(...e){super(...e),this.rows=[],this.columnHeaders=[],this.caption="",this.hideHeaders=!1,this.hideUi=!1,this.showLabels=!1,this.size="normal",this.selectedValue=null,this._ariaLabel="",this._focusedRow=0,this._focusedCol=0,this._selectedRow=-1,this._selectedCol=-1,this._selectedColor=null,this._announcement="",this._edgeToggle=!1,this._initialized=!1,this._hintId=`gamut-hint-${Math.random().toString(36).slice(2,9)}`}static{this.styles=E`
    :host {
      display: block;
      font-family: var(--font-family-accessible);
    }

    .gamut-scroll { overflow-x: auto; }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .gamut-grid {
      border-collapse: collapse;
      width: auto;
    }

    .gamut-grid th,
    .gamut-grid td {
      border: 0;
      background: none;
    }

    .corner {
      padding: 0;
    }

    .col-header,
    .row-header {
      font-family: var(--font-family-base);
      font-size: var(--font-size-sm);
      font-weight: 400;
      color: var(--color-text-subtle);
    }

    .col-header {
      padding: var(--spacing-2xs) var(--spacing-xs);
      text-align: center;
      white-space: nowrap;
    }

    .row-header {
      padding: var(--spacing-2xs) 0.75rem var(--spacing-2xs) 0;
      text-align: right;
      white-space: nowrap;
    }

    .cell {
      padding: 3px;
      width: 3.125rem;
      height: 3.125rem;
    }

    .size-small .cell {
      width: 1.75rem;
      height: 1.75rem;
    }

    .cell-btn {
      display: block;
      width: 100%;
      height: 100%;
      border: var(--border-width-medium) solid transparent;
      border-radius: var(--radius-sm, 4px);
      cursor: pointer;
      padding: 0;
    }

    .cell-btn:focus-visible {
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
    }

    .cell-btn[aria-checked='true'] {
      border-color: var(--color-focus);
      outline: var(--focus-ring-width) solid var(--color-focus);
      outline-offset: var(--focus-ring-offset);
    }

    /* Hidden-headers variant: keep semantics, remove visible chrome */
    .gamut-grid.hide-headers thead {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .gamut-grid.hide-headers .row-header,
    .gamut-grid.hide-headers .corner {
      width: 0;
      min-width: 0;
      max-width: 0;
      padding: 0;
      overflow: hidden;
      white-space: nowrap;
      clip-path: inset(50%);
    }

    .preview {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 1.25rem;
      min-height: var(--spacing-lg);
    }

    .preview-swatch {
      display: inline-block;
      width: var(--spacing-lg);
      height: var(--spacing-lg);
      border-radius: var(--radius-sm, 4px);
      flex-shrink: 0;
      border: var(--border-width-thin) solid var(--color-border-default);
    }

    .preview-code {
      font-family: var(--font-family-mono);
      font-size: var(--font-size-sm);
      color: var(--color-text-default);
      background: var(--color-bg-surface);
      padding: 0.2em 0.5em;
      border-radius: var(--radius-sm);
      letter-spacing: 0.02em;
    }

    .preview-empty {
      font-size: var(--font-size-sm);
      color: var(--color-text-subtle);
      letter-spacing: 0.02em;
    }

    .hint {
      margin-top: 0.75rem;
      font-size: var(--font-size-sm);
      color: var(--color-text-subtle);
      letter-spacing: 0.02em;
    }

    /* Developer aid: show aria-label text beneath each swatch */
    .cell-inner {
      display: contents;
    }

    .cell-label {
      display: none;
    }

    :host([show-labels]) .cell {
      width: auto;
      height: auto;
      vertical-align: top;
    }

    :host([show-labels]) .cell-inner {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2xs);
    }

    :host([show-labels]) .cell-btn {
      width: 3.125rem;
      height: 3.125rem;
      flex-shrink: 0;
    }

    :host([show-labels]) .size-small .cell-btn {
      width: 1.75rem;
      height: 1.75rem;
    }

    :host([show-labels]) .cell-label {
      display: block;
      width: 9rem;
      font-family: var(--font-family-base);
      font-size: var(--font-size-sm);
      line-height: var(--line-height-relaxed);
      color: var(--color-text-subtle);
      word-break: break-word;
    }
  `}connectedCallback(){super.connectedCallback(),this._stopObservingAriaLabel=ot(this,e=>{this._ariaLabel=e})}disconnectedCallback(){this._stopObservingAriaLabel?.(),super.disconnectedCallback()}willUpdate(e){if(e.has("rows")&&!this._initialized&&this.rows.length){let r=this._findFirstInGamut();this._focusedRow=r.r,this._focusedCol=r.c,this._initialized=!0}if(e.has("selectedValue")&&this.selectedValue){let r=this._parseOklch(this.selectedValue);if(r){let o=this._findCellByLC(r.l,r.c);o&&(this._selectedRow=o.r,this._selectedCol=o.c,this._selectedColor=this.selectedValue,this._announcement=`Selected: ${this.selectedValue}`)}}}_inGamutMap(){let e=new Map,r=0;for(let[o,i]of this.rows.entries())for(let[a,s]of i.cells.entries())s.disabled||e.set(`${o}-${a}`,++r);return{setsize:r,map:e}}_activate(e,r,o){if(o.disabled||!o.value)return;this._focusedRow=e,this._focusedCol=r,this._selectedRow=e,this._selectedCol=r;let{l:i,c:a,h:s}=o.value,n=`oklch(${i.toFixed(2)} ${a.toFixed(3)} ${s})`;this._selectedColor=n,this._announcement=`Selected: ${n}`,this.dispatchEvent(new CustomEvent("color-select",{detail:{value:n,row:e,col:r,l:i,c:a,h:s},bubbles:!0,composed:!0})),this._focusButton(e,r)}_onKeydown(e){let r={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]};if(r[e.key]){e.preventDefault();let[o,i]=r[e.key];this._step(o,i)||(this._edgeToggle=!this._edgeToggle,this._announcement="Edge of gamut"+(this._edgeToggle?"​":""))}else if(e.key==="Home")e.preventDefault(),this._jumpRowEdge(!1);else if(e.key==="End")e.preventDefault(),this._jumpRowEdge(!0);else if(e.key==="Enter"||e.key===" "){let o=this._focusedRow,i=this._focusedCol,a=this.rows[o]?.cells[i];a&&!a.disabled&&(e.preventDefault(),this._activate(o,i,a))}}_step(e,r){let o=this.rows.length,i=this.rows[0]?.cells.length??0,a=this._focusedRow+e,s=this._focusedCol+r;for(;a>=0&&a<o&&s>=0&&s<i;){if(!this.rows[a].cells[s].disabled)return this._focusedRow=a,this._focusedCol=s,this._focusButton(a,s),!0;a+=e,s+=r}return!1}_jumpRowEdge(e){let r=this._focusedRow,o=this.rows[r]?.cells??[];if(e){for(let i=o.length-1;i>=0;i--)if(!o[i].disabled){this._focusedCol=i,this._focusButton(r,i);return}}else for(let i=0;i<o.length;i++)if(!o[i].disabled){this._focusedCol=i,this._focusButton(r,i);return}}_focusButton(e,r){requestAnimationFrame(()=>{this.shadowRoot?.querySelector(`[data-row="${e}"][data-col="${r}"]`)?.focus()})}_findFirstInGamut(){for(let e=0;e<this.rows.length;e++){let r=this.rows[e].cells;for(let o=0;o<r.length;o++)if(!r[o].disabled)return{r:e,c:o}}return{r:0,c:0}}_parseOklch(e){let r=e.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);return r?{l:parseFloat(r[1]),c:parseFloat(r[2]),h:parseFloat(r[3])}:null}_findCellByLC(e,r){for(let o=0;o<this.rows.length;o++){let i=this.rows[o].cells;for(let a=0;a<i.length;a++){let s=i[a];if(!(s.disabled||!s.value)&&Math.abs(s.value.l-e)<.001&&Math.abs(s.value.c-r)<.001)return{r:o,c:a}}}return null}render(){let{setsize:e,map:r}=this._inGamutMap(),o=this._ariaLabel||this.caption||"Tone picker";return b`
      <p id="${this._hintId}" class="sr-only">
        Arrow keys navigate · Enter or Space activates · Blank cells are outside sRGB gamut
      </p>

      <div role="group" class="gamut-scroll" @keydown="${this._onKeydown}">
        <table
          role="grid"
          class="gamut-grid ${this.hideHeaders?"hide-headers":""} ${this.size==="small"?"size-small":""}"
          aria-label="${o}"
          aria-describedby="${this._hintId}"
        >
          <thead>
            <tr role="row">
              <td class="corner" role="none"></td>
              ${this.columnHeaders.map(i=>b`
                  <th scope="col" role="columnheader" class="col-header">${i}</th>
                `)}
            </tr>
          </thead>
          <tbody>
            ${this.rows.map((i,a)=>b`
                <tr role="row">
                  <th scope="row" role="rowheader" class="row-header">${i.rowHeader??""}</th>
                  ${i.cells.map((s,n)=>s.disabled?b`<td role="gridcell" class="cell" aria-label="Out of gamut"></td>`:b`
                          <td role="gridcell" class="cell">
                            <div class="cell-inner">
                              <button
                                type="button"
                                role="radio"
                                class="cell-btn"
                                data-row="${a}"
                                data-col="${n}"
                                tabindex="${a===this._focusedRow&&n===this._focusedCol?"0":"-1"}"
                                style="${s.background?`background:${s.background};`:""}"
                                aria-label="${s.label}"
                                aria-checked="${a===this._selectedRow&&n===this._selectedCol?"true":"false"}"
                                aria-setsize="${e}"
                                aria-posinset="${r.get(`${a}-${n}`)??0}"
                                @click="${()=>this._activate(a,n,s)}"
                              ></button>
                              <span class="cell-label" aria-hidden="true">${s.label}</span>
                            </div>
                          </td>
                        `)}
                </tr>
              `)}
          </tbody>
        </table>
      </div>

      <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">${this._announcement}</div>

      <div class="ui ${this.hideUi?"sr-only":""}">
        <div class="preview">
          ${this._selectedColor?b`
                <span class="preview-swatch" style="background:${this._selectedColor};" aria-hidden="true"></span>
                <span class="preview-code">${this._selectedColor}</span>
              `:b`<span class="preview-empty">No color selected</span>`}
        </div>
        <p class="hint">Arrow keys navigate · Enter or Space activates · Blank cells are outside sRGB gamut</p>
      </div>
    `}};u([f({type:Array})],U.prototype,"rows",void 0),u([f({type:Array,attribute:"column-headers"})],U.prototype,"columnHeaders",void 0),u([f()],U.prototype,"caption",void 0),u([f({type:Boolean,reflect:!0,attribute:"hide-headers"})],U.prototype,"hideHeaders",void 0),u([f({type:Boolean,reflect:!0,attribute:"hide-ui"})],U.prototype,"hideUi",void 0),u([f({type:Boolean,reflect:!0,attribute:"show-labels"})],U.prototype,"showLabels",void 0),u([f({reflect:!0})],U.prototype,"size",void 0),u([f({attribute:"selected-value"})],U.prototype,"selectedValue",void 0),u([M()],U.prototype,"_ariaLabel",void 0),u([M()],U.prototype,"_focusedRow",void 0),u([M()],U.prototype,"_focusedCol",void 0),u([M()],U.prototype,"_selectedRow",void 0),u([M()],U.prototype,"_selectedCol",void 0),u([M()],U.prototype,"_selectedColor",void 0),u([M()],U.prototype,"_announcement",void 0),U=u([S("candor-tone-picker")],U);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qr=globalThis,Pi=Qr.ShadowRoot&&(Qr.ShadyCSS===void 0||Qr.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ln=Symbol(),ba=new WeakMap;let pc=class{constructor(e,r,o){if(this._$cssResult$=!0,o!==ln)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(Pi&&e===void 0){const o=r!==void 0&&r.length===1;o&&(e=ba.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&ba.set(r,e))}return e}toString(){return this.cssText}};const fc=t=>new pc(typeof t=="string"?t:t+"",void 0,ln),gc=(t,e)=>{if(Pi)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const o=document.createElement("style"),i=Qr.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=r.cssText,t.appendChild(o)}},ma=Pi?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const o of e.cssRules)r+=o.cssText;return fc(r)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:bc,defineProperty:mc,getOwnPropertyDescriptor:vc,getOwnPropertyNames:_c,getOwnPropertySymbols:yc,getPrototypeOf:wc}=Object,Ao=globalThis,va=Ao.trustedTypes,xc=va?va.emptyScript:"",$c=Ao.reactiveElementPolyfillSupport,dr=(t,e)=>t,no={toAttribute(t,e){switch(e){case Boolean:t=t?xc:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},Ti=(t,e)=>!bc(t,e),_a={attribute:!0,type:String,converter:no,reflect:!1,useDefault:!1,hasChanged:Ti};Symbol.metadata??=Symbol("metadata"),Ao.litPropertyMetadata??=new WeakMap;let Ne=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=_a){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,r);i!==void 0&&mc(this.prototype,e,i)}}static getPropertyDescriptor(e,r,o){const{get:i,set:a}=vc(this.prototype,e)??{get(){return this[r]},set(s){this[r]=s}};return{get:i,set(s){const n=i?.call(this);a?.call(this,s),this.requestUpdate(e,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_a}static _$Ei(){if(this.hasOwnProperty(dr("elementProperties")))return;const e=wc(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(dr("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(dr("properties"))){const r=this.properties,o=[..._c(r),...yc(r)];for(const i of o)this.createProperty(i,r[i])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[o,i]of r)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[r,o]of this.elementProperties){const i=this._$Eu(r,o);i!==void 0&&this._$Eh.set(i,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const i of o)r.unshift(ma(i))}else e!==void 0&&r.push(ma(e));return r}static _$Eu(e,r){const o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const o of r.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gc(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,r,o){this._$AK(e,o)}_$ET(e,r){const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(i!==void 0&&o.reflect===!0){const a=(o.converter?.toAttribute!==void 0?o.converter:no).toAttribute(r,o.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,r){const o=this.constructor,i=o._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const a=o.getPropertyOptions(i),s=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:no;this._$Em=i;const n=s.fromAttribute(r,a.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,r,o,i=!1,a){if(e!==void 0){const s=this.constructor;if(i===!1&&(a=this[e]),o??=s.getPropertyOptions(e),!((o.hasChanged??Ti)(a,r)||o.useDefault&&o.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,r,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:o,reflect:i,wrapped:a},s){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??r??this[e]),a!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(r=void 0),this._$AL.set(e,r)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[i,a]of o){const{wrapped:s}=a,n=this[i];s!==!0||this._$AL.has(i)||n===void 0||this.C(i,void 0,a,n)}}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(r)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(r=>this._$ET(r,this[r])),this._$EM()}updated(e){}firstUpdated(e){}};Ne.elementStyles=[],Ne.shadowRootOptions={mode:"open"},Ne[dr("elementProperties")]=new Map,Ne[dr("finalized")]=new Map,$c?.({ReactiveElement:Ne}),(Ao.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Oi=globalThis,ya=t=>t,lo=Oi.trustedTypes,wa=lo?lo.createPolicy("lit-html",{createHTML:t=>t}):void 0,cn="$lit$",Vt=`lit$${Math.random().toFixed(9).slice(2)}$`,dn="?"+Vt,kc=`<${dn}>`,ge=document,gr=()=>ge.createComment(""),br=t=>t===null||typeof t!="object"&&typeof t!="function",Ri=Array.isArray,Cc=t=>Ri(t)||typeof t?.[Symbol.iterator]=="function",Uo=`[ 	
\f\r]`,er=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xa=/-->/g,$a=/>/g,ne=RegExp(`>|${Uo}(?:([^\\s"'>=/]+)(${Uo}*=${Uo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ka=/'/g,Ca=/"/g,hn=/^(?:script|style|textarea|title)$/i,Mc=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),T=Mc(1),Re=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),Ma=new WeakMap,de=ge.createTreeWalker(ge,129);function un(t,e){if(!Ri(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return wa!==void 0?wa.createHTML(e):e}const Ac=(t,e)=>{const r=t.length-1,o=[];let i,a=e===2?"<svg>":e===3?"<math>":"",s=er;for(let n=0;n<r;n++){const l=t[n];let c,d,h=-1,p=0;for(;p<l.length&&(s.lastIndex=p,d=s.exec(l),d!==null);)p=s.lastIndex,s===er?d[1]==="!--"?s=xa:d[1]!==void 0?s=$a:d[2]!==void 0?(hn.test(d[2])&&(i=RegExp("</"+d[2],"g")),s=ne):d[3]!==void 0&&(s=ne):s===ne?d[0]===">"?(s=i??er,h=-1):d[1]===void 0?h=-2:(h=s.lastIndex-d[2].length,c=d[1],s=d[3]===void 0?ne:d[3]==='"'?Ca:ka):s===Ca||s===ka?s=ne:s===xa||s===$a?s=er:(s=ne,i=void 0);const m=s===ne&&t[n+1].startsWith("/>")?" ":"";a+=s===er?l+kc:h>=0?(o.push(c),l.slice(0,h)+cn+l.slice(h)+Vt+m):l+Vt+(h===-2?n:m)}return[un(t,a+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class mr{constructor({strings:e,_$litType$:r},o){let i;this.parts=[];let a=0,s=0;const n=e.length-1,l=this.parts,[c,d]=Ac(e,r);if(this.el=mr.createElement(c,o),de.currentNode=this.el.content,r===2||r===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=de.nextNode())!==null&&l.length<n;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(cn)){const p=d[s++],m=i.getAttribute(h).split(Vt),g=/([.?@])?(.*)/.exec(p);l.push({type:1,index:a,name:g[2],strings:m,ctor:g[1]==="."?zc:g[1]==="?"?Ec:g[1]==="@"?Nc:So}),i.removeAttribute(h)}else h.startsWith(Vt)&&(l.push({type:6,index:a}),i.removeAttribute(h));if(hn.test(i.tagName)){const h=i.textContent.split(Vt),p=h.length-1;if(p>0){i.textContent=lo?lo.emptyScript:"";for(let m=0;m<p;m++)i.append(h[m],gr()),de.nextNode(),l.push({type:2,index:++a});i.append(h[p],gr())}}}else if(i.nodeType===8)if(i.data===dn)l.push({type:2,index:a});else{let h=-1;for(;(h=i.data.indexOf(Vt,h+1))!==-1;)l.push({type:7,index:a}),h+=Vt.length-1}a++}}static createElement(e,r){const o=ge.createElement("template");return o.innerHTML=e,o}}function Be(t,e,r=t,o){if(e===Re)return e;let i=o!==void 0?r._$Co?.[o]:r._$Cl;const a=br(e)?void 0:e._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(t),i._$AT(t,r,o)),o!==void 0?(r._$Co??=[])[o]=i:r._$Cl=i),i!==void 0&&(e=Be(t,i._$AS(t,e.values),i,o)),e}class Sc{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:o}=this._$AD,i=(e?.creationScope??ge).importNode(r,!0);de.currentNode=i;let a=de.nextNode(),s=0,n=0,l=o[0];for(;l!==void 0;){if(s===l.index){let c;l.type===2?c=new zr(a,a.nextSibling,this,e):l.type===1?c=new l.ctor(a,l.name,l.strings,this,e):l.type===6&&(c=new Ic(a,this,e)),this._$AV.push(c),l=o[++n]}s!==l?.index&&(a=de.nextNode(),s++)}return de.currentNode=ge,i}p(e){let r=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,r),r+=o.strings.length-2):o._$AI(e[r])),r++}}class zr{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,o,i){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Be(this,e,r),br(e)?e===j||e==null||e===""?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==Re&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Cc(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==j&&br(this._$AH)?this._$AA.nextSibling.data=e:this.T(ge.createTextNode(e)),this._$AH=e}$(e){const{values:r,_$litType$:o}=e,i=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=mr.createElement(un(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(r);else{const a=new Sc(i,this),s=a.u(this.options);a.p(r),this.T(s),this._$AH=a}}_$AC(e){let r=Ma.get(e.strings);return r===void 0&&Ma.set(e.strings,r=new mr(e)),r}k(e){Ri(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let o,i=0;for(const a of e)i===r.length?r.push(o=new zr(this.O(gr()),this.O(gr()),this,this.options)):o=r[i],o._$AI(a),i++;i<r.length&&(this._$AR(o&&o._$AB.nextSibling,i),r.length=i)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){const o=ya(e).nextSibling;ya(e).remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class So{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,o,i,a){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=r,this._$AM=i,this.options=a,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=j}_$AI(e,r=this,o,i){const a=this.strings;let s=!1;if(a===void 0)e=Be(this,e,r,0),s=!br(e)||e!==this._$AH&&e!==Re,s&&(this._$AH=e);else{const n=e;let l,c;for(e=a[0],l=0;l<a.length-1;l++)c=Be(this,n[o+l],r,l),c===Re&&(c=this._$AH[l]),s||=!br(c)||c!==this._$AH[l],c===j?e=j:e!==j&&(e+=(c??"")+a[l+1]),this._$AH[l]=c}s&&!i&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class zc extends So{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}}class Ec extends So{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==j)}}class Nc extends So{constructor(e,r,o,i,a){super(e,r,o,i,a),this.type=5}_$AI(e,r=this){if((e=Be(this,e,r,0)??j)===Re)return;const o=this._$AH,i=e===j&&o!==j||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==j&&(o===j||i);i&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Ic{constructor(e,r,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Be(this,e)}}const Lc=Oi.litHtmlPolyfillSupport;Lc?.(mr,zr),(Oi.litHtmlVersions??=[]).push("3.3.2");const Pc=(t,e,r)=>{const o=r?.renderBefore??e;let i=o._$litPart$;if(i===void 0){const a=r?.renderBefore??null;o._$litPart$=i=new zr(e.insertBefore(gr(),a),a,void 0,r??{})}return i._$AI(t),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bi=globalThis;class dt extends Ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pc(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Re}}dt._$litElement$=!0,dt.finalized=!0,Bi.litElementHydrateSupport?.({LitElement:dt});const Tc=Bi.litElementPolyfillSupport;Tc?.({LitElement:dt});(Bi.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bt=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Oc={attribute:!0,type:String,converter:no,reflect:!1,hasChanged:Ti},Rc=(t=Oc,e,r)=>{const{kind:o,metadata:i}=r;let a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(r.name,t),o==="accessor"){const{name:s}=r;return{set(n){const l=e.get.call(this);e.set.call(this,n),this.requestUpdate(s,l,t,!0,n)},init(n){return n!==void 0&&this.C(s,void 0,t,n),n}}}if(o==="setter"){const{name:s}=r;return function(n){const l=this[s];e.call(this,n),this.requestUpdate(s,l,t,!0,n)}}throw Error("Unsupported decorator location: "+o)};function P(t){return(e,r)=>typeof r=="object"?Rc(t,e,r):((o,i,a)=>{const s=i.hasOwnProperty(a);return i.constructor.createProperty(a,o),s?Object.getOwnPropertyDescriptor(i,a):void 0})(t,e,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function B(t){return P({...t,state:!0,attribute:!1})}function R(t,e){let r=t.length;Array.isArray(t[0])||(t=[t]),Array.isArray(e[0])||(e=e.map(s=>[s]));let o=e[0].length,i=e[0].map((s,n)=>e.map(l=>l[n])),a=t.map(s=>i.map(n=>{let l=0;if(!Array.isArray(s)){for(let c of n)l+=s*c;return l}for(let c=0;c<s.length;c++)l+=s[c]*(n[c]||0);return l}));return r===1&&(a=a[0]),o===1?a.map(s=>s[0]):a}function Er(t){return Gt(t)==="string"}function Gt(t){return(Object.prototype.toString.call(t).match(/^\[object\s+(.*?)\]$/)[1]||"").toLowerCase()}function co(t,{precision:e,unit:r}){return Xt(t)?"none":pn(t,e)+(r??"")}function Xt(t){return Number.isNaN(t)||t instanceof Number&&t?.none}function D(t){return Xt(t)?0:t}function pn(t,e){if(t===0)return 0;let r=~~t,o=0;r&&e&&(o=~~Math.log10(Math.abs(r))+1);const i=10**(e-o);return Math.floor(t*i+.5)/i}const Bc={deg:1,grad:.9,rad:180/Math.PI,turn:360};function fn(t){if(!t)return;t=t.trim();const e=/^([a-z]+)\((.+?)\)$/i,r=/^-?[\d.]+$/,o=/%|deg|g?rad|turn$/,i=/\/?\s*(none|[-\w.]+(?:%|deg|g?rad|turn)?)/g;let a=t.match(e);if(a){let s=[];return a[2].replace(i,(n,l)=>{let c=l.match(o),d=l;if(c){let h=c[0],p=d.slice(0,-h.length);h==="%"?(d=new Number(p/100),d.type="<percentage>"):(d=new Number(p*Bc[h]),d.type="<angle>",d.unit=h)}else r.test(d)?(d=new Number(d),d.type="<number>"):d==="none"&&(d=new Number(NaN),d.none=!0);n.startsWith("/")&&(d=d instanceof Number?d:new Number(d),d.alpha=!0),typeof d=="object"&&d instanceof Number&&(d.raw=l),s.push(d)}),{name:a[1].toLowerCase(),rawName:a[1],rawArgs:a[2],args:s}}}function gn(t){return t[t.length-1]}function vr(t,e,r){return isNaN(t)?e:isNaN(e)?t:t+(e-t)*r}function bn(t,e,r){return(r-t)/(e-t)}function Hi(t,e,r){return vr(e[0],e[1],bn(t[0],t[1],r))}function mn(t){return t.map(e=>e.split("|").map(r=>{r=r.trim();let o=r.match(/^(<[a-z]+>)\[(-?[.\d]+),\s*(-?[.\d]+)\]?$/);if(o){let i=new String(o[1]);return i.range=[+o[2],+o[3]],i}return r}))}function vn(t,e,r){return Math.max(Math.min(r,e),t)}function zo(t,e){return Math.sign(t)===Math.sign(e)?t:-t}function Mt(t,e){return zo(Math.abs(t)**e,t)}function Di(t,e){return e===0?0:t/e}function _n(t,e,r=0,o=t.length){for(;r<o;){const i=r+o>>1;t[i]<e?r=i+1:o=i}return r}var Hc=Object.freeze({__proto__:null,bisectLeft:_n,clamp:vn,copySign:zo,interpolate:vr,interpolateInv:bn,isNone:Xt,isString:Er,last:gn,mapRange:Hi,multiplyMatrices:R,parseCoordGrammar:mn,parseFunction:fn,serializeNumber:co,skipNone:D,spow:Mt,toPrecision:pn,type:Gt,zdiv:Di});class Dc{add(e,r,o){if(typeof arguments[0]!="string"){for(var e in arguments[0])this.add(e,arguments[0][e],arguments[1]);return}(Array.isArray(e)?e:[e]).forEach(function(i){this[i]=this[i]||[],r&&this[i][o?"unshift":"push"](r)},this)}run(e,r){this[e]=this[e]||[],this[e].forEach(function(o){o.call(r&&r.context?r.context:r,r)})}}const Kt=new Dc;var ht={gamut_mapping:"css",precision:5,deltaE:"76",verbose:globalThis?.process?.env?.NODE_ENV?.toLowerCase()!=="test",warn:function(e){this.verbose&&globalThis?.console?.warn?.(e)}};const Z={D50:[.3457/.3585,1,(1-.3457-.3585)/.3585],D65:[.3127/.329,1,(1-.3127-.329)/.329]};function ai(t){return Array.isArray(t)?t:Z[t]}function ho(t,e,r,o={}){if(t=ai(t),e=ai(e),!t||!e)throw new TypeError(`Missing white point to convert ${t?"":"from"}${!t&&!e?"/":""}${e?"":"to"}`);if(t===e)return r;let i={W1:t,W2:e,XYZ:r,options:o};if(Kt.run("chromatic-adaptation-start",i),i.M||(i.W1===Z.D65&&i.W2===Z.D50?i.M=[[1.0479297925449969,.022946870601609652,-.05019226628920524],[.02962780877005599,.9904344267538799,-.017073799063418826],[-.009243040646204504,.015055191490298152,.7518742814281371]]:i.W1===Z.D50&&i.W2===Z.D65&&(i.M=[[.955473421488075,-.02309845494876471,.06325924320057072],[-.0283697093338637,1.0099953980813041,.021041441191917323],[.012314014864481998,-.020507649298898964,1.330365926242124]])),Kt.run("chromatic-adaptation-end",i),i.M)return R(i.M,i.XYZ);throw new TypeError("Only Bradford CAT with white points D50 and D65 supported for now.")}const Fc=new Set(["<number>","<percentage>","<angle>"]);function Aa(t,e,r,o){return Object.entries(t.coords).map(([a,s],n)=>{let l=e.coordGrammar[n],c=o[n],d=c?.type,h;if(c.none?h=l.find(g=>Fc.has(g)):h=l.find(g=>g==d),!h){let g=s.name||a;throw new TypeError(`${d??c.raw} not allowed for ${g} in ${r}()`)}let p=h.range;d==="<percentage>"&&(p||=[0,1]);let m=s.range||s.refRange;return p&&m&&(o[n]=Hi(p,m,o[n])),h})}function yn(t,{meta:e}={}){let r={str:String(t)?.trim()};if(Kt.run("parse-start",r),r.color)return r.color;if(r.parsed=fn(r.str),r.parsed){let o=r.parsed.name;if(o==="color"){let i=r.parsed.args.shift(),a=i.startsWith("--")?i.substring(2):`--${i}`,s=[i,a],n=r.parsed.rawArgs.indexOf("/")>0?r.parsed.args.pop():1;for(let d of w.all){let h=d.getFormat("color");if(h&&(s.includes(h.id)||h.ids?.filter(p=>s.includes(p)).length)){const p=Object.keys(d.coords).map((g,_)=>r.parsed.args[_]||0);let m;return h.coordGrammar&&(m=Aa(d,h,"color",p)),e&&Object.assign(e,{formatId:"color",types:m}),h.id.startsWith("--")&&!i.startsWith("--")&&ht.warn(`${d.name} is a non-standard space and not currently supported in the CSS spec. Use prefixed color(${h.id}) instead of color(${i}).`),i.startsWith("--")&&!h.id.startsWith("--")&&ht.warn(`${d.name} is a standard space and supported in the CSS spec. Use color(${h.id}) instead of prefixed color(${i}).`),{spaceId:d.id,coords:p,alpha:n}}}let l="",c=i in w.registry?i:a;if(c in w.registry){let d=w.registry[c].formats?.color?.id;d&&(l=`Did you mean color(${d})?`)}throw new TypeError(`Cannot parse color(${i}). `+(l||"Missing a plugin?"))}else for(let i of w.all){let a=i.getFormat(o);if(a&&a.type==="function"){let s=1;(a.lastAlpha||gn(r.parsed.args).alpha)&&(s=r.parsed.args.pop());let n=r.parsed.args,l;return a.coordGrammar&&(l=Aa(i,a,o,n)),e&&Object.assign(e,{formatId:a.name,types:l}),{spaceId:i.id,coords:n,alpha:s}}}}else for(let o of w.all)for(let i in o.formats){let a=o.formats[i];if(a.type!=="custom"||a.test&&!a.test(r.str))continue;let s=a.parse(r.str);if(s)return s.alpha??=1,e&&(e.formatId=i),s}throw new TypeError(`Could not parse ${t} as a color. Missing a plugin?`)}function A(t){if(Array.isArray(t))return t.map(A);if(!t)throw new TypeError("Empty color reference");Er(t)&&(t=yn(t));let e=t.space||t.spaceId;return e instanceof w||(t.space=w.get(e)),t.alpha===void 0&&(t.alpha=1),t}const qc=75e-6;class w{constructor(e){this.id=e.id,this.name=e.name,this.base=e.base?w.get(e.base):null,this.aliases=e.aliases,this.base&&(this.fromBase=e.fromBase,this.toBase=e.toBase);let r=e.coords??this.base.coords;for(let i in r)"name"in r[i]||(r[i].name=i);this.coords=r;let o=e.white??this.base.white??"D65";this.white=ai(o),this.formats=e.formats??{};for(let i in this.formats){let a=this.formats[i];a.type||="function",a.name||=i}this.formats.color?.id||(this.formats.color={...this.formats.color??{},id:e.cssId||this.id}),e.gamutSpace?this.gamutSpace=e.gamutSpace==="self"?this:w.get(e.gamutSpace):this.isPolar?this.gamutSpace=this.base:this.gamutSpace=this,this.gamutSpace.isUnbounded&&(this.inGamut=(i,a)=>!0),this.referred=e.referred,Object.defineProperty(this,"path",{value:jc(this).reverse(),writable:!1,enumerable:!0,configurable:!0}),Kt.run("colorspace-init-end",this)}inGamut(e,{epsilon:r=qc}={}){if(!this.equals(this.gamutSpace))return e=this.to(this.gamutSpace,e),this.gamutSpace.inGamut(e,{epsilon:r});let o=Object.values(this.coords);return e.every((i,a)=>{let s=o[a];if(s.type!=="angle"&&s.range){if(Number.isNaN(i))return!0;let[n,l]=s.range;return(n===void 0||i>=n-r)&&(l===void 0||i<=l+r)}return!0})}get isUnbounded(){return Object.values(this.coords).every(e=>!("range"in e))}get cssId(){return this.formats?.color?.id||this.id}get isPolar(){for(let e in this.coords)if(this.coords[e].type==="angle")return!0;return!1}getFormat(e){if(typeof e=="object")return e=Sa(e,this),e;let r;return e==="default"?r=Object.values(this.formats)[0]:r=this.formats[e],r?(r=Sa(r,this),r):null}equals(e){return e?this===e||this.id===e||this.id===e.id:!1}to(e,r){if(arguments.length===1){const n=A(e);[e,r]=[n.space,n.coords]}if(e=w.get(e),this.equals(e))return r;r=r.map(n=>Number.isNaN(n)?0:n);let o=this.path,i=e.path,a,s;for(let n=0;n<o.length&&o[n].equals(i[n]);n++)a=o[n],s=n;if(!a)throw new Error(`Cannot convert between color spaces ${this} and ${e}: no connection space was found`);for(let n=o.length-1;n>s;n--)r=o[n].toBase(r);for(let n=s+1;n<i.length;n++)r=i[n].fromBase(r);return r}from(e,r){if(arguments.length===1){const o=A(e);[e,r]=[o.space,o.coords]}return e=w.get(e),e.to(this,r)}toString(){return`${this.name} (${this.id})`}getMinCoords(){let e=[];for(let r in this.coords){let o=this.coords[r],i=o.range||o.refRange;e.push(i?.min??0)}return e}static registry={};static get all(){return[...new Set(Object.values(w.registry))]}static register(e,r){if(arguments.length===1&&(r=arguments[0],e=r.id),r=this.get(r),this.registry[e]&&this.registry[e]!==r)throw new Error(`Duplicate color space registration: '${e}'`);if(this.registry[e]=r,arguments.length===1&&r.aliases)for(let o of r.aliases)this.register(o,r);return r}static get(e,...r){if(!e||e instanceof w)return e;if(Gt(e)==="string"){let i=w.registry[e.toLowerCase()];if(!i)throw new TypeError(`No color space found with id = "${e}"`);return i}if(r.length)return w.get(...r);throw new TypeError(`${e} is not a valid color space`)}static resolveCoord(e,r){let o=Gt(e),i,a;if(o==="string"?e.includes(".")?[i,a]=e.split("."):[i,a]=[,e]:Array.isArray(e)?[i,a]=e:(i=e.space,a=e.coordId),i=w.get(i),i||(i=r),!i)throw new TypeError(`Cannot resolve coordinate reference ${e}: No color space specified and relative references are not allowed here`);if(o=Gt(a),o==="number"||o==="string"&&a>=0){let l=Object.entries(i.coords)[a];if(l)return{space:i,id:l[0],index:a,...l[1]}}i=w.get(i);let s=a.toLowerCase(),n=0;for(let l in i.coords){let c=i.coords[l];if(l.toLowerCase()===s||c.name?.toLowerCase()===s)return{space:i,id:l,index:n,...c};n++}throw new TypeError(`No "${a}" coordinate found in ${i.name}. Its coordinates are: ${Object.keys(i.coords).join(", ")}`)}static DEFAULT_FORMAT={type:"functions",name:"color"}}function jc(t){let e=[t];for(let r=t;r=r.base;)e.push(r);return e}function Sa(t,{coords:e}={}){if(t.coords&&!t.coordGrammar){t.type||="function",t.name||="color",t.coordGrammar=mn(t.coords);let r=Object.entries(e).map(([o,i],a)=>{let s=t.coordGrammar[a][0],n=i.range||i.refRange,l=s.range,c="";return s=="<percentage>"?(l=[0,100],c="%"):s=="<angle>"&&(c="deg"),{fromRange:n,toRange:l,suffix:c}});t.serializeCoords=(o,i)=>o.map((a,s)=>{let{fromRange:n,toRange:l,suffix:c}=r[s];return n&&l&&(a=Hi(n,l,a)),a=co(a,{precision:i,unit:c}),a})}return t}var V=new w({id:"xyz-d65",name:"XYZ D65",coords:{x:{name:"X"},y:{name:"Y"},z:{name:"Z"}},white:"D65",formats:{color:{ids:["xyz-d65","xyz"]}},aliases:["xyz"]});class it extends w{constructor(e){e.coords||(e.coords={r:{range:[0,1],name:"Red"},g:{range:[0,1],name:"Green"},b:{range:[0,1],name:"Blue"}}),e.base||(e.base=V),e.toXYZ_M&&e.fromXYZ_M&&(e.toBase??=r=>{let o=R(e.toXYZ_M,r);return this.white!==this.base.white&&(o=ho(this.white,this.base.white,o)),o},e.fromBase??=r=>(r=ho(this.base.white,this.white,r),R(e.fromXYZ_M,r))),e.referred??="display",super(e)}}function Nr(t,e){return t=A(t),!e||t.space.equals(e)?t.coords.slice():(e=w.get(e),e.from(t))}function lt(t,e){t=A(t);let{space:r,index:o}=w.resolveCoord(e,t.space);return Nr(t,r)[o]}function Fi(t,e,r){return t=A(t),e=w.get(e),t.coords=e.to(t.space,r),t}Fi.returns="color";function Ot(t,e,r){if(t=A(t),arguments.length===2&&Gt(arguments[1])==="object"){let o=arguments[1];for(let i in o)Ot(t,i,o[i])}else{typeof r=="function"&&(r=r(lt(t,e)));let{space:o,index:i}=w.resolveCoord(e,t.space),a=Nr(t,o);a[i]=r,Fi(t,o,a)}return t}Ot.returns="color";var qi=new w({id:"xyz-d50",name:"XYZ D50",white:"D50",base:V,fromBase:t=>ho(V.white,"D50",t),toBase:t=>ho("D50",V.white,t)});const Uc=216/24389,za=24/116,Dr=24389/27;let Vo=Z.D50;var ct=new w({id:"lab",name:"Lab",coords:{l:{refRange:[0,100],name:"Lightness"},a:{refRange:[-125,125]},b:{refRange:[-125,125]}},white:Vo,base:qi,fromBase(t){let r=t.map((o,i)=>o/Vo[i]).map(o=>o>Uc?Math.cbrt(o):(Dr*o+16)/116);return[116*r[1]-16,500*(r[0]-r[1]),200*(r[1]-r[2])]},toBase(t){let e=[];return e[1]=(t[0]+16)/116,e[0]=t[1]/500+e[1],e[2]=e[1]-t[2]/200,[e[0]>za?Math.pow(e[0],3):(116*e[0]-16)/Dr,t[0]>8?Math.pow((t[0]+16)/116,3):t[0]/Dr,e[2]>za?Math.pow(e[2],3):(116*e[2]-16)/Dr].map((o,i)=>o*Vo[i])},formats:{lab:{coords:["<number> | <percentage>","<number> | <percentage>[-1,1]","<number> | <percentage>[-1,1]"]}}});function Et(t){return(t%360+360)%360}function Vc(t,e){if(t==="raw")return e;let[r,o]=e.map(Et),i=o-r;return t==="increasing"?i<0&&(o+=360):t==="decreasing"?i>0&&(r+=360):t==="longer"?-180<i&&i<180&&(i>0?r+=360:o+=360):t==="shorter"&&(i>180?r+=360:i<-180&&(o+=360)),[r,o]}var _r=new w({id:"lch",name:"LCH",coords:{l:{refRange:[0,100],name:"Lightness"},c:{refRange:[0,150],name:"Chroma"},h:{refRange:[0,360],type:"angle",name:"Hue"}},base:ct,fromBase(t){let[e,r,o]=t,i;const a=.02;return Math.abs(r)<a&&Math.abs(o)<a?i=NaN:i=Math.atan2(o,r)*180/Math.PI,[e,Math.sqrt(r**2+o**2),Et(i)]},toBase(t){let[e,r,o]=t;return r<0&&(r=0),isNaN(o)&&(o=0),[e,r*Math.cos(o*Math.PI/180),r*Math.sin(o*Math.PI/180)]},formats:{lch:{coords:["<number> | <percentage>","<number> | <percentage>","<number> | <angle>"]}}});const Ea=25**7,uo=Math.PI,Na=180/uo,Ce=uo/180;function Ia(t){const e=t*t;return e*e*e*t}function wn(t,e,{kL:r=1,kC:o=1,kH:i=1}={}){[t,e]=A([t,e]);let[a,s,n]=ct.from(t),l=_r.from(ct,[a,s,n])[1],[c,d,h]=ct.from(e),p=_r.from(ct,[c,d,h])[1];l<0&&(l=0),p<0&&(p=0);let m=(l+p)/2,g=Ia(m),_=.5*(1-Math.sqrt(g/(g+Ea))),y=(1+_)*s,$=(1+_)*d,k=Math.sqrt(y**2+n**2),x=Math.sqrt($**2+h**2),I=y===0&&n===0?0:Math.atan2(n,y),L=$===0&&h===0?0:Math.atan2(h,$);I<0&&(I+=2*uo),L<0&&(L+=2*uo),I*=Na,L*=Na;let at=c-a,Dt=x-k,st=L-I,Jt=I+L,We=Math.abs(st),N;k*x===0?N=0:We<=180?N=st:st>180?N=st-360:st<-180?N=st+360:ht.warn("the unthinkable has happened");let wt=2*Math.sqrt(x*k)*Math.sin(N*Ce/2),J=(a+c)/2,xt=(k+x)/2,Xe=Ia(xt),Q;k*x===0?Q=Jt:We<=180?Q=Jt/2:Jt<360?Q=(Jt+360)/2:Q=(Jt-360)/2;let Qt=(J-50)**2,_e=1+.015*Qt/Math.sqrt(20+Qt),ut=1+.045*xt,Ke=1;Ke-=.17*Math.cos((Q-30)*Ce),Ke+=.24*Math.cos(2*Q*Ce),Ke+=.32*Math.cos((3*Q+6)*Ce),Ke-=.2*Math.cos((4*Q-63)*Ce);let ra=1+.015*xt*Ke,Sl=30*Math.exp(-1*((Q-275)/25)**2),zl=2*Math.sqrt(Xe/(Xe+Ea)),El=-1*Math.sin(2*Sl*Ce)*zl,Tr=(at/(r*_e))**2;return Tr+=(Dt/(o*ut))**2,Tr+=(wt/(i*ra))**2,Tr+=El*(Dt/(o*ut))*(wt/(i*ra)),Math.sqrt(Tr)}const Gc=[[.819022437996703,.3619062600528904,-.1288737815209879],[.0329836539323885,.9292868615863434,.0361446663506424],[.0481771893596242,.2642395317527308,.6335478284694309]],Wc=[[1.2268798758459243,-.5578149944602171,.2813910456659647],[-.0405757452148008,1.112286803280317,-.0717110580655164],[-.0763729366746601,-.4214933324022432,1.5869240198367816]],Xc=[[.210454268309314,.7936177747023054,-.0040720430116193],[1.9779985324311684,-2.42859224204858,.450593709617411],[.0259040424655478,.7827717124575296,-.8086757549230774]],Kc=[[1,.3963377773761749,.2158037573099136],[1,-.1055613458156586,-.0638541728258133],[1,-.0894841775298119,-1.2914855480194092]];var He=new w({id:"oklab",name:"Oklab",coords:{l:{refRange:[0,1],name:"Lightness"},a:{refRange:[-.4,.4]},b:{refRange:[-.4,.4]}},white:"D65",base:V,fromBase(t){let r=R(Gc,t).map(o=>Math.cbrt(o));return R(Xc,r)},toBase(t){let r=R(Kc,t).map(o=>o**3);return R(Wc,r)},formats:{oklab:{coords:["<percentage> | <number>","<number> | <percentage>[-1,1]","<number> | <percentage>[-1,1]"]}}});function si(t,e){[t,e]=A([t,e]);let[r,o,i]=He.from(t),[a,s,n]=He.from(e),l=r-a,c=o-s,d=i-n;return Math.sqrt(l**2+c**2+d**2)}const Zc=75e-6;function ue(t,e,{epsilon:r=Zc}={}){t=A(t),e||(e=t.space),e=w.get(e);let o=t.coords;return e!==t.space&&(o=e.from(t)),e.inGamut(o,{epsilon:r})}function De(t){return{space:t.space,coords:t.coords.slice(),alpha:t.alpha}}function xn(t,e,r="lab"){r=w.get(r);let o=r.from(t),i=r.from(e);return Math.sqrt(o.reduce((a,s,n)=>{let l=i[n];return isNaN(s)||isNaN(l)?a:a+(l-s)**2},0))}function Yc(t,e){return xn(t,e,"lab")}const Jc=Math.PI,La=Jc/180;function Qc(t,e,{l:r=2,c:o=1}={}){[t,e]=A([t,e]);let[i,a,s]=ct.from(t),[,n,l]=_r.from(ct,[i,a,s]),[c,d,h]=ct.from(e),p=_r.from(ct,[c,d,h])[1];n<0&&(n=0),p<0&&(p=0);let m=i-c,g=n-p,_=a-d,y=s-h,$=_**2+y**2-g**2,k=.511;i>=16&&(k=.040975*i/(1+.01765*i));let x=.0638*n/(1+.0131*n)+.638,I;Number.isNaN(l)&&(l=0),l>=164&&l<=345?I=.56+Math.abs(.2*Math.cos((l+168)*La)):I=.36+Math.abs(.4*Math.cos((l+35)*La));let L=Math.pow(n,4),at=Math.sqrt(L/(L+1900)),Dt=x*(at*I+1-at),st=(m/(r*k))**2;return st+=(g/(o*x))**2,st+=$/Dt**2,Math.sqrt(st)}const Pa=203;var ji=new w({id:"xyz-abs-d65",cssId:"--xyz-abs-d65",name:"Absolute XYZ D65",coords:{x:{refRange:[0,9504.7],name:"Xa"},y:{refRange:[0,1e4],name:"Ya"},z:{refRange:[0,10888.3],name:"Za"}},base:V,fromBase(t){return t.map(e=>Math.max(e*Pa,0))},toBase(t){return t.map(e=>Math.max(e/Pa,0))}});const Fr=1.15,qr=.66,Ta=2610/2**14,td=2**14/2610,Oa=3424/2**12,Ra=2413/2**7,Ba=2392/2**7,ed=1.7*2523/2**5,Ha=2**5/(1.7*2523),jr=-.56,Go=16295499532821565e-27,rd=[[.41478972,.579999,.014648],[-.20151,1.120649,.0531008],[-.0166008,.2648,.6684799]],od=[[1.9242264357876067,-1.0047923125953657,.037651404030618],[.35031676209499907,.7264811939316552,-.06538442294808501],[-.09098281098284752,-.3127282905230739,1.5227665613052603]],id=[[.5,.5,0],[3.524,-4.066708,.542708],[.199076,1.096799,-1.295875]],ad=[[1,.1386050432715393,.05804731615611886],[.9999999999999999,-.1386050432715393,-.05804731615611886],[.9999999999999998,-.09601924202631895,-.8118918960560388]];var $n=new w({id:"jzazbz",name:"Jzazbz",coords:{jz:{refRange:[0,1],name:"Jz"},az:{refRange:[-.5,.5]},bz:{refRange:[-.5,.5]}},base:ji,fromBase(t){let[e,r,o]=t,i=Fr*e-(Fr-1)*o,a=qr*r-(qr-1)*e,n=R(rd,[i,a,o]).map(function(p){let m=Oa+Ra*(p/1e4)**Ta,g=1+Ba*(p/1e4)**Ta;return(m/g)**ed}),[l,c,d]=R(id,n);return[(1+jr)*l/(1+jr*l)-Go,c,d]},toBase(t){let[e,r,o]=t,i=(e+Go)/(1+jr-jr*(e+Go)),s=R(ad,[i,r,o]).map(function(p){let m=Oa-p**Ha,g=Ba*p**Ha-Ra;return 1e4*(m/g)**td}),[n,l,c]=R(od,s),d=(n+(Fr-1)*c)/Fr,h=(l+(qr-1)*d)/qr;return[d,h,c]},formats:{color:{coords:["<number> | <percentage>","<number> | <percentage>[-1,1]","<number> | <percentage>[-1,1]"]}}}),ni=new w({id:"jzczhz",name:"JzCzHz",coords:{jz:{refRange:[0,1],name:"Jz"},cz:{refRange:[0,1],name:"Chroma"},hz:{refRange:[0,360],type:"angle",name:"Hue"}},base:$n,fromBase(t){let[e,r,o]=t,i;const a=2e-4;return Math.abs(r)<a&&Math.abs(o)<a?i=NaN:i=Math.atan2(o,r)*180/Math.PI,[e,Math.sqrt(r**2+o**2),Et(i)]},toBase(t){return[t[0],t[1]*Math.cos(t[2]*Math.PI/180),t[1]*Math.sin(t[2]*Math.PI/180)]}});function sd(t,e){[t,e]=A([t,e]);let[r,o,i]=ni.from(t),[a,s,n]=ni.from(e),l=r-a,c=o-s;Number.isNaN(i)&&Number.isNaN(n)?(i=0,n=0):Number.isNaN(i)?i=n:Number.isNaN(n)&&(n=i);let d=i-n,h=2*Math.sqrt(o*s)*Math.sin(d/2*(Math.PI/180));return Math.sqrt(l**2+c**2+h**2)}const kn=3424/4096,Cn=2413/128,Mn=2392/128,Da=2610/16384,nd=2523/32,ld=16384/2610,Fa=32/2523,cd=[[.3592832590121217,.6976051147779502,-.035891593232029],[-.1920808463704993,1.100476797037432,.0753748658519118],[.0070797844607479,.0748396662186362,.8433265453898765]],dd=[[2048/4096,2048/4096,0],[6610/4096,-13613/4096,7003/4096],[17933/4096,-17390/4096,-543/4096]],hd=[[.9999999999999998,.0086090370379328,.111029625003026],[.9999999999999998,-.0086090370379328,-.1110296250030259],[.9999999999999998,.5600313357106791,-.3206271749873188]],ud=[[2.0701522183894223,-1.3263473389671563,.2066510476294053],[.3647385209748072,.6805660249472273,-.0453045459220347],[-.0497472075358123,-.0492609666966131,1.1880659249923042]];var li=new w({id:"ictcp",name:"ICTCP",coords:{i:{refRange:[0,1],name:"I"},ct:{refRange:[-.5,.5],name:"CT"},cp:{refRange:[-.5,.5],name:"CP"}},base:ji,fromBase(t){let e=R(cd,t);return pd(e)},toBase(t){let e=fd(t);return R(ud,e)}});function pd(t){let e=t.map(function(r){let o=kn+Cn*(r/1e4)**Da,i=1+Mn*(r/1e4)**Da;return(o/i)**nd});return R(dd,e)}function fd(t){return R(hd,t).map(function(o){let i=Math.max(o**Fa-kn,0),a=Cn-Mn*o**Fa;return 1e4*(i/a)**ld})}function gd(t,e){[t,e]=A([t,e]);let[r,o,i]=li.from(t),[a,s,n]=li.from(e);return 720*Math.sqrt((r-a)**2+.25*(o-s)**2+(i-n)**2)}const bd=Z.D65,An=.42,qa=1/An,Wo=2*Math.PI,Sn=[[.401288,.650173,-.051461],[-.250268,1.204414,.045854],[-.002079,.048952,.953127]],md=[[1.8620678550872327,-1.0112546305316843,.14918677544445175],[.38752654323613717,.6214474419314753,-.008973985167612518],[-.015841498849333856,-.03412293802851557,1.0499644368778496]],vd=[[460,451,288],[460,-891,-261],[460,-220,-6300]],_d={dark:[.8,.525,.8],dim:[.9,.59,.9],average:[1,.69,1]},le={h:[20.14,90,164.25,237.53,380.14],e:[.8,.7,1,1.2,.8],H:[0,100,200,300,400]},yd=180/Math.PI,ja=Math.PI/180;function zn(t,e){return t.map(o=>{const i=Mt(e*Math.abs(o)*.01,An);return 400*zo(i,o)/(i+27.13)})}function wd(t,e){const r=100/e*27.13**qa;return t.map(o=>{const i=Math.abs(o);return zo(r*Mt(i/(400-i),qa),o)})}function xd(t){let e=Et(t);e<=le.h[0]&&(e+=360);const r=_n(le.h,e)-1,[o,i]=le.h.slice(r,r+2),[a,s]=le.e.slice(r,r+2),n=le.H[r],l=(e-o)/a;return n+100*l/(l+(i-e)/s)}function $d(t){let e=(t%400+400)%400;const r=Math.floor(.01*e);e=e%100;const[o,i]=le.h.slice(r,r+2),[a,s]=le.e.slice(r,r+2);return Et((e*(s*o-a*i)-100*o*s)/(e*(s-a)-100*s))}function En(t,e,r,o,i){const a={};a.discounting=i,a.refWhite=t,a.surround=o;const s=t.map(_=>_*100);a.la=e,a.yb=r;const n=s[1],l=R(Sn,s);o=_d[a.surround];const c=o[0];a.c=o[1],a.nc=o[2];const h=(1/(5*a.la+1))**4;a.fl=h*a.la+.1*(1-h)*(1-h)*Math.cbrt(5*a.la),a.flRoot=a.fl**.25,a.n=a.yb/n,a.z=1.48+Math.sqrt(a.n),a.nbb=.725*a.n**-.2,a.ncb=a.nbb;const p=Math.max(Math.min(c*(1-1/3.6*Math.exp((-a.la-42)/92)),1),0);a.dRgb=l.map(_=>vr(1,n/_,p)),a.dRgbInv=a.dRgb.map(_=>1/_);const m=l.map((_,y)=>_*a.dRgb[y]),g=zn(m,a.fl);return a.aW=a.nbb*(2*g[0]+g[1]+.05*g[2]),a}const Ua=En(bd,64/Math.PI*.2,20,"average",!1);function ci(t,e){if(!(t.J!==void 0^t.Q!==void 0))throw new Error("Conversion requires one and only one: 'J' or 'Q'");if(!(t.C!==void 0^t.M!==void 0^t.s!==void 0))throw new Error("Conversion requires one and only one: 'C', 'M' or 's'");if(!(t.h!==void 0^t.H!==void 0))throw new Error("Conversion requires one and only one: 'h' or 'H'");if(t.J===0||t.Q===0)return[0,0,0];let r=0;t.h!==void 0?r=Et(t.h)*ja:r=$d(t.H)*ja;const o=Math.cos(r),i=Math.sin(r);let a=0;t.J!==void 0?a=Mt(t.J,1/2)*.1:t.Q!==void 0&&(a=.25*e.c*t.Q/((e.aW+4)*e.flRoot));let s=0;t.C!==void 0?s=t.C/a:t.M!==void 0?s=t.M/e.flRoot/a:t.s!==void 0&&(s=4e-4*t.s**2*(e.aW+4)/e.c);const n=Mt(s*Math.pow(1.64-Math.pow(.29,e.n),-.73),10/9),l=.25*(Math.cos(r+2)+3.8),c=e.aW*Mt(a,2/e.c/e.z),d=5e4/13*e.nc*e.ncb*l,h=c/e.nbb,p=23*(h+.305)*Di(n,23*d+n*(11*o+108*i)),m=p*o,g=p*i,_=wd(R(vd,[h,m,g]).map(y=>y*1/1403),e.fl);return R(md,_.map((y,$)=>y*e.dRgbInv[$])).map(y=>y/100)}function Nn(t,e){const r=t.map(x=>x*100),o=zn(R(Sn,r).map((x,I)=>x*e.dRgb[I]),e.fl),i=o[0]+(-12*o[1]+o[2])/11,a=(o[0]+o[1]-2*o[2])/9,s=(Math.atan2(a,i)%Wo+Wo)%Wo,n=.25*(Math.cos(s+2)+3.8),l=5e4/13*e.nc*e.ncb*Di(n*Math.sqrt(i**2+a**2),o[0]+o[1]+1.05*o[2]+.305),c=Mt(l,.9)*Math.pow(1.64-Math.pow(.29,e.n),.73),d=e.nbb*(2*o[0]+o[1]+.05*o[2]),h=Mt(d/e.aW,.5*e.c*e.z),p=100*Mt(h,2),m=4/e.c*h*(e.aW+4)*e.flRoot,g=c*h,_=g*e.flRoot,y=Et(s*yd),$=xd(y),k=50*Mt(e.c*c/(e.aW+4),1/2);return{J:p,C:g,h:y,s:k,Q:m,M:_,H:$}}var kd=new w({id:"cam16-jmh",cssId:"--cam16-jmh",name:"CAM16-JMh",coords:{j:{refRange:[0,100],name:"J"},m:{refRange:[0,105],name:"Colorfulness"},h:{refRange:[0,360],type:"angle",name:"Hue"}},base:V,fromBase(t){const e=Nn(t,Ua);return[e.J,e.M,e.h]},toBase(t){return ci({J:t[0],M:t[1],h:t[2]},Ua)}});const Cd=Z.D65,Md=216/24389,In=24389/27;function Ad(t){return 116*(t>Md?Math.cbrt(t):(In*t+16)/116)-16}function di(t){return t>8?Math.pow((t+16)/116,3):t/In}function Sd(t,e){let[r,o,i]=t,a=[],s=0;if(i===0)return[0,0,0];let n=di(i);i>0?s=.00379058511492914*i**2+.608983189401032*i+.9155088574762233:s=9514440756550361e-21*i**2+.08693057439788597*i-21.928975842194614;const l=2e-12,c=15;let d=0,h=1/0;for(;d<=c;){a=ci({J:s,C:o,h:r},e);const p=Math.abs(a[1]-n);if(p<h){if(p<=l)return a;h=p}s=s-(a[1]-n)*s/(2*a[1]),d+=1}return ci({J:s,C:o,h:r},e)}function zd(t,e){const r=Ad(t[1]);if(r===0)return[0,0,0];const o=Nn(t,Ui);return[Et(o.h),o.C,r]}const Ui=En(Cd,200/Math.PI*di(50),di(50)*100,"average",!1);var yr=new w({id:"hct",name:"HCT",coords:{h:{refRange:[0,360],type:"angle",name:"Hue"},c:{refRange:[0,145],name:"Colorfulness"},t:{refRange:[0,100],name:"Tone"}},base:V,fromBase(t){return zd(t)},toBase(t){return Sd(t,Ui)},formats:{color:{id:"--hct",coords:["<number> | <angle>","<percentage> | <number>","<percentage> | <number>"]}}});const Ed=Math.PI/180,Va=[1,.007,.0228];function Ga(t){t[1]<0&&(t=yr.fromBase(yr.toBase(t)));const e=Math.log(Math.max(1+Va[2]*t[1]*Ui.flRoot,1))/Va[2],r=t[0]*Ed,o=e*Math.cos(r),i=e*Math.sin(r);return[t[2],o,i]}function Nd(t,e){[t,e]=A([t,e]);let[r,o,i]=Ga(yr.from(t)),[a,s,n]=Ga(yr.from(e));return Math.sqrt((r-a)**2+(o-s)**2+(i-n)**2)}var Fe={deltaE76:Yc,deltaECMC:Qc,deltaE2000:wn,deltaEJz:sd,deltaEITP:gd,deltaEOK:si,deltaEHCT:Nd};function Id(t){const e=t?Math.floor(Math.log10(Math.abs(t))):0;return Math.max(parseFloat(`1e${e-2}`),1e-6)}const Wa={hct:{method:"hct.c",jnd:2,deltaEMethod:"hct",blackWhiteClamp:{}},"hct-tonal":{method:"hct.c",jnd:0,deltaEMethod:"hct",blackWhiteClamp:{channel:"hct.t",min:0,max:100}}};function Zt(t,{method:e=ht.gamut_mapping,space:r=void 0,deltaEMethod:o="",jnd:i=2,blackWhiteClamp:a={}}={}){if(t=A(t),Er(arguments[1])?r=arguments[1]:r||(r=t.space),r=w.get(r),ue(t,r,{epsilon:0}))return t;let s;if(e==="css")s=Ld(t,{space:r});else{if(e!=="clip"&&!ue(t,r)){Object.prototype.hasOwnProperty.call(Wa,e)&&({method:e,jnd:i,deltaEMethod:o,blackWhiteClamp:a}=Wa[e]);let n=wn;if(o!==""){for(let c in Fe)if("deltae"+o.toLowerCase()===c.toLowerCase()){n=Fe[c];break}}let l=Zt(O(t,r),{method:"clip",space:r});if(n(t,l)>i){if(Object.keys(a).length===3){let k=w.resolveCoord(a.channel),x=lt(O(t,k.space),k.id);if(Xt(x)&&(x=0),x>=a.max)return O({space:"xyz-d65",coords:Z.D65},t.space);if(x<=a.min)return O({space:"xyz-d65",coords:[0,0,0]},t.space)}let c=w.resolveCoord(e),d=c.space,h=c.id,p=O(t,d);p.coords.forEach((k,x)=>{Xt(k)&&(p.coords[x]=0)});let g=(c.range||c.refRange)[0],_=Id(i),y=g,$=lt(p,h);for(;$-y>_;){let k=De(p);k=Zt(k,{space:r,method:"clip"}),n(p,k)-i<_?y=lt(p,h):$=lt(p,h),Ot(p,h,(y+$)/2)}s=O(p,r)}else s=l}else s=O(t,r);if(e==="clip"||!ue(s,r,{epsilon:0})){let n=Object.values(r.coords).map(l=>l.range||[]);s.coords=s.coords.map((l,c)=>{let[d,h]=n[c];return d!==void 0&&(l=Math.max(d,l)),h!==void 0&&(l=Math.min(l,h)),l})}}return r!==t.space&&(s=O(s,t.space)),t.coords=s.coords,t}Zt.returns="color";const Xa={WHITE:{space:He,coords:[1,0,0]},BLACK:{space:He,coords:[0,0,0]}};function Ld(t,{space:e}={}){t=A(t),e||(e=t.space),e=w.get(e);const i=w.get("oklch");if(e.isUnbounded)return O(t,e);const a=O(t,i);let s=a.coords[0];if(s>=1){const g=O(Xa.WHITE,e);return g.alpha=t.alpha,O(g,e)}if(s<=0){const g=O(Xa.BLACK,e);return g.alpha=t.alpha,O(g,e)}if(ue(a,e,{epsilon:0}))return O(a,e);function n(g){const _=O(g,e),y=Object.values(e.coords);return _.coords=_.coords.map(($,k)=>{if("range"in y[k]){const[x,I]=y[k].range;return vn(x,$,I)}return $}),_}let l=0,c=a.coords[1],d=!0,h=De(a),p=n(h),m=si(p,h);if(m<.02)return p;for(;c-l>1e-4;){const g=(l+c)/2;if(h.coords[1]=g,d&&ue(h,e,{epsilon:0}))l=g;else if(p=n(h),m=si(p,h),m<.02){if(.02-m<1e-4)break;d=!1,l=g}else c=g}return p}function O(t,e,{inGamut:r}={}){t=A(t),e=w.get(e);let o=e.from(t),i={space:e,coords:o,alpha:t.alpha};return r&&(i=Zt(i,r===!0?void 0:r)),i}O.returns="color";function hr(t,{precision:e=ht.precision,format:r="default",inGamut:o=!0,...i}={}){let a;t=A(t);let s=r;r=t.space.getFormat(r)??t.space.getFormat("default")??w.DEFAULT_FORMAT;let n=t.coords.slice();if(o||=r.toGamut,o&&!ue(t)&&(n=Zt(De(t),o===!0?void 0:o).coords),r.type==="custom")if(i.precision=e,r.serialize)a=r.serialize(n,t.alpha,i);else throw new TypeError(`format ${s} can only be used to parse colors, not for serialization`);else{let l=r.name||"color";r.serializeCoords?n=r.serializeCoords(n,e):e!==null&&(n=n.map(p=>co(p,{precision:e})));let c=[...n];if(l==="color"){let p=r.id||r.ids?.[0]||t.space.id;c.unshift(p)}let d=t.alpha;e!==null&&(d=co(d,{precision:e}));let h=t.alpha>=1||r.noAlpha?"":`${r.commas?",":" /"} ${d}`;a=`${l}(${c.join(r.commas?", ":" ")}${h})`}return a}const Pd=[[.6369580483012914,.14461690358620832,.1688809751641721],[.2627002120112671,.6779980715188708,.05930171646986196],[0,.028072693049087428,1.060985057710791]],Td=[[1.716651187971268,-.355670783776392,-.25336628137366],[-.666684351832489,1.616481236634939,.0157685458139111],[.017639857445311,-.042770613257809,.942103121235474]];var Eo=new it({id:"rec2020-linear",cssId:"--rec2020-linear",name:"Linear REC.2020",white:"D65",toXYZ_M:Pd,fromXYZ_M:Td});const Ur=1.09929682680944,Ka=.018053968510807;var Ln=new it({id:"rec2020",name:"REC.2020",base:Eo,toBase(t){return t.map(function(e){return e<Ka*4.5?e/4.5:Math.pow((e+Ur-1)/Ur,1/.45)})},fromBase(t){return t.map(function(e){return e>=Ka?Ur*Math.pow(e,.45)-(Ur-1):4.5*e})}});const Od=[[.4865709486482162,.26566769316909306,.1982172852343625],[.2289745640697488,.6917385218365064,.079286914093745],[0,.04511338185890264,1.043944368900976]],Rd=[[2.493496911941425,-.9313836179191239,-.40271078445071684],[-.8294889695615747,1.7626640603183463,.023624685841943577],[.03584583024378447,-.07617238926804182,.9568845240076872]];var Pn=new it({id:"p3-linear",cssId:"--display-p3-linear",name:"Linear P3",white:"D65",toXYZ_M:Od,fromXYZ_M:Rd});const Bd=[[.41239079926595934,.357584339383878,.1804807884018343],[.21263900587151027,.715168678767756,.07219231536073371],[.01933081871559182,.11919477979462598,.9505321522496607]],q=[[3.2409699419045226,-1.537383177570094,-.4986107602930034],[-.9692436362808796,1.8759675015077202,.04155505740717559],[.05563007969699366,-.20397695888897652,1.0569715142428786]];var Tn=new it({id:"srgb-linear",name:"Linear sRGB",white:"D65",toXYZ_M:Bd,fromXYZ_M:q}),Za={aliceblue:[240/255,248/255,1],antiquewhite:[250/255,235/255,215/255],aqua:[0,1,1],aquamarine:[127/255,1,212/255],azure:[240/255,1,1],beige:[245/255,245/255,220/255],bisque:[1,228/255,196/255],black:[0,0,0],blanchedalmond:[1,235/255,205/255],blue:[0,0,1],blueviolet:[138/255,43/255,226/255],brown:[165/255,42/255,42/255],burlywood:[222/255,184/255,135/255],cadetblue:[95/255,158/255,160/255],chartreuse:[127/255,1,0],chocolate:[210/255,105/255,30/255],coral:[1,127/255,80/255],cornflowerblue:[100/255,149/255,237/255],cornsilk:[1,248/255,220/255],crimson:[220/255,20/255,60/255],cyan:[0,1,1],darkblue:[0,0,139/255],darkcyan:[0,139/255,139/255],darkgoldenrod:[184/255,134/255,11/255],darkgray:[169/255,169/255,169/255],darkgreen:[0,100/255,0],darkgrey:[169/255,169/255,169/255],darkkhaki:[189/255,183/255,107/255],darkmagenta:[139/255,0,139/255],darkolivegreen:[85/255,107/255,47/255],darkorange:[1,140/255,0],darkorchid:[153/255,50/255,204/255],darkred:[139/255,0,0],darksalmon:[233/255,150/255,122/255],darkseagreen:[143/255,188/255,143/255],darkslateblue:[72/255,61/255,139/255],darkslategray:[47/255,79/255,79/255],darkslategrey:[47/255,79/255,79/255],darkturquoise:[0,206/255,209/255],darkviolet:[148/255,0,211/255],deeppink:[1,20/255,147/255],deepskyblue:[0,191/255,1],dimgray:[105/255,105/255,105/255],dimgrey:[105/255,105/255,105/255],dodgerblue:[30/255,144/255,1],firebrick:[178/255,34/255,34/255],floralwhite:[1,250/255,240/255],forestgreen:[34/255,139/255,34/255],fuchsia:[1,0,1],gainsboro:[220/255,220/255,220/255],ghostwhite:[248/255,248/255,1],gold:[1,215/255,0],goldenrod:[218/255,165/255,32/255],gray:[128/255,128/255,128/255],green:[0,128/255,0],greenyellow:[173/255,1,47/255],grey:[128/255,128/255,128/255],honeydew:[240/255,1,240/255],hotpink:[1,105/255,180/255],indianred:[205/255,92/255,92/255],indigo:[75/255,0,130/255],ivory:[1,1,240/255],khaki:[240/255,230/255,140/255],lavender:[230/255,230/255,250/255],lavenderblush:[1,240/255,245/255],lawngreen:[124/255,252/255,0],lemonchiffon:[1,250/255,205/255],lightblue:[173/255,216/255,230/255],lightcoral:[240/255,128/255,128/255],lightcyan:[224/255,1,1],lightgoldenrodyellow:[250/255,250/255,210/255],lightgray:[211/255,211/255,211/255],lightgreen:[144/255,238/255,144/255],lightgrey:[211/255,211/255,211/255],lightpink:[1,182/255,193/255],lightsalmon:[1,160/255,122/255],lightseagreen:[32/255,178/255,170/255],lightskyblue:[135/255,206/255,250/255],lightslategray:[119/255,136/255,153/255],lightslategrey:[119/255,136/255,153/255],lightsteelblue:[176/255,196/255,222/255],lightyellow:[1,1,224/255],lime:[0,1,0],limegreen:[50/255,205/255,50/255],linen:[250/255,240/255,230/255],magenta:[1,0,1],maroon:[128/255,0,0],mediumaquamarine:[102/255,205/255,170/255],mediumblue:[0,0,205/255],mediumorchid:[186/255,85/255,211/255],mediumpurple:[147/255,112/255,219/255],mediumseagreen:[60/255,179/255,113/255],mediumslateblue:[123/255,104/255,238/255],mediumspringgreen:[0,250/255,154/255],mediumturquoise:[72/255,209/255,204/255],mediumvioletred:[199/255,21/255,133/255],midnightblue:[25/255,25/255,112/255],mintcream:[245/255,1,250/255],mistyrose:[1,228/255,225/255],moccasin:[1,228/255,181/255],navajowhite:[1,222/255,173/255],navy:[0,0,128/255],oldlace:[253/255,245/255,230/255],olive:[128/255,128/255,0],olivedrab:[107/255,142/255,35/255],orange:[1,165/255,0],orangered:[1,69/255,0],orchid:[218/255,112/255,214/255],palegoldenrod:[238/255,232/255,170/255],palegreen:[152/255,251/255,152/255],paleturquoise:[175/255,238/255,238/255],palevioletred:[219/255,112/255,147/255],papayawhip:[1,239/255,213/255],peachpuff:[1,218/255,185/255],peru:[205/255,133/255,63/255],pink:[1,192/255,203/255],plum:[221/255,160/255,221/255],powderblue:[176/255,224/255,230/255],purple:[128/255,0,128/255],rebeccapurple:[102/255,51/255,153/255],red:[1,0,0],rosybrown:[188/255,143/255,143/255],royalblue:[65/255,105/255,225/255],saddlebrown:[139/255,69/255,19/255],salmon:[250/255,128/255,114/255],sandybrown:[244/255,164/255,96/255],seagreen:[46/255,139/255,87/255],seashell:[1,245/255,238/255],sienna:[160/255,82/255,45/255],silver:[192/255,192/255,192/255],skyblue:[135/255,206/255,235/255],slateblue:[106/255,90/255,205/255],slategray:[112/255,128/255,144/255],slategrey:[112/255,128/255,144/255],snow:[1,250/255,250/255],springgreen:[0,1,127/255],steelblue:[70/255,130/255,180/255],tan:[210/255,180/255,140/255],teal:[0,128/255,128/255],thistle:[216/255,191/255,216/255],tomato:[1,99/255,71/255],turquoise:[64/255,224/255,208/255],violet:[238/255,130/255,238/255],wheat:[245/255,222/255,179/255],white:[1,1,1],whitesmoke:[245/255,245/255,245/255],yellow:[1,1,0],yellowgreen:[154/255,205/255,50/255]};let Ya=Array(3).fill("<percentage> | <number>[0, 255]"),Ja=Array(3).fill("<number>[0, 255]");var qe=new it({id:"srgb",name:"sRGB",base:Tn,fromBase:t=>t.map(e=>{let r=e<0?-1:1,o=e*r;return o>.0031308?r*(1.055*o**(1/2.4)-.055):12.92*e}),toBase:t=>t.map(e=>{let r=e<0?-1:1,o=e*r;return o<=.04045?e/12.92:r*((o+.055)/1.055)**2.4}),formats:{rgb:{coords:Ya},rgb_number:{name:"rgb",commas:!0,coords:Ja,noAlpha:!0},color:{},rgba:{coords:Ya,commas:!0,lastAlpha:!0},rgba_number:{name:"rgba",commas:!0,coords:Ja},hex:{type:"custom",toGamut:!0,test:t=>/^#([a-f0-9]{3,4}){1,2}$/i.test(t),parse(t){t.length<=5&&(t=t.replace(/[a-f0-9]/gi,"$&$&"));let e=[];return t.replace(/[a-f0-9]{2}/gi,r=>{e.push(parseInt(r,16)/255)}),{spaceId:"srgb",coords:e.slice(0,3),alpha:e.slice(3)[0]}},serialize:(t,e,{collapse:r=!0}={})=>{e<1&&t.push(e),t=t.map(a=>Math.round(a*255));let o=r&&t.every(a=>a%17===0);return"#"+t.map(a=>o?(a/17).toString(16):a.toString(16).padStart(2,"0")).join("")}},keyword:{type:"custom",test:t=>/^[a-z]+$/i.test(t),parse(t){t=t.toLowerCase();let e={spaceId:"srgb",coords:null,alpha:1};if(t==="transparent"?(e.coords=Za.black,e.alpha=0):e.coords=Za[t],e.coords)return e}}}}),On=new it({id:"p3",cssId:"display-p3",name:"P3",base:Pn,fromBase:qe.fromBase,toBase:qe.toBase});ht.display_space=qe;let Hd;if(typeof CSS<"u"&&CSS.supports)for(let t of[ct,Ln,On]){let e=t.getMinCoords(),o=hr({space:t,coords:e,alpha:1});if(CSS.supports("color",o)){ht.display_space=t;break}}function Dd(t,{space:e=ht.display_space,...r}={}){let o=hr(t,r);if(typeof CSS>"u"||CSS.supports("color",o)||!ht.display_space)o=new String(o),o.color=t;else{let i=t;if((t.coords.some(Xt)||Xt(t.alpha))&&!(Hd??=CSS.supports("color","hsl(none 50% 50%)"))&&(i=De(t),i.coords=i.coords.map(D),i.alpha=D(i.alpha),o=hr(i,r),CSS.supports("color",o)))return o=new String(o),o.color=i,o;i=O(i,e),o=new String(hr(i,r)),o.color=i}return o}function Fd(t,e){return t=A(t),e=A(e),t.space===e.space&&t.alpha===e.alpha&&t.coords.every((r,o)=>r===e.coords[o])}function Yt(t){return lt(t,[V,"y"])}function Rn(t,e){Ot(t,[V,"y"],e)}function qd(t){Object.defineProperty(t.prototype,"luminance",{get(){return Yt(this)},set(e){Rn(this,e)}})}var jd=Object.freeze({__proto__:null,getLuminance:Yt,register:qd,setLuminance:Rn});function Ud(t,e){t=A(t),e=A(e);let r=Math.max(Yt(t),0),o=Math.max(Yt(e),0);return o>r&&([r,o]=[o,r]),(r+.05)/(o+.05)}const Vd=.56,Gd=.57,Wd=.62,Xd=.65,Qa=.022,Kd=1.414,Zd=.1,Yd=5e-4,Jd=1.14,ts=.027,Qd=1.14;function es(t){return t>=Qa?t:t+(Qa-t)**Kd}function Me(t){let e=t<0?-1:1,r=Math.abs(t);return e*Math.pow(r,2.4)}function th(t,e){e=A(e),t=A(t);let r,o,i,a,s,n;e=O(e,"srgb"),[a,s,n]=e.coords;let l=Me(a)*.2126729+Me(s)*.7151522+Me(n)*.072175;t=O(t,"srgb"),[a,s,n]=t.coords;let c=Me(a)*.2126729+Me(s)*.7151522+Me(n)*.072175,d=es(l),h=es(c),p=h>d;return Math.abs(h-d)<Yd?o=0:p?(r=h**Vd-d**Gd,o=r*Jd):(r=h**Xd-d**Wd,o=r*Qd),Math.abs(o)<Zd?i=0:o>0?i=o-ts:i=o+ts,i*100}function eh(t,e){t=A(t),e=A(e);let r=Math.max(Yt(t),0),o=Math.max(Yt(e),0);o>r&&([r,o]=[o,r]);let i=r+o;return i===0?0:(r-o)/i}const rh=5e4;function oh(t,e){t=A(t),e=A(e);let r=Math.max(Yt(t),0),o=Math.max(Yt(e),0);return o>r&&([r,o]=[o,r]),o===0?rh:(r-o)/o}function ih(t,e){t=A(t),e=A(e);let r=lt(t,[ct,"l"]),o=lt(e,[ct,"l"]);return Math.abs(r-o)}const ah=216/24389,rs=24/116,Vr=24389/27;let Xo=Z.D65;var hi=new w({id:"lab-d65",name:"Lab D65",coords:{l:{refRange:[0,100],name:"Lightness"},a:{refRange:[-125,125]},b:{refRange:[-125,125]}},white:Xo,base:V,fromBase(t){let r=t.map((o,i)=>o/Xo[i]).map(o=>o>ah?Math.cbrt(o):(Vr*o+16)/116);return[116*r[1]-16,500*(r[0]-r[1]),200*(r[1]-r[2])]},toBase(t){let e=[];return e[1]=(t[0]+16)/116,e[0]=t[1]/500+e[1],e[2]=e[1]-t[2]/200,[e[0]>rs?Math.pow(e[0],3):(116*e[0]-16)/Vr,t[0]>8?Math.pow((t[0]+16)/116,3):t[0]/Vr,e[2]>rs?Math.pow(e[2],3):(116*e[2]-16)/Vr].map((o,i)=>o*Xo[i])},formats:{"lab-d65":{coords:["<number> | <percentage>","<number> | <percentage>[-1,1]","<number> | <percentage>[-1,1]"]}}});const Ko=Math.pow(5,.5)*.5+.5;function sh(t,e){t=A(t),e=A(e);let r=lt(t,[hi,"l"]),o=lt(e,[hi,"l"]),i=Math.abs(Math.pow(r,Ko)-Math.pow(o,Ko)),a=Math.pow(i,1/Ko)*Math.SQRT2-40;return a<7.5?0:a}var to=Object.freeze({__proto__:null,contrastAPCA:th,contrastDeltaPhi:sh,contrastLstar:ih,contrastMichelson:eh,contrastWCAG21:Ud,contrastWeber:oh});function nh(t,e,r={}){Er(r)&&(r={algorithm:r});let{algorithm:o,...i}=r;if(!o){let a=Object.keys(to).map(s=>s.replace(/^contrast/,"")).join(", ");throw new TypeError(`contrast() function needs a contrast algorithm. Please specify one of: ${a}`)}t=A(t),e=A(e);for(let a in to)if("contrast"+o.toLowerCase()===a.toLowerCase())return to[a](t,e,i);throw new TypeError(`Unknown contrast algorithm: ${o}`)}function No(t){let[e,r,o]=Nr(t,V),i=e+15*r+3*o;return[4*e/i,9*r/i]}function Bn(t){let[e,r,o]=Nr(t,V),i=e+r+o;return[e/i,r/i]}function lh(t){Object.defineProperty(t.prototype,"uv",{get(){return No(this)}}),Object.defineProperty(t.prototype,"xy",{get(){return Bn(this)}})}var ch=Object.freeze({__proto__:null,register:lh,uv:No,xy:Bn});function ar(t,e,r={}){Er(r)&&(r={method:r});let{method:o=ht.deltaE,...i}=r;for(let a in Fe)if("deltae"+o.toLowerCase()===a.toLowerCase())return Fe[a](t,e,i);throw new TypeError(`Unknown deltaE method: ${o}`)}function dh(t,e=.25){let o=[w.get("oklch","lch"),"l"];return Ot(t,o,i=>i*(1+e))}function hh(t,e=.25){let o=[w.get("oklch","lch"),"l"];return Ot(t,o,i=>i*(1-e))}var uh=Object.freeze({__proto__:null,darken:hh,lighten:dh});function Hn(t,e,r=.5,o={}){return[t,e]=[A(t),A(e)],Gt(r)==="object"&&([r,o]=[.5,r]),Ir(t,e,o)(r)}function Dn(t,e,r={}){let o;Vi(t)&&([o,r]=[t,e],[t,e]=o.rangeArgs.colors);let{maxDeltaE:i,deltaEMethod:a,steps:s=2,maxSteps:n=1e3,...l}=r;o||([t,e]=[A(t),A(e)],o=Ir(t,e,l));let c=ar(t,e),d=i>0?Math.max(s,Math.ceil(c/i)+1):s,h=[];if(n!==void 0&&(d=Math.min(d,n)),d===1)h=[{p:.5,color:o(.5)}];else{let p=1/(d-1);h=Array.from({length:d},(m,g)=>{let _=g*p;return{p:_,color:o(_)}})}if(i>0){let p=h.reduce((m,g,_)=>{if(_===0)return 0;let y=ar(g.color,h[_-1].color,a);return Math.max(m,y)},0);for(;p>i;){p=0;for(let m=1;m<h.length&&h.length<n;m++){let g=h[m-1],_=h[m],y=(_.p+g.p)/2,$=o(y);p=Math.max(p,ar($,g.color),ar($,_.color)),h.splice(m,0,{p:y,color:o(y)}),m++}}}return h=h.map(p=>p.color),h}function Ir(t,e,r={}){if(Vi(t)){let[l,c]=[t,e];return Ir(...l.rangeArgs.colors,{...l.rangeArgs.options,...c})}let{space:o,outputSpace:i,progression:a,premultiplied:s}=r;t=A(t),e=A(e),t=De(t),e=De(e);let n={colors:[t,e],options:r};if(o?o=w.get(o):o=w.registry[ht.interpolationSpace]||t.space,i=i?w.get(i):o,t=O(t,o),e=O(e,o),t=Zt(t),e=Zt(e),o.coords.h&&o.coords.h.type==="angle"){let l=r.hue=r.hue||"shorter",c=[o,"h"],[d,h]=[lt(t,c),lt(e,c)];isNaN(d)&&!isNaN(h)?d=h:isNaN(h)&&!isNaN(d)&&(h=d),[d,h]=Vc(l,[d,h]),Ot(t,c,d),Ot(e,c,h)}return s&&(t.coords=t.coords.map(l=>l*t.alpha),e.coords=e.coords.map(l=>l*e.alpha)),Object.assign(l=>{l=a?a(l):l;let c=t.coords.map((p,m)=>{let g=e.coords[m];return vr(p,g,l)}),d=vr(t.alpha,e.alpha,l),h={space:o,coords:c,alpha:d};return s&&(h.coords=h.coords.map(p=>p/d)),i!==o&&(h=O(h,i)),h},{rangeArgs:n})}function Vi(t){return Gt(t)==="function"&&!!t.rangeArgs}ht.interpolationSpace="lab";function ph(t){t.defineFunction("mix",Hn,{returns:"color"}),t.defineFunction("range",Ir,{returns:"function<color>"}),t.defineFunction("steps",Dn,{returns:"array<color>"})}var fh=Object.freeze({__proto__:null,isRange:Vi,mix:Hn,range:Ir,register:ph,steps:Dn}),Fn=new w({id:"hsl",name:"HSL",coords:{h:{refRange:[0,360],type:"angle",name:"Hue"},s:{range:[0,100],name:"Saturation"},l:{range:[0,100],name:"Lightness"}},base:qe,fromBase:t=>{let e=Math.max(...t),r=Math.min(...t),[o,i,a]=t,[s,n,l]=[NaN,0,(r+e)/2],c=e-r;if(c!==0){switch(n=l===0||l===1?0:(e-l)/Math.min(l,1-l),e){case o:s=(i-a)/c+(i<a?6:0);break;case i:s=(a-o)/c+2;break;case a:s=(o-i)/c+4}s=s*60}return n<0&&(s+=180,n=Math.abs(n)),s>=360&&(s-=360),[s,n*100,l*100]},toBase:t=>{let[e,r,o]=t;e=e%360,e<0&&(e+=360),r/=100,o/=100;function i(a){let s=(a+e/30)%12,n=r*Math.min(o,1-o);return o-n*Math.max(-1,Math.min(s-3,9-s,1))}return[i(0),i(8),i(4)]},formats:{hsl:{coords:["<number> | <angle>","<percentage>","<percentage>"]},hsla:{coords:["<number> | <angle>","<percentage>","<percentage>"],commas:!0,lastAlpha:!0}}}),qn=new w({id:"hsv",name:"HSV",coords:{h:{refRange:[0,360],type:"angle",name:"Hue"},s:{range:[0,100],name:"Saturation"},v:{range:[0,100],name:"Value"}},base:Fn,fromBase(t){let[e,r,o]=t;r/=100,o/=100;let i=o+r*Math.min(o,1-o);return[e,i===0?0:200*(1-o/i),100*i]},toBase(t){let[e,r,o]=t;r/=100,o/=100;let i=o*(1-r/2);return[e,i===0||i===1?0:(o-i)/Math.min(i,1-i)*100,i*100]},formats:{color:{id:"--hsv",coords:["<number> | <angle>","<percentage> | <number>","<percentage> | <number>"]}}}),gh=new w({id:"hwb",name:"HWB",coords:{h:{refRange:[0,360],type:"angle",name:"Hue"},w:{range:[0,100],name:"Whiteness"},b:{range:[0,100],name:"Blackness"}},base:qn,fromBase(t){let[e,r,o]=t;return[e,o*(100-r)/100,100-o]},toBase(t){let[e,r,o]=t;r/=100,o/=100;let i=r+o;if(i>=1){let n=r/i;return[e,0,n*100]}let a=1-o,s=a===0?0:1-r/a;return[e,s*100,a*100]},formats:{hwb:{coords:["<number> | <angle>","<percentage> | <number>","<percentage> | <number>"]}}});const bh=[[.5766690429101305,.1855582379065463,.1882286462349947],[.29734497525053605,.6273635662554661,.07529145849399788],[.02703136138641234,.07068885253582723,.9913375368376388]],mh=[[2.0415879038107465,-.5650069742788596,-.34473135077832956],[-.9692436362808795,1.8759675015077202,.04155505740717557],[.013444280632031142,-.11836239223101838,1.0151749943912054]];var jn=new it({id:"a98rgb-linear",cssId:"--a98-rgb-linear",name:"Linear Adobe® 98 RGB compatible",white:"D65",toXYZ_M:bh,fromXYZ_M:mh}),vh=new it({id:"a98rgb",cssId:"a98-rgb",name:"Adobe® 98 RGB compatible",base:jn,toBase:t=>t.map(e=>Math.pow(Math.abs(e),563/256)*Math.sign(e)),fromBase:t=>t.map(e=>Math.pow(Math.abs(e),256/563)*Math.sign(e))});const _h=[[.7977666449006423,.13518129740053308,.0313477341283922],[.2880748288194013,.711835234241873,8993693872564e-17],[0,0,.8251046025104602]],yh=[[1.3457868816471583,-.25557208737979464,-.05110186497554526],[-.5446307051249019,1.5082477428451468,.02052744743642139],[0,0,1.2119675456389452]];var Un=new it({id:"prophoto-linear",cssId:"--prophoto-rgb-linear",name:"Linear ProPhoto",white:"D50",base:qi,toXYZ_M:_h,fromXYZ_M:yh});const wh=1/512,xh=16/512;var $h=new it({id:"prophoto",cssId:"prophoto-rgb",name:"ProPhoto",base:Un,toBase(t){return t.map(e=>e<xh?e/16:e**1.8)},fromBase(t){return t.map(e=>e>=wh?e**(1/1.8):16*e)}}),kh=new w({id:"oklch",name:"Oklch",coords:{l:{refRange:[0,1],name:"Lightness"},c:{refRange:[0,.4],name:"Chroma"},h:{refRange:[0,360],type:"angle",name:"Hue"}},white:"D65",base:He,fromBase(t){let[e,r,o]=t,i;const a=2e-4;return Math.abs(r)<a&&Math.abs(o)<a?i=NaN:i=Math.atan2(o,r)*180/Math.PI,[e,Math.sqrt(r**2+o**2),Et(i)]},toBase(t){let[e,r,o]=t,i,a;return isNaN(o)?(i=0,a=0):(i=r*Math.cos(o*Math.PI/180),a=r*Math.sin(o*Math.PI/180)),[e,i,a]},formats:{oklch:{coords:["<percentage> | <number>","<number> | <percentage>[0,1]","<number> | <angle>"]}}});let Vn=Z.D65;const Ch=216/24389,os=24389/27,[is,as]=No({space:V,coords:Vn});var Gn=new w({id:"luv",name:"Luv",coords:{l:{refRange:[0,100],name:"Lightness"},u:{refRange:[-215,215]},v:{refRange:[-215,215]}},white:Vn,base:V,fromBase(t){let e=[D(t[0]),D(t[1]),D(t[2])],r=e[1],[o,i]=No({space:V,coords:e});if(!Number.isFinite(o)||!Number.isFinite(i))return[0,0,0];let a=r<=Ch?os*r:116*Math.cbrt(r)-16;return[a,13*a*(o-is),13*a*(i-as)]},toBase(t){let[e,r,o]=t;if(e===0||Xt(e))return[0,0,0];r=D(r),o=D(o);let i=r/(13*e)+is,a=o/(13*e)+as,s=e<=8?e/os:Math.pow((e+16)/116,3);return[s*(9*i/(4*a)),s,s*((12-3*i-20*a)/(4*a))]},formats:{color:{id:"--luv",coords:["<number> | <percentage>","<number> | <percentage>[-1,1]","<number> | <percentage>[-1,1]"]}}}),Gi=new w({id:"lchuv",name:"LChuv",coords:{l:{refRange:[0,100],name:"Lightness"},c:{refRange:[0,220],name:"Chroma"},h:{refRange:[0,360],type:"angle",name:"Hue"}},base:Gn,fromBase(t){let[e,r,o]=t,i;const a=.02;return Math.abs(r)<a&&Math.abs(o)<a?i=NaN:i=Math.atan2(o,r)*180/Math.PI,[e,Math.sqrt(r**2+o**2),Et(i)]},toBase(t){let[e,r,o]=t;return r<0&&(r=0),isNaN(o)&&(o=0),[e,r*Math.cos(o*Math.PI/180),r*Math.sin(o*Math.PI/180)]},formats:{color:{id:"--lchuv",coords:["<number> | <percentage>","<number> | <percentage>","<number> | <angle>"]}}});const Mh=216/24389,Ah=24389/27,ss=q[0][0],ns=q[0][1],Zo=q[0][2],ls=q[1][0],cs=q[1][1],Yo=q[1][2],ds=q[2][0],hs=q[2][1],Jo=q[2][2];function Ae(t,e,r){const o=e/(Math.sin(r)-t*Math.cos(r));return o<0?1/0:o}function po(t){const e=Math.pow(t+16,3)/1560896,r=e>Mh?e:t/Ah,o=r*(284517*ss-94839*Zo),i=r*(838422*Zo+769860*ns+731718*ss),a=r*(632260*Zo-126452*ns),s=r*(284517*ls-94839*Yo),n=r*(838422*Yo+769860*cs+731718*ls),l=r*(632260*Yo-126452*cs),c=r*(284517*ds-94839*Jo),d=r*(838422*Jo+769860*hs+731718*ds),h=r*(632260*Jo-126452*hs);return{r0s:o/a,r0i:i*t/a,r1s:o/(a+126452),r1i:(i-769860)*t/(a+126452),g0s:s/l,g0i:n*t/l,g1s:s/(l+126452),g1i:(n-769860)*t/(l+126452),b0s:c/h,b0i:d*t/h,b1s:c/(h+126452),b1i:(d-769860)*t/(h+126452)}}function us(t,e){const r=e/360*Math.PI*2,o=Ae(t.r0s,t.r0i,r),i=Ae(t.r1s,t.r1i,r),a=Ae(t.g0s,t.g0i,r),s=Ae(t.g1s,t.g1i,r),n=Ae(t.b0s,t.b0i,r),l=Ae(t.b1s,t.b1i,r);return Math.min(o,i,a,s,n,l)}var Sh=new w({id:"hsluv",name:"HSLuv",coords:{h:{refRange:[0,360],type:"angle",name:"Hue"},s:{range:[0,100],name:"Saturation"},l:{range:[0,100],name:"Lightness"}},base:Gi,gamutSpace:qe,fromBase(t){let[e,r,o]=[D(t[0]),D(t[1]),D(t[2])],i;if(e>99.9999999)i=0,e=100;else if(e<1e-8)i=0,e=0;else{let a=po(e),s=us(a,o);i=r/s*100}return[o,i,e]},toBase(t){let[e,r,o]=[D(t[0]),D(t[1]),D(t[2])],i;if(o>99.9999999)o=100,i=0;else if(o<1e-8)o=0,i=0;else{let a=po(o);i=us(a,e)/100*r}return[o,i,e]},formats:{color:{id:"--hsluv",coords:["<number> | <angle>","<percentage> | <number>","<percentage> | <number>"]}}});q[0][0];q[0][1];q[0][2];q[1][0];q[1][1];q[1][2];q[2][0];q[2][1];q[2][2];function Se(t,e){return Math.abs(e)/Math.sqrt(Math.pow(t,2)+1)}function ps(t){let e=Se(t.r0s,t.r0i),r=Se(t.r1s,t.r1i),o=Se(t.g0s,t.g0i),i=Se(t.g1s,t.g1i),a=Se(t.b0s,t.b0i),s=Se(t.b1s,t.b1i);return Math.min(e,r,o,i,a,s)}var zh=new w({id:"hpluv",name:"HPLuv",coords:{h:{refRange:[0,360],type:"angle",name:"Hue"},s:{range:[0,100],name:"Saturation"},l:{range:[0,100],name:"Lightness"}},base:Gi,gamutSpace:"self",fromBase(t){let[e,r,o]=[D(t[0]),D(t[1]),D(t[2])],i;if(e>99.9999999)i=0,e=100;else if(e<1e-8)i=0,e=0;else{let a=po(e),s=ps(a);i=r/s*100}return[o,i,e]},toBase(t){let[e,r,o]=[D(t[0]),D(t[1]),D(t[2])],i;if(o>99.9999999)o=100,i=0;else if(o<1e-8)o=0,i=0;else{let a=po(o);i=ps(a)/100*r}return[o,i,e]},formats:{color:{id:"--hpluv",coords:["<number> | <angle>","<percentage> | <number>","<percentage> | <number>"]}}});const fs=203,gs=2610/2**14,Eh=2**14/2610,Nh=2523/2**5,bs=2**5/2523,ms=3424/2**12,vs=2413/2**7,_s=2392/2**7;var Ih=new it({id:"rec2100pq",cssId:"rec2100-pq",name:"REC.2100-PQ",base:Eo,toBase(t){return t.map(function(e){return(Math.max(e**bs-ms,0)/(vs-_s*e**bs))**Eh*1e4/fs})},fromBase(t){return t.map(function(e){let r=Math.max(e*fs/1e4,0),o=ms+vs*r**gs,i=1+_s*r**gs;return(o/i)**Nh})}});const ys=.17883277,ws=.28466892,xs=.55991073,Qo=3.7743;var Lh=new it({id:"rec2100hlg",cssId:"rec2100-hlg",name:"REC.2100-HLG",referred:"scene",base:Eo,toBase(t){return t.map(function(e){return e<=.5?e**2/3*Qo:(Math.exp((e-xs)/ys)+ws)/12*Qo})},fromBase(t){return t.map(function(e){return e/=Qo,e<=1/12?Math.sqrt(3*e):ys*Math.log(12*e-ws)+xs})}});const Wn={};Kt.add("chromatic-adaptation-start",t=>{t.options.method&&(t.M=Xn(t.W1,t.W2,t.options.method))});Kt.add("chromatic-adaptation-end",t=>{t.M||(t.M=Xn(t.W1,t.W2,t.options.method))});function Io({id:t,toCone_M:e,fromCone_M:r}){Wn[t]=arguments[0]}function Xn(t,e,r="Bradford"){let o=Wn[r],[i,a,s]=R(o.toCone_M,t),[n,l,c]=R(o.toCone_M,e),d=[[n/i,0,0],[0,l/a,0],[0,0,c/s]],h=R(d,o.toCone_M);return R(o.fromCone_M,h)}Io({id:"von Kries",toCone_M:[[.40024,.7076,-.08081],[-.2263,1.16532,.0457],[0,0,.91822]],fromCone_M:[[1.8599363874558397,-1.1293816185800916,.21989740959619328],[.3611914362417676,.6388124632850422,-6370596838649899e-21],[0,0,1.0890636230968613]]});Io({id:"Bradford",toCone_M:[[.8951,.2664,-.1614],[-.7502,1.7135,.0367],[.0389,-.0685,1.0296]],fromCone_M:[[.9869929054667121,-.14705425642099013,.15996265166373122],[.4323052697233945,.5183602715367774,.049291228212855594],[-.00852866457517732,.04004282165408486,.96848669578755]]});Io({id:"CAT02",toCone_M:[[.7328,.4296,-.1624],[-.7036,1.6975,.0061],[.003,.0136,.9834]],fromCone_M:[[1.0961238208355142,-.27886900021828726,.18274517938277307],[.4543690419753592,.4735331543074117,.07209780371722911],[-.009627608738429355,-.00569803121611342,1.0153256399545427]]});Io({id:"CAT16",toCone_M:[[.401288,.650173,-.051461],[-.250268,1.204414,.045854],[-.002079,.048952,.953127]],fromCone_M:[[1.862067855087233,-1.0112546305316845,.14918677544445172],[.3875265432361372,.6214474419314753,-.008973985167612521],[-.01584149884933386,-.03412293802851557,1.0499644368778496]]});Object.assign(Z,{A:[1.0985,1,.35585],C:[.98074,1,1.18232],D55:[.95682,1,.92149],D75:[.94972,1,1.22638],E:[1,1,1],F2:[.99186,1,.67393],F7:[.95041,1,1.08747],F11:[1.00962,1,.6435]});Z.ACES=[.32168/.33767,1,(1-.32168-.33767)/.33767];const Ph=[[.6624541811085053,.13400420645643313,.1561876870049078],[.27222871678091454,.6740817658111484,.05368951740793705],[-.005574649490394108,.004060733528982826,1.0103391003129971]],Th=[[1.6410233796943257,-.32480329418479,-.23642469523761225],[-.6636628587229829,1.6153315916573379,.016756347685530137],[.011721894328375376,-.008284441996237409,.9883948585390215]];var Kn=new it({id:"acescg",cssId:"--acescg",name:"ACEScg",coords:{r:{range:[0,65504],name:"Red"},g:{range:[0,65504],name:"Green"},b:{range:[0,65504],name:"Blue"}},referred:"scene",white:Z.ACES,toXYZ_M:Ph,fromXYZ_M:Th});const Gr=2**-16,ti=-.35828683,Wr=(Math.log2(65504)+9.72)/17.52;var Oh=new it({id:"acescc",cssId:"--acescc",name:"ACEScc",coords:{r:{range:[ti,Wr],name:"Red"},g:{range:[ti,Wr],name:"Green"},b:{range:[ti,Wr],name:"Blue"}},referred:"scene",base:Kn,toBase(t){const e=-.3013698630136986;return t.map(function(r){return r<=e?(2**(r*17.52-9.72)-Gr)*2:r<Wr?2**(r*17.52-9.72):65504})},fromBase(t){return t.map(function(e){return e<=0?(Math.log2(Gr)+9.72)/17.52:e<Gr?(Math.log2(Gr+e*.5)+9.72)/17.52:(Math.log2(e)+9.72)/17.52})}}),$s=Object.freeze({__proto__:null,A98RGB:vh,A98RGB_Linear:jn,ACEScc:Oh,ACEScg:Kn,CAM16_JMh:kd,HCT:yr,HPLuv:zh,HSL:Fn,HSLuv:Sh,HSV:qn,HWB:gh,ICTCP:li,JzCzHz:ni,Jzazbz:$n,LCH:_r,LCHuv:Gi,Lab:ct,Lab_D65:hi,Luv:Gn,OKLCH:kh,OKLab:He,P3:On,P3_Linear:Pn,ProPhoto:$h,ProPhoto_Linear:Un,REC_2020:Ln,REC_2020_Linear:Eo,REC_2100_HLG:Lh,REC_2100_PQ:Ih,XYZ_ABS_D65:ji,XYZ_D50:qi,XYZ_D65:V,sRGB:qe,sRGB_Linear:Tn});let z=class et{constructor(...e){let r;e.length===1&&(r=A(e[0]));let o,i,a;r?(o=r.space||r.spaceId,i=r.coords,a=r.alpha):[o,i,a]=e,Object.defineProperty(this,"space",{value:w.get(o),writable:!1,enumerable:!0,configurable:!0}),this.coords=i?i.slice():[0,0,0],this.alpha=a>1||a===void 0?1:a<0?0:a;for(let s=0;s<this.coords.length;s++)this.coords[s]==="NaN"&&(this.coords[s]=NaN);for(let s in this.space.coords)Object.defineProperty(this,s,{get:()=>this.get(s),set:n=>this.set(s,n)})}get spaceId(){return this.space.id}clone(){return new et(this.space,this.coords,this.alpha)}toJSON(){return{spaceId:this.spaceId,coords:this.coords,alpha:this.alpha}}display(...e){let r=Dd(this,...e);return r.color=new et(r.color),r}static get(e,...r){return e instanceof et?e:new et(e,...r)}static defineFunction(e,r,o=r){let{instance:i=!0,returns:a}=o,s=function(...n){let l=r(...n);if(a==="color")l=et.get(l);else if(a==="function<color>"){let c=l;l=function(...d){let h=c(...d);return et.get(h)},Object.assign(l,c)}else a==="array<color>"&&(l=l.map(c=>et.get(c)));return l};e in et||(et[e]=s),i&&(et.prototype[e]=function(...n){return s(this,...n)})}static defineFunctions(e){for(let r in e)et.defineFunction(r,e[r],e[r])}static extend(e){if(e.register)e.register(et);else for(let r in e)et.defineFunction(r,e[r])}};z.defineFunctions({get:lt,getAll:Nr,set:Ot,setAll:Fi,to:O,equals:Fd,inGamut:ue,toGamut:Zt,distance:xn,toString:hr});Object.assign(z,{util:Hc,hooks:Kt,WHITES:Z,Space:w,spaces:w.registry,parse:yn,defaults:ht});for(let t of Object.keys($s))w.register($s[t]);for(let t in w.registry)ui(t,w.registry[t]);Kt.add("colorspace-init-end",t=>{ui(t.id,t),t.aliases?.forEach(e=>{ui(e,t)})});function ui(t,e){let r=t.replace(/-/g,"_");Object.defineProperty(z.prototype,r,{get(){let o=this.getAll(t);return typeof Proxy>"u"?o:new Proxy(o,{has:(i,a)=>{try{return w.resolveCoord([e,a]),!0}catch{}return Reflect.has(i,a)},get:(i,a,s)=>{if(a&&typeof a!="symbol"&&!(a in i)){let{index:n}=w.resolveCoord([e,a]);if(n>=0)return i[n]}return Reflect.get(i,a,s)},set:(i,a,s,n)=>{if(a&&typeof a!="symbol"&&!(a in i)||a>=0){let{index:l}=w.resolveCoord([e,a]);if(l>=0)return i[l]=s,this.setAll(t,i),!0}return Reflect.set(i,a,s,n)}})},set(o){this.setAll(t,o)},configurable:!0,enumerable:!0})}z.extend(Fe);z.extend({deltaE:ar});Object.assign(z,{deltaEMethods:Fe});z.extend(uh);z.extend({contrast:nh});z.extend(ch);z.extend(jd);z.extend(fh);z.extend(to);function eo(t,e){return t==null||e==null?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function Rh(t,e){return t==null||e==null?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function Zn(t){let e,r,o;t.length!==2?(e=eo,r=(n,l)=>eo(t(n),l),o=(n,l)=>t(n)-l):(e=t===eo||t===Rh?t:Bh,r=t,o=t);function i(n,l,c=0,d=n.length){if(c<d){if(e(l,l)!==0)return d;do{const h=c+d>>>1;r(n[h],l)<0?c=h+1:d=h}while(c<d)}return c}function a(n,l,c=0,d=n.length){if(c<d){if(e(l,l)!==0)return d;do{const h=c+d>>>1;r(n[h],l)<=0?c=h+1:d=h}while(c<d)}return c}function s(n,l,c=0,d=n.length){const h=i(n,l,c,d-1);return h>c&&o(n[h-1],l)>-o(n[h],l)?h-1:h}return{left:i,center:s,right:a}}function Bh(){return 0}function Hh(t){return t===null?NaN:+t}const Dh=Zn(eo),Fh=Dh.right;Zn(Hh).center;const qh=Math.sqrt(50),jh=Math.sqrt(10),Uh=Math.sqrt(2);function fo(t,e,r){const o=(e-t)/Math.max(0,r),i=Math.floor(Math.log10(o)),a=o/Math.pow(10,i),s=a>=qh?10:a>=jh?5:a>=Uh?2:1;let n,l,c;return i<0?(c=Math.pow(10,-i)/s,n=Math.round(t*c),l=Math.round(e*c),n/c<t&&++n,l/c>e&&--l,c=-c):(c=Math.pow(10,i)*s,n=Math.round(t/c),l=Math.round(e/c),n*c<t&&++n,l*c>e&&--l),l<n&&.5<=r&&r<2?fo(t,e,r*2):[n,l,c]}function Vh(t,e,r){if(e=+e,t=+t,r=+r,!(r>0))return[];if(t===e)return[t];const o=e<t,[i,a,s]=o?fo(e,t,r):fo(t,e,r);if(!(a>=i))return[];const n=a-i+1,l=new Array(n);if(o)if(s<0)for(let c=0;c<n;++c)l[c]=(a-c)/-s;else for(let c=0;c<n;++c)l[c]=(a-c)*s;else if(s<0)for(let c=0;c<n;++c)l[c]=(i+c)/-s;else for(let c=0;c<n;++c)l[c]=(i+c)*s;return l}function pi(t,e,r){return e=+e,t=+t,r=+r,fo(t,e,r)[2]}function Gh(t,e,r){e=+e,t=+t,r=+r;const o=e<t,i=o?pi(e,t,r):pi(t,e,r);return(o?-1:1)*(i<0?1/-i:i)}var Wh={value:()=>{}};function Yn(){for(var t=0,e=arguments.length,r={},o;t<e;++t){if(!(o=arguments[t]+"")||o in r||/[\s.]/.test(o))throw new Error("illegal type: "+o);r[o]=[]}return new ro(r)}function ro(t){this._=t}function Xh(t,e){return t.trim().split(/^|\s+/).map(function(r){var o="",i=r.indexOf(".");if(i>=0&&(o=r.slice(i+1),r=r.slice(0,i)),r&&!e.hasOwnProperty(r))throw new Error("unknown type: "+r);return{type:r,name:o}})}ro.prototype=Yn.prototype={constructor:ro,on:function(t,e){var r=this._,o=Xh(t+"",r),i,a=-1,s=o.length;if(arguments.length<2){for(;++a<s;)if((i=(t=o[a]).type)&&(i=Kh(r[i],t.name)))return i;return}if(e!=null&&typeof e!="function")throw new Error("invalid callback: "+e);for(;++a<s;)if(i=(t=o[a]).type)r[i]=ks(r[i],t.name,e);else if(e==null)for(i in r)r[i]=ks(r[i],t.name,null);return this},copy:function(){var t={},e=this._;for(var r in e)t[r]=e[r].slice();return new ro(t)},call:function(t,e){if((i=arguments.length-2)>0)for(var r=new Array(i),o=0,i,a;o<i;++o)r[o]=arguments[o+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(a=this._[t],o=0,i=a.length;o<i;++o)a[o].value.apply(e,r)},apply:function(t,e,r){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var o=this._[t],i=0,a=o.length;i<a;++i)o[i].value.apply(e,r)}};function Kh(t,e){for(var r=0,o=t.length,i;r<o;++r)if((i=t[r]).name===e)return i.value}function ks(t,e,r){for(var o=0,i=t.length;o<i;++o)if(t[o].name===e){t[o]=Wh,t=t.slice(0,o).concat(t.slice(o+1));break}return r!=null&&t.push({name:e,value:r}),t}var fi="http://www.w3.org/1999/xhtml";const Cs={svg:"http://www.w3.org/2000/svg",xhtml:fi,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Lo(t){var e=t+="",r=e.indexOf(":");return r>=0&&(e=t.slice(0,r))!=="xmlns"&&(t=t.slice(r+1)),Cs.hasOwnProperty(e)?{space:Cs[e],local:t}:t}function Zh(t){return function(){var e=this.ownerDocument,r=this.namespaceURI;return r===fi&&e.documentElement.namespaceURI===fi?e.createElement(t):e.createElementNS(r,t)}}function Yh(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function Jn(t){var e=Lo(t);return(e.local?Yh:Zh)(e)}function Jh(){}function Wi(t){return t==null?Jh:function(){return this.querySelector(t)}}function Qh(t){typeof t!="function"&&(t=Wi(t));for(var e=this._groups,r=e.length,o=new Array(r),i=0;i<r;++i)for(var a=e[i],s=a.length,n=o[i]=new Array(s),l,c,d=0;d<s;++d)(l=a[d])&&(c=t.call(l,l.__data__,d,a))&&("__data__"in l&&(c.__data__=l.__data__),n[d]=c);return new vt(o,this._parents)}function tu(t){return t==null?[]:Array.isArray(t)?t:Array.from(t)}function eu(){return[]}function Qn(t){return t==null?eu:function(){return this.querySelectorAll(t)}}function ru(t){return function(){return tu(t.apply(this,arguments))}}function ou(t){typeof t=="function"?t=ru(t):t=Qn(t);for(var e=this._groups,r=e.length,o=[],i=[],a=0;a<r;++a)for(var s=e[a],n=s.length,l,c=0;c<n;++c)(l=s[c])&&(o.push(t.call(l,l.__data__,c,s)),i.push(l));return new vt(o,i)}function tl(t){return function(){return this.matches(t)}}function el(t){return function(e){return e.matches(t)}}var iu=Array.prototype.find;function au(t){return function(){return iu.call(this.children,t)}}function su(){return this.firstElementChild}function nu(t){return this.select(t==null?su:au(typeof t=="function"?t:el(t)))}var lu=Array.prototype.filter;function cu(){return Array.from(this.children)}function du(t){return function(){return lu.call(this.children,t)}}function hu(t){return this.selectAll(t==null?cu:du(typeof t=="function"?t:el(t)))}function uu(t){typeof t!="function"&&(t=tl(t));for(var e=this._groups,r=e.length,o=new Array(r),i=0;i<r;++i)for(var a=e[i],s=a.length,n=o[i]=[],l,c=0;c<s;++c)(l=a[c])&&t.call(l,l.__data__,c,a)&&n.push(l);return new vt(o,this._parents)}function rl(t){return new Array(t.length)}function pu(){return new vt(this._enter||this._groups.map(rl),this._parents)}function go(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}go.prototype={constructor:go,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function fu(t){return function(){return t}}function gu(t,e,r,o,i,a){for(var s=0,n,l=e.length,c=a.length;s<c;++s)(n=e[s])?(n.__data__=a[s],o[s]=n):r[s]=new go(t,a[s]);for(;s<l;++s)(n=e[s])&&(i[s]=n)}function bu(t,e,r,o,i,a,s){var n,l,c=new Map,d=e.length,h=a.length,p=new Array(d),m;for(n=0;n<d;++n)(l=e[n])&&(p[n]=m=s.call(l,l.__data__,n,e)+"",c.has(m)?i[n]=l:c.set(m,l));for(n=0;n<h;++n)m=s.call(t,a[n],n,a)+"",(l=c.get(m))?(o[n]=l,l.__data__=a[n],c.delete(m)):r[n]=new go(t,a[n]);for(n=0;n<d;++n)(l=e[n])&&c.get(p[n])===l&&(i[n]=l)}function mu(t){return t.__data__}function vu(t,e){if(!arguments.length)return Array.from(this,mu);var r=e?bu:gu,o=this._parents,i=this._groups;typeof t!="function"&&(t=fu(t));for(var a=i.length,s=new Array(a),n=new Array(a),l=new Array(a),c=0;c<a;++c){var d=o[c],h=i[c],p=h.length,m=_u(t.call(d,d&&d.__data__,c,o)),g=m.length,_=n[c]=new Array(g),y=s[c]=new Array(g),$=l[c]=new Array(p);r(d,h,_,y,$,m,e);for(var k=0,x=0,I,L;k<g;++k)if(I=_[k]){for(k>=x&&(x=k+1);!(L=y[x])&&++x<g;);I._next=L||null}}return s=new vt(s,o),s._enter=n,s._exit=l,s}function _u(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function yu(){return new vt(this._exit||this._groups.map(rl),this._parents)}function wu(t,e,r){var o=this.enter(),i=this,a=this.exit();return typeof t=="function"?(o=t(o),o&&(o=o.selection())):o=o.append(t+""),e!=null&&(i=e(i),i&&(i=i.selection())),r==null?a.remove():r(a),o&&i?o.merge(i).order():i}function xu(t){for(var e=t.selection?t.selection():t,r=this._groups,o=e._groups,i=r.length,a=o.length,s=Math.min(i,a),n=new Array(i),l=0;l<s;++l)for(var c=r[l],d=o[l],h=c.length,p=n[l]=new Array(h),m,g=0;g<h;++g)(m=c[g]||d[g])&&(p[g]=m);for(;l<i;++l)n[l]=r[l];return new vt(n,this._parents)}function $u(){for(var t=this._groups,e=-1,r=t.length;++e<r;)for(var o=t[e],i=o.length-1,a=o[i],s;--i>=0;)(s=o[i])&&(a&&s.compareDocumentPosition(a)^4&&a.parentNode.insertBefore(s,a),a=s);return this}function ku(t){t||(t=Cu);function e(h,p){return h&&p?t(h.__data__,p.__data__):!h-!p}for(var r=this._groups,o=r.length,i=new Array(o),a=0;a<o;++a){for(var s=r[a],n=s.length,l=i[a]=new Array(n),c,d=0;d<n;++d)(c=s[d])&&(l[d]=c);l.sort(e)}return new vt(i,this._parents).order()}function Cu(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function Mu(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}function Au(){return Array.from(this)}function Su(){for(var t=this._groups,e=0,r=t.length;e<r;++e)for(var o=t[e],i=0,a=o.length;i<a;++i){var s=o[i];if(s)return s}return null}function zu(){let t=0;for(const e of this)++t;return t}function Eu(){return!this.node()}function Nu(t){for(var e=this._groups,r=0,o=e.length;r<o;++r)for(var i=e[r],a=0,s=i.length,n;a<s;++a)(n=i[a])&&t.call(n,n.__data__,a,i);return this}function Iu(t){return function(){this.removeAttribute(t)}}function Lu(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Pu(t,e){return function(){this.setAttribute(t,e)}}function Tu(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function Ou(t,e){return function(){var r=e.apply(this,arguments);r==null?this.removeAttribute(t):this.setAttribute(t,r)}}function Ru(t,e){return function(){var r=e.apply(this,arguments);r==null?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,r)}}function Bu(t,e){var r=Lo(t);if(arguments.length<2){var o=this.node();return r.local?o.getAttributeNS(r.space,r.local):o.getAttribute(r)}return this.each((e==null?r.local?Lu:Iu:typeof e=="function"?r.local?Ru:Ou:r.local?Tu:Pu)(r,e))}function ol(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function Hu(t){return function(){this.style.removeProperty(t)}}function Du(t,e,r){return function(){this.style.setProperty(t,e,r)}}function Fu(t,e,r){return function(){var o=e.apply(this,arguments);o==null?this.style.removeProperty(t):this.style.setProperty(t,o,r)}}function qu(t,e,r){return arguments.length>1?this.each((e==null?Hu:typeof e=="function"?Fu:Du)(t,e,r??"")):je(this.node(),t)}function je(t,e){return t.style.getPropertyValue(e)||ol(t).getComputedStyle(t,null).getPropertyValue(e)}function ju(t){return function(){delete this[t]}}function Uu(t,e){return function(){this[t]=e}}function Vu(t,e){return function(){var r=e.apply(this,arguments);r==null?delete this[t]:this[t]=r}}function Gu(t,e){return arguments.length>1?this.each((e==null?ju:typeof e=="function"?Vu:Uu)(t,e)):this.node()[t]}function il(t){return t.trim().split(/^|\s+/)}function Xi(t){return t.classList||new al(t)}function al(t){this._node=t,this._names=il(t.getAttribute("class")||"")}al.prototype={add:function(t){var e=this._names.indexOf(t);e<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function sl(t,e){for(var r=Xi(t),o=-1,i=e.length;++o<i;)r.add(e[o])}function nl(t,e){for(var r=Xi(t),o=-1,i=e.length;++o<i;)r.remove(e[o])}function Wu(t){return function(){sl(this,t)}}function Xu(t){return function(){nl(this,t)}}function Ku(t,e){return function(){(e.apply(this,arguments)?sl:nl)(this,t)}}function Zu(t,e){var r=il(t+"");if(arguments.length<2){for(var o=Xi(this.node()),i=-1,a=r.length;++i<a;)if(!o.contains(r[i]))return!1;return!0}return this.each((typeof e=="function"?Ku:e?Wu:Xu)(r,e))}function Yu(){this.textContent=""}function Ju(t){return function(){this.textContent=t}}function Qu(t){return function(){var e=t.apply(this,arguments);this.textContent=e??""}}function tp(t){return arguments.length?this.each(t==null?Yu:(typeof t=="function"?Qu:Ju)(t)):this.node().textContent}function ep(){this.innerHTML=""}function rp(t){return function(){this.innerHTML=t}}function op(t){return function(){var e=t.apply(this,arguments);this.innerHTML=e??""}}function ip(t){return arguments.length?this.each(t==null?ep:(typeof t=="function"?op:rp)(t)):this.node().innerHTML}function ap(){this.nextSibling&&this.parentNode.appendChild(this)}function sp(){return this.each(ap)}function np(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function lp(){return this.each(np)}function cp(t){var e=typeof t=="function"?t:Jn(t);return this.select(function(){return this.appendChild(e.apply(this,arguments))})}function dp(){return null}function hp(t,e){var r=typeof t=="function"?t:Jn(t),o=e==null?dp:typeof e=="function"?e:Wi(e);return this.select(function(){return this.insertBefore(r.apply(this,arguments),o.apply(this,arguments)||null)})}function up(){var t=this.parentNode;t&&t.removeChild(this)}function pp(){return this.each(up)}function fp(){var t=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function gp(){var t=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function bp(t){return this.select(t?gp:fp)}function mp(t){return arguments.length?this.property("__data__",t):this.node().__data__}function vp(t){return function(e){t.call(this,e,this.__data__)}}function _p(t){return t.trim().split(/^|\s+/).map(function(e){var r="",o=e.indexOf(".");return o>=0&&(r=e.slice(o+1),e=e.slice(0,o)),{type:e,name:r}})}function yp(t){return function(){var e=this.__on;if(e){for(var r=0,o=-1,i=e.length,a;r<i;++r)a=e[r],(!t.type||a.type===t.type)&&a.name===t.name?this.removeEventListener(a.type,a.listener,a.options):e[++o]=a;++o?e.length=o:delete this.__on}}}function wp(t,e,r){return function(){var o=this.__on,i,a=vp(e);if(o){for(var s=0,n=o.length;s<n;++s)if((i=o[s]).type===t.type&&i.name===t.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=a,i.options=r),i.value=e;return}}this.addEventListener(t.type,a,r),i={type:t.type,name:t.name,value:e,listener:a,options:r},o?o.push(i):this.__on=[i]}}function xp(t,e,r){var o=_p(t+""),i,a=o.length,s;if(arguments.length<2){var n=this.node().__on;if(n){for(var l=0,c=n.length,d;l<c;++l)for(i=0,d=n[l];i<a;++i)if((s=o[i]).type===d.type&&s.name===d.name)return d.value}return}for(n=e?wp:yp,i=0;i<a;++i)this.each(n(o[i],e,r));return this}function ll(t,e,r){var o=ol(t),i=o.CustomEvent;typeof i=="function"?i=new i(e,r):(i=o.document.createEvent("Event"),r?(i.initEvent(e,r.bubbles,r.cancelable),i.detail=r.detail):i.initEvent(e,!1,!1)),t.dispatchEvent(i)}function $p(t,e){return function(){return ll(this,t,e)}}function kp(t,e){return function(){return ll(this,t,e.apply(this,arguments))}}function Cp(t,e){return this.each((typeof e=="function"?kp:$p)(t,e))}function*Mp(){for(var t=this._groups,e=0,r=t.length;e<r;++e)for(var o=t[e],i=0,a=o.length,s;i<a;++i)(s=o[i])&&(yield s)}var Ap=[null];function vt(t,e){this._groups=t,this._parents=e}function Lr(){return new vt([[document.documentElement]],Ap)}function Sp(){return this}vt.prototype=Lr.prototype={constructor:vt,select:Qh,selectAll:ou,selectChild:nu,selectChildren:hu,filter:uu,data:vu,enter:pu,exit:yu,join:wu,merge:xu,selection:Sp,order:$u,sort:ku,call:Mu,nodes:Au,node:Su,size:zu,empty:Eu,each:Nu,attr:Bu,style:qu,property:Gu,classed:Zu,text:tp,html:ip,raise:sp,lower:lp,append:cp,insert:hp,remove:pp,clone:bp,datum:mp,on:xp,dispatch:Cp,[Symbol.iterator]:Mp};function Ki(t,e,r){t.prototype=e.prototype=r,r.constructor=t}function cl(t,e){var r=Object.create(t.prototype);for(var o in e)r[o]=e[o];return r}function Pr(){}var wr=.7,bo=1/wr,Pe="\\s*([+-]?\\d+)\\s*",xr="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",At="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",zp=/^#([0-9a-f]{3,8})$/,Ep=new RegExp(`^rgb\\(${Pe},${Pe},${Pe}\\)$`),Np=new RegExp(`^rgb\\(${At},${At},${At}\\)$`),Ip=new RegExp(`^rgba\\(${Pe},${Pe},${Pe},${xr}\\)$`),Lp=new RegExp(`^rgba\\(${At},${At},${At},${xr}\\)$`),Pp=new RegExp(`^hsl\\(${xr},${At},${At}\\)$`),Tp=new RegExp(`^hsla\\(${xr},${At},${At},${xr}\\)$`),Ms={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Ki(Pr,be,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:As,formatHex:As,formatHex8:Op,formatHsl:Rp,formatRgb:Ss,toString:Ss});function As(){return this.rgb().formatHex()}function Op(){return this.rgb().formatHex8()}function Rp(){return dl(this).formatHsl()}function Ss(){return this.rgb().formatRgb()}function be(t){var e,r;return t=(t+"").trim().toLowerCase(),(e=zp.exec(t))?(r=e[1].length,e=parseInt(e[1],16),r===6?zs(e):r===3?new rt(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):r===8?Xr(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):r===4?Xr(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=Ep.exec(t))?new rt(e[1],e[2],e[3],1):(e=Np.exec(t))?new rt(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=Ip.exec(t))?Xr(e[1],e[2],e[3],e[4]):(e=Lp.exec(t))?Xr(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=Pp.exec(t))?Is(e[1],e[2]/100,e[3]/100,1):(e=Tp.exec(t))?Is(e[1],e[2]/100,e[3]/100,e[4]):Ms.hasOwnProperty(t)?zs(Ms[t]):t==="transparent"?new rt(NaN,NaN,NaN,0):null}function zs(t){return new rt(t>>16&255,t>>8&255,t&255,1)}function Xr(t,e,r,o){return o<=0&&(t=e=r=NaN),new rt(t,e,r,o)}function Bp(t){return t instanceof Pr||(t=be(t)),t?(t=t.rgb(),new rt(t.r,t.g,t.b,t.opacity)):new rt}function gi(t,e,r,o){return arguments.length===1?Bp(t):new rt(t,e,r,o??1)}function rt(t,e,r,o){this.r=+t,this.g=+e,this.b=+r,this.opacity=+o}Ki(rt,gi,cl(Pr,{brighter(t){return t=t==null?bo:Math.pow(bo,t),new rt(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=t==null?wr:Math.pow(wr,t),new rt(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new rt(pe(this.r),pe(this.g),pe(this.b),mo(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Es,formatHex:Es,formatHex8:Hp,formatRgb:Ns,toString:Ns}));function Es(){return`#${he(this.r)}${he(this.g)}${he(this.b)}`}function Hp(){return`#${he(this.r)}${he(this.g)}${he(this.b)}${he((isNaN(this.opacity)?1:this.opacity)*255)}`}function Ns(){const t=mo(this.opacity);return`${t===1?"rgb(":"rgba("}${pe(this.r)}, ${pe(this.g)}, ${pe(this.b)}${t===1?")":`, ${t})`}`}function mo(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function pe(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function he(t){return t=pe(t),(t<16?"0":"")+t.toString(16)}function Is(t,e,r,o){return o<=0?t=e=r=NaN:r<=0||r>=1?t=e=NaN:e<=0&&(t=NaN),new mt(t,e,r,o)}function dl(t){if(t instanceof mt)return new mt(t.h,t.s,t.l,t.opacity);if(t instanceof Pr||(t=be(t)),!t)return new mt;if(t instanceof mt)return t;t=t.rgb();var e=t.r/255,r=t.g/255,o=t.b/255,i=Math.min(e,r,o),a=Math.max(e,r,o),s=NaN,n=a-i,l=(a+i)/2;return n?(e===a?s=(r-o)/n+(r<o)*6:r===a?s=(o-e)/n+2:s=(e-r)/n+4,n/=l<.5?a+i:2-a-i,s*=60):n=l>0&&l<1?0:s,new mt(s,n,l,t.opacity)}function Dp(t,e,r,o){return arguments.length===1?dl(t):new mt(t,e,r,o??1)}function mt(t,e,r,o){this.h=+t,this.s=+e,this.l=+r,this.opacity=+o}Ki(mt,Dp,cl(Pr,{brighter(t){return t=t==null?bo:Math.pow(bo,t),new mt(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?wr:Math.pow(wr,t),new mt(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+(this.h<0)*360,e=isNaN(t)||isNaN(this.s)?0:this.s,r=this.l,o=r+(r<.5?r:1-r)*e,i=2*r-o;return new rt(ei(t>=240?t-240:t+120,i,o),ei(t,i,o),ei(t<120?t+240:t-120,i,o),this.opacity)},clamp(){return new mt(Ls(this.h),Kr(this.s),Kr(this.l),mo(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=mo(this.opacity);return`${t===1?"hsl(":"hsla("}${Ls(this.h)}, ${Kr(this.s)*100}%, ${Kr(this.l)*100}%${t===1?")":`, ${t})`}`}}));function Ls(t){return t=(t||0)%360,t<0?t+360:t}function Kr(t){return Math.max(0,Math.min(1,t||0))}function ei(t,e,r){return(t<60?e+(r-e)*t/60:t<180?r:t<240?e+(r-e)*(240-t)/60:e)*255}const Zi=t=>()=>t;function Fp(t,e){return function(r){return t+r*e}}function qp(t,e,r){return t=Math.pow(t,r),e=Math.pow(e,r)-t,r=1/r,function(o){return Math.pow(t+o*e,r)}}function jp(t){return(t=+t)==1?hl:function(e,r){return r-e?qp(e,r,t):Zi(isNaN(e)?r:e)}}function hl(t,e){var r=e-t;return r?Fp(t,r):Zi(isNaN(t)?e:t)}const vo=(function t(e){var r=jp(e);function o(i,a){var s=r((i=gi(i)).r,(a=gi(a)).r),n=r(i.g,a.g),l=r(i.b,a.b),c=hl(i.opacity,a.opacity);return function(d){return i.r=s(d),i.g=n(d),i.b=l(d),i.opacity=c(d),i+""}}return o.gamma=t,o})(1);function Up(t,e){e||(e=[]);var r=t?Math.min(e.length,t.length):0,o=e.slice(),i;return function(a){for(i=0;i<r;++i)o[i]=t[i]*(1-a)+e[i]*a;return o}}function Vp(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function Gp(t,e){var r=e?e.length:0,o=t?Math.min(r,t.length):0,i=new Array(o),a=new Array(r),s;for(s=0;s<o;++s)i[s]=Yi(t[s],e[s]);for(;s<r;++s)a[s]=e[s];return function(n){for(s=0;s<o;++s)a[s]=i[s](n);return a}}function Wp(t,e){var r=new Date;return t=+t,e=+e,function(o){return r.setTime(t*(1-o)+e*o),r}}function bt(t,e){return t=+t,e=+e,function(r){return t*(1-r)+e*r}}function Xp(t,e){var r={},o={},i;(t===null||typeof t!="object")&&(t={}),(e===null||typeof e!="object")&&(e={});for(i in e)i in t?r[i]=Yi(t[i],e[i]):o[i]=e[i];return function(a){for(i in r)o[i]=r[i](a);return o}}var bi=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,ri=new RegExp(bi.source,"g");function Kp(t){return function(){return t}}function Zp(t){return function(e){return t(e)+""}}function ul(t,e){var r=bi.lastIndex=ri.lastIndex=0,o,i,a,s=-1,n=[],l=[];for(t=t+"",e=e+"";(o=bi.exec(t))&&(i=ri.exec(e));)(a=i.index)>r&&(a=e.slice(r,a),n[s]?n[s]+=a:n[++s]=a),(o=o[0])===(i=i[0])?n[s]?n[s]+=i:n[++s]=i:(n[++s]=null,l.push({i:s,x:bt(o,i)})),r=ri.lastIndex;return r<e.length&&(a=e.slice(r),n[s]?n[s]+=a:n[++s]=a),n.length<2?l[0]?Zp(l[0].x):Kp(e):(e=l.length,function(c){for(var d=0,h;d<e;++d)n[(h=l[d]).i]=h.x(c);return n.join("")})}function Yi(t,e){var r=typeof e,o;return e==null||r==="boolean"?Zi(e):(r==="number"?bt:r==="string"?(o=be(e))?(e=o,vo):ul:e instanceof be?vo:e instanceof Date?Wp:Vp(e)?Up:Array.isArray(e)?Gp:typeof e.valueOf!="function"&&typeof e.toString!="function"||isNaN(e)?Xp:bt)(t,e)}function Yp(t,e){return t=+t,e=+e,function(r){return Math.round(t*(1-r)+e*r)}}var Ps=180/Math.PI,mi={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function pl(t,e,r,o,i,a){var s,n,l;return(s=Math.sqrt(t*t+e*e))&&(t/=s,e/=s),(l=t*r+e*o)&&(r-=t*l,o-=e*l),(n=Math.sqrt(r*r+o*o))&&(r/=n,o/=n,l/=n),t*o<e*r&&(t=-t,e=-e,l=-l,s=-s),{translateX:i,translateY:a,rotate:Math.atan2(e,t)*Ps,skewX:Math.atan(l)*Ps,scaleX:s,scaleY:n}}var Zr;function Jp(t){const e=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(t+"");return e.isIdentity?mi:pl(e.a,e.b,e.c,e.d,e.e,e.f)}function Qp(t){return t==null||(Zr||(Zr=document.createElementNS("http://www.w3.org/2000/svg","g")),Zr.setAttribute("transform",t),!(t=Zr.transform.baseVal.consolidate()))?mi:(t=t.matrix,pl(t.a,t.b,t.c,t.d,t.e,t.f))}function fl(t,e,r,o){function i(c){return c.length?c.pop()+" ":""}function a(c,d,h,p,m,g){if(c!==h||d!==p){var _=m.push("translate(",null,e,null,r);g.push({i:_-4,x:bt(c,h)},{i:_-2,x:bt(d,p)})}else(h||p)&&m.push("translate("+h+e+p+r)}function s(c,d,h,p){c!==d?(c-d>180?d+=360:d-c>180&&(c+=360),p.push({i:h.push(i(h)+"rotate(",null,o)-2,x:bt(c,d)})):d&&h.push(i(h)+"rotate("+d+o)}function n(c,d,h,p){c!==d?p.push({i:h.push(i(h)+"skewX(",null,o)-2,x:bt(c,d)}):d&&h.push(i(h)+"skewX("+d+o)}function l(c,d,h,p,m,g){if(c!==h||d!==p){var _=m.push(i(m)+"scale(",null,",",null,")");g.push({i:_-4,x:bt(c,h)},{i:_-2,x:bt(d,p)})}else(h!==1||p!==1)&&m.push(i(m)+"scale("+h+","+p+")")}return function(c,d){var h=[],p=[];return c=t(c),d=t(d),a(c.translateX,c.translateY,d.translateX,d.translateY,h,p),s(c.rotate,d.rotate,h,p),n(c.skewX,d.skewX,h,p),l(c.scaleX,c.scaleY,d.scaleX,d.scaleY,h,p),c=d=null,function(m){for(var g=-1,_=p.length,y;++g<_;)h[(y=p[g]).i]=y.x(m);return h.join("")}}}var t0=fl(Jp,"px, ","px)","deg)"),e0=fl(Qp,", ",")",")"),Ue=0,sr=0,rr=0,gl=1e3,_o,nr,yo=0,me=0,Po=0,$r=typeof performance=="object"&&performance.now?performance:Date,bl=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function Ji(){return me||(bl(r0),me=$r.now()+Po)}function r0(){me=0}function wo(){this._call=this._time=this._next=null}wo.prototype=ml.prototype={constructor:wo,restart:function(t,e,r){if(typeof t!="function")throw new TypeError("callback is not a function");r=(r==null?Ji():+r)+(e==null?0:+e),!this._next&&nr!==this&&(nr?nr._next=this:_o=this,nr=this),this._call=t,this._time=r,vi()},stop:function(){this._call&&(this._call=null,this._time=1/0,vi())}};function ml(t,e,r){var o=new wo;return o.restart(t,e,r),o}function o0(){Ji(),++Ue;for(var t=_o,e;t;)(e=me-t._time)>=0&&t._call.call(void 0,e),t=t._next;--Ue}function Ts(){me=(yo=$r.now())+Po,Ue=sr=0;try{o0()}finally{Ue=0,a0(),me=0}}function i0(){var t=$r.now(),e=t-yo;e>gl&&(Po-=e,yo=t)}function a0(){for(var t,e=_o,r,o=1/0;e;)e._call?(o>e._time&&(o=e._time),t=e,e=e._next):(r=e._next,e._next=null,e=t?t._next=r:_o=r);nr=t,vi(o)}function vi(t){if(!Ue){sr&&(sr=clearTimeout(sr));var e=t-me;e>24?(t<1/0&&(sr=setTimeout(Ts,t-$r.now()-Po)),rr&&(rr=clearInterval(rr))):(rr||(yo=$r.now(),rr=setInterval(i0,gl)),Ue=1,bl(Ts))}}function Os(t,e,r){var o=new wo;return e=e==null?0:+e,o.restart(i=>{o.stop(),t(i+e)},e,r),o}var s0=Yn("start","end","cancel","interrupt"),n0=[],vl=0,Rs=1,_i=2,oo=3,Bs=4,yi=5,io=6;function To(t,e,r,o,i,a){var s=t.__transition;if(!s)t.__transition={};else if(r in s)return;l0(t,r,{name:e,index:o,group:i,on:s0,tween:n0,time:a.time,delay:a.delay,duration:a.duration,ease:a.ease,timer:null,state:vl})}function Qi(t,e){var r=_t(t,e);if(r.state>vl)throw new Error("too late; already scheduled");return r}function Nt(t,e){var r=_t(t,e);if(r.state>oo)throw new Error("too late; already running");return r}function _t(t,e){var r=t.__transition;if(!r||!(r=r[e]))throw new Error("transition not found");return r}function l0(t,e,r){var o=t.__transition,i;o[e]=r,r.timer=ml(a,0,r.time);function a(c){r.state=Rs,r.timer.restart(s,r.delay,r.time),r.delay<=c&&s(c-r.delay)}function s(c){var d,h,p,m;if(r.state!==Rs)return l();for(d in o)if(m=o[d],m.name===r.name){if(m.state===oo)return Os(s);m.state===Bs?(m.state=io,m.timer.stop(),m.on.call("interrupt",t,t.__data__,m.index,m.group),delete o[d]):+d<e&&(m.state=io,m.timer.stop(),m.on.call("cancel",t,t.__data__,m.index,m.group),delete o[d])}if(Os(function(){r.state===oo&&(r.state=Bs,r.timer.restart(n,r.delay,r.time),n(c))}),r.state=_i,r.on.call("start",t,t.__data__,r.index,r.group),r.state===_i){for(r.state=oo,i=new Array(p=r.tween.length),d=0,h=-1;d<p;++d)(m=r.tween[d].value.call(t,t.__data__,r.index,r.group))&&(i[++h]=m);i.length=h+1}}function n(c){for(var d=c<r.duration?r.ease.call(null,c/r.duration):(r.timer.restart(l),r.state=yi,1),h=-1,p=i.length;++h<p;)i[h].call(t,d);r.state===yi&&(r.on.call("end",t,t.__data__,r.index,r.group),l())}function l(){r.state=io,r.timer.stop(),delete o[e];for(var c in o)return;delete t.__transition}}function c0(t,e){var r=t.__transition,o,i,a=!0,s;if(r){e=e==null?null:e+"";for(s in r){if((o=r[s]).name!==e){a=!1;continue}i=o.state>_i&&o.state<yi,o.state=io,o.timer.stop(),o.on.call(i?"interrupt":"cancel",t,t.__data__,o.index,o.group),delete r[s]}a&&delete t.__transition}}function d0(t){return this.each(function(){c0(this,t)})}function h0(t,e){var r,o;return function(){var i=Nt(this,t),a=i.tween;if(a!==r){o=r=a;for(var s=0,n=o.length;s<n;++s)if(o[s].name===e){o=o.slice(),o.splice(s,1);break}}i.tween=o}}function u0(t,e,r){var o,i;if(typeof r!="function")throw new Error;return function(){var a=Nt(this,t),s=a.tween;if(s!==o){i=(o=s).slice();for(var n={name:e,value:r},l=0,c=i.length;l<c;++l)if(i[l].name===e){i[l]=n;break}l===c&&i.push(n)}a.tween=i}}function p0(t,e){var r=this._id;if(t+="",arguments.length<2){for(var o=_t(this.node(),r).tween,i=0,a=o.length,s;i<a;++i)if((s=o[i]).name===t)return s.value;return null}return this.each((e==null?h0:u0)(r,t,e))}function ta(t,e,r){var o=t._id;return t.each(function(){var i=Nt(this,o);(i.value||(i.value={}))[e]=r.apply(this,arguments)}),function(i){return _t(i,o).value[e]}}function _l(t,e){var r;return(typeof e=="number"?bt:e instanceof be?vo:(r=be(e))?(e=r,vo):ul)(t,e)}function f0(t){return function(){this.removeAttribute(t)}}function g0(t){return function(){this.removeAttributeNS(t.space,t.local)}}function b0(t,e,r){var o,i=r+"",a;return function(){var s=this.getAttribute(t);return s===i?null:s===o?a:a=e(o=s,r)}}function m0(t,e,r){var o,i=r+"",a;return function(){var s=this.getAttributeNS(t.space,t.local);return s===i?null:s===o?a:a=e(o=s,r)}}function v0(t,e,r){var o,i,a;return function(){var s,n=r(this),l;return n==null?void this.removeAttribute(t):(s=this.getAttribute(t),l=n+"",s===l?null:s===o&&l===i?a:(i=l,a=e(o=s,n)))}}function _0(t,e,r){var o,i,a;return function(){var s,n=r(this),l;return n==null?void this.removeAttributeNS(t.space,t.local):(s=this.getAttributeNS(t.space,t.local),l=n+"",s===l?null:s===o&&l===i?a:(i=l,a=e(o=s,n)))}}function y0(t,e){var r=Lo(t),o=r==="transform"?e0:_l;return this.attrTween(t,typeof e=="function"?(r.local?_0:v0)(r,o,ta(this,"attr."+t,e)):e==null?(r.local?g0:f0)(r):(r.local?m0:b0)(r,o,e))}function w0(t,e){return function(r){this.setAttribute(t,e.call(this,r))}}function x0(t,e){return function(r){this.setAttributeNS(t.space,t.local,e.call(this,r))}}function $0(t,e){var r,o;function i(){var a=e.apply(this,arguments);return a!==o&&(r=(o=a)&&x0(t,a)),r}return i._value=e,i}function k0(t,e){var r,o;function i(){var a=e.apply(this,arguments);return a!==o&&(r=(o=a)&&w0(t,a)),r}return i._value=e,i}function C0(t,e){var r="attr."+t;if(arguments.length<2)return(r=this.tween(r))&&r._value;if(e==null)return this.tween(r,null);if(typeof e!="function")throw new Error;var o=Lo(t);return this.tween(r,(o.local?$0:k0)(o,e))}function M0(t,e){return function(){Qi(this,t).delay=+e.apply(this,arguments)}}function A0(t,e){return e=+e,function(){Qi(this,t).delay=e}}function S0(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?M0:A0)(e,t)):_t(this.node(),e).delay}function z0(t,e){return function(){Nt(this,t).duration=+e.apply(this,arguments)}}function E0(t,e){return e=+e,function(){Nt(this,t).duration=e}}function N0(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?z0:E0)(e,t)):_t(this.node(),e).duration}function I0(t,e){if(typeof e!="function")throw new Error;return function(){Nt(this,t).ease=e}}function L0(t){var e=this._id;return arguments.length?this.each(I0(e,t)):_t(this.node(),e).ease}function P0(t,e){return function(){var r=e.apply(this,arguments);if(typeof r!="function")throw new Error;Nt(this,t).ease=r}}function T0(t){if(typeof t!="function")throw new Error;return this.each(P0(this._id,t))}function O0(t){typeof t!="function"&&(t=tl(t));for(var e=this._groups,r=e.length,o=new Array(r),i=0;i<r;++i)for(var a=e[i],s=a.length,n=o[i]=[],l,c=0;c<s;++c)(l=a[c])&&t.call(l,l.__data__,c,a)&&n.push(l);return new Rt(o,this._parents,this._name,this._id)}function R0(t){if(t._id!==this._id)throw new Error;for(var e=this._groups,r=t._groups,o=e.length,i=r.length,a=Math.min(o,i),s=new Array(o),n=0;n<a;++n)for(var l=e[n],c=r[n],d=l.length,h=s[n]=new Array(d),p,m=0;m<d;++m)(p=l[m]||c[m])&&(h[m]=p);for(;n<o;++n)s[n]=e[n];return new Rt(s,this._parents,this._name,this._id)}function B0(t){return(t+"").trim().split(/^|\s+/).every(function(e){var r=e.indexOf(".");return r>=0&&(e=e.slice(0,r)),!e||e==="start"})}function H0(t,e,r){var o,i,a=B0(e)?Qi:Nt;return function(){var s=a(this,t),n=s.on;n!==o&&(i=(o=n).copy()).on(e,r),s.on=i}}function D0(t,e){var r=this._id;return arguments.length<2?_t(this.node(),r).on.on(t):this.each(H0(r,t,e))}function F0(t){return function(){var e=this.parentNode;for(var r in this.__transition)if(+r!==t)return;e&&e.removeChild(this)}}function q0(){return this.on("end.remove",F0(this._id))}function j0(t){var e=this._name,r=this._id;typeof t!="function"&&(t=Wi(t));for(var o=this._groups,i=o.length,a=new Array(i),s=0;s<i;++s)for(var n=o[s],l=n.length,c=a[s]=new Array(l),d,h,p=0;p<l;++p)(d=n[p])&&(h=t.call(d,d.__data__,p,n))&&("__data__"in d&&(h.__data__=d.__data__),c[p]=h,To(c[p],e,r,p,c,_t(d,r)));return new Rt(a,this._parents,e,r)}function U0(t){var e=this._name,r=this._id;typeof t!="function"&&(t=Qn(t));for(var o=this._groups,i=o.length,a=[],s=[],n=0;n<i;++n)for(var l=o[n],c=l.length,d,h=0;h<c;++h)if(d=l[h]){for(var p=t.call(d,d.__data__,h,l),m,g=_t(d,r),_=0,y=p.length;_<y;++_)(m=p[_])&&To(m,e,r,_,p,g);a.push(p),s.push(d)}return new Rt(a,s,e,r)}var V0=Lr.prototype.constructor;function G0(){return new V0(this._groups,this._parents)}function W0(t,e){var r,o,i;return function(){var a=je(this,t),s=(this.style.removeProperty(t),je(this,t));return a===s?null:a===r&&s===o?i:i=e(r=a,o=s)}}function yl(t){return function(){this.style.removeProperty(t)}}function X0(t,e,r){var o,i=r+"",a;return function(){var s=je(this,t);return s===i?null:s===o?a:a=e(o=s,r)}}function K0(t,e,r){var o,i,a;return function(){var s=je(this,t),n=r(this),l=n+"";return n==null&&(l=n=(this.style.removeProperty(t),je(this,t))),s===l?null:s===o&&l===i?a:(i=l,a=e(o=s,n))}}function Z0(t,e){var r,o,i,a="style."+e,s="end."+a,n;return function(){var l=Nt(this,t),c=l.on,d=l.value[a]==null?n||(n=yl(e)):void 0;(c!==r||i!==d)&&(o=(r=c).copy()).on(s,i=d),l.on=o}}function Y0(t,e,r){var o=(t+="")=="transform"?t0:_l;return e==null?this.styleTween(t,W0(t,o)).on("end.style."+t,yl(t)):typeof e=="function"?this.styleTween(t,K0(t,o,ta(this,"style."+t,e))).each(Z0(this._id,t)):this.styleTween(t,X0(t,o,e),r).on("end.style."+t,null)}function J0(t,e,r){return function(o){this.style.setProperty(t,e.call(this,o),r)}}function Q0(t,e,r){var o,i;function a(){var s=e.apply(this,arguments);return s!==i&&(o=(i=s)&&J0(t,s,r)),o}return a._value=e,a}function tf(t,e,r){var o="style."+(t+="");if(arguments.length<2)return(o=this.tween(o))&&o._value;if(e==null)return this.tween(o,null);if(typeof e!="function")throw new Error;return this.tween(o,Q0(t,e,r??""))}function ef(t){return function(){this.textContent=t}}function rf(t){return function(){var e=t(this);this.textContent=e??""}}function of(t){return this.tween("text",typeof t=="function"?rf(ta(this,"text",t)):ef(t==null?"":t+""))}function af(t){return function(e){this.textContent=t.call(this,e)}}function sf(t){var e,r;function o(){var i=t.apply(this,arguments);return i!==r&&(e=(r=i)&&af(i)),e}return o._value=t,o}function nf(t){var e="text";if(arguments.length<1)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;return this.tween(e,sf(t))}function lf(){for(var t=this._name,e=this._id,r=wl(),o=this._groups,i=o.length,a=0;a<i;++a)for(var s=o[a],n=s.length,l,c=0;c<n;++c)if(l=s[c]){var d=_t(l,e);To(l,t,r,c,s,{time:d.time+d.delay+d.duration,delay:0,duration:d.duration,ease:d.ease})}return new Rt(o,this._parents,t,r)}function cf(){var t,e,r=this,o=r._id,i=r.size();return new Promise(function(a,s){var n={value:s},l={value:function(){--i===0&&a()}};r.each(function(){var c=Nt(this,o),d=c.on;d!==t&&(e=(t=d).copy(),e._.cancel.push(n),e._.interrupt.push(n),e._.end.push(l)),c.on=e}),i===0&&a()})}var df=0;function Rt(t,e,r,o){this._groups=t,this._parents=e,this._name=r,this._id=o}function wl(){return++df}var Tt=Lr.prototype;Rt.prototype={constructor:Rt,select:j0,selectAll:U0,selectChild:Tt.selectChild,selectChildren:Tt.selectChildren,filter:O0,merge:R0,selection:G0,transition:lf,call:Tt.call,nodes:Tt.nodes,node:Tt.node,size:Tt.size,empty:Tt.empty,each:Tt.each,on:D0,attr:y0,attrTween:C0,style:Y0,styleTween:tf,text:of,textTween:nf,remove:q0,tween:p0,delay:S0,duration:N0,ease:L0,easeVarying:T0,end:cf,[Symbol.iterator]:Tt[Symbol.iterator]};function hf(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}var uf={time:null,delay:0,duration:250,ease:hf};function pf(t,e){for(var r;!(r=t.__transition)||!(r=r[e]);)if(!(t=t.parentNode))throw new Error(`transition ${e} not found`);return r}function ff(t){var e,r;t instanceof Rt?(e=t._id,t=t._name):(e=wl(),(r=uf).time=Ji(),t=t==null?null:t+"");for(var o=this._groups,i=o.length,a=0;a<i;++a)for(var s=o[a],n=s.length,l,c=0;c<n;++c)(l=s[c])&&To(l,t,e,c,s,r||pf(l,e));return new Rt(o,this._parents,t,e)}Lr.prototype.interrupt=d0;Lr.prototype.transition=ff;function gf(t){return Math.abs(t=Math.round(t))>=1e21?t.toLocaleString("en").replace(/,/g,""):t.toString(10)}function xo(t,e){if((r=(t=e?t.toExponential(e-1):t.toExponential()).indexOf("e"))<0)return null;var r,o=t.slice(0,r);return[o.length>1?o[0]+o.slice(2):o,+t.slice(r+1)]}function Ve(t){return t=xo(Math.abs(t)),t?t[1]:NaN}function bf(t,e){return function(r,o){for(var i=r.length,a=[],s=0,n=t[0],l=0;i>0&&n>0&&(l+n+1>o&&(n=Math.max(1,o-l)),a.push(r.substring(i-=n,i+n)),!((l+=n+1)>o));)n=t[s=(s+1)%t.length];return a.reverse().join(e)}}function mf(t){return function(e){return e.replace(/[0-9]/g,function(r){return t[+r]})}}var vf=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function $o(t){if(!(e=vf.exec(t)))throw new Error("invalid format: "+t);var e;return new ea({fill:e[1],align:e[2],sign:e[3],symbol:e[4],zero:e[5],width:e[6],comma:e[7],precision:e[8]&&e[8].slice(1),trim:e[9],type:e[10]})}$o.prototype=ea.prototype;function ea(t){this.fill=t.fill===void 0?" ":t.fill+"",this.align=t.align===void 0?">":t.align+"",this.sign=t.sign===void 0?"-":t.sign+"",this.symbol=t.symbol===void 0?"":t.symbol+"",this.zero=!!t.zero,this.width=t.width===void 0?void 0:+t.width,this.comma=!!t.comma,this.precision=t.precision===void 0?void 0:+t.precision,this.trim=!!t.trim,this.type=t.type===void 0?"":t.type+""}ea.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function _f(t){t:for(var e=t.length,r=1,o=-1,i;r<e;++r)switch(t[r]){case".":o=i=r;break;case"0":o===0&&(o=r),i=r;break;default:if(!+t[r])break t;o>0&&(o=0);break}return o>0?t.slice(0,o)+t.slice(i+1):t}var xl;function yf(t,e){var r=xo(t,e);if(!r)return t+"";var o=r[0],i=r[1],a=i-(xl=Math.max(-8,Math.min(8,Math.floor(i/3)))*3)+1,s=o.length;return a===s?o:a>s?o+new Array(a-s+1).join("0"):a>0?o.slice(0,a)+"."+o.slice(a):"0."+new Array(1-a).join("0")+xo(t,Math.max(0,e+a-1))[0]}function Hs(t,e){var r=xo(t,e);if(!r)return t+"";var o=r[0],i=r[1];return i<0?"0."+new Array(-i).join("0")+o:o.length>i+1?o.slice(0,i+1)+"."+o.slice(i+1):o+new Array(i-o.length+2).join("0")}const Ds={"%":(t,e)=>(t*100).toFixed(e),b:t=>Math.round(t).toString(2),c:t=>t+"",d:gf,e:(t,e)=>t.toExponential(e),f:(t,e)=>t.toFixed(e),g:(t,e)=>t.toPrecision(e),o:t=>Math.round(t).toString(8),p:(t,e)=>Hs(t*100,e),r:Hs,s:yf,X:t=>Math.round(t).toString(16).toUpperCase(),x:t=>Math.round(t).toString(16)};function Fs(t){return t}var qs=Array.prototype.map,js=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function wf(t){var e=t.grouping===void 0||t.thousands===void 0?Fs:bf(qs.call(t.grouping,Number),t.thousands+""),r=t.currency===void 0?"":t.currency[0]+"",o=t.currency===void 0?"":t.currency[1]+"",i=t.decimal===void 0?".":t.decimal+"",a=t.numerals===void 0?Fs:mf(qs.call(t.numerals,String)),s=t.percent===void 0?"%":t.percent+"",n=t.minus===void 0?"−":t.minus+"",l=t.nan===void 0?"NaN":t.nan+"";function c(h){h=$o(h);var p=h.fill,m=h.align,g=h.sign,_=h.symbol,y=h.zero,$=h.width,k=h.comma,x=h.precision,I=h.trim,L=h.type;L==="n"?(k=!0,L="g"):Ds[L]||(x===void 0&&(x=12),I=!0,L="g"),(y||p==="0"&&m==="=")&&(y=!0,p="0",m="=");var at=_==="$"?r:_==="#"&&/[boxX]/.test(L)?"0"+L.toLowerCase():"",Dt=_==="$"?o:/[%p]/.test(L)?s:"",st=Ds[L],Jt=/[defgprs%]/.test(L);x=x===void 0?6:/[gprs]/.test(L)?Math.max(1,Math.min(21,x)):Math.max(0,Math.min(20,x));function We(N){var wt=at,J=Dt,xt,Xe,Q;if(L==="c")J=st(N)+J,N="";else{N=+N;var Qt=N<0||1/N<0;if(N=isNaN(N)?l:st(Math.abs(N),x),I&&(N=_f(N)),Qt&&+N==0&&g!=="+"&&(Qt=!1),wt=(Qt?g==="("?g:n:g==="-"||g==="("?"":g)+wt,J=(L==="s"?js[8+xl/3]:"")+J+(Qt&&g==="("?")":""),Jt){for(xt=-1,Xe=N.length;++xt<Xe;)if(Q=N.charCodeAt(xt),48>Q||Q>57){J=(Q===46?i+N.slice(xt+1):N.slice(xt))+J,N=N.slice(0,xt);break}}}k&&!y&&(N=e(N,1/0));var _e=wt.length+N.length+J.length,ut=_e<$?new Array($-_e+1).join(p):"";switch(k&&y&&(N=e(ut+N,ut.length?$-J.length:1/0),ut=""),m){case"<":N=wt+N+J+ut;break;case"=":N=wt+ut+N+J;break;case"^":N=ut.slice(0,_e=ut.length>>1)+wt+N+J+ut.slice(_e);break;default:N=ut+wt+N+J;break}return a(N)}return We.toString=function(){return h+""},We}function d(h,p){var m=c((h=$o(h),h.type="f",h)),g=Math.max(-8,Math.min(8,Math.floor(Ve(p)/3)))*3,_=Math.pow(10,-g),y=js[8+g/3];return function($){return m(_*$)+y}}return{format:c,formatPrefix:d}}var Yr,$l,kl;xf({thousands:",",grouping:[3],currency:["$",""]});function xf(t){return Yr=wf(t),$l=Yr.format,kl=Yr.formatPrefix,Yr}function $f(t){return Math.max(0,-Ve(Math.abs(t)))}function kf(t,e){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(Ve(e)/3)))*3-Ve(Math.abs(t)))}function Cf(t,e){return t=Math.abs(t),e=Math.abs(e)-t,Math.max(0,Ve(e)-Ve(t))+1}function Mf(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t);break}return this}function Af(t){return function(){return t}}function Sf(t){return+t}var Us=[0,1];function Le(t){return t}function wi(t,e){return(e-=t=+t)?function(r){return(r-t)/e}:Af(isNaN(e)?NaN:.5)}function zf(t,e){var r;return t>e&&(r=t,t=e,e=r),function(o){return Math.max(t,Math.min(e,o))}}function Ef(t,e,r){var o=t[0],i=t[1],a=e[0],s=e[1];return i<o?(o=wi(i,o),a=r(s,a)):(o=wi(o,i),a=r(a,s)),function(n){return a(o(n))}}function Nf(t,e,r){var o=Math.min(t.length,e.length)-1,i=new Array(o),a=new Array(o),s=-1;for(t[o]<t[0]&&(t=t.slice().reverse(),e=e.slice().reverse());++s<o;)i[s]=wi(t[s],t[s+1]),a[s]=r(e[s],e[s+1]);return function(n){var l=Fh(t,n,1,o)-1;return a[l](i[l](n))}}function If(t,e){return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())}function Lf(){var t=Us,e=Us,r=Yi,o,i,a,s=Le,n,l,c;function d(){var p=Math.min(t.length,e.length);return s!==Le&&(s=zf(t[0],t[p-1])),n=p>2?Nf:Ef,l=c=null,h}function h(p){return p==null||isNaN(p=+p)?a:(l||(l=n(t.map(o),e,r)))(o(s(p)))}return h.invert=function(p){return s(i((c||(c=n(e,t.map(o),bt)))(p)))},h.domain=function(p){return arguments.length?(t=Array.from(p,Sf),d()):t.slice()},h.range=function(p){return arguments.length?(e=Array.from(p),d()):e.slice()},h.rangeRound=function(p){return e=Array.from(p),r=Yp,d()},h.clamp=function(p){return arguments.length?(s=p?!0:Le,d()):s!==Le},h.interpolate=function(p){return arguments.length?(r=p,d()):r},h.unknown=function(p){return arguments.length?(a=p,h):a},function(p,m){return o=p,i=m,d()}}function Pf(){return Lf()(Le,Le)}function Tf(t,e,r,o){var i=Gh(t,e,r),a;switch(o=$o(o??",f"),o.type){case"s":{var s=Math.max(Math.abs(t),Math.abs(e));return o.precision==null&&!isNaN(a=kf(i,s))&&(o.precision=a),kl(o,s)}case"":case"e":case"g":case"p":case"r":{o.precision==null&&!isNaN(a=Cf(i,Math.max(Math.abs(t),Math.abs(e))))&&(o.precision=a-(o.type==="e"));break}case"f":case"%":{o.precision==null&&!isNaN(a=$f(i))&&(o.precision=a-(o.type==="%")*2);break}}return $l(o)}function Of(t){var e=t.domain;return t.ticks=function(r){var o=e();return Vh(o[0],o[o.length-1],r??10)},t.tickFormat=function(r,o){var i=e();return Tf(i[0],i[i.length-1],r??10,o)},t.nice=function(r){r==null&&(r=10);var o=e(),i=0,a=o.length-1,s=o[i],n=o[a],l,c,d=10;for(n<s&&(c=s,s=n,n=c,c=i,i=a,a=c);d-- >0;){if(c=pi(s,n,r),c===l)return o[i]=s,o[a]=n,e(o);if(c>0)s=Math.floor(s/c)*c,n=Math.ceil(n/c)*c;else if(c<0)s=Math.ceil(s*c)/c,n=Math.floor(n*c)/c;else break;l=c}return t},t}function Cl(){var t=Pf();return t.copy=function(){return If(t,Cl())},Mf.apply(t,arguments),Of(t)}function lr(t,e,r){this.k=t,this.x=e,this.y=r}lr.prototype={constructor:lr,scale:function(t){return t===1?this:new lr(this.k*t,this.x,this.y)},translate:function(t,e){return t===0&e===0?this:new lr(this.k,this.x+this.k*t,this.y+this.k*e)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};lr.prototype;var Rf=typeof global=="object"&&global&&global.Object===Object&&global,Bf=typeof self=="object"&&self&&self.Object===Object&&self,Hf=Rf||Bf||Function("return this")(),ko=Hf.Symbol,Ml=Object.prototype,Df=Ml.hasOwnProperty,Ff=Ml.toString,or=ko?ko.toStringTag:void 0;function qf(t){var e=Df.call(t,or),r=t[or];try{t[or]=void 0;var o=!0}catch{}var i=Ff.call(t);return o&&(e?t[or]=r:delete t[or]),i}var jf=Object.prototype,Uf=jf.toString;function Vf(t){return Uf.call(t)}var Gf="[object Null]",Wf="[object Undefined]",Vs=ko?ko.toStringTag:void 0;function Xf(t){return t==null?t===void 0?Wf:Gf:Vs&&Vs in Object(t)?qf(t):Vf(t)}function Kf(t){return t!=null&&typeof t=="object"}var Zf="[object Symbol]";function Yf(t){return typeof t=="symbol"||Kf(t)&&Xf(t)==Zf}var Jf=/\s/;function Qf(t){for(var e=t.length;e--&&Jf.test(t.charAt(e)););return e}var tg=/^\s+/;function eg(t){return t&&t.slice(0,Qf(t)+1).replace(tg,"")}function Gs(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var Ws=NaN,rg=/^[-+]0x[0-9a-f]+$/i,og=/^0b[01]+$/i,ig=/^0o[0-7]+$/i,ag=parseInt;function sg(t){if(typeof t=="number")return t;if(Yf(t))return Ws;if(Gs(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=Gs(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=eg(t);var r=og.test(t);return r||ig.test(t)?ag(t.slice(2),r?2:8):rg.test(t)?Ws:+t}var Xs=1/0,ng=17976931348623157e292;function Ks(t){if(!t)return t===0?t:0;if(t=sg(t),t===Xs||t===-Xs){var e=t<0?-1:1;return e*ng}return t===t?t:0}var lg=parseFloat,cg=Math.min,dg=Math.random;function ir(t,e,r){if(t===void 0&&e===void 0?(t=0,e=1):(t=Ks(t),e===void 0?(e=t,t=0):e=Ks(e)),t>e){var o=t;t=e,e=o}{var i=dg();return cg(t+i*(e-t+lg("1e-"+((i+"").length-1))),e)}}class hg{constructor(){this.success=!1,this.colors=null,this.chroma=NaN}}class ug{parseColor(e){let r=null;try{r=z.parse(e)}catch(o){console.error(o)}return r}toHexString(e){const r=this.parseColor(e);return r?new z(r).to("srgb").toString({format:"hex"}).replace(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,"#$1$1$2$2$3$3"):null}hexToOklchString(e){const r=this.parseColor(e);if(!r)throw new Error(`Could not parse color: ${e}`);const o=z.to(r,"oklch"),[i,a,s]=o.coords;return`oklch(${i.toFixed(2)} ${a.toFixed(3)} ${(s||0).toFixed(1)})`}getRgb255Array(e){const r=this.parseColor(e);let o=null;if(r){const i=r.coords;o=[Math.round(i[0]*255),Math.round(i[1]*255),Math.round(i[2]*255)]}else console.error(`unable to parse: ${e}`);return o}createSrgbColor(e,r){let o=null;const i=this.parseColor(e);if(i){const a=z.to(i,"oklch"),s=a.coords[1],n=a.coords[2];o=new z("oklch",[r,s,n]).toGamut({space:"srgb",method:"oklch.c"}).to("srgb").toString({format:"hex"})}return o}isInSrgbGamut(e){return new Promise((r,o)=>{try{const a=new z("oklch",e).inGamut("srgb");r(a)}catch(i){o(i)}})}createVariants(e){let r=null;const o=this.parseColor(e);if(o){const a=z.to(o,"oklch").coords,s=a[1],n=a[2],l=1e3,h=(1-0)/l;r=[];for(let p=0;p<=l;p++){const g=[p*h,s,n];r.push(g)}}else console.error("unable to parse color");return r}filterOutOfGamutVariants(e){return new Promise(async(r,o)=>{if(!e)o("no variants");else{let i=!1;const a=[];for(let s=0;s<e.length;s++){const n=e[s];await this.isInSrgbGamut(n)&&a.push(n),s===e.length-1&&(i=!0)}i?r(a):o("error")}})}async getMinMaxLight(e){let r=null;const o=this.createVariants(e),i=await this.filterOutOfGamutVariants(o),a=this.parseColor(e);if(a&&i.length){const n=z.to(a,"oklch").coords,l=0,c=0,d=i.length-1,h=i[c][l],p=i[d][l];r={originalCoords:n,lightMin:h,lightMax:p}}else if(!a)console.error("unable to parse color");else{const n=z.to(a,"oklch").coords;r={originalCoords:n,lightMin:n[0],lightMax:n[0]}}return r}async getRandomColorPair(){let e=["black","white"];const r=ir(.11,.34),o=ir(.25,.26),i=ir(0,360),a=ir(.94,.95),s=ir(0,360),n=new z("oklch",[o,r,i]).toGamut({space:"srgb",method:"oklch.c"}).to("srgb").toString({format:"hex"}),l=new z("oklch",[a,r,s]).toGamut({space:"srgb",method:"oklch.c"}).to("srgb").toString({format:"hex"}),c=[n,l],d=await this.matchChromas(c);return e=d.colors?d.colors:e,e}async adjustColorPairForPresentation(e){let r=["black","white"];const o=e[0],i=e[1],a=this.parseColor(o),s=await this.getMinMaxLight(o);if(a&&s){const n=s.lightMin+(s.lightMax-s.lightMin)/2,l=new z("srgb",a.coords).to("oklch");r=[new z("oklch",[n,l.coords[1],l.coords[2]]).to("srgb").toString({format:"hex"}),i]}else console.warn("trouble adjusting colors");return r}async matchChromas(e){let r=new hg;const o=this.parseColor(e[0]),i=this.parseColor(e[1]);if(o&&i){const a=new z("srgb",o.coords).to("oklch"),s=a.coords[1],n=new z("srgb",i.coords).to("oklch"),l=n.coords[1],c=[a.coords[0],l,a.coords[2]],d=[n.coords[0],s,n.coords[2]],h=await this.isInSrgbGamut(c),p=await this.isInSrgbGamut(d);h&&!p&&(r.success=!0,r.colors=[new z("oklch",c).to("srgb").toString({format:"hex"}),e[1]],r.chroma=c[1]),!h&&p&&(r.success=!0,r.colors=[e[0],new z("oklch",d).to("srgb").toString({format:"hex"})],r.chroma=d[1]),h&&p&&(c[1]>d[1]?(r.success=!0,r.colors=[new z("oklch",c).to("srgb").toString({format:"hex"}),e[1]],r.chroma=d[1]):(r.success=!0,r.colors=[e[0],new z("oklch",d).to("srgb").toString({format:"hex"})],r.chroma=d[1]))}else console.error("color parsing didn't work out.");return r}calcDeltaE(e,r){let o=null;const i=this.parseColor(e),a=this.parseColor(r);if(i&&a){const s=new z("srgb",i.coords),n=new z("srgb",a.coords),l=s.deltaE2000(n);o=Math.round(l)}return o}calcWcag2(e,r){let o=null;const i=this.parseColor(e),a=this.parseColor(r);if(i&&a){const s=new z("srgb",i.coords),n=new z("srgb",a.coords),l=s.contrast(n,"WCAG21");o=parseFloat(l.toFixed(1))}return o}getColorMeta(e){let r=null;const o=this.parseColor(e);if(o){const i=z.to(o,"oklch");r={lightness:i.coords[0].toFixed(2),chroma:i.coords[1].toFixed(2),hue:i.coords[2].toFixed(2),saturation:(i.coords[1]/i.coords[0]*100).toFixed(2)}}return r}getMinObjectDimension(e){let r=NaN;const o=Math.abs(e),i=[1,1.5,2,3,4,6,8,10,15],a=[90,75,60,50,45,30,25,20,15],n=Cl(i).domain(a)(o).toFixed(2);return r=parseFloat(n),r>15&&(r=15),o>=100&&(r=.25),o<15&&(r=NaN),r}generateAdaptiveVariants(e,r=11){const o=this.parseColor(e);if(!o)throw new Error(`Could not parse color: ${e}`);const i=z.to(o,"oklch"),a=i.coords[0],s=i.coords[1],n=i.coords[2],l=.005,d=this.walkAxis(a,s,n,r,.005,0,.4,"chroma"),h=[];for(const g of d){const _=this.walkAxis(a,g,n,r,l,0,1,"lightness"),y=[];for(const $ of _){const k=new z("oklch",[$,g,n]);if(!k.inGamut("srgb"))continue;const x=k.to("srgb").toString({format:"hex"}),I=this.calcDeltaE(x,e)??NaN,L=a!==0?Math.round(($-a)/a*100):NaN,at=s!==0?Math.round((g-s)/s*100):NaN;y.push({color:x,lightness:$,chroma:g,hue:n,deltaE:I,deltaChroma:at,deltaLightness:L})}y.length>0&&h.push(y)}for(const g of h)g.sort((_,y)=>y.lightness-_.lightness);const p=Math.max(...h.map(g=>g.length)),m=[];for(let g=0;g<p;g++){const _=[];for(const y of h)g<y.length&&_.push(y[g]);_.length>0&&m.push(_)}return m}walkAxis(e,r,o,i,a,s,n,l){const c=(y,$)=>{const k=new z("oklch",[y,$,o]);return k.inGamut("srgb")?k.to("srgb").toString({format:"hex"}):null},d=y=>l==="lightness"?y:e,h=y=>l==="chroma"?y:r,p=l==="lightness"?e:r,m=[p];let g=c(d(p),h(p)),_=p+a;for(;_<=n;){const y=c(d(_),h(_));if(y&&g){const $=this.calcDeltaE(y,g);$!==null&&$>=i&&(m.push(_),g=y)}else if(y&&!g)g=y;else if(!y&&g)break;_+=a}for(g=c(d(p),h(p)),_=p-a;_>=s;){const y=c(d(_),h(_));if(y&&g){const $=this.calcDeltaE(y,g);$!==null&&$>=i&&(m.unshift(_),g=y)}else if(y&&!g)g=y;else if(!y&&g)break;_-=a}return m}}const F=new ug;var pg=Object.defineProperty,fg=Object.getOwnPropertyDescriptor,Oo=(t,e,r,o)=>{for(var i=o>1?void 0:o?fg(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(i=(o?s(e,r,i):s(i))||i);return o&&i&&pg(e,r,i),i};let kr=class extends dt{constructor(){super(...arguments),this.alertMessage={message:""},this.showAlert=!1,this.liveMessage="",this.timeout=null,this.announceTimeout=null}createRenderRoot(){return this}hideAlert(){this.showAlert=!1,this.dispatchEvent(new CustomEvent("alert-closed",{detail:!0,bubbles:!0,composed:!0}))}_announce(t){this.announceTimeout&&clearTimeout(this.announceTimeout),this.liveMessage="",this.announceTimeout=setTimeout(()=>{this.liveMessage=t},100)}disconnectedCallback(){this.timeout&&clearTimeout(this.timeout),this.announceTimeout&&clearTimeout(this.announceTimeout),super.disconnectedCallback()}updated(t){if(!t.has("alertMessage"))return;const e=this.alertMessage?.message;e&&(this.showAlert=!0,this._announce(e),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.showAlert=!1},5e3))}render(){return T`
      <!--
        The announcing region is always in the DOM, and separate from the toast.
        candor-toast carries its own role="status", but it is created along with
        its text and torn down five seconds later — a live region has to be
        present and observed *before* its contents change. candor-toast-container
        does not close that gap: its shadow root is a bare <slot>, so the region
        still arrives with each toast. The toast is hidden from assistive tech
        here (aria-hidden covers its shadow root too) so the message is not
        queued twice. Upstream as pawn002/candor#266; drop the aria-hidden and
        this region if the container grows one of its own.
      -->
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        ${this.liveMessage}
      </div>

      <!--
        The container is Candor's documented outlet for toasts: position: fixed
        to a viewport corner at z-index 2000, with pointer-events restored on
        slotted children. It stays mounted whether or not a toast is showing, so
        the stack has somewhere to land. Auto-dismissal is the consumer's job by
        design — that is the 5s timer above, not something the container does.
      -->
      <candor-toast-container position="bottom-right">
        ${this.showAlert?T`
              <candor-toast
                aria-hidden="true"
                variant="success"
                message=${this.alertMessage.message}
                .dismissible=${!1}
              ></candor-toast>
            `:""}
      </candor-toast-container>
    `}};Oo([P({type:Object,attribute:!1})],kr.prototype,"alertMessage",2);Oo([B()],kr.prototype,"showAlert",2);Oo([B()],kr.prototype,"liveMessage",2);kr=Oo([Bt("cc-alert")],kr);/** @preserve
/////    CoLoR PaRsLeY  a simple set of color parsing thingies!
/////           Beta 0.1.8   Revision date: June 04, 2022
/////
/////    Functions to parse color values and return array
/////    Copyright (c) 2019-2022 by Andrew Somers. All Rights Reserved.
/////    LICENSE: AGPL 3
/////    CONTACT: Please use the ISSUES or DISCUSSIONS tab at:
/////    https://github.com/Myndex/colorparsley/
/////
///////////////////////////////////////////////////////////////////////////////
/////
/////    IMPORT:
/////    import { colorParsley } from 'colorparsley';
/////
/////    let rgbaArray = colorParsley('#abcdef');
/////
/////    Output as array:  [r,g,b,a,isValid,colorspace]
/////    Example: [123,123,123,1.0,true,'sRGB']
// */function Zs(t){if(typeof t=="string")return gg(t);if(typeof t=="number")return[(t&16711680)>>16,(t&65280)>>8,t&255,1,!0,"unknown"];if(typeof t=="object"){if(Array.isArray(t))return t;if(!isNaN(t.r)||!isNaN(t.red)){let e=[0,0,0,0,!1,"unknown"];return e[0]=t.r?t.r:t.red?t.red:!1,e[1]=t.g?t.g:t.green?t.green:!1,e[2]=t.b?t.b:t.blue?t.blue:!1,e[3]=t.a?t.a:t.alpha?t.alpha:1,e[4]=!!(e[0]&&e[1]&&e[2]),e[5]=t.space?t.space:t.colorSpace?t.colorSpace:t.colorspace?t.colorspace:"unknown",e}}return console.log("colorParsley error: invalid input"),[0,0,0,0,!1,"inputError"]}function gg(t="#abcdef"){t=t.replace(/[^\w,.#%()\/ -]/g,""),t=t.toLowerCase();let e=!1,o=[0,0,0,0,e,"sRGB"];if(t.match(/^(?:(?!rgb|l.h|hs|col|\d|#).{0,4})(?=[g-z])/)){let s={gray0:"000000",gray1:"111111",gray2:"222222",gray3:"333333",gray4:"444444",gray5:"555555",gray6:"666666",gray7:"777777",gray8:"888888",gray9:"999999",graya:"aaaaaa",grayb:"bbbbbb",grayc:"cccccc",grayd:"dddddd",graye:"eeeeee",grayf:"ffffff",midgray:"a0a0a0",grey0:"000000",grey1:"111111",grey2:"222222",grey3:"333333",grey4:"444444",grey5:"555555",grey6:"666666",grey7:"777777",grey8:"888888",grey9:"999999",greya:"aaaaaa",greyb:"bbbbbb",greyc:"cccccc",greyd:"dddddd",greye:"eeeeee",greyf:"ffffff",midgrey:"a0a0a0",aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"778899",lightslategrey:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"};for(let n in s)if(t==n){let l={rex:/^([\da-f]{2})([\da-f]{2})([\da-f]{2})$/,sprig:function(d){for(let h=0;h<3;h++)o[h]=parseInt(d[h+1],16);return o[3]=1,!0}},c=l.rex.exec(s[n]);return o[4]=e=l.sprig(c),o}}let i={rex:/(?:^(?:#|0x|)(?:(?:([\da-f])([\da-f])([\da-f])([\da-f])?)(?!\S)|(?:([\da-f]{2})(?:([\da-f]{2})([\da-f]{2})([\da-f]{2})?)?))|(?:(?:^(?:rgba?|)\(? ?(?:(?:(?:(255|(?:25[0-4]|2[0-4]\d|1?\d{1,2})(?:\.\d{1,24})?)))(?:,[^\S]*$|(?:(?:, ?| )(255|(?:25[0-4]|2[0-4]\d|1?\d{1,2})(?:\.\d{1,24})?)(?:, ?| )(255|(?:25[0-4]|2[0-4]\d|1?\d{1,2})(?:\.\d{1,24})?)))|(100%|\d{1,2}(?:\.\d{1,24})?%)(?:,?[^\S]*$|(?:(?:, ?| )(?:(100%|\d{1,2}(?:\.\d{1,24})?%)(?:, ?| )(100%|\d{1,2}(?:\.\d{1,24})?%)))))|^(?:color\((srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|xyz|xyz-d50|xyz-d65) (?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])) (?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])) (?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])))|^(?:((?:r(?!gb)|c(?!olor)|[abd-qs-z])[a-z]{2,5})\( ?((?:\d{0,3}\.|)\d{1,24}%?)(?:, ?| )((?:\d{0,3}\.|)\d{1,24}%?)(?:, ?| )((?:\d{0,3}\.|)\d{1,24}%?))))(?:(?:,| \/| ) ?(?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])))?(?:\)| |))[^\S]*$/,parsley:function(s){let n=0,l=0,c=10,d=100,h=2.55,p="1";s[23]&&(p=s[23],delete s[23]),o[3]=p.match(/%/g)?parseFloat(p)/d:parseFloat(p);for(let g=1;g<s.length;g++)s[g]&&(n=n||g,l=g);switch(l){case 4:c=16,d=15,o[3]=parseInt(s[l],c)/d;case 3:c=16;for(let g=0;g<3;g++)o[g]=parseInt(s[n+g]+s[n+g],c);break;case 5:c=16;case 9:o[0]=o[1]=o[2]=c==10?parseFloat(s[l]):parseInt(s[l],c);break;case 12:o[0]=o[1]=o[2]=parseFloat(s[l])*h;break;case 8:c=16,d=255,o[3]=parseInt(s[8],c)/d;case 7:c=16;case 11:for(let g=0;g<3;g++)o[g]=c==10?parseFloat(s[n+g]):parseInt(s[n+g],c);break;case 14:for(let g=0;g<3;g++)o[g]=parseFloat(s[n+g])*h;break;case 18:o[5]=s[15];for(let g=0;g<3;g++)n++,o[g]=s[n].match(/%/g)?parseFloat(s[n])*2.55:parseFloat(s[n])*255;break;case 22:o[5]=s[n];for(let g=0;g<3;g++)n++,o[g]=s[n]?s[n].match(/%/g)?parseFloat(s[n])/d:parseFloat(s[n]):0;if(o[5].match(/^(?:hsla?|hwba?)/i)){let I=function(L){let at=(L+x/30)%12,Dt=g*Math.min(_,1-_);return _-Dt*Math.max(-1,Math.min(at-3,9-at,1))};var m=I;let g,_,y,$,k,x=o[0]%360;if(x<0&&(x+=360),o[5].match(/^hsla?/i))g=o[1],_=o[2],y=0,k=1;else if(o[5].match(/^hwba?/i)){if(y=o[1],$=o[2],y+$>=1){o[0]=o[1]=o[2]=y/(y+$),o[5]="sRGB";break}g=1,_=.5,k=1-y-$}o[0]=Math.round(255*(I(0)*k+y)),o[1]=Math.round(255*(I(8)*k+y)),o[2]=Math.round(255*(I(4)*k+y)),o[5]="sRGB"}break}return!0}},a=i.rex.exec(t);return a?(o[4]=e=i.parsley(a),o):(e=!1,console.log("colorParsley error: unable to parse string"),[0,0,0,0,e,"parsleyError"])}/** @preserve
/////    SAPC APCA - Advanced Perceptual Contrast Algorithm
/////           Beta 0.1.9 W3 • contrast function only
/////           DIST: W3 • Revision date: July 3, 2022
/////    Function to parse color values and determine Lc contrast
/////    Copyright © 2019-2022 by Andrew Somers. All Rights Reserved.
/////    LICENSE: W3 LICENSE
/////    CONTACT: Please use the ISSUES or DISCUSSIONS tab at:
/////    https://github.com/Myndex/SAPC-APCA/
/////
///////////////////////////////////////////////////////////////////////////////
/////
/////    MINIMAL IMPORTS:
/////      import { APCAcontrast, sRGBtoY, displayP3toY,
/////               calcAPCA, fontLookupAPCA } from 'apca-w3';
/////      import { colorParsley } from 'colorparsley';
/////
/////    FORWARD CONTRAST USAGE:
/////      Lc = APCAcontrast( sRGBtoY( TEXTcolor ) , sRGBtoY( BACKGNDcolor ) );
/////    Where the colors are sent as an rgba array [255,255,255,1]
/////
/////    Retrieving an array of font sizes for the contrast:
/////      fontArray = fontLookupAPCA(Lc);
/////
/////    Live Demonstrator at https://www.myndex.com/APCA/
// */const H={mainTRC:2.4,sRco:.2126729,sGco:.7151522,sBco:.072175,normBG:.56,normTXT:.57,revTXT:.62,revBG:.65,blkThrs:.022,blkClmp:1.414,scaleBoW:1.14,scaleWoB:1.14,loBoWoffset:.027,loWoBoffset:.027,deltaYmin:5e-4,loClip:.1};function bg(t,e,r=-1){const o=[0,1.1];if(isNaN(t)||isNaN(e)||Math.min(t,e)<o[0]||Math.max(t,e)>o[1])return 0;let i=0,a=0,s="BoW";return t=t>H.blkThrs?t:t+Math.pow(H.blkThrs-t,H.blkClmp),e=e>H.blkThrs?e:e+Math.pow(H.blkThrs-e,H.blkClmp),Math.abs(e-t)<H.deltaYmin?0:(e>t?(i=(Math.pow(e,H.normBG)-Math.pow(t,H.normTXT))*H.scaleBoW,a=i<H.loClip?0:i-H.loBoWoffset):(s="WoB",i=(Math.pow(e,H.revBG)-Math.pow(t,H.revTXT))*H.scaleWoB,a=i>-.1?0:i+H.loWoBoffset),r<0?a*100:r==0?Math.round(Math.abs(a)*100)+"<sub>"+s+"</sub>":Number.isInteger(r)?(a*100).toFixed(r):0)}function mg(t,e,r=-1,o=!0){let i=Zs(e),a=Zs(t);return!(a[3]==""||a[3]==1)&&(a=vg(a,i,o)),bg(Ys(a),Ys(i),r)}function Ys(t=[0,0,0]){function e(r){return Math.pow(r/255,H.mainTRC)}return H.sRco*e(t[0])+H.sGco*e(t[1])+H.sBco*e(t[2])}function vg(t=[0,0,0,1],e=[0,0,0],r=!0){t[3]=Math.max(Math.min(t[3],1),0);let o=1-t[3],i=[0,0,0,1,!0];for(let a=0;a<3;a++)i[a]=e[a]*o+t[a]*t[3],r&&(i[a]=Math.min(Math.round(i[a]),255));return i}function _g(t){return t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function yg(t){if(!t.startsWith("#"))return null;let e=t.slice(1);return/^[0-9A-Fa-f]{3}$/.test(e)&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),/^[0-9A-Fa-f]{6}$/.test(e)?[parseInt(e.slice(0,2),16)/255,parseInt(e.slice(2,4),16)/255,parseInt(e.slice(4,6),16)/255]:null}function wg(t){const[e,r,o]=t.map(_g),i=.4122214708*e+.5363325363*r+.0514459929*o,a=.2119034982*e+.6806995451*r+.1073969566*o,s=.0883024619*e+.2817188376*r+.6299787005*o,n=Math.cbrt(i),l=Math.cbrt(a),c=Math.cbrt(s);return[.2104542553*n+.793617785*l-.0040720468*c,1.9779984951*n-2.428592205*l+.4505937099*c,.0259040371*n+.7827717662*l-.808675766*c]}function xg(t){const e=yg(t);return e?wg(e):null}function $g([t,e,r]){const o=r*(Math.PI/180);return[t,e*Math.cos(o),e*Math.sin(o)]}function ur(t,e){if(t.endsWith("%")){const o=parseFloat(t);return isNaN(o)?null:o/100*e}const r=parseFloat(t);return isNaN(r)?null:r}function kg(t){if(t.endsWith("grad"))return parseFloat(t)*(360/400);if(t.endsWith("turn"))return parseFloat(t)*360;if(t.endsWith("rad"))return parseFloat(t)*(180/Math.PI);if(t.endsWith("deg"))return parseFloat(t);const e=parseFloat(t);return isNaN(e)?null:e}function Cg(t){const e=t.trim().match(/^oklab\(\s*([\s\S]+?)\s*\)$/i);if(!e)return null;const r=e[1].split("/")[0].trim().split(/[\s,]+/).filter(Boolean);if(r.length<3)return null;const o=ur(r[0],1),i=ur(r[1],.4),a=ur(r[2],.4);return o===null||i===null||a===null?null:[o,i,a]}function Mg(t){const e=t.trim().match(/^oklch\(\s*([\s\S]+?)\s*\)$/i);if(!e)return null;const r=e[1].split("/")[0].trim().split(/[\s,]+/).filter(Boolean);if(r.length<3)return null;const o=ur(r[0],1),i=ur(r[1],.4),a=kg(r[2]);return o===null||i===null||a===null?null:[o,i,a]}const Ag=.15,Sg=.65,zg=1.1,Eg=20.9,Ng=20;function Js(t){return xg(t)??Cg(t)??(()=>{const e=Mg(t);return e?$g(e):null})()}class Ig{contrast(e,r){const o=Js(e),i=Js(r);if(!o||!i)return null;const a=Math.max(0,o[0]),s=Math.max(0,i[0]);if(Math.abs(a-s)<1e-6)return 1;const n=s>=a,l=n?s:a,c=n?a:s,d=n?i:o,h=this.chromaExp(d),p=Math.pow(Math.pow(l,h),3),m=Math.pow(c,3),g=a>s,_=(p+.05)/(m+.05),$=(g?Eg:Ng)*Math.pow(_/21,zg);return parseFloat(Math.max(1,Math.min(21,$)).toFixed(1))}chromaExp(e){const r=e[1],o=e[2],i=Math.sqrt(r*r+o*o),a=Math.min(1,(i/Ag)**2);return 1+Sg*a}}function Lg(t,e){return new Ig().contrast(t,e)}class Pg{constructor(e){this.cus=e}bridgeRatio(e=0,r,o,i=" to 1",a=1){let s=Math.max(r,o);const n=.2693,l=-.0561,c=4.537,d=1.113946,h=.3,p=.48,m=.42,g=.6594,_=.0785,y=.0815,$=.506;let k=y+_;if(s>$){let I=(1-s)/(1-$);k=y*I+_}e=Math.max(0,Math.abs(e*.01));let x=(Math.pow(e+l,c)+n)*d*e+k;return x=x>h?10*x:e<.06?0:10*x-(Math.pow(h-x+m,p)-g),x.toFixed(a)+i}BPCAcontrast(e,r,o=-1){const i=[0,1.1];if(isNaN(e)||isNaN(r)||Math.min(e,r)<i[0]||Math.max(e,r)>i[1])return 0;const a=.56,s=.57,n=.62,l=.65,c=.022,d=1.414,h=1.14,p=1.14,m=.027,g=.027,_=.1414,y=.84,$=.1,k=5e-4;let x=0,I=0,L="BoW";if(e=e>c?e:e+Math.pow(c-e,d),r=r>c?r:r+Math.pow(c-r,d),Math.abs(r-e)<k)return 0;if(r>e)x=(Math.pow(r,a)-Math.pow(e,s))*h,I=x<$?0:x-m;else{L="WoB",x=(Math.pow(r,l)-Math.pow(e,n))*p;let at=Math.max(0,e/y-1)*_;I=x>-$?0:x+g+at}if(o<0)return I*100;if(o==0)return Math.round(Math.abs(I)*100)+"<sub>"+L+"</sub>";if(Number.isInteger(o))return(I*100).toFixed(o);throw"Err-3"}sRGBtoY(e=[0,0,0]){const o=.212647813391364,i=.715179147533615,a=.0721730390750208;function s(n){return Math.pow(n/255,2.4)}return o*s(e[0])+i*s(e[1])+a*s(e[2])}alphaBlend(e=[0,0,0,1],r=[0,0,0],o=!0){if(e[3]){e[3]=Math.max(Math.min(e[3],1),0);let i=1-e[3],a=[0,0,0];for(let s=0;s<3;s++)a[s]=r[s]*i+e[s]*e[3],o&&(a[s]=Math.min(Math.round(a[s]),255));return a}else return e}calcBPCA(e,r,o=-1){let i=NaN,a=this.cus.getRgb255Array(e),s=this.cus.getRgb255Array(r);return a&&s?i=this.BPCAcontrast(this.sRGBtoY(a),this.sRGBtoY(s),o):console.warn("issue calculating BPCA"),i}}class Tg{constructor(){this.bpca=new Pg(F)}getContrast(e,r,o){if(o==="deltaE")return F.calcDeltaE(e,r);if(o==="okca"){const a=F.toHexString(e),s=F.toHexString(r);return!a||!s?null:Lg(a,s)}const i=this.calcRawApcaContrast(e,r);if(i||i===0){if(o==="apca")return parseInt(i.toFixed(0));if(o==="bpca")return this.calcRawBpcaContrast(e,r)}else console.error("Raw APCA contrast was not calculable");return null}calcRawApcaContrast(e,r){return mg(e,r)}calcRawBpcaContrast(e,r){let o=NaN;const i=this.bpca.calcBPCA(e,r),a=F.getRgb255Array(e),s=F.getRgb255Array(r);if(a&&s){const n=this.bpca.sRGBtoY(a),l=this.bpca.sRGBtoY(s);o=parseFloat(this.bpca.bridgeRatio(i,n,l,""))}else console.warn("trouble calculating raw BPCA");return o}}const Ie=new Tg;var Og=Object.defineProperty,Rg=Object.getOwnPropertyDescriptor,Ge=(t,e,r,o)=>{for(var i=o>1?void 0:o?Rg(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(i=(o?s(e,r,i):s(i))||i);return o&&i&&Og(e,r,i),i};let ve=class extends dt{constructor(){super(...arguments),this.colorOne="",this.colorTwo="",this.contrastType="okca",this.debug=!1,this.contrastScore=NaN}createRenderRoot(){return this}updated(t){(t.has("colorOne")||t.has("colorTwo")||t.has("contrastType"))&&this._computeScore()}_computeScore(){const{colorOne:t,colorTwo:e,contrastType:r}=this;if(!t||!e||!r){this.debug&&console.warn("contrast comp missing inputs");return}let o;r==="apca object"?o="apca":r==="deltaE"?o="deltaE":o=r;const i=Ie.getContrast(t,e,o);if(i&&r==="apca object"){this.contrastScore=F.getMinObjectDimension(i);return}this.contrastScore=i??NaN}get contrastAnnouncement(){if(!this.colorOne||!this.colorTwo)return"";const t=this.contrastScore;return this.contrastType==="apca object"?t?`Minimum object dimension: ${t} pixels`:"Contrast too low for any object":isNaN(t)?"Contrast score unavailable":this.contrastType==="deltaE"?`Delta E: ${t}`:`Contrast score: ${t}`}render(){return T`
      <div class="comp-container" aria-hidden="true">
        <div class="score-container">
          <div id="contrast-score" class="score">
            ${this.contrastScore?this.contrastScore:"!"}
          </div>
        </div>
      </div>
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        ${this.contrastAnnouncement}
      </div>
    `}};Ge([P({attribute:"colorone"})],ve.prototype,"colorOne",2);Ge([P({attribute:"colortwo"})],ve.prototype,"colorTwo",2);Ge([P({attribute:"contrasttype"})],ve.prototype,"contrastType",2);Ge([P({type:Boolean})],ve.prototype,"debug",2);Ge([B()],ve.prototype,"contrastScore",2);ve=Ge([Bt("cc-color-contrast")],ve);var Bg=Object.defineProperty,Hg=Object.getOwnPropertyDescriptor,Ht=(t,e,r,o)=>{for(var i=o>1?void 0:o?Hg(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(i=(o?s(e,r,i):s(i))||i);return o&&i&&Bg(e,r,i),i};let St=class extends dt{constructor(){super(...arguments),this.inputId="fg-color",this.inputName="foreground color",this.label="Color",this.color="",this.comparedColor="",this.debug=!1,this.uiColor="",this.uiComparedColor=""}createRenderRoot(){return this}updated(t){t.has("color")&&(this._handleColorChange(this.color),this._updateInputValue(this.color),this._resetUiComparedColor()),t.has("comparedColor")&&(this.uiComparedColor=this.comparedColor)}_handleColorChange(t){this.uiColor=t,this.dispatchEvent(new CustomEvent("selected-color",{detail:t,bubbles:!0,composed:!0}))}_handleInputEvent(t){const r=t.target.value;this._resetUiComparedColor(),this._handleColorChange(r)}_resetUiComparedColor(){this.uiComparedColor="transparent"}_updateInputValue(t){const e=this.querySelector(`#${this.inputId}`);if(!e){this.debug&&console.error(`no input found with id: ${this.inputId}`);return}e.value=t}render(){return T`
      <div class="comp-container">
        <label class="sr-only" for=${this.inputId}>${this.label}</label>
        <input
          type="color"
          id=${this.inputId}
          name=${this.inputName}
          @input=${this._handleInputEvent}
        />
        <div
          class="color-preview"
          style="border-color: ${this.uiComparedColor}; background-color: ${this.uiColor}"
        ></div>
      </div>
    `}};Ht([P({attribute:"inputid"})],St.prototype,"inputId",2);Ht([P({attribute:"inputname"})],St.prototype,"inputName",2);Ht([P()],St.prototype,"label",2);Ht([P()],St.prototype,"color",2);Ht([P({attribute:"comparedcolor"})],St.prototype,"comparedColor",2);Ht([P({type:Boolean})],St.prototype,"debug",2);Ht([B()],St.prototype,"uiColor",2);Ht([B()],St.prototype,"uiComparedColor",2);St=Ht([Bt("cc-color-picker")],St);var Dg=Object.defineProperty,Fg=Object.getOwnPropertyDescriptor,Y=(t,e,r,o)=>{for(var i=o>1?void 0:o?Fg(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(i=(o?s(e,r,i):s(i))||i);return o&&i&&Dg(e,r,i),i};let X=class extends dt{constructor(){super(...arguments),this.id="slider-0",this.name="color-slider",this.label="Lightness",this.color="",this.constantChroma=!1,this.showGradient=!1,this.resetSlider=null,this.debug=!1,this.slideMin=NaN,this.slideMax=NaN,this.slideInterval=NaN,this.value=NaN,this.initValue=NaN,this.devColorVariant="",this.rangeDescId=`slider-range-${Math.random().toString(36).slice(2,9)}`}createRenderRoot(){return this}get inputId(){return`${this.id}-input`}get valueText(){return isNaN(this.value)?"":`${Math.round(this.value*100)}%`}get rangeDescription(){return isNaN(this.slideMin)||isNaN(this.slideMax)?"":`Lightness range: ${Math.round(this.slideMin*100)}% to ${Math.round(this.slideMax*100)}%`}updated(t){if(!(t.has("color")||t.has("showGradient")||t.has("resetSlider")||t.has("constantChroma")))return;if(!this.querySelector(`#cc-${this.id}`)){this.debug&&console.warn("no slide container yet");return}if(!this.color){this.debug&&console.error("no color specified");return}this._getAndSetLightnessRange(this.color,{constantChroma:this.constantChroma}),this._gradient(this.showGradient?"on":"off"),this.resetSlider&&this.initValue&&this._reset()}_sendInitialLightVariant(){this.dispatchEvent(new CustomEvent("color-variant",{detail:this.color,bubbles:!0,composed:!0})),this.debug&&(this.devColorVariant=this.color)}async _getAndSetLightnessRange(t,e){const r=await F.getMinMaxLight(t);if(!r){console.error(`no range object for color ${t}`);return}this._sendInitialLightVariant(),this.slideMin=0,this.slideMax=1,e?.constantChroma&&(this.slideMin=r.lightMin,this.slideMax=r.lightMax),this.slideInterval=(this.slideMax-this.slideMin)/80;const o=r.originalCoords[0];this.initValue=o,this.value=o,this._redefineGradientStops(this.slideMin,this.slideMax)}_handleSliding(t){const e=t.target;if(e&&this.color){const r=parseFloat(e.value);this.value=r;const o=F.createSrgbColor(this.color,r);this.debug&&(console.log(`slide modding ${this.color} to ${o}`),this.devColorVariant=o??""),this.dispatchEvent(new CustomEvent("color-variant",{detail:o,bubbles:!0,composed:!0}))}else console.error("no color specified")}_reset(){const t=this.querySelector(`#${this.inputId}`);if(!t){console.error(`no element found with id: ${this.inputId}`);return}isNaN(this.initValue)||(t.value=this.initValue.toString(),this.value=this.initValue)}_gradient(t){const e=this.querySelector(`#cc-${this.id}`);if(!e){this.debug&&console.warn("no elem to assign gradient to.");return}e.style.background=t==="on"?"var(--gradient-background)":"var(--default-background)"}_redefineGradientStops(t,e){if(!this.color)return;const r=this.querySelector(`#cc-${this.id}`);if(!r)return;const o=["--grad-stop-0","--grad-stop-1","--grad-stop-2","--grad-stop-3","--grad-stop-4","--grad-stop-5"],i=(e-t)/(o.length-1),a=[];for(let s=0;s<o.length;s++){const n=i*s+t;a.push(F.createSrgbColor(this.color,n))}for(let s=0;s<o.length;s++){const n=a[s];n&&r.style.setProperty(o[s],n)}}render(){return T`
      <div id=${"cc-"+this.id} class="comp-container">
        <label for=${this.inputId} class="sr-only">${this.label}</label>
        ${this.slideMin!==this.slideMax?T`
              <span id=${this.rangeDescId} class="sr-only">${this.rangeDescription}</span>
              <input
                type="range"
                name=${this.name}
                id=${this.inputId}
                min=${this.slideMin}
                max=${this.slideMax}
                step=${this.slideInterval}
                .value=${String(this.value)}
                aria-valuetext=${this.valueText}
                aria-describedby=${this.rangeDescId}
                @input=${this._handleSliding}
              />
            `:isNaN(this.slideMin)?"":T`
                <div class="special-case">
                  <div>!</div>
                </div>
              `}
      </div>
      <div class="dev-overlay ${this.debug?"active":""}">
        <h2>dev overlay</h2>
        <div
          class="light-variant-chip"
          style="border-color: ${this.devColorVariant}; background-color: ${this.color}"
        ></div>
      </div>
    `}};Y([P()],X.prototype,"id",2);Y([P()],X.prototype,"name",2);Y([P()],X.prototype,"label",2);Y([P()],X.prototype,"color",2);Y([P({type:Boolean,attribute:"constantchroma"})],X.prototype,"constantChroma",2);Y([P({type:Boolean,attribute:"showgradient"})],X.prototype,"showGradient",2);Y([P({type:Object,attribute:!1})],X.prototype,"resetSlider",2);Y([P({type:Boolean})],X.prototype,"debug",2);Y([B()],X.prototype,"slideMin",2);Y([B()],X.prototype,"slideMax",2);Y([B()],X.prototype,"slideInterval",2);Y([B()],X.prototype,"value",2);Y([B()],X.prototype,"initValue",2);Y([B()],X.prototype,"devColorVariant",2);X=Y([Bt("cc-color-slider")],X);var qg=Object.defineProperty,jg=Object.getOwnPropertyDescriptor,Ro=(t,e,r,o)=>{for(var i=o>1?void 0:o?jg(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(i=(o?s(e,r,i):s(i))||i);return o&&i&&qg(e,r,i),i};let Cr=class extends dt{constructor(){super(...arguments),this.color="",this.label="Copy to Clipboard",this.debug=!1}createRenderRoot(){return this}async copyToClipboard(){if(!this.color){this.debug&&console.warn("no color provided to copy");return}const t=this.color.replace("#","");try{await navigator.clipboard.writeText(t),this.dispatchEvent(new CustomEvent("copy-event",{detail:{copied:!0,color:t},bubbles:!0,composed:!0})),this.debug&&console.log(this.color,"copied to clipboard")}catch(e){this.dispatchEvent(new CustomEvent("copy-event",{detail:{copied:!1,color:t},bubbles:!0,composed:!0})),console.error("Failed to copy text: ",e)}}render(){return T`
      <div class="comp-container">
        <button aria-label=${this.label} ?disabled=${!this.color} @click=${this.copyToClipboard}>
          <div class="svg-container" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" x="0px" y="0px">
              <path
                fill-rule="evenodd"
                d="M384,608 L384,624 L368,624 L368,608 L384,608 Z M370,622 L382,622 L382,610 L370,610 L370,622 Z M362,602 L362,614 L366,614 L366,616 L360,616 L360,600 L376,600 L376,606 L374,606 L374,602 L362,602 Z"
                transform="translate(-360 -600)"
              />
            </svg>
          </div>
        </button>
      </div>
    `}};Ro([P()],Cr.prototype,"color",2);Ro([P()],Cr.prototype,"label",2);Ro([P({type:Boolean})],Cr.prototype,"debug",2);Cr=Ro([Bt("cc-copy-to-clipboard-button")],Cr);var Ug=Object.defineProperty,Vg=Object.getOwnPropertyDescriptor,Al=(t,e,r,o)=>{for(var i=o>1?void 0:o?Vg(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(i=(o?s(e,r,i):s(i))||i);return o&&i&&Ug(e,r,i),i};let xi=class extends dt{constructor(){super(...arguments),this.compact=!1}createRenderRoot(){return this}render(){return T`<slot></slot>`}};Al([P({type:Boolean,reflect:!0})],xi.prototype,"compact",2);xi=Al([Bt("cc-table")],xi);var Gg=Object.defineProperty,Wg=Object.getOwnPropertyDescriptor,Bo=(t,e,r,o)=>{for(var i=o>1?void 0:o?Wg(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(i=(o?s(e,r,i):s(i))||i);return o&&i&&Gg(e,r,i),i};function oi(t){return t==="pass"?"outcome--pass":t==="fail"?"outcome--fail":""}const ze=T`
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
    />
  </svg>
`;let Mr=class extends dt{constructor(){super(...arguments),this.colorOne="",this.colorTwo="",this.debug=!1}createRenderRoot(){return this}get colorOneMeta(){return this.colorOne?F.getColorMeta(this.colorOne):null}get colorTwoMeta(){return this.colorTwo?F.getColorMeta(this.colorTwo):null}get differences(){const t={deltaE:NaN,okca:NaN,wcag2Old:NaN,wcag2New:NaN,apca:NaN};return!this.colorOne||!this.colorTwo||(t.deltaE=F.calcDeltaE(this.colorOne,this.colorTwo)??NaN,t.okca=Ie.getContrast(this.colorOne,this.colorTwo,"okca")??NaN,t.wcag2New=Ie.getContrast(this.colorOne,this.colorTwo,"bpca")??NaN,t.wcag2Old=F.calcWcag2(this.colorOne,this.colorTwo)??NaN,t.apca=Ie.getContrast(this.colorOne,this.colorTwo,"apca")??NaN),t}get successes(){const t={text:null,largeText:null,nonText:null,objectMinDimension:NaN};if(!this.colorOne||!this.colorTwo)return t;const e=Ie.getContrast(this.colorOne,this.colorTwo,"okca"),r=Ie.getContrast(this.colorOne,this.colorTwo,"apca");if(e==null||!r||e<0||Math.abs(r)<0)return t;t.text=e>=4.5?"pass":"fail",t.largeText=e>=3?"pass":"fail",t.nonText=e>=3?"pass":"fail";const o=F.getMinObjectDimension(r);return t.objectMinDimension=Number.isNaN(o)?"invisible":o,t}_emitNote(t){this.dispatchEvent(new CustomEvent("note-requested",{detail:t,bubbles:!0,composed:!0}))}render(){const t=this.successes,e=this.differences,r=this.colorOneMeta,o=this.colorTwoMeta;return T`
      <div class="comp-container">
        <div>
          <h3>Successes and Minimums</h3>
          <cc-table .compact=${!0}>
            <table>
              <caption class="sr-only">Various pass, fails or minimum dimensions related to visual elements.</caption>
              <thead class="sr-only"><tr><th>Criteria</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td class="label">Text</td><td class="numeric ${oi(t.text)}">${t.text}</td></tr>
                <tr><td class="label">Large Text</td><td class="numeric ${oi(t.largeText)}">${t.largeText}</td></tr>
                <tr><td class="label">Non-text</td><td class="numeric ${oi(t.nonText)}">${t.nonText}</td></tr>
                <tr>
                  <td class="label label--with-info">
                    Object
                    <candor-tooltip text="About Object" position="right">
                      <candor-button variant="ghost" class="button--icon" aria-label="About Object" @click=${()=>this._emitNote("apca object")}>${ze}</candor-button>
                    </candor-tooltip>
                  </td>
                  <td class="numeric">${t.objectMinDimension}</td>
                </tr>
              </tbody>
            </table>
          </cc-table>
        </div>

        <div>
          <h3>Differences</h3>
          <cc-table .compact=${!0}>
            <table>
              <caption class="sr-only">Differences between Foreground Color and Background Color.</caption>
              <thead class="sr-only"><tr><th>Measurement</th><th>Value</th></tr></thead>
              <tbody>
                <tr>
                  <td class="label label--with-info">
                    Delta E
                    <candor-tooltip text="About Delta E" position="right">
                      <candor-button variant="ghost" class="button--icon" aria-label="About Delta E" @click=${()=>this._emitNote("deltaE")}>${ze}</candor-button>
                    </candor-tooltip>
                  </td>
                  <td class="numeric">${e.deltaE}</td>
                </tr>
                <tr>
                  <td class="label label--with-info">
                    OKCA
                    <candor-tooltip text="About OKCA" position="right">
                      <candor-button variant="ghost" class="button--icon" aria-label="About OKCA" @click=${()=>this._emitNote("okca")}>${ze}</candor-button>
                    </candor-tooltip>
                  </td>
                  <td class="numeric">${e.okca}</td>
                </tr>
                <tr>
                  <td class="label label--with-info">
                    Perceptual contrast
                    <candor-tooltip text="About Perceptual contrast" position="right">
                      <candor-button variant="ghost" class="button--icon" aria-label="About Perceptual contrast" @click=${()=>this._emitNote("apca")}>${ze}</candor-button>
                    </candor-tooltip>
                  </td>
                  <td class="numeric">${e.apca}</td>
                </tr>
                <tr>
                  <td class="label label--with-info">
                    WCAG 2 compatible
                    <candor-tooltip text="About WCAG 2 compatible" position="right">
                      <candor-button variant="ghost" class="button--icon" aria-label="About WCAG 2 compatible" @click=${()=>this._emitNote("bpca")}>${ze}</candor-button>
                    </candor-tooltip>
                  </td>
                  <td class="numeric">${e.wcag2New}</td>
                </tr>
                <tr>
                  <td class="label label--with-info">
                    WCAG 2
                    <candor-tooltip text="About WCAG 2" position="right">
                      <candor-button variant="ghost" class="button--icon" aria-label="About WCAG 2" @click=${()=>this._emitNote("wcag2")}>${ze}</candor-button>
                    </candor-tooltip>
                  </td>
                  <td class="numeric">${e.wcag2Old}</td>
                </tr>
              </tbody>
            </table>
          </cc-table>
        </div>

        <div>
          <h3>Foreground Color</h3>
          <cc-table .compact=${!0}>
            <table>
              <caption class="sr-only">Foreground Color Metadata</caption>
              <thead class="sr-only"><tr><th>Measurement</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td class="label">Saturation</td><td class="numeric">${r?.saturation}</td></tr>
                <tr><td class="label">Lightness</td><td class="numeric">${r?.lightness}</td></tr>
                <tr><td class="label">Chroma</td><td class="numeric">${r?.chroma}</td></tr>
                <tr><td class="label">Hue</td><td class="numeric">${r?.hue}</td></tr>
              </tbody>
            </table>
          </cc-table>
        </div>

        <div>
          <h3>Background Color</h3>
          <cc-table .compact=${!0}>
            <table>
              <caption class="sr-only">Background Color Metadata</caption>
              <thead class="sr-only"><tr><th>Measurement</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td class="label">Saturation</td><td class="numeric">${o?.saturation}</td></tr>
                <tr><td class="label">Lightness</td><td class="numeric">${o?.lightness}</td></tr>
                <tr><td class="label">Chroma</td><td class="numeric">${o?.chroma}</td></tr>
                <tr><td class="label">Hue</td><td class="numeric">${o?.hue}</td></tr>
              </tbody>
            </table>
          </cc-table>
        </div>
      </div>
    `}};Bo([P({attribute:"colorone"})],Mr.prototype,"colorOne",2);Bo([P({attribute:"colortwo"})],Mr.prototype,"colorTwo",2);Bo([P({type:Boolean})],Mr.prototype,"debug",2);Mr=Bo([Bt("cc-metadata")],Mr);var Xg=Object.defineProperty,Kg=Object.getOwnPropertyDescriptor,Ho=(t,e,r,o)=>{for(var i=o>1?void 0:o?Kg(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(i=(o?s(e,r,i):s(i))||i);return o&&i&&Xg(e,r,i),i};let Ar=class extends dt{constructor(){super(...arguments),this.color="",this.debug=!1,this.dataStruct=[],this.minDelta=11}createRenderRoot(){return this}updated(t){t.has("color")&&this._getTableData(this.color)}get tonePickerRows(){const t=this.dataStruct;if(!t.length)return[];const{lightnesses:e,chromas:r,cellMap:o}=this._buildIndex(t);return e.map(i=>({rowHeader:i.toFixed(2),cells:r.map(a=>{const s=o.get(this._cellKey(i,a));return s?{label:s.color,background:s.color,value:{l:s.lightness,c:s.chroma,h:s.hue},disabled:!1}:{label:"",disabled:!0}})}))}get tonePickerHeaders(){const t=this.dataStruct;if(!t.length)return[];const{chromas:e}=this._buildIndex(t);return e.map(r=>r.toFixed(2))}get selectedOklch(){const t=this.color;if(!t)return null;try{return F.hexToOklchString(t)}catch{return null}}_onTonePickerSelect(t){const{value:e,l:r,c:o}=t.detail,{cellMap:i}=this._buildIndex(this.dataStruct);for(const[,s]of i)if(Math.abs(s.lightness-r)<.001&&Math.abs(s.chroma-o)<.001){this.dispatchEvent(new CustomEvent("selected-color",{detail:s,bubbles:!0,composed:!0}));return}const a={color:e,lightness:NaN,chroma:NaN,hue:NaN,deltaE:NaN,deltaLightness:NaN,deltaChroma:NaN};this.dispatchEvent(new CustomEvent("selected-color",{detail:a,bubbles:!0,composed:!0}))}_getTableData(t){if(!t){this.debug&&console.warn("no color for palette table"),this.dataStruct=[];return}this.dataStruct=F.generateAdaptiveVariants(t,this.minDelta)}_buildIndex(t){const e=new Map,r=new Set,o=new Set;for(const s of t)for(const n of s)r.add(n.chroma),o.add(n.lightness),e.set(this._cellKey(n.lightness,n.chroma),n);const i=[...r].sort((s,n)=>s-n);return{lightnesses:[...o].sort((s,n)=>n-s),chromas:i,cellMap:e}}_cellKey(t,e){return`${Math.round(t*1e3)},${Math.round(e*1e3)}`}_parseOklch(t){const e=t.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);return e?{l:parseFloat(e[1]),c:parseFloat(e[2]),h:parseFloat(e[3])}:null}render(){return T`
      <div class="comp-container">
        ${this.tonePickerRows.length?T`
              <candor-tone-picker
                .rows=${this.tonePickerRows}
                .columnHeaders=${this.tonePickerHeaders}
                size="small"
                hide-headers
                hide-ui
                selected-value=${this.selectedOklch??""}
                aria-label=${"Color tones — hue "+(this.dataStruct[0]?.[0]?.hue?.toFixed(0)??"")+"°"}
                @color-select=${this._onTonePickerSelect}
              ></candor-tone-picker>
            `:""}
      </div>
    `}};Ho([P()],Ar.prototype,"color",2);Ho([P({type:Boolean})],Ar.prototype,"debug",2);Ho([B()],Ar.prototype,"dataStruct",2);Ar=Ho([Bt("cc-palette-table")],Ar);var Zg=Object.defineProperty,Yg=Object.getOwnPropertyDescriptor,yt=(t,e,r,o)=>{for(var i=o>1?void 0:o?Yg(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(i=(o?s(e,r,i):s(i))||i);return o&&i&&Zg(e,r,i),i};const Jg={okca:"OKCA",apca:"Perceptual contrast",bpca:"WCAG 2 compatible","apca object":"Object",deltaE:"Delta E",accessibility:"Screen reader and low vision workflows",wcag2:"WCAG 2",constantChroma:"Constant chroma",showGradient:"Show Gradient"};let pt=class extends dt{constructor(){super(...arguments),this.fgColor="",this.bgColor="",this.fgComparedColor="",this.bgComparedColor="",this.contrastType="okca",this.constantChroma=!0,this.showGradient=!0,this.activeNoteModal=null,this.currentAlertMessage={message:""},this.resetSlider=null,this.isInitializing=!0,this._INFO_SVG=T`
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  `,this._ACCESSIBILITY_SVG=T`
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path
        d="M100,36a28,28,0,1,1,28,28A28,28,0,0,1,100,36ZM227.6,92.57A15.7,15.7,0,0,0,212,80H44a16,16,0,0,0-6.7,30.53l.06,0,53.89,23.73-21.92,83.3a16,16,0,0,0,7.9,20.91A15.83,15.83,0,0,0,84,240a16,16,0,0,0,14.44-9.06L128,180l29.58,51a16,16,0,0,0,29.07-13.35l-21.92-83.3,54-23.76A15.7,15.7,0,0,0,227.6,92.57Z"
      />
    </svg>
  `}createRenderRoot(){return this}get noteModalTitle(){const t=this.activeNoteModal;return t?Jg[t]??"":""}connectedCallback(){super.connectedCallback(),this._loadStateFromUrl()||this._setRandomColorPair(!0),setTimeout(()=>{this.isInitializing=!1})}_updateUrl(){if(this.isInitializing)return;const t=new URLSearchParams;this.fgColor&&t.set("fg",this.fgColor),this.bgColor&&t.set("bg",this.bgColor),this.contrastType!=="okca"&&t.set("type",this.contrastType),this.constantChroma||t.set("chroma","false"),this.showGradient||t.set("gradient","false");const e=t.toString(),r=e?`?${e}`:"/";window.history.replaceState(null,"",r)}_loadStateFromUrl(){const t=new URLSearchParams(window.location.search),e=t.get("fg"),r=t.get("bg"),o=t.get("type"),i=t.get("chroma"),a=t.get("gradient");let s=!1;return e&&(this.fgColor=e,s=!0),r&&(this.bgColor=r,s=!0),o&&["apca","bpca","apca object","deltaE","okca"].includes(o)&&(this.contrastType=o),i!==null&&(this.constantChroma=i!=="false"),a!==null&&(this.showGradient=a!=="false"),s}_handleFgColorInput(t){this.fgColor=t.detail,this._updateUrl()}_handleBgColorInput(t){this.bgColor=t.detail,this._updateUrl()}_handleFgSliderInput(t){t.detail&&(this.fgComparedColor=t.detail)}_handleBgSliderInput(t){t.detail&&(this.bgComparedColor=t.detail)}_handleCopyEvent(t){t.detail.copied?this._alertUser({message:`${t.detail.color} copied to clipboard.`}):console.error("color copy error.")}_handleFgPaletteSelect(t){const e=t.detail;this.fgColor=e.color,this._alertUser({message:`Color picker One changed to ${e.color}`})}_handleBgPaletteSelect(t){const e=t.detail;this.bgColor=e.color,this._alertUser({message:`Color picker Two changed to ${e.color}`})}_toggleConstantChroma(t){this.constantChroma=t.detail,this._resetSliders(),this._updateUrl()}_toggleShowGradient(t){this.showGradient=t.detail,this._updateUrl()}_swapColors(){if(!this.fgColor||!this.bgColor)return;const t=this.fgColor;this.fgColor=this.bgColor,this.bgColor=t,this._alertUser({message:"Swapped foreground and background colors."}),this._updateUrl()}async _setRandomColorPair(t=!1){const e=await F.getRandomColorPair(),r=await F.adjustColorPairForPresentation(e);setTimeout(()=>{this.fgColor=r[0],this.bgColor=r[1],t||this._alertUser({message:`Random color pair generated: ${r[0]}, and ${r[1]}`}),this._updateUrl()},0)}_resetSliders(){this.resetSlider={reset:!0},this._alertUser({message:"Resetted color sliders to initial states."})}async _matchChromas(){if(!this.fgColor||!this.bgColor)return;const t=await F.matchChromas([this.fgColor,this.bgColor]);t.success&&t.colors&&t.chroma?(this.fgColor=t.colors[0],this.bgColor=t.colors[1],this._alertUser({message:"Chroma matched foreground and background colors."}),this._updateUrl()):this._alertUser({message:"Unable to match chroma across colors."})}_alertUser(t){this.currentAlertMessage={...t}}_handleNoteRequested(t){this.activeNoteModal=t.detail}_handleModalClose(){this.activeNoteModal=null}_handleContrastTypeChange(t){this.contrastType=t.detail,this._updateUrl()}updated(t){super.updated(t),this._applyRovingTabIndex(),t.has("activeNoteModal")&&this._setPageScrollLock(this.activeNoteModal!==null)}disconnectedCallback(){this._setPageScrollLock(!1),super.disconnectedCallback()}_setPageScrollLock(t){const e=document.documentElement;if(t){const r=window.innerWidth-e.clientWidth;e.style.paddingInlineEnd=`${r}px`,e.style.overflow="hidden"}else e.style.overflow="",e.style.paddingInlineEnd=""}async _applyRovingTabIndex(){const t=Array.from(this.querySelectorAll('candor-radio[name="contrastType"]'));if(!t.length)return;await Promise.all(t.map(o=>o.updateComplete??Promise.resolve()));const e=t.findIndex(o=>o.getAttribute("value")===this.contrastType),r=e===-1?0:e;t.forEach((o,i)=>{const a=o.shadowRoot?.querySelector("input");a&&(a.tabIndex=i===r?0:-1)})}render(){return T`
      <a class="sr-only" href="#main-content">Skip to main content</a>
      <!-- tabindex="-1" so the skip link actually moves focus. Without it the
           fragment only sets Chrome's sequential-focus starting point, which
           puts the *next* Tab in the right place but leaves the virtual cursor
           where it was on AT that does not implement that behaviour. -->
      <main class="app-container" id="main-content" tabindex="-1">
        <div class="primary-stack">
          <!-- Not a candor-card: the card sets overflow: hidden, which makes it a
               scroll container, and a position: sticky descendant is constrained
               to its nearest scrollport — so the header below stuck to the card,
               which scrolls away with the page, rather than to the viewport.
               See app.scss. -->
          <div class="title-and-sliders">
            <div class="title-and-score">
              <h1>Colors Contrast</h1>
              <cc-color-contrast
                colorone=${this.fgComparedColor}
                colortwo=${this.bgComparedColor}
                contrasttype=${this.contrastType}
              ></cc-color-contrast>
            </div>

            <div class="title-and-sliders__body">
              <candor-accordion-item heading="How to use this app." variant="quiet">
                <p>
                  <span class="visual-header">Quick Start:</span>
                  Input a foreground and background color. Use the sliders to adjust tone until you reach
                  your target contrast, then copy each color to the clipboard.
                </p>
                <candor-button
                  variant="ghost"
                  size="small"
                  class="note-button"
                  @click=${()=>this.activeNoteModal="accessibility"}
                >
                  ${this._ACCESSIBILITY_SVG} Screen reader and low vision workflows
                </candor-button>
              </candor-accordion-item>

              <h2 class="sr-only">Main Color Controls</h2>

              <h3>Foreground Color</h3>

              <div class="slide-group">
                <candor-tooltip text="Choose foreground color" position="right">
                  <cc-color-picker
                    inputid="cp-0"
                    inputname="Foreground Color"
                    label="Foreground Color"
                    comparedcolor=${this.fgComparedColor}
                    color=${this.fgColor}
                    @selected-color=${this._handleFgColorInput}
                  ></cc-color-picker>
                </candor-tooltip>
                <cc-color-slider
                  id="slider-0"
                  name="Foreground Slider"
                  label="Foreground lightness"
                  color=${this.fgColor}
                  ?constantchroma=${this.constantChroma}
                  ?showgradient=${this.showGradient}
                  .resetSlider=${this.resetSlider}
                  @color-variant=${this._handleFgSliderInput}
                ></cc-color-slider>
                <candor-tooltip text="Copy foreground color" position="left">
                  <cc-copy-to-clipboard-button
                    color=${this.fgComparedColor}
                    label="Copy foreground color"
                    @copy-event=${this._handleCopyEvent}
                  ></cc-copy-to-clipboard-button>
                </candor-tooltip>
              </div>

              <candor-accordion-item heading="Foreground LCH Limits" variant="subtle">
                <div class="pallette-viz-content">
                  <cc-palette-table
                    color=${this.fgColor}
                    @selected-color=${this._handleFgPaletteSelect}
                  ></cc-palette-table>
                </div>
                <p class="lch-limits-intro">
                  Variants of your foreground color within the sRGB gamut. Hue constrains your lightness
                  and chroma options — for example, strong yellows are only possible at high lightness.
                </p>
              </candor-accordion-item>

              <h3>Background Color</h3>

              <div class="slide-group">
                <candor-tooltip text="Choose background color" position="right">
                  <cc-color-picker
                    inputid="cp-1"
                    inputname="Background Color"
                    label="Background Color"
                    comparedcolor=${this.bgComparedColor}
                    color=${this.bgColor}
                    @selected-color=${this._handleBgColorInput}
                  ></cc-color-picker>
                </candor-tooltip>
                <cc-color-slider
                  id="slider-1"
                  name="Background Slider"
                  label="Background lightness"
                  color=${this.bgColor}
                  ?constantchroma=${this.constantChroma}
                  ?showgradient=${this.showGradient}
                  .resetSlider=${this.resetSlider}
                  @color-variant=${this._handleBgSliderInput}
                ></cc-color-slider>
                <candor-tooltip text="Copy background color" position="left">
                  <cc-copy-to-clipboard-button
                    color=${this.bgComparedColor}
                    label="Copy background color"
                    @copy-event=${this._handleCopyEvent}
                  ></cc-copy-to-clipboard-button>
                </candor-tooltip>
              </div>

              <candor-accordion-item heading="Background LCH Limits" variant="subtle">
                <div class="pallette-viz-content">
                  <cc-palette-table
                    color=${this.bgColor}
                    @selected-color=${this._handleBgPaletteSelect}
                  ></cc-palette-table>
                </div>
                <p class="lch-limits-intro">
                  Variants of your background color within the sRGB gamut. Hue constrains your lightness
                  and chroma options — for example, strong yellows are only possible at high lightness.
                </p>
              </candor-accordion-item>
            </div>
          </div>

          <!-- Not a candor-card: the card clips these tooltips. See app.scss. -->
          <div class="quick-actions">
            <div class="quick-actions__buttons">
              <candor-tooltip text="Swap foreground and background">
                <candor-button
                  variant="tertiary"
                  class="button--icon"
                  aria-label="Swap Selected Colors"
                  ?disabled=${!this.fgColor||!this.bgColor}
                  @click=${this._swapColors}
                >
                  <svg class="swap-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <g>
                      <path d="M6.29,8.71a1,1,0,0,1,0-1.42l4-4a1,1,0,1,1,1.42,1.42L9.41,7H19a7,7,0,0,1,7,7,1,1,0,0,1-2,0,5,5,0,0,0-5-5H9.41l2.3,2.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0ZM21.71,19.29a1,1,0,0,0-1.42,1.42L22.59,23H13a5,5,0,0,1-5-5,1,1,0,0,0-2,0,7,7,0,0,0,7,7h9.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,0-1.42Z" />
                    </g>
                  </svg>
                </candor-button>
              </candor-tooltip>

              <candor-tooltip text="Match chromas">
                <candor-button variant="tertiary" class="button--icon" aria-label="Harmonize Color Pair To Same Chroma" @click=${this._matchChromas}>
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xml:space="preserve">
                    <path d="M43,39c1.66,0,3,1.34,3,3s-1.34,3-3,3H33c-1.66,0-3-1.34-3-3s1.34-3,3-3H43z" />
                    <path d="M20,17v3h-3c-1.66,0-3,1.34-3,3s1.34,3,3,3h3v3c0,1.66,1.34,3,3,3s3-1.34,3-3v-3h3c1.66,0,3-1.34,3-3s-1.34-3-3-3h-3v-3  c0-1.66-1.34-3-3-3S20,15.34,20,17z M56,12v40c0,2.21-1.79,4-4,4H12c-2.21,0-4-1.79-4-4V12c0-2.21,1.79-4,4-4h40  C54.21,8,56,9.79,56,12z M50,50V14L14,50H50z" />
                  </svg>
                </candor-button>
              </candor-tooltip>

              <candor-tooltip text="Reset sliders">
                <candor-button variant="tertiary" class="button--icon" aria-label="Reset Color Sliders" @click=${this._resetSliders}>
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12,3A8.92277,8.92277,0,0,0,4.5,7.05823V5H3v5H8V8.5H5.38165A7.4775,7.4775,0,1,1,4.5,12H3a9,9,0,1,0,9-9Z" />
                  </svg>
                </candor-button>
              </candor-tooltip>

              <candor-tooltip text="New random pair">
                <candor-button variant="tertiary" class="button--icon" aria-label="Create Random Color Pair" @click=${()=>this._setRandomColorPair()}>
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333 333" fill-rule="evenodd" clip-rule="evenodd">
                    <g>
                      <rect fill="none" stroke="currentColor" stroke-width="14" x="24" y="167" width="138" height="138" rx="26" ry="26" />
                      <g>
                        <g>
                          <circle cx="118" cy="199" r="12" />
                          <circle cx="118" cy="236" r="12" />
                          <circle cx="118" cy="272" r="12" />
                        </g>
                        <g>
                          <circle cx="67" cy="199" r="12" />
                          <circle cx="67" cy="236" r="12" />
                          <circle cx="67" cy="272" r="12" />
                        </g>
                      </g>
                      <rect fill="none" stroke="currentColor" stroke-width="14" transform="matrix(0.707107 -0.707107 0.707107 0.707107 125.466 115.35)" width="138" height="138" rx="26" ry="26" />
                      <circle transform="matrix(0.876112 -0.876112 0.876112 0.876112 222.904 115.349)" r="10" />
                    </g>
                  </svg>
                </candor-button>
              </candor-tooltip>
            </div>
          </div>

          <candor-card class="options" variant="elevated" padding="md">
            <h2>Options</h2>

            <candor-accordion-item heading="Change how Colors Contrast works.">
              <!-- fieldset + legend is Candor's documented pattern for a radio group,
                   and the legend gives each option its question context for screen
                   readers. Nothing else goes in these rows: the per-option "About"
                   buttons live on the matching rows of cc-metadata, which is where the
                   value each one explains is actually shown. Keeping them out of here
                   is what makes the group a contiguous run of radios. -->
              <fieldset class="radio-fieldset">
                <legend>Colors Contrast Value</legend>
                <div class="radio-section">
                  ${[["okca","OKCA"],["apca","Perceptual"],["bpca","WCAG 2 compatible"],["apca object","Object"],["deltaE","Delta E"]].map(([t,e])=>T`
                      <candor-radio
                        name="contrastType"
                        value=${t}
                        label=${e}
                        ?checked=${this.contrastType===t}
                        @change=${this._handleContrastTypeChange}
                      ></candor-radio>
                    `)}
                </div>
                <candor-text class="radio-group-note" variant="caption" size="sm" color="secondary">
                  Info buttons in Color Metadata explain what each value measures.
                </candor-text>
              </fieldset>

              <div>
                <h3>Color Sliders</h3>
                <div class="checkbox-section">
                  <div class="checkbox-item">
                    <candor-checkbox
                      id="option-const-chroma"
                      name="Constant Chroma Toggle"
                      label="Constant chroma"
                      ?checked=${this.constantChroma}
                      @change=${this._toggleConstantChroma}
                    ></candor-checkbox>
                    <candor-tooltip text="About Constant chroma" position="left">
                      <candor-button variant="ghost" class="button--icon" aria-label="About Constant chroma" @click=${()=>this.activeNoteModal="constantChroma"}>
                        ${this._INFO_SVG}
                      </candor-button>
                    </candor-tooltip>
                  </div>
                  <div class="checkbox-item">
                    <candor-checkbox
                      id="option-show-grad"
                      name="Show Gradient Toggle"
                      label="Show Gradient"
                      ?checked=${this.showGradient}
                      @change=${this._toggleShowGradient}
                    ></candor-checkbox>
                    <candor-tooltip text="About Show Gradient" position="left">
                      <candor-button variant="ghost" class="button--icon" aria-label="About Show Gradient" @click=${()=>this.activeNoteModal="showGradient"}>
                        ${this._INFO_SVG}
                      </candor-button>
                    </candor-tooltip>
                  </div>
                </div>
              </div>
            </candor-accordion-item>
          </candor-card>
        </div>

        <candor-card class="metadata" variant="elevated" padding="md">
          <h2 id="color-metadata">Color Metadata</h2>
          <candor-accordion-item heading="Descriptive data about your inputted colors." ?open=${!0}>
            <cc-metadata
              colorone=${this.fgComparedColor}
              colortwo=${this.bgComparedColor}
              @note-requested=${this._handleNoteRequested}
            ></cc-metadata>
          </candor-accordion-item>
        </candor-card>

        <candor-card class="contact" variant="elevated" padding="md">
          <div class="contact__body">
            <h2>Contact Information and Feedback</h2>
            <p>
              Made by <a href="https://github.com/pawn002" aria-label="pawn002 on GitHub (external link)">pawn002</a>, who would appreciate
              <a href="https://github.com/pawn002/color-pair-quick-iterator/issues" aria-label="bug reports and feature requests for this app on GitHub (external link)">
                bug reports and feature requests for this app</a>
              to help improve its Accessibility.
            </p>
          </div>
        </candor-card>

        <candor-modal
          heading=${this.noteModalTitle}
          ?open=${this.activeNoteModal!==null}
          @close=${this._handleModalClose}
        >
          ${this.activeNoteModal==="okca"?T`<p>A WCAG-compatible ratio (1–21) in OKLCH color space. Unlike WCAG 2, OKCA is polarity-aware — light-on-dark and dark-on-light score differently, topping out at 20.9 and 20 respectively. Chroma compression reduces scores for saturated lighter colors (e.g. vivid pink on dark), addressing common WCAG false passes. Scores are always at or below the WCAG 2 equivalent — the 20.9 ceiling is what keeps that strict.</p>`:""}
          ${this.activeNoteModal==="apca"?T`<p>Gauges inclusive contrast better than WCAG 2. For more information on why, refer to the Myndex article, <a href="https://git.apcacontrast.com/documentation/WhyAPCA.html">Why APCA?</a></p>`:""}
          ${this.activeNoteModal==="bpca"?T`<p>A score compatible with use for WCAG 2.x success criteria. This score meets or exceeds WCAG 2 scores to better include those with atypical vision.</p>`:""}
          ${this.activeNoteModal==="apca object"?T`<p>Displays the smallest pixel dimension the current contrast level supports, or <strong>!</strong> when contrast is too low for any object.</p>`:""}
          ${this.activeNoteModal==="deltaE"?T`<p>A measure of the perceptual difference between two colors. Unlike contrast ratios, Delta E quantifies how different two colors appear regardless of their lightness relationship. Values range from 0 (identical) upward, where higher values indicate greater perceptual difference.</p>`:""}
          ${this.activeNoteModal==="wcag2"?T`<p>This score is for reference only — do not use it for judging inclusive contrast.</p>`:""}
          ${this.activeNoteModal==="constantChroma"?T`<p>Constrains sliders to tones that preserve your input color's chroma and hue. Disable to access a wider tonal range, though some generated tones may clash with your original color. When disabled, the Show Gradient option ranges from black to white.</p>`:""}
          ${this.activeNoteModal==="showGradient"?T`<p>Renders a tone gradient behind the slider inputs. The gradient shows the tonal possibilities of your inputted color.</p>`:""}
          ${this.activeNoteModal==="accessibility"?T`
                <p><span class="visual-header">Screen Reader Users:</span> Input a Foreground Color and a Background Color in the Main Color Controls section. Adjust colors lighter and darker using the sliders — the contrast score is announced automatically as you move them. Check full color descriptions and all contrast scores in the Color Metadata section, which is open by default.</p>
                <p><span class="visual-header">LCH Limits Grid:</span> Each color section has a collapsible LCH Limits accordion. Inside is a tone grid — navigate it with arrow keys, activate a tone with Enter or Space. Blank cells are outside the sRGB gamut. The selected tone is announced when activated.</p>
                <p><span class="visual-header">Low Vision Users:</span> Colors Contrast is designed to remain usable at high browser zoom — the contrast value, color inputs, sliders, and copy buttons stay visible.</p>
                <p><span class="visual-header">Random Color Pairs:</span> The app starts with a random passing pair. Use the sliders to generate tones for each contrast level you need, or swap foreground and background for a dark-mode variant.</p>
              `:""}
        </candor-modal>

      </main>

      <!-- Outside <main>, and that placement is load-bearing. cc-alert renders a
           candor-toast-container, which is position: fixed — but .app-container
           centres itself with translateX(-50%), and a transformed ancestor
           becomes the containing block for fixed descendants. Inside main the
           toast pinned to the bottom of the *document* instead of the viewport,
           1379px below the fold. The old wrapper used position: sticky, which is
           why this never came up before. -->
      <cc-alert .alertMessage=${this.currentAlertMessage}></cc-alert>
    `}};yt([B()],pt.prototype,"fgColor",2);yt([B()],pt.prototype,"bgColor",2);yt([B()],pt.prototype,"fgComparedColor",2);yt([B()],pt.prototype,"bgComparedColor",2);yt([B()],pt.prototype,"contrastType",2);yt([B()],pt.prototype,"constantChroma",2);yt([B()],pt.prototype,"showGradient",2);yt([B()],pt.prototype,"activeNoteModal",2);yt([B()],pt.prototype,"currentAlertMessage",2);yt([B()],pt.prototype,"resetSlider",2);pt=yt([Bt("cc-app")],pt);
