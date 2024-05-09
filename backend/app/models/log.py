from sqlalchemy import create_engine, Column, String, Integer, DateTime, ForeignKey, Date

from .base import ModelBase
from .member import MemberModel


class LogModel(ModelBase):
    __tablename__ = 'log'

    id = Column(String(16), primary_key=True, unique=True)
    date = Column(Date, nullable=False)
    member_id = Column(String(8), ForeignKey('member.id'))