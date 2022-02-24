import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Select from './Select';
import Card from './Card';
import './Form.css';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      remainingPoints,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <section className="form-container">
        <section className="form-section">
          <h1>Adicionar nova carta</h1>
          <form>
            <Input
              id="name-input"
              type="text"
              value={ cardName }
              onChange={ onInputChange }
              breakline
            >
              Nome
            </Input>
            <label htmlFor="description-input">
              Descrição
              <br />
              <textarea
                id="description-input"
                value={ cardDescription }
                onChange={ onInputChange }
                data-testid="description-input"
              />
            </label>
            <Input
              id="attr1-input"
              type="number"
              value={ cardAttr1 }
              onChange={ onInputChange }
            >
              Attr01
            </Input>
            <Input
              id="attr2-input"
              type="number"
              value={ cardAttr2 }
              onChange={ onInputChange }
            >
              Attr02
            </Input>
            <Input
              id="attr3-input"
              type="number"
              value={ cardAttr3 }
              onChange={ onInputChange }
            >
              Attr03
            </Input>
            <p className={ remainingPoints < 0 ? 'negative' : '' }>
              { `Pontos restantes = ${remainingPoints}` }
            </p>
            <Input
              id="image-input"
              type="text"
              value={ cardImage }
              onChange={ onInputChange }
              icon
            >
              Imagem
            </Input>
            <Select
              label="Raridade"
              options={ ['Normal', 'Raro', 'Muito Raro'] }
              id="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
            />
            {hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p>
              : (
                <Input
                  id="trunfo-input"
                  type="checkbox"
                  rightLabel
                  checked={ cardTrunfo }
                  onChange={ onInputChange }
                >
                  Super Trybe Trunfo
                </Input>)}
            <button
              type="submit"
              data-testid="save-button"
              disabled={ isSaveButtonDisabled }
              onClick={ onSaveButtonClick }
            >
              Salvar
            </button>
          </form>
        </section>
        <section className="card-section">
          <h1>Pré-visualização</h1>
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
        </section>
      </section>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  remainingPoints: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
