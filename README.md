# APPLICATION DESCRIPTION

### General description

This application is a task manager for developer teams. For each team-project you can create its own board and multiple tasks. You can manage users and tasks according to your development process.

### Setup instructions
1. go to ./frontend
1. npm install
1. bower install
1. grunt
1. go to ./backend/express
1. npm install
1. make sure you have mongod process running
1. node ./server.js
1. in your browser go to localhost:2000

**Warning:** the application is under development and should be used for testing purposes only.

### Usage and possibilities

In order to use application you should register in an application. You can make it by 
- using a registration-form
- your social account such as facebook


The board can be public or private. Public board can be read by every registered user. Private board is accessible only for invited participants.

Each user can create unlimited number of boards. Each board consists of several columns:
- Backlog 
- In progress
- Test
- Done
	
Each column can consist of unlimited tasks number. You can specify name of the task and its short description.
 

### Rights for users:

There are two roles in application - administrator and invited participant. First there is only one administrator - the person who has created a board. Administrator can invite other people to the board and manage participants rights. Administrator can give his rights to other person, so there can be more than one administrators later. Naturally, invited person should be registered in application.
 
##### Every board-participant has rights for:
- Creating tasks
- Deleting tasks
- Moving tasks between columns
- Archiving cards in Done column.
- Moving tasks inside column

##### According to that administrator has additional rights such as:
- Adding participant(s) to the task
- Remove participant(s) from task
- Invite participants to tha board
- Manage rights of participants
- Delete existing board.

### Database structure

#### User
```sh
_id: ObjectId
name: String
avatar_url: String
email: String
boards [ _id: ObjectId]
```
#### Board
```
_id : ObjectId
name: String
columns: [{
		name : String
		tasks: [_id: ObjectId]
}]
private: Boolean
users : [{
_id : ObjectId
isAdmin : Boolean
}]
```
#### Task
```sh
_id : ObjectId
name : String
decription : String
participant : [_id: ObjectId]
```
### REST API
####User
|URL|Method|
|----------------|-----------|
| /api/user/:id | GET |
| /api/user/ | POST |
| /api/user/:id | PUT |
| /api/user/:id/board/:id | DELETE |

####Board
|URL|Method|
|----------------|-----------|
| /api/board/:id | GET |
| /api/board/ | POST |
| /api/board/:id | PUT |
| /api/board/:id/column/:name | PUT |
| /api/board/:id/user/ | PUT |
| /api/board/:id | DELETE |
| /api/board/:id/column/:name | DELETE |
| /api/board/:id/user/:user_id | DELETE |
####Task
|URL|Method|
|----------------|-----------|
| /api/task/:id | GET |
| /api/task | POST |
| /api/task/:id | PUT |
| /api/task/:id | DELETE |
| /api/task/:id/participant/:user_id | DELETE |

##Frameworks comparison by functionality

###Routing

| Type | Express | Hapi | Sails |
|------|---------|------|-------|
| Callbacks| + | + |  + |   
| Controllers| - | - | + |

###Logging

| Type | Express | Hapi | Sails |
|------|---------|------|-------|
| Custom | - | + |  + |   
| HTTP | - | + | - |
| DB requests | - | - | - |


###Validation

| Type | Express | Hapi | Sails |
|------|---------|------|-------|
| Object declarations | - | + |  + |   


###ORM

| Type | Express | Hapi | Sails |
|------|---------|------|-------|
| ORM | - | - |  + |   
| NoSQL support | - | - |  + |   


###CLI

| Type | Express | Hapi | Sails |
|------|---------|------|-------|
| Scaffolding | -/+ | - |  + |   
| Migrations | - | - |  - |   


###Authentication

| Type | Express | Hapi | Sails |
|------|---------|------|-------|
| Authentication | - | + |  - |   


###Authorization

| Type | Express | Hapi | Sails |
|------|---------|------|-------|
| ACL | - | - |  - |   
| RBAC | - | - |  + |   


###WebSocket

| Type | Express | Hapi | Sails |
|------|---------|------|-------|
| ACL | - | - |  - |   

###Configuration

| Type | Express | Hapi | Sails |
|------|---------|------|-------|
| Custom | -/+ | - |  + |   
| Environment-based | - | - |  + |   



## License

The MIT License (MIT)

[![Binary Studio](http://www.binary-studio.com/wp-content/uploads/2014/11/logo.gif)](http://binary-studio.com)  
Copyright (c) 2016 Nikita Semenistyi nikeiwe@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
