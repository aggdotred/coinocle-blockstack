import React from 'react';
import { withRouter } from 'react-router';
import { isUserSignedIn, loadUserData } from 'blockstack';
import axios from "axios";

// Components
import SubmitBlogButton from './submit_blog_button';
import ImageUploadButton from './image_upload_button';
import MediumEditor from '../../medium-editor/editor';

import TagForm from '../../tags/tag_form';
import BlogFormModal from './blog_form_modal';

import Blog from '../../../models/blog.js';
import $ from 'jquery';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';

import {
  Editor,
  createEditorState
} from 'medium-draft';

import { createToken } from '../../../util/helper_methods';
import mediumDraftImporter from 'medium-draft/lib/importer';

class BlogForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: createToken(),
      title: '',
      blogIntro: '',
      coins: "",
      body: createEditorState(),
      imageUrl: '',
      authorId: loadUserData().username,
      authorImageUrl: '',
      updatedAt: '',
      tags: {},
      isSubmitButtonActive: true,
      showBlogFormModal: true,
      btcprice: ""
    };

    this.updateEditorState = editorState => { this.setState({ body: editorState }); }
    this.actionType = props.history.location.pathname === '/blogs/new' ? 'Publish' : 'Update';
    this.setStateToEdit = this.setStateToEdit.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
    this.addImage = this.addImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (!isUserSignedIn()) this.props.history.push('/signin');
    if (Object.keys(this.props.blogs).length > 0) this.setStateToEdit();
  }

  componentWillReceiveProps(nextProps) {
    this.setStateToEdit(nextProps);
    this.setState({ authorImageUrl: nextProps.currentUser.imageUrl });
  }

  setStateToEdit(nextProps = this.props) {
    if (this.actionType === 'Update') {
      let blogToEditId = this.props.history.location.pathname.substring(12);
      let blogToEdit = this._parseBlogBodyToEditor(nextProps.blogs[blogToEditId]);

      this.setState({
        id: blogToEdit.id,
        title: blogToEdit.title,
        blogIntro: blogToEdit.blogIntro,
        coins: blogToEdit.coins,
        body: blogToEdit.body,
        imageUrl: blogToEdit.imageUrl,
        authorId: blogToEdit.authorId,
        authorImageUrl: blogToEdit.authorImageUrl,
        updatedAt: blogToEdit.updatedAt,
        tags: blogToEdit.tags,
        btcprice: blogToEdit.btcprice,
      });
    }
  }

  _parseBlogBodyToEditor(blog) {
    let blogBodyContentState;
    blog.body = createEditorState(blog.body);
    return blog;
  }

  addImage(imageUrl) {
    this.setState({ imageUrl: imageUrl });
  }

  setTags(tags) {
    this.setState({ tags: tags });
  }

  handleChange(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  hasErrors() {
    // Refactor this function to use react state
    let hasErrors = false;

    if (this.state.title.length <= 0) {
      hasErrors = true;
      $('#blog-title-error').fadeIn();
      $('#blog-title-label').addClass('outline-red');
    } else {
      $('#blog-title-error').fadeOut();
      $('#blog-title-label').removeClass('outline-red');
    }

    if (!this.state.body.getCurrentContent) this.state.body = convertFromRaw(this.state.body);



    return hasErrors;
  }

  processForm() {
    let blog = this.state;
    this.setState({ isSubmitButtonActive: false });

    // Should only make a new blog if this.actionType === 'publish'
    blog = new Blog(blog);

    let bodyContent = blog.body.getCurrentContent();
    blog.body = convertToRaw(bodyContent);

    // Add new Blog to blogs state and save Blogs
    this.props.blogs[blog.id] = blog;
    this.props.saveBlogs(this.props.blogs);

    // Add new Blog to currentUser's authoredBlogs and save Users
    this.props.currentUser.authoredBlogs[blog.id] = blog;
    this.props.saveUsers(this.props.users);

    // Create Tags for blogTags if Tag doesn't exist else add blog to Tag.blogs
    this.props.saveTags({
      blogTags: blog.tags,
      existingTags: this.props.tags
    });
  }

  toggleBlogFormModal(e) {
    e.preventDefault();
    if (!this.hasErrors()) {
      this.setState({ showBlogFormModal: !this.state.showBlogFormModal });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.processForm()
  }

  render() {

    return (
      <div className="addWallet">
        <h1 className="text-center">Add a wallet & starting balance</h1>
        <div className="text-center">
        <form id='blog-form'>

          <div><label id='blog-title-label' className="wallet-input">
            <h3>Wallet Name</h3>

            <input type='text'
              id='blog-title-input'
              className="wallet-input"
              onChange={ this.handleChange('title') }
              value={ this.state.title }
              placeholder='Title'
              maxLength='50'
            />
          </label></div>
          <div><label id='blog-title-label' className="wallet-input">
            <h3>Total Coins</h3>

            <input type='number'
              id='blog-title-input'
              className="wallet-input"
              onChange={ this.handleChange('coins') }
              value={ this.state.coins }
              placeholder='Total Coins'

            />
          </label></div>


          <BlogFormModal
            state={ this.state }
            handleChange={ this.handleChange }
            setTags={ this.setTags.bind(this) }
            handleSubmit={ this.handleSubmit.bind(this) }
            actionType={ this.actionType }
            toggleBlogFormModal={ this.toggleBlogFormModal.bind(this) }
          />
        </form>
        </div>
      </div>
    );
  }
}

export default withRouter(BlogForm);

//<label id='blog-body-label' className='blog-form-label position-relative'>
  //<h3></h3>
  //<MediumEditor
    //className="hide"
    //editorState={this.state.body}
    //updateEditorState={this.updateEditorState.bind(this)}
//  />
//</label>
