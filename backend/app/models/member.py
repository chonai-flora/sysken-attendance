from sqlalchemy import create_engine, Column, String, Integer, DateTime, ForeignKey

from .base import ModelBase


class MemberModel(ModelBase):
    __tablename__ = 'member'

    id = Column(String(6), primary_key=True, unique=True)
    name = Column(String(32), nullable=False)
    grade = Column(Integer, nullable=False)
    course_id = Column(Integer, ForeignKey('course.id'))
    number = Column(Integer, nullable=False)
    barcode = Column(String(16), nullable=False, unique=True)