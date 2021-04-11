const db=require('../database/database');
module.exports=class auth
{
    constructor(email,password)
    {
        this.email=email;
        this.password=password;
    }
    verify()
    {
        return db.execute('select * from managers where email=(?)',[this.email]);
    }
    save()
    {   console.log("So inside save");
        return db.execute('insert into managers(email,password) values (?,?)',[this.email,this.password]);
    }
}  