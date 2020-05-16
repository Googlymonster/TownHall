import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// Redux
import { connect } from "react-redux";
import { likeShout, unlikeShout } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedShout = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.shoutId === this.props.shoutId)
    )
      return true;
    else return false;
  };
  likeShout = () => {
    this.props.likeShout(this.props.shoutId);
  };
  unlikeShout = () => {
    this.props.unlikeShout(this.props.shoutId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedShout() ? (
      <MyButton tip="Undo like" onClick={this.unlikeShout}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeShout}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  likeShout: PropTypes.func.isRequired,
  unlikeShout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeShout,
  unlikeShout,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);

