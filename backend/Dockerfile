FROM python:3.8.3

WORKDIR /usr/src/app
RUN mkdir /usr/src/app/backend
WORKDIR /usr/src/app/backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get install netcat -y
RUN apt-get upgrade -y && apt-get install postgresql gcc python3-dev musl-dev -y
RUN pip install --upgrade pip

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./entrypoint.sh .

COPY . .

RUN chmod +x /usr/src/app/backend/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/usr/src/app/backend/entrypoint.sh"]