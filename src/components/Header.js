import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  sumTotalExpenses = () => {
    const { expenses } = this.props;
    const sum = expenses.reduce((acc, curr) => (
      acc + (curr.value * curr.exchangeRates[curr.currency].ask)), 0);
    return sum.toFixed(2);
  }

  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <h2>
          TrybeWallet
        </h2>
        <div>
          <p data-testid="email-field">{userEmail}</p>
          <p data-testid="total-field">
            { this.sumTotalExpenses() }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
