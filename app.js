/* app template for helper
 * require: Helper
 */
;function App(config){
/* version */
this.version='1.1.2';
/* production */
this.production=false;
/* configuration */
this.configuration=typeof config==='object'&&config!==null?config:{};
/* constructor */
this.init=function(){
  /* error report for non-production */
  if(!this.production){
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
  }
  /* default content */
  this.content=this.defaultContent(
    this.config('logo'),
    this.config('css'),
  );
  /* start the app */
  if(this.config('autoStart')){
    this.start();
  }
  /* return as this object */
  return this;
};
/* start the app */
this.start=async function(){
  /* load helper library */
  let url=this.config('localHelper')
    ?'../helper.js'
    :'https://cdn.jsdelivr.net/npm/@9r3i/helper@'
      +this.config('helperVersion'),
  help=document.createElement('script');
  help.textContent=await fetch(url).then(r=>r.text());
  document.head.append(help);
  /* load configuration */
  let cfile=this.config('configFile'),
  config=await fetch(cfile).then(r=>r.json());
  config.appVersion=config.appBaseName+' v'+config.appVersion
    +(!this.production?'-dev':'');
  this.configuration={...config,...this.configuration};
  if(this.config('localHelper')){
    config.libraryHost='../';
  }
  /* start helper */
  let helper=new Helper(config);
  helper.production=this.config('helperProduction')?true:false;
  this.helper=helper;
  helper.loadProgress=this.content.progress;
  await helper.sleep(500);
  /* check for cordova */
  window.CORDOVA_LOADED=false;
  if(window.cordova!==undefined){
    document.addEventListener('deviceready',async function(e){
      window.CORDOVA_LOADED=true;
      /* start the app */
      await helper.start(!helper.production);
    },false);
  }else{
    /* start the app */
    await helper.start(!helper.production);
  }
};
/* default body content */
this.defaultContent=function(logo='',css=''){
  document.head.innerHTML='';
  document.body.innerHTML='';
  document.body.style.margin='0px';
  let div=document.createElement('div'),
  h1=document.createElement('h4'),
  progress=document.createElement('progress'),
  br=document.createElement('br'),
  br2=document.createElement('br'),
  fa=document.createElement('i'),
  img=document.createElement('img'),
  text=document.createTextNode(' Loading...'),
  link=document.createElement('link');
  link.href=css;
  link.rel='stylesheet';
  document.head.append(link);
  div.setAttribute(
    'style',
    'display:flex;align-items:center;justify-content:center;'
      +'height:100vh;width:100vw;'
      +'background-size:cover;background-position:center;'
      +'background-color:#ffffff;'
  );
  img.src=logo;
  img.style.width='100px';
  img.style.filter='drop-shadow(3px 3px 9px #555)';
  fa.classList.add('fa');
  fa.classList.add('fa-spinner');
  fa.classList.add('fa-pulse');
  h1.append(img);
  h1.append(br);
  h1.append(fa);
  h1.append(text);
  h1.append(br2);
  h1.append(progress);
  h1.style.textAlign='center';
  h1.style.textShadow='0px 0px 9px #555';
  h1.style.color='#eee';
  h1.style.filter='drop-shadow(3px 3px 9px #333)';
  div.append(h1);
  document.body.append(div);
  /* return object */
  return {
    main:div,
    text,
    progress,
  };
};
/* configuration */
this.config=function(key=''){
  return this.configuration.hasOwnProperty(key)
    ?this.configuration[key]:null;
};
/* initialize aa constructor */
return this.init();
};


