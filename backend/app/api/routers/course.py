from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import IntegrityError

from models.base import SessionLocal
from models.course import CourseModel

router = APIRouter()


@router.post("/courses")
async def register_course(name: str):
    db = SessionLocal()
    try:
        course = CourseModel(name=name)
        db.add(course)
        db.commit()
        db.refresh(course)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Course already exists")
    finally:
        db.close()
    return course


@router.get("/courses")
async def get_courses():
    db = SessionLocal()
    course = db.query(CourseModel).all()
    db.close()
    return course
    

@router.delete("/courses/{name}")
async def delete_course_by_name(name: str):
    db = SessionLocal()
    course = db.query(CourseModel).filter(CourseModel.name == name).one()
    if course is None:
        db.close()
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(course)
    db.commit()
    db.close()
    return {"message": "Course deleted successfully"}
