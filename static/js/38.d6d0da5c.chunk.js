(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{413:function(e,t,a){"use strict";a.r(t);var n=a(9),c=a(10),l=a(12),r=a(11),i=a(13),s=a(0),o=a.n(s),m=a(336),u=function(e){function t(){return Object(n.a)(this,t),Object(l.a)(this,Object(r.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null)}}]),t}(s.Component);t.default=Object(m.a)(u)},614:function(e,t,a){"use strict";a.r(t);a(125);var n=a(56),c=(a(401),a(418)),l=(a(147),a(148)),r=a(9),i=a(10),s=a(12),o=a(11),m=a(13),u=(a(105),a(107)),p=(a(92),a(93)),d=a(0),E=a.n(d),f=a(130),h=a(21),v=(a(615),a(413)),b=p.a.TabPane,g=u.a.Meta,y=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,c=new Array(n),l=0;l<n;l++)c[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(c)))).state={menuList:[]},a.getCollectionList=function(){if(localStorage.length>0){for(var e=[],t=0;t<localStorage.length;t++){var n=localStorage.key(t);console.log(n);var c=JSON.parse(localStorage.getItem(n));console.log(typeof c),e.push(a.renderMenuList(c))}a.setState({menuList:e})}},a.renderMenuList=function(e){return E.a.createElement(f.a,{key:e.id,to:{pathname:"/admin/common/detail/".concat(e.id),state:e}},E.a.createElement(u.a,{hoverable:!0,className:"card",cover:E.a.createElement("img",{alt:"example",src:e.pic}),id:e.id},E.a.createElement(g,{title:e.name,description:e.tag})))},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return E.a.createElement("div",{className:"wrap"},E.a.createElement("div",{className:"user-header"},E.a.createElement(l.a,{className:"avatar",style:{color:"#f56a00",backgroundColor:"#fde3cf",width:100,height:100},src:this.props.imageUrl,alt:"U"}),E.a.createElement("div",{className:"info"},E.a.createElement("h1",null,this.props.nickName?this.props.nickName:"XXX","\u7684\u53a8\u623f"),E.a.createElement("div",{className:"statistic"},E.a.createElement(c.a,{className:"statistic-item",title:"\u6211\u7684\u70b9\u8d5e",value:101}),E.a.createElement(c.a,{className:"statistic-item",title:"\u6211\u7684\u5173\u6ce8",value:11})))),E.a.createElement(p.a,{defaultActiveKey:"1"},E.a.createElement(b,{tab:E.a.createElement("span",null,E.a.createElement(n.a,{type:"apple"}),"\u6211\u7684\u6536\u85cf"),key:"1"},E.a.createElement("div",{className:"collection-content"},this.state.menuList)),E.a.createElement(b,{tab:E.a.createElement("span",null,E.a.createElement(n.a,{type:"android"}),"\u6211\u7684\u70b9\u8d5e"),key:"2"}),E.a.createElement(b,{tab:E.a.createElement("span",null,E.a.createElement(n.a,{type:"setting"}),"\u6211\u7684\u4fe1\u606f"),key:"3"},E.a.createElement("div",{className:"setting"},E.a.createElement(v.default,null)))))}}]),t}(E.a.Component);t.default=Object(h.b)(function(e){return{imageUrl:e.personal.imageUrl,nickName:e.personal.nickName}},{})(y)},615:function(e,t,a){}}]);
//# sourceMappingURL=38.d6d0da5c.chunk.js.map