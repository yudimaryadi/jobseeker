# JOOBSEEKERS

&nbsp;
## HOW TO RUN SERVER
- Install npm before running
- change to directory server ```cd server/```
- install all package in packege.json with command ```npm install --y```
- Please review the config folder and adjust your PostgreSQL password accordingly. If you are using MySQL, update it according to the documentation [Documentation MySQL](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/#mysql)
- run command 
   > - ```npx sequelize-cli db:create```  for create DB
   > - ```npx sequelize-cli db:migrate``` for create Model
   > - ```npx sequelize-cli db:seed:all``` for seeding data
- run server with command ```npm start```
&nbsp;
## HOW TO RUN FRONTEND
- Open index HTML in live server or open to Browser
&nbsp;
## Endpoints :

List of available endpoints:

- `GET /candidates`
- `GET /candidate/:id`
- `POST /candidate/`
- `PATCH /candidate/:id`
- `DELETE /candidate/:id`

&nbsp;

## GET /candidates
>Get All candidate with query and live search candidates

Request : 

- query (default): 
```json
{
	"page": "1",
	"limit": "4",
	"search": "String",
}
```
Response : 

_Response (200 - OK)_
```json
{
	"count": 11,
	"rows": [
		{
			"id": 11,
			"full_name": "Yudi Maryadi",
			"dob": "04-06-1999",
			"pob": "Sumbawa Barat",
			"gender": "M",
			"year_exp": "1",
			"last_salary": "20000000",
			"createdAt": "2023-06-15T04:11:17.100Z",
			"updatedAt": "2023-06-15T04:11:17.100Z"
		},
		{
			"id": 10,
			"full_name": "Isabella Granita",
			"dob": "1996-04-08",
			"pob": "Phoenix",
			"gender": "F",
			"year_exp": "5",
			"last_salary": "52000000",
			"createdAt": "2023-06-14T18:41:30.049Z",
			"updatedAt": "2023-06-15T04:31:43.901Z"
		},
		{
			"id": 9,
			"full_name": "James Brown",
			"dob": "1989-02-28",
			"pob": "Atlanta",
			"gender": "M",
			"year_exp": "8",
			"last_salary": "6500",
			"createdAt": "2023-06-14T18:41:30.049Z",
			"updatedAt": "2023-06-14T18:41:30.049Z"
		},
		{
			"id": 8,
			"full_name": "Sophia Martinez",
			"dob": "1994-06-12",
			"pob": "Miami",
			"gender": "F",
			"year_exp": "2",
			"last_salary": "3800",
			"createdAt": "2023-06-14T18:41:30.049Z",
			"updatedAt": "2023-06-14T18:41:30.049Z"
		}
	],
	"page": 1,
	"limit": 4
}
```

_Response (500 - Server Disable)_
```json
{
  "success": false,
  "message": "Failed to get candidates.e"
}
```
&nbsp;

## GET /candidates/:id
>Get Candidates by Id

Request :

- params: 
```id candidate
```
Response :


_Response (200 - OK)_
```json
{
	"success": true,
	"candidate": {
		"id": 1,
		"full_name": "John Doe",
		"dob": "1990-01-01",
		"pob": "New York",
		"gender": "M",
		"year_exp": "5",
		"last_salary": "5000",
		"createdAt": "2023-06-14T18:41:30.049Z",
		"updatedAt": "2023-06-14T18:41:30.049Z"
	}
}
```
_Response (404 - Not Found)_
```json
{
  "success": false,
	"message": "Candidate not found."
}
```

_Response (500 - Server Disable)_
```json
{
  "success": false,
  "message": "Failed to get candidates.e"
}
```
&nbsp;

## POST /candidates
>Create Candidates

Request: 
- Body: 
```json
{
  "full_name": "string", //required
  "dob": "string"., //required
  "pob": "string"., //required
  "gender": "string", //required //! valid("M", "F")
  "year_exp": "string"., //required
  "last_salary": "string" //required
}
```
Response: 

_Response (201 - Created)_
```json
{
	"success": 201,
	"candidate": {
		"id": 11,
		"full_name": "Yudi Maryadi",
		"dob": "04-06-1999",
		"pob": "Sumbawa Barat",
		"gender": "M",
		"year_exp": "1",
		"last_salary": "20000000",
		"updatedAt": "2023-06-15T04:11:17.100Z",
		"createdAt": "2023-06-15T04:11:17.100Z"
	}
}
```

_Response (400 - Bad Request)_
```json
{
  "success": false,
  "message": "error message"
}
```

_Response (500 - Server Disable)_
```json
{
  "success": false,
  "message": "Failed to get candidates.e"
}
```
&nbsp;

## PATCH /candidates/:id
> update candidates by id

Request :
- Params : 
```
id candidates
```

_Response (200 - OK)_

```json
{
	"success": true,
	"candidate": {
		"id": 10,
		"full_name": "Isabella Granita",
		"dob": "1996-04-08",
		"pob": "Phoenix",
		"gender": "M",
		"year_exp": "5",
		"last_salary": "52000000",
		"createdAt": "2023-06-14T18:41:30.049Z",
		"updatedAt": "2023-06-15T06:41:11.591Z"
	}
}
```

_Response (400 - Bad Request)_
```json
{
  "success": false,
	"message": "Error Message"
}
```

_Response (500 - Server Disable)_
```json
{
  "success": false,
  "message": "Failed to get candidates.e"
}
```
&nbsp;

## DELETE /candidates/:id
> Delete Candidates By id

Request :
- Params : 
```
Id Candidates
```

_Response (200 - OK)_
```json
{
	"success": true,
	"message": "Candidate deleted successfully."
}
```

_Response (404 - Not Found)_
```json
{
  "status":false,
	"message": "Candidate Not Found"
}
```

_Response (500 - Server Disable)_
```json
{
  "success": false,
  "message": "Failed to get candidates.e"
}
```
&nbsp;
