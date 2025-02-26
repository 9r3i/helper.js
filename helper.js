/**
 * helper.js
 * ~ for any js helper
 * autored by 9r3i (https://github.com/9r3i)
 * started at February 22nd 2025
 */
;function Helper(){
/* set to true before compile to appbase */
this.production=false;
/* the version code */
Object.defineProperty(this,'versionCode',{
  value:103,
  writable:false,
});
/* the version */
Object.defineProperty(this,'version',{
  value:this.versionCode.toString().split('').join('.'),
  writable:false,
});

/* debug all requests -- for development only */
this.debugRequest=false;


/* hosts */
this.hosts={
  appbase     : 'http://127.0.0.1:9303/api/appbase/appname.app',
  version     : 'http://127.0.0.1:9303/api/appbase/appversion.txt',
  eva         : 'http://127.0.0.1:9303/api/eva/',
  eva_dev     : 'http://127.0.0.1:9304/api/eva/',
  sweetalert  : 'https://cdn.jsdelivr.net/npm/sweetalert2@11',
  fontawesome : 'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
  repo        : 'https://raw.githubusercontent.com/9r3i/helper.js/master/',
  fonts       : 'https://raw.githubusercontent.com/9r3i/helper.js/master/',
  lastReport  : 'http://127.0.0.1:9303/dev/report/report.latest.txt',
};

/* user information */
this.user=null;
this.eva=null;
this.dialogPage=null;
this.IMAGES={
  'loader.gif':'',
  'nophoto.png':'',
  'logo.png':'',
  'icon-plus.png':'',
  'icon-error.png':'',
};

/* apps -- name detail on divisions */
this.apps=[
  'unspecified',
  'account',
  'admin',
];
/* aliases */
this.appbaseName='Helper';
this.aliases={};
this.positions={
  admin:'Admin',
};
this.divisions={
  unspecified:'Unspecified',
  admin:'HRD',
  account:'Profile',
};



/* initialize as contructor */
this.init=function(){
  /* initialize eva */
  let eva_default_config={
    host:this.production?this.hosts.eva:this.hosts.eva_dev,
    apiVersion:'__EVA_VERSION__',
    token:'__PUBLIC_TOKEN__',
  },
  eva_config=localStorage.getItem('eva_config');
  /* load sweetalert */
  this.loadScriptURL(this.hosts.sweetalert);
  /* return the object */
  return this;
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
this.basicUI=function(htext='Helper'){
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
  header.dataset.version='v'+this.version+(this.production?'':'-dev');
  mbutton.classList.add('menu-button');
  mbutton.id='menu-button';
  mb1.classList.add('menu-button-strip');
  mb2.classList.add('menu-button-strip');
  mb3.classList.add('menu-button-strip');
  menu.classList.add('menu');
  menu.id='menu';
  mheader.classList.add('menu-header');
  mheader.id='menu-header';
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
  this.userData(false);
  this.user=null;
  this.loader();
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
    confirmButtonColor:'#303030',
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
    confirmButtonColor:'#303030',
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
    confirmButtonColor:'#303030',
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
  /* document */
  let res=await this.isDocumentReady();
  if(!res){return res;}
  /* circle progress */
  res=await this.isCircleProgressReady();
  if(!res){return res;}
  /* open circle progress */
  let cp=new CircleProgress;
  cp.open();
  /* sweet alert */
  res=await this.isSwalReady();
  if(!res){
    cp.close();
    return res;
  }
  /* cordova */
  res=await this.isCordovaReady();
  if(!res){
    cp.close();
    return res;
  }
  /* perform fake loader then close it */
  await this.fakeLoaderX(function(e){
    cp.loading(e);
  },0);
  cp.close();
  /* return the result */
  return res;
};
/* is cordova ready */
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
/* is swal ready */
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
/* is circle progress ready */
this.isCircleProgressReady=async function(){
  let res=false;
  for(let i of this.range(1,100)){
    if(typeof CircleProgress==='function'){
      res=true;
      break;
    }
    await this.sleep(10);
  }return res;
};
/* is document ready */
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
/* is browser app -- const HELPER_BROWSER_APP */
this.isBrowser=function(){
  if(typeof HELPER_BROWSER_APP==='boolean'
    &&HELPER_BROWSER_APP===true){
    return true;
  }return false;
};


/* ---------- ALIASES METHODS ---------- */
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
/* app name to app function -- require: appbaseName */
this.getAppClassName=function(name=''){
  let an=name.split(/[^a-z]+/ig),
  ar=[this.appbaseName];
  for(let d of an){
    ar.push(d.substring(0,1).toUpperCase());
    ar.push(d.substring(1).replace(/[^a-z]+/ig,''));
  }
  return ar.join('');
};


/* ---------- STAND-ALONE METHODS ---------- */
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
    var audio=new Audio();
    audio.preload="auto";
    audio.autoplay=true;
    audio.onerror=reject;
    audio.onplay=resolve;
    audio.src=window.hasOwnProperty('AUDIOS')&&AUDIOS.hasOwnProperty(url)?AUDIOS[url]:url;
  });
};
/* parse date and time -- indonesia */
this.parseDatetime=function(value,format='id-ID'){
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
this.parseDate=function(value,format='id-ID'){
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
this.parseNominal=function(nominal=0,format='id-ID',currency='IDR'){
  let money=new Intl.NumberFormat(format,{
    style:'currency',
    currency:currency,
    maximumFractionDigits:0,
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
/* load script by url */
this.loadScriptURL=function(url){
  let scr=document.createElement('script');
  scr.src=url;
  document.head.append(scr);
  return scr;
};
/* load style by url */
this.loadStyleURL=function(url){
  let scr=document.createElement('link');
  scr.href=url;
  src.rel='stylesheet';
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


