> Día 10/01/2025

Driver: Fernando
Notas: Héctor
Asistentes: Fer, Viren, Alberto Gonzalez, Carlos Castellano, Diego Machín, Angel, Daniel Montesino, Alberto Mendoza, Jorge Daniel, Héctor, Alexis.

Comenzamos el día buscando implementar el caso de uso de “añadir tarjeta”. Volvemos a recordar que el paquete de async-api debe instalarse globalmente y no vale como dev dependency.

Después tenemos un debate acerca de que endpoints debemos implementar en websockets y cuales no. Optamos por aplicar:
Crear card
Crear columna
Editar card (todas las propiedades y posiciones)
Editar columnas
Borrar cards
Borrar columnas

Estamos de acuerdo en que hay cosas que deberán ir por Rest por optimizar y también hay un debate de como debería ser idealmente la auth. No hay una respuesta consensuada y concluimos que hay opciones como un concepto llamado “rooms”. quedamos en investigar más cuando lo necesitemos.

Empezamos creando la entidad de dominio Card. Debatimos un poco sobre como implementarlo con TDD y al ver que no hay tests sobre las columnas empezamos de ahí esperando que emerja la necesidad de card.
Nos damos cuenta de que no hay un comando para pasar tests porque siempre habíamos usado los shortcut de intelliJ (**alpha programmers**) y lo incluimos junto a otro para tenerlos en watch.

---

Alberto G. propone poner un solo atributo por clase que contenga el objeto con todas las propiedades. El resto del equipo no está de acuerdo por verlo como un nivel de anidación extra. Alberto comenta que la principal ventajas es lo fácil de añadir una nueva propiedad al agregado, la contra es que los métodos se hacen más pesados. Se descarta la idea tras darle vueltas.

Se pregunta que valor nos da ahora mismo, o que posibilidad hay de usar public readonly en vez de getters. Hablamos bastante de lo que aporta, de como resta flexibilidad, de como asegurar la inmutabilidad… Llegamos a la conclusión de que puede tener más sentido en value objects simples, pero no siempre. Por eso es mejor seguir un estándar que es no solo de la empresa si no del sector.

---

Decidimos que las columnas se meten siempre con un nombre por necesidad.
Se decide que una columna se instanciará sin cards siempre.

Se empiezan los tests de las card.
Se deciden que las cards se crean solo con un name válido (no vale un espacio solo por ejemplo).

Vemos la utilidad de crear un columnMother pero se deja como TODO para aprovechar más el tiempo.

Volvemos al debate de si las validaciones deben ir en el constructor. Decidimos no centrarnos en ese debate porque genera mucho debate (y acabamos fajandonos si no)

Surge el debate de como se gestionan los errores con websocket, si hay status, si es con payload custom o como, se tiene que investigar. Se levanta igualmente en local y se ve como se gestiona. Se determina que al emitir un mensaje erroneo, solo el usuario que lo emite recibe un código de error. Los success, y eventos que ocurran irán por el canal. Se concluye que lo hemos modelado por lo tanto correctamente.

Al igual que con la columna se decide dejar un TODO para un card mother.

También se valora migrar node:test a otra herramienta más madura pero se decide que **aunque node test sea más malo que un veneno caducado** vamos a seguir usandolo por tener la experiencia completa con un proyecto.

Se habla de que hacer cuando tienes campos grandes como “description”. ¿Aporta un hasDescription(string description)? No se llega a una conclusión general pero para el caso concreto se decide no incluirlo.

Se reafirma nuestra intención de usar optimistic updates en el front.
Se continuan los tests de cards y se deja el comportamiento básico de ambas cosas definido.

> Día 17/01/2025

Driver: Alberto
Notas: Alberto
Asistentes: Hector, Viren, Alberto Gonzalez, Carlos Castellano, Diego Machín, Jorge Daniel, Héctor, Alexis, Daute, Jorge Bodega, Daniel Ramos, Manuel Carrera, Fer

Debate acerca de los mother objects, fixtures, builders
Debate acerca de pasar primitivos a los agregados o no
Implementación del handler de AddColumn
Avances en añadir card a un board
Borrar columnas de un board
