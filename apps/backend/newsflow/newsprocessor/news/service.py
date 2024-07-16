import logging
from datetime import datetime
from datetime import timedelta
from typing import List

import sentry_sdk
from gnews import GNews
from newsprocessor.news.models import ArticleShort, ArticleDetails
from newspaper import Article, Config
import requests

SEARCH_TERM = "Війна в Україні"


def get_article_details(url: str) -> dict:
    final_url = url

    try:
        response = requests.get(url, allow_redirects=True)
        if len(response.history) > 0:
            for r in response.history:
                logging.info(f"Redirect from {r.url} to {r.headers['Location']}")
            final_url = response.url
        else:
            logging.info("The page has no redirects.")
    except requests.exceptions.RequestException as e:
        logging.info(f"An error occurred: {e}")
        sentry_sdk.capture_exception(e)

    user_agent = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/50.0.2661.102 Safari/537.36')
    config = Config()
    config.browser_user_agent = user_agent
    page = Article(final_url, config=config)
    page.download()
    page.parse()

    return page.__dict__


class NewsService:

    @staticmethod
    async def get_news(date_from: datetime) -> List[ArticleDetails]:
        logging.debug("executing news iteration")
        date_to = date_from + timedelta(days=1)
        google_news = GNews(
            language='uk',
            country='UA',
            start_date=date_from,
            end_date=date_to,
            max_results=50,
        )

        ukraine_news = google_news.get_news(SEARCH_TERM)
        short_articles = [ArticleShort(**item) for item in ukraine_news]

        final_list = []
        for article in short_articles:
            try:
                final_list.append(ArticleDetails(**{**article.__dict__, **get_article_details(article.url)}))
            except Exception as e:
                logging.error(f"An error occurred while getting article details: {e}")
                sentry_sdk.capture_exception(e)

        return final_list
