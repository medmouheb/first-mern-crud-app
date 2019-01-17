const express=require('express')
const bodyParser=require('body-parser')
const {MongoClient, ObjectID}=require('mongodb')
const assert=require('assert')

const app=express()

app.use(bodyParser.json())
const MongoUrl="mongodb://localhost:27017"
const dataBase ="ContactList"

MongoClient.connect(
    MongoUrl,
    { useNewUrlParser: true },
    (err,client)=>{
        assert.equal(err,null,"dataabse failed to connecte")
        const db=client.db(dataBase)
        app.post("/add-contact",(req,res)=>{
            let newContact=req.body
            db.collection("contacts").insertOne(newContact,(err,data)=>{
                if(err) res.send("cannot add new contact")
                else res.send("new contact added")
            })
        })
        app.get("/contact-list",(req,res)=>{
            db.collection("contacts")
            .find()
            .toArray((err,data)=>{
                if(err) res.send("cannot get contact")
                else res.send(data)
            })
        })
        app.put('/update/:id',(req,res)=>{
            let contactID=ObjectID(req.params.id)
            db.collection("contacts")
            .findOneAndUpdate(
                {_id :contactID},
                {$set:{_id :contactID , ...req.body}},
                (err,data)=>{
                    if(err)res.send("update erreur")
                    else res.send(data)
                }
            )
        })
        app.delete('/delete/:id',(req,res)=>{
            let contactID=ObjectID(req.params.id)
            db.collection("contacts")
            .findOneAndDelete(
                {_id :contactID},
                (err,data)=>{
                    
                    if(err)res.send("delete erreur")
                    else res.send(data)
                    
                }
            )
        })
    }
)
app.listen(3007,err=>{
    if(err) console.log('server erreur')
    else console.log("server is running on port 3007")
})