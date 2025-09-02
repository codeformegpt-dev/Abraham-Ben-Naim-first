
import { useState } from 'react';
import Button from '../../../components/base/Button';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { name, email, phone });
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
    }, 3000);
  };

  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            מוכן לשנות את חייך?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            הירשם עכשיו וקבל את הסרטון הראשון בחינם + ייעוץ אישי של 15 דקות
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center justify-center space-x-3 space-x-reverse">
              <i className="ri-check-double-line text-green-300 text-2xl"></i>
              <span className="text-lg">סרטון בחינם מיד</span>
            </div>
            <div className="flex items-center justify-center space-x-3 space-x-reverse">
              <i className="ri-phone-line text-green-300 text-2xl"></i>
              <span className="text-lg">ייעוץ אישי 15 דקות</span>
            </div>
            <div className="flex items-center justify-center space-x-3 space-x-reverse">
              <i className="ri-shield-check-line text-green-300 text-2xl"></i>
              <span className="text-lg">ללא התחייבות</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 max-w-2xl mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6" id="cta-form">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-2 text-right">
                    שם מלא
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:border-blue-300 focus:bg-white/30 text-right"
                    placeholder="הכנס את שמך המלא"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2 text-right">
                    כתובת אימייל
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:border-blue-300 focus:bg-white/30 text-right"
                    placeholder="הכנס כתובת אימייל"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-blue-100 mb-2 text-right">
                    מספר טלפון
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:border-blue-300 focus:bg-white/30 text-right"
                    placeholder="הכנס מספר טלפון"
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full bg-white text-blue-900 hover:bg-blue-50 text-xl py-4 shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <i className="ri-gift-line ml-2 text-2xl"></i>
                  קבל את הסרטון בחינם עכשיو!
                </Button>
              </form>
            ) : (
              <div className="text-center py-12">
                <i className="ri-check-double-line text-6xl text-green-300 mb-4"></i>
                <h3 className="text-2xl font-bold mb-4">תודה על ההרשמה!</h3>
                <p className="text-blue-100 mb-6">
                  הסרטון נשלח אליך באימייל, ונחזור אליך בקרוב לתיאום הייעוץ האישי
                </p>
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <span className="text-sm text-blue-200">בדוק את תיבת האימייל שלך</span>
                  <i className="ri-mail-line text-blue-200"></i>
                </div>
              </div>
            )}
          </div>

          {/* Urgency */}
          <div className="mt-8 text-center">
            <p className="text-blue-200 text-lg">
              <i className="ri-time-line ml-2"></i>
              הצעה מוגבלת - רק ל-48 השעות הקרובות
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <i className="ri-shield-check-line text-3xl text-green-300 mb-2"></i>
              <p className="text-sm text-blue-100">מאובטח ומוצפן</p>
            </div>
            <div>
              <i className="ri-customer-service-line text-3xl text-yellow-300 mb-2"></i>
              <p className="text-sm text-blue-100">תמיכה 24/7</p>
            </div>
            <div>
              <i className="ri-medal-line text-3xl text-orange-300 mb-2"></i>
              <p className="text-sm text-blue-100">מטפל מוסמך</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
