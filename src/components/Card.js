import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends React.Component {
  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo } = this.props;

    return (
      <div className="tryunfo-card">
        <p data-testid="name-card">{ cardName }</p>
        <img src={ cardImage } alt={ cardName } data-testid="image-card" />
        <p data-testid="description-card">{ cardDescription }</p>
        <div className="attr-container">
          <div className="attr-paragraph">
            <p>Attr01................................</p>
            <p data-testid="attr1-card">{ Number(cardAttr1) }</p>
          </div>
          <div className="attr-paragraph">
            <p>Attr02................................</p>
            <p data-testid="attr2-card">{ Number(cardAttr2) }</p>
          </div>
          <div className="attr-paragraph">
            <p>Attr03................................</p>
            <p data-testid="attr3-card">{ Number(cardAttr3) }</p>
          </div>
        </div>
        <p data-testid="rare-card">{ cardRare }</p>
        { cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p> }
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
