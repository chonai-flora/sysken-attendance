from fastapi import APIRouter, HTTPException
from typing_extensions import TypedDict
from sqlalchemy.orm import Session
import datetime

from models.base import SessionLocal
from models.member import MemberModel
from models.log import LogModel

router = APIRouter()


@router.post("/logs")
async def create_log(barcode: str, date: datetime.date):
    db = SessionLocal()
    member = db.query(MemberModel).filter(MemberModel.barcode == barcode).one()
    if not member:
        raise HTTPException(status_code=404, detail=f"Member with id {member_id} not found")

    log = LogModel(
        id=f"{date:%Y%m%d}_{member.id}",
        date=date,
        member_id=member.id
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    db.close()
    return log


@router.get("/logs")
async def get_logs():
    db = SessionLocal()
    logs = db.query(LogModel).all()
    db.close()
    return logs


@router.get("/logs/{id}")
async def get_log(id: str):
    db = SessionLocal()
    log = db.query(LogModel).filter(LogModel.id == id).one()
    if log is None:
        raise HTTPException(status_code=404, detail="Log not found")
    db.close()
    return log


@router.get("/logs/member/{member_id}")
async def get_logs_by_member_id(member_id: str):
    db = SessionLocal()
    logs = db.query(LogModel).filter(LogModel.member_id == member_id).all()
    db.close()
    return logs


# TODO: 日付比較
@router.get("/logs/member/{date}")
async def get_logs_by_date(date: datetime.date):
    db = SessionLocal()
    logs = db.query(LogModel).filter(LogModel.date == date).all()
    db.close()
    return logs


@router.delete("/logs/{id}")
async def delete_log(id: str):
    db = SessionLocal()
    log = db.query(LogModel).filter(LogModel.id == id).one()
    if log is None:
        raise HTTPException(status_code=404, detail="Log not found")
    db.delete(log)
    db.commit()
    db.close()
    return {"message": f"Log deleted successfully"}
