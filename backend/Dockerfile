FROM python:3.11.13-alpine3.21

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY migrate.sh .

RUN chmod +x /app/migrate.sh

EXPOSE 8000

ENTRYPOINT ["/app/migrate.sh"]

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
