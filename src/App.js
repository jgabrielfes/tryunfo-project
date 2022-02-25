import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Cards from './components/Cards';
import Form from './components/Form';
import Game from './components/Game';
import Footer from './components/Footer';

const attrMaxValue = 90;
const attrMaxSumValue = 210;
const initialForm = {
  form: {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    remainingPoints: attrMaxSumValue,
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onGameStart = this.onGameStart.bind(this);
    this.onNextButtonClick = this.onNextButtonClick.bind(this);
    this.deteleCard = this.deteleCard.bind(this);
    this.changeSaveButton = this.changeSaveButton.bind(this);
    this.handleAlert = this.handleAlert.bind(this);

    this.state = {
      ...initialForm,
      savedCards: localStorage.savedCards ? JSON.parse(localStorage.savedCards) : [],
      hasTrunfo: localStorage.hasTrunfo === 'true',
      filter: {
        name: '',
        rare: 'todas',
        trunfo: false,
      },
      game: {
        shuffledCards: [],
        currentGameCard: 0,
      },
      alert: {
        message: '',
        open: false,
      },
    };
  }

  handleAlert(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState(({ alert }) => ({ alert: {
      ...alert,
      open: false,
    } }));
  }

  onGameStart() {
    const { savedCards } = this.state;
    if (savedCards.length < 2) {
      this.setState({ alert: {
        message: 'Você precisa de ao menos duas cartas no baralho para iniciar',
        open: true,
      } });
      return false;
    }
    this.setState({ game: {
      shuffledCards: [...savedCards].sort(() => Math.random() - (1 / 2)),
      currentGameCard: 0,
    } });
  }

  onSaveButtonClick(event) {
    event.preventDefault();
    this.setState(({ form, savedCards, hasTrunfo }) => ({
      savedCards: [...savedCards, {
        name: form.cardName,
        description: form.cardDescription,
        attr1: form.cardAttr1,
        attr2: form.cardAttr2,
        attr3: form.cardAttr3,
        image: form.cardImage,
        rare: form.cardRare,
        trunfo: form.cardTrunfo,
      }],
      hasTrunfo: hasTrunfo || form.cardTrunfo,
    }), () => {
      const { form: { cardTrunfo }, savedCards, hasTrunfo } = this.state;
      localStorage.savedCards = JSON.stringify(savedCards);
      localStorage.hasTrunfo = hasTrunfo || cardTrunfo;
    });
    this.setState(initialForm);
  }

  onInputChange({ target: { id, type, value, checked } }) {
    this.setState(({ form, filter }) => {
      if (id.includes('filter')) {
        const key = id.split('-')[0];
        return { filter: {
          ...filter,
          [key]: type === 'checkbox' ? checked : value,
        } };
      }
      const currentState = id.split('-')[0][0].toUpperCase()
        + id.split('-')[0].substr(1);
      return { form: {
        ...form,
        [`card${currentState}`]: type === 'checkbox' ? checked : value,
      } };
    }, () => {
      const { form } = this.state;
      const attrSum = (...attr) => attr
        .reduce((result, i) => result + Number(form[`cardAttr${i}`]), 0);
      this.setState({ form: {
        ...form,
        remainingPoints: attrMaxSumValue - attrSum('1', '2', '3'),
      } }, () => this.changeSaveButton());
    });
  }

  onNextButtonClick() {
    const { game: { shuffledCards, currentGameCard } } = this.state;
    if (currentGameCard === shuffledCards.length - 1) {
      this.setState({ alert: {
        message: 'Você já está na última carta do baralho',
        open: true,
      } });
      return false;
    }
    this.setState({ game: {
      shuffledCards,
      currentGameCard: currentGameCard + 1,
    } });
  }

  changeSaveButton() {
    const { form } = this.state;
    const attrCondition = (attr) => Number(form[`cardAttr${attr}`]) >= 0
      && Number(form[`cardAttr${attr}`]) <= attrMaxValue;
    const attrSum = (...attr) => attr
      .reduce((result, i) => result + Number(form[`cardAttr${i}`]), 0);

    this.setState({ form: {
      ...form,
      isSaveButtonDisabled: !(form.cardName && form.cardDescription && form.cardImage
        && attrCondition('1') && attrCondition('2') && attrCondition('3')
        && attrSum('1', '2', '3') <= attrMaxSumValue),
    } });
  }

  deteleCard({ target: { id } }) {
    const { savedCards } = this.state;
    const cardIndex = Number(id.split('-')[1]);
    if (savedCards[cardIndex].trunfo) this.setState({ hasTrunfo: false });
    this.setState({
      savedCards: savedCards.filter((_, index) => index !== cardIndex),
    }, () => {
      const { form: { cardTrunfo }, savedCards, hasTrunfo } = this.state;
      localStorage.savedCards = JSON.stringify(savedCards);
      localStorage.hasTrunfo = hasTrunfo || cardTrunfo;
    });
  }

  render() {
    const { form, hasTrunfo, savedCards, filter, game, alert } = this.state;

    return (
      <main>
        <Form
          key="form-page"
          cardName={ form.cardName }
          cardDescription={ form.cardDescription }
          cardAttr1={ form.cardAttr1 }
          cardAttr2={ form.cardAttr2 }
          cardAttr3={ form.cardAttr3 }
          cardImage={ form.cardImage }
          cardRare={ form.cardRare }
          cardTrunfo={ form.cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ form.isSaveButtonDisabled }
          remainingPoints={ form.remainingPoints }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Cards
          data={ savedCards.filter(({ name }) => name.toLowerCase()
            .includes(filter.name.toLowerCase()))
            .filter(({ rare }) => filter.rare === 'todas' || rare === filter.rare)
            .filter(({ trunfo }) => !filter.trunfo || trunfo) }
          filter={ filter }
          onClick={ this.deteleCard }
          onChange={ this.onInputChange }
        />
        <Snackbar
          anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
          open={ alert.open }
          autoHideDuration={ 5000 }
          onClose={ this.handleAlert }
        >
          <Alert onClose={ this.handleAlert } variant="filled" severity="error">
            { alert.message }
          </Alert>
        </Snackbar>
        <Game
          data={ game }
          onGameStart={ this.onGameStart }
          onNextButton={ this.onNextButtonClick }
        />
        <Footer />
      </main>
    );
  }
}

export default App;
