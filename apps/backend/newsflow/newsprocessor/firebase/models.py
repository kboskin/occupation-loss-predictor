from typing import List

from pydantic import BaseModel


class PublisherDbModel(BaseModel):
    href: str
    title: str


class ArticleDbModel(BaseModel):
    images: List[str]
    description: str
    title: str
    published_date: str
    url: str
    publisher: PublisherDbModel


class ArticlesWithLanguageModel(BaseModel):
    language: str
    articles: List[ArticleDbModel]
