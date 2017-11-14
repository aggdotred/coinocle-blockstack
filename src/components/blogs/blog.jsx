import React from 'react';
import { connect } from 'react-redux';

import AboutUser from '../users/about_user';
import BodyDisplay from '../editor/editor';
import BlogLikesForm from '../likes/blog_likes_form';
import BlogBookmarkForm from './bookmarks/blog_bookmark_form';
import CommentForm from '../comments/comment_form';
import Comments from '../comments/comments';
import axios from "axios";
import {Line} from 'react-chartjs-2';

import MediumDraftExporter from 'medium-draft/lib/exporter';
import {
  setRenderOptions,
  blockToHTML,
  entityToHTML,
  styleToHTML,
} from 'medium-draft/lib/exporter';

import {
  Editor,
  createEditorState,
  convertFromRaw,
  Block,
} from 'medium-draft';

import { requestUsers } from '../../actions/user_actions';

global.createEditorState = createEditorState;


const newBlockToHTML = (block) => {
  const blockType = block.type;
  if (block.type === Block.ATOMIC) {
    if (block.text === 'E') {
      return {
        start: '<figure class="md-block-atomic md-block-atomic-embed">',
        end: '</figure>',
      };
    } else if (block.text === '-') {
      return <div className="md-block-atomic md-block-atomic-break"><hr/></div>;
    }
  }
  return blockToHTML(block);
};

const newEntityToHTML = (entity, originalText) => {
  if (entity.type === 'embed') {
    return (
      <div>
        <a
          className="embedly-card"
          href={entity.data.url}
          data-card-controls="0"
          data-card-theme="dark"
        >Embedded ― {entity.data.url}
        </a>
      </div>
    );
  }
  return entityToHTML(entity, originalText);
};

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blog: {},
      users: {}
    };

    this.exporter = setRenderOptions({
      styleToHTML,
      blockToHTML: newBlockToHTML,
      entityToHTML: newEntityToHTML,
    });

    this.setBlog = this.setBlog.bind(this);
  }

  componentDidMount() {
    this.setBlog();
    this.props.requestUsers();
  }

  componentWillReceiveProps(nextProps) {
    this.setBlog(nextProps);
    this.setState({ users: nextProps.users });
  }

  setBlog(nextProps = this.props) {
    let id = nextProps.history.location.pathname.substring(12);
    let blog = nextProps.blogs[id];
    if (blog) { this.setState({ blog: blog }); }
  }

  render() {
    let blog = this.state.blog;
    let author = this.state.users[blog.authorId];

    const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
    datasets: [
    {
      label: blog.title + " Performance",
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [3200, 3800, 4123, 4400, 4213, 4600, 5218, 5600, 5900, 6100]
    }
  ]
};


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

    if (!blog.body) return <div></div>;
    const editorState = createEditorState(blog.body);
    var currentContent = editorState.getCurrentContent();
    const renderedHTML = this.exporter(currentContent);
    let bitValue = "";
    if(blog.blogIntro === "Bitcoin"){
      bitValue = blog.coins * this.bit;
    }

    return !blog.body || !author ? <div></div> : (
    <div>
    <div className="chart">
      <Line data={data} />
    </div>
    <div className="row">
        <div className="col-md-6 login-box">
          <table className="table table-bordered table-striped table-hover">
            <thead>
            <tr>
              <th className="text-center"><strong>Transaction Date</strong></th>
              <th className="text-center"><strong>Buy/Sell</strong></th>
              <th className="text-center"><strong>Price Point</strong></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                09/20/2017
              </td>
              <td>
                Buy
              </td>
              <td>$4,900.23</td>
            </tr>
            <tr>
              <td>
                09/20/2017
              </td>
              <td>
                Buy
              </td>
              <td>$4,900.23</td>
            </tr>
            <tr>
              <td>
                09/20/2017
              </td>
              <td>
                Buy
              </td>
              <td>$4,900.23</td>
            </tr>
            <tr>
              <td>
                09/20/2017
              </td>
              <td>
                Buy
              </td>
              <td>$4,900.23</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6 login-box">
          <h3>Wallet Name</h3>
          <h4 id='blog-title' className='blog-show-section'>
            { blog.title }
          </h4>
          <h3>Coin Type</h3>
          <h4>{blog.blogIntro}</h4>
          <h3>Current Value</h3>
          <h4>{bitValue}</h4>

          {
            (!blog.imageUrl || blog.imageUrl.length === 0) ? <div></div> : (
              <div id='blog-img' className='blog-show-section'
                style={{ backgroundImage: `url(${blog.imageUrl})` }}>
              </div>
            )
          }

          <div id='blog-body' className='blog-show-section'>
            <div dangerouslySetInnerHTML={{ __html: renderedHTML }}></div>




          </div>


        </div>


      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  blogs: state.blogs.index,
  users: state.users.index,
});

const mapDispatchToProps = dispatch => ({
  requestUsers: () => dispatch(requestUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
