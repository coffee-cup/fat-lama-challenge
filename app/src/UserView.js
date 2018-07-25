import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { getUser } from './api.js';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Title from './components/Title.js';

const ProfileImage = styled.img`
  max-width: 12rem;
  max-height: 12rem;
`;

class UserView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.match.params.id,
      user: {}
    };
    console.log(this.state);
  }

  componentWillMount() {
    getUser(this.state.userId).then(user => {
      console.log(user);
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;

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
