(()=>{var e={};e.id=792,e.ids=[792],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},79428:e=>{"use strict";e.exports=require("buffer")},55511:e=>{"use strict";e.exports=require("crypto")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},8086:e=>{"use strict";e.exports=require("module")},91645:e=>{"use strict";e.exports=require("net")},21820:e=>{"use strict";e.exports=require("os")},33873:e=>{"use strict";e.exports=require("path")},19771:e=>{"use strict";e.exports=require("process")},27910:e=>{"use strict";e.exports=require("stream")},41204:e=>{"use strict";e.exports=require("string_decoder")},66136:e=>{"use strict";e.exports=require("timers")},34631:e=>{"use strict";e.exports=require("tls")},83997:e=>{"use strict";e.exports=require("tty")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},78474:e=>{"use strict";e.exports=require("node:events")},73024:e=>{"use strict";e.exports=require("node:fs")},51455:e=>{"use strict";e.exports=require("node:fs/promises")},76760:e=>{"use strict";e.exports=require("node:path")},57075:e=>{"use strict";e.exports=require("node:stream")},46193:e=>{"use strict";e.exports=require("node:string_decoder")},73136:e=>{"use strict";e.exports=require("node:url")},99200:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>c,pages:()=>d,routeModule:()=>p,tree:()=>u});var s=r(27739),i=r(97780),n=r(54678),o=r.n(n),a=r(95105),l={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);r.d(t,l);let u=["",{children:["admin",{children:["comment",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,68731)),"C:\\Users\\v_huyilin\\Desktop\\hyl\\elin-blog\\src\\app\\admin\\comment\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,40594)),"C:\\Users\\v_huyilin\\Desktop\\hyl\\elin-blog\\src\\app\\admin\\layout.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,60975))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,46934)),"C:\\Users\\v_huyilin\\Desktop\\hyl\\elin-blog\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,53234,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,11955,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,18088,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,60975))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["C:\\Users\\v_huyilin\\Desktop\\hyl\\elin-blog\\src\\app\\admin\\comment\\page.tsx"],c={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:i.RouteKind.APP_PAGE,page:"/admin/comment/page",pathname:"/admin/comment",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},92667:(e,t,r)=>{Promise.resolve().then(r.bind(r,40594))},69107:(e,t,r)=>{Promise.resolve().then(r.bind(r,21474))},26900:()=>{},79636:()=>{},21474:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>k});var s=r(29081),i=r(30140),n=r(48013),o=r(94299),a=r(26945),l=r(29954),u=r(91838),d=r(47328),c=r(81713),p=r(12554),m=r(56891),x=r(56593),h=r(29625),b=r.n(h),y=r(84025);r(91633);let{Header:v,Sider:f,Content:g}=u.A,q=[{label:"总览",icon:(0,s.jsx)(n.A,{}),key:"/admin"},{label:"文章管理",icon:(0,s.jsx)(x.Wk,{}),key:"/admin/article"},{label:"友情链接管理",key:"/admin/link",icon:(0,s.jsx)(x.qY,{})},{label:"留言板管理",key:"/admin/comment",icon:(0,s.jsx)(x.Tw,{})}],k=({children:e})=>{let[t,r]=(0,i.useState)(!1),{token:{colorBgContainer:n,borderRadiusLG:x}}=d.A.useToken(),h=(0,m.useRouter)(),k=(0,m.usePathname)();return(0,s.jsx)(c.Ay,{locale:y.A,children:(0,s.jsxs)(u.A,{className:"h-screen",children:[(0,s.jsxs)(f,{trigger:null,collapsible:!0,collapsed:t,children:[(0,s.jsx)("div",{className:b().adminLayout,style:{backgroundColor:"rgba(255, 255, 255, .2)"},children:t?"Elin":"Elin's Blog 后台"}),(0,s.jsx)(p.A,{theme:"dark",mode:"inline",defaultSelectedKeys:[k],items:q,onSelect:e=>h.push(e.key)})]}),(0,s.jsxs)(u.A,{children:[(0,s.jsxs)(v,{style:{background:n},className:"flex justify-between items-center px-4",children:[(0,s.jsx)("button",{className:"btn btn-ghost",onClick:()=>r(!t),children:t?(0,s.jsx)(o.A,{}):(0,s.jsx)(a.A,{})}),(0,s.jsx)("button",{className:"btn btn-ghost",onClick:()=>{h.push("/")},children:(0,s.jsx)(l.A,{})})]}),(0,s.jsx)(g,{style:{margin:"24px 16px",padding:24,minHeight:280,background:n,borderRadius:x},children:e})]})]})})}},29625:e=>{e.exports={adminLayout:"styles_adminLayout__NIiKe"}},68731:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var s=r(41169);let i=function(){return(0,s.jsx)("div",{children:"Comment"})}},40594:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(99847).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\v_huyilin\\\\Desktop\\\\hyl\\\\elin-blog\\\\src\\\\app\\\\admin\\\\layout.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\v_huyilin\\Desktop\\hyl\\elin-blog\\src\\app\\admin\\layout.tsx","default")},60975:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var s=r(91582);let i=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[83,922,582,334,117],()=>r(99200));module.exports=s})();