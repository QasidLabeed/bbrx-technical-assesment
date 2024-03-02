from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@db:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class ServiceCharge(db.Model):
     
    id = db.Column(db.Integer, primary_key=True)
    period_code = db.Column(db.String(10), unique=True, nullable=False)
    period_label = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f"<ServiceCharge period_code={self.period_code} period_label={self.period_label} start_date={self.start_date} end_date={self.end_date}>"


@app.route('/service-charges', methods=['POST'])
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
    db.create_all()
    app.run(host='0.0.0.0', port=5000)