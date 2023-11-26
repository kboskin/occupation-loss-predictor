FROM python:3.8
MAINTAINER Kostiantyn Boskin

COPY ./poetry.lock /app/poetry.lock
COPY ./pyproject.toml /app/pyproject.toml
WORKDIR /app
ENV PYTHONPATH=/app

RUN pip install pip==20.3.1
RUN pip install poetry uvicorn
RUN pip install alembic
RUN poetry install

EXPOSE 80

COPY . /app
#RUN alembic upgrade head
CMD ["poetry", "run", "uvicorn", "entry:app", "--host", "0.0.0.0", "--port", "80"]