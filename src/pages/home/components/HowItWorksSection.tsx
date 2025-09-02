
import { useState } from 'react';
import Button from '../../../components/base/Button';

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: 'הירשם וקבל סרטון בחינם',
      description: 'הירשם לקורס וקבל גישה מיידית לסרטון הראשון בחינם.',
      icon: 'ri-play-circle-line',
      duration: 'מיידי'
    },
    {
      number: 2,
      title: 'טיפול מקוון מותאם אישית',
      description: 'קבל טיפול מקצועי ומותאם אישית דרך פלטפורמה מקוונת מתקדמת.',
      icon: 'ri-video-chat-line',
      duration: '45-60 דקות'
    },
    {
      number: 3,
      title: 'השגת מטרות ותוצאות',
      description: 'עקוב אחר ההתקדמות שלך וראה שינויים משמעותיים בחיים.',
      icon: 'ri-trophy-line',
      duration: 'תוך 4-8 שבועות'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            איך זה עובד?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            תהליך פשוט ויעיל בשלושה שלבים שיוביל אותך לשינוי משמעותי בחיים
          </p>
        </div>

        {/* Horizontal Steps - RTL Direction */}
        <div className="max-w-6xl mx-auto">
          {/* Connection Line - RTL */}
          <div className="relative mb-12">
            <div className="absolute top-10 right-0 w-full max-w-4xl h-0.5 bg-gradient-to-l from-blue-300 via-blue-600 to-blue-300 mx-auto left-0"></div>
            
            {/* Steps Grid - RTL Order */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" dir="rtl">
              {steps.map((step) => (
                <div 
                  key={step.number}
                  className={`text-center transition-all duration-500 ${
                    activeStep === step.number ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onMouseEnter={() => setActiveStep(step.number)}
                >
                  {/* Step Circle and Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      {/* Step Number Circle */}
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeStep === step.number 
                          ? 'bg-blue-900 text-white shadow-2xl scale-110' 
                          : 'bg-white text-blue-900 border-4 border-blue-300 shadow-lg'
                      }`}>
                        <span className="text-2xl font-bold">{step.number}</span>
                      </div>

                      {/* Icon */}
                      <div className={`absolute -bottom-2 -left-2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeStep === step.number 
                          ? 'bg-white text-blue-900 shadow-lg' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        <i className={`${step.icon} text-lg`}></i>
                      </div>

                      {/* Pulse Animation */}
                      {activeStep === step.number && (
                        <div className="absolute inset-0 rounded-full bg-blue-900 animate-ping opacity-25"></div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="text-blue-600 text-sm font-medium">
                      {step.duration}
                    </div>
                    
                    <h3 className="text-xl font-bold text-blue-900">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>

                    <Button 
                      variant="outline"
                      onClick={() => window.location.href = step.number === 1 ? '#cta' : '#contact'}
                    >
                      {step.number === 1 ? 'התחל עכשיו' : 'למידע נוסף'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              מוכן להתחיל את המסע שלך?
            </h3>
            <p className="text-gray-600 mb-6">
              הצטרף לאלפי לקוחות מרוצים שכבר שינו את חייהם עם הקורסים שלנו
            </p>
            <Button 
              size="lg"
              onClick={() => window.location.href = '#cta'}
            >
              <i className="ri-rocket-line ml-2"></i>
              התחל עכשיו בחינם
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
