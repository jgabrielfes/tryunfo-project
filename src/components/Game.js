import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './Game.css';

class Game extends React.Component {
  render() {
    const { data, onGameStart, onNextButton } = this.props;
    const { shuffledCards, currentGameCard } = data;
    return (
      <section className="game-container">
        <div className="game-cards-container">
          { shuffledCards.length === 0
            ? (
              <button
                type="button"
                className="game-btn"
                onClick={ onGameStart }
              >
                Play
              </button>
            )
            : (
              <div className="game-card-container">
                <Card
                  cardName={ shuffledCards[currentGameCard].name }
                  cardDescription={ shuffledCards[currentGameCard].description }
                  cardAttr1={ shuffledCards[currentGameCard].attr1 }
                  cardAttr2={ shuffledCards[currentGameCard].attr2 }
                  cardAttr3={ shuffledCards[currentGameCard].attr3 }
                  cardImage={ shuffledCards[currentGameCard].image }
                  cardRare={ shuffledCards[currentGameCard].rare }
                  cardTrunfo={ shuffledCards[currentGameCard].trunfo }
                />
                <button
                  type="button"
                  className="next-card-btn"
                  onClick={ onNextButton }
                >
                  Próxima carta
                </button>
              </div>
            )}
          { shuffledCards.length !== 0
            && (
              <div className="game-card-container">
                <div className="example-card">
                  <p>Tryunfo</p>
                </div>
                <p>
                  {`Cartas restantes:  ${shuffledCards.length - currentGameCard - 1}`}
                </p>
              </div>
            ) }
        </div>
        <button
          type="button"
          className={ `shuffle-btn ${currentGameCard === shuffledCards.length - 1
            && 'last-card'}` }
          onClick={ currentGameCard === shuffledCards.length - 1 ? onGameStart
            : () => {} }
        >
          Embaralhar cartas
        </button>
      </section>
    );
  }
}

Game.propTypes = {
  data: PropTypes.shape({
    shuffledCards: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      attr1: PropTypes.string,
      attr2: PropTypes.string,
      attr3: PropTypes.string,
      image: PropTypes.string,
      rare: PropTypes.string,
      trunfo: PropTypes.bool,
    })),
    currentGameCard: PropTypes.number,
  }).isRequired,
  onGameStart: PropTypes.func.isRequired,
  onNextButton: PropTypes.func.isRequired,
};

// Game.defaultProps = {
//   playing: false,
// };

export default Game;
