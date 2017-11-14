import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { deleteBlog } from '../../../actions/blog_actions';
import { saveUsers } from '../../../actions/user_actions';

import TrashSVG from 'react-icons/lib/fa/trash';
import EditSVG from 'react-icons/lib/fa/edit';
import DeleteBlogModal from './delete_blog_modal';
import BlogLink from "./blog_link";

class BlogLinkActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleteButtonActive: true,
      modalActiveState: false,
      showModal: false
    };

    this.redirectToEdit = this.redirectToEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.hideModal();
    this.setState({ isDeleteButtonActive: true });
  }

  redirectToEdit(e) {
    e.stopPropagation();
    this.props.history.push(`/blogs/edit/${this.props.blog.id}`);
  }

  handleDelete() {
    this.props.deleteBlog(this.props.blog.id);
    this.setState({ isDeleteButtonActive: false });

    let blogToDeleteId = this.props.blog.id;
    let currentUser = this.props.currentUser;

    // Delete blog from currentUser's authored, bookmarked and liked blogs
    delete currentUser.authoredBlogs[blogToDeleteId];
    delete currentUser.bookmarkedBlogs[blogToDeleteId];
    delete currentUser.likedBlogs[blogToDeleteId];

    this.props.saveUsers(this.props.users);
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    // If it isn't the current user's blogs, don't render the blog link actions
    return (
      <div id='blog-link-actions' className='flex-between align-center'>

        <button id='blog-link-action' className='btn' onClick={ this.handleDelete }>
          <TrashSVG id='blog-link-svg' className='transition-2s-ease-in' size={24}/>
        </button>

        <DeleteBlogModal
          blog={ this.props.blog }
          handleDelete={ this.handleDelete }
          showModal={ this.state.showModal }
          isDeleteButtonActive={ this.state.isDeleteButtonActive }
          hideModal={ this.hideModal }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  users: state.users.index
});

const mapDispatchToProps = dispatch => ({
  deleteBlog: id => dispatch(deleteBlog(id)),
  saveUsers: users => dispatch(saveUsers(users))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogLinkActions));
