import { Component } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";

class UserDetails extends Component {
  state = { inputName: "", inputEmail: "", inputRole: "", isCheched: false };

  componentDidMount() {
    const { userDetailsList, isActive } = this.props;
    const { name, email, role } = userDetailsList;
    this.setState({
      inputName: name,
      inputEmail: email,
      inputRole: role,
      isCheched: isActive,
    });
  }

  onClickChecked = () => {
    this.setState((prevState) => ({ isCheched: !prevState.isCheched }));
    const { isCheched } = this.state;
    const { id } = this.props.userDetailsList;
    const { addToSelectedList, removeFromSelectedList } = this.props;
    isCheched ? removeFromSelectedList(id) : addToSelectedList(id);
  };

  onClickDeleteUser = () => {
    const { removeUserDetailsData } = this.props;
    const { id } = this.props.userDetailsList;
    removeUserDetailsData(id);
  };

  onChangeName = (event) => {
    this.setState({ inputName: event.target.value });
  };

  onChangeEmail = (event) => {
    this.setState({ inputEmail: event.target.value });
  };
  onChangeRole = (event) => {
    this.setState({ inputRole: event.target.value });
  };

  render() {
    const { inputName, inputEmail, inputRole, isCheched } = this.state;

    const tableClass = isCheched ? "bg-grey" : "bg-black";

    return (
      <tr className={tableClass}>
        <td>
          <input
            type="checkbox"
            checked={isCheched}
            onChange={this.onClickChecked}
          />
        </td>
        <td>{inputName}</td>
        <td>{inputEmail}</td>
        <td>{inputRole}</td>
        <td className="edit-delete-container">
          <Popup
            trigger={
              <button type="button" className="edit-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
            }
            modal
            nested
          >
            {(close) => (
              <div className="modal">
                <p className="heading"> Edit User </p>

                <input
                  className="modal-input"
                  value={inputName}
                  onChange={this.onChangeName}
                />
                <input
                  className="modal-input"
                  value={inputEmail}
                  onChange={this.onChangeEmail}
                />
                <select
                  className="modal-input"
                  value={inputRole}
                  onChange={this.onChangeRole}
                >
                  <option>admin</option>
                  <option>member</option>
                </select>

                <div className="modal-actions-container">
                  <button
                    className="close-button"
                    onClick={() => {
                      console.log("modal closed ");
                      close();
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </Popup>

          <button
            type="button"
            className="delete-icon"
            onClick={this.onClickDeleteUser}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </td>
      </tr>
    );
  }
}

export default UserDetails;
