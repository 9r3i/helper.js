async function test_start(){
  let config={
    appNS:'test',
    appVersion:'v1.0.0',
    appBaseName:'Test',
    appLogo:'',
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
      admin:'HRD',
      account:'Profile',
    },
    apps:[
      'account',
      'admin',
    ],
    
  };
  let app=new Helper(config);
  //app.userData(false);
  app.start();
  //await app.sleep(100);
  //app.alert('Helper v'+app.version);
  //await app.fakeLoaderZ();
  //app.alert('QrScanner: '+(typeof QrScanner));
}

;function TestAdmin(helper){
this.helper=helper;
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
this.dashboard=function(){
  this.helper.main.put('Dashboard','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
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