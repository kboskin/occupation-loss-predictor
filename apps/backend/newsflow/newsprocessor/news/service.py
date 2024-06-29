import logging
from datetime import datetime
from datetime import timedelta
from typing import List

from gnews import GNews


class NewsService:

    @staticmethod
    async def get_news(date_from: datetime) -> List[str]:
        logging.debug("executing news iteration")
        date_to = date_from + timedelta(days=1)
        google_news = GNews(
            language='ua',
            country='UA',
            start_date=date_from,
            end_date=date_to,
            max_results=50,
        )

        ukraine_news = google_news.get_news("Війна в Україні")
        print({'date': date_from, 'news': ukraine_news})
        logging.debug({'date': date_from, 'news': ukraine_news})
        return [str(item['publisher']['href']) for item in ukraine_news]
