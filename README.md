# MERI SADAK - Road Maintenance System (Frontend)

A modern, responsive frontend for a civic-road complaint website built with Bootstrap 5, featuring a clean design and user-friendly interface for reporting and tracking road maintenance issues.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Modern UI**: Clean, professional design with custom styling
- **Interactive Forms**: Comprehensive complaint submission and user registration
- **Real-time Filtering**: Advanced filtering system for complaint records
- **User Authentication**: Separate login systems for citizens and government officials
- **Contact Integration**: Contact forms with Google Maps integration
- **Accessibility**: WCAG compliant design with proper semantic HTML

## 📁 Project Structure

```
MERI_SADAK/
├── index.html              # Home page
├── about.html              # About Us page
├── complaint.html          # Complaint submission form
├── records.html            # Records and tracking page
├── contact.html            # Contact Us page
├── signup.html             # User registration
├── login.html              # Login page (User & Government)
├── assets/
│   ├── css/
│   │   └── style.css       # Custom styles
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   └── images/
│       └── logo.png        # Placeholder logo
└── README.md               # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: #0f4c81 (Navy Blue)
- **Accent**: #f4b942 (Gold)
- **Background**: #f7f9fb (Light Gray)
- **Text Dark**: #2c3e50
- **Text Light**: #6c757d

### Typography
- **Headings**: Poppins (Google Fonts)
- **Body Text**: Lora (Google Fonts)

### Components
- Bootstrap 5 Cards with custom shadows
- Responsive navigation with hamburger menu
- Form validation with real-time feedback
- Status badges with color coding
- Interactive buttons with hover effects

## 📱 Pages Overview

### 1. Home Page (index.html)
- Hero section with call-to-action buttons
- Three feature cards (About Us, Complaints, Records)
- Why Choose MERI SADAK section
- Responsive grid layout

### 2. About Us (about.html)
- Mission and vision statements
- Two-column layout with images
- "How It Works" process explanation
- Company values and CTA section

### 3. Complaint Form (complaint.html)
- Comprehensive complaint submission form
- File upload for images
- Priority and type selection
- Form validation and guidelines
- Anonymous submission option

### 4. Records (records.html)
- Advanced filtering system (Type, Status, Date, Priority)
- Responsive card grid layout
- Color-coded status badges
- Pagination support
- Real-time filtering functionality

### 5. Contact Us (contact.html)
- Contact form with validation
- Contact information display
- Google Maps integration
- FAQ accordion section
- Emergency contact information

### 6. Sign Up (signup.html)
- User registration form
- Account type selection (Citizen, Contractor, Government)
- Password strength validation
- Terms and conditions acceptance
- Newsletter subscription option

### 7. Login (login.html)
- Dual login system (User & Government)
- Password visibility toggle
- Remember me functionality
- Security notice
- Forgot password link

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with CSS variables
- **Bootstrap 5**: Responsive framework
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Typography
- **Google Maps**: Location integration

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open** any HTML file in a web browser
3. **No build process required** - it's ready to use!

### Local Development
```bash
# Simply open the index.html file in your browser
# Or use a local server for better development experience
python -m http.server 8000
# Then visit http://localhost:8000
```

## 📱 Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: 768px - 992px
- **Large Desktop**: > 992px

## ✨ Key Features

### Form Validation
- Real-time field validation
- Email format checking
- Password strength requirements
- Required field indicators
- Custom error messages

### Interactive Elements
- Smooth scrolling navigation
- Hover effects on cards and buttons
- Collapsible mobile menu
- Image preview for file uploads
- Dynamic filtering system

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color scheme
- Screen reader friendly

## 🎯 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Customization

### Adding New Pages
1. Copy an existing HTML file
2. Update the navigation links
3. Modify the page content
4. Ensure responsive design

### Styling Changes
- Modify CSS variables in `style.css`
- Update color scheme in `:root` selector
- Customize component styles as needed

### JavaScript Functionality
- Add new functions in `main.js`
- Extend form validation as needed
- Implement additional interactive features

## 🔧 Form Handling

**Note**: This is a frontend-only implementation. For production use, you'll need to:

1. Set up a backend server
2. Implement form submission endpoints
3. Add database integration
4. Configure email services
5. Implement user authentication

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For questions or support, please contact:
- Email: info@merisadak.com
- Phone: +1 (555) 123-4567

---

**Made with ❤️ for better roads and communities**
