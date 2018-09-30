FROM python:3.7
RUN pip install --no-cache-dir gunicorn==19.9.0
EXPOSE 80
CMD ["gunicorn", "--workers", "2", "--bind", "0.0.0.0:80", "--chdir", "/app", "app:app"]
