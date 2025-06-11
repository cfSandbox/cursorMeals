import Link from 'next/link';

// Function to get Monday of the current week
function getCurrentMondayDate(): string {
  const today = new Date();
  const currentDay = today.getDay();
  
  // Calculate days to subtract to get to Monday
  // Sunday = 0, Monday = 1, Tuesday = 2, ..., Saturday = 6
  // For Sunday (0): go back 6 days to get previous Monday
  // For Monday (1): stay same day (0 days)
  // For Tuesday (2): go back 1 day
  // For Wednesday (3): go back 2 days
  // etc.
  const daysToSubtract = currentDay === 0 ? 6 : currentDay - 1;
  
  const monday = new Date(today);
  monday.setDate(today.getDate() - daysToSubtract);
  monday.setHours(0, 0, 0, 0); // Reset time to start of day
  
  // Format as YYYY-MM-DD using local time to avoid timezone issues
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, '0');
  const day = String(monday.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

export default function Home() {
  const currentWeekParam = getCurrentMondayDate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-12 px-4">
      {/* Hero Section */}
      <div className="text-center bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/30 max-w-4xl">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          🍽️ Company Meals
        </h1>
        <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
          Streamline your office dining experience with our comprehensive meal scheduling platform
        </p>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover delicious breakfast and lunch options from our partner vendors. 
          Fresh meals delivered daily to keep your team energized, satisfied, and productive.
        </p>
        
        {/* CTA Button */}
        <Link
          href={`/dashboard?week=${currentWeekParam}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-12 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          View This Week&apos;s Menu
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Planning</h3>
          <p className="text-gray-600">
            View complete weekly meal schedules with breakfast and lunch options for every weekday
          </p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center">
          <div className="text-4xl mb-4">🏪</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Partner Vendors</h3>
          <p className="text-gray-600">
            Carefully selected local restaurants and caterers providing fresh, quality meals daily
          </p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Access</h3>
          <p className="text-gray-600">
            Quick access to meal information, helping you plan your day and stay nourished
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">Need to check a different week?</p>
        <Link
          href="/dashboard"
          className="text-blue-600 hover:text-blue-700 underline text-lg font-medium"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
} 