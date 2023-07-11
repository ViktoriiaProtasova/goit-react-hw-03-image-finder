import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  static propTypes = { onClick: PropTypes.func.isRequired };

  handleEsc = ({ code }) => {
    if (code === 'Escape') {
      this.props.onClick();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  render() {
    const { children, onClick } = this.props;
    return (
      <div onClick={onClick} className={css.Overlay}>
        <div className={css.Modal}>{children}</div>
      </div>
    );
  }
}

export default Modal;
