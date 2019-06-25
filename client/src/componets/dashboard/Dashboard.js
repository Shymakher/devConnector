import React, {Fragment, useEffect} from 'react';
import {deleteAccount, getCurrentProfile} from "../../actions/profile";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experiences from './Experience';
import Educations from './Education';

const Dashboard = ({auth: {user}, profile: {profile, loading}, getCurrentProfile, deleteAccount}) => {
  useEffect( () => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ?
    <Spinner/> :
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"/> Welcome {user && user.name}
      </p>
      {profile !==null ?
        <Fragment>
          <DashboardActions/>
          <Experiences experience={profile.experience}/>
          <Educations education={profile.education}/>

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"/> Delete My Account
            </button>
          </div>

        </Fragment> :
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
        </Fragment>}
    </Fragment>
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = ({auth, profile}) => ({
  auth,
  profile
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);