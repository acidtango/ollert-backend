import {BoardCommandType} from './BoardCommandType';
import {AddColumn} from './AddColumn';
import {CreateCard} from './CreateCard';
interface BoardCommand {
  /**
   * Tipo
   */
  'type': BoardCommandType;
  /**
   * Contenido del mensaje.
   */
  'data': AddColumn | CreateCard;
}
export { BoardCommand };