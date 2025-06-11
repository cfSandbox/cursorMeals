# Company Meal Schedule App

A modern React Next.js application for managing weekly meal schedules in mid-size companies. Built with TypeScript and Tailwind CSS for a responsive, professional experience.

## Features

- **Weekly View**: Display Monday through Friday meal schedule for the current week
- **Current Day Highlighting**: Automatically highlights today's meals with a special border and badge
- **Dual Meal Options**: Shows both breakfast and lunch options for each day
- **Vendor Information**: Displays vendor names and detailed meal descriptions
- **Pricing**: Shows meal prices for budget planning
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations while fetching data
- **Error Handling**: Graceful error handling with retry functionality
- **Mock Data**: Includes realistic sample data for testing and development

## Tech Stack

- **Frontend**: React 18, Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for modern, responsive design
- **API**: Next.js API routes for backend functionality
- **Development**: ESLint for code quality

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cursorMeals
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/meals/         # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── DayCard.tsx        # Individual day display
│   ├── MealItem.tsx       # Meal information
│   ├── LoadingSpinner.tsx # Loading indicator
│   └── WeeklySchedule.tsx # Main schedule component
├── lib/                   # Utility functions
│   ├── mockData.ts        # Sample data generation
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript interfaces
    └── index.ts           # Type definitions
```

## API Endpoints

### GET /api/meals

Returns the weekly meal schedule with mock data.

**Response:**
```json
{
  "success": true,
  "data": {
    "weekStart": "2025-06-09",
    "weekEnd": "2025-06-13",
    "days": [
      {
        "date": "2025-06-09",
        "dayName": "Monday",
        "isToday": false,
        "breakfast": {
          "id": "Monday-breakfast-xyz",
          "vendorName": "Fresh & Healthy",
          "description": "Avocado Toast with Poached Egg",
          "type": "breakfast",
          "day": "Monday",
          "price": 12
        },
        "lunch": {
          "id": "Monday-lunch-abc",
          "vendorName": "Mediterranean Corner",
          "description": "Grilled Chicken Caesar Salad",
          "type": "lunch",
          "day": "Monday",
          "price": 15
        }
      }
      // ... more days
    ]
  }
}
```

## Customization

### Adding New Vendors

Edit `src/lib/mockData.ts` and add new vendor names to the `vendors` array:

```typescript
const vendors = [
  'Fresh & Healthy',
  'Your New Vendor',
  // ... existing vendors
];
```

### Adding New Meal Options

Update the `breakfastOptions` and `lunchOptions` arrays in `src/lib/mockData.ts`:

```typescript
const breakfastOptions = [
  'Your New Breakfast Option',
  // ... existing options
];
```

### Styling Customization

The app uses Tailwind CSS. Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#your-color',
        // ... other shades
      }
    }
  }
}
```

## Future Enhancements

- [ ] User authentication and personal preferences
- [ ] Meal ordering and reservation system
- [ ] Admin panel for managing vendors and meals
- [ ] Integration with real payment systems
- [ ] Dietary restrictions and allergies filtering
- [ ] Nutritional information display
- [ ] Mobile app version
- [ ] Email notifications for daily menus

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, please contact the development team or create an issue in the repository.

---

Made with ❤️ for better workplace dining experiences.
