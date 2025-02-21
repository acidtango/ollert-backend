import { CardId } from '../src/domain/CardId.ts'

export const REFACTOR_REFINERY_ID = '74a36d29-5faf-4561-a669-dec2e4024146'

export const REFACTOR_REFINERY_NAME = 'Refactor refinery'

export const IMPLEMENT_HOUSE_FINDER_ID = '0e3ea839-aeba-451f-917d-8ac17056e03e'

export const IMPLEMENT_HOUSE_FINDER_NAME = 'Implement house finder'

export const implementHouseFinderId = CardId.fromString(IMPLEMENT_HOUSE_FINDER_ID)

export const refactorRefineryId = CardId.fromString(REFACTOR_REFINERY_ID)

export const REFACTOR_REFINERY = {
  ID: REFACTOR_REFINERY_ID,
  NAME: REFACTOR_REFINERY_NAME,
  id: refactorRefineryId
}

export const notExistentCardId = CardId.fromString('98746293-b5e9-4a9d-b723-391ab3b2cdca')
