from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String)
    surname = Column(String)
    middleName = Column(String)
    dob = Column(String)
    address = Column(String)
    registrationDate = Column(String)
    developerFlag = Column(Boolean)
