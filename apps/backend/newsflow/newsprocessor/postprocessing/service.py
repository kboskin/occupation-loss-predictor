from typing import List

from newsprocessor.news.models import ArticleDetails


class PostProcessingService:

    @staticmethod
    async def postprocess(original_articles: List[ArticleDetails]):
        pass