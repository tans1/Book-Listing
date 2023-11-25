FROM python:3

WORKDIR /app

COPY ./backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend .

EXPOSE 8000

CMD python3 -m uvicorn main:app --reload --port=8000
