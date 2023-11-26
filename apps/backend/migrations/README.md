To get the initial structure just run the service on the empty DB.
`create_all` call is included, so tables will be created
automatically.

To generate a new revision, run:
```
alembic revision -m 'a message' --rev-id=1
```
