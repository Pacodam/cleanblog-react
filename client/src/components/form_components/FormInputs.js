import React, { Component } from 'react';

class TextInput extends Component{
   render(){
      
       const { placeholder, type, id, value, onChange, name, required } = this.props;
       return(
        <div className="control-group">
        <div className="form-group floating-label-form-group controls">
          <input
            type={type}
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
       <div className="control-group">
       <div className="form-group floating-label-form-group controls">
         <input
           type="password"
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