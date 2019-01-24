import React, { Component } from 'react';

import { View,Text } from 'react-native';


import {FormLabel,FormInput,Button} from 'react-native-elements'
import Axios from 'axios';
// import styles from './styles';
const ROOT_URL = 'https://us-central1-beta-one-time-password.cloudfunctions.net';
export default class SignUpForm extends Component {
    constructor(props)
    {
      super(props);
      this.state={
        phone:'',
        error:'',
        
      }
    }
    handleSubmit = async () =>{
        try{
            await  Axios.post(`${ROOT_URL}/createUser`,{phone:this.state.phone })
            await  Axios.post(`${ROOT_URL}/requestOneTimePassword`,{phone:this.state.phone})

        }    
        catch(e){
            console.log(e);
            this.setState({error:'Houve um erro '})
        }
        
        
    }
  render() {
    return(<View>
                <View style = {{marginBottom:10}}>
                <FormLabel>Entre com numéro de telefone</FormLabel>
                <FormInput onChangeText ={(phone)=>this.setState({phone})} value = {this.state.phone}/>                
                </View>
                <Button title="Enviar" onPress = {this.handleSubmit} />
                <Text>{this.state.error}</Text>

          </View>);
  }
}
