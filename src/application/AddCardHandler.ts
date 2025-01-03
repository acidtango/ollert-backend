import type { AddCard } from '../../types/types.ts';
import { AddCardSchema } from '../../types/types.zod.ts';
import type { Handler } from './Handler.ts';

export class AddCardHandler implements Handler {
  schema() {
    return AddCardSchema;
  }

  async handle(command: AddCard) {
    console.log('handle create card', command);
  }
}
