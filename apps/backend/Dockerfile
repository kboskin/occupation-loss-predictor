FROM python:3.10
MAINTAINER Combat Losses

COPY ./pyproject.toml /app/
WORKDIR /app
ENV PYTHONPATH=/app

RUN pip install pip==20.3.1
RUN pip install poetry uvicorn
RUN poetry config virtualenvs.create false
RUN poetry install

EXPOSE 80

COPY . /app
CMD poetry run alembic upgrade head && poetry run uvicorn entry:app --host 0.0.0.0 --port 80