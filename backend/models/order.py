from sqlalchemy import Column, Integer, String, Date
from database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer)
    item = Column(String)
    quantity = Column(Integer)
    order_date = Column(Date)
