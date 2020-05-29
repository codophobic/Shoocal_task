import React, { Component } from 'react';
import classes from './homepage.module.css';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import axios from 'axios';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
class Homepage extends Component{

   state={
        title:'',
        description:'',
        comments:[],
        reloadData:1
    }
   
    componentDidUpdate=(prevprops,prevstate)=>{
          if(prevstate.reloadData!==this.state.reloadData)
          {
            axios.get('/comment/commentdata').then(res=>{
                console.log(res.data);
                let dArray= res.data;
                this.setState({
                    ...this.state,
                    comments:dArray
                });
    
                console.log(this.state);
            });
          }
    }

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
        description:'',
        reloadData:(this.state.reloadData===1?0:1)
       })
   }
    
   upvotehandler=(id)=>{

       let dArray= this.state.comments;
       for(let i=0;i<dArray.length;i++)
       {
           if(dArray[i]._id===id)
           {
               
               dArray[i].upvotes+=1;
           }
       }

       this.setState({
           ...this.state,
           comments:dArray
       })

       console.log(this.state);
   }

   downvotehandler=(id)=>{
    let dArray= this.state.comments;

    for(let i=0;i<dArray.length;i++)
    {
        if(dArray[i]._id===id)
        {
            dArray[i].downvotes+=1;
        }
    }

    this.setState({
        ...this.state,
        comments:dArray
    })
   }
      

    render()
    {
        const allcmts= this.state.comments.map(el=>{
            return(
              <div className='row block-margin' style={{border:'2px solid black',marginBottom:'15px',marginLeft:'195px',display:'inline-block',width:'70%'}}>
              <div className='col-sm-6 col-md-8 col-lg-8'>
                 <div style={{marginLeft:'30px',color:'red',fontSize:'24px',fontWeight:'500'}}>{el.title}</div>
                 <br/>
                 <div style={{marginLeft:'30px',color:'blue',fontSize:'15px',fontWeight:'300'}}>{el.description}</div>
              </div>
               <div className='col-sm-3 col-md-2 col-lg-2'></div>
               <div className='col-sm-3 col-md-2 col-lg-2'>
                   <div style={{marginTop:'20px'}}>
                       <ArrowDropUpOutlinedIcon onClick={()=>{this.upvotehandler(el._id)}}className={classes.vote} style={{transform:'scale(2.8)',color:'disabled'}} />
                         <p>{el.upvotes} upvotes</p>
                       
                       <ArrowDropDownOutlinedIcon onClick={()=>{this.downvotehandler(el._id)}} className={classes.vote} style={{transform:'scale(2.8)',color:'disabled'}}/>
                       <p>{el.downvotes} downvotes</p>
                   </div>
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
