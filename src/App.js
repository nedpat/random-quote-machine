import React from "react";
import axios from "axios";
import Quote from "./components/Quote";
import Button from "./components/Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./scss/App.scss";

library.add(faTwitterSquare, faGithubSquare, faQuoteLeft);

export default class App extends React.Component {
  state = {
    quote: "",
    author: "",
    search: "",
    fade: "false",
    urlImage: "",
    color: "",
  };

  componentDidMount() {
    this.fetchRandomQuote();
    this.getImage();
  }

  componentDidUpdate() {
    this.setBodyStyle();
  }

  getRandomNumber(number) {
    return Math.floor(Math.random() * number);
  }

  fetchRandomQuote = () => {
    axios
      .get("https://type.fit/api/quotes")
      .then((response) => {
        let randomNumber = this.getRandomNumber(1643);
        const { text, author } = response.data[randomNumber];
        this.setState({
          quote: text,
          author,
          fade: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getImage = () => {
    const urlId = this.getRandomNumber(500);
    const url = `https://picsum.photos/id/${urlId}/1920/1080`;

    this.setState({ urlImage: url });
  };

  getHexColor = () => {
    let color = "#" + Math.floor(Math.random() * 16777215).toString(16);

    this.setState({ color: color });
  };

  setBodyStyle = () => {
    const bodyStyle = document.body.style;

    bodyStyle.background = `url(${this.state.urlImage}) no-repeat center`;
    bodyStyle.backgroundSize = "cover";
    bodyStyle.backgroundColor = this.state.color;
  };

  render() {
    const quoteBtnText = "New quote";

    return (
      <div className="app d-flex min-vh-100 align-items-center justify-content-center container">
        <section
          id="quote-box"
          className="text-center text-lg-left p-5 bg-white rounded"
        >
          <div className="row">
            <div className="col-md-12 mb-4 mb-md-0">
              <div>
                <a
                  href="https://github.com/nedpat/random-quote-machine"
                  target="_blank"
                  rel="noreferrer"
                  id="github-link"
                >
                  <FontAwesomeIcon
                    className="float-right icon"
                    icon={faGithubSquare}
                    size="3x"
                    color={this.state.color}
                  />
                </a>
              </div>
              <div>
                <a
                  href="https://twitter.com/intent/tweet"
                  target="_blank"
                  rel="noreferrer"
                  id="tweet-quote"
                  className="twitter-share-button icon"
                >
                  <FontAwesomeIcon
                    className="float-right icon"
                    icon={faTwitterSquare}
                    size="3x"
                    color={this.state.color}
                  />
                </a>
              </div>
              <Quote
                quote={this.state.quote}
                author={this.state.author}
                fade={this.state.fade}
                fadeState={() => this.setState({ fade: false })}
                color={this.state.color}
              />
              <div className="float-left">
                <Button
                  name={quoteBtnText}
                  search={this.fetchRandomQuote}
                  getImage={this.getImage}
                  getColor={this.getHexColor}
                  color={this.state.color}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
