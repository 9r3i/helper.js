/**
 * helper.js
 * ~ for any js helper
 * autored by 9r3i (https://github.com/9r3i)
 * started at February 22nd 2025
 */
;function Helper(config){
/* set to true before compile to appbase */
this.production=false;
/* the version code */
Object.defineProperty(this,'versionCode',{
  value:132,
  writable:false,
});
/* the version */
Object.defineProperty(this,'version',{
  value:this.versionCode.toString().split('').join('.'),
  writable:false,
});

/* debug all requests -- for development only */
this.debugRequest=false;

/* helper libraries */
const LIBRARIES={
  style:[
    'css/circle-progress.min.css',
    'css/font-awesome.min.css',
    'css/code.min.css',
    'css/helper.css',
  ],
  script:[
    'js/circle-progress.min.js',
    'js/eva.js',
    'https://cdn.jsdelivr.net/npm/sweetalert2@11',
    'js/code.min.js',
    'js/nations.js',
    'js/qrcode.min.js',
    'js/helper.admin.js',
  ],
  module:[
    'https://cdn.jsdelivr.net/npm/@9r3i/qrscanner/qr-scanner.min.js',
    'https://9r3i.github.io/firebase-moduler/modules/Firebase.js',
    'https://9r3i.github.io/firebase-moduler/modules/MFirebase/MFirebase.js',
  ],
};
/* fn check */
const FN_CHECK=[
  'eva',
  'Code',
  'QRCode',
  'Firebase',
  'MFirebase',
  'HelperAdmin',
];
/**
 * rules for realtime database
{
  "rules": {
    ".read": true,
    ".write": "auth !== null ? true : false"
  }
}
 * if all database on firebase, then read also needs auth
 */

/* config */
const CONFIG=typeof config==='object'&&config!==null?config:{};

/* */

/* user information */
this.user=null;
this.eva=null;
this.dialogPage=null;

/* config setup */
this.configSetup=function(config){
  config=typeof config==='object'&&config!==null?config:{};
  /* hosts */
  this.hosts={
    eva     : config.hasOwnProperty('evaHost')
              ?config.evaHost:'',
    eva_dev : config.hasOwnProperty('evaDevHost')
              ?config.evaDevHost:'',
    library : 'https://cdn.jsdelivr.net/npm/@9r3i/helper@'
              +this.version+'/',
    firebase: 'https://www.gstatic.com/firebasejs/9.6.3/',
    report  : config.hasOwnProperty('reportHost')
              ?config.reportHost:'',
  };
  this.IMAGES={
    'loader.gif':this.hosts.library+'css/images/loader.gif',
    'nophoto.png':this.hosts.library+'css/images/nophoto.png',
    'icon-plus.png':this.hosts.library+'css/images/icon-plus.png',
    'icon-error.png':this.hosts.library+'css/images/icon-error.png',
    'logo.png':config.hasOwnProperty('appLogo')
      ?config.appLogo
      :this.hosts.library+'css/images/logo.png',
    'wallpaper.jpg':config.hasOwnProperty('appWallpaper')
      ?config.appWallpaper
      :this.hosts.library+'css/images/wallpaper.jpg',
  };
  /* apps -- name detail on divisions */
  this.apps=config.hasOwnProperty('apps')
      &&Array.isArray(config.apps)
      &&config.apps.indexOf('account')>=0
    ?config.apps:['account'];
  /* app namespace for eva api library target */
  this.appNS=config.hasOwnProperty('appNS')
    ?config.appNS:'helper';
  this.appVersion=config.hasOwnProperty('appVersion')
    ?config.appVersion:'';
  /* app base name for client classes prefix name */
  this.appBaseName=config.hasOwnProperty('appBaseName')
    ?config.appBaseName:'Helper';
  this.themeColor=config.hasOwnProperty('themeColor')
    ?config.themeColor:'#309695';
  /* aliases */
  this.aliases=config.hasOwnProperty('aliases')
      &&typeof config.aliases==='object'
      &&config.aliases!==null
      &&config.aliases.hasOwnProperty('app_vendor')
    ?config.aliases
    :{app_vendor:'Helper App'};
  this.positions=config.hasOwnProperty('positions')
      &&typeof config.positions==='object'
      &&config.positions!==null
    ?config.positions:{};
  this.divisions=config.hasOwnProperty('divisions')
      &&typeof config.divisions==='object'
      &&config.divisions!==null
      &&config.divisions.hasOwnProperty('account')
    ?config.divisions
    :{account:'Profile'};
  this.religions=[
    'Islam',
    'Catholic',
    'Protestant',
    'Hinduism',
    'Buddhism',
    'Shinto',
    'Taoism',
    'Sikhism',
    'Judaism',
    'Atheism',
    'Other'
  ];
};
this.configSetup(config);
/* firebase setup */
this.firebase=function(auto=false){
  /* initialize firebase */
  let fbc=CONFIG.hasOwnProperty('firebaseConfig')
    ?CONFIG.firebaseConfig:{
      apiKey: "AIzaSyDOAM2pxlFgj-feGalpef8G0IttI-bIWy4",
      authDomain: "helper-62fa0.firebaseapp.com",
      projectId: "helper-62fa0",
      storageBucket: "helper-62fa0.firebasestorage.app",
      messagingSenderId: "312651149644",
      appId: "1:312651149644:web:35adabd62d2904c6cc5fe9",
      measurementId: "G-SW6EK11CJ6",
      databaseURL: "https://helper-62fa0-default-rtdb.asia-southeast1.firebasedatabase.app/",
    },
  fbu=CONFIG.hasOwnProperty('firebaseUser')
    ?CONFIG.firebaseUser:{
      email:'aa.kasep@gmail.com',
      passcode:'AaGanteng',
    },
  fb=new Firebase(fbc);
  /**/
  if(auto){
    fb.autoLogin=async function(){
      return await fb.login(fbu.email,fbu.passcode);
    };
  }
  /**/
  fb.getRaw=async function(t,k){
    let mfb=this.MFirebase,
    db=new mfb.Database(t),
    ref=db.resource.ref(db.resource.db),
    loc=t+'/'+k,
    trap=db.resource.child(ref,loc);
    return await db.resource.get(trap).then(r=>{
      return (r.exists()?r.val():null);
    }).catch(e=>{
      return (null);
    });
  };
  /**/
  return fb;
};

/* initialize as contructor */
this.init=function(){
  /* load libraries module */
  let module=`
  import QrScanner from "${LIBRARIES.module[0]}";
  window.QrScanner=QrScanner;
  import { Firebase } from "${LIBRARIES.module[1]}";
  window.Firebase=window.Firebase||Firebase;
  import { MFirebase } from "${LIBRARIES.module[2]}";
  window.MFirebase=window.MFirebase||MFirebase;
  `;
  this.loadScriptString(module,'module');
  /* load libraries style */
  for(let style of LIBRARIES.style){
    let pre=!style.match(/^http/i)?this.hosts.library:'';
    this.loadStyleURL(pre+style);
  }
  /* load libraries script */
  for(let script of LIBRARIES.script){
    let pre=!script.match(/^http/i)?this.hosts.library:'';
    this.loadScriptURL(pre+script);
  }
  /* load icon */
  this.loadIconURL(this.IMAGES['logo.png']);
  /* logo css */
  this.loadStyleString(`
    .header,.menu-header
      {background-image:url('${this.IMAGES['logo.png']}');}
    .login-wrapper
      {background-image:url('${this.IMAGES['wallpaper.jpg']}');}
  `);
  /* return the object */
  return this;
};
/* start the app */
this.start=async function(app){
  /* eva prepare */
  let eva_host=this.production?this.hosts.eva:this.hosts.eva_dev,
  eva_get=eva_host+'?query='+this.appNS+'get.eva/',
  eva_version=await fetch(eva_get+'version').then(r=>r.text()),
  eva_token=await fetch(eva_get+'token').then(r=>r.text()),
  eva_config={
    host:eva_host,
    apiVersion:eva_version,
    token:eva_token,
  };
  /* check everything is ready */
  let isReady=await this.isEverythingReady();
  if(!isReady){
    let limit=9,
    ratt=localStorage.getItem('reload-attempt'),
    att=ratt?parseInt(ratt,10):0,
    text='Error: Something is not ready!<br />'
      +'Attempted: '+att+'/3<br />'
      +(att<3?'App will reload at':'Too many attempts');
    document.body.innerHTML=`<p>${text}</p>`;
    if(att>=3){return;}
    for(let i=0;i<=limit;i++){
      let second=limit-i;
      document.body.innerHTML=`<p>${text} ${second}s</p>`;
      await this.sleep(1000);
    }att++;
    localStorage.setItem('reload-attempt',att);
    window.location.reload();
    return;
  }localStorage.removeItem('reload-attempt');
  /* statusbar */
  this.statusBar(this.themeColor);
  /* setup backbutton */
  document.addEventListener("backbutton",e=>{
    e.preventDefault();
    this.confirm('Close the app?','',yes=>{
      if(yes){
        this.closeApp();
      }
    });
  },false);
  /* remove context menu */
  if(this.production!==false){
    window.addEventListener('contextmenu',function(e){
      e.preventDefault();
      return false;
    },false);
  }
  /* check userdata */
  let user=this.userData();
  if(user){
    this.user=user;
    let scopes=user.scope=='*'?this.apps:user.scope.split(',');
    this.user.scope=[];
    for(let scope of scopes){
      if(this.apps.indexOf(scope.trim())>=0){
        this.user.scope.push(scope.trim());
      }
    }
  }
  /* clear body element */
  document.body.innerHTML='';
  /* update page */
  this.updatePage();
  /* initialize eva */
  this.eva=new eva(eva_config);
  /* login page */
  if(!this.isLogin()){
    /* global helper */
    let uniqid=this.uniqid('__helper');
    window[uniqid]=this;
    window.appPage=function(){
      this[uniqid].start(true);
    };
    this.statusBar(this.themeColor);
    let main=app?this.loginPage()
      :this.frontPage(CONFIG.frontPage);
    document.body.append(main);
    return false;
  }
  /* load basic ui */
  this.main=this.basicUI(this.alias('app_vendor'),this.appVersion);
  document.body.append(this.main);
  /* movable menu */
  this.menuMovable();
  /* set division header */
  let division=typeof app==='string'?app:this.user.position,
  headerText=this.divisions.hasOwnProperty(division)?this.divisions[division]:division;
  this.main.bodyHeader.innerText=headerText;
  this.main.bodyHeader.dataset.scope=JSON.stringify(this.user.scope);
  this.main.bodyHeader.dataset.app=division;
  this.main.bodyHeader.dataset.text=headerText;
  this.main.bodyHeader.dataset.open='0';
  this.main.bodyHeader.dataset.width=this.main.bodyHeader.offsetWidth+'px';
  this.main.bodyHeader.style.width=this.main.bodyHeader.offsetWidth+'px';
  this.main.bodyHeader.helper=this;
  this.main.bodyHeader.onclick=async function(){
    if(this.dataset.open=='1'){return;}
    this.dataset.open='1';
    this.style.width='200px';
    if(this.helper.user.scope.length<3){
      await this.helper.sleep(500);
      this.style.width=this.dataset.width;
      this.dataset.open='0';
      return;
    }
    let divisions=this.helper.divisions,
    scope=this.helper.parseJSON(this.dataset.scope),
    apps={};
    for(let i of scope){
      if(i=='account'){continue;}
      apps[i]=divisions[i];
    }
    let sel=this.helper.select('app',this.dataset.app,apps,e=>{
      this.helper.start(sel.value);
    });
    this.innerHTML='';
    this.append(sel);
    sel.focus();
    sel.onblur=async e=>{
      await this.helper.sleep(500);
      this.style.width=this.dataset.width;
      this.dataset.open='0';
      this.innerText=this.dataset.text;
    };
  };
  /* ---------- APPLICATION (per division) ---------- */
  let menus=[],
  appDiv=typeof app==='string'?app:this.user.position,
  appClass=this.getAppClassName(appDiv);
  if(typeof window[appClass]==='function'&&this.apps.indexOf(appDiv)>=0){
    if(this.user.scope.indexOf(appDiv)>=0
      &&this.user.privilege>=4){
      let appObject=new window[appClass];
      appObject.helper=this;
      menus=typeof appObject.menus==='function'?appObject.menus():[];
      if(typeof appObject.dashboard==='function'){
        appObject.dashboard();
      }else{
        this.accountPage();
      }
    }else{
      let errorTitle='Error: Access denied!',
      errorMessage='Your access to "'+appDiv+'" division is denied. '
        +'Please, contact your administrator to solve this problem.';
      this.alert(
        errorTitle,
        errorMessage,
        'error'
      );
      this.main.put(errorTitle,errorMessage);
    }
  }else{
    let errorTitle='Error: Application is not available!',
    errorMessage='The application of "'+appDiv+'" division is not available. '
      +'Please, contact your administrator to solve this problem.';
    this.alert(
      errorTitle,
      errorMessage,
      'error'
    );
    this.main.put(errorTitle,errorMessage);
  }
  /* put the menus */
  for(let menu of menus){
    this.main.addMenu(menu.name,menu.icon,menu.callback);
  }
  /* account menus */
  if(this.user.scope.indexOf('account')>=0){
    this.main.addMenu('Profile','user',function(){
      this.helper.menuHide();
      this.helper.accountPage();
    });
    this.main.addMenu('Logout','power-off',function(){
      this.helper.menuHide();
      this.helper.logout();
    },'#d33');
  }
  /* menu ui fix */
  window.addEventListener('resize',e=>{
    this.menuUIFix();
  },false);
  this.menuUIFix();
};


/* ---------- PAGES ---------- */
/* qr page */
this.qrPage=function(){
  let main=document.createElement('main'),
  wrapper=document.createElement('div'),
  header=document.createElement('div'),
  body=document.createElement('div'),
  footer=document.createElement('div'),
  loader=document.createElement('img'),
  clear=document.createElement('div');
  /* appending */
  body.append(loader);
  wrapper.append(header);
  wrapper.append(body);
  wrapper.append(footer);
  wrapper.append(clear);
  main.append(wrapper);
  /* class */
  main.classList.add('login-wrapper');
  wrapper.classList.add('login');
  header.classList.add('login-header');
  header.dataset.text='LoginQR';
  body.classList.add('login-body');
  footer.classList.add('login-footer');
  footer.dataset.text='Powered by 9r3i';
  footer.title='Powered by 9r3i';
  /* qrcode */
  body.id='qrcode-oauth';
  loader.alt='';
  loader.src=this.IMAGES['loader.gif'];
  setTimeout(()=>{
    this.QR_OAUTH_ATTEMP=0;
    this.qrNewOTP();
  },0x3e8);
  /* footer link */
  footer.helper=this;
  footer.onclick=async function(){
    let url='https://github.com/9r3i',
    yes=await this.helper.confirmX('Visit programmer website?','URL: '+url);
    if(!yes){return;}
    this.helper.openURL(url,'_blank');
  };
  /* return the object */
  return main;
};
this.qrNewOTP=async function(){
  if(this.QR_OAUTH_ATTEMP>=0x03){
    return this.alert('Error: Failed to login!','','error');
  }
  this.QR_OAUTH_ATTEMP++;
  let id='qrcode-oauth',
  host=this.production?this.hosts.eva:this.hosts.eva_dev,
  urlNew=host+'?query='+this.appNS+'get.otp/'+this.uniqid(),
  body=document.getElementById(id),
  otp=await fetch(urlNew,{mode:'cors'}).then(r=>r.text());
  if(!body){return;}
  body.dataset.otp=otp;
  body.innerHTML='';
  new QRCode(id,{
    text:otp,
    width:200,
    height:200,
    colorDark:"#000000",
    colorLight:"#ffffff",
    correctLevel:QRCode.CorrectLevel.H
  });
  this.qrCheckOTP();
  await this.sleep(55*1000);
  body=document.getElementById(id);
  if(!body){return;}
  let loader=document.createElement('img');
  loader.alt='';
  loader.src=this.IMAGES['loader.gif'];
  body.dataset.otp='';
  body.innerHTML='';
  body.append(loader);
  return this.qrNewOTP();
};
this.qrCheckOTP=async function(){
  let id='qrcode-oauth',
  body=document.getElementById(id);
  if(!body||!body.dataset.hasOwnProperty('otp')
    ||body.dataset.otp==''){return;}
  let host=this.production?this.hosts.eva:this.hosts.eva_dev,
  urlCheck=host+this.appNS+'?query='+this.appNS+'get.otp_check/'
    +body.dataset.otp,
  res=await fetch(urlCheck,{mode:'cors'}).then(r=>r.text());
  if(res.toString().match(/^error/i)){
    return this.qrCheckOTP();
  }
  this.userData(this.parseJSON(res));
  this.start();
};
this.qrOauth=async function(otp=''){
  let res=await this.request('oauth',{otp});
  if(res.toString().match(/^error/i)){
    return false;
  }return true;
};
this.qrScan=async function(){
  let dialog=await this.dialog(),
  button=this.button('','red','stop',function(){
    if(this.dataset.state=='Stop'){
      this.scanner.stop();
      this.classList.remove('button-red');
      this.classList.add('button-blue');
      this.childNodes[0].classList.remove('fa-stop');
      this.childNodes[0].classList.add('fa-play');
      this.dataset.state='Start';
    }else{
      this.scanner.start();
      this.classList.remove('button-blue');
      this.classList.add('button-red');
      this.childNodes[0].classList.remove('fa-play');
      this.childNodes[0].classList.add('fa-stop');
      this.dataset.state='Stop';
    }
  },{state:'Stop'}),
  video=this.element('video');
  button.classList.add('video-button');
  dialog.put(this.element('div',{},[video,button]));
  /* initiate scanner */
  let scanner=new QrScanner(video,async result=>{
    scanner.stop();
    let loader=this.loader(),
    res=await this.qrOauth(result.data);
    loader.remove();
    if(!res){
      return this.alert('Error: Failed to login!',res,'error');
    }
    dialog.close();
    return this.alert('Successfully logged in to browser!','','success');
  },{
    onDecodeError:async error=>{
    },
    highlightScanRegion:true,
    highlightCodeOutline:true,
  });
  button.scanner=scanner;
  /* start scanning */
  scanner.start();
};
this.qrScanPlug=async function(){
  /* require: cordova-plugin-qrscanner-11 */
  if(typeof QRScanner!=='object'||QRScanner===null){
    return this.alert('Error: Failed to get scanner!','','error');
  }
  QRScanner.prepare((e,s)=>{
    if(e){
      return this.alert('Error: Failed to prepare camera!',e._message,'error');
    }
    if(!s.authorized){
      return this.alert('Error: Camera access denied!','','error');
    }
    QRScanner.show();
    QRScanner.scan(async (e,r)=>{
      if(e){return;}
      let loader=this.loader(),
      res=await this.qrOauth(r);
      loader.remove();
      QRScanner.hide();
      QRScanner.destroy();
      if(!res){
        return this.alert('Error: Failed to login!',res,'error');
      }
      return this.alert('Successfully logged in to browser!','','success');
    });
  });
};
/* login page */
this.loginPage=function(){
  if(this.isBrowser()){
    return this.qrPage();
  }
  let main=document.createElement('main'),
  wrapper=document.createElement('div'),
  header=document.createElement('div'),
  form=document.createElement('form'),
  table=this.table('login-table'),
  uname=document.createElement('input'),
  pword=document.createElement('input'),
  submit=document.createElement('input'),
  footer=document.createElement('div'),
  clear=document.createElement('div');
  table.row('Username',uname);
  table.row('Password',pword);
  table.row('',submit);
  /* appending */
  form.append(table);
  wrapper.append(header);
  wrapper.append(form);
  wrapper.append(footer);
  wrapper.append(clear);
  main.append(wrapper);
  /* class */
  main.classList.add('login-wrapper');
  wrapper.classList.add('login');
  header.classList.add('login-header');
  header.dataset.text='Login';
  uname.classList.add('login-input');
  uname.name='username';
  uname.type='text';
  uname.placeholder='Username';
  pword.classList.add('login-input');
  pword.name='password';
  pword.type='password';
  pword.placeholder='Password';
  submit.classList.add('login-submit');
  submit.classList.add('signin');
  submit.type='submit';
  submit.name='submit';
  submit.value='Send';
  footer.classList.add('login-footer');
  footer.dataset.text='Powered by 9r3i';
  footer.title='Powered by 9r3i';
  /* event */
  form.uname=uname;
  form.pword=pword;
  form.wrapper=wrapper;
  form.sbutton=submit;
  form.helper=this;
  form.onsubmit=async function(e){
    e.preventDefault();
    this.sbutton.value='Sending...';
    let fdata={};
    for(let i=0;i<this.length;i++){
      if(this[i].name){
        fdata[this[i].name]=this[i].value;
      }
    }
    let loader=this.helper.loader(),
    res=await this.helper.request('login',fdata);
    loader.remove();
    this.sbutton.value='Send';
    if(typeof res==='object'&&res!==null&&res.hasOwnProperty('token')){
      this.helper.userData(res);
      this.helper.start();
    }else{
      this.wrapper.classList.add('login-shake');
      await this.helper.sleep(500);
      this.wrapper.classList.remove('login-shake');
    }
  };
  footer.helper=this;
  footer.onclick=async function(){
    let url='https://github.com/9r3i',
    yes=await this.helper.confirmX('Visit programmer website?','URL: '+url);
    if(!yes){return;}
    this.helper.openURL(url,'_blank');
  };
  /* main set */
  main.form=form;
  /* return the object */
  return main;
};
/* update page */
this.updatePage=async function(){
  let raw=localStorage.getItem('abl-data-app').substring(0,15),
  mat=raw.match(/(\d+)/),
  versionCode=mat?parseInt(mat[1],10):this.versionCode;
  if(this.versionCode>=versionCode){
    await this.sleep(5000);
    await this.updatePage();
    return;
  }
  let versionText='v'+versionCode.toString().trim().split('').join('.'),
  yes=await this.confirmX('Update available!','Update now? ('+versionText+')');
  if(!yes){return;}
  await this.sleep(1000);
  this.statusBar('#ffffff');
  window.location.reload();
};
/* account page */
this.accountPage=function(){
  let table=this.table(),
  passes=['time'];
  for(let key in this.user.profile){
    if(passes.indexOf(key)>=0){continue;}
    let value=this.user.profile[key];
    if(key=='birthdate'){
      value=this.parseDate(value);
    }else if(key=='gender'){
      value=value==1?'Male':'Female';
    }else if(key=='division'){
      value=this.aliasDivision(value);
    }else if(key=='religion'){
      value=this.element('span',{
        id:'code-pad',
      }).text(this.aliasPosition(value));
    }else if(key=='position'){
      value=this.aliasPosition(value);
    }
    table.row(this.alias(key),value);
  }
  let row=document.createElement('div'),
  button=this.button('Edit','blue','edit',function(){
    this.helper.accountEditPage();
  }),
  reset=this.button('Reset','blue','clock-o',async function(){
    let yes=await this.helper.confirmX('Reset App?');
    if(!yes){return;}
    let loader=this.helper.loader();
    if(typeof ABL_OBJECT==='object'&&ABL_OBJECT!==null
      &&typeof ABL_OBJECT.database==='function'){
      ABL_OBJECT.database(false);
    }
    this.helper.statusBar('#FFFFFF');
    await this.helper.sleep(1000);
    window.location.reload();
    return;
  }),
  changePass=this.button('Change Password','blue','lock',async function(){
    let opass=await this.helper.promptX('Old Password','','password','Next'),
    npass=await this.helper.promptX('New Password','','password','Next'),
    cpass=await this.helper.promptX('Confirm Password','','password','Send');
    if(npass!==cpass){
      return this.helper.alert('Error: Password is not equal!','','error');
    }
    let loader=this.helper.loader(),
    res=await this.helper.request('cpass',{
      old:opass,
      npass:npass,
    });
    loader.remove();
    if(res!='ok'){
      return this.helper.alert('Error: Failed to change password.',res,'error');
    }
    await this.helper.alertX('Saved!','','success');
    this.helper.userData(false);
    this.helper.user=null;
    this.helper.loader();
    await this.helper.sleep(500);
    this.helper.start(true);
  }),
  reverseAccount=this.button('Reverse','blue','recycle',function(){
    let revData=this.helper.userData(null,'reverse');
    this.helper.userData(false,'reverse');
    this.helper.userData(revData);
    this.helper.start();
  }),
  scanBrowser=this.button('Scan QR','orange','qrcode',function(){
    if(window.CORDOVA_LOADED){
      this.helper.qrScanPlug();
    }else{
      this.helper.qrScan();
    }
  });
  row.classList.add('row-buttons');
  if(!this.isBrowser()){
    row.append(button);
  }
  row.append(reset);
  if(!this.isBrowser()){
    row.append(changePass);
    row.append(scanBrowser);
  }
  if(this.user.hasOwnProperty('reverse')&&this.user.reverse===true){
    row.append(reverseAccount);
  }
  row.classList.add('section');
  table.classList.add('table-register');
  this.main.put('Profile',this.main.double(table,row));
  this.codePage();
};
/* account edit page */
this.accountEditPage=function(){
  let table=this.table(),
  passes=['time'],
  read=[
    'id','name','card_id','card_type','gender','position','division',
    'birthdate','birthplace','religion','nationality',
  ];
  for(let key in this.user.profile){
    let value=this.user.profile[key];
    if(passes.indexOf(key)>=0){
        continue;
    }else if(key=='birthdate'){
      value=this.parseDate(value);
    }else if(key=='gender'){
      value=value==1?'Laki-laki':'Perempuan';
    }else if(key=='division'){
      value=this.aliasDivision(value);
    }else if(key=='position'){
      value=this.aliasPosition(value);
    }else if(key=='address'){
      value=this.textarea(key,value,this.alias(key));
    }else if(read.indexOf(key)<0){
      value=this.input(key,value,'text',this.alias(key));
    }
    table.row(this.alias(key),value);
  }
  table.classList.add('table-register');
  let row=document.createElement('div'),
  button=this.button('Save','blue','save',async function(){
    let loader=this.helper.loader(),
    fdata=this.helper.formSerialize();
    delete fdata.data;
    let innerQuery=this.helper.buildQuery(fdata),
    query='update employee ('+innerQuery+') where id='+this.helper.user.profile.id,
    res=await this.helper.request('query',query);
    loader.remove();
    if(res!=1){
      return this.helper.alert('Error: Failed to save!',res,'error');
    }
    await this.helper.alertX('Saved!','','success');
    this.helper.userData(false);
    this.helper.user=null;
    this.helper.loader();
    await this.helper.sleep(500);
    this.helper.start(true);
  });
  row.append(button);
  row.classList.add('section');
  this.main.put('Edit Profile',this.main.double(table,row));
};
/* iframe for none-logged-in users */
this.frontPage=function(url){
  let main=document.createElement('iframe');
  main.src=url;
  main.style.position='absolute';
  main.style.width='calc(100%)';
  main.style.height=window.innerHeight+'px';
  main.style.top='0px';
  main.style.left='0px';
  main.style.right='0px';
  main.style.bottom='0px';
  main.style.border='0px none';
  main.style.margin='0px';
  main.style.padding='0px';
  main.id='front-page';
  window.addEventListener('resize',function(e){
    let main=document.getElementById('front-page');
    if(!main){return;}
    main.style.width='calc(100%)';
    main.style.height=window.innerHeight+'px';
  },false);
  return main;
};
/* code page */
this.codePage=function(){
  let id='code-pad',
  el=document.getElementById(id);
  if(!el){return;}
  window.CODE_TOUCH_COUNT=0;
  window.CODE_TOUCH_START=false;
  el.helper=this;
  el.addEventListener('click',function(e){
    if(window.CODE_TOUCH_START){
      window.CODE_TOUCH_COUNT++;
      this.classList.add('code-pad-yellow');
      return;
    }
    window.CODE_TOUCH_COUNT=0;
    window.CODE_TOUCH_START=setTimeout(()=>{
      el.classList.remove('code-pad-yellow');
      let id='code-menu-yellow',
      menu=document.getElementById(id);
      if(!menu&&window.CODE_TOUCH_COUNT>=0x07){
        el.helper.notif('Code is OK!','info');
        let input=el.helper.input('code');
        input.addEventListener('keyup',function(e){
          if(e.keyCode!=13){return;}
          eval(this.value);
        },false);
        el.innerHTML='';
        el.append(input);
      }
      window.CODE_TOUCH_START=false;
      window.CODE_TOUCH_COUNT=0;
    },0x3e8);
  },false);
};
/* code menu */
this.codeMenu=function(){
  let id='code-menu-yellow',
  menu=document.getElementById(id);
  if(menu){return;}
  menu=this.main.addMenu('Code','code',function(){
    if(typeof window._Code!=='object'
      ||window._Code===null){
      new Code;
    }
    window._Code.CODE_FORM_ACTIVE=true;
    window._Code.recoding();
  },'yellow');
  menu.id=id;
  this.notif('Code is ready!','success');
};


/* ---------- EVA REQUEST ---------- */
/* database test */
this.testDB=async function(){
  let tables=await this.request('query','show tables'),
  queries=[];
  console.log('tables:',tables);
  for(let table of tables){
    queries.push('select count(id) as length from '+table);
  }
  let data=await this.request('queries',queries.join(';')),
  tdata=[];
  for(let i in data){
    let d=data[i];
    tdata.push({
      table:tables[i],
      length:d[0].length,
    });
  }
  console.table(tdata);
};
/* uload -- REQUIRES: eva.js */
this.uload=async (path,file)=>{
  let data=new FormData;
  data.append('uid',this.user.id);
  data.append('token',this.user.token);
  data.append('path',path);
  data.append('query',this.appNS+' uload EVA.data(data)');
  data.append('file',file);
  let res=await this.eva.request(data);
  return this.decode(res);
};
/* request -- REQUIRES: eva.js */
this.request=async (method,query,xid=0,xtoken='')=>{
  let uid=typeof this.user==='object'&&this.user!==null
      &&this.user.hasOwnProperty('id')?this.user.id:xid,
  token=typeof this.user==='object'&&this.user!==null
    &&this.user.hasOwnProperty('token')?this.user.token:xtoken,
  body={
    query:[
      this.appNS,
      method,
      '"'+this.encode(query)+'"',
      uid,
      token,
    ].join(' '),
  },
  _this=this,
  res=await this.eva.request(body,{
    error:function(e){
      _this.loader(false);
      let ertype='error:connection_break',
      title=_this.requestError(ertype),
      text=JSON.stringify(e);
      _this.alert(title,text,'error');
    },
  }),
  data=this.decode(res);
  if(!this.production&&this.debugRequest){
    console.log({method,query,res,data});
    console.trace();
  }
  if(!data){
    this.loader(false);
    let ertype='error:connection',
    title=this.requestError(ertype);
    this.alert('Error',title,'error');
  }else if(typeof data==='string'&&data.match(/^error:/)){
    this.loader(false);
    let title=this.requestError(data),
    text=this.requestError(data+'_text'),
    icon=this.requestError(data+'_icon');
    this.alert(title,text,icon);
    if(data=='error:active'||data=='error:access'){
      this.userData(false);
      this.user=null;
      this.loader();
      setTimeout(()=>{
        document.body.setAttribute('class','');
        this.start(true);
      },1000);
    }
  }else if(typeof data==='object'&&data!==null
    &&data.hasOwnProperty('error')){
    this.loader(false);
    this.alert('Error!',JSON.stringify(data.error),'error');
  }
  return data;
};
/* encode -- for request */
this.encode=(data)=>{
  let str=JSON.stringify(data);
  return btoa(str);
};
/* decode -- for request */
this.decode=(data)=>{
  let res=null,
  str=atob(data);
  try{
    res=JSON.parse(str);
  }catch(e){
    res=false;
  }return res;
};
/* response errors of request */
this.requestError=function(key=''){
  let def={
    'error:connection':'Error: Connection problem.',
    'error:connection_break':'Error: Connection has been closed!',
    'error:maintenance':'Server Maintenance!',
    'error:maintenance_text':'Please, visit again later.',
    'error:maintenance_icon':'info',
    'error:active':'Error: Inactive account!',
    'error:active_text':'Please, call IT division to re-activate.',
    'error:access':'Error: Access denied!',
    'error:access_text':'This might be access_token has been expired.',
    'error:query':'Error: Invalid query data!',
    'error:form':'Error: Invalid request!',
    'error:user':'Error: Invalid username!',
    'error:pass':'Error: Invalid password!',
    'error:login':'Error: Failed to login!',
    'error:token':'Error: Invalid access token!',
    'error:save':'Error: Failed to save!',
    'error:otp_not_found':'Error: OTP is not found!',
    'error:otp_expired':'Error: OTP is expired!',
    'error:otp_used':'Error: OTP had been used!',
    'error:otp_zero':'Error: OTP is still zero!',
    'error:otp_not_zero':'Error: OTP is not zero!',
  };
  return def.hasOwnProperty(key)?def[key]:key;
};


/* ---------- UI METHODS ---------- */
/* dashboard menu */
this.dashboardMenu=function(menus){
  let menuDiv=[];
  for(let menu of menus){
    let each=this.element('div',{
      'class':'dashboard-menu-each',
      title:menu.name,
    },[
      this.element('i',{
        'class':'fa fa-'+menu.icon,
      }),
      this.element('span',{
        'class':'',
      }).text(menu.name),
    ]);
    each.onclick=menu.callback;
    menuDiv.push(each);
  }
  return menuDiv;
};
/* external page */
this.externalPage=function(url,title='Untitled'){
  let id='website-frame',
  frame=document.querySelector('#'+id),
  fc=document.querySelector('#'+id+'-close'),
  fh=document.querySelector('#'+id+'-head');
  if(frame){frame.parentElement.removeChild(frame);}
  if(fh){fh.parentElement.removeChild(fh);}
  if(fc){fc.parentElement.removeChild(fc);}
  if(typeof url!=='string'){
    frame=document.createElement('div');
  }else{
    let loader=this.loader();
    frame=document.createElement('iframe');
    frame.src=url;
    frame.onload=function(){
      loader.remove();
    };
    frame.onerror=function(){
      loader.remove();
    };
  }
  frame.id=id;
  frame.classList.add(id);
  document.body.appendChild(frame);
  fh=document.createElement('div');
  fh.classList.add(id+'-head');
  fh.id=id+'-head';
  fh.dataset.title=title;
  document.body.appendChild(fh);
  fc=document.createElement('div');
  fc.classList.add(id+'-close');
  fc.id=id+'-close';
  fc.title='Close';
  document.body.appendChild(fc);
  if(!document.body.classList.contains('dont-scroll')){
    document.body.classList.add('dont-scroll');
  }
  let dt=document.querySelector('title');
  if(dt){
    let baseTitle=dt.innerText;
    fc.dataset.title=baseTitle;
    dt.innerText=title;
  }
  window.EXTERNAL_OPEN=true;
  fc.helper=this;
  fc.onclick=function(e){
    this.helper.externalPageClose();
  };
  return {
    content:frame,
    header:fh,
    helper:this,
    close:function(){
      this.helper.externalPageClose();
    },
  };
};
/* external page close */
this.externalPageClose=function(){
  let id='website-frame',
  frame=document.querySelector('#'+id),
  fc=document.querySelector('#'+id+'-close'),
  fh=document.querySelector('#'+id+'-head'),
  dt=document.querySelector('title');
  document.body.classList.remove('dont-scroll');
  window.EXTERNAL_OPEN=false;
  if(frame){frame.parentElement.removeChild(frame);}
  if(fh){fh.parentElement.removeChild(fh);}
  if(fc){
    if(dt){dt.innerText=fc.dataset.title;}
    fc.parentElement.removeChild(fc);
  }return true;
};
/* menu ui fix hover on each one of them */
this.menuUIFix=function(){
  if(window.innerWidth>820||window.innerWidth<=620){
    return;
  }
  let ms=document.getElementsByClassName('menu-each');
  for(let i=0;i<ms.length;i++){
    ms[i].addEventListener('mouseover',function(e){
      let mt=this.childNodes[1],
      mouseY=e.pageY!=null?e.pageY:e.clientY!=null?e.clientY:null;
      mt.style.top=mouseY+'px';
    },false);
  }
};
/* menu hide */
this.menuHide=function(id='menu'){
  let menu=document.getElementById(id),
  shade=document.getElementById('menu-shadow');
  if(!shade||!menu){return;}
  document.body.classList.remove('dont-scroll');
  menu.classList.remove('menu-show');
  shade.parentElement.removeChild(shade);
};
/* menu show */
this.menuShow=function(id='menu'){
  let menu=document.getElementById(id),
  shade=document.createElement('div');
  if(!menu){return;}
  menu.classList.add('menu-show');
  shade.classList.add('menu-shadow');
  shade.id='menu-shadow';
  shade.onclick=function(e){
    menu.classList.remove('menu-show');
    document.body.classList.remove('dont-scroll');
    this.parentElement.removeChild(this);
  };
  document.body.appendChild(shade);
  document.body.classList.add('dont-scroll');
};
/* menu movable */
this.menuMovable=function(id='menu'){
  if(!window.hasOwnProperty('ontouchstart')){return;}
  let el=document.getElementById(id);
  if(!el){return;}
  let _this=this;
  window.addEventListener('touchend',function(e){
    if(!window.MENU_MOVABLE_LEFT){return;}
    if(window.EXTERNAL_OPEN){
      window.MENU_MOVABLE_LEFT=false;
      return;
    }
    let isHide=window.MENU_MOVABLE_LEFT.hide,
    x=e.changedTouches?e.changedTouches[0].pageX:e.screenX,
    left=(x-window.MENU_MOVABLE_LEFT.x)+window.MENU_MOVABLE_LEFT.l;
    window.MENU_MOVABLE_LEFT=false;
    if(!isHide){
      _this.menuShow(id);
    }else if(left<-100){
      _this.menuHide(id);
    }
  },false);
  window.addEventListener('touchstart',function(e){
    if(window.EXTERNAL_OPEN||window.innerWidth>620){
      return;
    }
    let x=e.changedTouches?e.changedTouches[0].pageX:e.screenX,
    l=el.offsetLeft;
    if(l===0||x>15){
      if(x>250){
        window.MENU_MOVABLE_LEFT={x:x,l:l,el:el,hide:true};
      }return;
    }window.MENU_MOVABLE_LEFT={x:x,l:l,el:el,hide:false};
  },false);
};
/* basic ui -- require: IMAGES */
this.basicUI=function(htext='Helper',hversion=''){
  let main=document.createElement('main'),
  header=document.createElement('div'),
  body=document.createElement('div'),
  mbutton=document.createElement('div'),
  menu=document.createElement('div'),
  mb1=document.createElement('div'),
  mb2=document.createElement('div'),
  mb3=document.createElement('div'),
  mheader=document.createElement('div'),
  bheader=document.createElement('div'),
  bcontent=document.createElement('div'),
  contentTitle=document.createElement('div'),
  contentContent=document.createElement('div'),
  contentContentImg=document.createElement('img'),
  contentContentText=document.createTextNode('Loading...'),
  imgLogo=document.createElement('img'),
  clear=document.createElement('div');
  /* append */
  main.append(header);
  main.append(body);
  header.append(mbutton);
  header.append(menu);
  mbutton.append(mb1);
  mbutton.append(mb2);
  mbutton.append(mb3);
  menu.append(mheader);
  body.append(bheader);
  body.append(bcontent);
  body.append(clear);
  bcontent.append(contentTitle);
  bcontent.append(contentContent);
  contentContent.append(contentContentImg);
  contentContent.append(contentContentText);
  /* add classes and ids */
  main.classList.add('main');
  header.classList.add('header');
  header.id='header';
  header.dataset.text=htext;
  header.dataset.version=hversion;
  mbutton.classList.add('menu-button');
  mbutton.id='menu-button';
  mb1.classList.add('menu-button-strip');
  mb2.classList.add('menu-button-strip');
  mb3.classList.add('menu-button-strip');
  menu.classList.add('menu');
  menu.id='menu';
  mheader.classList.add('menu-header');
  mheader.id='menu-header';
  mheader.dataset.version='Helper v'+this.version+(this.production?'':'-dev');
  body.classList.add('body');
  body.id='body';
  bcontent.classList.add('body-content');
  bcontent.id='body-content';
  bheader.classList.add('body-header');
  bheader.id='body-header';
  contentTitle.classList.add('title');
  contentContent.classList.add('content');
  contentContentImg.style.marginRight='10px';
  contentContentImg.src=this.IMAGES.hasOwnProperty('loader.gif')?this.IMAGES['loader.gif']:'';
  contentContentImg.alt='';
  clear.style.clear='both';
  /* image logo */
  imgLogo.alt='';
  imgLogo.src=this.IMAGES['logo.png'];
  imgLogo.classList.add('image-logo');
  header.append(imgLogo);
  /* prepare element */
  main.header=header;
  main.mbutton=mbutton;
  main.menu=menu;
  main.body=body;
  main.bodyContent=bcontent;
  main.bodyHeader=bheader;
  /* ----- OTHER OBJECTS AND METHODS ----- */
  main.helper=this;
  main.base={
    title:contentTitle,
    content:contentContent,
  };
  main.double=function(leftX='',rightX=''){
    let left=document.createElement('div'),
    right=document.createElement('div'),
    wrap=document.createElement('div');
    /* append elements */
    wrap.append(left);
    wrap.append(right);
    /* add class name */
    left.classList.add('content-left');
    right.classList.add('content-right');
    /* add element content */
    if(typeof leftX==='string'){
      left.innerHTML=leftX;
    }else{
      left.append(leftX);
    }
    if(typeof rightX==='string'){
      right.innerHTML=rightX;
    }else{
      right.append(rightX);
    }
    /* add element method */
    wrap.left=left;
    wrap.right=right;
    /* return the wrap */
    return wrap;
  };
  main.triple=function(leftX='',centerX='',rightX=''){
    let left=document.createElement('div'),
    center=document.createElement('div'),
    right=document.createElement('div'),
    wrap=document.createElement('div');
    /* append elements */
    wrap.append(left);
    wrap.append(center);
    wrap.append(right);
    /* add class name */
    left.classList.add('content-triple-left');
    center.classList.add('content-triple-center');
    right.classList.add('content-triple-right');
    /* add element content */
    if(typeof leftX==='string'){
      left.innerHTML=leftX;
    }else{
      left.append(leftX);
    }
    if(typeof centerX==='string'){
      center.innerHTML=centerX;
    }else{
      center.append(centerX);
    }
    if(typeof rightX==='string'){
      right.innerHTML=rightX;
    }else{
      right.append(rightX);
    }
    /* add element method */
    wrap.left=left;
    wrap.center=center;
    wrap.right=right;
    /* return the wrap */
    return wrap;
  };
  main.put=function(title='',content=''){
    this.base.title.innerHTML=title;
    if(typeof content==='object'&&content!==null
      &&typeof content.append==='function'){
      this.base.content.innerHTML='';
      this.base.content.append(content);
    }else{
      this.base.content.innerHTML=content;
    }
  };
  main.loader=function(loadText='Loading...'){
    let img=new Image,
    loader=document.createElement('div'),
    text=document.createTextNode(loadText);
    img.alt='';
    img.style.marginRight='10px';
    img.src=this.helper.IMAGES.hasOwnProperty('loader.gif')
      ?this.helper.IMAGES['loader.gif']:'';
    loader.append(img);
    loader.append(text);
    this.put('',loader);
  };
  /* menu functions */
  main.addMenu=function(text,icon,cb,color='#ddd'){
    let div=document.createElement('div'),
    di=document.createElement('i'),
    dt=document.createElement('div');
    div.append(di);
    div.append(dt);
    this.menu.append(div);
    div.classList.add('menu-each');
    di.classList.add('fa');
    di.classList.add('fa-'+icon);
    di.style.color=color;
    dt.classList.add('menu-text');
    dt.innerText=text;
    div.title=text;
    div.callback=typeof cb==='function'?cb:function(){};
    div.helper=this.helper;
    div.onclick=function(){
      this.helper.menuHide();
      this.helper.loader(false);
      this.callback();
    };
    return div;
  };
  mbutton.helper=this;
  mbutton.onclick=function(){
    this.helper.menuShow();
  };
  /* app title */
  let appTitle=document.head.querySelector('title');
  if(appTitle){
    appTitle.innerText=htext;
  }
  /* return the main element */
  return main;
};
/* input */
this.input=function(name='',value='',type='text',placeholder='',maxlength=100,dataset={}){
  let input=document.createElement('input');
  input.name=name;
  input.value=value;
  input.type=type;
  input.placeholder=placeholder;
  input.setAttribute('maxlength',maxlength);
  input.helper=this;
  for(let key in dataset){
    input.dataset[key]=dataset[key];
  }
  if(window.cordova!==undefined&&type=='date'){
    input.classList.add('calendar');
  }
  return input;
};
/* input[type="radio"] -- value only 1 or 0 */
this.radioActive=function(key='',value=0,data=['Inactive','Active'],reverse=false){
  let div=document.createElement('div'),
  rad0=document.createElement('input'),
  lab0=document.createElement('label'),
  rad1=document.createElement('input'),
  lab1=document.createElement('label');
  rad0.type='radio';
  rad1.type='radio';
  rad0.id='radio-'+data[0];
  lab0.setAttribute('for','radio-'+data[0]);
  rad1.id='radio-'+data[1];
  lab1.setAttribute('for','radio-'+data[1]);
  lab0.classList.add('radio');
  lab0.classList.add('radio-'+(reverse?'active':'inactive'));
  lab1.classList.add('radio');
  lab1.classList.add('radio-'+(reverse?'inactive':'active'));
  rad0.name=key;
  rad1.name=key;
  rad0.value='0';
  rad1.value='1';
  if(value==1){
    rad1.checked='checked';
  }else{
    rad0.checked='checked';
  }
  lab0.innerText=data[0];
  lab1.innerText=data[1];
  div.append(rad0);
  div.append(lab0);
  div.append(rad1);
  div.append(lab1);
  div.helper=this;
  return div;
};
/* input[type="checkbox"] -- require: uniqid */
this.checkbox=function(name='',value=''){
  let id=this.uniqid(),
  span=document.createElement('span'),
  label=document.createElement('label'),
  input=document.createElement('input');
  input.type='checkbox';
  input.id=id;
  input.name=name;
  input.value=value;
  label.setAttribute('for',id);
  label.classList.add('checkbox');
  span.classList.add('cbox');
  span.append(input);
  span.append(label);
  span.input=input;
  span.label=label;
  span.helper=this;
  return span;
};
/* button */
this.button=function(text='',color='blue',icon='',callback,dataset={}){
  let i=document.createElement('i'),
  t=document.createTextNode(text),
  button=document.createElement('button');
  button.append(i);
  button.append(t);
  button.classList.add('button');
  button.classList.add('button-'+color);
  i.classList.add('fa');
  i.classList.add('fa-'+icon);
  callback=typeof callback==='function'?callback:function(){};
  button.onclick=callback;
  button.icon=i;
  button.text=t;
  button.callback=callback;
  button.helper=this;
  for(let key in dataset){
    button.dataset[key]=dataset[key];
  }
  return button;
};
/* textarea */
this.textarea=function(name='',value='',placeholder='',maxlength=100,dataset={}){
  let textarea=document.createElement('textarea');
  textarea.name=name;
  textarea.value=value;
  textarea.placeholder=placeholder;
  textarea.maxlength=maxlength;
  textarea.helper=this;
  for(let key in dataset){
    textarea.dataset[key]=dataset[key];
  }
  return textarea;
};
/* select */
this.select=function(name='',value='',data={},callback,dataset={}){
  let select=document.createElement('select');
  select.name=name;
  if(Array.isArray(data)){
    let ndata={};
    for(let i of data){
      ndata[i]=i;
    }
    data=ndata;
  }
  for(let k in data){
    let opt=document.createElement('option');
    opt.value=k;
    opt.textContent=data[k];
    if(value==k){
      opt.selected='selected';
    }
    select.append(opt);
  }
  select.helper=this;
  select.onchange=typeof callback==='function'?callback:function(){};
  for(let key in dataset){
    select.dataset[key]=dataset[key];
  }
  return select;
};
/* table */
this.table=function(cname='table',cellspacing=2,cellpadding=0){
  let table=document.createElement('table'),
  tbody=document.createElement('tbody');
  table.append(tbody);
  table.classList.add(cname);
  table.setAttribute('cellspacing',cellspacing+'px');
  table.setAttribute('cellpadding',cellpadding+'px');
  table.tbody=tbody;
  table.helper=this;
  table.row=function(){
    let tr=document.createElement('tr');
    for(let tk in arguments){
      let td=document.createElement('td');
      if(typeof arguments[tk]==='object'){
        td.append(arguments[tk]);
      }else{
        td.innerHTML=''+arguments[tk]+'';
        if(arguments[tk].toString().match(/^\d+$/)){
          td.classList.add('td-left');
        }
      }
      tr.append(td);
    }
    this.tbody.append(tr);
    tr.header=function(){
      this.classList.add('tr-header');
      return this;
    };
    return tr;
  };
  table.head=function(text='',length=2){
    let tr=document.createElement('tr'),
    td=document.createElement('td');
    td.setAttribute('colspan',''+length+'');
    if(typeof text==='object'){
      td.append(text);
    }else{
      td.innerHTML=text;
    }
    tr.append(td);
    tr.classList.add('tr-head');
    this.tbody.append(tr);
    return tr;
  };
  return table;
};
/* find row in the table -- from: tr.dataset.<name> */
this.findRow=function(key='name',callback,holder='Search...',hide=false){
  let find=document.createElement('input');
  find.type=hide?'password':'text';
  find.placeholder=holder;
  find.onkeyup=function(e){
    let rg=new RegExp(this.value,'i'),
    res={
      show:[],
      hide:[],
    },
    nm=document.querySelectorAll('tr[data-'+key+']');
    for(let i=0;i<nm.length;i++){
      if(nm[i].dataset[key].match(rg)){
        nm[i].style.removeProperty('display');
        res.show.push(nm[i]);
      }else{
        nm[i].style.display='none';
        res.hide.push(nm[i]);
      }
    }
    if(typeof callback==='function'){
      callback(res);
    }
  };
  return find;
};
/* find with select */
this.findSelect=function(config){
  /**
   * config
   *   - id          = string of main id
   *   - data        = array of data contains id and name
   *   - key         = string of key of input name
   *   - value       = string of default value
   *   - placeholder = string of placeholder
   *   - takenKey    = string of taken key for result; default: id
   *   - callback    = function of callback, parameter #1 is object {id,name,main,data}
   *                   - id of matched
   *                   - name of matched
   *                   - main.slave:
   *                     - input  = element of showed input  --> name
   *                     - result = element of hidden result --> id
   *                     - lists  = element of clickable list
   *                   - data = object of selected data
   *   - inject      = mixed of injected data to parameter #2 
  */
  config=typeof config==='object'&&config!==null?config:{};
  let ti=document.createElement('input'),
  data=config.hasOwnProperty('data')&&Array.isArray(config.data)?config.data:[],
  pmain=document.createElement('div'),
  plist=document.createElement('div'),
  pput=document.createElement('input'),
  takenKey=config.hasOwnProperty('takenKey')?config.takenKey:'id',
  key=config.hasOwnProperty('key')?config.key:'key',
  value=config.hasOwnProperty('value')?config.value:'',
  id=config.hasOwnProperty('id')?config.id:'finder',
  callback=typeof config.callback==='function'?config.callback
    :function(res){
      res.main.slave.result.value=res.id;
      res.main.slave.input.value=res.name;
    },
  inject=config.hasOwnProperty('inject')?config.inject:null;
  ti.type='hidden';
  ti.name=key;
  ti.value=value;
  ti.id='finder-result-'+key;
  pput.type='text';
  pput.value=this.getValueByKey(takenKey,value,'name',data)||'';
  pput.placeholder=config.hasOwnProperty('placeholder')?config.placeholder:'';
  pput.id='finder-input-'+key;
  pput.setAttribute('autocomplete','off');
  plist.classList.add('finder-list');
  plist.classList.add('finder-list-hide');
  pmain.classList.add('finder-main');
  pmain.append(ti);
  pmain.append(pput);
  pmain.append(plist);
  pput.onkeyup=e=>{
    delete pmain.name;
    if(pput.value){
      if(plist.classList.contains('finder-list-hide')){
        plist.classList.remove('finder-list-hide');
      }
    }else{
      plist.classList.add('finder-list-hide');
      return;
    }
    plist.innerHTML='';
    plist.classList.remove('finder-list-hide');
    let vm=new RegExp(pput.value,'i');
    for(let i=0;i<data.length;i++){
      if(data[i].name.match(vm)){
        let pl=document.createElement('div');
        pl.classList.add('finder-list-each');
        pl.innerText=data[i].name;
        pl.dataset.id=data[i].id+'';
        pl.dataset.key=key;
        pl.dataset.takenValue=data[i].hasOwnProperty(takenKey)?data[i][takenKey]:data[i].id;
        pl.dataset.data=JSON.stringify(data[i]);
        pl.helper=this;
        pl.onclick=async function(){
          let res=document.getElementById('finder-result-'+this.dataset.key);
          plist.classList.add('finder-list-hide');
          res.value=this.dataset.takenValue;
          pput.value=this.innerText;
          callback({
            id:this.dataset.id,
            name:this.innerText,
            main:pmain,
            data:this.helper.parseJSON(this.dataset.data),
          },inject);
        };
        plist.append(pl);
      }
    }
  };
  pput.onfocus=e=>{
    delete pmain.name;
    if(pput.value){
      if(plist.classList.contains('finder-list-hide')){
        plist.classList.remove('finder-list-hide');
      }
    }
    plist.innerHTML='';
    plist.classList.remove('finder-list-hide');
    let vm=new RegExp(pput.value,'i');
    for(let i=0;i<data.length;i++){
      if(data[i].name.match(vm)){
        let pl=document.createElement('div');
        pl.classList.add('finder-list-each');
        pl.innerText=data[i].name;
        pl.dataset.id=data[i].id+'';
        pl.dataset.key=key;
        pl.dataset.takenValue=data[i].hasOwnProperty(takenKey)?data[i][takenKey]:data[i].id;
        pl.dataset.data=JSON.stringify(data[i]);
        pl.helper=this;
        pl.onclick=async function(){
          let res=document.getElementById('finder-result-'+this.dataset.key);
          plist.classList.add('finder-list-hide');
          res.value=this.dataset.takenValue;
          pput.value=this.innerText;
          callback({
            id:this.dataset.id,
            name:this.innerText,
            main:pmain,
            data:this.helper.parseJSON(this.dataset.data),
          },inject);
        };
        plist.append(pl);
      }
    }
  };
  pput.onblur=async e=>{
    await this.sleep(200);
    plist.classList.add('finder-list-hide');
    return;
  };
  pmain.id=id;
  pmain.slave={
    result:ti,
    input:pput,
    list:plist,
  };
  return pmain;
};
/* dialog page -- require: IMAGES */
this.dialog=async function(){
  let old=document.getElementById('dialog-close');
  if(old){old.close();}
  let main=document.createElement('div'),
  close=document.createElement('div'),
  inner=document.createElement('div'),
  imgc=new Image,
  img=new Image;
  img.src=this.IMAGES['loader.gif'];
  imgc.src=this.IMAGES['icon-plus.png'];
  main.classList.add('dialog');
  main.classList.add('dialog-hide');
  main.append(inner);
  inner.append(img);
  inner.classList.add('dialog-inner');
  inner.classList.add('dialog-loading');
  close.append(imgc);
  close.main=main;
  close.inner=inner;
  close.loader=img;
  close.id='dialog-close';
  close.classList.add('dialog-close');
  close.helper=this;
  close.close=function(){
    this.main.remove();
    this.remove();
    this.helper.dialogPage=null;
  };
  close.onclick=function(){
    this.close();
  };
  close.blank=function(){
    this.inner.classList.remove('dialog-loading');
    this.inner.innerHTML='';
    return this;
  };
  close.put=function(el){
    this.inner.classList.remove('dialog-loading');
    this.inner.innerHTML='';
    this.inner.append(el);
    return this;
  };
  this.dialogPage=close;
  document.body.append(main);
  await this.sleep(10);
  main.classList.remove('dialog-hide');
  await this.sleep(300);
  document.body.append(close);
  return close;
};
/* loader + dialog.close */
this.loader=function(close){
  let id='loader',
  old=document.getElementById(id);
  if(old){old.remove();}
  if(this.dialogPage){this.dialogPage.close();}
  if(close===false){return;}
  let outer=document.createElement('div'),
  inner=document.createElement('span');
  outer.append(inner);
  outer.id=id;
  inner.classList.add('loader-inner');
  outer.classList.add('loader-outer');
  document.body.append(outer);
  return outer;
};
/* date selection -- require: parseDate */
this.dateSelection=function(config){
  /**
   * config:
   *   - id    = string of element id
   *   - key   = string of input key 
   *   - value = default value
   *   - min   = minimum date; default: 1960-01-01
   *   - max   = maximum date; default: 2038-12-31
   * return: object of element with property of element: span and input
   * require: parseDate, input
   */
  config=typeof config==='object'&&config!==null?config:{};
  let key=config.hasOwnProperty('key')?config.key:'key',
  value=config.hasOwnProperty('value')?config.value:'',
  min=config.hasOwnProperty('min')?config.min:'1960-01-01',
  max=config.hasOwnProperty('max')?config.max:'2038-12-31',
  id=config.hasOwnProperty('id')?config.id:'date-selection',
  val=document.createElement('div'),
  vdate=document.createElement('span'),
  idate=this.input(key,value,'date');
  idate.style.width='20px';
  idate.style.marginRight='10px';
  idate.text=vdate;
  idate.max=max;
  idate.min=min;
  idate.helper=this;
  idate.onchange=function(){
    this.text.innerText=this.helper.parseDate(this.value);
  };
  idate.onfocus=function(){
    this.text.style.backgroundColor='rgba(51,51,51,0.8)';
    this.text.style.color='#fff';
  };
  idate.onblur=function(){
    this.text.style.backgroundColor='transparent';
    this.text.style.color='#333';
  };
  vdate.innerText=this.parseDate(value);
  vdate.input=idate;
  vdate.style.padding='3px 10px';
  vdate.style.borderRadius='5px';
  vdate.style.lineHeight='30px';
  vdate.style.whiteSpace='nowrap';
  vdate.onclick=function(){
    this.input.focus();
  };
  val.style.whiteSpace='nowrap';
  val.append(idate);
  val.append(vdate);
  val.input=idate;
  val.span=vdate;
  val.id=id;
  return val;
};


/* ---------- USER ---------- */
/* logout -- loader, userData, else */
this.logout=async function(){
  let yes=await this.confirmX('Logout?');
  if(!yes){return;}
  this.loader();
  let res=await this.request('query','delete from access where uid='
    +this.user.id);
  this.userData(false);
  this.user=null;
  await this.sleep(500);
  this.start(true);
};
/* logged in */
this.isLogin=()=>{
  return this.user?true:false;
};
/* user data -- key: app-user */
this.userData=(ndata,suffix)=>{
  suffix=typeof suffix==='string'?'-'+suffix:'';
  let key='app-user'+suffix,
  res=false;
  if(ndata===false){
    localStorage.removeItem(key);
    return true;
  }else if(typeof ndata==='object'&&ndata!==null){
    let dataString=JSON.stringify(ndata);
    localStorage.setItem(key,dataString);
    return true;
  }
  let data=localStorage.getItem(key);
  try{
    res=JSON.parse(data);
  }catch(e){
    res=false;
  }
  return res;
};
/* location - promise */
this.userLocation=function(){
  return new Promise(resolve=>{
    navigator.geolocation.getCurrentPosition(r=>{
      return resolve(r);
    });
  });
};


/* ---------- SWEETALERT - sweetalert2@11 ---------- */
/* reset abl database -- require: ABL_OBJECT */
this.reset=()=>{
  this.confirm('Reset the app?','',yes=>{
    if(yes){
      if(window.hasOwnProperty('ABL_OBJECT')
        &&typeof window.ABL_OBJECT==='object'
        &&window.ABL_OBJECT!==null){
        ABL_OBJECT.database(false);
      }
      let loader=this.loader();
      setTimeout(async ()=>{
        this.statusBar('#ffffff');
        window.location.reload();
      },1000);
      return true;
    }return false;
  });
};
/* alert promise -- REQUIRES: sweetalert2@11 */
this.alertX=function(title,text,icon){
  return new Promise(resolve=>{
    this.alert(title,text,icon,resolve);
  });
};
/* alert -- REQUIRES: sweetalert2@11 */
this.alert=(title='',text='',icon='',cb)=>{
  cb=typeof cb==='function'?cb:function(){};
  Swal.fire({
    title:title,
    text:text,
    icon:icon,
    confirmButtonColor:'#309695',
    preConfirm:async (result)=>{
      return cb(result);
    },
  });
};
/* prompt promise -- REQUIRES: sweetalert2@11 */
this.promptX=function(title,text,type,obutton){
  return new Promise(resolve=>{
    this.prompt(title,text,resolve,type,obutton);
  });
};
/* prompt -- REQUIRES: sweetalert2@11 */
this.prompt=(title,text,cb,type='text',obutton='OK')=>{
  title=typeof title==='string'?title:'';
  text=typeof text==='string'?text:'';
  cb=typeof cb==='function'?cb:function(){};
  Swal.fire({
    title:title,
    text:text,
    input:type,
    inputAttributes:{
      autocapitalize:'off',
      autocomplete:'off',
    },
    showCancelButton:true,
    cancelButtonText:'Cancel',
    cancelButtonColor:'#963030',
    confirmButtonText:obutton,
    confirmButtonColor:'#309695',
    showLoaderOnConfirm:true,
    allowOutsideClick:()=>!Swal.isLoading(),
    preConfirm:async (result)=>{
      return cb(result);
    },
  });
};
/* confirm promise -- REQUIRES: sweetalert2@11 */
this.confirmX=function(title,text){
  return new Promise(resolve=>{
    this.confirm(title,text,resolve);
  });
};
/* confifm -- REQUIRES: sweetalert2@11 */
this.confirm=(title,text,cb)=>{
  title=typeof title==='string'?title:'';
  text=typeof text==='string'?text:'';
  cb=typeof cb==='function'?cb:function(){};
  Swal.fire({
    title:title,
    text:text,
    showCancelButton:true,
    cancelButtonText:'No',
    cancelButtonColor:'#963030',
    confirmButtonText:'Yes',
    confirmButtonColor:'#309695',
  }).then(result=>{
    return cb(result.isConfirmed?true:false);
  });
};
/**
 * notif -- REQUIRES: sweetalert2@11
 * icons: success (default), error, warning, info, question
 */
this.notif=(message,icon,time=1200,position="top-end")=>{
  let Toast=Swal.mixin({
    toast:true,
    position:position,
    showConfirmButton:false,
    timer:time,
    timerProgressBar:true,
    didOpen:(toast)=>{
      toast.onmouseenter=Swal.stopTimer;
      toast.onmouseleave=Swal.resumeTimer;
    }
  });
  icon=typeof icon==='string'?icon:'success';
  message=typeof message==='string'?message:'';
  Toast.fire({
    icon:icon,
    title:message
  });
};


/* ---------- CHECK and FAKE ---------- */
/* fake loader -- promise and circle-progress */
this.fakeLoaderZ=async function(i=0){
  let cp=new CircleProgress;
  cp.open();
  let res=await this.fakeLoaderX(function(e){
    cp.loading(e);
  },i);
  cp.close();
  return res;
};
/* fake loader -- promise */
this.fakeLoaderX=function(dl,i=0){
  return new Promise(resolve=>{
    this.fakeLoader(resolve,dl,i);
  });
};
/* fake loader -- no-ui */
this.fakeLoader=function(cb,dl,i=0){
  i=typeof i==='number'&&i!==NaN?i:0;
  if(i>=100){
    return typeof cb==='function'?cb(true):false;
  }
  i++;
  if(typeof dl==='function'){
    dl({
      type:'progress',
      loaded:i,
      total:100,
    });
  }
  setTimeout(e=>{
    this.fakeLoader(cb,dl,i);
  },10);
};
/* is everything ready -- with loader */
this.isEverythingReady=async function(){
  /* loaded variable */
  let progress=this.loadProgress||{};
  progress.max=4+FN_CHECK.length;
  progress.value=0;
  /* document */
  let res=await this.isDocumentReady();
  if(!res){return res;}
  progress.value++;
  /* circle progress */
  res=await this.isCircleProgressReady();
  if(!res){return res;}
  progress.value++;
  /* open circle progress */
  let cp=new CircleProgress;
  cp.open();
  /* sweet alert */
  res=await this.isSwalReady();
  if(!res){
    cp.close();
    return res;
  }
  progress.value++;
  /* cordova */
  res=await this.isCordovaReady();
  if(!res){
    cp.close();
    return res;
  }
  progress.value++;
  /* functions check */
  for(let fn of FN_CHECK){
    res=await this.isFunctionReady(fn);
    if(!res){break;}
    progress.value++;
  }
  if(!res){
    cp.close();
    return res;
  }
  /* perform fake loader then close it */
  await this.fakeLoaderX(function(e){
    cp.loading(e);
  },0);
  cp.close();
  delete this.loadProgress;
  /* return the result */
  return res;
};
/* is cordova ready -- 5s -- with StatusBar */
this.isCordovaReady=async function(){
  if(!window.CORDOVA_LOADED){
    return true;
  }
  let res=false;
  for(let i of this.range(1,100)){
    if(typeof cordova==='object'
      &&cordova!==null
      &&typeof StatusBar==='object'
      &&StatusBar!==null){
      res=true;
      break;
    }
    await this.sleep(50);
  }return res;
};
/* is swal ready -- 10s */
this.isSwalReady=async function(){
  let res=false;
  for(let i of this.range(1,200)){
    if(typeof Swal==='function'){
      res=true;
      break;
    }
    await this.sleep(50);
  }return res;
};
/* is circle progress ready -- 5s */
this.isCircleProgressReady=async function(){
  let res=false;
  for(let i of this.range(1,100)){
    if(typeof CircleProgress==='function'){
      res=true;
      break;
    }
    await this.sleep(50);
  }return res;
};
/* is document ready -- 1s */
this.isDocumentReady=async function(){
  let res=false;
  for(let i of this.range(1,100)){
    if(typeof document.body==='object'
      &&document.body!==null){
      res=true;
      break;
    }
    await this.sleep(10);
  }return res;
};
/* is function ready -- 1s */
this.isFunctionReady=async function(fn){
  let res=false;
  for(let i of this.range(1,100)){
    if(typeof window[fn]==='function'){
      res=true;
      break;
    }
    await this.sleep(10);
  }return res;
};
/* is browser app -- const HELPER_BROWSER_APP */
this.isBrowser=function(){
  if(typeof HELPER_BROWSER_APP==='boolean'
    &&HELPER_BROWSER_APP===true){
    return true;
  }return false;
};


/* ---------- ALIASES METHODS -- STAND-ALONE ---------- */
/* alias position -- require: positions */
this.aliasPosition=function(text=''){
  let aliases=typeof this.positions==='object'&&this.positions!==null?this.positions:{};
  return aliases.hasOwnProperty(text)?aliases[text]:text;
};
/* alias division -- require: divisions */
this.aliasDivision=function(text=''){
  let aliases=typeof this.divisions==='object'&&this.divisions!==null?this.divisions:{};
  return aliases.hasOwnProperty(text)?aliases[text]:text;
};
/* alias -- require: aliases */
this.alias=function(text=''){
  let aliases=typeof this.aliases==='object'&&this.aliases!==null?this.aliases:{};
  return aliases.hasOwnProperty(text)?aliases[text]:text;
};
/* app name to app function -- require: appBaseName */
this.getAppClassName=function(name=''){
  let an=name.split(/[^a-z]+/ig),
  bname=this.hasOwnProperty('appBaseName')
    ?this.appBaseName:'',
  ar=[bname];
  for(let d of an){
    ar.push(d.substring(0,1).toUpperCase());
    ar.push(d.substring(1).replace(/[^a-z]+/ig,''));
  }
  return ar.join('');
};


/* ---------- STAND-ALONE METHODS ---------- */
/* ini object */
this.ini=function(){
  return {
    value:function(str){
      if(str===null){
        return 'null';
      }else if(str===false){
        return 'false';
      }else if(str===true){
        return 'true';
      }
      str=str.toString();
      if(!str.match(/"|\n/g)){
        return str;
      }
      return '"'+str
        .replace(/\n/g,'\\n')
        .replace(/"/g,'\\"')
        +'"';
    },
    /* build an ini string */
    build:function(data,nested){
      if(typeof data!=='object'||data===null
        ||Array.isArray(data)){
        return;
      }
      let res=[];
      for(let k in data){
        let v=data[k],
        col=k+'='+this.value(v);
        if(nested){
          col='['+k+']\n';
          for(let i in v){
            col+=i+'='+this.value(v[i]);
          }
        }res.push(col);
      }return res.join('\n');
    },
    /* parse without section */
    parseNoSection:function(data){
      if(typeof data!=="string"){return {};}
      let ln=data.split(/\r\n|\r|\n/g),
      res={};
      for(let p of ln){
        let m=p.match(/^\s*([^=]+?)\s*=\s*(.*?)\s*$/);
        if(!m){continue;}
        res[m[1]]=m[2].match(/^"/)&&m[2].match(/"$/)
          ?m[2].substr(1,m[2].length-2)
            .replace(/\\"/g,'"')
            .replace(/\\n/g,'\n')
          :m[2];
      }return res;
    },
    /** 
     * ini.js
     * ~ parse ini from string (nested only)
     * ~ this could be parse multiline ini values
     * @parameters:
      *   data = string of ini data string
        ** actually this is my old code, wrote 5 years ago
        ** started at november 18th 2017
        ** update at september 7th 2018
     */
    parse:function(data){
      if(typeof data!=="string"){return;}
      let ex=data.split(/\r\n|\r|\n/g);
      let res={},store='',index='',pin='';
      for(let i in ex){
        if(ex[i]==''&&index==''){continue;}
        else if(ex[i].match(/^;/g)){continue;}
        else if(ex[i].match(/^\[(.*)\]/ig)){
          pin=ex[i].replace(/^\[/ig,'').replace(/\]\s*$/ig,'');
          res[pin]={};
        }else if(ex[i].match(/^.+=\s*/ig)&&index==''){
          let mt=ex[i].match(/^(.+)=\s*"(.*)"\s*$/ig);
          let mi=ex[i].match(/^[^=]+/ig);
          if(mt&&mi){
            index=mi[0].replace(/^\s+|\s+$/ig,'');
            res[pin][index]=mt[0].substr(mi[0].length).replace(/^\s*=\s*"|\s*"\s*$/ig,'');
            index='';
            continue;
          }
          let exi=ex[i].match(/^.+=\s*/ig);
          if(mi){
            index=mi[0].replace(/^\s+|\s+$/ig,'');
          }else{
            index=exi[0].replace(/=\s*$/ig,'').replace(/^\s+|\s+$/ig,'');
          }
          exi=ex[i].replace(/^.+=\s*/ig,'');
          if(exi.match(/^".*"\s*$/ig)){
            res[pin][index]=exi.substr(1).replace(/"\s*$/ig,'');
            index='';
          }else if(exi.match(/^"/ig)){
            store=exi.substr(1)+'\r\n';
          }else{
            if(typeof res[pin]==='undefined'){continue;}
            res[pin][index]=exi.replace(/^\s+|\s+$/ig,'');
            index='';
          }exi=null;
        }else if(ex[i].match(/"\s*$/ig)&&index!==''){
          if(typeof res[pin]==='undefined'){continue;}
          store+=ex[i].replace(/"\s*$/ig,'')+'\r\n';
          res[pin][index]=store;
          store='',index='';
        }else if(index!==''){
          store+=ex[i]+'\r\n';
        }
      }return res;
    },
  };
};
/* get grand total from each price and count -- require: formSerialize */
this.getGrandTotal=function(){
  let fdata=this.formSerialize(true),
  data=this.parseJSON(fdata.data),
  gtotal=0;
  for(let i in data){
    let val=data[i],
    subtotal=parseInt(val.price,10)*parseInt(val.count,10);
    gtotal+=subtotal;
  }return gtotal;
};
/* serialize a form by elements name -- require: parseQuery */
this.formSerialize=function(idata=false){
  let data={},
  res={},
  form=document.querySelectorAll('[name]');
  for(let i=0;i<form.length;i++){
    if(typeof form[i].value==='undefined'){
      continue;
    }else if(form[i].name.match(/^data/)){
      data[form[i].name]=form[i].value;
    }else if(form[i].type=='radio'){
      if(form[i].checked){
        res[form[i].name]=form[i].value;
      }
    }else{
      res[form[i].name]=form[i].value;
    }
  }
  let query=[];
  for(let k in data){
    query.push(k+'='+data[k]);
  }
  let ndata=this.parseQuery(query.join('&'));
  if(!ndata.hasOwnProperty('data')){
    ndata.data={};
  }
  if(idata){
    res.data=JSON.stringify(ndata.data);
  }
  return res;
};
/* local storage */
this.storage=function(prefix='local/'){
  let store={
    __prefix:prefix,
    get:function(key=''){
      key=typeof key!=='string'?JSON.stringify(key):key;
      let res=false,
      raw=localStorage.getItem(this.__prefix+key);
      try{res=JSON.parse(raw);}catch(e){}
      return res;
    },
    set:function(key='',value=''){
      key=typeof key!=='string'?JSON.stringify(key):key;
      value=typeof value!=='string'?JSON.stringify(value):value;
      localStorage.setItem(this.__prefix+key,value);
      return this.keys().indexOf(this.__prefix+key)>=0?true:false;
    },
    delete:function(key=''){
      key=typeof key!=='string'?JSON.stringify(key):key;
      localStorage.removeItem(this.__prefix+key);
      return this.keys().indexOf(this.__prefix+key)<0?true:false;
    },
    keys:function(){
      let res=[],
      length=this.__prefix.length;
      for(let i=0;i<localStorage.length;i++){
        let key=localStorage.key(i);
        if(key.substring(0,length)==this.__prefix){
          res.push(key.substring(length));
        }
      }return res;
    },
    clear:function(){
      let res=0,
      length=this.__prefix.length;
      for(let i=0;i<localStorage.length;i++){
        let key=localStorage.key(i);
        if(key.substring(0,length)==this.__prefix){
          localStorage.removeItem(key);
          res++;
        }
      }return res;
    },
  };
  return store;
};
/* create element -- stand-alone */
this.element=function(name='div',attr={},children=[]){
  attr=typeof attr==='object'&&attr!==null?attr:{};
  children=Array.isArray(children)?children:[];
  let main=document.createElement(name);
  /* set attributes */
  for(let k in attr){
    main.setAttribute(k,attr[k]);
  }
  /* add children */
  for(let child of children){
    main.append(child);
  }
  /* add object property and method */
  main.attr=attr;
  main.html=function(html=''){
    this.innerHTML=html;
    return this;
  };
  main.text=function(text=''){
    this.innerText=text;
    return this;
  };
  main.content=function(content=''){
    this.textContent=content;
    return this;
  };
  main.appendTo=function(el){
    if(typeof el==='object'&&el!==null
    &&typeof el.append==='function'){
      el.append(this);
    }return this;
  };
  main.helper=this;
  /* return the element object */
  return main;
};
/* JSON download */
this.downloadJSON=function(data,out='data'){
  data=JSON.stringify(data);
  let blob=new Blob([data],{type:'application/json'}),
  url=window.URL.createObjectURL(blob),
  a=document.createElement('a');
  a.href=url;
  a.download=out+'.json';
  a.click();
  window.URL.revokeObjectURL(url);
  return url;
};
/* audio play -- search for window.AUDIOS first */
this.audioPlay=function(url){
  return new Promise(function(resolve,reject){
    let audio=new Audio();
    audio.preload="auto";
    audio.autoplay=true;
    audio.onerror=reject;
    audio.onplay=resolve;
    audio.src=window.hasOwnProperty('AUDIOS')&&AUDIOS.hasOwnProperty(url)?AUDIOS[url]:url;
  });
};
/* parse date and time -- indonesia */
this.parseDatetime=function(value,format='en-US'){
  let date=new Date(value),
  options={
    weekday:'long',
    year:'numeric',
    month:'long',
    day:'numeric',
    hour:'numeric',
    minute:'numeric',
  };
  return date.toLocaleDateString(format,options);
};
/* parse date -- default: indonesia */
this.parseDate=function(value,format='en-US'){
  value=value?value:(new Date).getTime();
  let date=new Date(value),
  options={
    weekday:'long',
    year:'numeric',
    month:'long',
    day:'numeric',
  };
  return date.toLocaleDateString(format,options);
};
/* parse nominal -- default: IDR (indonesian rupiah) */
this.parseNominal=function(nominal=0,format='en-US',currency='USD',decimal=0){
  let money=new Intl.NumberFormat(format,{
    style:'currency',
    currency:currency,
    maximumFractionDigits:decimal,
  });
  return money.format(nominal);
};
/* get value by id -- result: value of data */
this.getValueById=function(id,key='',data=[]){
  return this.getValueByKey('id',id,key,data);
};
/* get value by Key -- result: value of data */
this.getValueByKey=function(pkey,value,key='',data=[]){
  let arr=this.getDataByKey(pkey,value,data,false),
  res=arr!==null&&arr.hasOwnProperty(key)?arr[key]:'';
  return res;
};
/* get data by id -- result: object or null */
this.getDataById=function(id,data=[]){
  return this.getDataByKey('id',id,data,false);
};
/* get data by key from dataArray -- result: array (nobreak) or object or null */
this.getDataByKey=function(key,value='',data=[],nobreak=false){
  data=Array.isArray(data)?data:[];
  let res=nobreak?[]:null;
  for(let i of data){
    if(i[key]==value){
      if(nobreak){
        res.push(i);
      }else{
        res=i;
        break;
      }
    }
  }return res;
};
/* sleep ms - promise */
this.sleep=function(ms){
  return new Promise(resolve=>{
    setTimeout(resolve,ms);
  });
};
/* array range */
this.range=function(s,t){
  s=s?s:0;
  t=t?Math.max(s,t):0;
  let r=[];
  for(let i=s;i<=t;i++){
    r.push(i);
  }return r;
};
/* load script by string */
this.loadScriptString=function(str,type='text/javascript'){
  let scr=document.createElement('script');
  scr.textContent=str;
  scr.type=type;
  document.head.append(scr);
  return scr;
};
/* load style by string */
this.loadStyleString=function(str){
  let scr=document.createElement('style');
  scr.textContent=str;
  scr.rel='stylesheet';
  scr.type='text/css';
  scr.media='print,screen';
  document.head.append(scr);
  return scr;
};
/* load script by url */
this.loadScriptURL=function(url,type='text/javascript'){
  let scr=document.createElement('script');
  scr.src=url;
  scr.type=type;
  document.head.append(scr);
  return scr;
};
/* load style by url */
this.loadStyleURL=function(url){
  let scr=document.createElement('link');
  scr.href=url;
  scr.rel='stylesheet';
  scr.type='text/css';
  scr.media='print,screen';
  document.head.append(scr);
  return scr;
};
/* load icon by url */
this.loadIconURL=function(url,type='image/png'){
  let scr=document.createElement('link');
  scr.href=url;
  scr.rel='icon';
  scr.type=type;
  document.head.append(scr);
  return scr;
};
/* parse url path -- protocol and hostname are not included */
this.parseURL=function(str){
  if(typeof str!=='string'){return false;}
  let obj=str.split('?'),
  path=obj[0],
  query=obj.length>1
    ?this.parseQuery(obj[1]):{};
  return {
    path:path,
    query:query,
  }
};
/* parse url query -- require: parseQueryKey */
this.parseQuery=function(t){
  if(typeof t!=='string'){return false;}
  let s=t.split('&'),r={},c={};
  for(let i=0;i<s.length;i++){
    if(!s[i]||s[i]==''){continue;}
    let p=s[i].split('='),
    k=decodeURIComponent(p[0]),
    m=k.match(/(\[[^\]]*\])/g),
    v=p[1]?decodeURIComponent(p[1]):'';
    if(!m){
      r[k]=v;
      continue;
    }
    let l=k.replace(/\[(.*)?\]$/g,'');
    c[l]=c[l]?c[l]:0;
    if(!r[l]){r[l]={};}
    r[l]=this.parseQueryKey(r[l],m,v);
  }return r;
};
/* parse query key as object keys */
this.parseQueryKey=function(obj,m,v,i){
  obj=typeof obj==='object'&&obj!==null?obj:{};
  i=i?parseInt(i,10):0;
  if(!Array.isArray(m)||!m[i]){
    return v;
  }
  let ml=m.length,
  mi=m[i].replace(/^\[(.*)\]$/,'$1');
  if(!obj[mi]){
    obj[mi]={};
  }
  obj[mi]=this.parseQueryKey(obj[mi],m,v,i+1);
  return obj;
};
/* buildQuery v2, build http query recusively */
this.buildQuery=function(data,key){
  let ret=[],dkey=null;
    for(let d in data){
      dkey=key?key+'['
            +encodeURIComponent(d)
              .replace(/\(/g,'%28')
              .replace(/\)/g,'%29')
            +']'
          :encodeURIComponent(d)
            .replace(/\(/g,'%28')
            .replace(/\)/g,'%29');
      if(typeof data[d]=='object'&&data[d]!==null){
        ret.push(this.buildQuery(data[d],dkey));
      }else{
        ret.push(
          dkey+"="
            +encodeURIComponent(data[d])
            .replace(/\(/g,'%28')
            .replace(/\)/g,'%29')
        );
      }
  }return ret.join("&");
};
/* parse json to object */
this.parseJSON=function(data){
  let res=false;
  try{
    res=JSON.parse(data);
  }catch(e){
    res=false;
  }return res;
};
/* like json, or into readable json string -- require: objectLength */
this.likeJSON=function(obj,limit,space,pad){
  let rtext='';  
  space=space?parseInt(space,0xa):0x0;
  limit=limit?parseInt(limit,0xa):0x1;
  pad=pad?parseInt(pad,0xa):0x2;
  if((typeof obj==='object'&&obj!==null)
    ||Array.isArray(obj)){
    let start=Array.isArray(obj)?'[':'{',
        end=Array.isArray(obj)?']':'}';
    if(space==0x0){
      rtext+=(' ').repeat(pad*space)+''+start+'\r\n';
    }
    let len=this.objectLength(obj),counter=0;
    for(let i in obj){
      counter++;
      let comma=counter<len?',':'',e=obj[i],espace=space+2;
      if((typeof e==='object'&&e!==null)
        ||Array.isArray(e)){
        let estart=Array.isArray(e)?'[':'{',
            eend=Array.isArray(e)?']':'}',
            k=start==='{'?'"'+i+'": ':'';
        rtext+=(' ').repeat(pad*espace)+''+k+estart+'\r\n';
        if((espace/2)<limit){
          rtext+=this.likeJSON(e,limit,espace,pad);
        }else{
          rtext+=(' ').repeat(pad*(espace+2))
            +'[***LIMITED:'+limit+'***]\r\n';
        }
        rtext+=(' ').repeat(pad*espace)+''+eend+comma+'\r\n';
      }else if(typeof e==='string'||typeof e==='number'){
        let k=typeof e==='number'?e.toString():JSON.stringify(e);
        i=start==='{'?'"'+i+'": ':'';
        rtext+=(' ').repeat(pad*espace)+''+i+k+comma+'\r\n';
      }else if(typeof e==='boolean'){
        let k=e===true?'true':'false';
        i=start==='{'?'"'+i+'": ':'';
        rtext+=(' ').repeat(pad*espace)+''+i+k+comma+'\r\n';
      }else if(e===null){
        i=start==='{'?'"'+i+'": ':'';
        rtext+=(' ').repeat(pad*espace)+''+i+'null'+comma+'\r\n';
      }else{
        let k='"['+(typeof e)+']"';
        i=start==='{'?'"'+i+'" : ':'';
        rtext+=(' ').repeat(pad*espace)+''+i+k+comma+'\r\n';
      }
    }
    if(space==0){
      rtext+=(' ').repeat(pad*space)+''+end+'\r\n';
    }
  }else if(typeof obj==='string'){
    rtext+=(' ').repeat(pad*space)+'"'+obj+'"\r\n';
  }else if(typeof obj==='number'){
    rtext+=(' ').repeat(pad*space)+''+obj.toString()+'\r\n';
  }else if(typeof obj==='boolean'){
    rtext+=(' ').repeat(pad*space)+''+(obj===true
      ?'true':'false')+'\r\n';
  }else if(obj===null){
    rtext+=(' ').repeat(pad*space)+'null\r\n';
  }else{
    rtext+=(' ').repeat(pad*space)+'"['+(typeof obj)+']"\r\n';
  }return rtext;
};
/* generate uniqid */
this.uniqid=function(prefix){
  return (typeof prefix==='string'?prefix:'') 
    +(Math.random()*Math.pow(0x0a,0x14)).toString(0x24)
    +(new Date).getTime().toString(0x24);
};
/* object length */
this.objectLength=function(data){
  if(Array.isArray(data)){
    return data.length;
  }
  data=typeof data==='object'&&data!==null?data:{};
  let res=0;
  for(let i in data){
    res++;
  }return res;
};
/* is object */
this.isObject=function(data){
  return typeof data==='object'&&data!==null&&!Array.isArray(data)?true:false;
};
/* object to array */
this.objectToArray=function(data){
  data=this.isObject(data)?data:{};
  let res=[];
  for(let i in data){
    res.push(data[i]);
  }return res;
};
/* array to object */
this.arrayToObject=function(data){
  data=Array.isArray(data)?data:[];
  let res={};
  for(let i in data){
    res[i]=data[i];
  }return res;
};
/* grouped object by key from array */
this.arrayGroup=function(data=[],key='id'){
  let res={};
  for(let d of data){
    if(!d.hasOwnProperty(key)){continue;}
    if(!res.hasOwnProperty(d[key])){
      res[d[key]]=[];
    }
    res[d[key]].push(d);
  }return res;
};
/* get years object for selector */
this.getYears=function(start=2025,length=10){
  let res={};
  for(let i=0;i<length;i++){
    let v=start+i;
    res[v]=v;
  }return res;
};


/* ---------- CORDOVA ---------- */
/* close app */
this.closeApp=function(){
  if(!window.navigator.hasOwnProperty('app')
    ||!window.navigator.app.hasOwnProperty('exitApp')
    ||typeof window.navigator.app.exitApp!=='function'){
    return this.notif('Some requirement is missing.','error');
  }return navigator.app.exitApp();
};
/* status bar -- requires: cordova */
this.statusBar=function(hex){
  /* status bar -- cordova-plugin-statusbar */
  if(typeof StatusBar==='object'&&StatusBar!==null){
    StatusBar.backgroundColorByHexString(hex);
    StatusBar.show();
  }
  /* navigation bar -- cordova-plugin-navigationbar-color */
  if(typeof NavigationBar==='object'&&NavigationBar!==null){
    NavigationBar.backgroundColorByHexString(hex);
    NavigationBar.show();
  }
  /* screen orientation -- cordova-plugin-screen-orientation */
  if(window.hasOwnProperty('screen')
    &&window.screen.hasOwnProperty('orientation')
    &&typeof window.screen.orientation.lock==='function'){
    window.screen.orientation.lock('portrait');
  }
  /* return always true */
  return true;
};
/* open url, require: cordova-plugin-inappbrowser */
this.openURL=function(url,target,options){
  if(window.CORDOVA_LOADED&&cordova.InAppBrowser){
    return cordova.InAppBrowser.open(url,target,options);
  }return window.open(url,target);
};


/* return for object construction */
return this.init();
};


