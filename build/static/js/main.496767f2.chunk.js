(window.webpackJsonpexplorer=window.webpackJsonpexplorer||[]).push([[0],{1225:function(e,t){},1227:function(e,t){},1255:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(31),u=a.n(c),o=(a(560),a(561),a(1300)),l=a(1299),i=a(540),s=a.n(i),m=a(550),f=Object(m.a)({palette:{primary:{main:"#556cd6"},secondary:{main:"#19857b"},error:{main:s.a.A400},background:{default:"#fff"}}}),p=a(6),b=a(25),d=a(1295),v=a(1296),E=a(207),h=a(118),O=a(1297),y=a(1298),j=a(76),w=a(1259),g=a(7),k=a.n(g),x=a(26),T=a(27),S=a(1257),C=a(53),K=a(1290),N=a(1291),D=a(1292),P=a(1293),I=a(1294),A=a(1260),W=Object(A.a)(function(e){return{preFormatted:{whiteSpace:"pre"}}}),B=function(e){var t,a=e.label,n=e.value,c=e.path,u=e.did,o=W();return t=n&&n.constructor&&"CID"===n.constructor.name?r.a.createElement(C.a,{href:"/chaintrees/"+u+"?path="+c.concat(a).join("/")},"CID: ",n.toString()):r.a.createElement("code",{className:o.preFormatted},JSON.stringify(n,null,2)),r.a.createElement(K.a,null,r.a.createElement(N.a,null,a),r.a.createElement(N.a,null,t))},F=function(e){var t=e.decodedCbor,a=e.path,n=e.did;return r.a.createElement(D.a,null,r.a.createElement(P.a,null,r.a.createElement(K.a,null,r.a.createElement(N.a,null,"Key"),r.a.createElement(N.a,null,"Value"))),r.a.createElement(I.a,null,Object.keys(t).map(function(e,c){return r.a.createElement(B,{key:c,label:e,path:a,did:n,value:t[e]})})))},M=a(28),R=a(47),G=Object(M.i)(function(){var e=Object(x.a)(k.a.mark(function e(t){var a,n,c,u,o;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.params.did,e.next=3,U(a);case 3:if(n=e.sent,c=[""],t.params.path&&(c=t.params.path.split("/")),void 0===n.tree){e.next=11;break}return e.next=9,n.tree.resolve(c);case 9:void 0!==(o=e.sent).value&&(u=o.value);case 11:return e.abrupt("return",{view:r.a.createElement(J,{did:a,path:c,fetchTreeResult:n,decodedCbor:u})});case 12:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),_=Object(S.a)(function(e){return{pathDisplay:{padding:e.spacing(0,.5)}}}),U=function(){var e=Object(x.a)(k.a.mark(function e(t){var a,n,r;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t){e.next=2;break}return e.abrupt("return",{found:!1});case 2:return e.next=4,Object(R.a)();case 4:return a=e.sent,e.prev=5,e.next=8,a.getTip(t);case 8:return n=e.sent,r=new T.ChainTree({store:a.blockservice,tip:n}),e.abrupt("return",{tree:r,found:!0});case 13:if(e.prev=13,e.t0=e.catch(5),"not found"!==e.t0){e.next=17;break}return e.abrupt("return",{found:!1});case 17:throw e.t0;case 18:case"end":return e.stop()}},e,null,[[5,13]])}));return function(t){return e.apply(this,arguments)}}(),z=function(e){var t=e.did,a=e.path,n=_();return r.a.createElement("div",null,"Path:",a.map(function(e,c){return r.a.createElement(C.a,{key:c,className:n.pathDisplay,href:"/chaintrees/"+t+"?path="+a.slice(0,c+1).join("/")},e,"/")}))},J=function(e){var t=e.did,a=e.fetchTreeResult,n=e.path,c=e.decodedCbor,u=a;return r.a.createElement("div",null,u&&(void 0===u.found||!u.found)&&r.a.createElement("div",null,r.a.createElement(E.a,{variant:"h6"},t),""===t?"Awaiting your DID":"Not found"),u&&void 0!==u.tree&&r.a.createElement("div",null,r.a.createElement(E.a,{variant:"h6"},t),r.a.createElement("p",null,"tip: ",u.tree.tip.toString()),r.a.createElement(z,{did:t,path:n}),r.a.createElement(F,{decodedCbor:c,path:n,did:t})))},L=a(549),Y=a.n(L),V=a(208),$=a(65),q=a(546),H=a(88),Q=a(547),X=a(305),Z=a(301),ee=a(302),te=a(303),ae=a(304),ne=function(e){var t=e.open,a=e.onClose,c=e.tree,u=e.tokenName,o=Object(n.useState)(0),l=Object(p.a)(o,2),i=l[0],s=l[1],m=Object(n.useState)(!1),f=Object(p.a)(m,2),b=f[0],d=f[1],v=function(){var e=Object(x.a)(k.a.mark(function e(){var t;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==c){e.next=2;break}throw new Error("userTree is undefined");case 2:return d(!0),e.next=5,Object(R.a)();case 5:return t=e.sent,e.next=8,t.playTransactions(c,[Object(T.mintTokenTransaction)(u,i)]);case 8:E();case 9:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),E=function(){s(0),d(!1),a()};return r.a.createElement(X.a,{open:t,onClose:a,"aria-labelledby":"form-dialog-title"},r.a.createElement(Z.a,{id:"form-dialog-title"},"Mint Tokens"),r.a.createElement(ee.a,null,r.a.createElement(te.a,null,"Mint tokens of type ",u),r.a.createElement(h.a,{autoFocus:!0,margin:"dense",id:"amount",label:"Amount",type:"number",fullWidth:!0,onChange:function(e){s(parseInt(e.target.value,10))},value:i.toString()})),b?r.a.createElement(V.a,null):r.a.createElement(ae.a,null,r.a.createElement(H.a,{onClick:E,color:"primary"},"Cancel"),r.a.createElement(H.a,{onClick:v,color:"primary"},"Mint")))},re=["tree","_tupelo","tokens"],ce=function(e){var t=e.tree,a=e.tokenName,c=Object(n.useState)(0),u=Object(p.a)(c,2),o=u[0],l=u[1],i=Object(n.useState)(null),s=Object(p.a)(i,2),m=s[0],f=s[1],b=Object(n.useState)(!0),d=Object(p.a)(b,2),v=d[0],E=d[1],h=Object(n.useState)(!1),O=Object(p.a)(h,2),y=O[0],j=O[1],w=Object(n.useState)(!1),g=Object(p.a)(w,2),T=g[0],S=g[1],C=Object(n.useState)(!1),D=Object(p.a)(C,2),P=D[0],I=D[1],A=function(){var e=Object(x.a)(k.a.mark(function e(){var n,r,c;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return j(!0),n=re.concat(a),e.next=4,t.resolve(n);case 4:if(!(r=e.sent).value.monetaryPolicy){e.next=10;break}return e.next=8,t.resolve(n.concat("monetaryPolicy"));case 8:c=e.sent,f(c.value.maximum);case 10:l(r.value.balance),E(!1);case 12:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();Object(n.useEffect)(function(){y||A()});return r.a.createElement(K.a,null,r.a.createElement(N.a,null,a),r.a.createElement(N.a,null,v?r.a.createElement(V.a,null):o),r.a.createElement(N.a,null,v?r.a.createElement(V.a,null):m),r.a.createElement(N.a,null,r.a.createElement(H.a,{onClick:function(){S(!0)}},"Mint"),r.a.createElement(H.a,{onClick:function(){I(!0)}},"Send"),r.a.createElement(ne,{open:T,onClose:function(){S(!1),j(!1)},tree:t,tokenName:a}),r.a.createElement(Q.a,{open:P,onClose:function(){I(!1),j(!1)},tree:t,tokenName:a})))},ue=function(e){var t=e.tree,a=Object(n.useState)({}),c=Object(p.a)(a,2),u=c[0],o=c[1],l=Object(n.useState)(!1),i=Object(p.a)(l,2),s=i[0],m=i[1],f=function(){var e=Object(x.a)(k.a.mark(function e(){var a;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.resolve(re);case 2:(a=e.sent).value&&(console.log("tokens resp: ",a),m(!0),o(a.value));case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)(function(){s||f()}),r.a.createElement(D.a,null,r.a.createElement(P.a,null,r.a.createElement(K.a,null,r.a.createElement(N.a,null,"Name"),r.a.createElement(N.a,null,"Balance"),r.a.createElement(N.a,null,"Max"),r.a.createElement(N.a,null,"Actions"))),r.a.createElement(I.a,null,Object.keys(u).map(function(e,a){return r.a.createElement(ce,{key:a,tree:t,tokenName:e})})))},oe=a(548),le=function(e){var t=e.open,a=e.onClose,c=e.tree,u=Object(n.useState)(""),o=Object(p.a)(u,2),l=o[0],i=o[1],s=Object(n.useState)(0),m=Object(p.a)(s,2),f=m[0],b=m[1],d=Object(n.useState)(!1),v=Object(p.a)(d,2),E=v[0],O=v[1],y=function(){var e=Object(x.a)(k.a.mark(function e(){var t;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==c){e.next=2;break}throw new Error("userTree is undefined");case 2:return O(!0),e.next=5,Object(R.a)();case 5:return t=e.sent,e.next=8,t.playTransactions(c,[Object(T.establishTokenTransaction)(l,f)]);case 8:j();case 9:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),j=function(){i(""),b(0),O(!1),a()};return r.a.createElement(X.a,{open:t,onClose:a,"aria-labelledby":"form-dialog-title"},r.a.createElement(Z.a,{id:"form-dialog-title"},"Establish Token"),r.a.createElement(ee.a,null,r.a.createElement(te.a,null,"Establish a token with a name and a monetary policy."),r.a.createElement(h.a,{autoFocus:!0,margin:"dense",id:"name",label:"Token Name",fullWidth:!0,onChange:function(e){i(e.target.value)},value:l}),r.a.createElement(h.a,{margin:"dense",id:"maximum",label:"Maximum Amount",type:"number",fullWidth:!0,onChange:function(e){b(parseInt(e.target.value,10))},value:f})),E?r.a.createElement(V.a,null):r.a.createElement(ae.a,null,r.a.createElement(H.a,{onClick:j,color:"primary"},"Cancel"),r.a.createElement(H.a,{onClick:y,color:"primary"},"Establish")))},ie=Object(M.g)({"/":Object(M.e)(function(){var e=Object(x.a)(k.a.mark(function e(t,a){var n;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$.c;case 2:if(void 0!==(n=a).id){e.next=5;break}return e.abrupt("return",Object(M.h)("/login"));case 5:return e.abrupt("return",Object(M.i)({view:r.a.createElement(se,{tree:n})}));case 6:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}())}),se=function(e){var t=e.tree,a=Object(n.useState)(!1),c=Object(p.a)(a,2),u=c[0],o=c[1],l=Object(n.useState)(!1),i=Object(p.a)(l,2),s=i[0],m=i[1],f=Object(n.useState)(""),b=Object(p.a)(f,2),d=b[0],v=b[1],E=function(){o(!1),m(!1)};return Object(n.useEffect)(function(){t.id().then(function(e){null!=e&&v(e)})}),r.a.createElement("div",null,r.a.createElement("h1",null,"Wallet"),r.a.createElement("p",null,d),r.a.createElement(j.a,{container:!0,spacing:2},r.a.createElement(j.a,{item:!0},r.a.createElement(H.a,{variant:"outlined",onClick:function(){o(!0)}},"Establish Token")),r.a.createElement(j.a,{item:!0},r.a.createElement(H.a,{variant:"outlined",onClick:function(){m(!0)}},"Receive Token"))),r.a.createElement(ue,{tree:t}),r.a.createElement(le,{open:u,onClose:E,tree:t}),r.a.createElement(oe.a,{open:s,onClose:E,tree:t}))},me=a(117),fe=window.location.pathname;"/"!==fe&&(console.log("setting wasmpath to: ",fe+"/tupelo.wasm"),Go.wasmPath=fe+"/tupelo.wasm");var pe=Object(A.a)(function(e){return{root:{padding:e.spacing(3,2)},title:Object(b.a)({display:"none"},e.breakpoints.up("sm"),{display:"block"}),grow:{flexGrow:1},search:{marginLeft:e.spacing(3)},searchIcon:{color:"white"}}}),be=Object(M.g)({"/":Object(M.i)({view:r.a.createElement("div",null,"Awaiting your DID")}),"/chaintrees/:did":G,"/login":q.a,"/wallet":ie}),de=function(){var e=pe(),t=Object(n.useState)(""),a=Object(p.a)(t,2),c=a[0],u=a[1],o=Object(C.e)();return r.a.createElement(d.a,{position:"static"},r.a.createElement(v.a,null,r.a.createElement(E.a,{className:e.title,variant:"h6",noWrap:!0},"ChainTree Explorer"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),c&&""!==c&&o.navigate("/chaintrees/"+c)}},r.a.createElement(h.a,{className:e.search,id:"did",label:"search...",type:"search",variant:"filled",InputProps:{startAdornment:r.a.createElement(O.a,{position:"start"},r.a.createElement(Y.a,{className:e.searchIcon}))},value:c,onChange:function(e){u(e.target.value)}}))))},ve=function(){var e=pe(),t=Object($.d)("userTree"),a=Object(p.a)(t,1)[0];return r.a.createElement(y.a,{maxWidth:"lg"},r.a.createElement(C.c,{routes:be,context:a,history:Object(me.b)()},r.a.createElement(de,null),r.a.createElement(j.a,{container:!0,direction:"row",justify:"center",alignItems:"center",spacing:2},r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(w.a,{className:e.root},r.a.createElement(C.b,{render:Ee},r.a.createElement(n.Suspense,{fallback:r.a.createElement(V.a,null)},r.a.createElement(C.d,null))))))))},Ee=function(e){return r.a.createElement("h1",null,"NotFound")},he=function(){return r.a.createElement($.a,null,r.a.createElement(l.a,{theme:f},r.a.createElement(o.a,null),r.a.createElement(ve,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(1254);u.a.render(r.a.createElement(he,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},383:function(e,t){},47:function(e,t,a){"use strict";a.d(t,"a",function(){return o});var n=a(7),r=a.n(n),c=a(26),u=a(27),o=function(){var e=Object(c.a)(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",u.Community.getDefault());case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},546:function(e,t,a){"use strict";(function(e){a.d(t,"a",function(){return w});var n=a(6),r=a(7),c=a.n(r),u=a(26),o=a(0),l=a.n(o),i=a(28),s=a(208),m=a(76),f=a(118),p=a(88),b=a(207),d=a(27),v=a(53),E=a(65),h=a(47),O=e.from("_crazywallet-dev"),y=function(){var t=Object(u.a)(c.a.mark(function t(a){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",d.EcdsaKey.passPhraseKey(e.from(a),O));case 1:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),j=function(){var e=Object(u.a)(c.a.mark(function e(t){var a,n,r,u,o;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(t);case 2:return a=e.sent,e.next=5,d.Tupelo.ecdsaPubkeyToDid(a.publicKey);case 5:return n=e.sent,e.next=8,Object(h.a)();case 8:return r=e.sent,e.prev=9,e.next=12,r.getTip(n);case 12:u=e.sent,e.next=19;break;case 15:if(e.prev=15,e.t0=e.catch(9),"not found"!==e.t0){e.next=19;break}return e.abrupt("return",null);case 19:if(void 0!==u){e.next=21;break}return e.abrupt("return",null);case 21:return o=new d.ChainTree({store:r.blockservice,tip:u}),e.abrupt("return",o);case 23:case"end":return e.stop()}},e,null,[[9,15]])}));return function(t){return e.apply(this,arguments)}}(),w=Object(i.g)({"/":Object(i.i)(function(){var e=Object(u.a)(c.a.mark(function e(t){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",{view:l.a.createElement(x,null)});case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),"/available/:username":Object(i.i)(function(){var e=Object(u.a)(c.a.mark(function e(t){var a,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.params.username,e.next=3,j(a);case 3:if(!(n=e.sent)){e.next=8;break}return e.abrupt("return",{view:l.a.createElement(g,{userName:a,tree:n})});case 8:return e.abrupt("return",{view:l.a.createElement(k,{userName:a})});case 9:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())}),g=function(t){var a=t.userName,r=t.tree,i=Object(v.e)(),b=Object(o.useState)(!1),h=Object(n.a)(b,2),O=h[0],y=h[1],j=Object(o.useState)(""),w=Object(n.a)(j,2),g=w[0],k=w[1],x=Object(o.useState)(!1),T=Object(n.a)(x,2),S=T[0],C=T[1],K=function(){var t=Object(u.a)(c.a.mark(function t(n){var u,o,l;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),y(!0),C(!1),t.next=5,d.EcdsaKey.passPhraseKey(e.from(g),e.from(a));case 5:return u=t.sent,t.next=8,d.Tupelo.ecdsaPubkeyToAddress(u.publicKey);case 8:return o=t.sent,t.next=11,r.resolve(["tree","_tupelo","authentications"]);case 11:l=t.sent,y(!1),l.value.includes(o)?(Object(E.b)({type:"setKey",userKey:u}),Object(E.b)({type:"setTree",userTree:r}),i.navigate("/wallet")):C(!0),y(!1);case 16:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}();return l.a.createElement("div",null,"Username ",a," is NOT available.",l.a.createElement("p",null,"Your Username? You can login."),l.a.createElement("form",{onSubmit:K},O?l.a.createElement(s.a,null):null,l.a.createElement(m.a,{container:!0,spacing:2},l.a.createElement(m.a,{item:!0},l.a.createElement(f.a,{error:S,label:"password",id:"password",type:"password",value:g,onChange:function(e){k(e.target.value)}})),l.a.createElement(m.a,{item:!0},l.a.createElement(p.a,{type:"submit",variant:"contained"},"Submit")))))},k=function(t){var a=t.userName,r=Object(v.e)(),i=Object(o.useState)(""),b=Object(n.a)(i,2),O=b[0],j=b[1],w=Object(o.useState)(!1),g=Object(n.a)(w,2),k=g[0],x=g[1],T=function(){var t=Object(u.a)(c.a.mark(function t(){var n,u,o,l,i;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return x(!0),t.next=3,y(a);case 3:return n=t.sent,t.next=6,d.EcdsaKey.passPhraseKey(e.from(O),e.from(a));case 6:return u=t.sent,t.next=9,d.Tupelo.ecdsaPubkeyToAddress(u.publicKey);case 9:return o=t.sent,t.next=12,Object(h.a)();case 12:return l=t.sent,t.next=15,d.ChainTree.newEmptyTree(l.blockservice,n);case 15:return i=t.sent,t.next=18,l.playTransactions(i,[Object(d.setOwnershipTransaction)([o]),Object(d.setDataTransaction)("/_crazywallet/username",a)]);case 18:i.key=u,Object(E.b)({type:"setKey",userKey:u}),Object(E.b)({type:"setTree",userTree:i}),x(!1),r.navigate("/wallet");case 23:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}();return l.a.createElement("div",null,"Username ",a," is available.",l.a.createElement("p",null,"Reserve username?"),l.a.createElement("form",{onSubmit:function(e){e.preventDefault(),T()}},k?l.a.createElement(s.a,null):null,l.a.createElement(m.a,{container:!0,spacing:2},l.a.createElement(m.a,{item:!0},l.a.createElement(f.a,{label:"password",id:"password",type:"password",value:O,onChange:function(e){j(e.target.value)}})),l.a.createElement(m.a,{item:!0},l.a.createElement(p.a,{type:"submit",variant:"contained"},"Submit")))))},x=function(){var e=Object(v.e)(),t=Object(o.useState)(""),a=Object(n.a)(t,2),r=a[0],c=a[1];return l.a.createElement("div",null,l.a.createElement(b.a,null,"Login or Register"),l.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.navigate("/login/available/"+r)}},l.a.createElement(m.a,{container:!0,spacing:2},l.a.createElement(m.a,{item:!0},l.a.createElement(f.a,{label:"user name",id:"userName",value:r,onChange:function(e){c(e.target.value)}})),l.a.createElement(m.a,{item:!0},l.a.createElement(p.a,{type:"submit",variant:"contained"},"Submit")))))}}).call(this,a(2).Buffer)},547:function(e,t,a){"use strict";(function(e){var n=a(7),r=a.n(n),c=a(26),u=a(6),o=a(0),l=a.n(o),i=a(305),s=a(301),m=a(302),f=a(303),p=a(118),b=a(208),d=a(304),v=a(88),E=a(1258),h=a(27),O=a(47),y=a(254);t.a=function(t){var a=t.open,n=t.onClose,j=t.tree,w=t.tokenName,g=Object(o.useState)(0),k=Object(u.a)(g,2),x=k[0],T=k[1],S=Object(o.useState)(""),C=Object(u.a)(S,2),K=C[0],N=C[1],D=Object(o.useState)(!1),P=Object(u.a)(D,2),I=P[0],A=P[1],W=Object(o.useState)(),B=Object(u.a)(W,2),F=B[0],M=B[1],R=function(){var t=Object(c.a)(r.a.mark(function t(){var a,n,c;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0!==j){t.next=2;break}throw new Error("userTree is undefined");case 2:return A(!0),a=y(),t.next=6,Object(O.a)();case 6:return n=t.sent,console.log("tokenname: ",w),t.next=10,n.sendTokenAndGetPayload(j,Object(h.sendTokenTransaction)(a,w,x,K));case 10:c=t.sent,M(e.from(c.serializeBinary()).toString("base64"));case 12:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),G=function(){T(0),N(""),A(!1),n()};return F?l.a.createElement(i.a,{open:a,onClose:n,"aria-labelledby":"form-dialog-title"},l.a.createElement(s.a,{id:"form-dialog-title"},"Send Tokens"),l.a.createElement(m.a,null,l.a.createElement(f.a,null,"Give the following snippet to your send coin receiver:"),l.a.createElement(E.a,null,F)),l.a.createElement(d.a,null,l.a.createElement(v.a,{onClick:G,color:"primary"},"Ok"))):l.a.createElement(i.a,{open:a,onClose:n,"aria-labelledby":"form-dialog-title"},l.a.createElement(s.a,{id:"form-dialog-title"},"Send Tokens"),l.a.createElement(m.a,null,l.a.createElement(f.a,null,"Send tokens of type ",w),l.a.createElement(p.a,{autoFocus:!0,margin:"dense",id:"name",label:"Destination",fullWidth:!0,onChange:function(e){N(e.target.value)},value:K}),l.a.createElement(p.a,{autoFocus:!0,margin:"dense",id:"amount",label:"Amount",type:"number",fullWidth:!0,onChange:function(e){T(parseInt(e.target.value,10))},value:x.toString()})),I?l.a.createElement(b.a,null):l.a.createElement(d.a,null,l.a.createElement(v.a,{onClick:G,color:"primary"},"Cancel"),l.a.createElement(v.a,{onClick:R,color:"primary"},"Send")))}}).call(this,a(2).Buffer)},548:function(e,t,a){"use strict";(function(e){var n=a(7),r=a.n(n),c=a(26),u=a(6),o=a(0),l=a.n(o),i=a(305),s=a(301),m=a(302),f=a(303),p=a(118),b=a(208),d=a(304),v=a(88),E=a(27),h=a(141),O=a(47);t.a=function(t){var a=t.open,n=t.onClose,y=t.tree,j=Object(o.useState)(""),w=Object(u.a)(j,2),g=w[0],k=w[1],x=Object(o.useState)(!1),T=Object(u.a)(x,2),S=T[0],C=T[1],K=function(){var t=Object(c.a)(r.a.mark(function t(){var a,n,c;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0!==y){t.next=2;break}throw new Error("userTree is undefined");case 2:return a=h.TokenPayload.deserializeBinary(e.from(g,"base64")),n=Object(E.receiveTokenTransactionFromPayload)(a),C(!0),t.next=7,Object(O.a)();case 7:return c=t.sent,t.next=10,c.playTransactions(y,[n]);case 10:N();case 11:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),N=function(){k(""),C(!1),n()};return l.a.createElement(i.a,{open:a,onClose:n,"aria-labelledby":"form-dialog-title"},l.a.createElement(s.a,{id:"form-dialog-title"},"Receive Tokens"),l.a.createElement(m.a,null,l.a.createElement(f.a,null,"Receive Tokens"),l.a.createElement(p.a,{autoFocus:!0,margin:"dense",id:"name",label:"Code",fullWidth:!0,onChange:function(e){k(e.target.value)},value:g})),S?l.a.createElement(b.a,null):l.a.createElement(d.a,null,l.a.createElement(v.a,{onClick:N,color:"primary"},"Cancel"),l.a.createElement(v.a,{onClick:K,color:"primary"},"Send")))}}).call(this,a(2).Buffer)},555:function(e,t,a){e.exports=a(1255)},560:function(e,t,a){},561:function(e,t,a){},588:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=588},590:function(e,t){},592:function(e,t){},624:function(e,t){},625:function(e,t){},65:function(e,t,a){"use strict";(function(e){a.d(t,"c",function(){return p}),a.d(t,"a",function(){return v}),a.d(t,"b",function(){return E}),a.d(t,"d",function(){return h});var n,r=a(7),c=a.n(r),u=a(26),o=a(25),l=a(545),i=a(27),s=a(47);function m(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?m(a,!0).forEach(function(t){Object(o.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):m(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var p=new Promise(function(e){n=e}),b={userTree:void 0,userKey:void 0},d=Object(l.a)(function(t,a){var n=function(e,t){switch(t.type){case"setKey":return f({},e,{userKey:t.userKey});case"setTree":return f({},e,{userTree:t.userTree});default:return e}}(t,a);return void 0!==n.userKey&&void 0!==n.userKey.privateKey&&sessionStorage.setItem("userKey",e.from(n.userKey.privateKey).toString("hex")),void 0!==n.userTree&&n.userTree.id().then(function(e){if(null==e)throw new Error("unknown id");sessionStorage.setItem("userTreeDid",e)},function(e){throw e}),n},b),v=d.GlobalStateProvider,E=d.dispatch,h=d.useGlobalState;function O(){return(O=Object(u.a)(c.a.mark(function t(){var a,r,u,o,l,m;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if((a=sessionStorage.getItem("userKey"))&&""!==a){t.next=4;break}return n(),t.abrupt("return");case 4:return t.next=6,i.EcdsaKey.fromBytes(e.from(a,"hex"));case 6:if(r=t.sent,null!=(u=sessionStorage.getItem("userTreeDid"))){t.next=11;break}throw n(),new Error("had a userKey but no user Tree");case 11:return t.next=13,Object(s.a)();case 13:return o=t.sent,t.next=16,o.getTip(u);case 16:l=t.sent,m=new i.ChainTree({tip:l,store:o.blockservice,key:r}),E({type:"setKey",userKey:r}),E({type:"setTree",userTree:m}),n();case 21:case"end":return t.stop()}},t)}))).apply(this,arguments)}!function(){O.apply(this,arguments)}()}).call(this,a(2).Buffer)},672:function(e,t){},768:function(e,t){}},[[555,1,2]]]);
//# sourceMappingURL=main.496767f2.chunk.js.map