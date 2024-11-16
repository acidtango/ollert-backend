import {BoardEventType} from './BoardEventType';
import {ColumnAdded} from './ColumnAdded';
import {CardCreated} from './CardCreated';
interface BoardEvent {
  /**
   * Tipo
   */
  reservedType?: BoardEventType;
  /**
   * Contenido del mensaje.
   */
  data: ColumnAdded | CardCreated;
}
export { BoardEvent };