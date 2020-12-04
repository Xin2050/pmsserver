import { Repository,SelectQueryBuilder } from 'typeorm';

export class QueryBuilder<T> {
  private query: SelectQueryBuilder<T>
  constructor(private repository:Repository<T>,private tableName:string){
    this.query = repository.createQueryBuilder(tableName);
  }
  getQuery():SelectQueryBuilder<T>{
      return this.query;
  }
  addWhere(condition:string):this{
    this.query.where(condition)
    return this;
  }
  where(keyValue:object):this{
    let count = 0;
    for(let key in keyValue){
      if(count===0) {
        this.query.where(`${this.tableName}.${key} = :${key}`,{ [key]: keyValue[key] })
      }else{
        if(keyValue[key]) {
          this.query.andWhere(`${this.tableName}.${key} = :${key}`, {[key]: keyValue[key]})
        }
      }
      count++;
    }
    return this;
  }
  andMultipleFieldsLikeWhere(fields:string[],value:string):this{
    const r = Math.random().toString(36).substring(7);
    let where = "";

    for(let i=0;i<fields.length;i++){
      if(i===0){
        where = where+`LOWER(${this.tableName}.${fields[i]}) LIKE :${r}`
      }else{
        where = where + ` OR LOWER(${this.tableName}.${fields[i]}) LIKE :${r}`
      }
    }
    this.query.andWhere(where,{[r]:value.toLowerCase()})
    return this;
  }
  andLikeWhere(keyValue:object):this{
    for(let key in keyValue){
      if(keyValue[key]) {
        this.query.andWhere(`LOWER(${this.tableName}.${key}) LIKE :${key}`, {[key]: `%${keyValue[key].toLowerCase()}%`})
      }
    }
    return this;
  }

  andWhere(keyValue:object,symbol:string="="):this{

    for(let key in keyValue){
      if(keyValue[key]) {
        this.query.andWhere(`${this.tableName}.${key} ${symbol} :${key}`, {[key]: keyValue[key]})
      }
    }
    return this;
  }



}