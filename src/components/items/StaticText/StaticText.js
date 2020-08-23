import React, { Component } from 'react';

class StaticText extends Component {
  constructor(props) {
    super(props);
    this.qRef = React.createRef();
    this.keyRef = React.createRef();

    this.state = {
    }

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  delete() {
    this.props.delete(this.props.count);
  }

  getCount() {
    this.props.getCount(this.props.count);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange(type, q, count) {
    this.props.handleChange(type, q, count);
  }

  componentDidMount() {
    if (this.props.imported) {
      this.handleChange("Static Text", this.props.defaultText, this.props.count);
    }
  }

  render() {
    const qNum = this.props.count + 1;
    return (
      <form className="unit">
        <br/>
        Question #{qNum} 
        <br/>
        Enter your static text below: <br/>
        <textarea cols="60" rows="10" ref={this.qRef} defaultValue={this.props.defaultText}
          onInput={() => this.handleChange("Static Text", this.qRef.current.value, this.props.count)}>
        </textarea>
        <br/><br/>
        What csv column name do you want to assign to this question? <br/>
        <b>Please use letters only, and the name must be unique.</b> <br/>
        Recommedation: include your experiment name, this question number 
        ({qNum}), and the question type (staticText)
        <br/>
        <input type="text" ref={this.keyRef} 
          onInput={() => this.handleChange("static-text-key", this.keyRef.current.value, this.props.count)}/>
        
        <br/><br/>
        <button onClick={this.delete.bind(this)}>Delete</button>
      </form>
    )
  }
}

export default StaticText;