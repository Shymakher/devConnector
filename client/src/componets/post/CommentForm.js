import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addComment, deleteComment} from "../../actions/post";

const CommentForm = ({addComment, deleteComment, postId}) => {
    const [text, setText] = useState('');
    //comment
    return (
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a comment</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={e => {
            e.preventDefault();
            addComment(postId, {text});
            setText('');
          }}
        >
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a Post"
            required
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

export default connect(null, {addComment, deleteComment})(CommentForm);