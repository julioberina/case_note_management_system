import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SearchClients from "./SearchClients";
// import { getCurrentProfile } from '../../actions/dashboardActions';
// import { getClientList } from '../../actions/dashboardActions';
import { getDashboard } from "../../actions/dashboardActions";
import Spinner from "../common/Spinner";
import {
  Image,
  Item,
  Responsive,
  Segment,
  Form,
  Button,
  Input
} from "semantic-ui-react";
import Client from "./Client";
import _ from 'lodash';

class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      clients: [],
      sortDirection: 'DESC',
      loading: false,
      errors: {},
      homeActive: true,
      addFellowActive: false,
      results: [],
      searchValue: ''
    };

  }

  componentWillMount() {
    console.log("component did mount");

    axios
      .get("api/clients/all")
      .then(res => {
        // console.log(res.data);

        this.setState({ clients: res.data, results: res.data });
      })
      .catch(e => console.log(e));

    // this.props.getDashboard();
    // axios
    //     .get('/api/users/register', userData)
    //     .then(res => history.push('/login'))
    //     .catch(err =>
    //         dispatch({
    //             type: GET_ERRORS,
    //             payload: err.response.data
    //         })
    //     );

    // axios
    //     .get('/api/dashboard/all')
    //     .then(response => {this.setState({clients: response.data})
    // })
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  ////////////// ADD FELLOW ////////////////////////////////

  homeFunc() {
    this.setState({ homeActive: true, addFellowActive: false });
  }

  addFellow() {
    this.setState({ homeActive: false, addFellowActive: true });
    this.props.history.push("/addfellow");
  }


  ///// HANDLE SEARCH ////////////////////////////

  handleSearchValue = value => {
    this.setState({ searchValue: value })
  }

  handleClientSearch = value => {

    if (value.length < 1) {
      this.setState({
        results: this.state.results,
      })
    }else{
      this.setState({
        results: value,
      })
    }
  }

  handleSearchReset = () => {
    this.setState({ results: this.state.clients, value: ''})
  }
  ////////////////////////////////////////////////


  sort = (field, direction) => {
      this.setState({
        results: this.state.results.sort(function(a, b) {
          if (a[field] > b[field]) {
              return direction == 'DESC' ? 1 : -1;
          } else if (a[field] < b[field]) {
              return direction == 'DESC' ? -1 : 1;
          }
          return 0;
        }),

        sortDirection: direction == 'DESC' ? 'ASC' : 'DESC'
      })
  }

  render() {
    var clients = this.state.results;
    var sortText = this.state.sortDirection === 'DESC' ? "Sort Names A-Z" : "Sort Names Z-A"
    

    return (
      <div>
        <div className="ui inverted segment">
          <div className="ui inverted secondary pointing menu">
            <a
              className={this.state.homeActive ? "item active" : "item"}
              onClick={() => this.homeFunc()}
            >
              Home
            </a>
            <a
              className={this.state.addFellowActive ? "item active" : "item"}
              onClick={() => this.addFellow()}
            >
              Add Fellow
            </a>
            <a
              href="/login"
              className="right menu item"
              onClick={this.onLogoutClick.bind(this)}
            >
              <div className="ui primary button">Log Out</div>
            </a>
          </div>
        </div>
        <h1>Client List</h1>

        <div className="same-row">
          <SearchClients clients={this.state.clients} value={this.state.searchValue} results={this.state.results} handleClientSearch={this.handleClientSearch} handleSearchReset={this.handleSearchReset} handleSearchValue={this.handleSearchValue}/>
          <Button type="button" color="green" onClick={(e) => this.sort('last_name', this.state.sortDirection)}>{sortText}</Button>
        </div>​
        <div />
        <div className="ui filterContainer catalogue_items">
          <Item.Group>
            {clients.map((client, index) => (
              <Client
                key={index}
                first_name={client.first_name}
                last_name={client.last_name}
                email={client.email}
                phone={client.phone}
                count={index + 1}
              />
            ))}
          </Item.Group>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);

