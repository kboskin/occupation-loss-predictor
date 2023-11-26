import databases
import sqlalchemy as sa
from sqlalchemy.orm import Session

from invasion.config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_ECHO, POSTGRES

DB = databases.Database(SQLALCHEMY_DATABASE_URI)
engine = sa.create_engine(
    SQLALCHEMY_DATABASE_URI,
    echo=SQLALCHEMY_ECHO
)
session = Session(engine)
