import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import AddContact from './add.js'
import UpDate from './update.js'
class App extends Component {
constructor (props)
{
  super(props)
  this.showContact=this.showContact.bind(this)
  this.showAddContact=this.showAddContact.bind(this)
  this.state = { 
      dispaly:"contact",
      contactList:[],
      toModify:"",
      toDelete:""
  }
}
componentDidMount(){
  axios
  .get("/contact-list")
  .then(res => this.setState({contactList : res.data}))
  .catch(err => console.log(err))
}

showContact=()=>{
  this.setState({dispaly:"contact"})
}
showAddContact=()=>{
  this.setState({dispaly:"add"})
}
updDateContact=()=>{
  this.setState({dispaly:"update"})
}

deleteContact=()=>{
  axios
  .delete("/delete/"+this.state.toDelete)
}



  render() {
    const Contact=(props)=>{
      return(
      <div className="Contact" key={props.id}>
        <h2>Contact name : {props.name}</h2>
        <h2> Contact phone : {props.phone}</h2>
        <h2> Contact email : {props.email}</h2>
        <input type="button"  value="delete" onClick={function(){this.setState({toDelete : props.id}); this.deleteContact()}.bind(this)}/>
        <input type="button" value="modify" onClick={function(){ this.setState({toModify : props.id});this.updDateContact()}.bind(this)}/>
      </div>
      )
    }
    const AllContact=()=>{
      let tab=this.state.contactList
      
      return(tab.map(el => <Contact id={el._id} name={el.name} phone={el.phone} email={el.email}/>))
    }
    
     const Header=()=>{
      return(
      <div>
        <h2>contact App</h2>
        <input type="button" value="add contact" onClick={this.showAddContact}/>
        <input type="button" value="all contact" onClick={this.showContact}/>
      </div>
      )
    }
    const AppBody=()=>{
      if(this.state.dispaly==="contact") return <AllContact/>
      else if(this.state.dispaly==="add") return <AddContact/>
      else return <UpDate id={this.state.toModify}/>
    }

    return (
      <div  className="conatactApp">
        <Header/>
        <AppBody/>
      </div>
    )
  }
}

export default App;
