/* initializing sample */
;async function helper_start(){
  let app=new Helper;
  if(!app.production){
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
  /* check for cordova */
  let appDirect=app.production?false:true;
  window.CORDOVA_LOADED=false;
  if(window.cordova!==undefined){
    document.addEventListener('deviceready',async function(e){
      window.CORDOVA_LOADED=true;
      await app.start(appDirect);
    },false);
  }else{
    await app.start(appDirect);
  }
};



/**
 * helper.js
 * ~ for any js jelper
 * ~ cloned from hotel.js
 * autored by 9r3i (https://github.com/9r3i)
 * started at February 22nd 2025
 */
;function Helper(){
/* set to true before compile to appbase */
this.production=false;
/* the version code */
Object.defineProperty(this,'versionCode',{
  value:102,
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
this.dialog=null;
this.IMAGES=IMAGES||{};
this.main=null;
this.rooms=null;
this.roomStatusInfo=null;
this.apps=[
  'unspecified',
  'account',
  'front_office',
  'food_baverage',
  'engineering',
  'security',
  'marketing',
  'housekeeping',
  'purchasing',
  'accounting',
  'admin',
];
this.paymentMethods={
  cash:'Cash',
  wire_mandiri:'Transfer Mandiri',
  wire_bca:'Transfer BRI',
  card_mandiri:'Mandiri Debt/Credit',
  card_bca:'BRI Debt/Credit',
  petty_cash:'Petty Cash',
  account_receivable:'Account Receivable',
  qris_mandiri:'QRIS Mandiri',
  qris_bca:'QRIS BRI',
};

/* aliases */
this.appbaseName='Helper';
this.aliases={
  app_vendor:'Hotel Bandara Syariah',
  id:'ID',
  name:'Nama Lengkap',
  position:'Jabatan',
  division:'Divisi',
  card_id:'Nomor KTP/SIM',
  card_type:'Jenis ID',
  address:'Alamat Lengkap',
  birthdate:'Tanggal Lahir',
  birthplace:'Tempat Lahir',
  gender:'Jenis Kelamin',
  phone:'Nomor HP',
  email:'Email',
  religion:'Agama',
  nationality:'Kewarganegaraan',
  username:'Username',
  privilege:'Level Keamanan',
  scope:'Cakupan Akses',
  profile_id:'Profile ID',
  active:'Aktif',
  type:'Jenis',
  /* request order */
  ro_number:'No',
  ro_item_id:'Nama Item',
  ro_price:'Harga',
  ro_count:'Jumlah',
  ro_unit:'Satuan',
  ro_subtotal:'Subtotal',
  ro_estimate:'Estimasi',
  ro_note:'Catatan',
  ro_status:'Status',
  /* purchase order */
  po_uid:'Operator',
  po_estimate:'Estimasi Harga',
  po_status:'Status',
  po_note:'Catatan',
  /* suppliers */
  company_name:'Nama Perusahaan',
  contact_name:'Nama Kontak',
  contact_phone:'Nomor Kontak',
  bank_account:'Nomor Rekening',
  bank_name:'Nama Bank',
  supplier_name:'Nama Supllier',
  supplier_cost:'Harga Supplier',
  /* payment methods */
  cash:'Cash',
  wire_mandiri:'Transfer Mandiri',
  wire_bca:'Transfer BCA',
  card_mandiri:'Mandiri Debt/Credit',
  card_bca:'BCA Debt/Credit',
  petty_cash:'Petty Cash',
  account_receivable:'Account Receivable',
  /* market segment */
  publish_rate:'Publish Rate',
  personal:'Personal',
  /* coa */
  coa_code:'Account Code',
  coa_name:'Account Name',
  coa_variable:'Account Variable',
  coa_category:'Account Category',
  /* item */
  item_id:'ID Barang',
  item_name:'Nama Barang',
  item_mark:'Merek',
  item_unit:'Satuan',
  item_count:'Jumlah',
  item_price:'Harga Barang',
  item_type:'Jenis Barang',
  item_sub_total:'Sub Total',
  item_stock:'Stok Barang',
  item_stock_min:'Stok Minimal',
  item_stock_max:'Stok Maksimal',
  category:'Kategori',
  selling_price:'Harga Jual',
  purchase_price:'Harga Beli',
  stock:'Stok',
  stock_min:'Stok Minimun',
  stock_max:'Stok Maksimum',
  group:'Kelompok',
  last_update:'Update Terakhir',
  date_request:'Tanggal Permintaan',
  price_estimation:'Estimasi Harga',
  operator:'Operator',
  status:'Status',
  note:'Catatan',
  total:'Total',
  fax:'Fax',
  /* payment */
  payment_method:'Metode Pembayaran',
  payment_bearer:'Pengemban Dana',
  payment_nominal:'Nominal Pembayaran',
  payment_paid:'Nominal Yang Dibayar',
  payment_time:'Waktu Pembayaran',
  payment_cashback:'Kembalian Pembayaran',
  cashback:'Kembalian',
  /* guest */
  guest_id:'ID Tamu',
  guest_name:'Nama Tamu',
  guest_card_type:'Jenis Kartu',
  guest_card_id:'No Kartu',
  guest_address:'Alamat',
  guest_phone:'Phone',
  guest_email:'Email',
  guest_nationality:'Kewarganegaraan',
  guest_greet:'Panggilan',
  guest_guest_type:'Jenis Tamu',
  checkin_date:'Tanggal Checkin',
  /* transaction */
  transaction_date:'Tanggal Transaksi',
  transaction_type:'Jenis Transaksi',
  transaction_amount:'Jumlah Transaksi',
  transaction_deposit:'Deposit',
  transaction_credit:'Kedit',
  transaction_debt:'Debit',
  transaction_balance:'Balance',
  /* menu */
  menu_id:'ID Menu',
  menu_name:'Nama Menu',
  menu_category:'Kategori',
  menu_type:'Jenis',
  menu_price:'Harga',
  menu_unit:'Satuan',
  menu_count:'Jumlah',
  menu_subtotal:'Subtotal',
  /* room service */
  male:'Laki-laki',
  female:'Perempuan',
  child:'Anak-anak',
  head_count:'Jumlah Kepala',
  estimate_pack:'Estimasi Pack',
  service_time:'Waktu Layanan',
  total_bill:'Total Tagihan',
  regid:'RegID',
  room_number:'Nomor Kamar',
  /* room */
  room_code:'Kode Kamar',
  room_name:'Nama Kamar',
  room_type:'Type Kamar',
  room_floor:'Lantai',
  room_normal_rate:'Normal Rate',
  /* table restaurant */
  table_number:'Nomor Meja',
  table_name:'Nama Pelanggan',
  table_total:'Total Tagihan',
  table_servant:'Pelayanan',
  table_time:'Waktu',
  /* market */
  market_id:'ID',
  market_category:'Kategori',
  market_segment:'Segmen Pasar',
  market_name:'Nama Perusahaan',
  market_telp:'Telepon',
  market_address:'Alamat',
  market_email:'Email',
  market_price:'Potongan Harga',
  /* category */
  regular:'Regular',
  corporate:'Corporate',
  government:'Government',
  airlines:'Airlines',
  travel_agent:'Travel Agent',
  /* accounting general ledger */
  date:'Tanggal',
  information:'Keterangan',
  ref:'Ref',
  credit:'Kredit',
  debt:'Debit',
  deposit:'Deposit',
  balance:'Balance',
  account_name:'Nama Akun',
  account_number:'Nomor Akun',
  /* accounting asset */
  asset_id:'ID',
  asset_name:'Nama Aset',
  asset_nominal:'Harga Aset',
  asset_coa_id:'Nama Akun',
  asset_note:'Catatan',
  asset_year:'Tahun',
  /* accounting adjustment */
  adjustment_regid:'RegID',
  adjustment_id:'ID',
  adjustment_year:'Tahun',
  adjustment_month:'Bulan',
  adjustment_date:'Tanggal',
  adjustment_flow:'Arus Dana',
  adjustment_coa_id:'Nama Akun',
  adjustment_item_id:'Nama Item',
  adjustment_amount:'Amount',
  adjustment_deposit:'Deposit',
  adjustment_balance:'Saldo',
  adjustment_credit:'Kredit',
  adjustment_debt:'Debit',
  adjustment_name:'Nama Transaksi',
  adjustment_note:'Keterangan',
  adjustment_status:'Status',
};
this.positions={
  internship:'Internship',
  trainee:'Trainee',
  casual:'Casual',
  security:'Security',
  gardener:'Gardener',
  chef:'Chef',
  engineering:'Engineering',
  food_baverage_service:'F&B Service',
  front_office_attendant:'Front Office Attendant',
  room_attendant:'Room Attendant',
  executive_chef:'Executive Chef',
  sales_executive:'Sales Executive',
  chief_purchasing:'Chief Purchasing',
  chief_accounting:'Chief Accounting',
  general_manager:'General Manager',
  admin:'Admin',
};
this.divisions={
  unspecified:'Unspecified',
  front_office:'Front Office',
  food_baverage:'Food and Beverage',
  engineering:'Engineering',
  security:'Security',
  marketing:'Marketing',
  housekeeping:'Housekeeping',
  purchasing:'Purchasing',
  accounting:'Accounting',
  admin:'HRD',
  account:'Profile',
};

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
  'Irreligion',
  'Other'
];
this.months=[
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
/**
 * transaction type pointing to table_name of database
 * this might be the same procedur for regid table
 */
this.transactionTypes={
  0:'',
  1:'purchase_order',
  2:'registration',
  3:'extrabill_cart',
  4:'request_order',
  5:'payment',
  6:'room_service',
  7:'restaurant',
  8:'payment_resto',
  9:'adjustment',
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
  this.eva=new eva(eva_config||eva_default_config);
  /* load sweetalert */
  this.loadScriptURL(this.hosts.sweetalert);
  /* put the object to global scope */
  window._Helper=this;
  /* return the object */
  return this;
};
/* start the app */
this.start=async function(app){
  /* check everything is ready */
  let isReady=await this.isEverythingReady();
  if(!isReady){return alert('Error: Something is not ready!');}
  /* statusbar */
  this.statusBar('#7c1111');
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
  /* clear body element */
  document.body.innerHTML='';
  /* prepare print style */
  if(typeof ABL_OBJECT==='object'&&ABL_OBJECT!==null&&!Array.isArray(ABL_OBJECT)){
    for(let style of ABL_OBJECT.data.style){
      let elStyle=document.createElement('style');
      elStyle.media='print,screen';
      elStyle.rel='stylesheet';
      elStyle.textContent=style;
      document.head.append(elStyle);
    }
  }else{
    let link=document.createElement('link');
    link.type='text/css';
    link.rel='stylesheet';
    link.href='css/helper'+(this.production?'.min':'')+'.css';
    document.head.append(link);
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
  /* update page */
  this.updatePage();
  /* login page */
  if(!this.isLogin()){
    window.appPage=function(){
      _Helper.start(true);
    };
    this.statusBar('#7c1111');
    let main=app?this.loginPage():this.mainPage();
    document.body.append(main);
    return false;
  }
  /* load basic ui */
  this.main=this.basicUI(this.alias('app_vendor'));
  document.body.append(this.main);
  /* movable menu */
  this.menuMovable();
  /* set division header */
  let division=typeof app==='string'?app:this.user.profile.division,
  headerText=this.divisions.hasOwnProperty(division)?this.divisions[division]:division;
  this.main.bodyHeader.innerText=headerText;
  this.main.bodyHeader.dataset.scope=JSON.stringify(this.user.scope);
  this.main.bodyHeader.dataset.app=division;
  this.main.bodyHeader.dataset.text=headerText;
  this.main.bodyHeader.dataset.open='0';
  this.main.bodyHeader.dataset.width=this.main.bodyHeader.offsetWidth+'px';
  this.main.bodyHeader.style.width=this.main.bodyHeader.offsetWidth+'px';
  this.main.bodyHeader.onclick=async function(){
    if(this.dataset.open=='1'){return;}
    this.dataset.open='1';
    this.style.width='200px';
    if(_Helper.user.scope.length<3){
      await _Helper.sleep(500);
      this.style.width=this.dataset.width;
      this.dataset.open='0';
      return;
    }
    let divisions=_Helper.divisions,
    scope=_Helper.parseJSON(this.dataset.scope),
    apps={};
    for(let i of scope){
      if(i=='account'){continue;}
      apps[i]=divisions[i];
    }
    let sel=_Helper.select('app',this.dataset.app,apps,e=>{
      _Helper.start(sel.value);
    });
    this.innerHTML='';
    this.append(sel);
    sel.focus();
    sel.onblur=async e=>{
      await _Helper.sleep(500);
      this.style.width=this.dataset.width;
      this.dataset.open='0';
      this.innerText=this.dataset.text;
    };
  };
  /* ---------- APPLICATION (per division) ---------- */
  let menus=[],
  appDiv=typeof app==='string'?app:this.user.profile.division,
  appClass=this.getAppClassName(appDiv);
  if(typeof window[appClass]==='function'&&this.apps.indexOf(appDiv)>=0){
    if(this.user.scope.indexOf(appDiv)>=0
      &&this.user.privilege>=4){
      let _AppObject=new window[appClass];
      menus=typeof _AppObject.menus==='function'?_AppObject.menus():[];
      if(typeof _AppObject.dashboard==='function'){
        _AppObject.dashboard();
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
      _Helper.menuHide();
      _Helper.accountPage();
    });
    this.main.addMenu('Logout','power-off',function(){
      _Helper.menuHide();
      _Helper.logout();
    },'#d33');
  }
  /* menu ui fix */
  window.addEventListener('resize',e=>{
    this.menuUIFix();
  },false);
  this.menuUIFix();
};


/* ---------- HELPER ---------- */
this.newRegID=async function(type=0){
  let queries=[
    'insert into regid uid='+this.user.id+'&type='+type,
    'select * from regid where uid='+this.user.id
      +' and type='+type+' order by id desc limit 1',
  ].join(';'),
  res=await this.request('queries',queries);
  return {
    insert:res[0],
    regid:res[1].length>0?res[1][0].id:0,
  };
};
/* room status table -- return: table element -- require: roomStatusSelector */
this.roomStatus=async function(codes=[]){
  codes=Array.isArray(codes)?codes:[];
  /* prepare query */
  let loaded=true,
  id='room-status-'+this.uniqid(),
  queries=['select * from room_status'];
  /* check loaded data */
  if(this.roomStatusInfo===null
    ||this.rooms===null){
    loaded=false;
    queries.push('select * from room');
    queries.push('select * from room_status_info');
  }
  /* execute queries */
  let data=await this.request('queries',queries.join(';')),
  status=data[0],
  floors={},
  statusInfo={},
  table=this.table();
  /* check loaded data */
  if(!loaded){
    loaded=true;
    this.rooms=data[1];
    this.roomStatusInfo=data[2];
  }
  /* set status info */
  for(let sinfo of this.roomStatusInfo){
    if(codes.indexOf(sinfo.code)>=0){
      statusInfo[parseInt(sinfo.code)]=sinfo.name;
    }
  }
  /* set floors */
  for(let room of this.rooms){
    if(!floors.hasOwnProperty(room.floor)){
      floors[room.floor]={
        total:0,
        rooms:[],
      };
    }
    floors[room.floor].total++;
    let scode=_Helper.getValueByKey('room_id',room.id,'code',status),
    stime=_Helper.getValueByKey('room_id',room.id,'update',status),
    sname=_Helper.getValueByKey('code',scode,'name',this.roomStatusInfo),
    sdetail=_Helper.getValueByKey('code',scode,'detail',this.roomStatusInfo),
    select=codes.indexOf(parseInt(scode))>=0
      ?_Helper.roomStatusSelector({
        id:id,
        code:scode,
        name:sname,
        statusInfo,
        room,
        table,
      })
      :_Helper.element('div').text(sname),
    span=_Helper.element('span',{
      'class':'front-room-span',
    },[
      select,
      _Helper.element('span').text(sdetail),
      _Helper.element('div').text(
        _Helper.parseDatetime(parseInt(stime)*1000)
      ),
    ]),
    nroom=_Helper.element('div',{
      'class':'front-room-status front-room-status-'+scode,
      title:'',
      id:id+'-'+room.id,
    },[
      _Helper.element('div',{
        'class':'front-room-inner',
      }).html(
        room.number+' &middot; '+room.code
          +'<br />'+sname
      ),
      span,
    ]);
    nroom.dataset.room_number=room.number+'';
    nroom.dataset.room_code=room.code+'';
    nroom.dataset.status_code=scode+'';
    floors[room.floor].rooms.push(nroom);
  }
  /* print out */
  for(let floor in floors){
    let fr=floors[floor];
    table.head('FLOOR #'+floor+' ('+fr.total+' rooms)',1);
    table.row(_Helper.element('div',{},fr.rooms));
  }
  /* set class and interval */
  table.classList.add('table-full');
  table.id=id;
  table.codes=codes;
  table.statusInfo=statusInfo;
  table.timer=false;
  table.interval=async function(sec=5){
    clearTimeout(this.timer);
    let _this=this,
    status=await _Helper.request('query','select * from room_status'),
    el=document.getElementById(this.id);
    if(!el){return this;}
    for(let st of status){
      let nroom=document.getElementById(this.id+'-'+st.room_id);
      if(!nroom||nroom.dataset.status_code==st.code){
        continue;
      }
      nroom.dataset.status_code=st.code+'';
      let scode=st.code,
      stime=st.update,
      sname=_Helper.getValueByKey('code',scode,'name',_Helper.roomStatusInfo),
      sdetail=_Helper.getValueByKey('code',scode,'detail',_Helper.roomStatusInfo),
      room=_Helper.getDataById(st.room_id,_Helper.rooms),
      sndiv=nroom.childNodes[0],
      select=nroom.childNodes[1].childNodes[0],
      span=nroom.childNodes[1].childNodes[1],
      spant=nroom.childNodes[1].childNodes[2];
      nroom.setAttribute('class','front-room-status front-room-status-'+scode);
      sndiv.innerHTML=nroom.dataset.room_number+' &middot; '+nroom.dataset.room_code+'<br />'+sname;
      span.innerText=sdetail;
      spant.innerText=_Helper.parseDatetime(stime*1000);
      if(this.codes.indexOf(parseInt(scode))>=0){
        if(select.tagName.toLowerCase()=='select'){
          select.dataset.value=scode;
          select.dataset.valueText=sname;
          select.value=scode;
        }else{
          nroom.childNodes[1].removeChild(select);
          select=_Helper.roomStatusSelector({
            id:this.id,
            code:scode,
            name:sname,
            statusInfo:this.statusInfo,
            room,
          });
          nroom.childNodes[1].insertBefore(select,span);
        }
      }else{
        if(select.tagName.toLowerCase()=='div'){
          select.innerText=sname;
        }else{
          nroom.childNodes[1].removeChild(select);
          select=_Helper.element('div').text(sname);
          nroom.childNodes[1].insertBefore(select,span);
        }
      }
    }
    this.timer=setTimeout(function(){
      if(!_Helper.user){return;}
      _this.interval(sec);
    },parseInt(sec,10)*0x3e8);
    return this;
  };
  /* return the table */
  return table;
};
/* room status selector -- return: select element */
this.roomStatusSelector=function(config){
  config=typeof config==='object'&&config!==null?config:{};
  let select=_Helper.select('room_status',config.code,config.statusInfo);
  select.dataset.value=config.code+'';
  select.dataset.valueText=config.name;
  select.dataset.id=config.id;
  select.room=config.room;
  select.table=config.table;
  select.addEventListener('change',async function(){
    clearTimeout(this.table.timer);
    let nroom=this.parentNode.parentNode,
    scode=this.value,
    sname=_Helper.getValueByKey('code',scode,'name',_Helper.roomStatusInfo),
    sdetail=_Helper.getValueByKey('code',scode,'detail',_Helper.roomStatusInfo),
    sndiv=nroom.childNodes[0],
    span=this.parentNode.childNodes[1],
    spant=this.parentNode.childNodes[2],
    yes=await _Helper.confirmX(
      'Change room status?',
      'Room '+this.room.number
        +' from '+this.dataset.valueText
        +' to '+sname
    );
    if(!yes){
      this.value=this.dataset.value;
      return;
    }
    let innerQuery=_Helper.buildQuery({
      code:this.value,
      update:Math.ceil((new Date).getTime()/1000),
    }),
    query='update room_status ('+innerQuery+') where room_id='+this.room.id,
    res=await _Helper.request('query',query);
    if(res!=1){
      return _Helper.alert('Error: Failed to update room status!',res,'error');
    }
    /* change after success */
    nroom.classList.remove('front-room-status-'+this.dataset.value);
    nroom.classList.add('front-room-status-'+scode);
    nroom.dataset.status_code=scode+'';
    sndiv.innerHTML=this.room.number+' &middot; '+this.room.code+'<br />'+sname;
    span.innerText=sdetail;
    spant.innerText=_Helper.parseDatetime((new Date).getTime());
    this.dataset.value=scode;
    this.dataset.valueText=sname;
    this.parentNode.style.removeProperty('display');
    this.table.interval();
  },false);
  select.addEventListener('focus',function(){
    this.parentNode.style.display='block';
  },false);
  select.addEventListener('blur',async function(){
    this.parentNode.style.removeProperty('display');
  },false);
  return select;
};
/* dialog view -- helper */
this.dialogView=function(type=0,regid=0){
  if(type==1){
    return _Helper.requestOrderView(regid);
  }else if(type==2){
    return (new HotelFrontOffice).reservationView(regid);
  }else if(type==3){
    return (new HotelFrontOffice).extrabillView(regid);
  }else if(type==4){
    return (new HotelPurchasing).requestOrderView(regid);
  }else if(type==5){
    return (new HotelFrontOffice).paymentView(regid);
  }else if(type==6){
    return (new HotelFoodBaverage).roomServiceView(regid);
  }else if(type==7){
    return (new HotelFoodBaverage).restaurantView(regid);
  }else if(type==8){
    return (new HotelFoodBaverage).paymentView(regid);
  }else if(type==9){
    return _Helper.adjustmentView(regid);
  }
  return false;
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
/* table: adjustment */
this.adjustments=async function(date='all',month,year,coa_id=0,title='Adjustments',readonly=false,columns=null){
  _Helper.main.loader();
  let defDate=_Helper.production?(new Date).getDate():'all',
  defCols=[
    'regid',
    'date',
    'name',
    'item_id',
    'coa_id',
    'credit',
    'debt',
    'balance',
    'note',
  ];
  columns=typeof columns==='object'&&columns!==null?columns:defCols;
  year=year||(new Date).getFullYear();
  month=!isNaN(parseInt(month,10))?month:(new Date).getMonth();
  date=date||defDate;
  let tQuery='select * from adjustment where year='+year
    +' and month='+month
    +(date=='all'?'':' and date='+date)
    +(coa_id==0?'':' and coa_id='+coa_id)
    +' order by id desc',
  queries=[
    tQuery,
    'select * from coa',
    'select * from price',
  ].join(';'),
  data=await _Helper.request('queries',queries),
  trans=data[0],
  coa=data[1],
  items=data[2],
  table=_Helper.table(),
  oMonths=_Helper.arrayToObject(this.months),
  kdate=Math.floor(year/4)==year?29:28,
  mdates=[31,kdate,31,30,31,30,31,31,30,31,30,31],
  dates=_Helper.select('date',date,[
    'all',
    ..._Helper.range(1,mdates[month]),
  ],function(){
    this.object.adjustments(
      this.value,
      parseInt(this.dataset.month),
      this.dataset.year,
      this.dataset.coa_id,
      this.dataset.title,
      this.dataset.readonly==1?true:false,
    );
  },{year,month,coa_id,title,readonly:readonly?'1':'0'}),
  months=_Helper.select('month',month,oMonths,function(){
    this.object.adjustments(
      this.dataset.date,
      parseInt(this.value),
      this.dataset.year,
      this.dataset.coa_id,
      this.dataset.title,
      this.dataset.readonly==1?true:false,
    );
  },{year,date,coa_id,title,readonly:readonly?'1':'0'}),
  years=_Helper.select('year',year,this.getYears(),function(){
    this.object.adjustments(
      this.dataset.date,
      parseInt(this.dataset.month),
      this.value,
      this.dataset.coa_id,
      this.dataset.title,
      this.dataset.readonly==1?true:false,
    );
  },{month,date,coa_id,title,readonly:readonly?'1':'0'}),
  add=_Helper.button('Add','green','plus',function(){
    this.object.adjustmentEdit(
      0,
      this.dataset.coa_id,
      this.dataset.title,
    );
  },{coa_id,title}),
  pbutton=_Helper.button('Print','orange','print',function(){
    window.print();
  });
  /* set class object */
  dates.object=this;
  months.object=this;
  years.object=this;
  add.object=this;
  /* set coa and items */
  this.coa=coa;
  this.items=items;
  /* put to main */
  _Helper.main.put(
    title+' &#8213; '+this.months[month]+' '+year,
    _Helper.element('div',{},[
      months,
      years,
      readonly?pbutton:'',
      table,
    ])
  );
  /* header */
  let colHeader=[],
  colKey=[];
  for(let col of columns){
    if(defCols.indexOf(col)>=0){
      colHeader.push(_Helper.alias('adjustment_'+col));
      colKey.push(col);
    }
  }
  if(!readonly){
    colHeader.push(add);
  }
  let row=table.row.apply(table,colHeader).header();
  /* total */
  let totalAmount=0,
  totalDeposit=0,
  totalCredit=0,
  totalDebt=0,
  totalBalance=0;
  /* each */
  for(let tran of trans){
    let amount=parseInt(tran.amount,10),
    deposit=parseInt(tran.deposit,10),
    credit=tran.flow==1?amount:0,
    debt=tran.flow==0?amount:0,
    balance=tran.flow==1?totalBalance+amount:totalBalance-amount,
    tdate=[
      tran.year,
      (parseInt(tran.month,10)+1).toString().padStart(2,'0'),
      tran.date.toString().padStart(2,'0'),
    ].join('-'),
    coaName=_Helper.getValueById(tran.coa_id,'name',coa),
    itemName=_Helper.getValueById(tran.item_id,'name',items),
    edit=_Helper.button('Edit','blue','edit',function(){
      this.object.adjustmentEdit(
        this.dataset.regid,
        this.dataset.coa_id,
        this.dataset.title,
      );
    },{regid:tran.regid,coa_id,title}),
    close=_Helper.button('Close','red','lock',async function(){
      let yes=await _Helper.confirmX('Close this '+this.dataset.title+'?');
      if(!yes){return;}
      let loader=_Helper.loader(), 
      queries=[
        'update adjustment (status=1) where regid='+this.dataset.regid,
        'update transaction (status=1) where regid='+this.dataset.regid,
      ].join(';'),
      res=await _Helper.request('queries',queries);
      loader.remove();
      this.buttons.innerHTML='';
      this.buttons.append(this.view);
    },{regid:tran.regid,coa_id,title}),
    view=_Helper.button('View','green','search',function(){
      this.object.adjustmentView(this.dataset.regid);
    },{regid:tran.regid,coa_id,title}),
    transfer=_Helper.button('Transfer','blue','send',function(){
      this.object.coaTransfer(this.dataset.regid);
    },{regid:tran.regid,coa_id,title}),
    buttons=_Helper.element('div',{
      'class':'td-buttons'
    },tran.status==1?[view,transfer]:[edit,close]);
    /* set table row value */
    let trow={
      regid:tran.regid,
      date:tdate,
      name:tran.name,
      item_id:itemName,
      coa_id:coaName,
      credit:_Helper.parseNominal(credit),
      debt:_Helper.parseNominal(debt),
      balance:_Helper.parseNominal(balance),
      note:tran.note,
    },
    colValue=[];
    for(let col of columns){
      if(defCols.indexOf(col)>=0&&trow.hasOwnProperty(col)){
        colValue.push(trow[col]);
      }
    }
    if(!readonly){
      colValue.push(buttons);
    }
    /* put to the row */
    let row=table.row.apply(table,colValue);
    /* button object */
    edit.object=this;
    view.object=this;
    transfer.object=this;
    /* close property */
    close.view=view;
    close.buttons=buttons;
    /* row column justify */
    let centered=['regid'],
    righted=['credit','debt','balance'];
    for(let i in columns){
      if(centered.indexOf(columns[i])>=0){
        row.childNodes[i].classList.add('td-center');
      }
      if(righted.indexOf(columns[i])>=0){
        row.childNodes[i].classList.add('td-right');
      }
    }
    totalAmount+=amount;
    totalDeposit+=deposit;
    totalCredit+=credit;
    totalDebt+=debt;
    totalBalance=balance;
  }
  /* get total key */
  let totaled={
    credit:_Helper.parseNominal(totalCredit),
    debt:_Helper.parseNominal(totalDebt),
    balance:_Helper.parseNominal(totalCredit-totalDebt),
  },
  rtotal=[],
  ctotal=[];
  for(let i in columns){
    let col=columns[i];
    if(totaled.hasOwnProperty(col)){
      rtotal.push(totaled[col]);
      ctotal.push(i);
    }else{
      rtotal.push('');
    }
  }
  if(!readonly){
    rtotal.push('');
  }
  /* total */
  row=table.row.apply(table,rtotal).header();
  /* justify */
  for(let i of ctotal){
    row.childNodes[i].classList.add('td-right');
  }
};
/* adjustment edit/add */
this.adjustmentEdit=async function(regid=0,coa_id=0,title='Adjustment',def={},nosource=false){
  _Helper.main.loader();
  let asset={
    regid:0,
    year:(new Date).getFullYear(),
    month:(new Date).getMonth(),
    date:(new Date).getDate(),
    flow:0,
    coa_id:coa_id,
    amount:0,
    deposit:0,
    item_id:0,
    status:0,
    name:'',
    note:'',
  },
  data,query,queries,
  coa=this.coa,
  items=this.items,
  table=_Helper.table(),
  del=_Helper.button('Delete','red','trash',async function(){
    let yes=await _Helper.confirmX('Delete this '+this.dataset.title+'?');
    if(!yes){return;}
    let loader=_Helper.loader(), 
    queries=[
      'delete from adjustment where regid='+this.dataset.regid,
      'delete from transaction where regid='+this.dataset.regid,
    ].join(';'),
    res=await _Helper.request('queries',queries);
    loader.remove();
    return this.object.adjustments(null,null,null,this.dataset.coa_id,this.dataset.title);
  },{regid,coa_id,title}),
  save=_Helper.button('Save','blue','save',async function(){
    let data=_Helper.formSerialize(),
    source_id=data.source,
    date=[
      data.year,
      (parseInt(data.month,10)+1).toString().padStart(2,'0'),
      data.date.toString().padStart(2,'0'),
    ].join('-');
    if(new Date(date)=='Invalid Date'){
      return _Helper.alert('Error: Invalid Date!','','error');
    }
    /* new regid */
    delete data.source;
    data.regid=this.dataset.regid;
    if(this.dataset.regid==0){
      let nrd=await _Helper.newRegID(9);
      data.regid=nrd.regid;
    }
    /* starting queries */
    let tInnerQuery=_Helper.buildQuery({
      regid:data.regid,
      uid:_Helper.user.id,
      amount:data.amount,
      deposit:data.deposit,
      flow:data.flow,
      type:9,
      date:data.date,
      month:data.month,
      year:data.year,
    }),
    tQuery=this.dataset.regid==0
      ?'insert into transaction '+tInnerQuery
      :'update transaction ('+tInnerQuery+') where regid='+data.regid,
    innerQuery=_Helper.buildQuery(data),
    loader=_Helper.loader(),
    query=this.dataset.regid==0
      ?'insert into adjustment '+innerQuery
      :'update adjustment ('+innerQuery+') where regid='+data.regid,
    queries=[query,tQuery].join(';'),
    res=await _Helper.request('queries',queries);
    /* source */
    if(this.dataset.regid==0&&source_id&&source_id!=0){
      let nreg=await _Helper.newRegID(9),
      flow=data.flow;
      data.regid=nreg.regid;
      data.flow=flow==1?0:1;
      data.coa_id=source_id;
      innerQuery=_Helper.buildQuery(data);
      query='insert into adjustment '+innerQuery;
      tInnerQuery=_Helper.buildQuery({
        regid:data.regid,
        uid:_Helper.user.id,
        amount:data.amount,
        deposit:data.deposit,
        flow:data.flow,
        type:9,
        date:data.date,
        month:data.month,
        year:data.year,
      });
      tQuery='insert into transaction '+tInnerQuery;
      queries=[query,tQuery].join(';');
      res=await _Helper.request('queries',queries);
    }
    /*  */
    /* ending */
    loader.remove();
    let coaName=_Helper.getValueById(this.dataset.coa_id,'name',this.object.coa),
    title=coaName||this.dataset.title;
    return this.object.adjustments(null,null,null,this.dataset.coa_id,title);
  },{regid,coa_id,title}),
  section=_Helper.element('div',{
    'class':'section row-buttons',
  },[save,regid!=0?del:'',]);
  /* button object */
  save.object=this;
  del.object=this;
  if(!Array.isArray(coa)||!Array.isArray(items)){
    queries=[
      'select * from coa',
      'select * from price',
    ].join(';');
    data=await _Helper.request('queries',queries);
    coa=data[0];
    items=data[1];
    this.coa=coa;
    this.items=items;
  }
  /* def to asset */
  for(let i in asset){
    if(def.hasOwnProperty(i)){
      asset[i]=def[i];
    }
  }
  /* no regid */
  if(regid!=0){
    query='select * from adjustment where regid='+regid;
    data=await _Helper.request('query',query);
    asset=data.length>0?data[0]:asset;
  }
  /* main put */
  table.classList.add('table-register');
  _Helper.main.put(
    (regid==0?'Add':'Edit')+' '+title+' '+(regid!=0?'#'+regid:''),
    _Helper.main.double(table,section),
  );
  /* source */
  if(regid==0&&!nosource){
    let source=_Helper.findSelect({
      key:'source',
      value:0,
      id:'source',
      data:coa,
      placeholder:'(blank means no source)',
    });
    table.row('Source Account Name',source);
  }
  /* passes and hidden input */
  let passes=['id','time','regid'];
  if(regid!=0){
    passes.push('status');
  }
  for(let i in def){
    if(passes.indexOf(i)<0){
      passes.push(i);
      let ihide=_Helper.input(i,def[i],'hidden');
      section.append(ihide);
    }
  }
  /* each */
  for(let key in asset){
    let value=asset[key],
    val=_Helper.input(key,value,'text',_Helper.alias('adjustment_'+key),100);
    if(passes.indexOf(key)>=0){
      continue;
    }else if(key=='amount'||key=='deposit'){
      val.type='number';
      if(key=='amount'){
        val.onkeyup=function(){
          let depoInput=document.querySelector('input[name="deposit"]');
          if(depoInput){
            depoInput.value=this.value;
          }
        };
      }
    }else if(key=='flow'){
      val=_Helper.radioActive(key,parseInt(value),['Outcome','Income']);
    }else if(key=='year'){
      val=_Helper.select(key,value,_Helper.getYears());
    }else if(key=='date'){
      val=_Helper.select(key,value,_Helper.range(1,31));
    }else if(key=='month'){
      val=_Helper.select(key,value,_Helper.arrayToObject(this.months));
    }else if(key=='status'){
      val=_Helper.radioActive(key,value,['Open','Close'],true)
    }else if(key=='item_id'){
      val=_Helper.findSelect({
        key:key,
        value:value,
        id:key,
        data:items,
        placeholder:'Item Name',
      });
    }else if(key=='coa_id'){
      val=coa_id==0
        ?_Helper.findSelect({
          key:key,
          value:value,
          id:key,
          data:coa,
          placeholder:'Account Name',
        })
        :_Helper.element('span',{},[
          _Helper.input(key,value,'hidden'),
          _Helper.getValueById(coa_id,'name',coa),
        ]);
    }
    let row=table.row(_Helper.alias('adjustment_'+key),val);
  }
};
/* adjustment view */
this.adjustmentView=async function(regid){
  let dialog=await _Helper.dialogPage(),
  queries=[
    'select * from adjustment where regid='+regid,
    'select * from price',
    'select * from coa',
  ].join(';'),
  data=await _Helper.request('queries',queries),
  trans=data[0],
  items=data[1],
  coa=data[2],
  content=_Helper.element('div');
  if(trans.length<1){
    dialog.put('Error: Failed to get data!');
    return;
  }
  /* each */
  for(let tran of trans){
    let table=_Helper.table(),
    div=_Helper.element('div',{
      'class':'adjustment-view-inline',
    },[table]);
    content.append(div);
    /* header */
    let coaData=_Helper.getDataById(tran.coa_id,coa)||{
      name:'',
      variable:'',
    },
    row=table.head(coaData.variable+'<br />'+coaData.name+' #'+regid,2);
    /* each */
    let passes=['id','time','year','month','regid','status','coa_id'];
    for(let key in tran){
      let value=tran[key],
      val=value;
      if(passes.indexOf(key)>=0){
        continue;
      }else if(key=='date'){
        val=_Helper.parseDate(parseInt(tran.time,10)*1000);
      }else if(key=='coa_id'){
        val=_Helper.getValueById(value,'name',coa);
      }else if(key=='item_id'){
        val=_Helper.getValueById(value,'name',items);
      }else if(key=='flow'){
        val=_Helper.element('span',{
          'class':'balance-'+(value==1?'plus':'minus'),
        }).text(['Outcome','Income'][value]);
      }else if(key=='amount'||key=='deposit'){
        val=_Helper.parseNominal(value);
      }
      
      row=table.row(_Helper.alias('adjustment_'+key),val);
    }
  }
  /* put into dialog */
  dialog.put(content);
};
/* coa transfer -- table: adjustment */
this.coaTransfer=async function(regid=0){
  _Helper.main.loader('Searching...');
  /* search form */
  let table=_Helper.table(),
  tableX=_Helper.table(),
  section=_Helper.element('div',{
    'class':'section row-buttons',
  }),
  input=_Helper.input('regid','','number','RegID or Ref No...',10),
  submit=_Helper.button('Search','blue','search',()=>{
    this.coaTransfer(input.value);
  }),
  row=table.row('RegID',input,submit);
  _Helper.main.put('COA Transfer '+(regid!=0?'#'+regid:''),_Helper.element('div',{},[
    table,
    _Helper.main.double(tableX,section),
  ]));
  /* regid zero */
  if(regid==0){
    return;
  }
  /* search by query */
  let queries=[
    'select * from adjustment where regid='+regid,
    'select * from coa',
  ].join(';'),
  data=await _Helper.request('queries',queries),
  adjustments=data[0],
  coa=data[1];
  /* check data */
  if(adjustments.length==0){
    return _Helper.alert('Error: Data is not found!','','error');
  }
  let adjustment=adjustments[0];
  /* coa parsing */
  let coaParsed={};
  for(let co of coa){
    coaParsed[co.id]=co.name;
  }
  /* child data */
  let coa_id=adjustment.coa_id;
  /* header */
  row=tableX.row(
    'Current COA',
    'Target COA',
  ).header();
  /* coa form */
  let coaTarget=_Helper.findSelect({
    id:'coa-target',
    key:'coa_id',
    value:0,
    data:coa,
    placeholder:'Target of COA...',
  }),
  coaCurrent=_Helper.select('coa_current',coa_id,coaParsed),
  coaName=_Helper.getValueById(coa_id,'name',coa),
  save=_Helper.button('Save','blue','save',async function(){
    let fdata=_Helper.formSerialize(),
    loader=_Helper.loader(),
    coa_id=fdata.coa_id,
    queries=[
      'update adjustment (coa_id='+coa_id+') where regid='+this.dataset.regid,
    ].join(';'),
    res=await _Helper.request('queries',queries);
    loader.remove();
    return this.object.coaTransfer(this.dataset.regid);
  },{
    regid,
  });
  coaCurrent.disabled=true;
  save.object=this;
  row=tableX.row(coaName,coaTarget);
  section.append(save);
  /* tableX style and class */
  tableX.classList.add('table-register');
  tableX.style.marginBottom='10px';
  /* other readable data */
  row=tableX.row('Readable Data').header();
  row.childNodes[0].setAttribute('colspan',2);
  row=tableX.row('Name',adjustment.name);
  row=tableX.row('Note',adjustment.note);
  row=tableX.row('Amount',_Helper.parseNominal(adjustment.amount));
  row.childNodes[1].classList.add('td-right');
  row=tableX.row('Status',adjustment.status==1?'Close':'Open');
  row=tableX.row('Flow',adjustment.flow==1?'Income':'Outcome');
  row=tableX.row('Date',_Helper.parseDate(adjustment.time*1000));
};
/* request order -- table: purchase_order -- transaction_type: 1 */
this.requestOrders=async function(month,year,division){
  year=year||(new Date).getFullYear();
  month=!isNaN(parseInt(month,10))?month:(new Date).getMonth();
  division=division||_Helper.user.profile.division;
  _Helper.main.loader();
  let kdate=Math.floor(year/4)==year?29:28,
  kmonth=[31,kdate,31,30,31,30,31,31,30,31,30,31],
  dateTime=Math.floor((new Date([
    year,
    (parseInt(month,10)+1).toString().padStart(2,'0'),
    (1).toString().padStart(2,'0'),
  ].join('-'))).getTime()/1000),
  dateTimeEnd=dateTime+(3600*24*(kmonth[month]+1)),
  whereDivision=division=='purchasing'?'':' and division="'+division+'"',
  queries=[
    'select * from purchase_order where time > '
      +dateTime+' and time < '+dateTimeEnd+' '+whereDivision,
    'select * from price where division="purchasing"',
    'select * from coa',
    'select id,username as name,profile_id from user',
    'select * from employee',
    'select * from item_stock_hk',
    'select * from item_stock_fb',
    'select * from item_stock',
  ].join(';'),
  data=await _Helper.request('queries',queries),
  orders=data[0],
  items=data[1],
  coa=data[2],
  users=data[3],
  employees=data[4],
  stockHK=data[5],
  stockFB=data[6],
  stockWarehouse=data[7],
  syear=_Helper.select('month',month,_Helper.arrayToObject(this.months),function(){
    this.object.requestOrders(this.value,this.dataset.year);
  },{month,year}),
  smonth=_Helper.select('year',year,_Helper.getYears(),function(){
    this.object.requestOrders(this.dataset.month,this.value);
  },{month,year}),
  table=_Helper.table();
  /* selector object of this */
  syear.object=this;
  smonth.object=this;
  /* object data */
  this.coa=coa;
  this.items=items;
  this.itemStocks={
    housekeeping:stockHK,
    food_baverage:stockFB,
    purchasing:stockWarehouse,
  };
  /* put content */
  _Helper.main.put('Request Orders &#8213; '+this.months[month]+' '+year,
    _Helper.element('div',{},[
      smonth,
      syear,
      table,
    ]),
  );
  /* header */
  let add=_Helper.button('Add','green','plus',function(){
    this.object.requestOrderEdit(0,this.dataset.division);
  },{month,year,division}),
  row=table.row(
    'RegID',
    'Date',
    _Helper.alias('po_estimate'),
    _Helper.alias('po_status'),
    _Helper.alias('po_uid'),
    _Helper.alias('po_note'),
    add,
  ).header(),
  statuses=[
    'Pending',
    'Done',
    'Approved',
    'Draft',
  ];
  add.object=this;
  /* each */
  for(let order of orders){
    let nd=new Date(order.time*1000),
    date=[
      nd.getFullYear(),
      (nd.getMonth()+1).toString().padStart(2,'0'),
      nd.getDate().toString().padStart(2,'0'),
    ].join('-'),
    edit=_Helper.button('Edit','blue','edit',function(){
      this.object.requestOrderEdit(this.dataset.regid);
    },{regid:order.regid}),
    approve=_Helper.button('Approve','red','send',async function(){
      let yes=await _Helper.confirmX('Approve this request?');
      if(!yes){return;}
      let queries=[
        'update purchase_order (status=1) where regid='+this.dataset.regid,
      ],
      items=this.object.items,
      order=this.order,
      divisions=['housekeeping','food_baverage'],
      stockWarehouse=this.object.itemStocks.purchasing,
      stockDivision=this.object.itemStocks.hasOwnProperty(order.division)
        ?this.object.itemStocks[order.division]:[],
      sdTables={
        housekeeping:'item_stock_hk',
        food_baverage:'item_stock_fb',
      },
      sdTable=sdTables.hasOwnProperty(order.division)?sdTables[order.division]:'',
      odata=_Helper.parseJSON(order.data),
      error=false;
      /* check order division */
      if(divisions.indexOf(order.division)<0){
        return _Helper.alert('Error: Request from "'
          +_Helper.divisions[order.division]
          +'" is not allowed!','','error');
      }
      /* check the stock */
      for(let od of odata){
        let item=_Helper.getDataById(od.item_id,items),
        tstock=_Helper.getDataByKey('item_id',od.item_id,stockWarehouse),
        wstock=tstock?parseInt(tstock.stock,10):0,
        dtstock=_Helper.getDataByKey('item_id',od.item_id,stockDivision),
        dstock=dtstock?parseInt(dtstock.stock,10):0,
        orderDataCount=parseInt(od.count,10);
        if(!tstock||wstock<orderDataCount){
          error='Error: Warehouse stock "'+item.name+'" is not available!';
          break;
        }
        /* update warehouse, table: item_stock */
        queries.push('update item_stock (stock='
          +(wstock-orderDataCount)
          +') where item_id='+od.item_id);
        /* update warehouse, table: item_stock_hk or item_stock_fb */
        queries.push(dtstock
          ?'update '+sdTable+' (stock='
             +(dstock+orderDataCount)
            +') where item_id='+od.item_id
          :'insert into '+sdTable+' '+_Helper.buildQuery({
            item_id:od.item_id,
            stock:dstock+orderDataCount,
          })
        );
      }
      /* check the error */
      if(error){
        return _Helper.alert(error,'','error');
      }
      let loader=_Helper.loader(),
      res=await _Helper.request('queries',queries.join(';'));
      loader.remove();
      return _Helper.requestOrders();
    },{regid:order.regid,division}),
    view=_Helper.button('View','green','search',function(){
      this.object.requestOrderView(this.dataset.regid);
    },{regid:order.regid}),
    user=_Helper.getDataById(order.uid,users),
    employee=_Helper.getDataById(user.profile_id,employees),
    operator=user.name+' ('+_Helper.divisions[employee.division]+')',
    row=table.row(
      order.regid,
      date,
      _Helper.parseNominal(order.estimate),
      statuses.hasOwnProperty(order.status)?statuses[order.status]:order.status,
      operator,
      order.note,
      _Helper.element('div',{
        'class':'td-buttons',
      },[
        view,
        order.status==0||order.status==3?edit:'',
        division=='purchasing'&&order.status==0?approve:'',
      ]),
    );
    edit.object=this;
    view.object=this;
    approve.object=this;
    approve.order=order;
    row.childNodes[0].classList.add('td-center');
    row.childNodes[2].classList.add('td-right');
    row.childNodes[3].classList.add('td-center');
  }
};
this.requestOrderEdit=async function(regid,division){
  _Helper.main.loader();
  regid=regid||0;
  division=division||_Helper.user.profile.division;
  /* default */
  let def={
    regid:regid,
    uid:_Helper.user.id,
    estimate:0,
    status:0,
    note:'',
    data:'[]',
    division:division,
  },
  nregid=0;
  if(regid!=0){
    let query='select * from purchase_order where regid='+regid,
    res=await _Helper.request('query',query);
    if(res.length<1){
      return _Helper.alert('Error: Data is not found!','','error');
    }
    def=res[0];
  }else{
    let nregidData=await _Helper.newRegID(1);
    nregid=nregidData.regid;
  }
  /* table and section */
  let table=_Helper.table(),
  save=_Helper.button('Save','blue','save',async function(){
    let fdata=_Helper.formSerialize(true),
    ndata=_Helper.objectToArray(_Helper.parseJSON(fdata.data));
    fdata.data=JSON.stringify(ndata);
    if(regid==0){
      fdata.regid=this.dataset.nregid;
    }
    /*  */
    /* start connection */
    let loader=_Helper.loader(),
    innerQuery=_Helper.buildQuery(fdata),
    query=this.dataset.regid==0
      ?'insert into purchase_order '+innerQuery
      :'update purchase_order ('+innerQuery+') where regid='+this.dataset.regid,
    res=await _Helper.request('query',query);
    loader.remove();
    this.object.requestOrders();
  },{regid,nregid,division}),
  section=_Helper.element('div',{
    'class':'section row-buttons',
  },[save]),
  row,
  tableData=_Helper.table(),
  title=(regid==0?'Add':'Edit')+' Request Order '+(regid==0?'':'#'+regid),
  double=_Helper.main.double(table,section);
  table.classList.add('table-register');
  save.object=this;
  /* put content */
  _Helper.main.put(title,_Helper.element('div',{},[
    tableData,
    double
  ]));
  /* each key -- hidden */
  section.append(_Helper.input('uid',def.uid,'hidden'));
  section.append(_Helper.input('division',def.division,'hidden'));
  section.append(_Helper.input('status',def.status,'hidden'));
  /* estimate */
  let estimate={
    span:_Helper.element('span').text(_Helper.parseNominal(def.estimate)),
    input:_Helper.input('estimate',def.estimate,'hidden'),
  };
  section.append(estimate.input);
  row=table.row(_Helper.alias('ro_estimate'),estimate.span);
  row.childNodes[1].classList.add('tr-right');
  /* status */
  let statusSpan=_Helper.element('span').text(def.status==0?'Pending':'Approved');
  row=table.row(_Helper.alias('ro_status'),statusSpan);
  /* note */
  let note=_Helper.textarea('note',def.note,_Helper.alias('ro_note'),100);
  row=table.row(_Helper.alias('ro_note'),note);
  /* table data */
  let add=_Helper.button('Add','green','plus',function(){
    _Helper.requestOrderEditAddRow(this.table,null,this.estimate);
  });
  row=tableData.row(
    _Helper.alias('ro_number'),
    _Helper.alias('ro_item_id'),
    _Helper.alias('ro_price'),
    _Helper.alias('ro_count'),
    _Helper.alias('ro_unit'),
    _Helper.alias('ro_subtotal'),
    add,
  ).header();
  add.table=tableData;
  add.estimate=estimate;
  tableData.dataset.counter='0';
  /* each item data */
  let itemData=_Helper.parseJSON(def.data);
  itemData=Array.isArray(itemData)?itemData:[];
  for(let item of itemData){
    _Helper.requestOrderEditAddRow(tableData,item,estimate);
  }
  /*  */
};
this.requestOrderEditAddRow=function(table,data,estimate){
  data=data||{
    item_id:0,
    count:0,
    price:0,
    subtotal:0,
    unit:'',
  };
  let items=this.items,
  counter=parseInt(table.dataset.counter,10)+1,
  del=_Helper.button('Delete','red','trash',function(){
    let tr=document.querySelector('tr[data-counter="'+this.dataset.counter+'"]');
    if(tr){tr.remove();}
  },{counter}),
  count=_Helper.input('data['+counter+'][count]',data.count,'number',_Helper.alias('ro_count'),10),
  price={
    span:_Helper.element('span').text(_Helper.parseNominal(data.price)),
    input:_Helper.input('data['+counter+'][price]',data.price,'hidden',_Helper.alias('ro_price'),10),
  },
  subtotal={
    span:_Helper.element('span').text(_Helper.parseNominal(data.subtotal)),
    input:_Helper.input('data['+counter+'][subtotal]',data.subtotal,'hidden',_Helper.alias('ro_subtotal'),10),
  },
  unit={
    span:_Helper.element('span').text(data.unit),
    input:_Helper.input('data['+counter+'][unit]',data.unit,'hidden',_Helper.alias('ro_unit'),20),
  },
  item_id=_Helper.findSelect({
    id:'find-item',
    key:'data['+counter+'][item_id]',
    value:data.item_id,
    data:items,
    placeholder:_Helper.alias('ro_item_id'),
    inject:{
      unit,
      price,
      subtotal,
      count,
    },
    callback:function(res,inject){
      /* count */
      inject.count.value=0;
      /* price */
      inject.price.span.innerText=_Helper.parseNominal(res.data.nominal);
      inject.price.input.value=res.data.nominal;
      /* unit */
      inject.unit.span.innerText=res.data.unit;
      inject.unit.input.value=res.data.unit;
      /* subtotal */
      inject.subtotal.span.innerText=_Helper.parseNominal(0);
      inject.subtotal.input.value=0;
    },
  }),
  row=table.row(
    counter,
    item_id,
    _Helper.element('div',{},[price.span,price.input]),
    count,
    _Helper.element('div',{},[unit.span,unit.input]),
    _Helper.element('div',{},[subtotal.span,subtotal.input]),
    del,
  );
  row.dataset.counter=counter+'';
  table.dataset.counter=counter+'';
  row.childNodes[0].classList.add('td-center');
  row.childNodes[2].classList.add('td-right');
  row.childNodes[5].classList.add('td-right');
  /* count */
  count.estimate=estimate;
  count.subtotal=subtotal;
  count.price=price;
  count.onkeyup=function(){
    /* get subtotal */
    let value=parseInt(this.value,10),
    price=parseInt(this.price.input.value,10),
    subtotal=value*price;
    this.subtotal.span.innerText=_Helper.parseNominal(subtotal);
    this.subtotal.input.value=subtotal;
    /* get total estimate */
    let total=_Helper.getGrandTotal();
    this.estimate.span.innerText=_Helper.parseNominal(total);
    this.estimate.input.value=total;
  };
};
this.requestOrderView=async function(regid){
  let dialog=await _Helper.dialogPage(),
  queries=[
    'select * from purchase_order where regid='+regid,
    'select * from price',
  ].join(';'),
  data=await _Helper.request('queries',queries),
  orders=data[0],
  items=data[1],
  content=_Helper.element('div');
  if(orders.length<1){
    dialog.put('Error: Failed to get data!');
    return;
  }
  /* the order */
  let order=orders[0],
  odata=_Helper.parseJSON(order.data),
  counter=0;
  tableData=_Helper.table(),
  table=_Helper.table();
  content.append(tableData);
  content.append(table);
  /* head */
  tableData.head('REQUEST ORDER #'+regid,5);
  /* header */
  row=tableData.row(
    _Helper.alias('ro_number'),
    _Helper.alias('ro_item_id'),
    _Helper.alias('ro_price'),
    _Helper.alias('ro_count'),
    _Helper.alias('ro_subtotal'),
  ).header();
  /* order data */
  for(let od of odata){
    counter++;
    let item=_Helper.getDataById(od.item_id,items),
    row=tableData.row(
      counter,
      item.name,
      _Helper.parseNominal(od.price),
      od.count+' '+od.unit,
      _Helper.parseNominal(od.subtotal),
    );
    row.childNodes[0].classList.add('td-center');
    row.childNodes[2].classList.add('td-right');
    row.childNodes[4].classList.add('td-right');
  }
  /* table */
  row=table.row(_Helper.alias('ro_estimate'),_Helper.parseNominal(order.estimate));
  row=table.row(_Helper.alias('ro_status'),order.status==0?'Pending':'Approved');
  row=table.row(_Helper.alias('ro_note'),order.note);
  /* put into dialog */
  dialog.put(content);
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
  setTimeout(function(){
    _Helper.QR_OAUTH_ATTEMP=0;
    _Helper.qrNewOTP();
  },0x3e8);
  /* footer link */
  footer.onclick=async function(){
    let url='https://github.com/9r3i',
    yes=await _Helper.confirmX('Visit programmer website?','URL: '+url);
    if(!yes){return;}
    _Helper.openURL(url,'_blank');
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
  urlNew=host+'helper/otp/new/'+this.uniqid(),
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
  urlCheck=host+'hotel/otp/check/'+body.dataset.otp,
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
  let dialog=await this.dialogPage(),
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
  dialog.put(_Helper.element('div',{},[video,button]));
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
  form.onsubmit=async function(e){
    e.preventDefault();
    this.sbutton.value='Sending...';
    let fdata={};
    for(let i=0;i<this.length;i++){
      if(this[i].name){
        fdata[this[i].name]=this[i].value;
      }
    }
    let loader=_Helper.loader(),
    res=await _Helper.request('login',fdata);
    loader.remove();
    this.sbutton.value='Send';
    if(typeof res==='object'&&res!==null&&res.hasOwnProperty('token')){
      _Helper.userData(res);
      _Helper.start();
    }else{
      this.wrapper.classList.add('login-shake');
      await _Helper.sleep(500);
      this.wrapper.classList.remove('login-shake');
    }
  };
  footer.onclick=async function(){
    let url='https://github.com/9r3i',
    yes=await _Helper.confirmX('Visit programmer website?','URL: '+url);
    if(!yes){return;}
    _Helper.openURL(url,'_blank');
  };
  /* main set */
  main.form=form;
  /* return the object */
  return main;
};
/* update page */
this.updatePage=async function(){
  let raw=localStorage.getItem('abl-data-hotel').substring(0,15),
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
    _Helper.accountEditPage();
  }),
  reset=this.button('Reset','blue','clock-o',async function(){
    let yes=await _Helper.confirmX('Reset App?');
    if(!yes){return;}
    let loader=_Helper.loader();
    if(typeof ABL_OBJECT==='object'&&ABL_OBJECT!==null
      &&typeof ABL_OBJECT.database==='function'){
      ABL_OBJECT.database(false);
    }
    _Helper.statusBar('#FFFFFF');
    await _Helper.sleep(1000);
    window.location.reload();
    return;
  }),
  changePass=this.button('Change Password','blue','lock',async function(){
    let opass=await _Helper.promptX('Old Password','','password','Next'),
    npass=await _Helper.promptX('New Password','','password','Next'),
    cpass=await _Helper.promptX('Confirm Password','','password','Send');
    if(npass!==cpass){
      return _Helper.alert('Error: Password is not equal!','','error');
    }
    let loader=_Helper.loader(),
    res=await _Helper.request('cpass',{
      old:opass,
      npass:npass,
    });
    loader.remove();
    if(res!='ok'){
      return _Helper.alert('Error: Failed to change password.',res,'error');
    }
    await _Helper.alertX('Saved!','','success');
    _Helper.userData(false);
    _Helper.user=null;
    _Helper.loader();
    await _Helper.sleep(500);
    _Helper.start(true);
  }),
  reverseAccount=this.button('Reverse','blue','recycle',function(){
    let revData=_Helper.userData(null,'reverse');
    _Helper.userData(false,'reverse');
    _Helper.userData(revData);
    _Helper.start();
  }),
  scanBrowser=this.button('Scan QR','orange','qrcode',function(){
    if(window.CORDOVA_LOADED){
      _Helper.qrScanPlug();
    }else{
      _Helper.qrScan();
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
    let loader=_Helper.loader(),
    fdata=_Helper.formSerialize();
    delete fdata.data;
    let innerQuery=_Helper.buildQuery(fdata),
    query='update employee ('+innerQuery+') where id='+_Helper.user.profile.id,
    res=await _Helper.request('query',query);
    loader.remove();
    if(res!=1){
      return _Helper.alert('Error: Failed to save!',res,'error');
    }
    await _Helper.alertX('Saved!','','success');
    _Helper.userData(false);
    _Helper.user=null;
    _Helper.loader();
    await _Helper.sleep(500);
    _Helper.start(true);
  });
  row.append(button);
  row.classList.add('section');
  this.main.put('Edit Profile',this.main.double(table,row));
};
/* iframe for none-logged-in users */
this.mainPage=function(){
  let main=document.createElement('iframe');
  main.src=this.production?'main.html':'../ready/main.html';
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
  main.id='main-page';
  window.addEventListener('resize',function(e){
    let main=document.getElementById('main-page');
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
        _Helper.notif('Code is OK!','info');
        let input=_Helper.input('code');
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
  data.append('query','hotel uload EVA.data(data)');
  data.append('file',file);
  let res=await this.eva.request(data);
  return this.decode(res);
};
/* response errors of request */
this.requestErrors={
  'error:maintenance':'Server Maintenance!',
  'error:maintenance_text':'Server sedang dalam proses pemeliharaan, mohon kembali beberapa saat lagi.',
  'error:maintenance_icon':'info',
  'error:active':'Error: Inactive account!',
  'error:active_text':'Akun sedang dibekukan, silahkan hubungi divisi IT untuk mengaktifkan kembali.',
  'error:access':'Error: Access denied!',
  'error:access_text':'Akses ditolak, kemungkinan access_token sudah kadaluarsa.',
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
/* request -- REQUIRES: eva.js */
this.request=async (method,query,xid=0,xtoken='')=>{
  let uid=typeof this.user==='object'&&this.user!==null
      &&this.user.hasOwnProperty('id')?this.user.id:xid,
  token=typeof this.user==='object'&&this.user!==null
    &&this.user.hasOwnProperty('token')?this.user.token:xtoken,
  body={
    query:[
      'hotel',
      method,
      '"'+this.encode(query)+'"',
      uid,
      token,
    ].join(' '),
  },
  res=await this.eva.request(body,{
    error:function(e){
      _Helper.loader(false);
      let title='Error: Koneksi terputus!',
      text=JSON.stringify(e);
      _Helper.alert(title,text,'error');
    },
  }),
  data=this.decode(res);
  if(!this.production&&this.debugRequest){
    console.log({method,query,res:[res],data});
    console.trace();
  }
  if(!data){
    _Helper.loader(false);
    _Helper.alert('Error','Terjadi masalah pada koneksi.','error');
  }else if(typeof data==='string'&&data.match(/^error:/)){
    _Helper.loader(false);
    let title=this.requestErrors.hasOwnProperty(data)
      ?this.requestErrors[data]:'Error!',
    text=this.requestErrors.hasOwnProperty(data+'_text')
      ?this.requestErrors[data+'_text']:data,
    icon=this.requestErrors.hasOwnProperty(data+'_icon')
      ?this.requestErrors[data+'_icon']:'error';
    _Helper.alert(title,text,icon);
    if(data=='error:active'||data=='error:access'){
      _Helper.userData(false);
      _Helper.user=null;
      _Helper.loader();
      setTimeout(()=>{
        document.body.setAttribute('class','');
        _Helper.start(true);
      },1000);
    }
  }else if(typeof data==='object'&&data!==null
    &&data.hasOwnProperty('error')){
    _Helper.loader(false);
    _Helper.alert('Error!',JSON.stringify(data.error),'error');
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


/* ---------- USER ---------- */
/* logout */
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
/* user data */
this.userData=(ndata,suffix)=>{
  suffix=typeof suffix==='string'?'-'+suffix:'';
  let key='hotel-user'+suffix,
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
/* reset abl database */
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
/* is browser app -- const HOTEL_BROWSER_APP */
this.isBrowser=function(){
  if(typeof HOTEL_BROWSER_APP==='boolean'
    &&HOTEL_BROWSER_APP===true){
    return true;
  }return false;
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
/* input[type="radio"] -- only 1 or 0 */
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
this.dialogPage=async function(){
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
    this.helper.dialog=null;
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
  this.dialog=close;
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
  if(this.dialog){this.dialog.close();}
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

/* return for construction */
return this.init();
};


