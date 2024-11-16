export interface AddColumn {
  'type': AddColumnType;
  'id': string;
  'name': string;
}

export type AddColumnType = "AddColumn";
export type BoardCommand = AddColumn | CreateCard;
export type BoardEvent = ColumnAdded | CardCreated;
export interface CardCreated {
  'type': CardCreatedType;
  'name': string;
}

export type CardCreatedType = "CardCreatedType";
export interface ColumnAdded {
  'type': ColumnAddedType;
  'name': string;
}

export type ColumnAddedType = "ColumnAdded";
export interface CreateCard {
  'type': CreateCardType;
  'name': string;
}

export type CreateCardType = "CreateCard";
