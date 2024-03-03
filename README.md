## How to run the project
> docker-compose up


## Important Architecture Decisions
- Period Code is auto generated using nanoid to remove the hassle for the user 
- Local db - sqlite is used as postgres was creating some issues with create the new table on application start. Since the code in docker-compose file is commented and can be resolved with some more time.

## Constraints
- API calls are implemented directly into the components since the assignment is done on Ad-Hoc basis, with real world scenario we will have actions and reducers to call endpoints and store data.
- API loading is ommited from current implementation as no visible lag exists having used local db instance with sqlite
