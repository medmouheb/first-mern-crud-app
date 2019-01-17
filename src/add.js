import React, { Component } from 'react';
import axios from 'axios'

class AddContact extends Component
{
    constructor (props)
    {
        super(props)  
        this.AddContactDB = this.AddContactDB.bind(this)
    }
    AddContactDB=()=>{
        //this.refs.contactName.value,this.refs.contactPhone.value,this.refs.contactEmail.value
        axios
        .post("/add-contact",{name : this.refs.contactName.value,phone :this.refs.contactPhone.value,email : this.refs.contactEmail.value})
        .then(res => alert(res.data))
        .catch(err=>alert(err))
    }
    render(){ 
        return (
            <form >
                contact name:<br/>
                <input type="text" ref="contactName"/>
                <br/>
                contact phone:<br/>
                <input type="text" ref="contactPhone"/>
                <br/>
                contact email:<br/>
                <input type="text" ref="contactEmail"/>
                <br/><br/>
                <input type="button" value="add contact" 
                onClick={function (){this.AddContactDB()}.bind(this)}/>
            </form>
        )
    }
}
export default AddContact;
