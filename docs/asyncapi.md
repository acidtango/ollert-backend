# Ollert API 1.0.0 documentation

The Ollert API provides real-time communication for managing boards, columns,  and cards within a collaborative environment. A board represents a project  or workflow, containing columns that organize cards into categories or statuses.  Cards are individual tasks or activities that can be created, updated, or moved  across columns to reflect progress. Built on WebSockets, the API ensures instant  updates, enabling seamless collaboration and efficient task management for teams of any size.


## Table of Contents

* [Servers](#servers)
  * [local](#local-server)
* [Operations](#operations)
  * [RECEIVE /boards/{boardId}/column](#receive-boardsboardidcolumn-operation)

## Servers

### `local` Server

* URL: `ws://localhost:3000/`
* Protocol: `ws`



## Operations

### RECEIVE `/boards/{boardId}/column` Operation

* Operation ID: `addColumn`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| boardId | string | Id of the board. | default (`"6f0ca58d-95ac-4817-9e39-9258f5cc75bd"`) | - | **required**, **parameter location ($message.payload#/boardId)** |


Receive **one of** the following messages:

#### Message Adds a column to the board `AddColumn`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| columnId | string | - | - | - | - |
| name | string | - | - | - | - |

> Examples of payload _(generated)_

```json
{
  "columnId": "string",
  "name": "string"
}
```


#### Message Moves a column within the board `MoveColumn`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| columnId | string | - | - | - | - |
| index | number | - | - | - | - |

> Examples of payload _(generated)_

```json
{
  "columnId": "string",
  "index": 0
}
```



