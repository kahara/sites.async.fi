FROM python:3.10
RUN pip install --no-cache-dir gunicorn==22.0.0
EXPOSE 80
CMD ["gunicorn", "--workers", "2", "--bind", "0.0.0.0:80", "--chdir", "/app", "app:app"]
