(this["webpackJsonpreact-client"]=this["webpackJsonpreact-client"]||[]).push([[0],{449:function(e,t,a){e.exports=a(627)},548:function(e,t){},550:function(e,t){},584:function(e,t){},585:function(e,t){},627:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(17),o=a.n(c),u=a(99),i=a(108),s=a(441),l=function(e){var t=e.component,a=Object(s.a)(e,["component"]);return r.a.createElement(i.b,Object.assign({},a,{render:function(e){return localStorage.getItem("user")?r.a.createElement(t,e):r.a.createElement(i.a,{to:{pathname:"/login",state:{from:e.location}}})}}))},m=a(31),d=a(36),f=a(118),p=a.n(f),A=a(22),h=a.n(A),b=a(48),E=a(137),w={};"\u0411\u0435\u043b\u044c\u0433\u0438\u044f,\u0418\u0442\u0430\u043b\u0438\u044f,\u0420\u043e\u0441\u0441\u0438\u044f,\u0424\u0438\u043d\u043b\u044f\u043d\u0434\u0438\u044f,\u0424\u0440\u0430\u043d\u0446\u0438\u044f,\u041f\u043e\u043b\u044c\u0448\u0430,\u0423\u043a\u0440\u0430\u0438\u043d\u0430,\u0418\u0441\u043f\u0430\u043d\u0438\u044f,\u0422\u0443\u0440\u0446\u0438\u044f,\u0410\u043d\u0433\u043b\u0438\u044f,\u0427\u0435\u0445\u0438\u044f,\u0428\u0432\u0435\u0446\u0438\u044f,\u041d\u0438\u0434\u0435\u0440\u043b\u0430\u043d\u0434\u044b,\u0413\u0435\u0440\u043c\u0430\u043d\u0438\u044f,\u0425\u043e\u0440\u0432\u0430\u0442\u0438\u044f,\u0410\u0432\u0441\u0442\u0440\u0438\u044f,\u041f\u043e\u0440\u0442\u0443\u0433\u0430\u043b\u0438\u044f,\u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u044f,\u0414\u0430\u043d\u0438\u044f,\u0423\u044d\u043b\u044c\u0441".split(",").forEach((function(e){return w=Object(m.a)({},w,Object(E.a)({},e,e))}));var g=function(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.authdata?{Authorization:"Basic "+e.authdata,"Content-Type":"application/json"}:{}},v=function(){return localStorage.removeItem("user")},O=function(){var e=Object(b.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(a=e.sent,t.ok){e.next=6;break}return 401===t.status&&(v(),window.location.reload(!0)),e.abrupt("return",Promise.reject(a&&a.message||t.statusText));case 6:return e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=function(){var e=Object(b.a)(h.a.mark((function e(t,a,n){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=O,e.next=3,fetch("".concat("https://node-euro-2021.ew.r.appspot.com","/").concat(t),Object(m.a)({method:a,headers:g()},n||{}));case 3:return e.t1=e.sent,e.next=6,(0,e.t0)(e.t1);case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),j={get:function(){var e=Object(b.a)(h.a.mark((function e(t,a){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(t,"GET",a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),post:function(){var e=Object(b.a)(h.a.mark((function e(t,a){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(t,"POST",a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),put:function(){var e=Object(b.a)(h.a.mark((function e(t,a){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(t,"PUT",a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),delete:function(){var e=Object(b.a)(h.a.mark((function e(t,a){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(t,"DELETE",a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},k={login:function(){var e=Object(b.a)(h.a.mark((function e(t,a){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.post("users/authenticate",{headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:a})});case 2:return(n=e.sent)&&(n.authdata=window.btoa(t+":"+a),localStorage.setItem("user",JSON.stringify(n))),e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),logout:v,updateOne:function(){var e=Object(b.a)(h.a.mark((function e(t,a){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.put("".concat(t,"/").concat(a._id),{body:JSON.stringify(Object(m.a)({},a))});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),addOne:function(){var e=Object(b.a)(h.a.mark((function e(t,a){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.post(t,{body:JSON.stringify(Object(m.a)({},a))});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),deleteOne:function(){var e=Object(b.a)(h.a.mark((function e(t,a){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",j.delete("".concat(t,"/").concat(a)));case 1:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),getAll:function(){var e=Object(b.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.get(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getStakesByUserId:function(){var e=Object(b.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.get("users/".concat(t,"/stakes"));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),setStakesByUserId:function(){var e=Object(b.a)(h.a.mark((function e(t,a){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.put("users/".concat(t,"/stakes/").concat(a.matchNo),{body:JSON.stringify(Object(m.a)({},a))});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),teams:w,calcPets:function(e,t,a,n){if(null===e||null===t||null===a||null===n)return 0;var r=e-t,c=a-n;switch(!0){case e===a&&t===n:return 5;case r===c:return 3;case r>0&&c>0||r<0&&c<0||0===r&&0===c:return 1;default:return 0}}},C=a(372),S=a(213),x=a(353);function N(e){var t=Object(n.useState)(null),a=Object(d.a)(t,2),c=a[0],o=a[1],i=function(){o(null)};return r.a.createElement("div",null,r.a.createElement(C.a,{"aria-controls":"simple-menu","aria-haspopup":"true",onClick:function(e){o(e.currentTarget)}},"\u041c\u0415\u041d\u042e"),r.a.createElement(S.a,{id:"simple-menu",anchorEl:c,keepMounted:!0,open:Boolean(c),onClose:i},r.a.createElement(x.a,null," ",r.a.createElement(u.b,{to:"/"},"\u0414\u043e\u043c\u0430\u0448\u043d\u044f\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430")),r.a.createElement(x.a,{onClick:i},r.a.createElement(u.b,{to:"/result"},"\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b")),r.a.createElement(x.a,{onClick:i},r.a.createElement(u.b,{to:"/info"},"\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f")),e.currentUser.isAdmin&&r.a.createElement(x.a,{onClick:i},r.a.createElement(u.b,{to:"/admin"},"\u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435")),r.a.createElement(x.a,{onClick:i},r.a.createElement(u.b,{to:"/login"},"\u0412\u044b\u0439\u0442\u0438"))))}var I=a(350);function _(){var e=Object(n.useState)({}),t=Object(d.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)({loading:!0}),u=Object(d.a)(o,2),i=u[0],s=u[1],l=Object(n.useState)({loading:!0}),f=Object(d.a)(l,2),A=f[0],h=f[1],b=[{title:"_id",field:"_id",hidden:!0},{title:"\u2116",field:"matchNo",editable:"never",defaultSort:"asc"},{title:"Home",field:"homeName",lookup:k.teams,editable:"never"},{title:"Score",field:"home",type:"numeric"},{title:"Away",field:"awayName",lookup:k.teams,editable:"never"},{title:"Score",field:"away",type:"numeric"},{title:"Coefficient",field:"coefficient",type:"numeric",editable:"never"},{title:"Enable",field:"enable",type:"boolean",editable:"never"},{title:"Pets",field:"pets"}];Object(n.useEffect)((function(){var e=JSON.parse(localStorage.getItem("user"));c(e),k.getStakesByUserId(e._id).then((function(e){return s(e)})),k.getAll("matches").then((function(e){return h(e)}))}),[]);var E,w;return A.loading||i.loading?r.a.createElement("div",null,r.a.createElement(I.a,null)," "):r.a.createElement("div",null,r.a.createElement(N,{currentUser:a}),r.a.createElement(p.a,{options:{pageSize:10,pageSizeOptions:[10,60],sorting:!0,rowStyle:function(e){return 5===e.pets?{backgroundColor:"#C9B037"}:3===e.pets?{backgroundColor:"#B4B4B4"}:1===e.pets?{backgroundColor:"#AD8A56"}:void 0}},title:"\u042d\u0442\u043e \u0434\u043e\u043c\u0430\u0448\u043d\u044f\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430, \u0442\u0443\u0442 \u043d\u0443\u0436\u043d\u043e \u0434\u0435\u043b\u0430\u0442\u044c \u0441\u0442\u0430\u0432\u043a\u0438, ".concat(a.username),columns:b,data:(E=i,w=A,w.map((function(e){var t=E.find((function(t){return t.matchNo===e.matchNo}));if(void 0!==t&&e.matchNo===t.matchNo){var a=Object.assign({},e);return a.home=t.home,a.away=t.away,a.realHome=e.home,a.realAway=e.away,a.pets=k.calcPets(a.home,a.away,a.realHome,a.realAway),e=a}return e}))),detailPanel:function(e){if(!1===e.enable)return r.a.createElement("div",null,"\u041c\u0430\u0442\u0447 ",e.homeName," - ",e.awayName," \u0441\u044b\u0433\u0440\u0430\u043d, \u0441\u0447\u0451\u0442"," ",e.realHome," : ",e.realAway)},editable:{isEditable:function(e){return!0===e.enable},onRowUpdate:function(e,t){return k.setStakesByUserId(a._id,Object(m.a)({},e)).then((function(t){s((function(a){return a.map((function(a){var n=t.stakes.find((function(t){return t.matchNo===e.matchNo}));if(a.matchNo===n.matchNo){var r=Object.assign({},a);return r.home=n.home,r.away=n.away,r}return a}))}))}))}}}))}var B=a(662),Q=a(655),U=a(656),D=a(657),P=a(651),J=a(100),M=a(286),G=a(287),H=a(227),z=a(374),K=a(285),R=a(389),Y=function(e){k.logout();var t=Object(n.useState)({username:"",password:"",error:"",loading:!1,submitted:!1,showPassword:!1}),a=Object(d.a)(t,2),c=a[0],o=a[1],u=function(e){var t=e.target,a=t.name,n=t.value;o((function(e){return Object(m.a)({},e,Object(E.a)({},a,n))}))};return r.a.createElement(P.a,{container:!0},r.a.createElement(P.a,{item:!0},r.a.createElement(J.a,{variant:"h3",gutterBottom:!0},"Login:")),r.a.createElement(P.a,{container:!0},r.a.createElement(M.a,null,r.a.createElement(G.a,{htmlFor:"username"},"Username"),r.a.createElement(H.a,{type:"text",className:"form-control",name:"username",value:c.username,onChange:u}),c.submitted&&!c.username&&r.a.createElement(B.a,{severity:"warning"},r.a.createElement(Q.a,null,"Username is required"))),r.a.createElement(M.a,null,r.a.createElement(G.a,{htmlFor:"password"},"Password"),r.a.createElement(H.a,{type:c.showPassword?"text":"password",className:"form-control",name:"password",value:c.password,onChange:u,endAdornment:r.a.createElement(z.a,{position:"end"},r.a.createElement(K.a,{onClick:function(){return e=!c.showPassword,void o((function(t){return Object(m.a)({},t,{showPassword:e})}));var e},onMouseDown:function(e){e.preventDefault()}},c.showPassword?r.a.createElement(U.a,null):r.a.createElement(D.a,null)))}),c.submitted&&!c.password&&r.a.createElement(B.a,{severity:"warning"},r.a.createElement(Q.a,null,"Password is required")))),r.a.createElement(P.a,{item:!0},r.a.createElement(C.a,{type:"submit",variant:"contained",disabled:c.loading,onClick:function(t){t.preventDefault(),o((function(e){return Object(m.a)({},e,{submitted:!0})}));var a=c.username,n=c.password;a&&n&&(o((function(e){return Object(m.a)({},e,{loading:!0})})),k.login(a,R.createHash("sha256").update(n).digest("base64")).then((function(){var t=(e.location.state||{from:{pathname:"/"}}).from;e.history.push(t)}),(function(e){o((function(t){return Object(m.a)({},t,{error:e,loading:!1})}))})))}},"Login"),c.loading&&r.a.createElement("img",{src:"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="}),c.error&&r.a.createElement(B.a,{severity:"error"},r.a.createElement(Q.a,null," ",c.error))))},F=a(658),T=a(659),V=a(660),L=a(370),W=a(429),Z=a(654),q=a(389);function X(){var e=Object(n.useState)({}),t=Object(d.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(""),u=Object(d.a)(o,2),i=u[0],s=u[1],l=Object(n.useState)({loading:!0}),f=Object(d.a)(l,2),p=f[0],A=f[1],h=Object(n.useState)(!1),b=Object(d.a)(h,2),E=b[0],w=b[1];Object(n.useEffect)((function(){var e=!1;return c(JSON.parse(localStorage.getItem("user"))),k.getAll("users").then((function(t){e||A(t.map((function(e){return Object(m.a)({},e,{passwordChanged:!1,showPassword:!1})})))})),function(){return e=!0}}),[]);var g=function(e){var t=e.target,a=t.name,n=t.value,r=t.id;"isAdmin"===a&&(n=e.target.checked),A((function(e){return e.map((function(e){if(e._id===r){var t=Object.assign({},e);return t[a]=n,"password"===a&&(t.passwordChanged=!0),t}return e}))}))},v=function(e){e.preventDefault()};return p.loading?r.a.createElement("div",null,r.a.createElement(I.a,null)):a.isAdmin?r.a.createElement(P.a,{container:!0},r.a.createElement(P.a,{item:!0},r.a.createElement(N,{currentUser:a})),r.a.createElement(P.a,{item:!0},r.a.createElement(J.a,{variant:"h3",gutterBottom:!0},"Users control panel: ",a.username)),p.length&&r.a.createElement(P.a,{container:!0},p.map((function(e,t){return r.a.createElement(P.a,{item:!0,key:e._id},r.a.createElement(L.a,{type:"text_u",label:"Username",id:e._id,name:"username",defaultValue:e.username,onChange:g}),r.a.createElement(M.a,null,r.a.createElement(G.a,{htmlFor:"standard-adornment-password"},"Password"),r.a.createElement(H.a,{id:e._id,type:e.showPassword?"text":"password",name:"password",onChange:g,endAdornment:r.a.createElement(z.a,{position:"end"},r.a.createElement(K.a,{onClick:function(){return t=e._id,void A(p.map((function(e){return Object(m.a)({},e,{showPassword:e._id===t?!e.showPassword:e.showPassword})})));var t},onMouseDown:v},e.showPassword?r.a.createElement(U.a,null):r.a.createElement(D.a,null)))})),r.a.createElement(L.a,{type:"text_f",label:"First name",id:e._id,name:"firstName",defaultValue:e.firstName,onChange:g}),r.a.createElement(L.a,{type:"text_l",label:"Last name",id:e._id,name:"lastName",defaultValue:e.lastName,onChange:g}),r.a.createElement(L.a,{type:"text_e",label:"Email",id:e._id,name:"email",defaultValue:e.email,onChange:g}),r.a.createElement(W.a,{type:"checkbox",id:e._id,name:"isAdmin",defaultChecked:e.isAdmin,onClick:g}),r.a.createElement(C.a,{type:"button",variant:"contained",color:"primary",onClick:function(){return function(e){var t=Object(m.a)({},p.find((function(t){return t._id===e})));k.updateOne("users",Object(m.a)({},t,{password:t.passwordChanged?q.createHash("sha256").update(t.password).digest("base64"):t.password})).then((function(e){A(p.map((function(t){return t._id===e._id?t=e:t}))),w(JSON.parse('{"message":"User '.concat(e.username,' has been changed"}')))}))}(e._id)},startIcon:r.a.createElement(F.a,null)}," ","Save"," "),r.a.createElement(C.a,{type:"button",variant:"contained",onClick:function(){return t=e._id,void k.deleteOne("users",t).then(A((function(e){return e.filter((function(e){return e._id!==t}))}))).then((function(e){return w(e)}));var t},startIcon:r.a.createElement(T.a,null)}," ","Delete"," "),r.a.createElement("br",null),r.a.createElement("br",null))}))),r.a.createElement(P.a,{item:!0},r.a.createElement(L.a,{type:"text_ a",onChange:function(e){s({username:e.target.value})},value:i.username}),r.a.createElement(Z.a,{color:"primary","aria-label":"add",onClick:function(){k.addOne("users",{username:i.username}).then((function(e){A((function(t){return t.concat(e)})),w(JSON.parse('{"message":"User '.concat(e.username,' has been added"}'))),s({username:""})}))},disabled:!i},r.a.createElement(V.a,null)),r.a.createElement("br",null),r.a.createElement("br",null),E&&r.a.createElement(B.a,{severity:"success"},r.a.createElement(Q.a,null," ",E.message)))):r.a.createElement("div",null,r.a.createElement("h1",null,"Access denied"))}function $(){var e=Object(n.useState)({}),t=Object(d.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)({loading:!0}),u=Object(d.a)(o,2),i=u[0],s=u[1],l=[{title:"_id",field:"_id",hidden:!0},{title:"\u2116",field:"matchNo",defaultSort:"asc"},{title:"Home",field:"homeName",lookup:k.teams},{title:"Score",field:"home",type:"numeric"},{title:"Away",field:"awayName",lookup:k.teams},{title:"Score",field:"away",type:"numeric"},{title:"Coefficient",field:"coefficient",type:"numeric"},{title:"Enable",field:"enable",type:"boolean"},{title:"Visability",field:"visability",type:"boolean"}];return Object(n.useEffect)((function(){c(JSON.parse(localStorage.getItem("user"))),k.getAll("matches").then((function(e){return s(e)}))}),[]),i.loading?r.a.createElement("div",null,r.a.createElement(I.a,null)," "):a.isAdmin?r.a.createElement("div",null,r.a.createElement(N,{currentUser:a}),r.a.createElement(p.a,{options:{pageSize:10,pageSizeOptions:[10,60]},title:"\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u043e \u043c\u0430\u0442\u0447\u0430\u0445, ".concat(a.username),columns:l,data:i,editable:{onRowAdd:function(e){return k.addOne("matches",Object(m.a)({},e)).then(s((function(t){return t.concat(e)})))},onRowUpdate:function(e,t){return k.updateOne("matches",Object(m.a)({},e)).then((function(e){return s((function(t){return t.map((function(t){return t._id===e._id?e:t}))}))}))},onRowDelete:function(e){return k.deleteOne("matches",e._id).then(s((function(t){return t.filter((function(t){return t._id!==e._id}))})))}}})):r.a.createElement("div",null,r.a.createElement(N,{currentUser:a}),r.a.createElement(p.a,{options:{pageSize:10,pageSizeOptions:[10,60]},title:"\u0422\u0443\u0442 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u043e \u043c\u0430\u0442\u0447\u0430\u0445, ".concat(a.username),columns:l.slice(0,-2),data:i}))}function ee(){var e=Object(n.useState)({}),t=Object(d.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)({loading:!0}),u=Object(d.a)(o,2),i=u[0],s=u[1],l=Object(n.useState)({loading:!0}),m=Object(d.a)(l,2),f=m[0],A=m[1];return Object(n.useEffect)((function(){c(JSON.parse(localStorage.getItem("user"))),Object(b.a)(h.a.mark((function e(){var t,a,n,c,o,u;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.getAll("users");case 2:return t=e.sent,e.next=5,k.getAll("matches");case 5:a=e.sent,n=a.sort((function(e,t){return e.matchNo-t.matchNo})),c=n.map((function(e,t){var a=null!==e.home&&void 0!==e.home?"(".concat(e.home,":").concat(e.away,")"):"";return{title:"".concat(e.homeName," - ").concat(e.awayName," ").concat(a),field:"".concat(e.matchNo),render:function(e){return r.a.createElement("div",{style:{backgroundColor:5===e["pets_".concat(t+1)]?"#C9B037":3===e["pets_".concat(t+1)]?"#B4B4B4":1===e["pets_".concat(t+1)]?"#AD8A56":"white"}},e[t+1])}}})),o=[{title:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438",field:"user"},{title:"\u041e\u0447\u043a\u0438",field:"pets"}].concat(c),s(o),u=t.map((function(e){var t=Object.assign({},e);t.user=e.username,t.pets=0;for(var n=function(n){var r=e.stakes.find((function(e){return e.matchNo===n})),c=a.find((function(e){return e.matchNo===n}));if(void 0!==r&&void 0!==c&&!1===c.visability)return"continue";var o=void 0!==r&&void 0!==c?k.calcPets(r.home,r.away,c.home,c.away):0;t[n]=null!==r.home&&void 0!==r.home?"".concat(r.home,":").concat(r.away," (").concat(o,")"):"",t["pets_".concat(n)]=o,t.pets=t.pets+o},r=1;r<52;r++)n(r);return t})),A(u);case 12:case"end":return e.stop()}}),e)})))()}),[]),i.loading||f.loading?r.a.createElement("div",null,r.a.createElement(I.a,null)):r.a.createElement("div",null,r.a.createElement(N,{currentUser:a}),r.a.createElement(p.a,{options:{pageSize:10,pageSizeOptions:[10,60]},title:"\u042d\u0442\u043e \u043e\u0431\u0449\u0430\u044f \u0442\u0430\u0431\u043b\u0438\u0446\u0430 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432, ".concat(a.username),columns:i,data:f}))}var te=function(){return r.a.createElement("div",null,r.a.createElement(u.a,null,r.a.createElement(i.d,null,r.a.createElement("div",null,r.a.createElement(l,{exact:!0,path:"/",component:_}),r.a.createElement(i.b,{path:"/login",component:Y}),r.a.createElement(l,{exact:!0,path:"/admin",component:X}),r.a.createElement(l,{exact:!0,path:"/info",component:$}),r.a.createElement(l,{exact:!0,path:"/result",component:ee})))))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(te,null)),document.getElementById("root"))}},[[449,1,2]]]);
//# sourceMappingURL=main.8499d238.chunk.js.map