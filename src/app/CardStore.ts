import { CardSchema } from './models/cardschema';

type Cards = {
  [key: string]: CardSchema;
};

export class CardStore {
  cards: Cards = {};
  lastid = -1;

  _addCard(card: CardSchema) {
    this.cards[String(card.id)] = card;
    return card.id;
  }

  getCard(cardId: string) {
    return this.cards[cardId];
  }

  newCard(id: string, description: string): string | undefined {
    const card = new CardSchema();
    card.id = id;
    card.description = description;
    return this._addCard(card);
  }
}
