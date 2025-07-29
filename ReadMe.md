# Fake Filler Chrome Extension

A powerful Chrome extension for filling forms with realistic fake data for testing purposes. Features a Python Flask backend that generates high-quality test data.

## 🚀 Features

- **One-click Fill**: Instantly fill all form fields with realistic fake data
- **Smart Field Detection**: Automatically detects field types (email, phone, name, etc.)
- **Complete Form Support**: Handles text inputs, dropdowns, radio buttons, checkboxes, dates, and numbers
- **Random Data Generation**: Creates new data every time for thorough testing
- **Clean Interface**: Modern, intuitive popup interface
- **Keyboard Shortcuts**: Quick access via Ctrl+Shift+F (fill) and Ctrl+Shift+C (clear)
- **Python Backend**: Robust data generation with realistic patterns

## 📁 Project Structure

```
fake-filler/
├── extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── content.js
│   └── icons/
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
├── backend/
│   ├── app.py
│   └── requirements.txt
└── README.md
```

## 🛠️ Setup Instructions

### 1. Python Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask server:**
   ```bash
   python app.py
   ```

   The server will start at `http://localhost:5000`

### 2. Chrome Extension Setup

1. **Open Chrome and go to:**
   ```
   chrome://extensions/
   ```

2. **Enable Developer mode** (toggle in top-right corner)

3. **Click "Load unpacked"** and select the `extension` folder

4. **Pin the extension** to your toolbar for easy access

## 🎯 Usage

### Basic Usage
1. Navigate to any webpage with forms
2. Click the Fake Filler extension icon
3. Click "Fill All Fields" to populate the form with fake data
4. Click "Clear All Fields" to reset the form

### Keyboard Shortcuts
- **Ctrl+Shift+F**: Fill all fields
- **Ctrl+Shift+C**: Clear all fields

### Supported Field Types
- Text inputs (name, address, company, etc.)
- Email fields
- Phone number fields
- Password fields
- Date fields
- Number fields
- Dropdown selects
- Radio buttons
- Checkboxes
- Textareas

## 🔌 API Endpoints

The Python backend provides several API endpoints:

- `GET /api/fake-data` - Complete fake data set
- `GET /api/fake-data/email` - Generate fake email
- `GET /api/fake-data/phone` - Generate fake phone number
- `GET /api/fake-data/address` - Generate fake address data
- `GET /api/fake-data/name` - Generate fake name data
- `POST /api/fake-data/custom` - Generate custom fake data

### Example API Response

```json
{
  "first_name": "John",
  "last_name": "Smith",
  "full_name": "John Smith",
  "email": "john.smith@example.com",
  "phone": "(555) 123-4567",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip_code": "10001",
  "country": "United States",
  "company": "TechCorp",
  "age": 32,
  "date": "2024-03-15",
  "password": "SecurePass123!",
  "random_text": "Amazing Creative Dynamic"
}
```

## 🎨 Customization

### Adding New Data Types

To add new fake data types, modify the `FakeDataGenerator` class in `app.py`:

```python
def generate_custom_field(self):
    """Generate custom fake data"""
    return "Your custom data here"
```

### Modifying Field Detection

Update the field detection logic in `popup.js` and `content.js`:

```javascript
if (fieldName.includes('custom')) {
    value = fakeData.custom_field;
}
```

## 🔧 Development

### Extension Development
- Modify `popup.html` for UI changes
- Update `popup.js` for popup functionality
- Edit `content.js` for page interaction logic
- Update `manifest.json` for permissions and configuration

### Backend Development
- Modify `app.py` to add new endpoints or data types
- Update `requirements.txt` for new dependencies
- Add new fake data generators in the `FakeDataGenerator` class

## 📝 Notes

- The extension requires the Python backend to be running on `localhost:5000`
- All data is generated randomly and never stored
- The extension respects disabled and readonly form fields
- CORS is enabled for Chrome extension communication

## 🐛 Troubleshooting

### Common Issues

1. **Extension not working:**
   - Ensure the Python backend is running
   - Check browser console for errors
   - Verify the extension is loaded and enabled

2. **Backend connection errors:**
   - Confirm Flask server is running on port 5000
   - Check if localhost:5000 is accessible
   - Verify CORS is properly configured

3. **Fields not filling:**
   - Check if fields are disabled or readonly
   - Verify field selectors in the JavaScript code
   - Look for JavaScript errors in the console

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Happy Testing!** 🎭✨