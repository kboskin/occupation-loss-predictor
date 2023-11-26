# Invasion losses Backend Service

## Setup DB

To set up database run

`docker-compose up -d db`

from repository root.

## Setup service

Enter `apps/backend` and run:

```shell
pip install poetry
poetry install
```

Then run `python entry.py`. 

> **Note:** virtualenv setup is out of scope of these instructions.