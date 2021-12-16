module.exports = function(){
    const abc = Math.floor(Math.random() * 10000000)
    if(abc % 2 == 0){
        return abc
    }
    else{
        return (abc+1)
    }
}
