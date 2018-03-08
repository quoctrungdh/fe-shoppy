import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './promotion.scss';

class Promotion extends React.Component<any, any> {
  constructor(props: any){
    super(props);
    this.state = { valueInput: '', errorCode: 0};
  }

  updateInputValue(e: any) {
    this.setState({
      valueInput: e.target.value.trim()
    });
  }

  validateForm() {
    if (this.state.valueInput === '') {
      this.setState({
        errorCode: -1
      });
    } else {
      this.setState({
        errorCode: 0
      });
    }
  }

  resetError() {
    this.setState({
      errorCode: 0
    });
  }

  submitForm() {
    this.validateForm();
    if (this.state.errorCode === 0) {
      fetch('http://demo8826478.mockable.io/?code='+ this.state.valueInput)
      .then(response => response.json())
      .then(data => this.setState({ errorCode: data.errorCode }));
    }
  }
  
  render() {
    return (
      <div>
        <div className="form">
          <input className="form__input" type="text" placeholder="Nhập mã giảm giá" value={this.state.valueInput} onChange={e => this.updateInputValue(e)} onFocus={this.resetError.bind(this)}/>
          <button className="form__button" onClick={this.submitForm.bind(this)}>Áp dụng</button>
        </div>
        {
          this.state.errorCode === -1 && 
          <div className="error-message">Vui lòng nhập mã giảm giá</div>
        }
        {
          this.state.errorCode == 1 && 
          <div className="success-message">Thành công</div>
        } 
        {
          this.state.errorCode == -2 && 
          <div className="error-message">Mã giảm giá không hợp lệ</div>
        } 
      </div>
    );
  }
}

export default Promotion;