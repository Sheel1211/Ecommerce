//query in the url means anything after ? 
//for e.g: http://localhost:4000/api/v1/products?keyword=Samosa   so query=keyword=Samosa 
class ApiFeatures{
    constructor(query,queryStr){
        this.query= query;
        this.queryStr= queryStr;
    }

    //search feature for API

    search(){
        const keyword=this.queryStr.keyword ?{
            name:{
                $regex:this.queryStr.keyword, //using regex to provide search functionality
                $options:"i", //case insensitive
            },
        }:{}

        // console.log(keyword);
        this.query= this.query.find({...keyword});
        return this;
    }

    filter(){

        // const queryCopy = this.queryStr  //Whenever objects are passed in js they are passed as reference so if we change queryCopy then original queryStr will also be changed so to stop that we used spread operator.

        const queryCopy={...this.queryStr};

        //Removing some fields for category
        const removeFields = ["keyword","page","limit"] //We will remove "keyword" from queryStr as it will be part of search functionality and not filters.
        
        // console.log(queryCopy);
        removeFields.forEach(key=>delete queryCopy[key]);
        // console.log(queryCopy);

        //Filter for Price and Rating
        console.log(queryCopy);

        this.query = this.query.find(queryCopy);

        return this;
    }
}

module.exports = ApiFeatures;