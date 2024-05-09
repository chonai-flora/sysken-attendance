from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy import desc, asc

from models.base import SessionLocal
from models.course import CourseModel
from models.member import MemberModel

router = APIRouter()


@router.post("/members")
async def register_member(last_name: str, first_name: str, grade: int, course_name: str, number: int, barcode: str):
    db = SessionLocal()
    course = db.query(CourseModel).filter(CourseModel.name == course_name).one()
    if not course:
        raise HTTPException(status_code=404, detail=f"Course with id {course_name} not found")

    try:
        member = MemberModel(
            id=f"{grade}{course.name}{number:02}",
            name=f"{last_name} {first_name}",
            grade=grade,
            course_id=course.id,
            number=number,
            barcode=barcode
        )
        db.add(member)
        db.commit()
        db.refresh(member)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Member already exists")
    finally:
        db.close()
    return member


@router.get("/members")
async def get_members():
    db = SessionLocal()
    members = db.query(MemberModel).\
        order_by(desc(MemberModel.grade)).\
        order_by(asc(MemberModel.course_id)).\
        order_by(asc(MemberModel.number)).\
        all()
    db.close()
    return members


@router.get("/members/{id}")
async def get_member(id: str):
    db = SessionLocal()
    member = db.query(MemberModel).filter(MemberModel.id == id).one()
    if member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    db.close()
    return member


@router.get("/members/barcode/{barcode}")
async def get_member_by_barcode(barcode: str):
    db = SessionLocal()
    member = db.query(MemberModel).filter(MemberModel.barcode == barcode).one()
    if member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    db.close()
    return member


@router.delete("/members/{id}")
async def delete_member(id: str):
    db = SessionLocal()
    member = db.query(MemberModel).filter(MemberModel.id == id).one()
    if member is None:
        db.close()
        raise HTTPException(status_code=404, detail="Member not found")
    db.delete(member)
    db.commit()
    db.close()
    return {"message": "Member deleted successfully"}
