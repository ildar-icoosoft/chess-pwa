(this["webpackJsonpchess-pwa"]=this["webpackJsonpchess-pwa"]||[]).push([[0],{117:function(e,a){},124:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(10),c=t.n(o),l=(t(74),t(21)),i=t(4),s=t(65),u=t(59),m=t(33),p=t.n(m),d=t(61),E=function(e){var a=e.games,t=void 0===a?[]:a;return r.a.createElement("div",{className:p.a.grid},t.map((function(e){var a=function(e){var a=e.initialFen;if("startpos"===a&&(a="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),!e.moves)return a;var t=new d.Chess(a);return e.moves.split(" ").forEach((function(e){t.move(e,{sloppy:!0})})),t.fen()}(e);return r.a.createElement("div",{className:p.a.cell,key:e.id},r.a.createElement(u.Board,{position:a,viewOnly:!1,width:240}))})))},f=t(62),g=t.n(f),v=t(63),h=t.n(v)()(g.a);h.sails.url="http://localhost:1337";var b=h,w=t(36),y=t(67),P=t(66),G=t(64),A=Object(P.a)({games:[]},{GET_GAMES:function(e,a){return{games:a.payload}},UPDATE_GAME:function(e,a){var t=a.payload,n=Object(y.a)({},t.previous,{},t.data),r=Object(G.findIndex)(e.games,{id:t.id});return-1!==r?{games:e.games.map((function(e,a){return a===r?n:e}))}:{games:[].concat(Object(w.a)(e.games),[n])}},CREATE_GAME:function(e,a){var t=a.payload;return{games:[].concat(Object(w.a)(e.games),[t.data])}}}),k=function(){var e=Object(n.useReducer)(A,{games:[]}),a=Object(s.a)(e,2),t=a[0],o=a[1];return Object(n.useEffect)((function(){var e;new Promise((function(e,a){b.socket.get("/api/v1/game/playing",(function(t,n){200===n.statusCode?e(t):a(n)}))})).then((function(e){o({type:"GET_GAMES",payload:e})})),e=function(e){"updated"===e.verb?o({type:"UPDATE_GAME",payload:e}):"created"===e.verb&&o({type:"CREATE_GAME",payload:e})},b.socket.on("game",(function(a){e(a)}))}),[]),r.a.createElement(E,{games:t.games})},O=function(){return r.a.createElement(k,null)},_=function(){return r.a.createElement(l.a,null,r.a.createElement("div",null,r.a.createElement("nav",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(l.b,{to:"/"},"Home")),r.a.createElement("li",null,r.a.createElement(l.b,{to:"/game"},"Game")))),r.a.createElement(i.c,null,r.a.createElement(i.a,{path:"/game"},"Game"),r.a.createElement(i.a,{path:"/"},r.a.createElement(O,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},33:function(e,a,t){e.exports={grid:"GamePreviewsList_grid__2dFgV"}},69:function(e,a,t){e.exports=t(124)},74:function(e,a,t){}},[[69,1,2]]]);
//# sourceMappingURL=main.0deeff79.chunk.js.map