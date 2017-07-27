import React, {Component} from 'react';
import LeaderBoard from './LeaderBoard'
import Chart from './Chart'
import NewsFeed from './NewsFeed'
import Vote from './VoteBanner'
import Header from './Header'
import VoteModal from './Modal'
// import matchStore from '../store/matchStore'
// import * as matchAction from "../actions/action"
import '../css/header.css'
import '../css/dashboard.css'
import '../css/popupStyles.css'
import fire from '../fire'

let user;
export default class Dashboard extends Component {
 constructor(props) {
    super(props);
    this.state = {
      matches: [],
      showModal: false
    };
    this.renderVote = this
      .renderVote
      .bind(this);
  }
  componentDidMount() {
    //matchAction.GetMatches();
    
  }
  componentWillMount() {
    /* matchStore.on("change", () => {
      this.setState({
        matches: matchStore.getAll()
      })
    }) */
    const matches =[];
    const matchesRef = fire.database().ref('match');
    user = fire.auth().currentUser;
    matchesRef
      .on("child_added", dataSnapshot => {
          matches
          .push(dataSnapshot.val());
        this.setState({matches: matches});
        console.log(dataSnapshot.val());
      });
  }
    recordVote = (e) => {
    if (e.target.name === this.state.matches[0]._id) {
      this.setState({vote1:e.target.value});
    }
    if (e.target.name === this.state.matches[1]._id) {
      this.setState({vote2:e.target.value});
    }
  }
   submitVote=()=>{
    console.log(this.state.vote1,this.state.vote2);
    let vote={
      vote1:this.state.vote1,
      vote2:this.state.vote2
    }
    alert("vote Submitted")
    // matchAction.recordVotes(vote);
  }
  renderVote = () => {
    let count = 0;
    let match = [];
    this
      .state
      .matches
      .map(function (obj, i) {
        if (obj.date === new Date().toLocaleDateString()) {
          count = count + 1;
          match.push(obj);
        }
        return 0;
      });
    if (count === 1) {
      return <div className="clearfix">
        <div className="col-sm-12"><Vote
          match={match}
          team1={match[0].team1}
          team2={match[0].team2}
          date={match[0].date}
          Venue={match[0].Venue}
          time={match[0].time}
          shortName1={match[0].shortName1}
          shortName2={match[0].shortName2}
          recordVote={this
        .recordVote
        .bind(this)}
        submitVote={this
        .submitVote
        .bind(this)}/>
        </div>
      </div>;
    } else if (count === 2) {
      return <div className="clearfix">
        <div className="col-sm-6 vote-box"><Vote
        match={match}
          team1={match[0].team1}
          team2={match[0].team2}
          date={match[0].date}
          Venue={match[0].Venue}
          time={match[0].time}
          shortName1={match[0].shortName1}
          shortName2={match[0].shortName2}
          recordVote={this
        .recordVote
        .bind(this)}
        submitVote={this
        .submitVote
        .bind(this)}/>
        </div>
        <div className="col-sm-6"><Vote
        match={match}
          team1={match[1].team1}
          team2={match[1].team2}
          date={match[1].date}
          Venue={match[1].Venue}
          time={match[1].time}
          shortName1={match[1].shortName1}
          shortName2={match[1].shortName2}
          recordVote={this
        .recordVote
        .bind(this)}
        submitVote={this
        .submitVote
        .bind(this)}/>
        </div>
      </div>;
    } else {
      return null;
    }
  }
  render() {
    return (
      <div>
        
        <div className="row">
          <div className="col-sm-12">
            <Header user={user.email}/>
          </div>
        </div>
        <div className="row vote-box">
          <div className="col-sm-12">
            <div className="container">
              {this.renderVote()}
              <button
            type="button"
            className="btn btn-info"
            data-toggle="modal"
            data-target="#myModal">Vote Now</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="container">
              <h3>LeaderBoard</h3>
              <LeaderBoard></LeaderBoard>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="container">
              <h3>Chart Comparison</h3>
              <Chart></Chart>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="container">
              <h3>News Feed</h3>
              <NewsFeed></NewsFeed>
            </div>
          </div>
        </div>
      </div>
    );
  }
}