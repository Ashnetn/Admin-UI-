import { Component } from "react";
import UserDetails from "../UserDetails";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "Failure",
};

class UserList extends Component {
  state = {
    inputSearch: "",
    userDetailsData: [],
    apiStatus: apiStatusConstants.initial,
    isActive: false,
    selectedIdList: [],
  };

  addToSelectedList = (id) => {
    const { selectedIdList } = this.state;
    const newList = [...selectedIdList, id];
    this.setState({ selectedIdList: newList });
  };

  removeFromSelectedList = (id) => {
    const { selectedIdList } = this.state;
    const newList = selectedIdList.filter((eachItem) => eachItem !== id);
    this.setState({ selectedIdList: newList });
  };

  onClickDeleteUserDetails = () => {
    const { selectedIdList } = this.state;

    selectedIdList.forEach((eachItem) => {
      this.removeUserDetailsData(eachItem);
    });
  };

  onChangeInput = (event) => {
    this.setState({ inputSearch: event.target.value });
  };

  onChangeActiveId = () => {
    this.setState((prevState) => ({ isActive: !prevState.isActive }));
  };

  removeUserDetailsData = (id) => {
    const { userDetailsData } = this.state;
    const updatedData = userDetailsData.filter(
      (eachUser) => eachUser.id !== id
    );

    this.setState({ userDetailsData: updatedData });
  };

  componentDidMount() {
    this.getUserDetailsfromApi();
  }

  getUserDetailsfromApi = async () => {
    this.setState({ apiStatus: apiStatusConstants.loading });
    const apiUrl =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json?offset=0&limit=10";
    const response = await fetch(apiUrl);
    if (response.ok) {
      const fetchedData = await response.json();
      this.setState({
        userDetailsData: fetchedData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderFilteredData = (userData) => {
    const { inputSearch } = this.state;
    if (inputSearch !== "") {
      const filteredData = userData.filter((eachItem) => {
        switch (true) {
          case eachItem.name
            .toLowerCase()
            .startsWith(inputSearch.toLowerCase()):
            return eachItem;

          case eachItem.role
            .toLowerCase()
            .startsWith(inputSearch.toLowerCase()):
            return eachItem;

          case eachItem.email
            .toLowerCase()
            .startsWith(inputSearch.toLowerCase()):
            return eachItem;

          default:
            return null;
        }
      });
      return filteredData;
    } else {
      return userData;
    }
  };

  renderUserDetailsList = () => {
    const { userDetailsData, isActive } = this.state;
    const FilteredData = this.renderFilteredData(userDetailsData);

    return (
      <div className="user-table-container">
        <table className="user-table">
          <tbody>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={this.onChangeActiveId}
                ></input>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>

            {FilteredData.length !== 0 ? (
              FilteredData.map((eachUserInfo) => (
                <UserDetails
                  userDetailsList={eachUserInfo}
                  key={eachUserInfo.id}
                  removeUserDetailsData={this.removeUserDetailsData}
                  isActive={isActive}
                  removeFromSelectedList={this.removeFromSelectedList}
                  addToSelectedList={this.addToSelectedList}
                />
              ))
            ) : (
              <tr className="found-nothing-text">No data found</tr>
            )}
          </tbody>
        </table>
        <div className="delete-button-container">
          <button
            type="button"
            className="delete-button"
            onClick={this.onClickDeleteUserDetails}
          >
            Delete Selected
          </button>
          <div className="pagination-container">
            <button type="button" className="pagination-button">
              Prev
            </button>
            <button type="button" className="pagination-button">
              First
            </button>
            <button type="button" className="pagination-button">
              Last
            </button>
            <button type="button" className="pagination-button">
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  renderFailureView = () => (
    <div className="react-loader-container">
      <img
        className="error-image"
        src="./assets/error404.svg"
        alt="not found"
      />
      <button
        type="button"
        className="try-again-button"
        onClick={this.getUserDetailsfromApi}
      >
        Try Again
      </button>
    </div>
  );

  renderReactLoader = () => (
    <div className="react-loader-container">
      <Loader type="TailSpin" color="#1eab49" height={50} width={50} />
    </div>
  );

  renderUserListBasedOnApi = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserDetailsList();

      case apiStatusConstants.failure:
        return this.renderFailureView();

      case apiStatusConstants.loading:
        return this.renderReactLoader();

      default:
        return null;
    }
  };

  render() {
    const { inputSearch } = this.state;

    return (
      <div className="app-container">
        <nav className="navbar">
          <p className="logo">Admin UI</p>
        </nav>
        <div className="heading-search-container">
          <p className="heading">User List</p>
          <input
            type="search"
            value={inputSearch}
            className="input-search"
            placeholder="Search by Name, Email or Role"
            onChange={this.onChangeInput}
          />
        </div>

        {this.renderUserListBasedOnApi()}

        <div className="empty-container"></div>
        <footer className="footer-container">
          <p className="footer-info">2021 Admin UI for Geektrust</p>
        </footer>
      </div>
    );
  }
}

export default UserList;
