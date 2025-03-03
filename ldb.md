

# create database

```
create database db=<dbname>&user=<dbname>&pass=9r3i&scope=*
```

# create table user

```
create table user id=aid()&username=string(100)&passcode=string(100)&privilege=int(2,1)&scope=string(100)&active=int(1,1)&type=string(100)&profile_id=int(10)&position=string(100)
```

# create table access for logged in user

```
create table access id=aid()&uid=int(10)&active=int(1,1)&time=time()&token=string(100)&userdata=string(1024)&platform=string(100)
```

# insert user data

```
insert into user username=test&passcode=$2y$12$6ACh72hpv8Eltdm2TI6.D.1OnDEYzwrAJJBvVWn.2n4Bal0fopjRa&privilege=4&type=employee&position=admin&scope=*&profile_id=1&active=1
```

# create table employee

```
create table employee id=aid()&name=string(100)&position=string(100)&time=time()&card_id=string(50)&card_type=string(50)&address=string(256)&birthdate=string(100)&birthplace=string(100)&gender=int(1,0)&phone=string(20)&email=string(100)&religion=string(50)&nationality=string(50)&division=string(100)
```


# insert employee profile

```
insert into employee name=Test&position=admin&card_id=3204130909090009&card_type=ktp&address=Bekasi&birthplace=Bekasi&birthdate=2009-09-09&gender=1&phone=08123456789&email=test@test.test&religion=Islam&nationality=Indonesia&division=admin
```


