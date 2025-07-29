from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import string
from datetime import datetime, timedelta
import secrets

app = Flask(__name__)
CORS(app)  # Enable CORS for Chrome extension

class FakeDataGenerator:
    def __init__(self):
        self.first_names = [
            'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
            'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
            'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
            'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra', 'Donald', 'Donna',
            'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle',
            'Kenneth', 'Laura', 'Kevin', 'Sarah', 'Brian', 'Kimberly', 'George', 'Deborah',
            'Edward', 'Dorothy', 'Ronald', 'Lisa', 'Timothy', 'Nancy', 'Jason', 'Karen'
        ]
        
        self.last_names = [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
            'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
            'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
            'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
            'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill',
            'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell'
        ]
        
        self.companies = [
            'TechCorp', 'Innovate Solutions', 'Global Systems', 'NextGen Industries',
            'Digital Dynamics', 'Smart Technologies', 'Future Enterprises', 'Alpha Industries',
            'Beta Solutions', 'Gamma Corporation', 'Delta Systems', 'Epsilon Technologies',
            'Zeta Innovations', 'Theta Dynamics', 'Lambda Solutions', 'Sigma Corporation',
            'Omega Industries', 'Phoenix Technologies', 'Quantum Systems', 'Nexus Solutions'
        ]
        
        self.street_names = [
            'Main St', 'Oak Ave', 'Pine St', 'Maple Ave', 'Cedar St', 'Elm Ave',
            'Park St', 'Washington Ave', 'Lincoln St', 'Jefferson Ave', 'Madison St',
            'Adams Ave', 'Jackson St', 'Monroe Ave', 'Roosevelt St', 'Wilson Ave',
            'First St', 'Second Ave', 'Third St', 'Fourth Ave', 'Fifth St'
        ]
        
        self.cities = [
            'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
            'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
            'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis',
            'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville',
            'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville'
        ]
        
        self.states = [
            'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
            'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
            'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
            'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
            'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        ]
        
        self.countries = [
            'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
            'Italy', 'Spain', 'Australia', 'Japan', 'South Korea', 'Brazil',
            'India', 'China', 'Mexico', 'Netherlands', 'Sweden', 'Norway'
        ]
        
        self.domains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com',
            'test.com', 'email.com', 'mail.com', 'company.com', 'business.org'
        ]
        
        self.random_words = [
            'amazing', 'brilliant', 'creative', 'dynamic', 'excellent', 'fantastic',
            'great', 'incredible', 'outstanding', 'perfect', 'quality', 'remarkable',
            'superb', 'wonderful', 'awesome', 'magnificent', 'spectacular', 'impressive'
        ]
    
    def generate_phone(self):
        """Generate a realistic US phone number"""
        area_code = random.randint(200, 999)
        exchange = random.randint(200, 999)
        number = random.randint(1000, 9999)
        return f"({area_code}) {exchange}-{number}"
    
    def generate_email(self, first_name=None, last_name=None):
        """Generate a realistic email address"""
        if not first_name:
            first_name = random.choice(self.first_names)
        if not last_name:
            last_name = random.choice(self.last_names)
        
        username_formats = [
            f"{first_name.lower()}.{last_name.lower()}",
            f"{first_name.lower()}{last_name.lower()}",
            f"{first_name.lower()}{random.randint(1, 999)}",
            f"{first_name[0].lower()}{last_name.lower()}",
            f"{first_name.lower()}.{last_name.lower()}{random.randint(1, 99)}"
        ]
        
        username = random.choice(username_formats)
        domain = random.choice(self.domains)
        return f"{username}@{domain}"
    
    def generate_address(self):
        """Generate a realistic street address"""
        number = random.randint(1, 9999)
        street = random.choice(self.street_names)
        return f"{number} {street}"
    
    def generate_zip_code(self):
        """Generate a realistic ZIP code"""
        return f"{random.randint(10000, 99999)}"
    
    def generate_date(self):
        """Generate a random date within the last year"""
        start_date = datetime.now() - timedelta(days=365)
        random_days = random.randint(0, 365)
        random_date = start_date + timedelta(days=random_days)
        return random_date.strftime('%Y-%m-%d')
    
    def generate_password(self, length=12):
        """Generate a secure random password"""
        characters = string.ascii_letters + string.digits + "!@#$%^&*"
        return ''.join(secrets.choice(characters) for _ in range(length))
    
    def generate_random_text(self, word_count=3):
        """Generate random text from word list"""
        words = random.sample(self.random_words, min(word_count, len(self.random_words)))
        return ' '.join(words).title()
    
    def generate_full_data_set(self):
        """Generate a complete set of fake data"""
        first_name = random.choice(self.first_names)
        last_name = random.choice(self.last_names)
        
        return {
            'first_name': first_name,
            'last_name': last_name,
            'full_name': f"{first_name} {last_name}",
            'email': self.generate_email(first_name, last_name),
            'phone': self.generate_phone(),
            'address': self.generate_address(),
            'city': random.choice(self.cities),
            'state': random.choice(self.states),
            'zip_code': self.generate_zip_code(),
            'country': random.choice(self.countries),
            'company': random.choice(self.companies),
            'age': random.randint(18, 80),
            'date': self.generate_date(),
            'password': self.generate_password(),
            'random_text': self.generate_random_text(),
            'username': f"{first_name.lower()}{random.randint(100, 999)}",
            'website': f"https://www.{random.choice(self.companies).lower().replace(' ', '')}.com"
        }

# Initialize the fake data generator
fake_generator = FakeDataGenerator()

@app.route('/')
def home():
    """Home endpoint with API information"""
    return jsonify({
        'message': 'Fake Filler Backend API',
        'version': '1.0.0',
        'endpoints': {
            '/api/fake-data': 'GET - Generate complete fake data set',
            '/api/fake-data/email': 'GET - Generate fake email',
            '/api/fake-data/phone': 'GET - Generate fake phone number',
            '/api/fake-data/address': 'GET - Generate fake address',
            '/api/fake-data/name': 'GET - Generate fake name'
        }
    })

@app.route('/api/fake-data', methods=['GET'])
def get_fake_data():
    """Generate and return a complete set of fake data"""
    try:
        data = fake_generator.generate_full_data_set()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/fake-data/email', methods=['GET'])
def get_fake_email():
    """Generate and return a fake email address"""
    try:
        email = fake_generator.generate_email()
        return jsonify({'email': email})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/fake-data/phone', methods=['GET'])
def get_fake_phone():
    """Generate and return a fake phone number"""
    try:
        phone = fake_generator.generate_phone()
        return jsonify({'phone': phone})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/fake-data/address', methods=['GET'])
def get_fake_address():
    """Generate and return fake address data"""
    try:
        data = {
            'address': fake_generator.generate_address(),
            'city': random.choice(fake_generator.cities),
            'state': random.choice(fake_generator.states),
            'zip_code': fake_generator.generate_zip_code(),
            'country': random.choice(fake_generator.countries)
        }
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/fake-data/name', methods=['GET'])
def get_fake_name():
    """Generate and return fake name data"""
    try:
        first_name = random.choice(fake_generator.first_names)
        last_name = random.choice(fake_generator.last_names)
        data = {
            'first_name': first_name,
            'last_name': last_name,
            'full_name': f"{first_name} {last_name}"
        }
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/fake-data/custom', methods=['POST'])
def get_custom_fake_data():
    """Generate custom fake data based on field types"""
    try:
        request_data = request.get_json()
        fields = request_data.get('fields', [])
        
        result = {}
        for field in fields:
            field_type = field.get('type', 'text')
            field_name = field.get('name', 'field')
            
            if field_type == 'email':
                result[field_name] = fake_generator.generate_email()
            elif field_type == 'phone':
                result[field_name] = fake_generator.generate_phone()
            elif field_type == 'name':
                result[field_name] = random.choice(fake_generator.first_names)
            elif field_type == 'address':
                result[field_name] = fake_generator.generate_address()
            elif field_type == 'city':
                result[field_name] = random.choice(fake_generator.cities)
            elif field_type == 'company':
                result[field_name] = random.choice(fake_generator.companies)
            elif field_type == 'date':
                result[field_name] = fake_generator.generate_date()
            elif field_type == 'password':
                result[field_name] = fake_generator.generate_password()
            else:
                result[field_name] = fake_generator.generate_random_text()
        
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("🚀 Starting Fake Filler Backend Server...")
    print("📍 Server will be running at: http://localhost:5000")
    print("🔗 API Endpoints:")
    print("   - GET  /api/fake-data - Complete fake data set")
    print("   - GET  /api/fake-data/email - Fake email")
    print("   - GET  /api/fake-data/phone - Fake phone")
    print("   - GET  /api/fake-data/address - Fake address")
    print("   - GET  /api/fake-data/name - Fake name")
    print("   - POST /api/fake-data/custom - Custom fake data")
    print("\n✅ Chrome Extension can now connect to this backend!")
    
    app.run(debug=True, host='0.0.0.0', port=5000)