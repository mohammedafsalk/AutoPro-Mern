"use strict";(self.webpackChunkmdb_react_template=self.webpackChunkmdb_react_template||[]).push([[619],{5574:function(e,r,o){var t=o(4942),a=o(3366),n=o(7462),i=o(2791),l=o(9278),c=o(4419),s=o(8252),d=o(4036),p=o(277),u=o(627),v=o(5527),f=o(1402),m=o(6934),Z=o(7780),h=o(5090),x=o(2739),g=o(3967),b=o(184),S=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],W=(0,m.ZP)(x.Z,{name:"MuiDialog",slot:"Backdrop",overrides:function(e,r){return r.backdrop}})({zIndex:-1}),w=(0,m.ZP)(p.Z,{name:"MuiDialog",slot:"Root",overridesResolver:function(e,r){return r.root}})({"@media print":{position:"absolute !important"}}),k=(0,m.ZP)("div",{name:"MuiDialog",slot:"Container",overridesResolver:function(e,r){var o=e.ownerState;return[r.container,r["scroll".concat((0,d.Z)(o.scroll))]]}})((function(e){var r=e.ownerState;return(0,n.Z)({height:"100%","@media print":{height:"auto"},outline:0},"paper"===r.scroll&&{display:"flex",justifyContent:"center",alignItems:"center"},"body"===r.scroll&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})})),D=(0,m.ZP)(v.Z,{name:"MuiDialog",slot:"Paper",overridesResolver:function(e,r){var o=e.ownerState;return[r.paper,r["scrollPaper".concat((0,d.Z)(o.scroll))],r["paperWidth".concat((0,d.Z)(String(o.maxWidth)))],o.fullWidth&&r.paperFullWidth,o.fullScreen&&r.paperFullScreen]}})((function(e){var r=e.theme,o=e.ownerState;return(0,n.Z)({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},"paper"===o.scroll&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},"body"===o.scroll&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!o.maxWidth&&{maxWidth:"calc(100% - 64px)"},"xs"===o.maxWidth&&(0,t.Z)({maxWidth:"px"===r.breakpoints.unit?Math.max(r.breakpoints.values.xs,444):"max(".concat(r.breakpoints.values.xs).concat(r.breakpoints.unit,", 444px)")},"&.".concat(Z.Z.paperScrollBody),(0,t.Z)({},r.breakpoints.down(Math.max(r.breakpoints.values.xs,444)+64),{maxWidth:"calc(100% - 64px)"})),o.maxWidth&&"xs"!==o.maxWidth&&(0,t.Z)({maxWidth:"".concat(r.breakpoints.values[o.maxWidth]).concat(r.breakpoints.unit)},"&.".concat(Z.Z.paperScrollBody),(0,t.Z)({},r.breakpoints.down(r.breakpoints.values[o.maxWidth]+64),{maxWidth:"calc(100% - 64px)"})),o.fullWidth&&{width:"calc(100% - 64px)"},o.fullScreen&&(0,t.Z)({margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0},"&.".concat(Z.Z.paperScrollBody),{margin:0,maxWidth:"100%"}))})),y=i.forwardRef((function(e,r){var o=(0,f.Z)({props:e,name:"MuiDialog"}),t=(0,g.Z)(),p={enter:t.transitions.duration.enteringScreen,exit:t.transitions.duration.leavingScreen},m=o["aria-describedby"],x=o["aria-labelledby"],y=o.BackdropComponent,C=o.BackdropProps,M=o.children,P=o.className,B=o.disableEscapeKeyDown,R=void 0!==B&&B,N=o.fullScreen,T=void 0!==N&&N,j=o.fullWidth,A=void 0!==j&&j,F=o.maxWidth,E=void 0===F?"sm":F,I=o.onBackdropClick,K=o.onClose,Y=o.open,_=o.PaperComponent,X=void 0===_?v.Z:_,H=o.PaperProps,L=void 0===H?{}:H,z=o.scroll,O=void 0===z?"paper":z,q=o.TransitionComponent,G=void 0===q?u.Z:q,J=o.transitionDuration,Q=void 0===J?p:J,U=o.TransitionProps,V=(0,a.Z)(o,S),$=(0,n.Z)({},o,{disableEscapeKeyDown:R,fullScreen:T,fullWidth:A,maxWidth:E,scroll:O}),ee=function(e){var r=e.classes,o=e.scroll,t=e.maxWidth,a=e.fullWidth,n=e.fullScreen,i={root:["root"],container:["container","scroll".concat((0,d.Z)(o))],paper:["paper","paperScroll".concat((0,d.Z)(o)),"paperWidth".concat((0,d.Z)(String(t))),a&&"paperFullWidth",n&&"paperFullScreen"]};return(0,c.Z)(i,Z.D,r)}($),re=i.useRef(),oe=(0,s.Z)(x),te=i.useMemo((function(){return{titleId:oe}}),[oe]);return(0,b.jsx)(w,(0,n.Z)({className:(0,l.Z)(ee.root,P),closeAfterTransition:!0,components:{Backdrop:W},componentsProps:{backdrop:(0,n.Z)({transitionDuration:Q,as:y},C)},disableEscapeKeyDown:R,onClose:K,open:Y,ref:r,onClick:function(e){re.current&&(re.current=null,I&&I(e),K&&K(e,"backdropClick"))},ownerState:$},V,{children:(0,b.jsx)(G,(0,n.Z)({appear:!0,in:Y,timeout:Q,role:"presentation"},U,{children:(0,b.jsx)(k,{className:(0,l.Z)(ee.container),onMouseDown:function(e){re.current=e.target===e.currentTarget},ownerState:$,children:(0,b.jsx)(D,(0,n.Z)({as:X,elevation:24,role:"dialog","aria-describedby":m,"aria-labelledby":oe},L,{className:(0,l.Z)(ee.paper,L.className),ownerState:$,children:(0,b.jsx)(h.Z.Provider,{value:te,children:M})}))})}))}))}));r.Z=y},5090:function(e,r,o){var t=o(2791).createContext({});r.Z=t},7780:function(e,r,o){o.d(r,{D:function(){return n}});var t=o(5878),a=o(1217);function n(e){return(0,a.Z)("MuiDialog",e)}var i=(0,t.Z)("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]);r.Z=i},7123:function(e,r,o){o.d(r,{Z:function(){return Z}});var t=o(3366),a=o(7462),n=o(2791),i=o(9278),l=o(4419),c=o(6934),s=o(1402),d=o(5878),p=o(1217);function u(e){return(0,p.Z)("MuiDialogActions",e)}(0,d.Z)("MuiDialogActions",["root","spacing"]);var v=o(184),f=["className","disableSpacing"],m=(0,c.ZP)("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:function(e,r){var o=e.ownerState;return[r.root,!o.disableSpacing&&r.spacing]}})((function(e){var r=e.ownerState;return(0,a.Z)({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!r.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})})),Z=n.forwardRef((function(e,r){var o=(0,s.Z)({props:e,name:"MuiDialogActions"}),n=o.className,c=o.disableSpacing,d=void 0!==c&&c,p=(0,t.Z)(o,f),Z=(0,a.Z)({},o,{disableSpacing:d}),h=function(e){var r=e.classes,o={root:["root",!e.disableSpacing&&"spacing"]};return(0,l.Z)(o,u,r)}(Z);return(0,v.jsx)(m,(0,a.Z)({className:(0,i.Z)(h.root,n),ownerState:Z,ref:r},p))}))},9157:function(e,r,o){o.d(r,{Z:function(){return x}});var t=o(4942),a=o(3366),n=o(7462),i=o(2791),l=o(9278),c=o(4419),s=o(6934),d=o(1402),p=o(5878),u=o(1217);function v(e){return(0,u.Z)("MuiDialogContent",e)}(0,p.Z)("MuiDialogContent",["root","dividers"]);var f=o(7673),m=o(184),Z=["className","dividers"],h=(0,s.ZP)("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:function(e,r){var o=e.ownerState;return[r.root,o.dividers&&r.dividers]}})((function(e){var r=e.theme,o=e.ownerState;return(0,n.Z)({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},o.dividers?{padding:"16px 24px",borderTop:"1px solid ".concat((r.vars||r).palette.divider),borderBottom:"1px solid ".concat((r.vars||r).palette.divider)}:(0,t.Z)({},".".concat(f.Z.root," + &"),{paddingTop:0}))})),x=i.forwardRef((function(e,r){var o=(0,d.Z)({props:e,name:"MuiDialogContent"}),t=o.className,i=o.dividers,s=void 0!==i&&i,p=(0,a.Z)(o,Z),u=(0,n.Z)({},o,{dividers:s}),f=function(e){var r=e.classes,o={root:["root",e.dividers&&"dividers"]};return(0,c.Z)(o,v,r)}(u);return(0,m.jsx)(h,(0,n.Z)({className:(0,l.Z)(f.root,t),ownerState:u,ref:r},p))}))},7673:function(e,r,o){o.d(r,{a:function(){return n}});var t=o(5878),a=o(1217);function n(e){return(0,a.Z)("MuiDialogTitle",e)}var i=(0,t.Z)("MuiDialogTitle",["root"]);r.Z=i}}]);
//# sourceMappingURL=619.cdce0920.chunk.js.map