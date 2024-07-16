from typing import List

from pydantic import BaseModel, Field


class Publisher(BaseModel):
    href: str
    title: str


class ArticleShort(BaseModel):
    title: str
    description: str
    published_date: str = Field(..., alias='published date')
    url: str
    publisher: Publisher

    class Config:
        allow_population_by_field_name = True


class ArticleDetails(ArticleShort):
    images: List[str]
    description: str = Field(..., alias='text')

    class Config:
        allow_population_by_field_name = True

