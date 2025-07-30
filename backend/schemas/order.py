from pydantic import BaseModel
from datetime import date

class OrderBase(BaseModel):
    customer_id: int
    item: str
    quantity: int
    order_date: date

class OrderCreate(OrderBase):
    pass

class OrderUpdate(OrderBase):
    pass 

class OrderOut(OrderBase):
    id: int

    class Config:
        orm_mode = True
