import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrenciesAPI from '../services/currenciesAPI';
import { currenciesActionThunk,
  expensesAction, updateExpenseAction } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { selectCurrency } = this.props;
    selectCurrency();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState(() => ({ [name]: target.value }));
  };

  handleClick = (e) => {
    e.preventDefault();
    const { addExpenses, editor, idToEdit, editExpenseDisp } = this.props;

    getCurrenciesAPI().then((data) => {
      this.setState({ exchangeRates: data }, () => {
        if (!editor) {
          addExpenses(this.state);
        } else {
          editExpenseDisp({
            id: idToEdit,
            ...this.state,
          });
        }
        this.clearInput();
      });
    });
  };

  clearInput = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'alimentação',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form data-testid="wallet-form" onSubmit={ this.handleClick }>
        <label htmlFor="valor">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="descrição">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((currencie, index) => (
              <option key={ index } value={ currencie }>{currencie}</option>
            ))}
          </select>
        </label>
        <label htmlFor="metodo-de-pagamento">
          Método de Pagamento:
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria:
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="submit"
        >
          { !editor ? 'Adicionar Despesa' : 'Editar despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectCurrency: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  editExpenseDisp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  selectCurrency: () => dispatch(currenciesActionThunk()),
  addExpenses: (payload) => dispatch(expensesAction(payload)),
  editExpenseDisp: (payload) => dispatch(updateExpenseAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
