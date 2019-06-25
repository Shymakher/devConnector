import React/*, {Fragment}*/ from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Alert = ({alerts}) => {
  /*let codes = {};
  let errors = [];
  console.log("alerts", alerts);
  for (let error of alerts) {
    if (!codes[error.id]) {
      let element = [
        <div key={alert.id} className={`alert alert-${error.alertType}`}>
          {error.msg}
        </div>
      ];
      if(element){
        errors.push(element);
        codes[error.code] = true;
      }
    }
  }
  return (
    <Fragment>
      {
        errors.map((error, i) => (error))
      }
    </Fragment>
  );*/

  return alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));
}

Alert.propTypes = {
 alerts: PropTypes.array.isRequired
};

const mapStateToProps = ({alert}) => ({
  alerts: alert
});

export default connect(mapStateToProps, null)(Alert);