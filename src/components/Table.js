import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpensesAction, editExpenseAction } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, removeExpense, editExpense } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Excluir/Editar</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (

              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {Number(expense.exchangeRates[expense.currency].ask
                  * Number(expense.value)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => removeExpense(expense.id) }
                  >
                    Excluir
                  </button>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => editExpense(expense.id) }
                  >
                    Editar Despesa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (payload) => dispatch(removeExpensesAction(payload)),
  editExpense: (payload) => dispatch(editExpenseAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
