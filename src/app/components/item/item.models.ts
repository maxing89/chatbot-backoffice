export interface Item {
  id: string;
  description: string;
  synonyms: Array<Synonym>;
}

export const ItemInitValue: Item = {
  id: null,
  description: null,
  synonyms: [],
};

export interface Synonym {
  value: string;
  display: string;
  parent: string;
}

export const SynonymInitValue: Synonym = {
  value: null,
  display: null,
  parent: null,
};
