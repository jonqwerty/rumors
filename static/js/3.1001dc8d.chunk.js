(this["webpackJsonpproject-1"]=this["webpackJsonpproject-1"]||[]).push([[3],{294:function(t,e,s){t.exports={descriptionBlock:"ProfileInfo_descriptionBlock__1BMW6",mainPhoto:"ProfileInfo_mainPhoto__1ElXz",contact:"ProfileInfo_contact__1ER_l"}},295:function(t,e,s){t.exports={postsBlock:"MyPosts_postsBlock__W-GOd",posts:"MyPosts_posts__30msV"}},296:function(t,e,s){t.exports={item:"Post_item__19K5h"}},298:function(t,e,s){"use strict";s.r(e);var o=s(3),c=s(35),n=s(36),i=s(40),r=s(38),a=s(0),j=s(1),l=s.n(j),u=s(14),b=s(65),d=s(98),p=s(39),h=s(91),O=s(130),f=Object(O.a)({form:"profile-add-post"})((function(t){return Object(a.jsxs)("form",{onSubmit:t.handleSubmit,children:[Object(a.jsx)("div",{children:Object(a.jsx)(h.a,{component:"textarea",name:"newPostText"})}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{children:"Add post"})})]})})),x=s(295),m=s.n(x),v=s(296),g=s.n(v),k=function(t){return Object(a.jsxs)("div",{className:g.a.item,children:[Object(a.jsx)("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKvi0zkOBGtHXb-mcQToL8gTGUx_ZCnz1qpA&usqp=CAU"}),t.message,Object(a.jsx)("div",{children:Object(a.jsxs)("span",{children:["like ",t.likesCount]})})]})},P=function(t){var e=Object(p.a)(t.posts).reverse().map((function(t){return Object(a.jsx)(k,{message:t.message,likesCount:t.likesCount},t.id)}));return Object(a.jsxs)("div",{className:m.a.postsBlock,children:[Object(a.jsx)("h3",{children:"My posts"}),Object(a.jsx)(f,{onSubmit:function(e){t.addPost(e.newPostText)}}),Object(a.jsx)("div",{className:m.a.posts,children:e})]})},S=l.a.memo(P),_=Object(u.b)((function(t){return{posts:t.profilePage.posts}}),{addPost:d.a.addPostActionCreator})(S),y=s(97),A=s(294),I=s.n(A),C=function(t){var e=Object(j.useState)(!1),s=Object(y.a)(e,2),o=s[0],c=s[1],n=Object(j.useState)(t.status),i=Object(y.a)(n,2),r=i[0],l=i[1];Object(j.useEffect)((function(){l(t.status)}),[t.status]);return Object(a.jsxs)("div",{children:[!o&&Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"Status :"})," ",Object(a.jsx)("span",{onDoubleClick:function(){c(!0)},children:t.status||"-----------"})]}),o&&Object(a.jsx)("div",{children:Object(a.jsx)("input",{onChange:function(t){l(t.currentTarget.value)},autoFocus:!0,onBlur:function(){c(!1),t.updateStatus(r)},value:r})})]})},M=s(129),N=s(47),w=s(48),T=s.n(w),B=Object(O.a)({form:"edit-profile"})((function(t){var e=t.handleSubmit,s=t.profile,o=t.error;return Object(a.jsxs)("form",{onSubmit:e,children:[Object(a.jsx)("div",{children:Object(a.jsx)("button",{children:"Save"})}),o&&Object(a.jsx)("div",{className:T.a.formSummaryError,children:o}),Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"Full name"}),": ",Object(a.jsx)(h.a,{placeholder:"Full name",name:"fullName",component:N.a})]}),Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"Looking for a job"}),": ",Object(a.jsx)(h.a,{name:"lookingForAJob",component:N.a,type:"checkbox"})]}),Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"My professional skills"}),": ",Object(a.jsx)(h.a,{placeholder:"My professional skills",name:"lookingForAJobDescription",component:N.b})]}),Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"About me "}),": ",Object(a.jsx)(h.a,{placeholder:"About me",name:"aboutMe",component:N.b})]}),Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"Contacts"}),": ",Object.keys(s.contacts).map((function(t){return Object(a.jsx)("div",{className:I.a.contact,children:Object(a.jsxs)("b",{children:[t,": ",Object(a.jsx)(h.a,{placeholder:t,name:"contacts."+t,component:N.a})," "]})},t)}))]})]})})),F=function(t){var e=t.profile,s=t.isOwner,o=t.goToEditMode;return Object(a.jsxs)("div",{children:[s&&Object(a.jsx)("div",{children:Object(a.jsx)("button",{onClick:o,children:"Edit"})}),Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"Full name"}),": ",e.fullName]}),Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"Looking for a job"}),": ",e.lookingForAJob?"yes":"no"]}),e.lookingForAJob&&Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"My professional skills"}),": ",e.lookingForAJobDescription]}),Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"About me "}),": ",e.aboutMe]}),Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"Contacts"}),": ",Object.keys(e.contacts).map((function(t){return Object(a.jsx)(U,{contactTitle:t,contactValue:e.contacts[t]},t)}))]})]})},U=function(t){var e=t.contactTitle,s=t.contactValue;return Object(a.jsxs)("div",{className:I.a.contact,children:[Object(a.jsx)("b",{children:e}),": ",s]})},E=function(t){var e=t.profile,s=t.status,o=t.updateStatus,c=t.isOwner,n=t.savePhoto,i=t.saveProfile,r=Object(j.useState)(!1),l=Object(y.a)(r,2),u=l[0],d=l[1];if(!e)return Object(a.jsx)(b.a,{});return Object(a.jsx)("div",{className:I.a.topImage,children:Object(a.jsxs)("div",{className:I.a.descriptionBlock,children:[Object(a.jsx)("img",{src:e.photos.large||M.a,className:I.a.mainPhoto}),c&&Object(a.jsx)("input",{type:"file",onChange:function(t){var e;(null===(e=t.target.files)||void 0===e?void 0:e.length)&&n(t.target.files[0])}}),u?Object(a.jsx)(B,{initialValues:e,profile:e,onSubmit:function(t){i(t).then((function(){d(!1)}))}}):Object(a.jsx)(F,{goToEditMode:function(){d(!0)},profile:e,isOwner:c}),Object(a.jsx)(C,{status:s,updateStatus:o})]})})},J=function(t){return t.profile?Object(a.jsxs)("div",{children:[Object(a.jsx)(E,{savePhoto:t.savePhoto,isOwner:t.isOwner,profile:t.profile,status:t.status,updateStatus:t.updateStatus,saveProfile:t.saveProfile}),Object(a.jsx)(_,{})]}):Object(a.jsx)(b.a,{})},z=s(11),D=s(10),G=function(t){Object(i.a)(s,t);var e=Object(r.a)(s);function s(){return Object(c.a)(this,s),e.apply(this,arguments)}return Object(n.a)(s,[{key:"refreshProfile",value:function(){var t=+this.props.match.params.userId;t||(t=this.props.authorizedUserId)||this.props.history.push("/login"),t?(this.props.getUserProfile(t),this.props.getStatus(t)):console.log("ID should exists in URI params or in state('authorizedId')")}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(t,e){this.props.match.params.userId!=t.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return Object(a.jsx)(J,Object(o.a)(Object(o.a)({},this.props),{},{isOwner:!this.props.match.params.userId,profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,savePhoto:this.props.savePhoto}))}}]),s}(l.a.Component);e.default=Object(D.d)(Object(u.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{getUserProfile:d.d,getStatus:d.c,updateStatus:d.g,savePhoto:d.e,saveProfile:d.f}),z.g)(G)}}]);
//# sourceMappingURL=3.1001dc8d.chunk.js.map