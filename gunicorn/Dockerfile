FROM python:3.9
RUN pip install --no-cache-dir gunicorn==20.0.4
EXPOSE 80
CMD ["gunicorn", "--workers", "2", "--bind", "0.0.0.0:80", "--chdir", "/app", "app:app"]
