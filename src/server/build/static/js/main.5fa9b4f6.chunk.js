(this["webpackJsonpreact-client"]=this["webpackJsonpreact-client"]||[]).push([[0],{449:function(e,t,n){e.exports=n(627)},548:function(e,t){},550:function(e,t){},584:function(e,t){},585:function(e,t){},627:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(18),o=n.n(c),u=n(93),s=n(108),l=n(238),i=function(e){var t=e.component,n=Object(l.a)(e,["component"]);return r.a.createElement(s.b,Object.assign({},n,{render:function(e){return localStorage.getItem("user")?r.a.createElement(t,e):r.a.createElement(s.a,{to:{pathname:"/login",state:{from:e.location}}})}}))},m=n(31),f=n(30),d=n(118),p=n.n(d),h=n(16),b=n.n(h),E=n(33),v=n(137),y={};"\u0422\u0443\u0440\u0446\u0438\u044f,\u0418\u0442\u0430\u043b\u0438\u044f,\u0423\u044d\u043b\u044c\u0441,\u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u044f,\u0414\u0430\u043d\u0438\u044f,\u0424\u0438\u043d\u043b\u044f\u043d\u0434\u0438\u044f,\u0411\u0435\u043b\u044c\u0433\u0438\u044f,\u0420\u043e\u0441\u0441\u0438\u044f,\u041d\u0438\u0434\u0435\u0440\u043b\u0430\u043d\u0434\u044b,\u0423\u043a\u0440\u0430\u0438\u043d\u0430,\u0410\u0432\u0441\u0442\u0440\u0438\u044f,\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0438\u044f,\u0410\u043d\u0433\u043b\u0438\u044f,\u0425\u043e\u0440\u0432\u0430\u0442\u0438\u044f,\u0428\u043e\u0442\u043b\u0430\u043d\u0434\u0438\u044f,\u0427\u0435\u0445\u0438\u044f,\u0418\u0441\u043f\u0430\u043d\u0438\u044f,\u0428\u0432\u0435\u0446\u0438\u044f,\u041f\u043e\u043b\u044c\u0448\u0430,\u0421\u043b\u043e\u0432\u0430\u043a\u0438\u044f,\u0412\u0435\u043d\u0433\u0440\u0438\u044f,\u041f\u043e\u0440\u0442\u0443\u0433\u0430\u043b\u0438\u044f,\u0424\u0440\u0430\u043d\u0446\u0438\u044f,\u0413\u0435\u0440\u043c\u0430\u043d\u0438\u044f".split(",").forEach((function(e){return y=Object(m.a)({},y,Object(v.a)({},e,e))}));var g=function(e){return e.sort((function(e,t){return e.matchNo-t.matchNo}))},w=function(){var e=Object(E.a)(b.a.mark((function e(){var t,n,a,r,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.getAll("users");case 2:return t=e.sent,e.next=5,M.getAll("matches");case 5:return n=e.sent,a=g(n),r=a.map((function(e,n){var a={matchNo:e.matchNo,home:e.home,away:e.away,passed:!1,coefficient:e.coefficient,usersStakes:[]};return e.enable||(a.passed=!0,t.forEach((function(e){var t={};t.userId=e._id,t.username=e.username,null==e.stakes[n].home||null==e.stakes[n].away?(t.home=10,t.away=10):(t.home=e.stakes[n].home,t.away=e.stakes[n].away),a.usersStakes.push(t)}))),a})),c=r.filter((function(e){return!0===e.passed})),console.log(c),e.abrupt("return",c);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(){var e=Object(E.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.getAll("users");case 2:return e.sent.forEach((function(e){e.stakes.forEach((function(t){M.setMoneyByUserId(e._id,{matchNo:t.matchNo,money:0})}))})),e.abrupt("return","done");case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(e,t){return Math.floor(Math.random()*(t-e))+e},k=function(){var e=Object(E.a)(b.a.mark((function e(t,n){var a,r,c,o,u;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.getAll("matches");case 2:for(a=e.sent,r=g(a),c=0;c<t;c++)o=r[c],o.home,o.away,o.enable,u=Object(l.a)(o,["home","away","enable"]),M.updateOne("matches",Object(m.a)({},u,{home:n?null:j(0,4),away:n?null:j(0,4),enable:!!n}));return e.abrupt("return","done");case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),S=function(){var e=Object(E.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.getAll("users");case 2:return e.sent.forEach((function(e){for(var a=0;a<t;a++)M.setStakesByUserId(e._id,{matchNo:e.stakes[a].matchNo,home:n?null:j(0,4),away:n?null:j(0,4)})})),e.abrupt("return","done");case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),x=function(){var e=Object(E.a)(b.a.mark((function e(){var t,n,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.getAll("users");case 2:return t=e.sent,e.next=5,M.getAll("matches");case 5:return n=e.sent,500,a=0,n.forEach((function(e){a+=e.coefficient})),e.abrupt("return",Math.round(500*t.length/a));case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=Object(E.a)(b.a.mark((function e(){var t,n,a,r,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w();case 2:return t=e.sent,e.next=5,x();case 5:return n=e.sent,a=[],r=n,c=0,t.forEach((function(e){var t=[];e.usersStakes.forEach((function(n){console.log(n.username),5===M.calcPets(n.home,n.away,e.home,e.away)&&(t.push({userId:n.userId}),console.log(n.username+" "+e.matchNo+"  "+t))})),0===t.length?(c+=n,r=0):(r=n+c,c=0);var o=t.length>0?e.coefficient*r/t.length:0;a.push({matchNo:e.matchNo,vinners:t,money:o})})),a.forEach((function(e){e.vinners.forEach((function(t){M.setMoneyByUserId(t.userId,{matchNo:e.matchNo,money:e.money})}))})),console.log(a),e.abrupt("return","done");case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.authdata?{Authorization:"Basic "+e.authdata,"Content-Type":"application/json"}:{}},_=function(){return localStorage.removeItem("user")},A=function(){var e=Object(E.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(n=e.sent,t.ok){e.next=6;break}return 401===t.status&&(_(),window.location.reload(!0)),e.abrupt("return",Promise.reject(n&&n.message||t.statusText));case 6:return e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(E.a)(b.a.mark((function e(t,n,a){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=A,e.next=3,fetch("".concat("http://localhost:4000","/").concat(t),Object(m.a)({method:n,headers:C()},a||{}));case 3:return e.t1=e.sent,e.next=6,(0,e.t0)(e.t1);case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),U={get:function(){var e=Object(E.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I(t,"GET",n);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),post:function(){var e=Object(E.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I(t,"POST",n);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),put:function(){var e=Object(E.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I(t,"PUT",n);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),delete:function(){var e=Object(E.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I(t,"DELETE",n);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},M={login:function(){var e=Object(E.a)(b.a.mark((function e(t,n){var a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U.post("users/authenticate",{headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:n})});case 2:return(a=e.sent)&&(a.authdata=window.btoa(t+":"+n),localStorage.setItem("user",JSON.stringify(a))),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),logout:_,updateOne:function(){var e=Object(E.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U.put("".concat(t,"/").concat(n._id),{body:JSON.stringify(Object(m.a)({},n))});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),addOne:function(){var e=Object(E.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U.post(t,{body:JSON.stringify(Object(m.a)({},n))});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),deleteOne:function(){var e=Object(E.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",U.delete("".concat(t,"/").concat(n)));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),getAll:function(){var e=Object(E.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U.get(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getStakesByUserId:function(){var e=Object(E.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U.get("users/".concat(t,"/stakes"));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),setStakesByUserId:function(){var e=Object(E.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U.put("users/".concat(t,"/stakes/").concat(n.matchNo),{body:JSON.stringify(Object(m.a)({},n))});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),setMoneyByUserId:function(){var e=Object(E.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U.put("users/".concat(t,"/money/").concat(n.matchNo),{body:JSON.stringify(Object(m.a)({},n))});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),teams:y,calcPets:function(e,t,n,a){if(null===e||null===t||null===n||null===a)return 0;var r=e-t,c=n-a;switch(!0){case e===n&&t===a:return 5;case r===c:return 3;case r>0&&c>0||r<0&&c<0||0===r&&0===c:return 1;default:return 0}},calcMoney:N,zeroingMoney:O,getSortedMatches:g,setTestMatches:k,setTestStakes:S},J=n(375),P=n(213),B=n(356);function T(e){var t=Object(a.useState)(null),n=Object(f.a)(t,2),c=n[0],o=n[1],s=function(){o(null)};return r.a.createElement("div",null,r.a.createElement(J.a,{"aria-controls":"simple-menu","aria-haspopup":"true",onClick:function(e){o(e.currentTarget)}},"\u041c\u0415\u041d\u042e"),r.a.createElement(P.a,{id:"simple-menu",anchorEl:c,keepMounted:!0,open:Boolean(c),onClose:s},r.a.createElement(B.a,null," ",r.a.createElement(u.b,{to:"/"},"\u0414\u043e\u043c\u0430\u0448\u043d\u044f\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430")),r.a.createElement(B.a,{onClick:s},r.a.createElement(u.b,{to:"/result"},"\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b")),r.a.createElement(B.a,{onClick:s},r.a.createElement(u.b,{to:"/info"},"\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f")),e.currentUser.isAdmin&&r.a.createElement(B.a,{onClick:s},r.a.createElement(u.b,{to:"/admin"},"\u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435")),e.currentUser.isAdmin&&r.a.createElement(B.a,{onClick:s},r.a.createElement(u.b,{to:"/test"},"\u0422\u0435\u0441\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435")),r.a.createElement(B.a,{onClick:s},r.a.createElement(u.b,{to:"/login"},"\u0412\u044b\u0439\u0442\u0438"))))}var z=n(353);function D(){var e=Object(a.useState)({}),t=Object(f.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)({loading:!0}),u=Object(f.a)(o,2),s=u[0],l=u[1],i=Object(a.useState)({loading:!0}),d=Object(f.a)(i,2),h=d[0],b=d[1],E=[{title:"_id",field:"_id",hidden:!0},{title:"\u2116",field:"matchNo",editable:"never",defaultSort:"asc"},{title:"Home",field:"homeName",lookup:M.teams,editable:"never"},{title:"Score",field:"home",type:"numeric"},{title:"Away",field:"awayName",lookup:M.teams,editable:"never"},{title:"Score",field:"away",type:"numeric"},{title:"Coefficient",field:"coefficient",type:"numeric",editable:"never"},{title:"Enable",field:"enable",type:"boolean",editable:"never"},{title:"Pets",field:"pets",editable:"never"},{title:"Money",field:"money",editable:"never"}];Object(a.useEffect)((function(){var e=JSON.parse(localStorage.getItem("user"));c(e),M.getStakesByUserId(e._id).then((function(e){return l(e)})),M.getAll("matches").then((function(e){return b(e)}))}),[]);var v,y;return h.loading||s.loading?r.a.createElement("div",null,r.a.createElement(z.a,null)," "):r.a.createElement("div",null,r.a.createElement(T,{currentUser:n}),r.a.createElement(p.a,{options:{pageSize:10,pageSizeOptions:[10,51],sorting:!0,rowStyle:function(e){return 5===e.pets?{backgroundColor:"#C9B037"}:3===e.pets?{backgroundColor:"#B4B4B4"}:1===e.pets?{backgroundColor:"#AD8A56"}:void 0}},title:"\u042d\u0442\u043e \u0434\u043e\u043c\u0430\u0448\u043d\u044f\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430, \u0442\u0443\u0442 \u043d\u0443\u0436\u043d\u043e \u0434\u0435\u043b\u0430\u0442\u044c \u0441\u0442\u0430\u0432\u043a\u0438, ".concat(n.username,", \u0434\u043b\u044f \u044d\u0442\u043e\u0433\u043e \u0432\u043e\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0441\u044f \u043f\u0438\u043a\u0442\u043e\u0433\u0440\u0430\u043c\u043c\u043e\u0439 \u043a\u0430\u0440\u0430\u043d\u0434\u0430\u0448\u0430 \u0432 \u0441\u0442\u0440\u043e\u043a\u0435, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u0445\u043e\u0447\u0435\u0448\u044c \u0438\u0441\u043f\u0440\u0430\u0432\u0438\u0442\u044c"),columns:E,data:(v=s,y=h,y.map((function(e){var t=v.find((function(t){return t.matchNo===e.matchNo}));if(void 0!==t&&e.matchNo===t.matchNo){var n=Object.assign({},e);return n.home=t.home,n.away=t.away,n.realHome=e.home,n.realAway=e.away,n.pets=M.calcPets(n.home,n.away,n.realHome,n.realAway),n.money=t.money,e=n}return e}))),detailPanel:function(e){if(!1===e.enable)return r.a.createElement("div",null,"\u041c\u0430\u0442\u0447 ",e.homeName," - ",e.awayName," \u0441\u044b\u0433\u0440\u0430\u043d, \u0441\u0447\u0451\u0442"," ",e.realHome," : ",e.realAway)},editable:{isEditable:function(e){return!0===e.enable},onRowUpdate:function(e,t){return M.setStakesByUserId(n._id,Object(m.a)({},e)).then((function(t){l((function(n){return n.map((function(n){var a=t.stakes.find((function(t){return t.matchNo===e.matchNo}));if(n.matchNo===a.matchNo){var r=Object.assign({},n);return r.home=a.home,r.away=a.away,r}return n}))}))}))}}}))}var H=n(662),V=n(655),F=n(656),L=n(657),R=n(651),q=n(100),Z=n(287),G=n(288),K=n(227),Q=n(377),W=n(286),X=n(392),Y=function(e){M.logout();var t=Object(a.useState)({username:"",password:"",error:"",loading:!1,submitted:!1,showPassword:!1}),n=Object(f.a)(t,2),c=n[0],o=n[1],u=function(e){var t=e.target,n=t.name,a=t.value;o((function(e){return Object(m.a)({},e,Object(v.a)({},n,a))}))};return r.a.createElement(R.a,{container:!0},r.a.createElement(R.a,{item:!0},r.a.createElement(q.a,{variant:"h3",gutterBottom:!0},"Login:")),r.a.createElement(R.a,{container:!0},r.a.createElement(Z.a,null,r.a.createElement(G.a,{htmlFor:"username"},"Username"),r.a.createElement(K.a,{type:"text",className:"form-control",name:"username",value:c.username,onChange:u}),c.submitted&&!c.username&&r.a.createElement(H.a,{severity:"warning"},r.a.createElement(V.a,null,"Username is required"))),r.a.createElement(Z.a,null,r.a.createElement(G.a,{htmlFor:"password"},"Password"),r.a.createElement(K.a,{type:c.showPassword?"text":"password",className:"form-control",name:"password",value:c.password,onChange:u,endAdornment:r.a.createElement(Q.a,{position:"end"},r.a.createElement(W.a,{onClick:function(){return e=!c.showPassword,void o((function(t){return Object(m.a)({},t,{showPassword:e})}));var e},onMouseDown:function(e){e.preventDefault()}},c.showPassword?r.a.createElement(F.a,null):r.a.createElement(L.a,null)))}),c.submitted&&!c.password&&r.a.createElement(H.a,{severity:"warning"},r.a.createElement(V.a,null,"Password is required")))),r.a.createElement(R.a,{item:!0},r.a.createElement(J.a,{type:"submit",variant:"contained",disabled:c.loading,onClick:function(t){t.preventDefault(),o((function(e){return Object(m.a)({},e,{submitted:!0})}));var n=c.username,a=c.password;n&&a&&(o((function(e){return Object(m.a)({},e,{loading:!0})})),M.login(n,X.createHash("sha256").update(a).digest("base64")).then((function(){var t=(e.location.state||{from:{pathname:"/"}}).from;e.history.push(t)}),(function(e){o((function(t){return Object(m.a)({},t,{error:e,loading:!1})}))})))}},"Login"),c.loading&&r.a.createElement(z.a,null),c.error&&r.a.createElement(H.a,{severity:"error"},r.a.createElement(V.a,null," ",c.error))))},$=n(658),ee=n(659),te=n(660),ne=n(661),ae=n(373),re=n(432),ce=n(654),oe=n(392);function ue(){var e=Object(a.useState)({}),t=Object(f.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),u=Object(f.a)(o,2),s=u[0],l=u[1],i=Object(a.useState)({loading:!0}),d=Object(f.a)(i,2),p=d[0],h=d[1],b=Object(a.useState)(!1),E=Object(f.a)(b,2),v=E[0],y=E[1];Object(a.useEffect)((function(){var e=!1;return c(JSON.parse(localStorage.getItem("user"))),M.getAll("users").then((function(t){e||h(t.map((function(e){return Object(m.a)({},e,{passwordChanged:!1,showPassword:!1})})))})),function(){return e=!0}}),[]);var g=function(e){var t=e.target,n=t.name,a=t.value,r=t.id;"isAdmin"===n&&(a=e.target.checked),h((function(e){return e.map((function(e){if(e._id===r){var t=Object.assign({},e);return t[n]=a,"password"===n&&(t.passwordChanged=!0),t}return e}))}))},w=function(e){e.preventDefault()};return p.loading?r.a.createElement("div",null,r.a.createElement(z.a,null)):n.isAdmin?r.a.createElement(R.a,{container:!0},r.a.createElement(R.a,{item:!0},r.a.createElement(T,{currentUser:n})),r.a.createElement(R.a,{item:!0},r.a.createElement(q.a,{variant:"h3",gutterBottom:!0},"Users control panel: ",n.username)),p.length&&r.a.createElement(R.a,{container:!0},p.map((function(e,t){return r.a.createElement(R.a,{item:!0,key:e._id},r.a.createElement(ae.a,{type:"text_u",label:"Username",id:e._id,name:"username",defaultValue:e.username,onChange:g}),r.a.createElement(Z.a,null,r.a.createElement(G.a,{htmlFor:"standard-adornment-password"},"Password"),r.a.createElement(K.a,{id:e._id,type:e.showPassword?"text":"password",name:"password",onChange:g,endAdornment:r.a.createElement(Q.a,{position:"end"},r.a.createElement(W.a,{onClick:function(){return t=e._id,void h(p.map((function(e){return Object(m.a)({},e,{showPassword:e._id===t?!e.showPassword:e.showPassword})})));var t},onMouseDown:w},e.showPassword?r.a.createElement(F.a,null):r.a.createElement(L.a,null)))})),r.a.createElement(ae.a,{type:"text_f",label:"First name",id:e._id,name:"firstName",defaultValue:e.firstName,onChange:g}),r.a.createElement(ae.a,{type:"text_l",label:"Last name",id:e._id,name:"lastName",defaultValue:e.lastName,onChange:g}),r.a.createElement(ae.a,{type:"text_e",label:"Email",id:e._id,name:"email",defaultValue:e.email,onChange:g}),r.a.createElement(re.a,{type:"checkbox",id:e._id,name:"isAdmin",defaultChecked:e.isAdmin,onClick:g}),r.a.createElement(J.a,{type:"button",variant:"contained",color:"primary",onClick:function(){return function(e){var t=Object(m.a)({},p.find((function(t){return t._id===e})));M.updateOne("users",Object(m.a)({},t,{password:t.passwordChanged?oe.createHash("sha256").update(t.password).digest("base64"):t.password})).then((function(e){h(p.map((function(t){return t._id===e._id?t=e:t}))),y(JSON.parse('{"message":"User '.concat(e.username,' has been changed"}')))}))}(e._id)},startIcon:r.a.createElement($.a,null)}," ","Save"," "),r.a.createElement(J.a,{type:"button",variant:"contained",onClick:function(){return t=e._id,void M.deleteOne("users",t).then(h((function(e){return e.filter((function(e){return e._id!==t}))}))).then((function(e){return y(e)}));var t},startIcon:r.a.createElement(ee.a,null)}," ","Delete"," "),r.a.createElement("br",null),r.a.createElement("br",null))}))),r.a.createElement(R.a,{item:!0},r.a.createElement(ae.a,{type:"text_ a",onChange:function(e){l({username:e.target.value})},value:s.username}),r.a.createElement(ce.a,{color:"primary","aria-label":"add",onClick:function(){M.addOne("users",{username:s.username}).then((function(e){h((function(t){return t.concat(e)})),y(JSON.parse('{"message":"User '.concat(e.username,' has been added"}'))),l({username:""})}))},disabled:!s},r.a.createElement(te.a,null)),r.a.createElement("br",null),r.a.createElement("br",null),v&&r.a.createElement(H.a,{severity:"success"},r.a.createElement(V.a,null," ",v.message))),r.a.createElement(R.a,{container:!0},r.a.createElement(R.a,{item:!0},r.a.createElement(J.a,{type:"button",variant:"contained",color:"primary",onClick:function(){M.calcMoney().then((function(e){return y(JSON.parse('{"message":"Update '.concat(e,'"}')))}))},startIcon:r.a.createElement(ne.a,null)}," ","\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0441\u0443\u043c\u043c\u044b"," ")),r.a.createElement(R.a,{item:!0},r.a.createElement(J.a,{type:"button",variant:"contained",color:"default",onClick:function(){M.zeroingMoney().then((function(e){return y(JSON.parse('{"message":"Zeroing '.concat(e,'"}')))}))},startIcon:r.a.createElement(ee.a,null)}," ","\u041e\u0431\u043d\u0443\u043b\u0438\u0442\u044c \u0441\u0443\u043c\u043c\u044b"," ")))):r.a.createElement("div",null,r.a.createElement("h1",null,"Access denied"))}function se(){var e=Object(a.useState)({}),t=Object(f.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)({loading:!0}),u=Object(f.a)(o,2),s=u[0],l=u[1],i=[{title:"_id",field:"_id",hidden:!0},{title:"\u2116",field:"matchNo",defaultSort:"asc"},{title:"Home",field:"homeName",lookup:M.teams},{title:"Score",field:"home",type:"numeric"},{title:"Away",field:"awayName",lookup:M.teams},{title:"Score",field:"away",type:"numeric"},{title:"Coefficient",field:"coefficient",type:"numeric"},{title:"Enable",field:"enable",type:"boolean"},{title:"Visability",field:"visability",type:"boolean"}];return Object(a.useEffect)((function(){c(JSON.parse(localStorage.getItem("user"))),M.getAll("matches").then((function(e){return l(e)}))}),[]),s.loading?r.a.createElement("div",null,r.a.createElement(z.a,null)," "):n.isAdmin?r.a.createElement("div",null,r.a.createElement(T,{currentUser:n}),r.a.createElement(p.a,{options:{pageSize:10,pageSizeOptions:[10,51]},title:"\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u043e \u043c\u0430\u0442\u0447\u0430\u0445, ".concat(n.username),columns:i,data:s,editable:{onRowAdd:function(e){return M.addOne("matches",Object(m.a)({},e)).then(l((function(t){return t.concat(e)})))},onRowUpdate:function(e,t){return M.updateOne("matches",Object(m.a)({},e)).then((function(e){return l((function(t){return t.map((function(t){return t._id===e._id?e:t}))}))}))},onRowDelete:function(e){return M.deleteOne("matches",e._id).then(l((function(t){return t.filter((function(t){return t._id!==e._id}))})))}}})):r.a.createElement("div",null,r.a.createElement(T,{currentUser:n}),r.a.createElement(p.a,{options:{pageSize:10,pageSizeOptions:[10,51]},title:"".concat(n.username,", \u044d\u0442\u043e \u043d\u0430\u0448 \u044d\u0442\u0430\u043b\u043e\u043d, \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0439 \u0441\u0447\u0451\u0442, \u043a\u043e\u044d\u0444\u0444\u0438\u0446\u0438\u0435\u043d\u0442\u044b \u043d\u0430 \u043c\u0430\u0442\u0447\u0438, \u0438\u0445 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e\u0441\u0442\u044c \u0434\u043b\u044f \u0441\u0442\u0430\u0432\u043e\u043a \u0438 \u0432\u0438\u0434\u0438\u043c\u043e\u0441\u0442\u044c \u0441\u043e\u0431\u0440\u0430\u043d\u044b \u0442\u0443\u0442"),columns:i.slice(0,-2),data:s}))}function le(){var e=Object(a.useState)({}),t=Object(f.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)({loading:!0}),u=Object(f.a)(o,2),s=u[0],l=u[1],i=Object(a.useState)({loading:!0}),m=Object(f.a)(i,2),d=m[0],h=m[1];return Object(a.useEffect)((function(){c(JSON.parse(localStorage.getItem("user"))),Object(E.a)(b.a.mark((function e(){var t,n,a,c,o,u;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.getAll("users");case 2:return t=e.sent,e.next=5,M.getAll("matches");case 5:n=e.sent,a=M.getSortedMatches(n),c=a.map((function(e,t){var n=null!==e.home&&void 0!==e.home?"(".concat(e.home,":").concat(e.away,")"):"";return{title:"".concat(e.homeName," - ").concat(e.awayName," ").concat(n),field:"".concat(e.matchNo),render:function(e){return r.a.createElement("div",{style:{backgroundColor:5===e["pets_".concat(t+1)]?"#C9B037":3===e["pets_".concat(t+1)]?"#B4B4B4":1===e["pets_".concat(t+1)]?"#AD8A56":"white"}},e[t+1])}}})),o=[{title:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438",field:"user"},{title:"\u041e\u0447\u043a\u0438",field:"pets"},{title:"\u0412\u044b\u0439\u0433\u0440\u044b\u0448",field:"money"}].concat(c),l(o),u=t.map((function(e){var t=Object.assign({},e);t.user=e.username,t.pets=0,t.money=0;for(var a=0,r=function(r){var c=e.stakes.find((function(e){return e.matchNo===r})),o=n.find((function(e){return e.matchNo===r}));if(void 0!==c&&void 0!==o&&!1===o.visability)return"continue";a=t.stakes[r-1].money+a;var u=0!==t.stakes[r-1].money?"; ".concat(t.stakes[r-1].money,"\u20bd"):"",s=void 0!==c&&void 0!==o?M.calcPets(c.home,c.away,o.home,o.away):0;t[r]=null!==c.home&&void 0!==c.home?"".concat(c.home,":").concat(c.away," (").concat(s).concat(u,")"):"",t["pets_".concat(r)]=s,t.pets=t.pets+s},c=1;c<52;c++)r(c);return t.money=a,t})),h(u);case 12:case"end":return e.stop()}}),e)})))()}),[]),s.loading||d.loading?r.a.createElement("div",null,r.a.createElement(z.a,null)):r.a.createElement("div",null,r.a.createElement(T,{currentUser:n}),r.a.createElement(p.a,{options:{pageSize:10,pageSizeOptions:[10,51]},title:"\u042d\u0442\u043e \u043e\u0431\u0449\u0430\u044f \u0442\u0430\u0431\u043b\u0438\u0446\u0430 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432, ".concat(n.username,", \u0442\u0443\u0442 \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0443\u0436\u043d\u043e \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c, \u043f\u0440\u043e\u0441\u0442\u043e \u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0438 \u043a\u0430\u043a \u0441\u043f\u0440\u0430\u0432\u043b\u044f\u044e\u0442\u0441\u044f \u0434\u0440\u0443\u0433\u0438\u0435 \u0438\u0433\u0440\u043e\u043a\u0438"),columns:s,data:d}))}function ie(){var e=Object(a.useState)({}),t=Object(f.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(0),u=Object(f.a)(o,2),s=u[0],l=u[1],i=Object(a.useState)(0),m=Object(f.a)(i,2),d=m[0],p=m[1],h=Object(a.useState)(!1),b=Object(f.a)(h,2),E=b[0],v=b[1];Object(a.useEffect)((function(){return c(JSON.parse(localStorage.getItem("user"))),function(){return!0}}),[]);return n.loading?r.a.createElement("div",null,r.a.createElement(z.a,null)):n.isAdmin?r.a.createElement(R.a,{container:!0},r.a.createElement(R.a,{item:!0},r.a.createElement(T,{currentUser:n})),r.a.createElement(R.a,{item:!0},r.a.createElement(q.a,{variant:"h3",gutterBottom:!0},"Test panel: ",n.username)),r.a.createElement(R.a,{container:!0},r.a.createElement(R.a,{item:!0},r.a.createElement(J.a,{type:"button",variant:"contained",color:"primary",onClick:function(){M.calcMoney().then((function(e){return v(JSON.parse('{"message":"Update '.concat(e,'"}')))}))},startIcon:r.a.createElement(ne.a,null)}," ","\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0441\u0443\u043c\u043c\u044b"," ")),r.a.createElement(R.a,{item:!0},r.a.createElement(J.a,{type:"button",variant:"contained",color:"default",onClick:function(){M.zeroingMoney().then((function(e){return v(JSON.parse('{"message":"Zeroing '.concat(e,'"}')))}))},startIcon:r.a.createElement(ee.a,null)}," ","\u041e\u0431\u043d\u0443\u043b\u0438\u0442\u044c \u0441\u0443\u043c\u043c\u044b"," "))),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(R.a,{container:!0},r.a.createElement(R.a,{item:!0},r.a.createElement(ae.a,{label:"Stackes for every user",type:"text",onChange:function(e){p(e.target.value)},value:d}),r.a.createElement(ce.a,{color:"primary","aria-label":"add",onClick:function(){M.setTestStakes(d,!1).then((function(e){return v(JSON.parse('{"message":"setTestStakes '.concat(e," ").concat(d,'"}')))}))},disabled:!1},r.a.createElement(te.a,null))),r.a.createElement(R.a,{item:!0},r.a.createElement(ae.a,{label:"Matches",type:"text",onChange:function(e){l(e.target.value)},value:s}),r.a.createElement(ce.a,{color:"primary","aria-label":"add",onClick:function(){M.setTestMatches(s,!1).then((function(e){return v(JSON.parse('{"message":"setTestMatches '.concat(e," ").concat(s,'"}')))}))},disabled:!1},r.a.createElement(te.a,null)))),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(R.a,{container:!0},r.a.createElement(R.a,{item:!0},r.a.createElement(J.a,{type:"button",variant:"contained",color:"default",onClick:function(){M.setTestStakes(d,!0).then((function(e){return v(JSON.parse('{"message":"zeroingTestStakes '.concat(e," ").concat(d,'"}')))}))},startIcon:r.a.createElement(ee.a,null)}," ","\u041e\u0431\u043d\u0443\u043b\u0438\u0442\u044c \u0441\u0442\u0430\u0432\u043a\u0438"," ")),r.a.createElement(R.a,{item:!0},r.a.createElement(J.a,{type:"button",variant:"contained",color:"default",onClick:function(){M.setTestMatches(s,!0).then((function(e){return v(JSON.parse('{"message":"zeroingTestMatches '.concat(e," ").concat(s,'"}')))}))},startIcon:r.a.createElement(ee.a,null)}," ","\u041e\u0431\u043d\u0443\u043b\u0438\u0442\u044c \u043c\u0430\u0442\u0447\u0438"," "))),r.a.createElement(R.a,{container:!0},r.a.createElement(R.a,{item:!0},E&&r.a.createElement(H.a,{severity:"success"},r.a.createElement(V.a,null," ",E.message))))):r.a.createElement("div",null,r.a.createElement("h1",null,"Access denied"))}var me=function(){return r.a.createElement("div",null,r.a.createElement(u.a,null,r.a.createElement(s.d,null,r.a.createElement("div",null,r.a.createElement(i,{exact:!0,path:"/",component:D}),r.a.createElement(s.b,{path:"/login",component:Y}),r.a.createElement(i,{exact:!0,path:"/admin",component:ue}),r.a.createElement(i,{exact:!0,path:"/info",component:se}),r.a.createElement(i,{exact:!0,path:"/result",component:le}),r.a.createElement(i,{exact:!0,path:"/test",component:ie})))))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(me,null)),document.getElementById("root"))}},[[449,1,2]]]);
//# sourceMappingURL=main.5fa9b4f6.chunk.js.map