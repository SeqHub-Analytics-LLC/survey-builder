(this["webpackJsonpsurvey-builder"]=this["webpackJsonpsurvey-builder"]||[]).push([[0],{42:function(e,t,a){e.exports=a(77)},47:function(e,t,a){},48:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(22),s=a.n(o),u=(a(47),a(48),a(8)),c=a(7),i=a(41),l=a(4),p=Object(l.b)((function(e){return{auth:e.auth}}))((function(e){var t=e.component,a=e.auth,n=Object(i.a)(e,["component","auth"]);return r.a.createElement(c.b,Object.assign({},n,{render:function(e){return!0===a.isAuthenticated?r.a.createElement(t,e):r.a.createElement(c.a,{to:"/login"})}}))})),m=a(24),h=a.n(m),d=a(13),f=a.n(d),b=function(e){e?f.a.defaults.headers.common.Authorization=e:delete f.a.defaults.headers.common.Authorization},E=function(e){return{type:"SET_CURRENT_USER",payload:e}},v=function(){return function(e){localStorage.removeItem("jwtToken"),b(!1),e(E({}))}},y=a(18),g=a(40),O=a(11),N=a(73),j={isAuthenticated:!1,user:{},loading:!1},w={},k={studyName:"",dbInfo:[],studyInfo:[],partData:[]},x=Object(y.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CURRENT_USER":return Object(O.a)(Object(O.a)({},e),{},{isAuthenticated:!N(t.payload),user:t.payload});case"USER_LOADING":return Object(O.a)(Object(O.a)({},e),{},{loading:!0});default:return e}},errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return t.payload;default:return e}},dataFlow:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_STUDY_NAME":return Object(O.a)(Object(O.a)({},e),{},{studyName:t.payload});case"GET_DB_INFO":return Object(O.a)(Object(O.a)({},e),{},{dbInfo:t.payload});case"GET_STUDY_INFO":return Object(O.a)(Object(O.a)({},e),{},{studyInfo:t.payload});case"GET_PART_DATA":return Object(O.a)(Object(O.a)({},e),{},{partData:t.payload});default:return e}}}),C=[g.a],S=Object(y.e)(x,{},Object(y.d)(y.a.apply(void 0,C),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())),R=a(17),D=a(2),_=a(3),I=a(9),T=a(6),A=a(5),U=(a(74),function(e){Object(T.a)(a,e);var t=Object(A.a)(a);function a(e){var n;return Object(D.a)(this,a),(n=t.call(this,e)).selectRef=r.a.createRef(),n}return Object(_.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"unit"},r.a.createElement("span",null,"Choose what element to add next"),r.a.createElement("br",null),r.a.createElement("select",{name:"tabType",id:"tabType",ref:this.selectRef},r.a.createElement("option",{value:"slider"},"Slider")),r.a.createElement("button",{onClick:function(){return e.props.build(e.selectRef.current.value)}},"+"))}}]),a}(n.Component)),F=(a(75),function(e){Object(T.a)(a,e);var t=Object(A.a)(a);function a(e){var n;return Object(D.a)(this,a),(n=t.call(this,e)).sliderRef=r.a.createRef(),n.outputRef=r.a.createRef(),n.qRef=r.a.createRef(),n.minRef=r.a.createRef(),n.maxRef=r.a.createRef(),n.state={min:1,max:100},n.state={checked:!1},n.handleChange=n.handleChange.bind(Object(I.a)(n)),n}return Object(_.a)(a,[{key:"delete",value:function(){this.props.delete(this.props.count)}},{key:"getCount",value:function(){this.props.getCount(this.props.count)}},{key:"handleChange",value:function(e,t,a){this.props.handleChange(e,t,a)}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return r.a.createElement("form",{className:"unit"},r.a.createElement("p",null,"Drag the slider and click confirm"),r.a.createElement("p",null,"Question: ",r.a.createElement("input",{onInput:function(){return e.handleChange("Question",e.qRef.current.value,e.props.count)},ref:this.qRef,type:"text"})),r.a.createElement("input",{type:"range",min:"1",max:"100",defaultValue:"50",className:"slider",name:"myRange",id:"myRange",ref:this.sliderRef}),r.a.createElement("p",null,"Minimum: ",r.a.createElement("input",{onInput:function(){return e.handleChange("lowRange",e.minRef.current.value,e.props.count)},ref:this.minRef,type:"text"})),r.a.createElement("p",null,"Maximum: ",r.a.createElement("input",{onInput:function(){return e.handleChange("highRange",e.maxRef.current.value,e.props.count)},ref:this.maxRef,type:"text"})),r.a.createElement("p",{onClick:this.delete.bind(this)},"Delete"))}}]),a}(n.Component)),P=a(13),B=function(e){Object(T.a)(a,e);var t=Object(A.a)(a);function a(e){var n;return Object(D.a)(this,a),(n=t.call(this,e)).builderFunction=function(e){var t=n.state.children;switch(e){case"slider":t.push({id:n.state.count,tab:r.a.createElement(F,{getCount:n.getCount,delete:n.delete,count:n.state.count,handleChange:n.handleChange,key:n.state.count.toString()})});break;default:t=r.a.createElement("div",null,"Unknown Element")}var a=n.state.output;a[n.state.count.toString()]={Type:e};var o=n.state.count+1;n.setState({children:t,count:o,output:a,complete:!1})},n.state={children:[],count:0,output:{},deleted:[],complete:!1,exptName:""},n.myRef=r.a.createRef(),n.submitRef=r.a.createRef(),n.nameRef=r.a.createRef(),n.builderFunction=n.builderFunction.bind(Object(I.a)(n)),n.handleChange=n.handleChange.bind(Object(I.a)(n)),n.delete=n.delete.bind(Object(I.a)(n)),n.getCount=n.getCount.bind(Object(I.a)(n)),n.outputCreate=n.outputCreate.bind(Object(I.a)(n)),n.checkOutput=n.checkOutput.bind(Object(I.a)(n)),n.onChange=n.onChange.bind(Object(I.a)(n)),n}return Object(_.a)(a,[{key:"onChange",value:function(e){this.setState(Object(R.a)({},e.target.name,e.target.value))}},{key:"handleChange",value:function(e,t,a){var n=this.state.output;n[a.toString()][e]=t,this.setState({output:n})}},{key:"delete",value:function(e){var t=this.state.deleted;t.push(e),this.setState({deleted:t})}},{key:"getCount",value:function(e){return e}},{key:"checkOutput",value:function(e){for(var t=0,a=!0;t.toString()in e;){var n=e[t.toString()];switch(n.Type){case"slider":if("lowRange"in n&&"highRange"in n&&"Question"in n){var r=!isNaN(n.lowRange),o=!isNaN(n.highRange);a=!!(parseInt(n.highRange)>parseInt(n.lowRange)&&r&&o)&&(a&&!0)}else a=!1;break;default:a=!1}t++}return a}},{key:"outputCreate",value:function(){var e=this,t={};this.state.children.filter((function(t){return-1===e.state.deleted.indexOf(t.id)})).map((function(a){t[a.id.toString()]=e.state.output[a.id.toString()]}));var a=this.nameRef.current.value.length>0;if(0 in t&&this.checkOutput(t)&&a){var n={userID:(new Date).toString()};n.exptName=this.nameRef.current.value;for(var r=0;r<this.state.count;)r.toString()in t&&(n["q"+r.toString()]=t[r.toString()]),r++;n.count=r,n.type="experiment";var o=this.props.auth.user.username,s=(this.state.exptName,this.props.match.params.studyName);P.put("https://test-api-615.herokuapp.com/api/feedback/"+o+"/info/studyName-"+s+"/experiments",n).then((function(e){console.log(e)})).then((function(e){alert("Your survey has been successfully created"),console.log(e),window.location.reload(!1)})).catch((function(e){console.log(e)}))}else alert("You have not filled out all fields, or have entered an invalid value!")}},{key:"render",value:function(){var e=this,t=this.props.match.params.username,a=this.props.match.params.studyName,n="/"+t+"/"+a;return r.a.createElement("div",{className:"list",ref:this.myRef},"Back to ",r.a.createElement("p",null," "),r.a.createElement(u.b,{to:n},a),r.a.createElement("form",{action:"/submit",method:"POST",className:"unit"},r.a.createElement("p",null,"Enter a name for this experiment"),r.a.createElement("input",{ref:this.nameRef,value:this.state.exptName,onChange:this.onChange,type:"text",id:"userid",name:"exptName"}),r.a.createElement("br",null),r.a.createElement("br",null)),this.state.children.filter((function(t){return-1===e.state.deleted.indexOf(t.id)})).map((function(e){return e.tab})),r.a.createElement(U,{build:this.builderFunction}),r.a.createElement("div",{className:"extraPad"},r.a.createElement("button",{onClick:this.outputCreate,ref:this.submitRef,type:"submit",value:"Submit",className:"btn"},"Submit")))}}]),a}(n.Component),M=Object(l.b)((function(e){return{auth:e.auth,dataFlowDBInfo:e.dataFlow.dbInfo}}))(B),G=function(e){Object(T.a)(a,e);var t=Object(A.a)(a);function a(){return Object(D.a)(this,a),t.apply(this,arguments)}return Object(_.a)(a,[{key:"render",value:function(){var e=this.props.auth.isAuthenticated;return r.a.createElement("div",{className:"navbar-fixed"},r.a.createElement("nav",{className:"z-depth-0"},r.a.createElement("div",{className:"nav-wrapper white"},r.a.createElement(u.b,{to:"/"},"Home"),r.a.createElement("br",null),e?"":r.a.createElement(u.b,{to:"/register"},"Register"),r.a.createElement("br",null),e?r.a.createElement(u.b,{to:"/dashboard"}," Dashboard "):r.a.createElement(u.b,{to:"/login"},"Login"))))}}]),a}(n.Component),L=Object(l.b)((function(e){return{auth:e.auth}}))(G),W=function(e){Object(T.a)(a,e);var t=Object(A.a)(a);function a(){return Object(D.a)(this,a),t.apply(this,arguments)}return Object(_.a)(a,[{key:"componentWillMount",value:function(){console.log(!this.props.auth)}},{key:"render",value:function(){return this.props.auth.isAuthenticated?r.a.createElement("div",{className:"container"},"Scientist: ",r.a.createElement("b",null,this.props.auth.user.username)):r.a.createElement("div",{className:"container"})}}]),a}(n.Component),V=Object(l.b)((function(e){return{auth:e.auth}}),{})(W),Y=function(e){Object(T.a)(a,e);var t=Object(A.a)(a);function a(){return Object(D.a)(this,a),t.apply(this,arguments)}return Object(_.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"Welcome to Psych Researcher App!"))}}]),a}(n.Component),q=Object(l.b)((function(e){return{auth:e.auth}}),{})(Y),J=a(19),X=a.n(J),z=function(e){Object(T.a)(a,e);var t=Object(A.a)(a);function a(){var e;return Object(D.a)(this,a),(e=t.call(this)).onChange=function(t){e.setState(Object(R.a)({},t.target.id,t.target.value))},e.onSubmit=function(t){t.preventDefault();var a={username:e.state.username,password:e.state.password,password2:e.state.password2};console.log(a),e.props.registerUser(a,e.props.history)},e.state={username:"",password:"",password2:"",errors:{}},e}return Object(_.a)(a,[{key:"componentDidMount",value:function(){this.props.auth.isAuthenticated&&this.props.history.push("/dashboard")}},{key:"componentWillReceiveProps",value:function(e){e.errors&&this.setState({errors:e.errors})}},{key:"render",value:function(){var e=this.state.errors;return r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"Register below"),r.a.createElement("p",{className:"grey-text text-darken-1"},"Already have an account?",r.a.createElement(u.b,{to:"/login"},"Log in")),r.a.createElement("form",{noValidate:!0,onSubmit:this.onSubmit},"Username:",r.a.createElement("input",{onChange:this.onChange,value:this.state.username,error:e.username,id:"username",type:"text",className:X()("",{invalid:e.userExists})}),r.a.createElement("span",{className:"red-text"},e.userExists),r.a.createElement("br",null),r.a.createElement("br",null),"Password:",r.a.createElement("input",{onChange:this.onChange,value:this.state.password,error:e.password,id:"password",type:"password",className:X()("",{invalid:e.password})}),r.a.createElement("span",{className:"red-text"},e.password),r.a.createElement("br",null),r.a.createElement("br",null),"Confirm Password:",r.a.createElement("input",{onChange:this.onChange,value:this.state.password2,error:e.password2,id:"password2",type:"password",className:X()("",{invalid:e.password2})}),r.a.createElement("span",{className:"red-text"},e.password2),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("button",{type:"submit",className:"btn"},"Register")))}}]),a}(n.Component),Q=Object(l.b)((function(e){return{auth:e.auth,errors:e.errors}}),{registerUser:function(e,t){return function(a){f.a.post("https://test-api-615.herokuapp.com/api/register",e).then((function(e){return t.push("/login")})).catch((function(e){return a({type:"GET_ERRORS",payload:e.response.data})}))}}})(Object(c.g)(z)),H=function(e){Object(T.a)(a,e);var t=Object(A.a)(a);function a(){var e;return Object(D.a)(this,a),(e=t.call(this)).onChange=function(t){e.setState(Object(R.a)({},t.target.id,t.target.value))},e.onSubmit=function(t){t.preventDefault();var a={username:e.state.username,password:e.state.password};console.log(a),e.props.loginUser(a)},e.state={username:"",password:"",errors:{}},e}return Object(_.a)(a,[{key:"componentDidMount",value:function(){this.props.auth.isAuthenticated&&this.props.history.push("/dashboard")}},{key:"componentWillReceiveProps",value:function(e){e.auth.isAuthenticated&&this.props.history.push("/dashboard"),e.errors&&this.setState({errors:e.errors})}},{key:"render",value:function(){var e=this.state.errors;return r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"Log in"),r.a.createElement("form",{noValidate:!0,onSubmit:this.onSubmit},"Username:",r.a.createElement("input",{onChange:this.onChange,value:this.state.username,error:e.username,id:"username",type:"text",className:X()("",{invalid:e.userNotFound})}),r.a.createElement("span",{className:"red-text"},e.userNotFound),r.a.createElement("br",null),r.a.createElement("br",null),"Password:",r.a.createElement("input",{onChange:this.onChange,value:this.state.password,error:e.password,id:"password",type:"password",className:X()("",{invalid:e.pwdIncorrect})}),r.a.createElement("span",{className:"red-text"},e.pwdIncorrect),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Log in",class:"btn"})))}}]),a}(n.Component),$=Object(l.b)((function(e){return{auth:e.auth,errors:e.errors}}),{loginUser:function(e){return function(t){f.a.post("https://test-api-615.herokuapp.com/api/login",e).then((function(e){var a=e.data.token;localStorage.setItem("jwtToken",a),b(a);var n=h()(a);t(E(n))})).catch((function(e){return t({type:"GET_ERRORS",payload:e.response.data})}))}}})(H),K=function(e,t){return function(a){f.a.get("https://test-api-615.herokuapp.com/api/feedback/"+e+"/info/studyName-"+t).then((function(e){a({type:"GET_STUDY_INFO",payload:e.data.experiments})}))}},Z=(a(76),function(e){Object(T.a)(a,e);var t=Object(A.a)(a);function a(e){var n;return Object(D.a)(this,a),(n=t.call(this,e)).onLogoutClick=function(e){e.preventDefault(),n.props.logoutUser()},n.state={studyName:""},n.onChange=n.onChange.bind(Object(I.a)(n)),n.onAddStudy=n.onAddStudy.bind(Object(I.a)(n)),n}return Object(_.a)(a,[{key:"onChange",value:function(e){this.setState(Object(R.a)({},e.target.name,e.target.value))}},{key:"componentWillMount",value:function(){var e=this.props.auth.user.username;this.props.getDBInfo(e)}},{key:"getStudyNames",value:function(){var e=this;return this.props.dataFlowDBInfo.map((function(t){if(Object.keys(t).includes("studyName")){var a="/"+e.props.auth.user.username+"/"+t.studyName;return r.a.createElement("div",{className:"container"},r.a.createElement("p",null,t.studyName," ",r.a.createElement("p",null," "),r.a.createElement(u.b,{to:a},"View")))}}))}},{key:"onAddStudy",value:function(e){var t=this.props.auth.user.username;this.props.addStudyName(t,this.state.studyName),window.location.reload(!0)}},{key:"render",value:function(){this.props.auth.user.username;return r.a.createElement("div",{className:"container"},r.a.createElement("form",{onSubmit:this.onAddStudy},"Enter a name for your study: ",r.a.createElement("p",null,"  "),r.a.createElement("input",{type:"text",name:"studyName",value:this.state.studyName,onChange:this.onChange}),r.a.createElement("input",{type:"submit",value:"Add Study"})),r.a.createElement("form",null,r.a.createElement("br",null),this.getStudyNames(),r.a.createElement("br",null)),r.a.createElement("button",{onClick:this.onLogoutClick,className:"btn"},"Logout"))}}]),a}(n.Component)),ee=Object(l.b)((function(e){return{auth:e.auth,dataFlowDBInfo:e.dataFlow.dbInfo}}),{logoutUser:v,addStudyName:function(e,t){return function(a){var n={studyName:t,experiments:[]};f.a.post("https://test-api-615.herokuapp.com/api/feedback/"+e+"/info",n).then((function(e){a({type:"ADD_STUDY_NAME",payload:e.data.studyName})}))}},getDBInfo:function(e){return function(t){f.a.get("https://test-api-615.herokuapp.com/api/feedback/"+e+"/info").then((function(e){t({type:"GET_DB_INFO",payload:e.data})}))}}})(Z),te=function(e){Object(T.a)(a,e);var t=Object(A.a)(a);function a(e){var n;return Object(D.a)(this,a),(n=t.call(this,e)).state={},n.deployExpts=n.deployExpts.bind(Object(I.a)(n)),n}return Object(_.a)(a,[{key:"componentWillMount",value:function(){var e=this.props.auth.user.username,t=this.props.match.params.studyName;this.props.getStudyInfo(e,t)}},{key:"deployExpts",value:function(e){var t=this;e.preventDefault();var a=this.props.auth.user.username,n=this.props.match.params.studyName,r=this.props.experiments.map((function(e){return e.exptName}));console.log(r),r.forEach((function(e){t.props.createExptCol(a,n+"-"+e)})),alert("Successfully deployed your experiments")}},{key:"getExptNames",value:function(){var e=this.props.match.params.username,t=this.props.match.params.studyName;return this.props.experiments.map((function(a){var n=a.exptName,o="/"+e+"/"+t+"/"+n+"/configs",s="/"+e+"/"+t+"/"+n+"/participantsData";return r.a.createElement("div",{className:"container"},a.exptName," ",r.a.createElement("p",null," "),r.a.createElement(u.b,{to:o},"Experiment Configs")," ",r.a.createElement("p",null," "),r.a.createElement(u.b,{to:s},"View Participants Data"))}))}},{key:"render",value:function(){var e="/"+this.props.match.params.username+"/"+this.props.match.params.studyName+"/exptBuilder";return r.a.createElement("div",{className:"container"},r.a.createElement("br",null),r.a.createElement("b",null,this.props.match.params.studyName),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(u.b,{to:e},"Build an Experiment"),r.a.createElement("form",{onSubmit:this.deployExpts},r.a.createElement("br",null),"Your Experiments",r.a.createElement("br",null),r.a.createElement("br",null),this.getExptNames(),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Deploy All Experiments"})))}}]),a}(n.Component),ae=Object(l.b)((function(e){return{auth:e.auth,experiments:e.dataFlow.studyInfo}}),{getStudyInfo:K,createExptCol:function(e,t){return function(a){f.a.post("https://test-api-615.herokuapp.com/api/"+e+"/createCol/"+t)}}})(te),ne=function(e){Object(T.a)(a,e);var t=Object(A.a)(a);function a(){return Object(D.a)(this,a),t.apply(this,arguments)}return Object(_.a)(a,[{key:"componentWillMount",value:function(){var e=this.props.match.params.username,t=this.props.match.params.studyName;this.props.getStudyInfo(e,t)}},{key:"showExptData",value:function(){var e=this.props.match.params.exptName,t=this.props.experiments.find((function(t){return t.exptName==e})),a=JSON.stringify(t);return r.a.createElement("div",null,r.a.createElement("p",null,a))}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("br",null),r.a.createElement("br",null),this.showExptData())}}]),a}(n.Component),re=Object(l.b)((function(e){return{auth:e.auth,experiments:e.dataFlow.studyInfo}}),{getStudyInfo:K})(ne),oe=function(e){Object(T.a)(a,e);var t=Object(A.a)(a);function a(){return Object(D.a)(this,a),t.apply(this,arguments)}return Object(_.a)(a,[{key:"componentWillMount",value:function(){var e=this.props.match.params.username,t=this.props.match.params.studyName+"-"+this.props.match.params.exptName;this.props.getPartData(e,t)}},{key:"showPartData",value:function(){var e=JSON.stringify(this.props.partData);return r.a.createElement("div",{className:"container"},e)}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("br",null),this.showPartData())}}]),a}(n.Component),se=Object(l.b)((function(e){return{auth:e.auth,partData:e.dataFlow.partData}}),{getPartData:function(e,t){return function(a){f.a.get("https://test-api-615.herokuapp.com/api/feedback/"+e+"/"+t).then((function(e){a({type:"GET_PART_DATA",payload:e.data})}))}}})(oe);if(localStorage.jwtToken){var ue=localStorage.jwtToken;b(ue);var ce=h()(ue);S.dispatch(E(ce));var ie=Date.now()/1e3;ce.exp<ie&&(S.dispatch(v()),window.location.href="./login")}var le=function(){return r.a.createElement(l.a,{store:S},r.a.createElement(u.a,{basename:"/"},r.a.createElement("div",{className:"App"},r.a.createElement(L,null),r.a.createElement("br",null),r.a.createElement(V,null),r.a.createElement(c.b,{exact:!0,path:"/",component:q}),r.a.createElement(c.b,{exact:!0,path:"/register",component:Q}),r.a.createElement(c.b,{exact:!0,path:"/login",component:$}),r.a.createElement(c.d,null,r.a.createElement(p,{exact:!0,path:"/dashboard",component:ee}),r.a.createElement(p,{exact:!0,path:"/:expt/participantsData",component:se}),r.a.createElement(p,{exact:!0,path:"/:username/:studyName",component:ae}),r.a.createElement(p,{exact:!0,path:"/:username/:studyName/exptBuilder",component:M}),r.a.createElement(p,{exact:!0,path:"/:username/:studyName/:exptName/configs",component:re}),r.a.createElement(p,{exact:!0,path:"/:username/:studyName/:exptName/participantsData",component:se})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(le,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[42,1,2]]]);
//# sourceMappingURL=main.dc77b915.chunk.js.map