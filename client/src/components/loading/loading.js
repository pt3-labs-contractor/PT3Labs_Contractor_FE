import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { TweenLite } from 'gsap';
import './loading.css';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    setInterval(this.update, 750);
    TweenLite.to('.loading-container', 0.2, { opacity: 1 });
  }

  componentWillUnmount() {
    clearInterval(this.update);
    TweenLite.to('.loading-container', 0.2, { opacity: 0 });
  }

  update() {
    this.setState(prevState => {
      return { text: prevState.text === '...' ? '' : prevState.text + '.' };
    });
  }

  render() {
    return (
      <section className="loading-container">
        <FontAwesomeIcon icon={faCircleNotch} />
        <h2>{`Loading${this.state.text}`}</h2>
      </section>
    );
  }
}

export default Loading;
