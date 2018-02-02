import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import queryString from 'query-string';
import { setToken, getAccounts, getTransactions } from '../../actions/auth';


class Home extends Component {
  async componentWillMount() {
    const parsed = queryString.parse(window.location.search);
    if (parsed.code) {
      const token = await this.props.setToken(parsed.code);
      this.props.getAccounts(token.access_token);
    }
  }
  render() {
    const showAuthCTA = !this.props.token
    return (
        <div className="Home">
        {this.props.accounts.map((account)=>{
          return <button onClick={()=>{this.props.getTransactions(this.props.token, account.account_id)}}>{account.display_name}</button>

        })}
        {JSON.stringify(this.props.transactions)}
        <p style={{color:'red'}}>{this.props.reviewResults.spendsMoreThanEarns !== undefined ? `Do you spend more than you earn too often? ${this.props.reviewResults.spendsMoreThanEarns}` : null}</p>
        { showAuthCTA ? <a href="https://auth.truelayer.com/?response_type=code&client_id=hackdaysocial-d031&nonce=3317513328&scope=info%20accounts%20balance%20transactions%20cards%20offline_access&redirect_uri=http://localhost:3000/callback&enable_mock=true">Authenticate</a> : null }
        </div>
    );
  }
}

Home.defaultProps = {
  accounts: [], 
  reviewResults: {}
}
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
      dispatch,
);
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);
