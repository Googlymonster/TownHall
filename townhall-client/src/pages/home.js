import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Shout from "../components/shout/Shout";
import Profile from "../components/profile/Profile";
import ShoutSkeleton from "../util/ShoutSkeleton";

import { connect } from "react-redux";
import { getShouts } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getShouts();
  }
  render() {
    const { shouts, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      shouts ? (
        shouts.map((shout) => <Shout shout={shout} key={shout.shoutId} />)
      ) : (
        <ShoutSkeleton />
      )
    ) : (
      <ShoutSkeleton />
    );
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getShouts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getShouts })(home);
