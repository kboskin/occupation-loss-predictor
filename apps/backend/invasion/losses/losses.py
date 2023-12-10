import logging
import base64
from typing import List

import sentry_sdk
from Cryptodome.Cipher import AES
from Cryptodome.Util.Padding import pad, unpad

from invasion.admin.models import LossesProjectEnum
from invasion.config import ENCRYPTION


class BrokenLossTypeException(Exception):
    """Raised when hash of category is not equal to anything"""
    pass


def check_losses_category_secure(cat: str | None = None) -> str:
    cryptor = Cryptor(ENCRYPTION.key)

    tables = [str(e) for e in LossesProjectEnum]
    if cat:
        try:
            decoded = cryptor.decrypt(cat)
            logging.debug(f"decoded category: {decoded}")
            if decoded not in tables:
                raise BrokenLossTypeException
        except Exception as e:
            logging.debug(f"decoding exception {e}")
            sentry_sdk.capture_exception(e)
            raise BrokenLossTypeException

    return cat


def check_losses_category(cat: str | None = None) -> List[LossesProjectEnum]:
    tables = [e for e in LossesProjectEnum]
    if cat:
        try:
            enumed = LossesProjectEnum(cat)
            if enumed not in tables:
                raise BrokenLossTypeException
        except Exception as e:
            logging.debug(f"decoding exception {e}")
            sentry_sdk.capture_exception(e)
            raise BrokenLossTypeException

    categories: List[LossesProjectEnum] = []
    if cat:
        categories.append(enumed)
    else:
        categories = [item.value for item in LossesProjectEnum]

    return categories


class Cryptor:
    def __init__(self, key):
        self.SECRET_KEY = str(key).encode("utf-8")
        self.BLOCK_SIZE = 32  # Bytes
        self.CIPHER = AES.new(self.SECRET_KEY, AES.MODE_ECB)  # never use ECB in strong systems obviously

    def encrypt(self, text):
        text = str(text).encode("utf-8")
        return base64.b64encode(self.CIPHER.encrypt(pad(text, self.BLOCK_SIZE))).decode("utf-8")

    def decrypt(self, encoded_text):
        self.CIPHER = AES.new(self.SECRET_KEY, AES.MODE_ECB)
        return unpad(self.CIPHER.decrypt(base64.b64decode(encoded_text)), self.BLOCK_SIZE).decode("utf-8")
