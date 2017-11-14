import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import { Link } from 'react-router-dom';
import {
  parseDateTime,
  // characterLimit
} from '../../../util/helper_methods.js';

import BlogLinkActions from './blog_link_actions';
import AboutBlogAuthor from './about_blog_author';
import BlogLikesForm from '../../likes/blog_likes_form';
import BlogBookmarkForm from '../bookmarks/blog_bookmark_form';

const BlogLink = ({ blog, isUserBlogs, currentUser }) => {
axios
    .get(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD"
    )
    .then(res => {
      this.bit = res.data.BTC.USD;
      return this.bit;
    })
    .catch(error => {
      console.log(error);
    });

    const bitcoin = blog.coins;
    const totalValue = this.bit * blog.coins;
    console.log(blog.id);

    return !currentUser ? <div></div> : (
      <tr>
      <td id='blog-link-title'>
        <Link to={"/blogs/show/"+ blog.id}>{ blog.title }</Link>
      </td>
      <td id='blog-link-body-intro'>
        {/* blog.body is not a string anymore, but an object so it won't display */}
        { blog.blogIntro }
      </td>
      <td>
        {blog.coins}
      </td>
      <td>
      <BlogLinkActions/>
      </td>
      </tr>

  );
};

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
});

export default connect(mapStateToProps, null)(BlogLink);
