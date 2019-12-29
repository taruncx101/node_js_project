const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

const p = path.join(rootDir,'data', 'products.json')

const getProductsFromFile = (cb) => {
        let products = [];
        fs.readFile(p, (err, fileContent) => {
            if(!err){
             cb(JSON.parse(fileContent))
            } else{
                cb([]);
            } 
            
        });
}
module.exports = class Product {
    constructor(t){
        this.title = t;
    }
    save(){
        getProductsFromFile((products) => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log({err})
            })
        })
    }
    static fetchAllproducts(cb){
        getProductsFromFile(cb)
    }
}