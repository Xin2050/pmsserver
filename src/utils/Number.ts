export function decimal(num:number,v:number):number {
  var vv = Math.pow(10,v);
  return Math.round(num*vv)/vv;
}
