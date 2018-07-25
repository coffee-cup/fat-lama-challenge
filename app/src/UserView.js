import React, { Component } from 'react';
import 'react-table/react-table.css';

import { getUser } from './api.js';
import Title from './components/Title.js';
import ProfileImage from './components/ProfileImage.js';

class UserView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.match.params.id,
      user: {}
    };
  }

  componentWillMount() {
    getUser(this.state.userId).then(user => {
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state || {};

    return (
      <div className="user-view">
        <Title>
          {user.firstName} {user.lastName}
        </Title>
        <ProfileImage src={user.profileImgUrl} />
        <p>{user.email}</p>
        <p>{user.telephone}</p>
      </div>
    );
  }
}

export default UserView;
