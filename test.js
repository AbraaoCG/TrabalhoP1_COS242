let x;
let list = new Array(1000000)

let list2 = new Array(1)

for (x = 0 ; x < 1000000 ; x++){
    list[x] = x
}

list2[0] = 0

ti1 = Date.now()

list.length = list.length - 1

dt1 = Date.now() - ti1

ti2 = Date.now()

list2.length = list2.length - 1

dt2 = Date.now() - ti2


console.log(dt1 , "\n" , dt2)