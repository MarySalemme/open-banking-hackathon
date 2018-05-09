import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import queryString from 'query-string';
import { groupBy } from 'underscore';
import { setToken, getAccounts, getTransactions } from '../../actions/auth';
import config from '../../config';
import style from './style.css';
import TransactionsList from '../TransactionsList/index';
import ReviewResults from '../ReviewResults/index';

const groupByMonth = transactions => {
  return groupBy(transactions, transaction => {
    return new Date(transaction.timestamp).getMonth();
  });
};

class Home extends Component {
  async componentWillMount() {
    const parsed = queryString.parse(window.location.search);
    if (parsed.code) {
      const token = await this.props.setToken(parsed.code);
      this.props.getAccounts(token.access_token);
    }
  }
  render() {
    const showAuthCTA = !this.props.token;

    return (
      <div className={style.center}>
        {this.props.accounts.map(account => (
          <button
            className={style.button}
            onClick={() => {
              this.props.getTransactions(this.props.token, account.account_id);
            }}
          >
            {account.display_name}
          </button>
        ))}

        {this.props.reviewResults.spendsMoreThanEarns && (
          <ReviewResults
            spendsMoreThanEarns={this.props.reviewResults.spendsMoreThanEarns}
          />
        )}
        {Object.keys(groupByMonth(this.props.transactions)).map(month => {
          const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ];
          const transactionsByMonth = groupByMonth(this.props.transactions);

          return (
            <div>
              <TransactionsList
                month={monthNames[month]}
                transactions={transactionsByMonth[month]}
              />
            </div>
          );
        })}
        {showAuthCTA && (
          <div>
            <h3 className={style.description}>
              Use our free service to find out how you are managing your money{' '}
            </h3>
            <a
              className={style.button}
              href={`https://auth.truelayer.com/?response_type=code&client_id=${
                config.CLIENT_ID
              }&nonce=3317513328&scope=info%20accounts%20balance%20transactions%20cards%20offline_access&redirect_uri=http://localhost:3000/callback&enable_mock=true`}
            >
              Authorise Open Banking
            </a>
          </div>
        )}
      </div>
    );
  }
}

Home.defaultProps = {
  accounts: [],
  reviewResults: {},
  transactions: []
};

const mapStateToProps = state => {
  return {
    token: state.auth && state.auth.access_token,
    accounts: state.accounts && state.accounts.results,
    transactions: state.transactions && state.transactions.results,
    reviewResults: state.reviewResults
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setToken,
      getAccounts,
      getTransactions
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
