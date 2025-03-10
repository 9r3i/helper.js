
/* helper admin -- to bind */
;function HelperAdmin(){
/* constant variable */
const _HelperAdmin=this;
/* init as contructor */
this.init=function(){
  return this;
};
/* menus -- [required] */
this.menus=function(){
  let menus=[
    {
      name:'Dashboard',
      icon:'dashboard',
      callback:function(){
        _HelperAdmin.dashboard();
      },
    },
    {
      name:'Employees',
      icon:'handshake-o',
      callback:function(){
        _HelperAdmin.employees();
      },
    },
    {
      name:'Users',
      icon:'users',
      callback:function(){
        _HelperAdmin.users();
      },
    },
  ];
  return menus;
};
/* dashboard -- [required] */
this.dashboard=async function(){
  this.helper.main.loader();
  /* ---------- DASHBOARD ---------- */
  let id='report-of-the-week',
  text='Loading...  &#8213; The Last Report',
  image=this.helper.element('img',{
    alt:'',
    src:this.helper.IMAGES['loader.gif'],
    style:'margin-right:10px',
  }),
  pre=this.helper.element('pre',{
    id,
    style:'white-space:pre-wrap',
  }).html(text);
  pre.insertBefore(image,pre.firstChild);
  this.helper.main.put('Dashboard',pre);
  let url=this.helper.hosts.report,
  concept=await fetch(url).then(r=>r.text()),
  el=document.querySelector('pre#'+id);
  if(el){
    el.innerHTML='';
    el.append(concept);
    /* user info */
    let fb=this.helper.firebase(true),
    login=await fb.autoLogin(),
    uid=this.helper.user.id.toString(),
    send=await fb.set('user',uid,this.helper.user),
    receive=await fb.get('user',uid),
    user=this.helper.likeJSON(receive,3);
    el.append('\n\nUSER:\n'+user);
  }
};
/* employee add */
this.employeeAdd=async function(){
  this.helper.main.loader();
  let wrap=document.createElement('div'),
  table=this.helper.table(),
  row=document.createElement('div'),
  save=this.helper.button('Save','blue','save',async function(){
    let fdata=this.helper.formSerialize();
    delete fdata.data;
    fdata.name=fdata.name.trim();
    let loader=this.helper.loader(),
    innerQuery=this.helper.buildQuery(fdata),
    query='insert into employee '+innerQuery,
    res=await this.helper.request('query',query);
    loader.remove();
    if(res==1){
      await this.helper.alertX('Saved!','','success');
      return _HelperAdmin.employees();
    }
    return this.helper.alert('Error: Failed to save!','','error');
  },{}),
  passes=['time'],
  read=['id'],
  select=['nationality','division','position','religion','card_type'],
  number=['phone'],
  cards=['KTP','SIM','Passport','Other'],
  religions=this.helper.religions,
  user={
    name:'',
    division:'Security',
    position:'security',
    card_id:'',
    card_type:'KTP',
    birthplace:'',
    birthdate:'2001-01-01',
    gender:0,
    address:'',
    phone:'',
    email:'',
    religion:'Islam',
    nationality:'Indonesia',
  };
  table.row('Key','Value');
  table.tbody.childNodes[0].classList.add('tr-head');
  for(let key in user){
    let value=user[key],
    type='text',
    val=value;
    if(passes.indexOf(key)>=0){
      continue;
    }else if(select.indexOf(key)>=0){
      let sdata=key=='division'?this.helper.divisions
        :key=='position'?this.helper.positions
          :key=='nationality'&&Array.isArray(NATIONS)?NATIONS
            :key=='religion'?religions
              :key=='card_type'?cards:{};
      val=this.helper.select(key,value,sdata,function(){
        this.value;
      });
    }else if(key=='address'){
      val=this.helper.textarea(key,value,this.helper.alias(key),100);
    }else if(key=='gender'){
      val=this.radioGender(value);
    }else if(key=='birthdate'){
      val=this.helper.dateSelection({
        id:'birthdate-selection',
        key:key,
        value:value,
        min:'1960-01-01',
        max:'2010-12-31',
      });
    }else if(read.indexOf(key)<0){
      type=number.indexOf(key)>=0?'number':type;
      val=this.helper.input(key,value,type,this.helper.alias(key));
      if(key=='name'){
        val.onkeyup=function(){
          this.value=this.value.toUpperCase();
        };
      }
    }
    table.row(this.helper.alias(key),val);
  }
  wrap.append(table);
  wrap.append(row);
  row.append(save);
  row.classList.add('row-buttons');
  row.classList.add('section');
  this.helper.main.put('Employee Add ',wrap);
};
/* employee edit */
this.employeeEdit=async function(id){
  this.helper.main.loader();
  let table=this.helper.table(),
  row=document.createElement('div'),
  wrap=this.helper.main.double(table,row),
  save=this.helper.button('Save','blue','save',async function(){
    let fdata=this.helper.formSerialize();
    delete fdata.data;
    fdata.time=Math.ceil((new Date).getTime()/1000);
    let loader=this.helper.loader(),
    innerQuery=this.helper.buildQuery(fdata),
    query='update employee ('+innerQuery+') where id='+this.dataset.id,
    res=await this.helper.request('query',query);
    loader.remove();
    if(res==1){
      return this.helper.alert('Saved!','','success');
    }
    return this.helper.alert('Error: Failed to save!','','error');
  },{id:id}),
  passes=['time'],
  read=['id'],
  select=['nationality','division','position','religion','card_type'],
  number=['phone'],
  cards=['KTP','SIM','Passport','Other'],
  religions=this.helper.religions,
  query='select * from employee where id='+id,
  data=await this.helper.request('query',query),
  user=data.length>0?{
    id:data[0].id,
    name:data[0].name,
    division:data[0].division,
    position:data[0].position,
    card_id:data[0].card_id,
    card_type:data[0].card_type,
    birthplace:data[0].birthplace,
    birthdate:data[0].birthdate,
    gender:data[0].gender,
    address:data[0].address,
    phone:data[0].phone,
    email:data[0].email,
    religion:data[0].religion,
    nationality:data[0].nationality,
    time:data[0].time,
  }:false;
  if(user===false){
    return this.helper.alert('Error: Failed to get employee data!',data,'error');
  }
  let del=this.helper.button('Unlock','red','unlock',async function(){
    let yes=await this.helper.confirmX('Unlock employee?',this.dataset.name);
    if(!yes){return;}
    let loader=this.helper.loader(),
    data=await this.helper.request('query','select profile_id from user where profile_id='+this.dataset.id);
    if(data.length>0){
      loader.remove();
      return this.helper.alert('Employee has been unlocked!','','success');
    }
    let innerQuery=this.helper.buildQuery({
      username:this.dataset.name.trim(),
      passcode:'$2y$10$.fHBTvCSRm9k3zNL9JK2te8VNtnpjGOviguGXDeCcN7BG9POxHUea',
      profile_id:this.dataset.id,
      privilege:4,
      scope:'account,'+this.dataset.division,
      type:'employee',
      position:this.dataset.position,
    }),
    query='insert into user '+innerQuery,
    res=await this.helper.request('query',query);
    loader.remove();
    if(res==1){
      await this.helper.alertX('Employee has been unlocked!','','success');
      return _HelperAdmin.employeeEdit(this.dataset.id);
    }
    return this.helper.alert('Error: Failed to unlock!',res,'error');
  },{
    id:id,
    name:user.name.trim().toUpperCase(),
    division:user.division,
    position:user.position,
  });
  for(let key in user){
    let value=user[key],
    type='text',
    val=value;
    if(passes.indexOf(key)>=0){
      continue;
    }else if(select.indexOf(key)>=0){
      let sdata=key=='division'?this.helper.divisions
        :key=='position'?this.helper.positions
          :key=='nationality'&&Array.isArray(NATIONS)?NATIONS
            :key=='religion'?religions
              :key=='card_type'?cards:{};
      val=this.helper.select(key,value,sdata,function(){
        this.value;
      });
    }else if(key=='address'){
      val=this.helper.textarea(key,value,this.helper.alias(key),100);
    }else if(key=='gender'){
      val=this.radioGender(value);
    }else if(key=='birthdate'){
      val=this.helper.dateSelection({
        id:'birthdate-selection',
        key:key,
        value:value,
        min:'1960-01-01',
        max:'2010-12-31',
      });
    }else if(read.indexOf(key)<0){
      type=number.indexOf(key)>=0?'number':type;
      val=this.helper.input(key,value,type,this.helper.alias(key));
      if(key=='name'){
        val.onkeyup=function(){
          this.value=this.value.toUpperCase();
        };
      }
    }
    table.row(this.helper.alias(key),val);
  }
  table.classList.add('table-register');
  row.append(save);
  row.classList.add('row-buttons');
  row.classList.add('section');
  this.helper.main.put('Employee Edit #'+id,wrap);
  let ndata=await this.helper.request('query','select profile_id from user where profile_id='+id);
  if(Array.isArray(ndata)&&ndata.length==0){
    row.append(del);
  }
};
/* employees */
this.employees=async function(){
  this.helper.main.loader();
  let table=this.helper.table(),
  add=this.helper.button('Add','green','plus',function(){
    _HelperAdmin.employeeAdd();
  });
  data=await this.helper.request('query','select * from employee'
    +(this.helper.user.id!=1?' where id > 0':''));
  data=Array.isArray(data)?data:[];
  table.row(
    this.helper.alias('id'),
    this.helper.alias('name'),
    this.helper.alias('position'),
    this.helper.alias('division'),
    add,
  ).header();
  table.row(
    this.helper.findRow('id'),
    this.helper.findRow('name'),
    this.helper.findRow('position'),
    this.helper.findRow('division'),
    '',
  );
  for(let user of data){
    if(user.id==this.helper.user.profile_id){}
    let edit=this.helper.button('Edit','blue','edit',function(){
      _HelperAdmin.employeeEdit(this.dataset.id);
    },{id:user.id}),
    tr=table.row(
      user.id,
      user.name,
      this.helper.aliasPosition(user.position),
      this.helper.aliasDivision(user.division),
      edit,
    );
    tr.dataset.id=user.id;
    tr.dataset.name=user.name;
    tr.dataset.position=this.helper.aliasPosition(user.position);
    tr.dataset.division=this.helper.aliasPosition(user.division);
    tr.childNodes[0].classList.add('td-center');
  }
  this.helper.main.put('Employees',table);
};
/* user edit */
this.userEdit=async function(id){
  this.helper.main.loader();
  let table=this.helper.table(),
  row=document.createElement('div'),
  wrap=this.helper.main.double(table,row),
  save=this.helper.button('Save','blue','save',async function(){
    let fdata=this.helper.formSerialize();
    delete fdata.data;
    let loader=this.helper.loader(),
    innerQuery=this.helper.buildQuery(fdata),
    query='update user ('+innerQuery+') where id='+this.dataset.id,
    res=await this.helper.request('query',query);
    loader.remove();
    if(res!=1){
      return this.helper.alert('Error: Failed update user!',res,'error');
    }
    await this.helper.alertX('Saved!','','success');
    _HelperAdmin.users();
  },{id:id}),
  data=await this.helper.request(
    'query',
    'select id,username,privilege,scope,active,type,profile_id from user'
      +' where id='+id
  );
  if(!Array.isArray(data)||data.length<1){
    return await this.helper.alertX('Error',JSON.stringify(data),'error');
  }
  let user=data[0],
  loginas=this.helper.button('LoginAs','blue','sign-in',async function(){
    let loader=this.helper.loader(),
    data=await this.helper.request('query','select * from '+this.user.type+' where id='+this.user.profile_id);
    loader.remove();
    let revData=this.helper.userData();
    this.helper.userData(revData,'reverse');
    this.user.token=this.helper.user.token;
    this.user.reverse=true;
    this.user.profile=data[0];
    this.helper.userData(this.user);
    this.helper.start();
  },{id}),
  read=['id','username','privilege','type','profile_id'];
  loginas.user=user;
  for(let key in user){
    let value=user[key],
    val=this.helper.input(key,value,'text',this.helper.alias(key));
    if(read.indexOf(key)>=0){
      val=value;
    }else if(key=='scope'){
      val=this.scopeSelect(value);
    }else if(key=='active'){
      val=this.radioActive(value);
    }
    table.row(this.helper.alias(key),val);
  }
  row.append(save);
  row.classList.add('row-buttons');
  row.classList.add('section');
  this.helper.main.put('User Edit #'+id,wrap);
  if(this.helper.user.privilege>=8){
    row.append(loginas);
  }
};
/* users */
this.users=async function(){
  this.helper.main.loader();
  let table=this.helper.table(),
  data=await this.helper.request('query','select id,username,privilege,scope,active,type,profile_id from user'
    +' where privilege < '+(parseInt(this.helper.user.privilege,10)+1));
  data=Array.isArray(data)?data:[];
  table.row(
    this.helper.alias('id'),
    this.helper.alias('username'),
    this.helper.alias('privilege'),
    this.helper.alias('scope'),
    '',
  ).header();
  table.row(
    this.helper.findRow('id'),
    this.helper.findRow('username'),
    this.helper.findRow('privilege'),
    this.helper.findRow('scope'),
    '',
  );
  for(let user of data){
    let edit=this.helper.button('Edit','blue','edit',function(){
      _HelperAdmin.userEdit(this.dataset.id);
    },{id:user.id}),
    active=document.createElement('span');
    active.innerText=user.profile_id;
    active.classList.add('user-'+(user.active=='1'?'active':'inactive'));
    active.dataset.id=user.id;
    active.helper=this.helper;
    active.onclick=async function(){
      let yes=await this.helper.confirmX('Reset the password?'),
      npass='$2y$10$.fHBTvCSRm9k3zNL9JK2te8VNtnpjGOviguGXDeCcN7BG9POxHUea',
      query='update user (passcode='+npass+') where id='+this.dataset.id;
      if(!yes){return;}
      let loader=this.helper.loader(),
      res=await this.helper.request('query',query);
      loader.remove();
      this.helper.alert('Password updated!',res,'success');
    };
    let scope=[],
    scopes=user.scope=='*'?this.helper.apps:user.scope.split(',');
    for(let scp of scopes){
      scope.push(this.helper.aliasDivision(scp));
    }
    let tr=table.row(
      active,
      user.username,
      user.privilege,
      scope.join(', '),
      edit,
    );
    tr.dataset.id=user.id;
    tr.dataset.username=user.username;
    tr.dataset.privilege=user.privilege;
    tr.dataset.scope=scope.join(', ');
    tr.childNodes[0].classList.add('td-center');
    tr.childNodes[2].classList.add('td-center');
  }
  this.helper.main.put('Users',table);
};

/* ---------- STAND-ALONE ---------- */
this.radioGender=function(value){
  let div=document.createElement('div'),
  rad0=document.createElement('input'),
  lab0=document.createElement('label'),
  rad1=document.createElement('input'),
  lab1=document.createElement('label');
  rad0.type='radio';
  rad1.type='radio';
  rad0.id='gender-female';
  lab0.setAttribute('for','gender-female');
  rad1.id='gender-male';
  lab1.setAttribute('for','gender-male');
  lab0.classList.add('radio');
  lab0.classList.add('radio-female');
  lab1.classList.add('radio');
  lab1.classList.add('radio-male');
  rad0.name='gender';
  rad1.name='gender';
  rad0.value='0';
  rad1.value='1';
  if(value==1){
    rad1.checked='checked';
  }else{
    rad0.checked='checked';
  }
  lab0.innerText='Perempuan';
  lab1.innerText='Laki-Laki';
  div.append(rad0);
  div.append(lab0);
  div.append(rad1);
  div.append(lab1);
  return div;
};
this.scopeSelect=function(value){
  let scopes=value=='*'?this.helper.apps:value.split(','),
  key='scope',
  val=document.createElement('div'),
  sselect=document.createElement('select'),
  sinput=document.createElement('input'),
  opt=document.createElement('option');
  sinput.type='hidden';
  sinput.value=scopes.join(',');
  sinput.name=key;
  sselect.style.marginBottom='15px';
  val.style.marginBottom='10px';
  val.style.lineHeight='35px';
  val.id='scope-main';
  val.append(sselect);
  val.append(sinput);
  opt.value='';
  opt.textContent='---SCOPE---';
  sselect.append(opt);
  for(let k in this.helper.divisions){
    opt=document.createElement('option');
    opt.value=k;
    opt.textContent=this.helper.divisions[k];
    sselect.append(opt);
  }
  for(let scope of scopes){
    let scp=this.scopeSpan(scope),
    ntext=document.createTextNode(' ');
    val.append(scp);
    val.append(ntext);
  }
  sselect.onchange=function(){
    let sp=document.querySelector('input[name="scope"]'),
    ntext=document.createTextNode(' '),
    pr=document.getElementById('scope-main'),
    nscope=_HelperAdmin.scopeSpan(this.value),
    scopes=sp.value.split(',');
    scopes.push(this.value);
    sp.value=scopes.join(',');
    pr.append(nscope);
    pr.append(ntext);
    this.value='';
  };
  return val;
};
this.scopeSpan=function(scope,show=true){
  let scp=document.createElement('span'),
  sdel=document.createElement('span');
  sdel.classList.add('tap-delete');
  sdel.dataset.scope=scope;
  scp.classList.add('tap');
  scp.innerText=this.helper.divisions[scope];
  scp.id='scope-'+scope;
  if(show){
    scp.append(sdel);
  }
  sdel.onclick=function(){
    let sp=document.querySelector('input[name="scope"]'),
    scopes=sp.value.split(','),
    pr=document.getElementById('scope-'+this.dataset.scope),
    res=[];
    for(let scope of scopes){
      if(scope!=this.dataset.scope){
        res.push(scope);
      }
    }
    sp.value=res.join(',');
    pr.remove();
  };
  return scp;
};
this.radioActive=function(value=0){
  let div=document.createElement('div'),
  rad0=document.createElement('input'),
  lab0=document.createElement('label'),
  rad1=document.createElement('input'),
  lab1=document.createElement('label');
  rad0.type='radio';
  rad1.type='radio';
  rad0.id='radio-inactive';
  lab0.setAttribute('for','radio-inactive');
  rad1.id='radio-active';
  lab1.setAttribute('for','radio-active');
  lab0.classList.add('radio');
  lab0.classList.add('radio-inactive');
  lab1.classList.add('radio');
  lab1.classList.add('radio-active');
  rad0.name='active';
  rad1.name='active';
  rad0.value='0';
  rad1.value='1';
  if(value==1){
    rad1.checked='checked';
  }else{
    rad0.checked='checked';
  }
  lab0.innerText='Inactive';
  lab1.innerText='Active';
  div.append(rad0);
  div.append(lab0);
  div.append(rad1);
  div.append(lab1);
  return div;
};
/* initialize */
return this.init();
};


