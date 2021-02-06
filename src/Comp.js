import React from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export class Comp extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {value: '',msgs:[]};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          height: 400,
          maxWidth: 300,
          backgroundColor: 'white',
        },
      }));
    
    render() {
        return (
          <div className="App">
            <header className="App-header">
            <List>
                {this.state.msgs.map((msg)=>{
                    return (
                    <ListItem>
                        <ListItemText primary={msg} />
                    </ListItem> )
                })}
            </List>
              
              <p><TextField
                    id="textarea"
                    label="Message"
                    style={{ 
                        marginRight:8,
                        backgroundColor:'white',bottom:20,position:'abusolute'
                    }}
                    placeholder=""
                    color="white"
                    value={this.state.value}
                    onChange={this.handleChange}
                    variant="filled"/>
              <Button onClick={this.handleSubmit} color="primary" variant="contained" style={{bottom:0,position:'abusolute'}}>SEND</Button></p>
            </header>
          </div>
        );
      }
      
    
    
      getdata = text => {
        //console.log("input text >>"+text)
        Axios.post('https://obscure-stream-82049.herokuapp.com/data/', {
          post_text: text
        }).then(res =>{
            this.setState({msgs:res.data.msgs})
        })
      };
    
      handleSubmit = event => {
        this.getdata(this.state.value)
        console.log(this.state.msgs)
        event.preventDefault();
        this.setState({value:''})
      };
    
      handleChange = event => {
        this.setState({ value: event.target.value });
      };
}
export default Comp