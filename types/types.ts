interface AddColumn {
  'type': AddColumnType;
  'id': string;
  'name': string;
}
export { AddColumn };

type AddColumnType = "AddColumn";
export { AddColumnType };
type BoardCommand = AddColumn | CreateCard;
export { BoardCommand };
type BoardEvent = ColumnAdded | CardCreated;
export { BoardEvent };
interface CardCreated {
  'type': CardCreatedType;
  'name': string;
}
export { CardCreated };

type CardCreatedType = "CardCreatedType";
export { CardCreatedType };
interface ColumnAdded {
  'type': ColumnAddedType;
  'name': string;
}
export { ColumnAdded };

type ColumnAddedType = "ColumnAdded";
export { ColumnAddedType };
interface CreateCard {
  'type': CreateCardType;
  'name': string;
}
export { CreateCard };

type CreateCardType = "CreateCard";
export { CreateCardType };
