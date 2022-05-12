import { CardSchema } from "./cardschema";

type Cards = {
  [key: string]: CardSchema;
};

export class CardStore {
  cards: Cards = {};
  lastid = -1;

  _addCard(card: CardSchema) {
    card.id = String(++this.lastid);
    this.cards[card.id] = card;
    return card.id;
  }
  
  getCard(cardId: string) {
    return this.cards[cardId];
  }
  
  newCard(description: string): string {
    const card = new CardSchema();
    card.description = description;
    return this._addCard(card);
  }
}