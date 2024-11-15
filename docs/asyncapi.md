# Ollert Service 1.0.0 documentation

The Heart-Counter manages popular messages in a Slack workspace by monitoring message reaction data. It also sends an acknowledgment message back to the Slack Server to indicate it has received the message.


## Table of Contents

* [Servers](#servers)
  * [local](#local-server)
* [Operations](#operations)
  * [RECEIVE /](#receive--operation)
  * [RECEIVE /](#receive--operation)

## Servers

### `local` Server

* URL: `ws://localhost:3000/`
* Protocol: `ws`



## Operations

### RECEIVE `/` Operation

* Operation ID: `columnCreatedListener`

#### Message `columnCreated`

*<todo>*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| title | string | Title of the column | examples (`"TODO"`) | - | **required** |
| color | string | Color of the column | examples (`"#fabada"`) | - | **required** |

> Examples of payload _(generated)_

```json
{
  "title": "TODO",
  "color": "#fabada"
}
```



### RECEIVE `/` Operation

* Operation ID: `cardAddedListener`

#### Message `cardAdded`

*<todo>*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| name | string | Title of the column | examples (`"TODO"`) | - | **required** |

> Examples of payload _(generated)_

```json
{
  "name": "TODO"
}
```



