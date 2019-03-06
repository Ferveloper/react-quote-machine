import React, { Component } from 'react';
import './App.css';

const URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class App extends Component {
  state = { quotes: [], quote: '', index : null, loading : true }

  async componentDidMount() {
    const response = await fetch(URL);
    const json = await response.json();
    const quotes = json.quotes;
    const randomIndex = (Math.random() * (quotes.length - 1)).toFixed();
    this.setState({quotes : quotes, quote : quotes[randomIndex], index : randomIndex, loading : false})
  }

  render() {
    const text = this.state.quote.quote;
    const author = this.state.quote.author;
    if (this.state.loading === true) {
      return <div className="text">Loading...</div>
    }
    return (
      <div id="quote-box">
        <div id="text">{text}</div>
        <button id="new-quote" onClick={this.pickRandomQuote}>New Quote</button>
        <button id="tweet-quote">Tweet Quote</button>
        <div id="author">{author}</div>
      </div>
    );
  }

  pickRandomQuote = () => {
    var randomIndex
    do {
      randomIndex = (Math.random() * (this.state.quotes.length - 1)).toFixed();
    } while (randomIndex === this.state.index)
    const quote = this.state.quotes[randomIndex]
    this.setState({quote : quote, index : randomIndex})
  }

}

export default App;
