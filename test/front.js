

/* header */
let h1=document.createElement('h1');
h1.innerText='This is a front page';
document.body.append(h1);


/* start helper */
let helper=getHelper();
if(helper){
  /* login button */
  document.body.append(
    helper.button('Login','blue','sign-in',function(){
      window.parent.appPage();
    })
  );
  
  helper.element('p')
    .text(`Helper version ${helper.version}`)
    .appendTo(document.body);
  helper.element('pre')
    .text(helper.__uniqid)
    .appendTo(document.body);
  helper.element('pre')
    .text(helper.likeJSON(helper,3))
    .appendTo(document.body);
  
}

/* get helper */
function getHelper(){
  let keys=Object.keys(window.parent),
  uniqid=null;
  for(let key of keys){
    if(key.match(/^__helper/)){
      uniqid=key;
      break;
    }
  }
  let helper=window.parent[uniqid];
  helper.__uniqid=uniqid;
  return helper;
}


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

