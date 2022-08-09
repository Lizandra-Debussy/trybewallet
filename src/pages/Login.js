import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState(() => ({ [name]: target.value }), this.validateLogin);
  };

  validateLogin = () => {
    const { email, password } = this.state;
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const min = 6;
    const validatePassword = password.length >= min;
    if (regex.test(email) && validatePassword) {
      return this.setState({ buttonDisabled: false });
    }
    return this.setState({ buttonDisabled: true });
  };

  render() {
    const { email, buttonDisabled } = this.state;
    const { access } = this.props;
    return (
      <section>
        <div>
          <input
            data-testid="email-input"
            id="email"
            name="email"
            type="email"
            onChange={ this.handleChange }
            placeholder="email"
          />
        </div>
        <div>
          <input
            data-testid="password-input"
            id="password"
            name="password"
            type="password"
            onChange={ this.handleChange }
            placeholder="senha"
          />
        </div>
        <div>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ buttonDisabled }
              onClick={ () => access(email) }
            >
              Entrar
            </button>
          </Link>
        </div>

      </section>
    );
  }
}

Login.propTypes = {
  access: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  access: (payload) => dispatch(userLogin(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
