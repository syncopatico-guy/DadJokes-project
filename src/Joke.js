import React, {Component} from "react";
import "./Joke.css";

class Joke extends Component {
  getReaction() {
    let {votes} = this.props;
    if (votes >= 15) {
      return {
        class: "em em-rolling_on_the_floor_laughing",
        label: "Rolling on the floor laughing emoji",
        color: "#4CAF50",
      };
    } else if (votes >= 12) {
      return {
        class: "em em-laughing",
        label: "Laughing emoji",
        color: "#8BC34A",
      };
    } else if (votes >= 9) {
      return {
        class: "em em-smiley",
        label: "Smiling emoji",
        color: "#CDDC39",
      };
    } else if (votes >= 6) {
      return {
        class: "em em-slightly_smiling_face",
        label: "Slightly smiling emoji",
        color: "#FFEB3B",
      };
    } else if (votes >= 3) {
      return {
        class: "em em-neutral_face",
        label: "Neutral face emoji",
        color: "#FFC107",
      };
    } else if (votes >= 0) {
      return {
        class: "em em-confused",
        label: "Confused emoji",
        color: "#FF9800",
      };
    } else {
      return {
        class: "em em-angry",
        label: "Angry emoji",
        color: "#f44336",
      };
    }
  }
  render() {
    let {text, votes, id, upVote, downVote} = this.props;
    let reaction = this.getReaction();
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={upVote} />
          <span className="Joke-votes" style={{borderColor: reaction.color}}>
            {votes}
          </span>
          <i className="fas fa-arrow-down" onClick={downVote} />
        </div>
        <div className="Joke-text">{text}</div>
        <div className="Joke-smiley">
          <i className={reaction.class} aria-label={reaction.label}></i>
        </div>
      </div>
    );
  }
}
export default Joke;
