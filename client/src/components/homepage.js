import React, { Component } from 'react';
import classes from './homepage.module.css';
import TextInput from './ui/textfield';
import axios from 'axios';
class Homepage extends Component{


    componentDidMount=()=>{
        axios.get('/comment/commentdata').then(res=>{
            console.log(res.data);
            this.setState({
                ...this.state,
                comments:res.data
            });

            console.log(this.state);
        });
    }
    state={
        title:'',
        description:'',
        comments:[]
    }
   sumbithandler=(e)=>{
       e.preventDefault();
       console.log(this.state);
       const dat={
           title:this.state.title,
           description:this.state.description
       }
      axios.post('/comment/add',dat).then(res=>{
          console.log(res);
          alert(res.data.message);
      }).catch(err=>{
          alert('posting was unsuccessful');
      }
      )

       this.setState({
           ...this.state,
           title:'',
        description:''
       })
   }

      

    render()
    {
        const allcmts= this.state.comments.map(el=>{
            return(
                <div className="row" key={el._id}>
                <div className="col-sm-6 col-md-8 col-lg-8">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{el.title}</h5>
                      <p className="card-text">{el.description}</p>
                    </div>
                  </div>
                </div>
                <div className='col-sm-3 col-md-2 col-lg-2'></div>
                <div className="col-sm-3 col-md-2 col-lg-2">
                  
                </div>
              </div>
            )
        })
        return(
            
                   <div className='container-fluid'>
                     <div className={classes.heading}>
                           Welcome,you can post your comments here.
                     </div>

                   
                   <div className={classes.form}>
                        <form onSubmit={this.sumbithandler}>
                            <label>Your Name</label>
                            <br/>
                            <input type='text' value={this.state.title} required maxLength='20' onChange={(e)=>{
                                this.setState({
                                    ...this.state,
                                    title:e.target.value
                                })
                            }} ></input>
                            <br/>
                            <br/>
                            <textarea value={this.state.description} onChange={(e)=>{
                                this.setState({
                                    ...this.state,
                                    description:e.target.value
                                })
                            }} placeholder='write your comment' rows="5" cols="70" maxLength='200' required></textarea>
                            <br/>
                            <br/>
                            <button className={classes.btn} >Post Comment</button>
                            
                        </form>
                   </div>


                    <div className='container-fluid'>
                         {allcmts}
                    </div>


                   </div>
            
        );
    }
}


export default Homepage;
