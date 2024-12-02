FROM --platform=linux/amd64 python:3.11-alpine

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["python", "main.py"]