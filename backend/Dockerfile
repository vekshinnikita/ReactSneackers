FROM python:latest

WORKDIR /usr/src/app
RUN mkdir /usr/src/app/backend
WORKDIR /usr/src/app/backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get install netcat -y
RUN apt-get upgrade -y && apt-get install postgresql gcc python3-dev musl-dev -y

COPY ./entrypoint.sh .

COPY . .

RUN chmod +x /usr/src/app/backend/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/usr/src/app/backend/entrypoint.sh"]