interface Person {
    name : string;
    Age?: number;
    [propname : string]:any;
}

let hehe: Person = {
    name:'egou',
    kk:12,
    qq:13
}