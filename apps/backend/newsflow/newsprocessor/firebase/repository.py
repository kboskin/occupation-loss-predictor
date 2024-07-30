import logging
from datetime import datetime
from typing import List

import sentry_sdk
from firebase_admin import firestore

from newsprocessor.config import FIREBASE_DB
from newsprocessor.firebase.collection_names import COLLECTION_NEWS
from newsprocessor.firebase.models import ArticleDbModel, ArticlesWithLanguageModel


class FirebaseRepository:

    def __init__(self, db: firestore.Client):
        self.db = db

    def get_data_for(self, time: datetime, language: str) -> List[ArticleDbModel]:
        try:
            news_data = self.db \
                .collection(COLLECTION_NEWS) \
                .document(self.__get_document_name(time)) \
                .get() \
                .to_dict()[language]

            return [ArticleDbModel(**item) for item in news_data]
        except Exception as e:
            logging.error(f"An error occurred while getting article details: {e}")
            sentry_sdk.capture_exception(e)
            return []

    def update_record(self, time: datetime, data: List[ArticlesWithLanguageModel]):
        self.db.collection(COLLECTION_NEWS) \
            .document(self.__get_document_name(time)) \
            .update({item.language: [article.() for article in item.articles] for item in data})

    def __get_document_name(self, time: datetime) -> str:
        return f"{time.year}-{time.month}-{time.day}"


if __name__ == "__main__":
    print(FirebaseRepository(FIREBASE_DB).update_record(
        datetime(2023, 1, 10), [ArticlesWithLanguageModel(language="en", articles=[ArticleDbModel(**{
            "images": [
                "https://example.com/image1.jpg",
                "https://example.com/image2.jpg"
            ],
            "description": "This is a sample description for the article.",
            "title": "Sample Article Title",
            "published_date": "2024-07-24T12:34:56Z",
            "url": "https://example.com/sample-article",
            "publisher": {
                "href": "https://example.com/publisher",
                "title": "Sample Publisher"
            }
        })])]
    )
    )
