import Button from '../../../components/base/Button';

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.3), rgba(30, 58, 138, 0.1)), url('https://static.readdy.ai/image/0a3054afb3e73704d33cc7321f0eb249/c82497fedfe524ae09931b0c38d9e2f3.jfif')`
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-right space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              תודעה מחוללת
              <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                ריפוי
              </span>
            </h1>
            
            <p className="text-xl text-blue-50 leading-relaxed">
              גלה כיצד לפתור חסימות פנימיות, לטפל בבעיות פיזיות ולהגשים את המטרות שלך 
              באמצעות שיטות מתקדמות של טיפול מקוון מהבית
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => window.location.href = '#cta'}
              >
                <i className="ri-play-circle-line ml-2"></i>
                הירשם עכשיו וקבל סרטון ראשון בחינם
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-900 backdrop-blur-sm"
                onClick={() => window.location.href = '#how-it-works'}
              >
                איך זה עובד
              </Button>
            </div>
            
            <div className="flex items-center justify-end space-x-6 space-x-reverse pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-blue-200 text-sm">לקוחות מרוצים</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-blue-200 text-sm">שיפור משמעותי</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10+</div>
                <div className="text-blue-200 text-sm">שנות ניסיון</div>
              </div>
            </div>
          </div>
          
          {/* Mirror Effect Placeholder */}
          <div className="hidden lg:block relative">
            <div className="w-full h-96 bg-gradient-to-br from-white/20 to-blue-100/20 rounded-3xl backdrop-blur-sm border border-white/30 shadow-2xl">
              <div className="absolute inset-4 bg-gradient-to-br from-blue-50/80 to-white/80 rounded-2xl backdrop-blur-lg flex items-center justify-center">
                <div className="text-center text-blue-900">
                  <i className="ri-video-line text-6xl mb-4"></i>
                  <p className="text-lg font-semibold">קורס מקוון אינטראקטיבי</p>
                  <p className="text-sm opacity-70">צפה בסרטון ההיכרות</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line text-white text-2xl"></i>
      </div>
    </section>
  );
}
