
from pydantic import BaseModel
from typing import Optional

class CustomerCreate(BaseModel):
    firstName: str
    surname: str
    middleName: str
    dob: str
    address: str
    registrationDate: str
    developerFlag: bool

class CustomerUpdate(BaseModel):
    firstName: Optional[str]
    surname: Optional[str]
    middleName: Optional[str]
    dob: Optional[str]
    address: Optional[str]
    registrationDate: Optional[str]
    developerFlag: Optional[bool]
