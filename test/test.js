

new App('1.2.8',false);

function App(v='',l=false){
this.version='1.0.0';
this.init=async function(v='',local=false){
  let url=local?'../helper.js'
    :'https://cdn.jsdelivr.net/npm/@9r3i/helper@'+v,
  content=document.createElement('h1'),
  helper=document.createElement('script');
  content.innerText='Loading...';
  document.body.append(content);
  helper.textContent=await fetch(url).then(r=>r.text());
  document.head.append(helper);
  this.start();
  return this;
};
this.start=async function(){
  /* configuration */
  let config={
    appNS:'test',
    appVersion:'v1.0.0',
    appBaseName:'Test',
    appLogo:'icon.png',
    frontPage:'front.html',
    themeColor:'#7c1111',
    evaHost:'https://hotelbandara.com/api/eva/',
    evaDevHost:'https://hotelbandara.com/api/eva/',
    aliases:{
      app_vendor:'Helper Testing',
    },
    positions:{
      admin:'Admin',
    },
    divisions:{
      admin:'Admin',
      account:'Profile',
    },
    apps:[
      'account',
      'admin',
    ],
    firebaseConfig:{
      apiKey: "AIzaSyDOAM2pxlFgj-feGalpef8G0IttI-bIWy4",
      authDomain: "helper-62fa0.firebaseapp.com",
      projectId: "helper-62fa0",
      storageBucket: "helper-62fa0.firebasestorage.app",
      messagingSenderId: "312651149644",
      appId: "1:312651149644:web:35adabd62d2904c6cc5fe9",
      measurementId: "G-SW6EK11CJ6",
      databaseURL: "https://helper-62fa0-default-rtdb.asia-southeast1.firebasedatabase.app/",
    },
    firebaseUser:{
      email:'aa.kasep@gmail.com',
      passcode:'AaGanteng',
    },
  };
  /* ddfault body content */
  document.body.innerHTML='';
  let app=new Helper(config),
  section=app.element('div',{
    style:'display:flex;align-items:center;justify-content:center;'
         +'height:100vh;width:100vw;',
  }).appendTo(document.body),
  h1=app.element('h1').appendTo(section);
  h1.style.textAlign='center';
  h1.html('<img src="'+app.IMAGES['logo.png']+'" width="120px" /><br /><i class="fa fa-spinner fa-pulse"></i> Loading...<br />');
  app.loadProgress=app.element('progress').appendTo(h1);
  await app.sleep(1500);
  /* start the app */
  //app.userData(false);
  await app.start();
  //await app.sleep(100);
  //app.alert('Helper v'+app.version);
  //await app.fakeLoaderZ();
  //app.alert('QrScanner: '+(typeof QrScanner));
};
return this.init(v,l);
};





;function TestAdmin(){
window._TestAdmin=this;
//helper.loadStyleURL('../css/helper.css');
this.menus=function(){
  return [
    {
      name:'Dashboard',
      icon:'dashboard',
      callback:function(){
        _TestAdmin.dashboard();
      },
    },
  ];
};
this.dashboard=async function(){
  let text=this.helper.likeJSON(this.helper.user,3),
  nol='',
  fb=await this.helper.firebase(),
  post=await fb.get('posts',101);
  this.helper.main.put('Dashboard','<pre style="white-space:pre-wrap;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n'
      +text+'\n\n'+this.helper.likeJSON(post)+'</pre>');
};
};

// https://hotelbandara.com/api/eva/?query=helperget.eva/version

/**
  id: 1
  username: test
  passcode: $2y$12$6ACh72hpv8Eltdm2TI6.D.1OnDEYzwrAJJBvVWn.2n4Bal0fopjRa
  privilege: 4
  scope: *
  active: 1
  type: employee
  profile_id: 1
  position: admin
 */


    /* error message -- for development only */
    window.addEventListener('error',function(e){
      let errorText=[
        e.message,
        'URL: '+e.filename,
        'Line: '+e.lineno+', Column: '+e.colno,
        'Stack: '+(e.error&&e.error.stack||'(no stack trace)'),
      ].join('\n');
      alert(errorText);
      console.error(errorText);
    });

