from sqlalchemy import create_engine, Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from .base import ModelBase
from .member import MemberModel


class CourseModel(ModelBase):
    __tablename__ = 'course'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(4), unique=True)

    members = relationship('MemberModel', backref='course')