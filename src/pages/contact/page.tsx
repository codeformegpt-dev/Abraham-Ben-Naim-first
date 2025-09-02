import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Button from '../../components/base/Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/contact-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            preferredContact: 'email'
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const contactInfo = [
    {
      icon: 'ri-phone-line',
      title: 'טלפון',
      value: '03-1234567',
      description: 'ראשון-חמישי 9:00-18:00'
    },
    {
      icon: 'ri-mail-line',
      title: 'אימייל',
      value: 'info@example.com',
      description: 'מענה תוך 24 שעות'
    },
    {
      icon: 'ri-map-pin-line',
      title: 'כתובת',
      value: 'רחוב הרצל 123, תל אביב',
      description: 'פגישות פרטיות בתיאום מראש'
    },
    {
      icon: 'ri-time-line',
      title: 'שעות פעילות',
      value: 'ראשון-חמישי 9:00-20:00',
      description: 'שבת לפי תיאום מיוחד'
    }
  ];

  const subjects = [
    'ייעוץ כללי',
    'פרטים על הקורסים',
    'הזמנת פגישה',
    'שאלות טכניות',
    'שיתוף פעולה',
    'אחר'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              צור קשר
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              יש לך שאלות? רוצה לדעת עוד על הקורסים? אנחנו כאן בשבילך
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 text-right">
                שלח לנו הודעה
              </h2>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        שם מלא *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right"
                        placeholder="הכנס שם מלא"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        אימייל *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right"
                        placeholder="הכנס כתובת אימייל"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        טלפון
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right"
                        placeholder="הכנס מספר טלפון"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        נושא *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right pr-8"
                      >
                        <option value="">בחר נושא</option>
                        {subjects.map((subject, index) => (
                          <option key={index} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      דרך קשר מועדפת
                    </label>
                    <div className="flex space-x-6 space-x-reverse justify-end">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === 'email'}
                          onChange={handleInputChange}
                          className="ml-2"
                        />
                        <span>אימייל</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === 'phone'}
                          onChange={handleInputChange}
                          className="ml-2"
                        />
                        <span>טלפון</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      הודעה *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right resize-none"
                      placeholder="כתב את הודעתך כאן..."
                    />
                    <div className="text-left text-sm text-gray-500 mt-1">
                      {formData.message.length}/500 תווים
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <i className="ri-send-plane-line ml-2"></i>
                    שלח הודעה
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <i className="ri-check-double-line text-6xl text-green-500 mb-4"></i>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">ההודעה נשלחה בהצלחה!</h3>
                  <p className="text-gray-600">
                    תודה על פנייתך. נחזור אליך בהקדם האפשרי.
                  </p>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 text-right">
                  פרטי יצירת קשר
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4 space-x-reverse">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className={`${info.icon} text-blue-600 text-xl`}></i>
                      </div>
                      <div className="text-right">
                        <h3 className="font-semibold text-blue-900">{info.title}</h3>
                        <p className="text-lg text-gray-800">{info.value}</p>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4 text-right">
                  מיקום
                </h3>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.344777403946!2d34.781769315080795!3d32.0852999245983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4ca6193b7c1f%3A0x8c7d3b9b6c9b8b9!2z16jXpten15Eg15TXqNem15wgMTIzLCDXqtecINeQ15HXmdeR!5e0!3m2!1siw!2sil!4v1635123456789!5m2!1siw!2sil"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="מיקום המשרד"
                  />
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  מוכן להתחיל?
                </h3>
                <p className="text-blue-100 mb-6">
                  קבל ייעוץ חינמי וגלה איך הקורסים שלנו יכולים לעזור לך
                </p>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => window.location.href = '/#cta'}
                >
                  הירשם לקורס בחינם
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
