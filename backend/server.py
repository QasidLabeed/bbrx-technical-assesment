from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_cors import CORS, cross_origin
from datetime import datetime

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)

app = Flask(__name__)
cors = CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@db:5432/postgres'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

class ServiceCharge(db.Model):
    __tablename__ = 'service_charge'
    id = db.Column(db.Integer, primary_key=True)
    period_code = db.Column(db.String(10), unique=True, nullable=False)
    period_label = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f"<ServiceCharge period_code={self.period_code} period_label={self.period_label} start_date={self.start_date} end_date={self.end_date}>"

with app.app_context():
    db.create_all()

@app.route('/service-charge', methods=['POST'])
@cross_origin()
def create_service_charge():
    data = request.json
    period_code = data.get('period_code')
    period_label = data.get('period_label')
    start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d').date()
    end_date = datetime.strptime(data.get('end_date'), '%Y-%m-%d').date()
    try:
        new_service_charge = ServiceCharge(
            period_code=period_code,
            period_label=period_label,
            start_date=start_date,
            end_date=end_date
        )
        db.session.add(new_service_charge)
        db.session.commit()
        return jsonify({'message': 'Service charge created successfully'}), 201        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)