const db=require('../database/database');
module.exports=class dish{
    constructor(title,price,url,recepie,category)
    {
        this.title=title,
        this.price=price,
        this.url=url
        this.recepie=recepie,
        this.categoryy=category
    }
    save()
    {
        return db.execute('insert into dishes(title,price,url,active,recepie,Category) values(?,?,?,?,?,?)',[this.title,this.price,this.url,'false',this.recepie,this.categoryy])
    }
   static allcat()
    {
      return db.execute('select distinct Category from dishes order by Category ASC');
    }
    static alldishes()
    {
        return db.execute('select * from dishes order by Category ASC')
    }
    static view(id)
    {
        return db.execute('select id,title, ROUND(price, 2) as price,url,recepie,Category from dishes where id=(?)',[id]);
    }
    static category(titl)
    {   
        return db.execute('insert into category(title) values(?)',[titl]); 
    }
    update(id)
    {
        return db.execute('UPDATE dishes SET title=(?),price=(?),url=(?),recepie=(?),category=(?) WHERE id=(?)',[this.title,this.price,this.url,this.recepie,this.categoryy,id])
    }
   static delete(id)
    {
        return db.execute('delete from dishes where id=(?)',[id])
    }
    static realcategories()
    {
        return db.execute('select * from category');
    }
   static search(title)
    {   
        return db.execute('select * from dishes where title like (?)',[title+'%'])
    }
    static extras(id,title,price,category)
    {
        return db.execute('insert into extras(dishId,title,price,category) values(?,?,?,?)',[id,title,price,category])
    }
    static extrascat(id)
    {   
        return db.execute('select distinct category,dishId from extras where dishId=(?)',[+id])
    }
    static fetchextras(id)
    {
        return db.execute('select * from extras where dishId=(?)',[id]);
    }  
    static extra(id)
    {   console.log("We are here")
        return db.execute('SELECT dishes.recepie,dishes.title as name,dishes.url,extras.title,extras.id,extras.dishId,ROUND(extras.price, 2) as price,extras.category FROM extras LEFT JOIN dishes ON dishes.id=(?)',[id])
    }
    static deleteextra(id)
    {
        return db.execute('delete from extras where id=(?)',[id])
    }
   static update2(title,price,category,id)
    {   console.log(title);
        return db.execute('UPDATE extras SET title=(?),price=(?),category=(?) WHERE id=(?)',[title,price,category,id])
    }
    static biewcat(id)
    {   
        return db.execute('select id,dishId,title,ROUND(extras.price, 2) as price,category from extras where id=(?)',[id]);
    }
    static disable(id)
    {
        return db.execute('update dishes set active=(?) where id=(?)',['true',id]);
    }
    static enable(id)
    {
        return db.execute('update dishes set active=(?) where id=(?)',['false',id])
    }
}    