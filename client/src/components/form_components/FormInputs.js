import React, { Component } from 'react';

class TextInput extends Component{
   render(){
      
       const { placeholder, id, value, onChange, name, required } = this.props;
       return(
        <div class="control-group">
        <div class="form-group floating-label-form-group controls">
          <input
            type="text"
            className="form-control"
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            required={required}
          />
        </div>
      </div>
       )
   }
}

class PasswordInput extends Component{
  render(){
     
      const { placeholder, id, value, onChange, name, required } = this.props;
      return(
       <div class="control-group">
       <div class="form-group floating-label-form-group controls">
         <input
           type="text"
           className="form-control"
           placeholder={placeholder}
           name={name}
           id={id}
           value={value}
           onChange={onChange}
           required={required}
         />
       </div>
     </div>
      )
  }
}

export { TextInput, PasswordInput };