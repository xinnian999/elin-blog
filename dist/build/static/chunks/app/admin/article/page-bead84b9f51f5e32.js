(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[419],{38990:(e,t,r)=>{Promise.resolve().then(r.bind(r,89874))},89874:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(18356),c=r(5471),l=r(98091);let i=(0,l.createServerReference)("7f76b428cb7e10345d6f4f17a01b338b5e411c071c",l.callServer,void 0,l.findSourceMapURL,"fetchArticleList"),d=(0,l.createServerReference)("7fe9847b70e5b3a8df48ff6b2c831e8b05f34d16c9",l.callServer,void 0,l.findSourceMapURL,"createArticle"),n=(0,l.createServerReference)("7ff30077772e68ab5b62b228ddf7f6cbbbc803d9a5",l.callServer,void 0,l.findSourceMapURL,"updateArticle"),f=(0,l.createServerReference)("7f623e712ac685f6af2b0e3c32c13603fff2f3d28e",l.callServer,void 0,l.findSourceMapURL,"deleteArticle");var s=r(761);let o=()=>(0,a.jsx)(c.DY,{columns:[{title:"ID",dataIndex:"id",key:"id",defaultSortOrder:"descend",sorter:(e,t)=>e.id-t.id,width:120},{title:"文章标题",dataIndex:"title",key:"title"},{title:"文章内容",dataIndex:"content",key:"content"}],api:i,createConfig:{title:"新增文章",schema:{items:[{name:"title",label:"文章标题",rules:[{required:!0,message:"请输入文章标题"}],component:(0,a.jsx)(s.A,{})},{name:"content",label:"文章内容",rules:[{required:!0,message:"请输入文章内容"}],component:(0,a.jsx)(c.oz,{})}]},api:d},updateConfig:{title:"修改文章",schema:{items:[{name:"title",label:"文章标题",rules:[{required:!0,message:"请输入文章标题"}],component:(0,a.jsx)(s.A,{})},{name:"content",label:"文章内容",rules:[{required:!0,message:"请输入文章内容"}],component:(0,a.jsx)(c.oz,{})}]},api:n},deleteApi:f})}},e=>{var t=t=>e(e.s=t);e.O(0,[630,649,666,231,143,358],()=>t(38990)),_N_E=e.O()}]);