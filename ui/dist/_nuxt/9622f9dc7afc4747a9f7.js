(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{412:function(t,e,n){var content=n(413);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("5e62c9d0",content,!0,{sourceMap:!1})},413:function(t,e,n){(e=n(11)(!1)).push([t.i,".theme--light.v-radio--is-disabled label{color:rgba(0,0,0,.38)}.theme--light.v-radio--is-disabled .v-icon{color:rgba(0,0,0,.26)!important}.theme--dark.v-radio--is-disabled label{color:hsla(0,0%,100%,.5)}.theme--dark.v-radio--is-disabled .v-icon{color:hsla(0,0%,100%,.3)!important}.v-radio{align-items:center;display:flex;height:auto;outline:none}.v-radio--is-disabled{pointer-events:none}.v-input--radio-group.v-input--radio-group--row .v-radio{margin-right:16px}",""]),t.exports=e},414:function(t,e,n){var content=n(415);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("2e2bc7da",content,!0,{sourceMap:!1})},415:function(t,e,n){(e=n(11)(!1)).push([t.i,'.theme--light.v-input--selection-controls.v-input--is-disabled:not(.v-input--indeterminate) .v-icon{color:rgba(0,0,0,.26)!important}.theme--dark.v-input--selection-controls.v-input--is-disabled:not(.v-input--indeterminate) .v-icon{color:hsla(0,0%,100%,.3)!important}.v-input--selection-controls{margin-top:16px;padding-top:4px}.v-input--selection-controls>.v-input__append-outer,.v-input--selection-controls>.v-input__prepend-outer{margin-top:0;margin-bottom:0}.v-input--selection-controls:not(.v-input--hide-details)>.v-input__slot{margin-bottom:12px}.v-input--selection-controls .v-input__slot>.v-label,.v-input--selection-controls .v-radio>.v-label{align-items:center;display:inline-flex;flex:1 1 auto;height:auto}.v-input--selection-controls__input{color:inherit;display:inline-flex;flex:0 0 auto;height:24px;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1);transition-property:transform;width:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-input--selection-controls__input .v-icon{width:100%}.v-application--is-ltr .v-input--selection-controls__input{margin-right:8px}.v-application--is-rtl .v-input--selection-controls__input{margin-left:8px}.v-input--selection-controls__input input[role=checkbox],.v-input--selection-controls__input input[role=radio],.v-input--selection-controls__input input[role=switch]{position:absolute;opacity:0;width:100%;height:100%;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-input--selection-controls__input+.v-label{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-input--selection-controls__ripple{border-radius:50%;cursor:pointer;height:34px;position:absolute;transition:inherit;width:34px;left:-12px;top:calc(50% - 24px);margin:7px}.v-input--selection-controls__ripple:before{border-radius:inherit;bottom:0;content:"";position:absolute;opacity:.2;left:0;right:0;top:0;transform-origin:center center;transform:scale(.2);transition:inherit}.v-input--selection-controls__ripple>.v-ripple__container{transform:scale(1.2)}.v-input--selection-controls.v-input--dense .v-input--selection-controls__ripple{width:28px;height:28px;left:-9px}.v-input--selection-controls.v-input--dense:not(.v-input--switch) .v-input--selection-controls__ripple{top:calc(50% - 21px)}.v-input--selection-controls.v-input{flex:0 1 auto}.v-input--selection-controls.v-input--is-focused .v-input--selection-controls__ripple:before,.v-input--selection-controls .v-radio--is-focused .v-input--selection-controls__ripple:before{background:currentColor;transform:scale(1.2)}.v-input--selection-controls .v-input--selection-controls__input:hover .v-input--selection-controls__ripple:before{background:currentColor;transform:scale(1.2);transition:none}',""]),t.exports=e},416:function(t,e,n){var content=n(417);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("999cb8a8",content,!0,{sourceMap:!1})},417:function(t,e,n){(e=n(11)(!1)).push([t.i,".v-input--radio-group__input{border:none;display:flex;width:100%}.v-input--radio-group--column .v-input--radio-group__input>.v-label{padding-bottom:8px}.v-input--radio-group--row .v-input--radio-group__input>.v-label{padding-right:8px}.v-input--radio-group--row legend{align-self:center;display:inline-block}.v-input--radio-group--row .v-input--radio-group__input{flex-direction:row;flex-wrap:wrap}.v-input--radio-group--column .v-radio:not(:last-child):not(:only-child){margin-bottom:8px}.v-input--radio-group--column .v-input--radio-group__input{flex-direction:column}",""]),t.exports=e},427:function(t,e,n){"use strict";n.r(e);n(30),n(7),n(4),n(13),n(45);var o={data:function(){return{descriptionLimit:60,entries:[],prepared:!1,isLoading:!1,model:{code:"GZQ",station:"广州",city:"广州市",province:"广东省"},model2:{code:"SZQ",station:"深圳",city:"深圳市",province:"广东省"},deptSearch:null,termiSearch:null,searched:null,date:(new Date).toISOString().substr(0,10),menu:!1,dataTableLoading:!1,lines:[],tableHeaders:[{text:"Tr.No",align:"left",sortable:!1,value:"train_num"},{text:"Dep.S",value:"dep_station",align:"left",sortable:!1},{text:"Arr.S",value:"arr_station",align:"left",sortable:!1},{text:"Dep.T",value:"dep_time",align:"left"},{text:"Time",value:"total_time_in_hour",align:"left",sort:function(a,b){var t=function(a){var t=a.split("h");return 1===t.length?Number(t[0].split("m")[0]):60*Number(t[0])+Number(t[1].split("m")[0])};return t(a)-t(b)}},{text:"Arr.T",value:"arr_time",align:"left"},{text:"PRICE",value:"price",align:"left"},{text:"REMAIN",value:"remain",align:"left"},{text:"Actions",value:"actions",sortable:!1,align:"center"}],exactQuery:2,tableCount:0,dialog:!1,tobuy:{},tobuy_types:[],tobuy_types_length:0,radioGroup:0,passengerItems:[],selectedPassengers:[],sucessTicktInfoDialog:!1,sucessPassengers:[],option:[{text:"Expand",value:2},{text:"City",value:0},{text:"Precise",value:1}],timeTable:null,timeTableDialog:!1,searchTimeTableNo:null,timetableLoading:!1,curDay:0,anotherDayDay:!1}},computed:{items:function(){var t=this;return this.entries.map((function(e){var n=e.station.length>t.descriptionLimit?e.station.slice(0,t.descriptionLimit)+"...":e.station;return Object.assign({},e,{station:n})}))}},watch:{deptSearch:function(t){},termiSearch:function(t){}},mounted:function(){var t=this;fetch("/stations.json").then((function(t){return t.json()})).then((function(e){var n=e.result_cnt,o=e.result;t.count=n,t.entries=o})).catch((function(t){console.log(t)})).finally((function(){return t.isLoading=!1})),fetch("/api/passenger").then((function(t){return t.json()})).then((function(e){var n=e.result;t.passengerItems=n})).catch((function(t){console.log(t)})).finally(this.prepared=!0)},methods:{search:function(){var t=this;this.dataTableLoading=!0,this.lines=[];var e=new Date;this.searched=!0;var n="/api/query?dep="+this.model.code+"&arr="+this.model2.code+"&date="+this.date.split("-").join("")+"&exact="+this.exactQuery;fetch(n).then((function(t){return t.json()})).then((function(n){var o=n.result_cnt,r=n.result;if(t.date===e.toISOString().substr(0,10)){t.lines=[];for(var i=0;i<r.length;i++)t.time_cmp(e.getHours(),e.getMinutes(),r[i].dep_time,30)&&t.lines.push(r[i]);t.tableCount=t.lines.length}else t.tableCount=o,t.lines=r;for(var l=0;l<t.lines.length;l++)t.process(t.lines[l]),t.lines[l].id=l})).catch((function(t){console.log(t)})).finally((function(){return t.dataTableLoading=!1}))},more_then_day:function(t,e){var dd=t.split(":"),n=Number(dd[0]),o=Number(dd[1]);return Math.floor((60*n+o+e)/1440)},process:function(t){var e=Math.floor(t.total_time/60);t.total_time_in_hour=e?e+"h"+t.total_time%60+"m":t.total_time%60+"m";var n=this.more_then_day(t.dep_time,t.total_time);n&&(t.arr_time+=" (+"+n+")")},time_cmp:function(t,e,b,n){var o=b.split(":");return 60*t+e+n<60*Number(o[0])+Number(o[1])},buyItem:function(t){var e=this;this.tobuy.arr_idx=t.arr_idx,this.tobuy.dep_idx=t.dep_idx,this.tobuy.date=this.date.split("-").join(""),this.tobuy.train_id=t.train_id,this.tobuy.dep_time=t.dep_time,this.tobuy.train_num=t.train_num,this.tobuy.dep_name=t.dep_station,this.tobuy.arr_name=t.arr_station;var n="/api/price?train_id="+t.train_id+"&dep_idx="+t.dep_idx+"&arr_idx="+t.arr_idx+"&date="+this.tobuy.date;fetch(n).then((function(t){return t.json()})).then((function(t){var n=t.result_cnt,o=t.result;e.tobuy_types=o,e.tobuy_types_length=n})).catch((function(t){console.log(t)})).finally(),this.dialog=!0},buybuy:function(){var t=this,e="/api/purchase?train_id="+this.tobuy.train_id+"&dep_idx="+this.tobuy.dep_idx+"&arr_idx="+this.tobuy.arr_idx+"&date="+this.tobuy.date+"&type_id="+this.radioGroup+"&passenger_id=";this.sucessPassengers=[];for(var n=function(n){var i=t.selectedPassengers[n];fetch(e+i).then((function(t){return t.json()})).then((function(e){var n=e.errcode,o=e.errmsg,r=e.seat_no,l=e.order_id;if(n)alert(o);else{var c={};for(var p in t.passengerItems)t.passengerItems[p].id==i&&(c.name=t.passengerItems[p].name,c.idcard=t.passengerItems[p].idcard);t.sucessPassengers.push({order_id:l,seat_no:r,name:c.name,idcard:c.idcard})}})).catch((function(t){console.log(t)})).finally()},o=0;o<this.selectedPassengers.length;o++)n(o);this.dialog=!1,this.selectedPassengers=[],confirm("Successful ticket purchase, View ticket information?")&&(this.sucessTicktInfoDialog=!0)},getIdid:function(t){return t.id},getIdcard:function(t){return t.name+" "+t.idcard.substr(0,5)+"..."+t.idcard.substr(15,3)},timetableItem:function(t){this.dialog=!0},getTimeTable:function(t){var e=this,n="/api/timetable?train_code="+t.train_num;return fetch(n).then((function(t){return t.json()})).then((function(t){var n=t.result;e.timeTable=n})).catch((function(t){console.log(t)})).finally(),this.curDay=0,this.timeTableDialog=!0,this.searchTimeTableNo=t.train_num,this.timeTable},anotherDay:function(t){return t.arr_day!==this.curDay&&(this.curDay=t.arr_day,!0)},gao:function(t){return this.anotherDayDay=this.anotherDay(t),t.station}}},r=n(72),l=n(99),c=n.n(l),d=n(423),h=n(156),v=n(141),m=n(80),f=n(340),_=n(425),y=n(424),x=n(342),k=n(362),S=n(91),w=n(359),C=n(140),D=n(360),O=n(363),T=(n(10),n(9),n(8),n(1)),I=(n(412),n(122)),V=n(57),j=n(53),P=n(42),A=n(15),L=n(114),G=n(48),E=n(2).a.extend({name:"rippleable",directives:{ripple:G.a},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var data=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(data.staticClass="v-input--selection-controls__ripple",data.directives=data.directives||[],data.directives.push({name:"ripple",value:{center:!0}}),data.on=Object.assign({click:this.onChange},this.$listeners),this.$createElement("div",data)):null},onChange:function(){}}}),N=n(14),$=(n(21),n(22),n(353)),B=n(3),R=Object(B.a)(j.a,E,$.a).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,input=this.internalValue;return this.isMultiple?!!Array.isArray(input)&&input.some((function(n){return t.valueComparator(n,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,input):Boolean(input):this.valueComparator(input,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.disabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=this,label=j.a.options.methods.genLabel.call(this);return label?(label.data.on={click:function(e){e.preventDefault(),t.onChange()}},label):label},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown},ref:"input"})},onBlur:function(){this.isFocused=!1},onChange:function(){var t=this;if(!this.isDisabled){var e=this.value,input=this.internalValue;if(this.isMultiple){Array.isArray(input)||(input=[]);var n=input.length;(input=input.filter((function(n){return!t.valueComparator(n,e)}))).length===n&&input.push(e)}else input=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(input,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(input,e)?null:e:!input;this.validate(!0,input),this.internalValue=input,this.hasColor=input}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}}),F=n(0);function M(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function Q(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?M(Object(source),!0).forEach((function(e){Object(T.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):M(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var z=Object(B.a)(P.a,A.a,E,Object(L.a)("radioGroup"),N.a).extend().extend({name:"v-radio",inheritAttrs:!1,props:{disabled:Boolean,id:String,label:String,name:String,offIcon:{type:String,default:"$radioOff"},onIcon:{type:String,default:"$radioOn"},readonly:Boolean,value:{default:null}},data:function(){return{isFocused:!1}},computed:{classes:function(){return Q(Q({"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused},this.themeClasses),this.groupClasses)},computedColor:function(){return R.options.computed.computedColor.call(this)},computedIcon:function(){return this.isActive?this.onIcon:this.offIcon},computedId:function(){return j.a.options.computed.computedId.call(this)},hasLabel:j.a.options.computed.hasLabel,hasState:function(){return(this.radioGroup||{}).hasState},isDisabled:function(){return this.disabled||!!(this.radioGroup||{}).disabled},isReadonly:function(){return this.readonly||!!(this.radioGroup||{}).readonly},computedName:function(){return this.name||!this.radioGroup?this.name:this.radioGroup.name||"radio-".concat(this.radioGroup._uid)},rippleState:function(){return R.options.computed.rippleState.call(this)},validationState:function(){return(this.radioGroup||{}).validationState||this.computedColor}},methods:{genInput:function(t){return R.options.methods.genInput.call(this,"radio",t)},genLabel:function(){var t=this;return this.hasLabel?this.$createElement(I.a,{on:{click:function(e){e.preventDefault(),t.onChange()}},attrs:{for:this.computedId},props:{color:this.validationState,focused:this.hasState}},Object(F.q)(this,"label")||this.label):null},genRadio:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(V.a,this.setTextColor(this.validationState,{props:{dense:this.radioGroup&&this.radioGroup.dense}}),this.computedIcon),this.genInput(Q({name:this.computedName,value:this.value},this.attrs$)),this.genRipple(this.setTextColor(this.rippleState))])},onFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},onBlur:function(t){this.isFocused=!1,this.$emit("blur",t)},onChange:function(){this.isDisabled||this.isReadonly||this.isActive||this.toggle()},onKeydown:function(){}},render:function(t){return t("div",{staticClass:"v-radio",class:this.classes},[this.genRadio(),this.genLabel()])}}),K=(n(414),n(416),n(127));function H(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function J(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?H(Object(source),!0).forEach((function(e){Object(T.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):H(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var Z=Object(B.a)($.a,K.a,j.a).extend({name:"v-radio-group",provide:function(){return{radioGroup:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},name:String,row:Boolean,value:null},computed:{classes:function(){return J(J({},j.a.options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row})}},methods:{genDefaultSlot:function(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{id:this.id,role:"radiogroup","aria-labelledby":this.computedId}},j.a.options.methods.genDefaultSlot.call(this))},genInputSlot:function(){var t=j.a.options.methods.genInputSlot.call(this);return delete t.data.on.click,t},genLabel:function(){var label=j.a.options.methods.genLabel.call(this);return label?(label.data.attrs.id=this.computedId,delete label.data.attrs.for,label.tag="legend",label):null},onClick:K.a.options.methods.onClick}}),U=n(364),W=n(358),X=n(392),Y=n(346),tt=n(328),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",[n("v-flex",{staticClass:"text-center"},[n("img",{staticClass:"mb-5",attrs:{src:"/v.png",alt:"Vuetify.js"}}),t._v(" "),n("blockquote",{staticClass:"blockquote"},[n("v-card",{attrs:{loading:!t.prepared}},[n("v-card-title",{staticClass:"headline blue lighten-2"},[t._v("\n          Search Train Tickets\n        ")]),t._v(" "),n("v-card-text",[n("v-row",[t.prepared?n("v-autocomplete",{attrs:{items:t.items,loading:t.isLoading,"search-input":t.deptSearch,"hide-no-data":"","hide-selected":"","item-text":"station","item-value":"API",label:"Departure",placeholder:"Start typing to Search","prepend-icon":"mdi-airplane-takeoff","return-object":""},on:{"update:searchInput":function(e){t.deptSearch=e},"update:search-input":function(e){t.deptSearch=e}},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}):t._e(),t._v(" "),t.prepared?n("v-autocomplete",{attrs:{items:t.items,loading:t.isLoading,"search-input":t.termiSearch,"hide-no-data":"","hide-selected":"","item-text":"station","item-value":"API",label:"Arrival",placeholder:"Start typing to Search","prepend-icon":"mdi-airplane-landing","return-object":""},on:{"update:searchInput":function(e){t.termiSearch=e},"update:search-input":function(e){t.termiSearch=e}},model:{value:t.model2,callback:function(e){t.model2=e},expression:"model2"}}):t._e(),t._v(" "),n("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":t.date,transition:"scale-transition","offset-y":"","min-width":"290px"},on:{"update:returnValue":function(e){t.date=e},"update:return-value":function(e){t.date=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[n("v-text-field",t._g({attrs:{label:"Date","prepend-icon":"event",readonly:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},o))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[t._v(" "),n("v-date-picker",{attrs:{"no-title":"",scrollable:"",min:(new Date).toISOString().substr(0,10)},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.menu=!1}}},[t._v("Cancel")]),t._v(" "),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menu.save(t.date)}}},[t._v("OK")])],1)],1),t._v(" "),t.prepared?n("v-select",{attrs:{items:t.option,"item-text":"text","item-value":"value",label:"Advanced Options","prepend-icon":"mdi-apple-keyboard-option"},model:{value:t.exactQuery,callback:function(e){t.exactQuery=e},expression:"exactQuery"}}):t._e()],1)],1),t._v(" "),n("v-divider"),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{disabled:t.dataTableLoading||!t.model&&!t.model2},on:{click:function(e){t.model=t.model2=t.searched=null}}},[t._v("\n            Clear\n            "),n("v-icon",{attrs:{right:""}},[t._v("mdi-close-circle")])],1),t._v(" "),n("v-btn",{attrs:{disabled:t.dataTableLoading||!t.model||!t.model2},on:{click:t.search}},[t._v("\n            Search\n            "),n("v-icon",{attrs:{right:""}},[t._v("mdi-magnify")])],1)],1),t._v(" "),n("v-expand-transition",[t.searched?n("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.tableHeaders,items:t.lines,loading:t.dataTableLoading,"item-key":"id"},scopedSlots:t._u([{key:"item.train_num",fn:function(e){var o=e.item;return[n("div",{on:{click:function(e){return t.getTimeTable(o)}}},[n("u",[t._v(t._s(o.train_num)+" ")])])]}},{key:"item.actions",fn:function(e){var o=e.item;return[n("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.buyItem(o)}}},[t._v("\n                mdi-currency-usd\n              ")])]}}],null,!1,767480422)}):t._e()],1),t._v(" "),n("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[t._v("Buy a Ticket")])]),t._v(" "),n("v-spacer"),t._v(" "),n("v-card-text",[n("v-container",[n("v-radio-group",{model:{value:t.radioGroup,callback:function(e){t.radioGroup=e},expression:"radioGroup"}},t._l(t.tobuy_types,(function(t){return n("v-radio",{key:t.type_id,attrs:{label:t.type_name+" ￥"+t.price+" (Remain: "+t.ticket+")",disabled:!t.ticket,value:t.type_id}})})),1),t._v(" "),n("v-select",{attrs:{items:t.passengerItems,"item-value":t.getIdid,"item-text":t.getIdcard,attach:"",chips:"",label:"Select Passenger",multiple:""},model:{value:t.selectedPassengers,callback:function(e){t.selectedPassengers=e},expression:"selectedPassengers"}})],1)],1),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("Cancel")]),t._v(" "),n("v-btn",{attrs:{color:"blue darken-1",text:"",disabled:!t.radioGroup||!t.selectedPassengers.length},on:{click:t.buybuy}},[t._v("Buy")])],1)],1)],1),t._v(" "),n("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.sucessTicktInfoDialog,callback:function(e){t.sucessTicktInfoDialog=e},expression:"sucessTicktInfoDialog"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[t._v("Ticket Information")])]),t._v(" "),n("v-spacer"),t._v(" "),n("v-card-text",[t._v("\n              Train ID: "+t._s(t.tobuy.train_num)+" "),n("br"),t._v("\n              Interval: "+t._s(t.tobuy.dep_name)+" -> "+t._s(t.tobuy.arr_name)+" "),n("br"),t._v("\n              Date: "+t._s(t.date)+" "),n("br"),t._v("\n              Departure Time: "+t._s(t.tobuy.dep_time)+" "),n("br"),t._v("\n              Passengers:\n              "),t._l(t.sucessPassengers,(function(i){return n("div",{key:i.idcard},[t._v("\n                "+t._s(i.name)+" | "+t._s(i.idcard)+" | "+t._s(i.seat_no)+" "),n("br")])}))],2),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){t.sucessTicktInfoDialog=!1}}},[t._v("OK")])],1)],1)],1),t._v(" "),n("v-dialog",{attrs:{"max-width":"290"},model:{value:t.timeTableDialog,callback:function(e){t.timeTableDialog=e},expression:"timeTableDialog"}},[n("v-card",[n("v-card-title",{staticClass:"headline"},[t._v("Time Table for "+t._s(t.searchTimeTableNo))]),t._v(" "),n("v-simple-table",{attrs:{dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[n("thead",[n("tr",[n("th",{staticClass:"text-left"},[t._v("Station")]),t._v(" "),n("th",{staticClass:"text-left"},[t._v("Arr.T")]),t._v(" "),n("th",{staticClass:"text-left"},[t._v("Dep.T")])])]),t._v(" "),n("tbody",t._l(t.timeTable,(function(e){return n("tr",{key:e.station},[n("td",[t._v(t._s(e.station))]),t._v(" "),n("td",[t._v(t._s(e.arr_time))]),t._v(" "),n("td",[t._v(t._s(e.dep_time))])])})),0)]},proxy:!0}])})],1)],1)],1)],1)])],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VAutocomplete:d.a,VBtn:h.a,VCard:v.a,VCardActions:m.a,VCardText:m.b,VCardTitle:m.c,VContainer:f.a,VDataTable:_.a,VDatePicker:y.a,VDialog:x.a,VDivider:k.a,VExpandTransition:S.a,VFlex:w.a,VIcon:C.a,VLayout:D.a,VMenu:O.a,VRadio:z,VRadioGroup:Z,VRow:U.a,VSelect:W.a,VSimpleTable:X.a,VSpacer:Y.a,VTextField:tt.a})}}]);