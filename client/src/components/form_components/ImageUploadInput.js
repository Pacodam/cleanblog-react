import React, { Component } from "react";

class ImageUploadInput extends Component {
  render() {
    const { id, value, onChange, name, required } = this.props;
    return (
      <div class="control-group">
        <div class="form-group floating-label-form-group controls">
          <input
            type="file"
            className="form-control"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
          />
        </div>
      </div>
    );
  }
}

export { ImageUploadInput };
