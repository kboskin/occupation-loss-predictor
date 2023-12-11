FROM python:3.10
MAINTAINER Kostiantyn Boskin

COPY ./poetry.lock /app/poetry.lock
COPY ./pyproject.toml /app/pyproject.toml
WORKDIR /app

EXPOSE 80

COPY . /app

ENV PYTHONPATH=/app

RUN pip install pip
RUN pip install poetry uvicorn
RUN poetry install

CMD ["poetry", "run", "uvicorn", "entry:app", "--host", "0.0.0.0", "--port", "80"]