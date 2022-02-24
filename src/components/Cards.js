import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Input from './Input';
import Select from './Select';
import './Cards.css';

class Cards extends React.Component {
  render() {
    const { data, filter, onClick, onChange } = this.props;
    return (
      <section className="cards-section-container">
        <h1>Todas as cartas</h1>
        <section className="filter-container">
          <h3>Filtros de busca</h3>
          <Input
            id="name-filter"
            type="text"
            value={ filter.name }
            onChange={ onChange }
            placeholder="Nome da carta"
          />
          <Select
            options={ ['Todas', 'Normal', 'Raro', 'Muito Raro'] }
            id="rare-filter"
            value={ filter.rare }
            onChange={ onChange }
          />
          <Input
            id="trunfo-filter"
            type="checkbox"
            rightLabel
            checked={ filter.trunfo }
            onChange={ onChange }
          >
            Super Trybe Trunfo
          </Input>
        </section>
        <section className="cards-container">
          { data.map(({
            name,
            description,
            attr1,
            attr2,
            attr3,
            image,
            rare,
            trunfo,
          }, index) => (
            <div key={ `card-${index}` }>
              <Card
                cardName={ name }
                cardDescription={ description }
                cardAttr1={ attr1 }
                cardAttr2={ attr2 }
                cardAttr3={ attr3 }
                cardImage={ image }
                cardRare={ rare }
                cardTrunfo={ trunfo }
              />
              <button
                id={ `btn-${index}` }
                type="button"
                data-testid="delete-button"
                onClick={ onClick }
              >
                Excluir
              </button>
            </div>)) }
        </section>
      </section>
    );
  }
}

Cards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    attr1: PropTypes.string,
    attr2: PropTypes.string,
    attr3: PropTypes.string,
    image: PropTypes.string,
    rare: PropTypes.string,
    trunfo: PropTypes.bool,
  })).isRequired,
  filter: PropTypes.shape({
    name: PropTypes.string,
    rare: PropTypes.string,
    trunfo: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Cards;
