import React, {Component} from "react";
import Joke from "./Joke";
import axios from "axios";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    try {
      let newJokes = [];
      while (newJokes.length < this.props.numJokesToGet) {
        let response = await axios.get("https://icanhazdadjoke.com/", {
          headers: {Accept: "application/json"},
        });
        //extract id and joke from response.data
        let {id, joke} = response.data;
        let duplicateJoke = newJokes.map((j) => {
          return j.id === id;
        });
        let seenJoke = this.state.jokes.map((j) => {
          return j.id === id;
        });

        if (!seenJoke.includes(true) && !duplicateJoke.includes(true))
          newJokes.push({id: id, text: joke, votes: 0});
      }
      this.setState(
        (st) => ({
          loading: false,
          jokes: [...st.jokes, ...newJokes],
        }),
        () =>
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      alert(e);
      this.setState({loading: false});
    }
  }

  handleVote(id, delta) {
    this.setState(
      (st) => ({
        jokes: st.jokes.map((j) =>
          j.id === id ? {...j, votes: j.votes + delta} : j
        ),
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  handleClick() {
    this.setState({loading: true}, this.getJokes);
  }

  //   upVote(id) {
  //     this.handleVote(id, 1);
  //   }

  //   downVote(id) {
  //     this.handleVote(id, -1);
  //   }
  render() {
    let sortedJokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="JokeList-title">Loading...</h1>
        </div>
      );
    }
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
          <button className="JokeList-getmorebutton" onClick={this.handleClick}>
            Fetch Jokes
          </button>
        </div>

        <div className="JokeList-jokes">
          {sortedJokes.map((j) => (
            <Joke
              text={j.text}
              votes={j.votes}
              key={j.id}
              upVote={() => this.handleVote(j.id, 1)}
              downVote={() => this.handleVote(j.id, -1)}
              id={j.id}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default JokeList;
