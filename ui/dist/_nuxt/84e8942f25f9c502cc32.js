(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{364:function(e,t,n){"use strict";n(10),n(9);var r=n(1),o=(n(58),n(350),n(59),n(7),n(4),n(8),n(29),n(35),n(199),n(2)),c=n(62),l=n(0);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v=["sm","md","lg","xl"],m=["start","end","center"];function h(e,t){return v.reduce((function(n,r){return n[e+Object(l.C)(r)]=t(),n}),{})}var y=function(e){return[].concat(m,["baseline","stretch"]).includes(e)},O=h("align",(function(){return{type:String,default:null,validator:y}})),j=function(e){return[].concat(m,["space-between","space-around"]).includes(e)},x=h("justify",(function(){return{type:String,default:null,validator:j}})),w=function(e){return[].concat(m,["space-between","space-around","stretch"]).includes(e)},I=h("alignContent",(function(){return{type:String,default:null,validator:w}})),k={align:Object.keys(O),justify:Object.keys(x),alignContent:Object.keys(I)},C={align:"align",justify:"justify",alignContent:"align-content"};function S(e,t,n){var r=C[e];if(null!=n){if(t){var o=t.replace(e,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var _=new Map;t.a=o.a.extend({name:"v-row",functional:!0,props:f(f(f({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:y}},O),{},{justify:{type:String,default:null,validator:j}},x),{},{alignContent:{type:String,default:null,validator:w}},I),render:function(e,t){var n=t.props,data=t.data,o=t.children,l="";for(var d in n)l+=String(n[d]);var f=_.get(l);return f||function(){var e,t;for(t in f=[],k)k[t].forEach((function(e){var r=n[e],o=S(t,e,r);o&&f.push(o)}));f.push((e={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(e,"align-".concat(n.align),n.align),Object(r.a)(e,"justify-".concat(n.justify),n.justify),Object(r.a)(e,"align-content-".concat(n.alignContent),n.alignContent),e)),_.set(l,f)}(),e(n.tag,Object(c.a)(data,{staticClass:"row",class:f}),o)}})},395:function(e,t,n){"use strict";n(10),n(9),n(61),n(29),n(35);var r=n(1),o=(n(58),n(350),n(59),n(7),n(4),n(8),n(13),n(199),n(2)),c=n(62),l=n(0);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v=["sm","md","lg","xl"],m=v.reduce((function(e,t){return e[t]={type:[Boolean,String,Number],default:!1},e}),{}),h=v.reduce((function(e,t){return e["offset"+Object(l.C)(t)]={type:[String,Number],default:null},e}),{}),y=v.reduce((function(e,t){return e["order"+Object(l.C)(t)]={type:[String,Number],default:null},e}),{}),O={col:Object.keys(m),offset:Object.keys(h),order:Object.keys(y)};function j(e,t,n){var r=e;if(null!=n&&!1!==n){if(t){var o=t.replace(e,"");r+="-".concat(o)}return"col"!==e||""!==n&&!0!==n?(r+="-".concat(n)).toLowerCase():r.toLowerCase()}}var x=new Map;t.a=o.a.extend({name:"v-col",functional:!0,props:f(f(f(f({cols:{type:[Boolean,String,Number],default:!1}},m),{},{offset:{type:[String,Number],default:null}},h),{},{order:{type:[String,Number],default:null}},y),{},{alignSelf:{type:String,default:null,validator:function(e){return["auto","start","end","center","baseline","stretch"].includes(e)}},tag:{type:String,default:"div"}}),render:function(e,t){var n=t.props,data=t.data,o=t.children,l=(t.parent,"");for(var d in n)l+=String(n[d]);var f=x.get(l);return f||function(){var e,t;for(t in f=[],O)O[t].forEach((function(e){var r=n[e],o=j(t,e,r);o&&f.push(o)}));var o=f.some((function(e){return e.startsWith("col-")}));f.push((e={col:!o||!n.cols},Object(r.a)(e,"col-".concat(n.cols),n.cols),Object(r.a)(e,"offset-".concat(n.offset),n.offset),Object(r.a)(e,"order-".concat(n.order),n.order),Object(r.a)(e,"align-self-".concat(n.alignSelf),n.alignSelf),e)),x.set(l,f)}(),e(n.tag,Object(c.a)(data,{class:f}),o)}})},428:function(e,t,n){"use strict";n.r(t);n(30);var r=n(118),o=n.n(r),c={inject:["showLoginDialog"],data:function(){return{search:"",dataLoading:!0,dialog:!1,headers:[{text:"Name",align:"center",value:"name"},{text:"Identity Number",value:"idcard",sortable:!1,align:"center"},{text:"Phone",value:"phone",sortable:!1,align:"center"},{text:"Actions",value:"actions",sortable:!1,align:"center"}],desserts:[],editedIndex:-1,editedItem:{name:"",idcard:0,phone:0},defaultItem:{name:"",idcard:0,phone:0}}},computed:{formTitle:function(){return-1===this.editedIndex?"New Item":"Edit Item"}},watch:{dialog:function(e){e||this.close()}},mounted:function(){this.initialize()},methods:{initialize:function(){var e=this;o.a.get("/api/passenger").then((function(t){e.desserts=t.data.result,e.dataLoading=!1})).catch((function(t){401===t.response.status&&e.showLoginDialog()}))},editItem:function(e){this.editedIndex=this.desserts.indexOf(e),this.editedItem=Object.assign({},e),this.dialog=!0},deleteItem:function(e){var t=this,n=this.desserts.indexOf(e);if(confirm("Are you sure you want to delete this item?")){var r="/api/deletepassenger?passenger_id="+e.id;o.a.get(r).then((function(){t.desserts.splice(n,1)}))}},close:function(){var e=this;this.dialog=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},save:function(){var e,t=this;this.editedIndex>-1?(Object.assign(this.desserts[this.editedIndex],this.editedItem),e="/api/editpassenger?id="+this.editedItem.id+"&"):(this.desserts.push(this.editedItem),e="/api/addpassenger?"),e+="name="+this.editedItem.name+"&idcard="+this.editedItem.idcard+"&phone="+this.editedItem.phone,o.a.get(e).then((function(e){t.close()}))}}},l=n(72),d=n(99),f=n.n(d),v=n(338),m=n(156),h=n(141),y=n(80),O=n(395),j=n(340),x=n(425),w=n(342),I=n(362),k=n(359),C=n(140),S=n(360),_=n(364),P=n(346),V=n(328),D=n(38),N=n(131),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",[n("v-flex",{staticClass:"text-center"},[n("img",{staticClass:"mb-5",attrs:{src:"/v.png",alt:"Vuetify.js"}}),e._v(" "),n("blockquote",{staticClass:"blockquote"},[n("div",{attrs:{id:"app"}},[n("v-app",{attrs:{id:"inspire"}},[n("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.desserts,search:e.search,loading:e.dataLoading,"sort-by":"Name"},scopedSlots:e._u([{key:"top",fn:function(){return[n("v-toolbar",{attrs:{flat:"",color:"white"}},[n("v-toolbar-title",[e._v("Common Passenger Information")]),e._v(" "),n("v-spacer"),e._v(" "),n("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),n("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e._v(" "),n("v-spacer"),e._v(" "),n("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on;return[n("v-btn",e._g({staticClass:"mb-2",attrs:{color:"primary",dark:""}},r),[e._v("Add Passenger")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),e._v(" "),n("v-card-text",[n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[n("v-text-field",{attrs:{label:"Name"},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}})],1),e._v(" "),n("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[n("v-text-field",{attrs:{label:"Identity Number"},model:{value:e.editedItem.idcard,callback:function(t){e.$set(e.editedItem,"idcard",t)},expression:"editedItem.idcard"}})],1),e._v(" "),n("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[n("v-text-field",{attrs:{label:"Phone"},model:{value:e.editedItem.phone,callback:function(t){e.$set(e.editedItem,"phone",t)},expression:"editedItem.phone"}})],1)],1)],1)],1),e._v(" "),n("v-card-actions",[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v("Cancel")]),e._v(" "),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.save}},[e._v("Save")])],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var r=t.item;return[n("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(r)}}},[e._v("\n                mdi-pencil\n              ")]),e._v(" "),n("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(r)}}},[e._v("\n                mdi-delete\n              ")])]}},{key:"no-data",fn:function(){return[n("v-btn",{attrs:{color:"primary"},on:{click:e.initialize}},[e._v("Reset")])]},proxy:!0}])})],1)],1)])])],1)}),[],!1,null,null,null);t.default=component.exports;f()(component,{VApp:v.a,VBtn:m.a,VCard:h.a,VCardActions:y.a,VCardText:y.b,VCardTitle:y.c,VCol:O.a,VContainer:j.a,VDataTable:x.a,VDialog:w.a,VDivider:I.a,VFlex:k.a,VIcon:C.a,VLayout:S.a,VRow:_.a,VSpacer:P.a,VTextField:V.a,VToolbar:D.a,VToolbarTitle:N.a})}}]);