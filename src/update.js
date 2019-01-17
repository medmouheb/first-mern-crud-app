import React, { Component } from 'react';
import axios from 'axios'

class UpDate extends Component
{
    constructor (props)
    {
        super(props)  
        this.UpDateContactDB = this.UpDateContactDB.bind(this)
    }
    UpDateContactDB=()=>{
        //this.refs.contactName.value,this.refs.contactPhone.value,this.refs.contactEmail.value
        axios
        .put("/update/"+this.props.id,{
            name : this.refs.contactName.value,
            phone : this.refs.contactPhone.value,
            email : this.refs.contactEmail.value
        })
    }
    render(){ 
        return (
            <form >
                <h2>{this.props.id}</h2>
                contact name:<br/>
                <input type="text" ref="contactName" />
                <br/>
                contact phone:<br/>
                <input type="text" ref="contactPhone"/>
                <br/>
                contact email:<br/>
                <input type="text" ref="contactEmail"/>
                <br/><br/>
                <input type="button" value="add contact" 
                onClick={function (){this.UpDateContactDB()}.bind(this)}/>
            </form>
        )
    }
}
export default UpDate;