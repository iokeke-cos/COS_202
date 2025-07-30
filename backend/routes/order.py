from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.order import Order as OrderModel
from schemas.order import OrderCreate, OrderUpdate

router = APIRouter()

@router.post("/orders/")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    db_order = OrderModel(
        customer_id=order.customer_id,
        item=order.item,
        quantity=order.quantity,
        order_date=order.order_date
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return {"message": "Order saved", "order_id": db_order.id}

@router.get("/orders/")
def get_orders(db: Session = Depends(get_db)):
    return db.query(OrderModel).all()

@router.put("/orders/{order_id}")
def update_order(order_id: int, updated_order: OrderUpdate, db: Session = Depends(get_db)):
    order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found") # type: ignore
    for key, value in updated_order.dict().items():
        setattr(order, key, value)
    db.commit()
    db.refresh(order)
    return order

@router.delete("/orders/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found") # type: ignore
    db.delete(order)
    db.commit()
    return {"message": "Order deleted"}