import uvicorn

from invasion import app  # noqa: F401

if __name__ == '__main__':
    uvicorn.run("entry:app", host='127.0.0.1', port=8000, reload=True, workers=20)
