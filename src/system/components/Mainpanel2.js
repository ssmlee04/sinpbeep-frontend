/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import Mainpanel2Pill from './../../system/components/Mainpanel2Pill'

class Mainpanel2 extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
  };

  scrollTop() {
    $("html, body").animate({ scrollTop: 0 }, "slow", function () {});
  }

  render() {
    const colwidths = [
      ["30", "30", "30"],
      ["28", "30", "32"],
      ["30", "28", "32"],
      ["26", "32", "32"]
    ];
    const places = [{  
       subtitle:"Fantastic!",
       message:"click to read more..",
       shop_id:"556d5470fc635e47359cd441",
       name:"ゆで太郎Yudetarou蕎麥麵",
       name_en:"ゆで太郎Yudetarou蕎麥麵",
       image:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd54%2F70f%2Fc635e47359cd441_large.jpg",
       seoname:"ゆで太郎yudetarou蕎麥麵-taiwan-taipeicity-556d5470fc635e47359cd441",
       thumb:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd54%2F70f%2Fc635e47359cd441_small.jpg",
       _id:"5663d8642ea3c0fb43324fcd"
    },
    {  
       subtitle:"Fantastic!",
       message:"click to read more..",
       shop_id:"556d4f5dfc635e47359cd326",
       name:"Tako將",
       subname:"大直店",
       name_en:"TAKO將",
       image:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd4f%2F5df%2Fc635e47359cd326_large.jpg",
       seoname:"tako將-taiwan-taipeicity-556d4f5dfc635e47359cd326",
       thumb:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd4f%2F5df%2Fc635e47359cd326_small.jpg",
       _id:"5663d8642ea3c0fb43324fcc"
    },
    {  
       subtitle:"Fantastic!",
       message:"click to read more..",
       shop_id:"556d6ce8fc635e47359cd80e",
       name:"明月 湯包",
       subname:"基隆路店",
       name_en:"明月 湯包",
       image:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd6c%2Fe8f%2Fc635e47359cd80e_large.jpg",
       seoname:"明月湯包-taiwan-taipeicity-556d6ce8fc635e47359cd80e",
       thumb:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd6c%2Fe8f%2Fc635e47359cd80e_small.jpg",
       _id:"5663d8642ea3c0fb43324fcb"
    },
    {  
       subtitle:"Fantastic!",
       message:"click to read more..",
       shop_id:"556d6a6afc635e47359cd78e",
       name:"頂味執餃",
       name_en:"頂味執餃",
       image:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd6a%2F6af%2Fc635e47359cd78e_large.jpg",
       seoname:"頂味執餃-taiwan-taipeicity-556d6a6afc635e47359cd78e",
       thumb:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd6a%2F6af%2Fc635e47359cd78e_small.jpg",
       _id:"5663d8642ea3c0fb43324fca"
    },
    {  
       subtitle:"Fantastic!",
       message:"click to read more..",
       shop_id:"556d59d0fc635e47359cd571",
       name:"韓琳",
       name_en:"韓琳",
       image:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd59%2Fd0f%2Fc635e47359cd571_large.jpg",
       seoname:"韓琳-taiwan-taipeicity-556d59d0fc635e47359cd571",
       thumb:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd59%2Fd0f%2Fc635e47359cd571_small.jpg",
       _id:"5663d8642ea3c0fb43324fc9"
    },
    {  
       subtitle:"Fantastic!",
       message:"click to read more..",
       shop_id:"556d5881fc635e47359cd503",
       name:"Chimac175",
       name_en:"Chimac175",
       image:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd58%2F81f%2Fc635e47359cd503_large.jpg",
       seoname:"chimac175-taiwan-taipeicity-556d5881fc635e47359cd503",
       thumb:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd58%2F81f%2Fc635e47359cd503_small.jpg",
       _id:"5663d8642ea3c0fb43324fc8"
    },
    {  
       subtitle:"Fantastic!",
       message:"click to read more..",
       shop_id:"556d206f58603e48012363ec",
       name:"羅浮宮",
       subname:"福華飯店",
       name_en:"羅浮宮",
       image:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd20%2F6f5%2F8603e48012363ec_large.jpg",
       seoname:"羅浮宮-taiwan-taipeicity-556d206f58603e48012363ec",
       thumb:"https://d34ou6gzeud9fg.cloudfront.net/images%2F556%2Fd20%2F6f5%2F8603e48012363ec_small.jpg",
       _id:"5663d8642ea3c0fb43324fc7"
    },
    {  
       subtitle:"Fantastic!",
       message:"click to read more..",
       shop_id:"556e76e00cfaa9fe78080b7a",
       name:"777咖啡",
       name_en:"777咖啡",
       thumb:"https://d34ou6gzeud9fg.cloudfront.net/images%2F2ea%2F3c0%2Ffb4%2F3324fc4",
       image:"https://d34ou6gzeud9fg.cloudfront.net/images%2F2ea%2F3c0%2Ffb4%2F3324fc3",
       seoname:"777咖啡-taiwan-taipeicity-556e76e00cfaa9fe78080b7a",
       _id:"5663d8642ea3c0fb43324fc6"
    },
    {  
       subtitle:"Fantastic!",
       message:"click to read more..",
       shop_id:"553498ed43f94e4856bde7e4",
       name:"Danny & Company",
       name_en:"Danny & Company",
       image:"https://d34ou6gzeud9fg.cloudfront.net/images%2F553%2F498%2Fed4%2F3f94e4856bde7e4_large.jpg",
       seoname:"danny-company-taiwan-taipei-steak",
       thumb:"https://d34ou6gzeud9fg.cloudfront.net/images%2F553%2F498%2Fed4%2F3f94e4856bde7e4_small.jpg",
       _id:"5663d8642ea3c0fb43324fc5"
    }]

    const { user } = this.props;
    const that = this;
    const mainPanel2Style = {
      backgroundColor: "#efefef",
      paddingTop: "30px",
      paddingBottom: "30px"
    };

    const eachPanelRow = function(d, i){
      return (
      <div className="container-fluid" key={i}>
      <div className="row">
        <div className="col-lg-1"></div>
        <div className="col-lg-10">
          <div className="row">
          <div className="c4"></div>
          {d.map(function(d, j){
            let place = places && places.length && places[i * 3 + j];
            if (place) return <Mainpanel2Pill place={place} width={d} user={user} key={"mainpanel22-" + j}/>
          })}
          </div>
        </div>
        <div className="col-lg-1"></div>
      </div>
      </div>
      );
    };

    const ButtonGoSearch = function(){
      return (
        <div style={{paddingTop: "20px", textAlign: "center"}}>
          <button className="btn btn-success" onClick={that.scrollTop.bind(that)}>
            mainpanel.searchmore.......
          </button>
        </div>
      );
    };

    return (
      <div style={mainPanel2Style}>
        <div className="row quotefont">
          <div className="col-md-offset-1 col-md-10">
          <h3>mainpanel.title</h3>
          </div>
        </div>
        {colwidths.map(eachPanelRow)}
        {ButtonGoSearch()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // user: state.user
})
export default connect((mapStateToProps), {
  fetchProfile
})(Mainpanel2)
