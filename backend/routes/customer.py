
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.customer import CustomerCreate, CustomerUpdate
from models.customer import Customer as CustomerModel

router = APIRouter()

@router.post("/submit-customer")
def submit_customer(data: CustomerCreate, db: Session = Depends(get_db)):
    customer = CustomerModel(
        firstName=data.firstName,
        surname=data.surname,
        middleName=data.middleName,
        dob=data.dob,
        address=data.address,
        registrationDate=data.registrationDate,
        developerFlag=data.developerFlag
    )
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return {"message": "Customer submitted successfully", "customer_id": customer.id}

@router.get("/customers/")
def get_customers(db: Session = Depends(get_db)):
    return db.query(CustomerModel).all()

@router.put("/customers/{customer_id}")
def update_customer(customer_id: int, updated_data: CustomerUpdate, db: Session = Depends(get_db)):
    customer = db.query(CustomerModel).filter(CustomerModel.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found") # type: ignore
    
    for field, value in updated_data.dict(exclude_unset=True).items():
        setattr(customer, field, value)

    db.commit()
    db.refresh(customer)
    return {"message": "Customer updated", "customer": customer}