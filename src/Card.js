import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: { x: 0, y: 0 }
    };

    this.setInitialPosition = this.setInitialPosition.bind(this);
  }

  componentDidMount() {
    this.setInitialPosition();
    window.addEventListener('resize', this.setInitialPosition);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setInitialPosition);
  }

  setInitialPosition() {
    const screen = document.getElementById('root');
    const card = ReactDOM.findDOMNode(this);

    const initialPosition = {
      x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
      y: Math.round((screen.offsetHeight - card.offsetHeight) / 2)
    };

    this.setState({ initialPosition: initialPosition });
  }

  render() {
    const style = Object.assign({
      transform: `translate3d(${this.state.initialPosition.x}px, ${this.state.initialPosition.y}px, 0px)`,
      zIndex: this.props.index,
      backgroundImage: `url("${this.props.image}")`,
      backgroundSize: `contain`,
      backgroundRepeat: `no-repeat`
    }, this.props.style);

    return (
      <div style={style} className={cx({ card: true }, this.props.classes)}>
        <p>{this.props.text}</p>
      </div>
    );
  }
}

Card.defaultProps = {
  classes: {},
  style: {}
};