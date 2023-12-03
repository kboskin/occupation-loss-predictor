from datetime import datetime
from enum import Enum
from typing import List

import requests
from bs4 import BeautifulSoup
from pydantic import BaseModel


class MinFinEnum(str, Enum):
    aircraft = 'Літаки'
    aircraft_warfare = 'Засоби ППО'
    aircraft_warfare_2 = 'ЗРК БУК'

    apv = 'ББМ'
    artillery = 'Артилерійські системи'

    fuel_tanks = 'Автомобілі та автоцистерни'
    fuel_tanks_2 = "Автомобілі"
    fuel_tanks_3 = "Цистерни з ППМ"

    helicopters = 'Гелікоптери'
    missiles = 'Крилаті ракети'

    mlrs = 'РСЗВ'
    mlrs_2 = 'РСЗВ Град'

    uav = 'БПЛА'
    personnel = 'Особовий склад'
    special_equipment = 'Спеціальна техніка'

    ballistic = 'Пускові установки ОТРК'

    submarines = 'Підводні човни'
    tanks = 'Танки'
    warships = 'Кораблі (катери)'


class MinFinModel(BaseModel):
    date: datetime
    losses: int
    losses_increase: int
    type: MinFinEnum


def scrap_minfin_data(year: int, month: int) -> List[MinFinModel]:
    html = requests.get(
        f"https://index.minfin.com.ua/ua/russian-invading/casualties/month.php?month={year}-{month}").text
    soup = BeautifulSoup(html, 'html.parser')

    li = soup.findAll("li", {"class": "gold"})

    list_of_losses: List[MinFinModel] = []
    for index in range(len(li)):
        item = li[index]
        date = item.span.text
        date = datetime.strptime(date.replace(".", "/"), "%d/%m/%Y")

        for loss in item.div.ul:
            losses_text = loss.text
            casualties_add = loss.small
            if casualties_add is None:
                # means no updates
                casualties_add = 0
            else:
                casualties_add = casualties_add.text
                casualties_add = eval(casualties_add.replace("(", "").replace(")", ""))

            digits = int([int(i) for i in losses_text.split() if i.isdigit()][0])

            try:
                list_of_losses.append(
                    MinFinModel(
                        **{
                            "date": date,
                            "losses": digits,
                            "losses_increase": casualties_add,
                            "type": MinFinEnum(losses_text.split("—")[0].strip())
                        }
                    )
                )
            except:
                print(date)

        return list_of_losses
