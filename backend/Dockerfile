FROM python:3.11.13-alpine3.21

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080

CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]
